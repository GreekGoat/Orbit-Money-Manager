# Orbit — Money Manager (iOS PWA)

A futuristic, gradient-driven money manager that installs to your iPhone home screen.
All data stays **on your device** (browser local storage). No accounts, no servers, no tracking.

---

## New in v4.0 — "Aurora"

A ground-up visual revamp with a living background and springy motion throughout.

- **Fixed: the animated background was invisible** — a CSS stacking bug meant the moving glow layers were painted *behind* the app's solid backdrop on every device. The aurora now lives on its own explicit layer: three drifting light blobs, a slowly rotating color sweep, twinkling stars, and a gentle hue shift. Always visible, always moving.
- **New theme** — deep-space indigo with a violet → cyan aurora palette, gradient-edged glass panels, gradient hero numbers, and glowing accents.
- **Motion system** — springy view transitions, a gliding pill that follows the active tab in the nav, an orbiting comet on the ring, a rotating halo behind it, shimmer on progress bars and the save button, animated onboarding steps, floating empty-states.
- **Smoothness fix** — entrance cascades and chart sweeps now play on load, view entry, and period switches only; saving a transaction updates numbers smoothly (count-up) without re-triggering every animation.
- **Reliable updates** — the service worker is now network-first for the app shell, with versioned assets (`?v=4`) and cache v6. New deploys appear on the next online launch: no more stale app.
- **New insights** — month-end spending pace projection and a daily logging streak.
- All motion still switches off automatically under iOS Reduce Motion.


---

## New in v3.0

- **Motion everywhere** — numbers count up as they change, the area chart draws in left-to-right, the donut sweeps around, lists and cards cascade in with a gentle stagger, views slide in as you switch tabs, and taps give springy press feedback. Everything switches off automatically if iOS "Reduce Motion" is on.
- **Budget date-range filter** — see budget status for This month, Last month, 3 months, This year, or any Custom range. Multi-month ranges scale your budget targets (e.g. a ৳1,000 monthly budget becomes ৳3,000 over 3 months).
- **Total savings** — a new Home card adds up what you saved each month since you started. Tap it for a month-by-month history with income, spending, saved amount, and the running total.
- **Insights** — a Home card comparing this month to last, plus your top category, biggest expense, and daily average.
- **Quick amount chips** — +100 / +500 / +1,000 / +5,000 buttons in the add sheet for faster entry.
- **Over-budget nudge** — a warning toast the moment an expense pushes a category past its budget.
- **CSV export** — download all transactions as a spreadsheet from Settings.

---

## New in v2.0

- **First-run onboarding** — a 4-step welcome that captures your name, age, profile photo/icon, currency, monthly income, and an optional savings goal. (Only shows for brand-new installs.)
- **Profile** — your name and avatar (uploaded photo or chosen icon) sit in the top-right; a time-of-day greeting sits on the left. Edit anytime from Settings.
- **Savings goal** — set a monthly target and a progress strip on Home tracks how close you are.
- **Richer charts** — the spending breakdown is now a smooth "uphill" area chart, and category spending is shown as a donut chart with the category list as its legend.
- **Time on transactions** — add a time alongside the date, so the Day view's hourly breakdown is accurate.
- **Live amount formatting** — thousands separators appear as you type (e.g. `1,250,000`).
- **Motion & polish** — a slowly drifting animated background, a gently glowing orbit ring, a subtle pulse on the Add button, an Instagram-style floating toolbar that shrinks as you scroll down, and swipe-down-to-dismiss sheets.

---

## What's inside

| File | Purpose |
|---|---|
| `index.html` | App structure (all screens) |
| `style.css` | The gradient/futuristic design |
| `app.js` | All logic — transactions, budgets, charts, storage |
| `manifest.json` | Makes it installable to the home screen |
| `sw.js` | Service worker — lets it work offline |
| `icon-180.png`, `icon-512.png` | Home-screen icons |

**Keep all seven files together in the same folder.** They reference each other by name.

---

## How to get it on your iPhone

The app needs to be served over **HTTPS** for "Add to Home Screen" + offline to work fully.
Pick whichever is easiest:

### Option A — Netlify Drop (easiest, free, ~2 minutes)
1. Go to **https://app.netlify.com/drop** on your computer.
2. Drag the whole `orbit` folder onto the page.
3. Netlify gives you a URL like `https://something-random.netlify.app`.
4. Open that URL in **Safari on your iPhone**.
5. Tap the **Share** button → **Add to Home Screen** → **Add**.
6. Orbit now has its own icon and opens full-screen like a real app.

### Option B — GitHub Pages (free, good if you'll keep editing)
1. Create a GitHub repo, upload the seven files.
2. Repo **Settings → Pages → Deploy from branch → main → /(root)**.
3. Use the `https://yourname.github.io/repo` URL, then do the Safari → Add to Home Screen steps above.

### Option C — Just try it instantly (no install)
Open `index.html` directly in any browser to test the look and feel.
(Note: opening a local file won't register the offline service worker — that needs Option A or B — but everything else works for a quick look.)

---

## First-run steps inside the app
1. Tap the **gear icon** (top right) → **Monthly income → Edit** → set your income.
2. Tap the big **+** button → add an expense (pick a category, amount, note).
3. Watch the **orbit ring** on the home screen fill in as you spend.
4. Set **Budgets** and **Recurring** items from the gear menu or bottom nav.

## Backing up your data
Because data lives only on your phone: **Settings → Export backup** saves a file you can keep.
**Import backup** restores it (e.g. on a new phone). Clearing Safari data erases everything, so export now and then.

---

## Currency
Defaults to **BDT (৳)**. Change it in **Settings → Currency** (tap to cycle through BDT, USD, EUR, GBP, INR).
