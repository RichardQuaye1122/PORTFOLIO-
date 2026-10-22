# DriveNest

Car marketplace landing page built with React, Vite and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Structure

```
src/
  App.jsx          page composition
  data.js          all page content (listings, brands, copy)
  components/
    Navbar.jsx           header + mobile menu
    Hero.jsx             headline, CTAs, stats
    SearchPanel.jsx      tabbed filter bar
    FeaturedListings.jsx listings grid
    CarCard.jsx          single listing card
    BrowseBrands.jsx     brand shortcuts
    BrowseCategories.jsx body-type shortcuts
    WhyBuy.jsx           benefits row
    Testimonials.jsx     reviews carousel
    FinancingBanner.jsx  financing CTA
    ContactStrip.jsx     contact details
    Footer.jsx           footer links + socials
    CarArt.jsx           placeholder car illustration
    Logo.jsx             wordmark
    SocialIcons.jsx      inline brand glyphs
```

## Notes

- Page content lives in `src/data.js`, so copy and listings can be edited
  without touching components.
- `CarArt.jsx` draws an inline SVG placeholder instead of photography. To use
  real images, drop them in `public/` and swap the `<CarArt />` usages in
  `CarCard.jsx`, `Hero.jsx` and `FinancingBanner.jsx` for `<img>`.
