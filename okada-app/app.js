/* Okada Boss — offline-first rider app.
 * No framework, no build step, no network calls. All state lives in
 * localStorage on the rider's own phone.
 */
(function () {
  "use strict";

  var STORE_KEY = "okadaboss.v1";
  var CUR = "GHS";

  /* ---------------------------------------------------------------- i18n */
  /* EN is the complete source of truth. TWI is partial on purpose and falls
   * back to EN per-key. The Twi strings below need review by a native speaker
   * before this ships to real riders — see README. */
  var EN = {
    offline: "No network — your work is still saved on this phone",
    inPocket: "In your pocket",
    addFare: "Add a fare",
    add: "Add",
    costs: "What you paid out today",
    gross: "Fares collected",
    outgo: "Paid out",
    net: "Left for you",
    last7: "Last 7 days",
    weekNet: "Week total left for you",
    weekAvg: "Daily average",
    papersTitle: "Your papers",
    deadlineLabel: "Time left in the transition window",
    deadlineSet: "Deadline date",
    deadlineNote: "This date is a placeholder. Confirm the real deadline for your region with DVLA or the NRSA and change it here.",
    progress: "Progress",
    tapToChange: "Tap the square to change status: empty → working on it → done",
    papersNote: "Checklist built from public reporting on the Road Traffic Regulations, 2026 (L.I. 2519). Verify every requirement and fee against the gazetted instrument or your DVLA office before you pay anybody.",
    duesTitle: "Union dues",
    unionName: "Union / association",
    memberId: "Member number",
    duesAmount: "Dues amount (GHS)",
    duesFreq: "How often",
    daily: "Every day",
    weekly: "Every week",
    monthly: "Every month",
    duesStatus: "Status",
    paidTotal: "Paid in total",
    logPayment: "Record a payment",
    amount: "Amount (GHS)",
    payDate: "Date",
    payMethod: "Paid with",
    payRef: "Transaction ID / receipt no.",
    savePayment: "Save payment",
    duesNote: "This records payments you have already made so you have proof. It does not move money. Automatic MoMo collection comes with the union pilot.",
    history: "Payment history",
    sosTitle: "Emergency & bike",
    sosHelp: "Sends your location and bike details to your emergency contact on WhatsApp or SMS.",
    emergencyContact: "Emergency contact",
    name: "Name",
    phone: "Phone (with 233)",
    bikeDetails: "Your bike — for theft reports",
    regNo: "Registration number",
    chassis: "Chassis / engine number",
    ownerDropLabel: "Daily drop to bike owner (work & pay)",
    ownerDropHelp: "If you set this, it fills in automatically each day.",
    yourData: "Your data",
    dataHelp: "Everything stays on this phone. Nothing is sent anywhere.",
    export: "Export backup",
    reset: "Erase all",
    tabMoney: "Money",
    tabPapers: "Papers",
    tabDues: "Dues",
    tabSos: "SOS",
    today: "Today",
    yesterday: "Yesterday",
    noWork: "No work recorded yet",
    fare: "fare",
    fares: "fares",
    saved: "Saved",
    erased: "Everything erased",
    noPayments: "No payments recorded yet",
    sosNoContact: "Add an emergency contact first",
    sosWhatsapp: "Send on WhatsApp",
    sosSms: "Send by SMS",
    sosCall: "Call now",
    sosLocating: "Finding your location…",
    daysLeft: "days left",
    overdue: "past the date",
    cFuel: "Fuel",
    cRepairs: "Repairs & parts",
    cDrop: "Owner drop",
    cDues: "Union dues",
    cOther: "Chop & other",
    expires: "Expires",
    expired: "Expired",
    expSoon: "Soon",
    valid: "Valid",
    confirmReset: "Erase everything on this phone? This cannot be undone."
  };

  var TWI = {
    inPocket: "Sika a aka wo nsa",
    addFare: "Fa ka ho",
    add: "Fa ka ho",
    net: "Wo deɛ",
    papersTitle: "Wo krataa",
    today: "Ɛnnɛ",
    tabMoney: "Sika",
    tabPapers: "Krataa",
    tabDues: "Kuo",
    tabSos: "SOS",
    duesTitle: "Kuo ka",
    name: "Din",
    phone: "Telefon",
    savePayment: "Sie",
    reset: "Pepa ne nyinaa",
    saved: "Wɔasie",
    last7: "Nna 7 a atwam",
    cFuel: "Petrol",
    daily: "Da biara",
    weekly: "Dapɛn biara",
    monthly: "Bosome biara"
  };

  var DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var DAYS_TWI = ["Kwasi", "Dwo", "Bene", "Wuku", "Yaw", "Fia", "Meme"];

  function t(key) {
    if (state.lang === "twi" && TWI[key]) return TWI[key];
    return EN[key] != null ? EN[key] : key;
  }

  /* --------------------------------------------------------- paper specs */
  var PAPERS = [
    { id: "licence", nm: "Commercial rider's licence", why: "DVLA. Required to carry fare-paying passengers.", exp: true },
    { id: "reg", nm: "Bike registered as commercial", why: "Yellow plate and DVLA commercial registration.", exp: false },
    { id: "roadworthy", nm: "Roadworthiness certificate", why: "Renewed on DVLA's schedule.", exp: true },
    { id: "insurance", nm: "Motor insurance", why: "Commercial motorcycle cover, not private.", exp: true },
    { id: "union", nm: "Union / transport organisation", why: "Membership of a licensed body.", exp: true },
    { id: "helmets", nm: "Two crash helmets", why: "One for you, one for the passenger.", exp: false },
    { id: "mirrors", nm: "Two working side mirrors", why: "Both must be fitted and intact.", exp: false },
    { id: "reflective", nm: "Reflective jacket", why: "At least one reflective item of attire.", exp: false },
    { id: "age", nm: "Age 21 or above", why: "Minimum age for commercial riding. Confirm locally.", exp: false }
  ];

  var COSTS = [
    { id: "fuel", key: "cFuel" },
    { id: "repairs", key: "cRepairs" },
    { id: "drop", key: "cDrop" },
    { id: "dues", key: "cDues" },
    { id: "other", key: "cOther" }
  ];

  /* ------------------------------------------------------------- helpers */
  function $(sel) { return document.querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function dkey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
      "-" + String(d.getDate()).padStart(2, "0");
  }
  function parseKey(k) {
    var p = k.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : 0; }
  function money(n) {
    return (n < 0 ? "-" : "") + Math.abs(n).toFixed(2);
  }
  function daysBetween(a, b) {
    return Math.round((b.setHours(0, 0, 0, 0) - a.setHours(0, 0, 0, 0)) / 86400000);
  }

  var toastTimer;
  function toast(msg) {
    var tn = $("#toast");
    tn.textContent = msg;
    tn.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { tn.classList.remove("show"); }, 2000);
  }

  /* --------------------------------------------------------------- state */
  var state = defaults();
  var cursor = new Date();

  function defaults() {
    return {
      v: 1,
      lang: "en",
      deadline: "2027-02-28",
      profile: { nokName: "", nokPhone: "", bikeReg: "", bikeChassis: "", ownerDrop: "" },
      papers: {},
      days: {},
      union: { name: "", memberId: "", amount: "", freq: "daily", payments: [] }
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        state = Object.assign(defaults(), parsed);
        state.profile = Object.assign(defaults().profile, parsed.profile || {});
        state.union = Object.assign(defaults().union, parsed.union || {});
        state.papers = parsed.papers || {};
        state.days = parsed.days || {};
      }
    } catch (e) {
      /* corrupt or blocked storage — carry on with defaults */
    }
  }

  var saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
      catch (e) { /* private mode / quota — app still works for this session */ }
    }, 180);
  }

  function day(key) {
    if (!state.days[key]) {
      state.days[key] = { fares: [], fuel: "", repairs: "", drop: "", dues: "", other: "" };
      // pre-fill the work-and-pay drop so the rider sees the real number
      if (state.profile.ownerDrop) state.days[key].drop = state.profile.ownerDrop;
      if (state.union.amount && state.union.freq === "daily") state.days[key].dues = state.union.amount;
    }
    return state.days[key];
  }

  function dayTotals(key) {
    var d = state.days[key];
    if (!d) return { gross: 0, out: 0, net: 0, count: 0, empty: true };
    var gross = (d.fares || []).reduce(function (s, v) { return s + num(v); }, 0);
    var out = num(d.fuel) + num(d.repairs) + num(d.drop) + num(d.dues) + num(d.other);
    return {
      gross: gross, out: out, net: gross - out,
      count: (d.fares || []).length,
      empty: gross === 0 && out === 0
    };
  }

  /* ----------------------------------------------------------- rendering */
  function applyStaticI18n() {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute("data-i18n");
      if (EN[k] != null) nodes[i].textContent = t(k);
    }
    $("#langBtn").textContent = state.lang === "twi" ? "TWI" : "EN";
    document.documentElement.lang = state.lang === "twi" ? "ak" : "en";
  }

  function renderMoney() {
    var key = dkey(cursor);
    var d = day(key);
    var tot = dayTotals(key);
    var today = dkey(new Date());

    // date label
    var names = state.lang === "twi" ? DAYS_TWI : DAYS_EN;
    var label;
    var diff = daysBetween(new Date(cursor), new Date());
    if (key === today) label = t("today");
    else if (diff === 1) label = t("yesterday");
    else label = names[cursor.getDay()] + " " + cursor.getDate() + "/" + (cursor.getMonth() + 1);
    $("#dayLabel").textContent = label;
    $("#dayNext").disabled = key >= today;

    // pocket
    var amt = $("#netAmount");
    amt.innerHTML = "";
    amt.appendChild(el("span", "cur", CUR + " "));
    amt.appendChild(document.createTextNode(money(tot.net)));
    amt.classList.toggle("neg", tot.net < 0);
    $("#netSub").textContent = tot.empty
      ? t("noWork")
      : tot.count + " " + t(tot.count === 1 ? "fare" : "fares") + " · " + CUR + " " + money(tot.gross);

    // quick fare buttons
    var qr = $("#quickRow");
    if (!qr.childElementCount) {
      [5, 10, 15, 20].forEach(function (v) {
        var b = el("button", "quick", "+" + v);
        b.type = "button";
        b.addEventListener("click", function () { addFare(v); });
        qr.appendChild(b);
      });
    }

    // fare chips
    var chips = $("#fareChips");
    chips.innerHTML = "";
    (d.fares || []).forEach(function (v, i) {
      var c = el("button", "chip");
      c.type = "button";
      c.appendChild(document.createTextNode(money(num(v))));
      c.appendChild(el("span", "x", "×"));
      c.addEventListener("click", function () {
        d.fares.splice(i, 1); save(); renderMoney();
      });
      chips.appendChild(c);
    });

    // cost rows
    var cr = $("#costRows");
    cr.innerHTML = "";
    COSTS.forEach(function (c) {
      var row = el("div", "costrow");
      row.appendChild(el("span", "nm", t(c.key)));
      var inp = document.createElement("input");
      inp.type = "number";
      inp.inputMode = "decimal";
      inp.min = "0";
      inp.step = "0.5";
      inp.placeholder = "0";
      inp.value = d[c.id] || "";
      inp.addEventListener("input", function () {
        d[c.id] = inp.value; save(); renderTotalsOnly(key);
      });
      row.appendChild(inp);
      cr.appendChild(row);
    });

    renderTotalsOnly(key);
    renderWeek();
  }

  function renderTotalsOnly(key) {
    var tot = dayTotals(key);
    $("#tGross").textContent = money(tot.gross);
    $("#tOut").textContent = money(tot.out);
    $("#tNet").textContent = money(tot.net);
    var amt = $("#netAmount");
    amt.innerHTML = "";
    amt.appendChild(el("span", "cur", CUR + " "));
    amt.appendChild(document.createTextNode(money(tot.net)));
    amt.classList.toggle("neg", tot.net < 0);
  }

  function renderWeek() {
    var wrap = $("#weekBars");
    wrap.innerHTML = "";
    var vals = [], keys = [], names = state.lang === "twi" ? DAYS_TWI : DAYS_EN;
    for (var i = 6; i >= 0; i--) {
      var d = new Date(cursor);
      d.setDate(d.getDate() - i);
      var k = dkey(d);
      keys.push({ k: k, lbl: names[d.getDay()] });
      vals.push(dayTotals(k).net);
    }
    var peak = Math.max(1, Math.max.apply(null, vals.map(Math.abs)));
    vals.forEach(function (v, i) {
      var b = el("div", "bar");
      var bar = el("i");
      bar.style.height = Math.max(3, Math.round(Math.abs(v) / peak * 72)) + "px";
      if (v < 0) bar.classList.add("neg");
      b.appendChild(bar);
      b.appendChild(el("span", null, keys[i].lbl));
      b.title = keys[i].k + ": " + money(v);
      wrap.appendChild(b);
    });
    var sum = vals.reduce(function (s, v) { return s + v; }, 0);
    var worked = vals.filter(function (v, i) { return !dayTotals(keys[i].k).empty; }).length;
    $("#weekNet").textContent = money(sum);
    $("#weekAvg").textContent = money(worked ? sum / worked : 0);
  }

  function addFare(v) {
    var amount = num(v);
    if (amount <= 0) return;
    var d = day(dkey(cursor));
    d.fares.push(amount);
    save();
    renderMoney();
  }

  function renderPapers() {
    // deadline
    $("#deadlineInput").value = state.deadline || "";
    var dd = $("#deadlineDays"), ds = $("#deadlineSub");
    if (state.deadline) {
      var left = daysBetween(new Date(), parseKey(state.deadline));
      dd.textContent = Math.abs(left);
      ds.textContent = (left >= 0 ? t("daysLeft") : t("overdue")) + " · " + state.deadline;
      dd.style.color = left < 0 ? "var(--warn)" : (left < 45 ? "var(--accent)" : "");
    } else {
      dd.textContent = "—";
      ds.textContent = "";
    }

    var list = $("#paperList");
    list.innerHTML = "";
    var done = 0;

    PAPERS.forEach(function (p) {
      var st = state.papers[p.id] || { status: "todo", expiry: "" };
      state.papers[p.id] = st;
      if (st.status === "done") done++;

      var row = el("div", "paper");

      var btn = el("button", "status-btn " + (st.status === "done" ? "done" : st.status === "doing" ? "doing" : ""));
      btn.type = "button";
      btn.textContent = st.status === "done" ? "✓" : st.status === "doing" ? "··" : "";
      btn.setAttribute("aria-label", p.nm);
      btn.addEventListener("click", function () {
        st.status = st.status === "todo" ? "doing" : st.status === "doing" ? "done" : "todo";
        save(); renderPapers();
      });
      row.appendChild(btn);

      var body = el("div", "body");
      body.appendChild(el("div", "nm", p.nm));
      body.appendChild(el("div", "why", p.why));

      if (p.exp) {
        var ew = el("div", "expiry");
        var lab = el("span", "muted", t("expires"));
        var inp = document.createElement("input");
        inp.type = "date";
        inp.value = st.expiry || "";
        inp.addEventListener("change", function () {
          st.expiry = inp.value; save(); renderPapers();
        });
        ew.appendChild(lab);
        ew.appendChild(inp);
        if (st.expiry) {
          var left2 = daysBetween(new Date(), parseKey(st.expiry));
          var pill = el("span", "pill " + (left2 < 0 ? "bad" : left2 < 30 ? "soon" : "ok"),
            left2 < 0 ? t("expired") : left2 < 30 ? t("expSoon") : t("valid"));
          ew.appendChild(pill);
        }
        body.appendChild(ew);
      }

      row.appendChild(body);
      list.appendChild(row);
    });

    $("#paperCount").textContent = done + " / " + PAPERS.length;
    $("#paperBar").style.width = Math.round(done / PAPERS.length * 100) + "%";
  }

  function renderDues() {
    var u = state.union;
    $("#unionName").value = u.name || "";
    $("#memberId").value = u.memberId || "";
    $("#duesAmount").value = u.amount || "";
    $("#duesFreq").value = u.freq || "daily";

    var paid = (u.payments || []).reduce(function (s, p) { return s + num(p.amount); }, 0);
    $("#duesPaid").textContent = money(paid);

    var last = (u.payments || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    })[0];
    $("#duesSub").textContent = last
      ? (u.payments.length + " payments · last on " + last.date + " (" + last.method + ")")
      : t("noPayments");

    var pl = $("#payList");
    pl.innerHTML = "";
    var sorted = (u.payments || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!sorted.length) {
      pl.appendChild(el("p", "muted", t("noPayments")));
    }
    sorted.forEach(function (p, i) {
      var row = el("div", "costrow");
      var left = el("div", "nm");
      left.appendChild(el("div", null, CUR + " " + money(num(p.amount)) + " · " + p.method));
      var meta = el("div", "muted", p.date + (p.ref ? " · " + p.ref : ""));
      left.appendChild(meta);
      row.appendChild(left);
      var rm = el("button", "icon-btn", "×");
      rm.type = "button";
      rm.style.width = "46px";
      rm.style.height = "46px";
      rm.addEventListener("click", function () {
        var idx = u.payments.indexOf(p);
        if (idx > -1) u.payments.splice(idx, 1);
        save(); renderDues();
      });
      row.appendChild(rm);
      pl.appendChild(row);
    });
  }

  function renderSos() {
    var p = state.profile;
    $("#nokName").value = p.nokName || "";
    $("#nokPhone").value = p.nokPhone || "";
    $("#bikeReg").value = p.bikeReg || "";
    $("#bikeChassis").value = p.bikeChassis || "";
    $("#ownerDrop").value = p.ownerDrop || "";
  }

  /* -------------------------------------------------------------- wiring */
  function bindText(sel, obj, prop, after) {
    var n = $(sel);
    n.addEventListener("input", function () {
      obj[prop] = n.value;
      save();
      if (after) after();
    });
  }

  function switchView(name) {
    var views = document.querySelectorAll(".view");
    for (var i = 0; i < views.length; i++) views[i].classList.remove("active");
    $("#view-" + name).classList.add("active");
    var tabs = document.querySelectorAll(".tab");
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].classList.toggle("active", tabs[j].getAttribute("data-view") === name);
    }
    window.scrollTo(0, 0);
    if (name === "money") renderMoney();
    if (name === "papers") renderPapers();
    if (name === "dues") renderDues();
    if (name === "sos") renderSos();
  }

  function sosMessage(coords) {
    var p = state.profile;
    var lines = ["EMERGENCY - Okada rider needs help."];
    if (p.bikeReg) lines.push("Bike: " + p.bikeReg);
    if (coords) {
      lines.push("Location: https://maps.google.com/?q=" + coords.latitude.toFixed(5) + "," + coords.longitude.toFixed(5));
    } else {
      lines.push("Location: could not be read on this phone.");
    }
    lines.push("Sent from Okada Boss at " + new Date().toLocaleTimeString());
    return lines.join("\n");
  }

  function showSosActions(coords) {
    var p = state.profile;
    var wrap = $("#sosActions");
    wrap.innerHTML = "";
    var msg = sosMessage(coords);
    var phone = (p.nokPhone || "").replace(/[^0-9]/g, "");

    var wa = el("a", "btn block", t("sosWhatsapp"));
    wa.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
    wa.style.display = "block";
    wa.style.textAlign = "center";
    wa.style.lineHeight = "52px";
    wa.style.textDecoration = "none";
    wrap.appendChild(wa);

    var sms = el("a", "btn ghost block", t("sosSms"));
    sms.href = "sms:+" + phone + "?body=" + encodeURIComponent(msg);
    sms.style.display = "block";
    sms.style.textAlign = "center";
    sms.style.lineHeight = "52px";
    sms.style.textDecoration = "none";
    sms.style.marginTop = "8px";
    wrap.appendChild(sms);

    var call = el("a", "btn ghost block", t("sosCall"));
    call.href = "tel:+" + phone;
    call.style.display = "block";
    call.style.textAlign = "center";
    call.style.lineHeight = "52px";
    call.style.textDecoration = "none";
    call.style.marginTop = "8px";
    wrap.appendChild(call);
  }

  function init() {
    load();
    applyStaticI18n();

    // tabs
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      (function (tab) {
        tab.addEventListener("click", function () { switchView(tab.getAttribute("data-view")); });
      })(tabs[i]);
    }

    // language
    $("#langBtn").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "twi" : "en";
      save();
      applyStaticI18n();
      renderMoney(); renderPapers(); renderDues();
    });

    // money
    $("#dayPrev").addEventListener("click", function () {
      cursor.setDate(cursor.getDate() - 1); renderMoney();
    });
    $("#dayNext").addEventListener("click", function () {
      if (dkey(cursor) >= dkey(new Date())) return;
      cursor.setDate(cursor.getDate() + 1); renderMoney();
    });
    $("#fareAdd").addEventListener("click", function () {
      var inp = $("#fareInput");
      addFare(inp.value);
      inp.value = "";
      inp.focus();
    });
    $("#fareInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") $("#fareAdd").click();
    });

    // papers
    $("#deadlineInput").addEventListener("change", function () {
      state.deadline = $("#deadlineInput").value; save(); renderPapers();
    });

    // dues
    bindText("#unionName", state.union, "name");
    bindText("#memberId", state.union, "memberId");
    bindText("#duesAmount", state.union, "amount");
    $("#duesFreq").addEventListener("change", function () {
      state.union.freq = $("#duesFreq").value; save();
    });
    $("#payDate").value = dkey(new Date());
    $("#payAdd").addEventListener("click", function () {
      var amount = num($("#payAmount").value);
      if (amount <= 0) { toast("Enter an amount"); return; }
      state.union.payments.push({
        amount: amount,
        date: $("#payDate").value || dkey(new Date()),
        method: $("#payMethod").value,
        ref: $("#payRef").value.trim()
      });
      $("#payAmount").value = "";
      $("#payRef").value = "";
      save();
      renderDues();
      toast(t("saved"));
    });

    // sos
    bindText("#nokName", state.profile, "nokName");
    bindText("#nokPhone", state.profile, "nokPhone");
    bindText("#bikeReg", state.profile, "bikeReg");
    bindText("#bikeChassis", state.profile, "bikeChassis");
    bindText("#ownerDrop", state.profile, "ownerDrop");

    $("#sosBtn").addEventListener("click", function () {
      if (!(state.profile.nokPhone || "").replace(/[^0-9]/g, "")) {
        toast(t("sosNoContact"));
        switchView("sos");
        $("#nokPhone").focus();
        return;
      }
      toast(t("sosLocating"));
      if (!navigator.geolocation) { showSosActions(null); return; }
      navigator.geolocation.getCurrentPosition(
        function (pos) { showSosActions(pos.coords); },
        function () { showSosActions(null); },
        { timeout: 8000, maximumAge: 60000, enableHighAccuracy: true }
      );
    });

    // data
    $("#exportBtn").addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "okada-boss-backup-" + dkey(new Date()) + ".json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    $("#resetBtn").addEventListener("click", function () {
      if (!window.confirm(t("confirmReset"))) return;
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      state = defaults();
      applyStaticI18n();
      cursor = new Date();
      renderMoney(); renderPapers(); renderDues(); renderSos();
      toast(t("erased"));
    });

    // network badge
    function netState() {
      var on = navigator.onLine;
      document.body.classList.toggle("is-offline", !on);
      $("#netdot").classList.toggle("off", !on);
    }
    window.addEventListener("online", netState);
    window.addEventListener("offline", netState);
    netState();

    renderMoney();
    renderPapers();
    renderDues();
    renderSos();

    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
