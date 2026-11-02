# Okada Boss — 8-week MVP spec

**Goal of the MVP:** prove that okada riders will open a money book daily, and that one union
will collect dues through it. Nothing else. If daily-open retention is flat, the credit and
insurance business on top of it does not exist, and we stop.

**Not in the MVP:** passenger hailing, dispatch, maps, ratings, a rider-to-rider chat, an
admin web dashboard with charts, iOS. Every one of these is a way to spend eight weeks and
learn nothing.

---

## 1. Positioning

The rider is the customer, not the supply. We are not competing with Bolt, Yango or Uber for
passengers — we are the thing the rider opens before he starts work and after he parks.

The wedge is timing: L.I. 2519 turned ~hundreds of thousands of informal riders into people
who must become formal, on a deadline. Nobody owns that transition. Compliance gets us the
install; the money book gets us the daily habit; the habit produces verified income data; the
data is what makes lending and insurance underwritable. That is the whole thesis, in order.

---

## 2. Pilot shape

- **One city.** Kumasi or Tamale, not Accra. Higher okada density, thinner ride-hailing
  competition, better-organised unions.
- **One union**, signed before a line of backend code is written.
- **200 riders** onboarded in person at one or two stations.
- **12 weeks of operation** after the 8-week build.

Success = **40% of onboarded riders open the app on 4+ days in their 4th week**, and the union
collects **60%+ of due dues** through it in month 3. Below that, the product is wrong.

---

## 3. Architecture

### Phase 1 — weeks 1–3 (what is already built)
Static PWA, no backend, no accounts, `localStorage` only. Deploy to any static host behind a
custom domain. This is already working in this repo.

Rationale: an offline-first local-only app is genuinely useful on day one, costs nothing to
run, and can be put in a rider's hand at a station the week it exists. Do not build a backend
before a union has signed.

### Phase 2 — weeks 4–8 (the union pilot)

```
  Rider phone                  Backend                       Third parties
  ┌──────────────┐             ┌───────────────────┐
  │ PWA (shell   │──HTTPS────► │ Fastify (Node 22) │──────► Hubtel  (MoMo collect, SMS, USSD)
  │ cached)      │             │ Postgres 16       │──────► WhatsApp Cloud API (reminders)
  │ IndexedDB    │◄─sync──────►│ sync endpoint     │
  └──────────────┘             └───────────────────┘
  ┌──────────────┐                     ▲
  │ WhatsApp bot │─────────────────────┘   (riders with no room for an app)
  └──────────────┘
  ┌──────────────┐                     ▲
  │ USSD *XXX#   │─────────────────────┘   (feature phones; dues + balance only)
  └──────────────┘
```

**Why three front doors.** Smartphone ownership among riders is real but not universal, and
data is the binding constraint. WhatsApp is already installed and often zero-rated on bundles;
USSD works on every handset and costs the rider nothing in data. Expect the WhatsApp bot to
out-recruit the PWA for the first few thousand riders.

**Stack choices and why:**

| Layer | Choice | Reason |
|---|---|---|
| Client | PWA, vanilla | 68KB, installs without Play Store, no app-update cycle |
| Local store | `localStorage` → IndexedDB at Phase 2 | survives offline, syncs later |
| API | Node 22 + Fastify | small, boring, cheap to host |
| DB | Postgres 16 (Supabase or a single Hetzner box) | relational data, row-level security |
| MoMo | **Hubtel** (fallback: Paystack GH) | one integration covers MTN / Telecel / AT; Paystack's `mobile_money` channel is the fallback if Hubtel merchant onboarding drags |
| Messaging | WhatsApp Cloud API + Hubtel SMS | templates for reminders, SMS for riders off WhatsApp |
| USSD | Hubtel or Africa's Talking shortcode | shortcode provisioning is the long pole — **start it in week 1** |
| Hosting | Static host + one small VM | under $25/mo at pilot scale |

Confirm all third-party pricing directly — rates quoted publicly move, and MoMo collection
fees in particular are negotiable at volume.

---

## 4. Data model (Phase 2)

```sql
-- A rider is identified by phone. No email, no password. OTP over SMS.
rider (
  id              uuid pk,
  msisdn          text unique not null,        -- 233XXXXXXXXX
  name            text,
  city            text,
  lang            text default 'en',           -- en | tw | ha | dag
  bike_owned      boolean default false,
  owner_drop      numeric(10,2),               -- daily work-and-pay amount
  nok_name        text,
  nok_msisdn      text,
  created_at      timestamptz default now()
);

bike (
  id              uuid pk,
  rider_id        uuid references rider,
  reg_no          text,
  chassis_no      text,
  make_model      text,
  status          text default 'active'        -- active | stolen | sold
);

-- One row per rider per calendar day. Fares are an array; costs are columns.
-- Keep it denormalised: this table is written from a phone on a bad connection.
day_book (
  rider_id        uuid references rider,
  day             date,
  fares           numeric(10,2)[] default '{}',
  fuel            numeric(10,2) default 0,
  repairs         numeric(10,2) default 0,
  owner_drop      numeric(10,2) default 0,
  dues            numeric(10,2) default 0,
  other           numeric(10,2) default 0,
  updated_at      timestamptz default now(),
  client_rev      bigint default 0,            -- for last-write-wins sync
  primary key (rider_id, day)
);

paper (
  rider_id        uuid references rider,
  kind            text,                        -- licence | reg | roadworthy | insurance | union | helmets | mirrors | reflective | age
  status          text default 'todo',         -- todo | doing | done
  expires_on      date,
  doc_url         text,                        -- photo of the document, Phase 3
  primary key (rider_id, kind)
);

union_org (
  id              uuid pk,
  name            text,
  city            text,
  dues_amount     numeric(10,2),
  dues_freq       text,                        -- daily | weekly | monthly
  payout_msisdn   text,                        -- where collected dues settle
  chair_msisdn    text
);

membership (
  rider_id        uuid references rider,
  union_id        uuid references union_org,
  member_no       text,
  joined_on       date,
  active          boolean default true,
  primary key (rider_id, union_id)
);

dues_payment (
  id              uuid pk,
  rider_id        uuid references rider,
  union_id        uuid references union_org,
  amount          numeric(10,2),
  paid_on         date,
  method          text,                        -- momo | cash
  provider_ref    text,                        -- Hubtel/Paystack transaction id
  state           text default 'pending',      -- pending | success | failed | reversed
  created_at      timestamptz default now()
);

-- Append-only. Never update a row here; insert a correction.
momo_event (
  id              bigserial pk,
  provider        text,
  provider_ref    text,
  payload         jsonb,
  received_at     timestamptz default now()
);
```

**Sync rule:** the phone is the source of truth for `day_book`. The server stores whatever the
client sends with a higher `client_rev` and never silently overwrites a rider's numbers. Dues
payments go the other way — the **server** is authoritative, because money.

---

## 5. MoMo collection flow

```
Rider taps "Pay dues"  ──►  POST /dues/charge  {amount, union_id}
                                  │
                                  ├─► Hubtel Receive Money  ──► rider's phone prompts for PIN
                                  │
                                  ├─ insert dues_payment (state=pending)
                                  │
   Hubtel callback ──► POST /webhooks/hubtel ──► verify signature
                                  │              insert momo_event (append-only)
                                  │              update dues_payment.state
                                  │
                                  └─► WhatsApp receipt to rider + running total to chairman
```

Hard requirements:
- **Verify the webhook signature.** Never trust a callback body.
- **Idempotency on `provider_ref`.** Callbacks get retried; a double-credited due destroys
  trust with the chairman faster than anything else.
- **Reconcile daily** against the provider's settlement report. Mismatches get surfaced to the
  chairman, not buried.
- Keep `momo_event` append-only so every disputed payment can be reconstructed.

---

## 6. WhatsApp bot flow

Riders with no room for another app get the same three features over WhatsApp.

```
Rider: "start"
Bot:   Akwaaba. 1 Money  2 Papers  3 Dues  4 Help      [list message]

Rider: 1
Bot:   Today: GHS 0 collected. Send the amount of each fare, e.g. 10
Rider: 10
Bot:   ✓ GHS 10. Today: GHS 10 from 1 fare. Send another, or "costs".
Rider: costs
Bot:   What did you pay for fuel today?
...
Bot:   Today you kept GHS 48. Week so far: GHS 212.
```

- Use **interactive list/button messages**, not free-text parsing, wherever a choice is finite.
- Daily nudge at 20:00 local via a **template message** ("Enter today's work") — the 24-hour
  session window means unprompted messages must be templates; get them approved in week 4.
- Papers reminders at 30 / 14 / 3 days before any expiry.
- Voice notes in Twi for onboarding instead of a text tutorial. Literacy is a real constraint;
  a wall of English text is a wall.

---

## 7. Screens (PWA)

Already built, in this order of importance:

1. **Money** (default tab) — date strip, "in your pocket" number, quick-add fares (+5/+10/+15/+20),
   five cost rows, 7-day bars. This is the habit loop. Everything else is secondary.
2. **Papers** — deadline countdown, 9-item checklist with three states, expiry dates with
   valid/soon/expired pills.
3. **Dues** — union details, total paid, payment log with MoMo reference.
4. **SOS** — emergency contact, one-tap location message to WhatsApp/SMS/call, bike details
   for theft reports, data export.

Phase 2 adds: OTP sign-in, document photos, dues payment button, chairman view.

---

## 8. Eight weeks

| Week | Build | Field |
|---|---|---|
| 1 | *(done — PWA ships)* | Sign the union. Start USSD shortcode + Hubtel merchant onboarding **now** — both take weeks. |
| 2 | Twi review and rewrite; Hausa for the north | Sit at a station for two days. Watch 10 riders use it. Change what they fumble. |
| 3 | Deploy to a domain; install flow; onboarding voice notes | Onboard first 30 riders by hand |
| 4 | Backend skeleton: Postgres, OTP sign-in, `day_book` sync | WhatsApp templates submitted for approval |
| 5 | Hubtel MoMo collect + webhook + reconciliation | Chairman walkthrough; agree dues split |
| 6 | WhatsApp bot: money + dues flows | Onboard to 120 riders |
| 7 | Chairman view: member list, who has paid, arrears | First real dues collection cycle |
| 8 | USSD fallback; reconciliation report; harden | 200 riders; measure week-4 retention |

The two things that will slip: **MoMo merchant onboarding** and **WhatsApp template approval**.
Both are other people's queues. Start them in week 1 even though the code that needs them is
weeks away.

---

## 9. Money

Revenue at pilot scale is near zero, and that is fine — the pilot buys a retention number, not
income. The model it is testing:

| Line | Rate | Notes |
|---|---|---|
| Union dues collection | 1–2% of collected | The only pilot revenue. Pays for itself at ~2,000 riders. |
| Insurance commission | 10–20% of premium | Needs a licensed partner. Sell cover in GHS 2–5 daily bites over MoMo, never an annual premium. |
| Credit origination | fee or interest share | **This is the actual business.** 90 days of verified `day_book` income is the underwriting asset. Partner with an asset financier; do not lend off your own balance sheet. |
| Parts & fuel rebates | negotiated | Group buying. Often the thing that gets the download. |
| Compliance concierge | GHS 20–50 flat | Handle the DVLA paperwork run. |
| Delivery jobs | take rate | B2B only. Shops and WhatsApp vendors, never passenger hailing. |

Costs at pilot scale: hosting under $25/mo, plus per-message WhatsApp and per-transaction MoMo
fees. The real cost is field time.

---

## 10. Risks, ranked

1. **Distribution.** A rider trusts his station chairman, not an app. If the union relationship
   is weak, nothing else matters. Sign the union in week 1 or do not start.
2. **Retention.** A money book is a daily habit or it is nothing. Week-4 retention is the only
   metric that matters in the pilot.
3. **Trust around money.** One double-charged due and the chairman pulls the union. Idempotency
   and daily reconciliation are not nice-to-haves.
4. **Regulatory drift.** L.I. 2519's rollout, fees and deadlines are still settling. Keep the
   checklist and the deadline data-driven and editable, never hardcoded in a release.
5. **Big-platform entry.** Bolt or Yango could bundle rider tools. Our defence is the union
   relationship and the lending data, neither of which they have.
6. **Data loss.** `localStorage` can be cleared. Ship accounts and sync before the rider base
   has anything worth losing.
7. **Liability.** SOS implies a promise. Be explicit in-app that it sends a message and does not
   summon an ambulance, until there is a real dispatch partner.
