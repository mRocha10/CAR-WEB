# Engine Starters site review

Scope: 67 HTML pages, the detail-page generator, shared CSS and JavaScript, comparison data, comments workflow, and representative live browser flows. This is a technical/editorial review, not a certification of every model specification or legal requirement.

## Changes applied

- Comparison: replace five missing dataset images with existing local assets; identify category imagery as illustrative rather than exact-model photography; explain that prices/specifications vary by market, year and trim.
- Comparison interaction: remove duplicate submit handling; preserve the result status on shared URLs; label relative best/worst values in text as well as color; add a mobile scroll cue, status announcement, and a focusable results heading.
- Navigation: provide a visible list of links when JavaScript is unavailable; collapse the menu at tablet widths; make Escape return focus to Menu and make Back to Menu open/focus the mobile menu after scrolling.
- Layout stability: initialize the JavaScript-enabled menu state in the head of all 67 pages before first paint, retaining the expanded no-JavaScript fallback. A throttled mobile trace reduced observed homepage CLS from 0.34 to 0.01.
- Layout: allow detail/article columns to shrink within their grids and remove the tablet grid's implicit minimum track width.
- Community notes: remove a test entry and the unreachable form handler; remove the GitHub Action that would publish issue bodies directly to `comments.json` without review.
- Editorial copy: distinguish historical or market-specific brand model examples from an undated current lineup; correct the Roewe hybrid descriptions; fix plural type-page grammar, category cost guidance and repetitive introductions; remove EV range/charging-cost promises that the comparison tool cannot fulfil.
- Trust pages: replace site-building language with reader-facing standards, explain the actual email-draft flow and third-party requests, add primary navigation/footer links and complete Open Graph titles, descriptions and types.
- Homepage: align FAQ structured data with the three questions and answers actually visible on the page.
- Quality gate: add `node js/audit-site.js` to verify local links/assets, comparison images, h1 count and canonical presence across all HTML pages.
- Editorial images: localize 24 verified finished photographs and replace all 53 remote image references across 16 pages, including 15 unfinished generation placeholders. The audit now rejects remote generation URLs and checks local editorial photo dimensions; detail-page regeneration requires a local image.

## Limits and follow-up

- The comparison dataset includes figures that depend on model year, market and trim. It has not been independently checked model by model against primary manufacturer sources. Do not present it as live pricing or an authoritative current-spec database.
- Some brand history and model text still depends on earlier editorial material. The new model-example label prevents a false blanket "current lineup" claim, but individual facts and discontinued-model context still need sourced reviews.
- Some generated photographs still contain small AI markings or imperfect vehicle badges, and several formerly unfinished slots reuse the closest relevant finished photograph. A future art-direction pass could replace those with distinctive licensed or commissioned assets; no current page depends on a live generation URL.
- Privacy and advertising rules depend on jurisdiction and account configuration. The site currently has no first-party consent panel; a qualified privacy review and, where required, a certified consent solution remain necessary. This review is not legal advice.
- The contact path opens a user's email application rather than sending through the page. Inbox delivery and response time cannot be verified by code or browser testing.
- Article bylines, dated review information and primary-source citations should be added only after a real editorial process exists; fabricated author/date metadata would reduce trust.
- AdSense is loaded on generated detail pages. Whether it is needed there depends on the account's Auto ads configuration; verify settings before removing or changing monetisation scripts.
- Local mobile Lighthouse reported Accessibility, Best Practices, SEO and Agentic Browsing at 100 after the menu-shift fix. This audit excludes a performance category and is not a certification of real-user Core Web Vitals.

## Verification

- Run `node js/upgrade-detail-pages.js` after changing generator-driven content.
- Run `node js/audit-site.js` and `node --check` for edited JavaScript files.
- Test comparison selection and shared URLs, mobile navigation, no-JavaScript fallback, and key landing pages in a browser.
- After deployment, use cache-busted live URLs and confirm asset status plus rendered layout rather than relying on a successful push alone.
