# Orbit — Money Manager (iOS PWA)

A futuristic, gradient-driven money manager that installs to your iPhone home screen.
All data stays **on your device** (browser local storage). No accounts, no servers, no tracking.

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
