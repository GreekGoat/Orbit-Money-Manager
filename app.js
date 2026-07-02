// ===================== ORBIT — Core State & Storage =====================

const STORAGE_KEY = 'orbit_money_data_v1';

// Modern line-icon set (inline SVG inner markup, stroke-based, 24x24 viewBox).
const ICON_LIBRARY = {
  food: '<path d="M7.5 3v4"/><path d="M9.5 3v4"/><path d="M11.5 3v4"/><path d="M7.5 7h4"/><path d="M9.5 7v14"/><ellipse cx="15.8" cy="6.6" rx="2.3" ry="3.2"/><path d="M15.8 9.8V21"/>',
  transport: '<path d="M5.2 11l1.4-3.8A2 2 0 0 1 8.5 5.9h7a2 2 0 0 1 1.9 1.3L18.8 11"/><rect x="3.2" y="11" width="17.6" height="5" rx="1.6"/><circle cx="7.5" cy="16.4" r="1.4"/><circle cx="16.5" cy="16.4" r="1.4"/>',
  bills: '<path d="M6.5 3.8h11v16.4l-1.8-1.2-1.8 1.2-1.9-1.2-1.8 1.2-1.9-1.2-1.8 1.2z"/><line x1="9" y1="8.2" x2="15" y2="8.2"/><line x1="9" y1="11.6" x2="15" y2="11.6"/>',
  shopping: '<path d="M6.3 8h11.4l-.9 12H7.2z"/><path d="M9 8V6.4a3 3 0 0 1 6 0V8"/>',
  entertainment: '<circle cx="12" cy="12" r="8.4"/><path d="M10.4 8.8l4.6 3.2-4.6 3.2z"/>',
  health: '<path d="M12 19.4C12 19.4 4.6 15 4.6 9.6A3.8 3.8 0 0 1 12 7.3 3.8 3.8 0 0 1 19.4 9.6C19.4 15 12 19.4 12 19.4Z"/>',
  education: '<path d="M12 5L2.6 9.1 12 13.2 21.4 9.1z"/><path d="M6.2 11v4.4c0 1.2 2.6 2.3 5.8 2.3s5.8-1.1 5.8-2.3V11"/><line x1="21.4" y1="9.1" x2="21.4" y2="13"/>',
  other: '<circle cx="12" cy="12" r="8.4"/><circle cx="8.6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="15.4" cy="12" r="1"/>',
  home: '<path d="M4 11l8-6.4 8 6.4"/><path d="M6.3 9.4V19a1 1 0 0 0 1 1h9.4a1 1 0 0 0 1-1V9.4"/><path d="M10 20v-5h4v5"/>',
  travel: '<path d="M21 4L3 10.6l6.6 2.2L12 19.4 21 4z"/><path d="M9.6 12.8L21 4"/>',
  music: '<circle cx="7" cy="17.4" r="2.2"/><circle cx="16.6" cy="15.4" r="2.2"/><path d="M9.2 17.4V7l9.6-2v10.4"/><path d="M9.2 9l9.6-2"/>',
  pets: '<ellipse cx="12" cy="15.2" rx="4" ry="3.2"/><circle cx="6.6" cy="11.2" r="1.5"/><circle cx="10" cy="8.6" r="1.5"/><circle cx="14" cy="8.6" r="1.5"/><circle cx="17.4" cy="11.2" r="1.5"/>',
  work: '<rect x="3.2" y="7.6" width="17.6" height="11" rx="2"/><path d="M8.6 7.6V6a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.6"/><line x1="3.2" y1="12.4" x2="20.8" y2="12.4"/>',
  gift: '<rect x="4.2" y="9.6" width="15.6" height="10.4" rx="1.5"/><line x1="4.2" y1="13" x2="19.8" y2="13"/><line x1="12" y1="9.6" x2="12" y2="20"/><path d="M12 9.6S10.6 5.2 8.7 6 8 9.6 12 9.6z"/><path d="M12 9.6s1.4-4.4 3.3-3.6.7 3.6-3.3 3.6z"/>',
  coffee: '<path d="M5 8.6h10.8v5.2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15.8 9.6h2.4a2 2 0 0 1 0 4h-2.4"/><line x1="8" y1="3.6" x2="8" y2="5.6"/><line x1="11.4" y1="3.6" x2="11.4" y2="5.6"/>',
  fitness: '<line x1="6.6" y1="6.2" x2="6.6" y2="17.8"/><line x1="17.4" y1="6.2" x2="17.4" y2="17.8"/><line x1="4" y1="9" x2="4" y2="15"/><line x1="20" y1="9" x2="20" y2="15"/><line x1="6.6" y1="12" x2="17.4" y2="12"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2.5"/><line x1="10.5" y1="18" x2="13.5" y2="18"/>',
  wallet: '<rect x="3.2" y="6.6" width="17.6" height="12" rx="2.4"/><path d="M16 11.4a1.5 1.5 0 0 0 0 3h4.8v-3z"/>',
  globe: '<circle cx="12" cy="12" r="8.4"/><line x1="3.6" y1="12" x2="20.4" y2="12"/><path d="M12 3.6a13 13 0 0 1 0 16.8 13 13 0 0 1 0-16.8z"/>',
  star: '<path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17.3 6.8 20l1-5.9L3.5 9.8l5.9-.8z"/>',
  income: '<path d="M5 16.5l4.5-4.5 3 3 6.5-7"/><path d="M16 7.5h4v4"/>'
};

const ICON_CHOICES = ['food','transport','bills','shopping','entertainment','health','education','home','travel','music','pets','work','gift','coffee','fitness','phone','wallet','globe','star','other'];

// ---------- Avatar icons (human + animal, used for profile pictures) ----------
const AVATAR_ICON_LIBRARY = {
  person:  '<circle cx="12" cy="8" r="3.6"/><path d="M5.5 19.5c0-3.6 2.9-6.4 6.5-6.4s6.5 2.8 6.5 6.4"/>',
  people:  '<circle cx="8.5" cy="8" r="2.8"/><path d="M4 19c0-2.9 2-5 4.5-5s4.5 2.1 4.5 5"/><circle cx="16.5" cy="10" r="2.2"/><path d="M13 19c0-2.4 1.6-4 3.5-4s3.5 1.6 3.5 4"/>',
  smiley:  '<circle cx="12" cy="12" r="8.4"/><circle cx="9" cy="10.4" r=".6"/><circle cx="15" cy="10.4" r=".6"/><path d="M8.4 14.4c.9 1.4 2.1 2.1 3.6 2.1s2.7-.7 3.6-2.1"/>',
  cat:     '<path d="M7.6 8 6.1 4.2l3.4 1.9"/><path d="M16.4 8 17.9 4.2l-3.4 1.9"/><circle cx="12" cy="13" r="6.1"/><circle cx="9.8" cy="12.3" r=".55"/><circle cx="14.2" cy="12.3" r=".55"/><path d="M12 14.1v1.1"/><path d="M12 15.2l-1.5.7M12 15.2l1.5.7"/><path d="M5.8 12.8H8M16 12.8h2.2"/>',
  dog:     '<path d="M8 8.4C5.7 7.9 4.1 9.4 4.1 11.9c0 2.4 1.5 4.1 3.7 4.3"/><path d="M16 8.4c2.3-.5 3.9 1 3.9 3.5 0 2.4-1.5 4.1-3.7 4.3"/><path d="M7.2 9.6a4.8 4.8 0 019.6 0v2a4.8 4.8 0 01-9.6 0z"/><circle cx="10" cy="11.4" r=".5"/><circle cx="14" cy="11.4" r=".5"/><path d="M10.5 14.4h3M12 13.2v1.4"/>',
  rabbit:  '<path d="M9.2 9C8.2 6 8.4 3.3 9.8 3.3S11.4 6 10.7 9"/><path d="M14.8 9c1-3 .8-5.7-.6-5.7S12.6 6 13.3 9"/><circle cx="12" cy="14" r="5.1"/><circle cx="10.2" cy="13.4" r=".55"/><circle cx="13.8" cy="13.4" r=".55"/><path d="M12 15v1M12 16l-1.2.6M12 16l1.2.6"/>',
  fox:     '<path d="M4.2 5.2 7.6 7.6M19.8 5.2 16.4 7.6"/><path d="M5.4 6.6S7.4 8 12 8s6.6-1.4 6.6-1.4c.9 3.8-1.4 7.2-2.9 8.7-1 1-2 1.7-3.7 1.7s-2.7-.7-3.7-1.7c-1.5-1.5-3.8-4.9-2.9-8.7z"/><circle cx="9.9" cy="11" r=".55"/><circle cx="14.1" cy="11" r=".55"/><path d="M12 13v1.3l-1 .8M12 14.3l1 .8"/>',
  bear:    '<circle cx="6.8" cy="7.6" r="2.3"/><circle cx="17.2" cy="7.6" r="2.3"/><circle cx="12" cy="13" r="6.2"/><circle cx="9.9" cy="12" r=".55"/><circle cx="14.1" cy="12" r=".55"/><circle cx="12" cy="14.2" r="1.3"/>',
  owl:     '<path d="M5.2 6 7.6 8M18.8 6 16.4 8"/><path d="M12 4c-3.9 0-6.4 3-6.4 7s2.5 8 6.4 8 6.4-4 6.4-8S15.9 4 12 4z"/><circle cx="9.4" cy="11" r="1.9"/><circle cx="14.6" cy="11" r="1.9"/><path d="M11 14.4l1 1 1-1"/>',
  fish:    '<path d="M3 12c2.5-3.4 6-5 9-5s5.4 1.4 7 3l-1.6 2 1.6 2c-1.6 1.6-4 3-7 3s-6.5-1.6-9-5z"/><path d="M19 9l2-1.5v9L19 15"/><circle cx="8" cy="11" r=".6"/>',
  penguin: '<path d="M12 3c-3 0-5 2.2-5 6v6c0 3 2 5 5 5s5-2 5-5V9c0-3.8-2-6-5-6z"/><path d="M9.6 9.6c0 1.9 1 2.9 2.4 2.9s2.4-1 2.4-2.9"/><circle cx="10.3" cy="8" r=".55"/><circle cx="13.7" cy="8" r=".55"/><path d="M11.2 9.7l.8.9.8-.9"/><path d="M7.4 15c-2 .5-3.4 2-3.4 4M16.6 15c2 .5 3.4 2 3.4 4"/>',
  paw:     '<ellipse cx="7" cy="10" rx="1.4" ry="1.9"/><ellipse cx="10.6" cy="8.2" rx="1.5" ry="2.1"/><ellipse cx="13.4" cy="8.2" rx="1.5" ry="2.1"/><ellipse cx="17" cy="10" rx="1.4" ry="1.9"/><path d="M12 13.4c2.8 0 5 1.8 5 4 0 1.6-1.3 2.5-3 2.5-1.1 0-1.4-.4-2-.4s-.9.4-2 .4c-1.7 0-3-.9-3-2.5 0-2.2 2.2-4 5-4z"/>'
};
const AVATAR_ICONS = ['person','people','smiley','cat','dog','rabbit','fox','bear','owl','fish','penguin','paw'];
const COLOR_CHOICES = ['#F0997B','#5B9CFF','#FFC857','#ED93B1','#A78BFA','#5DCAA5','#85B7EB','#9FB0C4','#FF8A8A','#5B6EF5','#3DDC97','#FFD23F'];

const DEFAULT_CATEGORIES = [
  { id: 'food',          name: 'Food',          icon: 'food',          color: '#F0997B' },
  { id: 'transport',     name: 'Transport',     icon: 'transport',     color: '#5B9CFF' },
  { id: 'bills',         name: 'Bills',         icon: 'bills',         color: '#FFC857' },
  { id: 'shopping',      name: 'Shopping',      icon: 'shopping',      color: '#ED93B1' },
  { id: 'entertainment', name: 'Entertainment', icon: 'entertainment', color: '#A78BFA' },
  { id: 'health',        name: 'Health',        icon: 'health',        color: '#5DCAA5' },
  { id: 'education',     name: 'Education',      icon: 'education',     color: '#85B7EB' },
  { id: 'other',         name: 'Other',         icon: 'other',         color: '#9FB0C4' },
];

const CURRENCIES = {
  BDT: { symbol: '৳', label: 'BDT (৳)' },
  USD: { symbol: '$', label: 'USD ($)' },
  EUR: { symbol: '€', label: 'EUR (€)' },
  GBP: { symbol: '£', label: 'GBP (£)' },
  INR: { symbol: '₹', label: 'INR (₹)' },
};

function defaultState(){
  return {
    currency: 'BDT',
    monthlyIncomeBase: 0,
    onboarded: false,
    profile: { name: '', age: '', avatar: '' }, // avatar: '' | dataURL | 'icon:<key>'
    savingsGoal: 0,
    categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
    transactions: [], // {id, type, amount, categoryId, note, date(YYYY-MM-DD), time(HH:MM), createdAt}
    budgets: [],
    recurring: [],
  };
}

let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const merged = Object.assign(defaultState(), parsed, {
      categories: parsed.categories && parsed.categories.length ? parsed.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      profile: Object.assign({ name:'', age:'', avatar:'' }, parsed.profile || {})
    });
    // Migration: don't force existing users (who already have data) through onboarding.
    if(parsed.onboarded === undefined){
      merged.onboarded = (Array.isArray(parsed.transactions) && parsed.transactions.length > 0) || (Number(parsed.monthlyIncomeBase) > 0);
    }
    return merged;
  }catch(e){
    console.error('Failed to load state', e);
    return defaultState();
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function todayISO(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function currentMonthKey(d = new Date()){
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}

function fmtMoney(n){
  const sym = CURRENCIES[state.currency].symbol;
  const neg = n < 0;
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return (neg ? '-' : '') + sym + formatted;
}

function getCategory(id){
  return state.categories.find(c => c.id === id) || state.categories[state.categories.length-1];
}

// ---------- Icon rendering ----------
function svgGlyph(inner, color){
  return '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') +
    '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}
function resolveIconKey(cat){
  if(cat && cat.icon && ICON_LIBRARY[cat.icon]) return cat.icon;   // new-style key
  if(cat && cat.id && ICON_LIBRARY[cat.id]) return cat.id;         // auto-upgrade default cats
  return null;
}
// Returns inner HTML for a .cat-icon container, for a category.
function catGlyph(cat){
  const key = resolveIconKey(cat);
  if(key) return svgGlyph(ICON_LIBRARY[key], cat.color);
  if(cat && cat.icon) return '<span class="legacy-emoji">' + cat.icon + '</span>'; // backward compat
  return svgGlyph(ICON_LIBRARY.other, cat ? cat.color : '#ffffff');
}
function incomeGlyph(){
  return svgGlyph(ICON_LIBRARY.income, '#BFE0FF');
}

function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> el.classList.remove('show'), 2200);
}

// ---------- Recurring application ----------
function applyDueRecurring(){
  const now = new Date();
  const mKey = currentMonthKey(now);
  const todayDate = now.getDate();
  let appliedAny = false;

  state.recurring.forEach(r => {
    if(r.lastAppliedMonth === mKey) return;
    if(todayDate >= r.dayOfMonth){
      const dateStr = mKey + '-' + String(r.dayOfMonth).padStart(2,'0');
      state.transactions.push({
        id: uid(),
        type: 'expense',
        amount: r.amount,
        categoryId: r.categoryId,
        note: r.name + ' (recurring)',
        date: dateStr,
        createdAt: Date.now(),
        recurringId: r.id,
      });
      r.lastAppliedMonth = mKey;
      appliedAny = true;
    }
  });

  if(appliedAny) saveState();
}

// ---------- Derived data helpers ----------
function txInRange(start, end){
  return state.transactions.filter(t => {
    const d = new Date(t.date + 'T00:00:00');
    return d >= start && d < end;
  });
}

function getRangeForPeriod(period, refDate = new Date()){
  const d = new Date(refDate);
  let start, end;
  if(period === 'day'){
    start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    end = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1);
  } else if(period === 'week'){
    const dow = d.getDay();
    const diffToMonday = (dow === 0 ? -6 : 1 - dow);
    start = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diffToMonday);
    end = new Date(start.getFullYear(), start.getMonth(), start.getDate()+7);
  } else if(period === 'month'){
    start = new Date(d.getFullYear(), d.getMonth(), 1);
    end = new Date(d.getFullYear(), d.getMonth()+1, 1);
  } else {
    start = new Date(d.getFullYear(), 0, 1);
    end = new Date(d.getFullYear()+1, 0, 1);
  }
  return { start, end };
}

function monthIncomeTotal(refDate = new Date()){
  const { start, end } = getRangeForPeriod('month', refDate);
  const incomeTx = txInRange(start, end).filter(t => t.type === 'income');
  const extra = incomeTx.reduce((s,t) => s + t.amount, 0);
  return state.monthlyIncomeBase + extra;
}

function monthSpentTotal(refDate = new Date()){
  const { start, end } = getRangeForPeriod('month', refDate);
  return txInRange(start, end).filter(t => t.type === 'expense').reduce((s,t)=> s+t.amount, 0);
}

// ===================== RENDERING =====================

let currentPeriod = 'month';
let currentView = 'home';
let txTypeInSheet = 'expense';
let selectedCategoryInSheet = null;
let editingTxId = null;
let viewingTxId = null;
let editingBudgetId = null;
let editingRecurringId = null;
let editingCategoryId = null;
let historyFilter = 'all';
let historySearch = '';

// ===================== v3: MOTION + DERIVED FEATURES =====================
const REDUCED_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// When true, the next render cycle plays entrance cascades + chart sweeps.
// Set on load, view entry, and period switches — NOT on ordinary data saves,
// so adding/editing a transaction updates values smoothly without re-triggering
// every animation (this was the "choppiness" in v3).
let entryAnimate = true;
function requestEntryAnimation(){ entryAnimate = true; }
function stagAttr(i){
  return entryAnimate ? ' anim-in" style="--i:' + Math.min(i || 0, 12) + '"' : '"';
}

function easeOutCubic(p){ return 1 - Math.pow(1 - p, 3); }

// Count-up number animation. Remembers the previous value per element so
// changes tick smoothly from old → new. Instant under reduced motion.
function animateNumber(el, to, fmt){
  if(!el) return;
  const format = fmt || fmtMoney;
  const from = (typeof el.__num === 'number') ? el.__num : 0;
  el.__num = to;
  if(REDUCED_MOTION || from === to){ el.textContent = format(to); return; }
  if(el.__raf) cancelAnimationFrame(el.__raf);
  const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const dur = 620;
  function step(ts){
    const nowT = (typeof ts === 'number' && ts > 0) ? ts : Date.now();
    let p = Math.min(1, (nowT - t0) / dur);
    if(!(p >= 0)) p = 1;
    const v = from + (to - from) * easeOutCubic(p);
    el.textContent = format(p >= 1 ? to : v);
    if(p < 1){ el.__raf = requestAnimationFrame(step); } else { el.__raf = 0; }
  }
  el.__raf = requestAnimationFrame(step);
}

// ---------- Cumulative savings (month-by-month) ----------
function ymKey(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0'); }
function ymLabel(ym){
  const parts = ym.split('-');
  const d = new Date(parseInt(parts[0],10), parseInt(parts[1],10)-1, 1);
  return d.toLocaleDateString('en-US', { month:'short', year:'numeric' });
}
function computeSavingsSeries(){
  const now = new Date();
  const currentYm = ymKey(now);
  if(state.transactions.length === 0){
    if(state.monthlyIncomeBase > 0){
      const inc = monthIncomeTotal();
      const sp = monthSpentTotal();
      return [{ ym: currentYm, label: ymLabel(currentYm), income: inc, spent: sp, saved: inc - sp, cum: inc - sp }];
    }
    return [];
  }
  // group transactions by month
  const byMonth = {};
  state.transactions.forEach(function(t){
    const ym = (t.date || '').slice(0,7);
    if(!ym) return;
    if(!byMonth[ym]) byMonth[ym] = { income: 0, spent: 0, count: 0 };
    byMonth[ym].count++;
    if(t.type === 'income') byMonth[ym].income += t.amount;
    else byMonth[ym].spent += t.amount;
  });
  const firstYm = Object.keys(byMonth).sort()[0];
  const series = [];
  let cum = 0;
  // walk month by month from the first active month through the current one
  let cursor = new Date(parseInt(firstYm.slice(0,4),10), parseInt(firstYm.slice(5,7),10)-1, 1);
  const endCursor = new Date(now.getFullYear(), now.getMonth(), 1);
  let guard = 0;
  while(cursor <= endCursor && guard < 240){
    guard++;
    const ym = ymKey(cursor);
    const m = byMonth[ym];
    const isCurrent = ym === currentYm;
    if(m || isCurrent){
      const income = state.monthlyIncomeBase + (m ? m.income : 0);
      const spent = m ? m.spent : 0;
      const saved = income - spent;
      cum += saved;
      series.push({ ym: ym, label: ymLabel(ym), income: income, spent: spent, saved: saved, cum: cum });
    }
    cursor = new Date(cursor.getFullYear(), cursor.getMonth()+1, 1);
  }
  return series;
}

function renderSavingsCard(){
  const card = document.getElementById('savings-card');
  if(!card) return;
  const series = computeSavingsSeries();
  if(series.length === 0){ card.hidden = true; return; }
  const total = series[series.length-1].cum;
  card.hidden = false;
  animateNumber(document.getElementById('savings-total'), total);
  const sinceEl = document.getElementById('savings-since');
  if(sinceEl){
    sinceEl.textContent = series.length > 1
      ? 'since ' + series[0].label + ' · tap for monthly history'
      : 'this month so far · tap for details';
  }
  const totEl = document.getElementById('savings-total');
  if(totEl) totEl.classList.toggle('neg', total < 0);
}

function openSavingsSheet(){
  const series = computeSavingsSeries();
  const sum = document.getElementById('savings-summary');
  const list = document.getElementById('savings-history');
  if(series.length === 0){
    sum.innerHTML = '';
    list.innerHTML = '<p style="color:var(--text-faint); font-size:13px; text-align:center; padding:16px 0;">Nothing here yet — add some transactions first.</p>';
  } else {
    const total = series[series.length-1].cum;
    const best = series.slice().sort(function(a,b){ return b.saved - a.saved; })[0];
    sum.innerHTML =
      '<div class="savings-sum-item"><span class="savings-sum-label">Total saved</span><span class="savings-sum-value '+(total<0?'neg':'')+'">'+fmtMoney(total)+'</span></div>' +
      '<div class="savings-sum-item"><span class="savings-sum-label">Best month</span><span class="savings-sum-value">'+escapeHtml(best.label)+'</span></div>';
    list.innerHTML = series.slice().reverse().map(function(row, i){
      const cls = row.saved >= 0 ? 'pos' : 'neg';
      return '<div class="savings-row anim-in" style="--i:'+Math.min(i,12)+'">' +
        '<div class="savings-row-info"><span class="savings-row-month">'+escapeHtml(row.label)+'</span>' +
        '<span class="savings-row-meta">in '+fmtMoney(row.income)+' · out '+fmtMoney(row.spent)+'</span></div>' +
        '<div class="savings-row-amts"><span class="savings-row-saved '+cls+'">'+(row.saved>=0?'+':'')+fmtMoney(row.saved)+'</span>' +
        '<span class="savings-row-cum">total '+fmtMoney(row.cum)+'</span></div></div>';
    }).join('');
  }
  openSheet('sheet-savings');
}

// ---------- Insights ----------
function computeInsights(){
  const now = new Date();
  const lastRef = new Date(now.getFullYear(), now.getMonth()-1, 15);
  const thisSpent = monthSpentTotal(now);
  const lastSpent = monthSpentTotal(lastRef);
  const { start, end } = getRangeForPeriod('month', now);
  const monthExp = txInRange(start, end).filter(function(t){ return t.type === 'expense'; });
  let top = null;
  if(monthExp.length){
    const byCat = {};
    monthExp.forEach(function(t){ byCat[t.categoryId] = (byCat[t.categoryId]||0) + t.amount; });
    const sorted = Object.entries(byCat).sort(function(a,b){ return b[1]-a[1]; });
    top = { cat: getCategory(sorted[0][0]), amt: sorted[0][1] };
  }
  let biggest = null;
  monthExp.forEach(function(t){ if(!biggest || t.amount > biggest.amount) biggest = t; });
  const dailyAvg = thisSpent / Math.max(1, now.getDate());
  const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const pace = Math.round(dailyAvg * daysInMonth);
  // logging streak: consecutive days (ending today) with at least one transaction
  const daysWithTx = {};
  state.transactions.forEach(function(t){ if(t.date) daysWithTx[t.date] = true; });
  let streak = 0;
  const cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  while(true){
    const key = cur.getFullYear() + '-' + String(cur.getMonth()+1).padStart(2,'0') + '-' + String(cur.getDate()).padStart(2,'0');
    if(daysWithTx[key]){ streak++; cur.setDate(cur.getDate()-1); } else { break; }
  }
  return { thisSpent: thisSpent, lastSpent: lastSpent, top: top, biggest: biggest, dailyAvg: dailyAvg, pace: pace, streak: streak };
}

function renderInsights(){
  const wrap = document.getElementById('insights-wrap');
  const card = document.getElementById('insights-card');
  if(!wrap || !card) return;
  const ins = computeInsights();
  if(ins.thisSpent <= 0 && ins.lastSpent <= 0){ wrap.hidden = true; return; }
  wrap.hidden = false;
  const rows = [];
  if(ins.lastSpent > 0){
    const diff = ins.thisSpent - ins.lastSpent;
    const pct = Math.round(Math.abs(diff) / ins.lastSpent * 100);
    if(pct === 0){
      rows.push({ icon: '<path d="M5 12h14"/>', text: 'Spending is level with last month.' });
    } else if(diff < 0){
      rows.push({ icon: '<path d="M4 7l6 6 4-4 6 6"/><path d="M20 10v5h-5"/>', text: '<strong>' + pct + '% less</strong> spent than last month. Nice.', cls: 'good' });
    } else {
      rows.push({ icon: '<path d="M4 17l6-6 4 4 6-6"/><path d="M20 14V9h-5"/>', text: '<strong>' + pct + '% more</strong> spent than last month.', cls: 'warn' });
    }
  }
  if(ins.top){
    rows.push({ icon: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/>', text: 'Top category: <strong>' + escapeHtml(ins.top.cat.name) + '</strong> at ' + fmtMoney(ins.top.amt) + '.' });
  }
  if(ins.biggest){
    rows.push({ icon: '<path d="M12 3v18M6 8.5C6 6.6 7.8 5.5 12 5.5s6 1.1 6 3-1.9 2.6-6 3.4-6 1.5-6 3.4 1.8 3 6 3 6-1.1 6-3"/>', text: 'Biggest expense: <strong>' + escapeHtml(ins.biggest.note || getCategory(ins.biggest.categoryId).name) + '</strong> · ' + fmtMoney(ins.biggest.amount) + '.' });
  }
  if(ins.thisSpent > 0){
    rows.push({ icon: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 9h16M9 3v4M15 3v4"/>', text: 'Daily average this month: ' + fmtMoney(Math.round(ins.dailyAvg)) + '.' });
    rows.push({ icon: '<path d="M4 19h16M6 19V9m6 10V5m6 14v-8"/>', text: 'At this pace: about <strong>' + fmtMoney(ins.pace) + '</strong> by month-end.' });
  }
  if(ins.streak >= 2){
    rows.push({ icon: '<path d="M12 3c1.5 3-2.5 4.5-1 7 .8 1.3 2.5 1 3-1 2.5 1.5 3.5 4 3.5 6a5.5 5.5 0 11-11 0c0-4 3.5-5.5 5.5-12z"/>', text: '<strong>' + ins.streak + '-day</strong> logging streak — keep it going!', cls: 'good' });
  }
  card.innerHTML = rows.map(function(r, i){
    return '<div class="insight-row '+(r.cls||'')+(entryAnimate ? ' anim-in" style="--i:'+i+'"' : '"')+'>' +
      '<span class="insight-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+r.icon+'</svg></span>' +
      '<span class="insight-text">'+r.text+'</span></div>';
  }).join('');
}

// ---------- Budget date-range filter ----------
let budgetRangePreset = 'this-month';
let budgetCustomFrom = '';
let budgetCustomTo = '';

function monthsBetweenInclusive(a, b){
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
}
function getBudgetFilterRange(){
  const now = new Date();
  if(budgetRangePreset === 'last-month'){
    const start = new Date(now.getFullYear(), now.getMonth()-1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start: start, end: end, months: 1, label: 'Last month (' + start.toLocaleDateString('en-US',{month:'long'}) + ')' };
  }
  if(budgetRangePreset === 'last-3'){
    const start = new Date(now.getFullYear(), now.getMonth()-2, 1);
    const end = new Date(now.getFullYear(), now.getMonth()+1, 1);
    return { start: start, end: end, months: 3, label: 'Last 3 months' };
  }
  if(budgetRangePreset === 'this-year'){
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear(), now.getMonth()+1, 1);
    return { start: start, end: end, months: now.getMonth()+1, label: 'This year so far' };
  }
  if(budgetRangePreset === 'custom' && budgetCustomFrom && budgetCustomTo){
    let from = new Date(budgetCustomFrom + 'T00:00:00');
    let to = new Date(budgetCustomTo + 'T00:00:00');
    if(!isNaN(from) && !isNaN(to)){
      if(from > to){ const tmp = from; from = to; to = tmp; }
      const end = new Date(to.getFullYear(), to.getMonth(), to.getDate()+1);
      const months = Math.max(1, monthsBetweenInclusive(from, to));
      const opts = { month:'short', day:'numeric' };
      return { start: from, end: end, months: months,
        label: from.toLocaleDateString('en-US',opts) + ' – ' + to.toLocaleDateString('en-US',opts) };
    }
  }
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth()+1, 1);
  return { start: start, end: end, months: 1, label: 'This month' };
}

// ---------- CSV export ----------
function csvCell(v){
  const s = String(v == null ? '' : v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}
function buildCsv(){
  const header = ['Date','Time','Type','Category','Amount','Currency','Note'];
  const rows = state.transactions.slice().sort(function(a,b){
    return (a.date + (a.time||'')) < (b.date + (b.time||'')) ? -1 : 1;
  }).map(function(t){
    const cat = t.type === 'income' ? 'Income' : getCategory(t.categoryId).name;
    return [t.date, txTime(t), t.type, cat, t.amount, state.currency, t.note || ''].map(csvCell).join(',');
  });
  return header.join(',') + '\n' + rows.join('\n');
}
function exportCsv(){
  if(state.transactions.length === 0){ toast('No transactions to export yet'); return; }
  const blob = new Blob([buildCsv()], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'orbit-transactions-' + todayISO() + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('CSV downloaded');
}

// ---------- Over-budget nudge ----------
function spentThisMonthFor(categoryId){
  const { start, end } = getRangeForPeriod('month');
  return txInRange(start, end)
    .filter(function(t){ return t.type === 'expense' && t.categoryId === categoryId; })
    .reduce(function(s,t){ return s + t.amount; }, 0);
}

function renderAll(){
  const __wasEntry = entryAnimate;
  renderCurrencySymbols();
  renderProfile();
  renderHome();
  renderHistory();
  renderBudgets();
  renderRecurring();
  renderSettings();
  renderCategoryManage();  entryAnimate = false;
}

function renderCurrencySymbols(){
  const sym = CURRENCIES[state.currency].symbol;
  ['amount-currency-symbol','income-currency-symbol','budget-currency-symbol','recurring-currency-symbol'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = sym;
  });
}

// ---------- HOME ----------
function renderHome(){
  const income = monthIncomeTotal();
  const spent = monthSpentTotal();
  const remaining = income - spent;
  const saved = Math.max(remaining, 0);
  const over = income > 0 && remaining < 0;

  animateNumber(document.getElementById('stat-income'), income);
  animateNumber(document.getElementById('stat-spent'), spent);
  animateNumber(document.getElementById('stat-saved'), saved);

  const labelEl = document.getElementById('orbit-label');
  const amtEl = document.getElementById('orbit-amount');
  labelEl.textContent = over ? 'Overspent by' : 'Remaining this month';
  animateNumber(amtEl, over ? Math.abs(remaining) : remaining);
  amtEl.classList.toggle('over', over);
  document.getElementById('orbit-sub').textContent = 'of ' + fmtMoney(income) + ' income';

  const circumference = 2 * Math.PI * 118;
  let remainingPct = 0;
  if(income > 0 && !over){
    remainingPct = Math.max(0, Math.min(1, (income - spent) / income));
  }
  // When overspent, fill the whole ring (and colour it red via .over class).
  const offset = over ? 0 : circumference * (1 - remainingPct);
  const fillEl = document.getElementById('orbit-fill');
  const wrapEl = document.querySelector('.orbit-wrap');
  fillEl.classList.toggle('over', over);
  if(wrapEl) wrapEl.classList.toggle('over', over);
  fillEl.style.strokeDasharray = circumference;
  requestAnimationFrame(()=>{ fillEl.style.strokeDashoffset = offset; });

  const { start, end } = getRangeForPeriod(currentPeriod);
  const txs = txInRange(start, end).filter(t => t.type === 'expense');
  const byCat = {};
  txs.forEach(t => { byCat[t.categoryId] = (byCat[t.categoryId]||0) + t.amount; });
  const totalSpentPeriod = Object.values(byCat).reduce((a,b)=>a+b,0);

  const catContainer = document.getElementById('category-breakdown');
  const sorted = Object.entries(byCat).sort((a,b)=> b[1]-a[1]);
  if(sorted.length === 0){
    catContainer.innerHTML = '<p style="color:var(--text-faint); font-size:13px; text-align:center; padding:20px 0;">No spending in this period yet.</p>';
  } else {
    catContainer.innerHTML = sorted.map(function(entry, i){
      const catId = entry[0], amt = entry[1];
      const cat = getCategory(catId);
      const pctOfTotal = totalSpentPeriod>0 ? Math.round((amt/totalSpentPeriod)*100) : 0;
      return '<div class="category-row'+stagAttr(i)+'>' +
        '<div class="cat-icon" style="background:'+cat.color+'22;">'+catGlyph(cat)+'</div>' +
        '<div class="cat-info">' +
          '<div class="cat-name-row"><span class="cat-name">'+escapeHtml(cat.name)+'</span><span class="cat-amount">'+fmtMoney(amt)+' · '+pctOfTotal+'%</span></div>' +
          '<div class="cat-bar-track"><div class="cat-bar-fill" style="width:'+pctOfTotal+'%; background:'+cat.color+';"></div></div>' +
        '</div></div>';
    }).join('');
  }

  const recent = state.transactions.slice().sort((a,b)=> b.createdAt - a.createdAt).slice(0,5);
  document.getElementById('tx-list-home').innerHTML = recent.map(renderTxRow).join('');
  document.getElementById('home-empty').hidden = state.transactions.length > 0;

  drawDonutChart(sorted, totalSpentPeriod);
  animateNumber(document.getElementById('donut-total'), totalSpentPeriod);
  renderGoalStrip(saved);
  renderSavingsCard();
  renderInsights();
  drawTrendChart();
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}

function renderTxRow(t, i){
  const isIncome = t.type === 'income';
  const cat = getCategory(t.categoryId);
  const sign = isIncome ? '+' : '-';
  const dateLabel = formatDateLabel(t.date);
  const iconBg = isIncome ? 'rgba(185,212,240,0.18)' : (cat.color + '22');
  const glyph = isIncome ? incomeGlyph() : catGlyph(cat);
  const stagger = (typeof i === 'number') ? stagAttr(i) : '"';
  return '<div class="tx-row' + stagger + ' data-id="'+t.id+'">' +
    '<div class="cat-icon" style="background:'+iconBg+';">'+glyph+'</div>' +
    '<div class="tx-info">' +
      '<div class="tx-note">'+escapeHtml(t.note || (isIncome ? 'Income' : cat.name))+'</div>' +
      '<div class="tx-meta">'+(isIncome ? 'Income' : escapeHtml(cat.name))+' · '+dateLabel+'</div>' +
    '</div>' +
    '<div class="tx-amount '+t.type+'">'+sign+fmtMoney(t.amount).replace('-','')+'</div></div>';
}

function formatDateLabel(dateStr){
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  const yest = new Date(today); yest.setDate(today.getDate()-1);
  const isYest = d.toDateString() === yest.toDateString();
  if(isToday) return 'Today';
  if(isYest) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}

// ---------- Trend buckets ----------
function computeTrendBuckets(){
  let buckets = [];
  const now = new Date();
  if(currentPeriod === 'day'){
    const labels = ['12a','4a','8a','12p','4p','8p'];
    buckets = labels.map(function(l){ return {label:l, value:0}; });
    state.transactions.filter(function(t){ return t.type==='expense' && t.date === todayISO(); }).forEach(function(t){
      const hour = parseInt(txTime(t).split(':')[0], 10) || 0;
      const idx = Math.min(Math.floor(hour/4), 5);
      buckets[idx].value += t.amount;
    });
  } else if(currentPeriod === 'week'){
    const { start } = getRangeForPeriod('week');
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    buckets = labels.map(function(l){ return {label:l, value:0}; });
    state.transactions.filter(function(t){ return t.type==='expense'; }).forEach(function(t){
      const d = new Date(t.date+'T00:00:00');
      const diffDays = Math.floor((d - start) / 86400000);
      if(diffDays >=0 && diffDays < 7) buckets[diffDays].value += t.amount;
    });
  } else if(currentPeriod === 'month'){
    const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const weeks = Math.ceil(daysInMonth/7);
    buckets = Array.from({length:weeks}, function(_,i){ return {label:'W'+(i+1), value:0}; });
    state.transactions.filter(function(t){ return t.type==='expense'; }).forEach(function(t){
      const d = new Date(t.date+'T00:00:00');
      if(d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear()){
        const wk = Math.floor((d.getDate()-1)/7);
        buckets[Math.min(wk, weeks-1)].value += t.amount;
      }
    });
  } else {
    const labels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
    buckets = labels.map(function(l){ return {label:l, value:0}; });
    state.transactions.filter(function(t){ return t.type==='expense'; }).forEach(function(t){
      const d = new Date(t.date+'T00:00:00');
      if(d.getFullYear()===now.getFullYear()) buckets[d.getMonth()].value += t.amount;
    });
  }
  return buckets;
}

// ---------- Trend chart: smooth area / line ("uphill"), animated reveal ----------
let trendRafId = 0;
function drawTrendChart(){
  if(trendRafId) cancelAnimationFrame(trendRafId);
  if(REDUCED_MOTION || !entryAnimate){ drawTrendFrame(1); return; }
  const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const dur = 650;
  function step(ts){
    const nowT = (typeof ts === 'number' && ts > 0) ? ts : Date.now();
    let p = Math.min(1, (nowT - t0) / dur);
    if(!(p >= 0)) p = 1;
    drawTrendFrame(easeOutCubic(p));
    if(p < 1){ trendRafId = requestAnimationFrame(step); } else { trendRafId = 0; }
  }
  trendRafId = requestAnimationFrame(step);
}
function drawTrendFrame(progress){
  const canvas = document.getElementById('chart-trend');
  if(!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width || (canvas.parentElement.clientWidth - 20);
  const h = 150;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);

  const buckets = computeTrendBuckets();
  const maxVal = Math.max.apply(null, buckets.map(function(b){return b.value;}).concat([1]));
  const padTop = 16, padBottom = 24, padL = 10, padR = 10;
  const chartH = h - padTop - padBottom;
  const n = buckets.length;
  const stepX = (w - padL - padR) / ((n - 1) || 1);
  const pts = buckets.map(function(b,i){
    return { x: padL + i*stepX, y: padTop + chartH - (b.value/maxVal)*chartH, label:b.label, value:b.value };
  });

  function tracePath(){
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for(let i=0;i<pts.length-1;i++){
      const p0 = pts[i-1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i+1];
      const p3 = pts[i+2] || p2;
      const cp1x = p1.x + (p2.x - p0.x)/6, cp1y = p1.y + (p2.y - p0.y)/6;
      const cp2x = p2.x - (p3.x - p1.x)/6, cp2y = p2.y - (p3.y - p1.y)/6;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
  }

  // labels are always fully visible
  ctx.font = '11px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  pts.forEach(function(pt){
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(pt.label, pt.x, h - 7);
  });

  // clip to reveal the line/area left→right
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, padL + (w - padL - padR) * progress + 8, h - padBottom + 4);
  ctx.clip();

  const areaGrad = ctx.createLinearGradient(0, padTop, 0, padTop+chartH);
  areaGrad.addColorStop(0, 'rgba(124,92,255,0.45)');
  areaGrad.addColorStop(1, 'rgba(34,211,238,0.02)');
  tracePath();
  ctx.lineTo(pts[pts.length-1].x, padTop+chartH);
  ctx.lineTo(pts[0].x, padTop+chartH);
  ctx.closePath();
  ctx.fillStyle = areaGrad;
  ctx.fill();

  const lineGrad = ctx.createLinearGradient(padL, 0, w-padR, 0);
  lineGrad.addColorStop(0, '#A78BFA');
  lineGrad.addColorStop(0.5, '#22D3EE');
  lineGrad.addColorStop(1, '#7C5CFF');
  tracePath();
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.stroke();

  pts.forEach(function(pt){
    if(pt.value > 0){
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#F0ECFF'; ctx.fill();
    }
  });
  ctx.restore();
}

// ---------- Donut chart (category split), animated sweep ----------
let donutRafId = 0;
function drawDonutChart(sortedEntries, total){
  if(donutRafId) cancelAnimationFrame(donutRafId);
  if(REDUCED_MOTION || !entryAnimate){ drawDonutFrame(sortedEntries, total, 1); return; }
  const t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const dur = 700;
  function step(ts){
    const nowT = (typeof ts === 'number' && ts > 0) ? ts : Date.now();
    let p = Math.min(1, (nowT - t0) / dur);
    if(!(p >= 0)) p = 1;
    drawDonutFrame(sortedEntries, total, easeOutCubic(p));
    if(p < 1){ donutRafId = requestAnimationFrame(step); } else { donutRafId = 0; }
  }
  donutRafId = requestAnimationFrame(step);
}
function drawDonutFrame(sortedEntries, total, progress){
  const canvas = document.getElementById('chart-donut');
  if(!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const size = 170;
  canvas.width = size*dpr; canvas.height = size*dpr;
  canvas.style.width = size+'px'; canvas.style.height = size+'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,size,size);
  const cx = size/2, cy = size/2, lineW = 20, r = size/2 - lineW/2 - 6;

  ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.lineWidth = lineW; ctx.stroke();

  if(!total || total <= 0 || !sortedEntries || !sortedEntries.length) return;

  const single = sortedEntries.length === 1;
  const gap = single ? 0 : 0.035;
  let start = -Math.PI/2;
  sortedEntries.forEach(function(entry){
    const ang = (entry[1]/total) * Math.PI*2 * progress;
    if(ang > gap){
      const cat = getCategory(entry[0]);
      ctx.beginPath();
      ctx.arc(cx, cy, r, start + gap/2, start + ang - gap/2);
      ctx.strokeStyle = cat.color;
      ctx.lineWidth = lineW;
      ctx.stroke();
    }
    start += ang;
  });
}

function roundRect(ctx,x,y,w,h,r){
  if(h < r*2) r = h/2;
  if(h<=0){ ctx.rect(x,y,w,0.001); return; }
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

// ---------- HISTORY ----------
function renderHistory(){
  const chipsEl = document.getElementById('filter-chips');
  const chips = ['all'].concat(state.categories.map(function(c){return c.id;}));
  chipsEl.innerHTML = chips.map(function(c){
    const label = c === 'all' ? 'All' : getCategory(c).name;
    return '<button class="filter-chip '+(historyFilter===c?'active':'')+'" data-cat="'+c+'">'+escapeHtml(label)+'</button>';
  }).join('');

  let txs = state.transactions.slice().sort(function(a,b){ return b.createdAt - a.createdAt; });
  if(historyFilter !== 'all') txs = txs.filter(function(t){ return t.categoryId === historyFilter; });
  if(historySearch.trim()){
    const q = historySearch.trim().toLowerCase();
    txs = txs.filter(function(t){
      return (t.note||'').toLowerCase().indexOf(q) !== -1 || getCategory(t.categoryId).name.toLowerCase().indexOf(q) !== -1;
    });
  }

  document.getElementById('tx-list-full').innerHTML = txs.map(renderTxRow).join('');
  document.getElementById('history-empty').hidden = txs.length > 0;
}

// ---------- BUDGETS ----------
function renderBudgets(){
  const listEl = document.getElementById('budget-list');
  const range = getBudgetFilterRange();
  const rangeTx = txInRange(range.start, range.end).filter(function(t){return t.type==='expense';});

  // reflect the active pill + custom inputs
  document.querySelectorAll('#budget-range-switch .range-pill').forEach(function(p){
    p.classList.toggle('active', p.dataset.range === budgetRangePreset);
  });
  const customEl = document.getElementById('budget-custom-range');
  if(customEl) customEl.hidden = budgetRangePreset !== 'custom';
  const noteEl = document.getElementById('budget-range-note');
  if(noteEl){
    noteEl.textContent = state.budgets.length
      ? range.label + (range.months > 1 ? ' · budgets scaled ×' + range.months : '')
      : '';
  }

  if(state.budgets.length === 0){
    listEl.innerHTML = '';
    document.getElementById('budgets-empty').hidden = false;
    return;
  }
  document.getElementById('budgets-empty').hidden = true;

  listEl.innerHTML = state.budgets.map(function(b, i){
    const cat = getCategory(b.categoryId);
    const target = b.amount * range.months;
    const spent = rangeTx.filter(function(t){return t.categoryId===b.categoryId;}).reduce(function(s,t){return s+t.amount;},0);
    const pct = target>0 ? Math.min((spent/target)*100, 100) : 0;
    let statusClass = 'ok', statusText = fmtMoney(target - spent) + ' left';
    if(spent >= target){ statusClass='over'; statusText = fmtMoney(spent-target) + ' over budget'; }
    else if(spent/target >= 0.8){ statusClass='warn'; statusText = fmtMoney(target-spent) + ' left · almost there'; }

    return '<div class="budget-card'+stagAttr(i)+' data-id="'+b.id+'">' +
      '<div class="budget-top">' +
        '<div class="cat-icon" style="background:'+cat.color+'22;">'+catGlyph(cat)+'</div>' +
        '<span class="budget-cat-name">'+escapeHtml(cat.name)+'</span>' +
        '<span class="budget-amounts"><strong>'+fmtMoney(spent)+'</strong> / '+fmtMoney(target)+'</span>' +
      '</div>' +
      '<div class="budget-bar-track"><div class="budget-bar-fill" style="width:'+pct+'%; background:'+(statusClass==='over' ? 'var(--danger)' : cat.color)+';"></div></div>' +
      '<div class="budget-status '+statusClass+'">'+statusText+'</div></div>';
  }).join('');
}

// ---------- RECURRING ----------
function renderRecurring(){
  const listEl = document.getElementById('recurring-list');
  if(state.recurring.length === 0){
    listEl.innerHTML = '';
    document.getElementById('recurring-empty').hidden = false;
    return;
  }
  document.getElementById('recurring-empty').hidden = true;
  listEl.innerHTML = state.recurring.map(function(r){
    const cat = getCategory(r.categoryId);
    return '<div class="recurring-card" data-id="'+r.id+'">' +
      '<div class="cat-icon" style="background:'+cat.color+'22;">'+catGlyph(cat)+'</div>' +
      '<div class="recurring-info">' +
        '<div class="recurring-name">'+escapeHtml(r.name)+'</div>' +
        '<div class="recurring-meta">Day '+r.dayOfMonth+' of every month · '+escapeHtml(cat.name)+'</div>' +
      '</div>' +
      '<div class="recurring-amount">'+fmtMoney(r.amount)+'</div></div>';
  }).join('');
}

// ---------- SETTINGS ----------
function renderSettings(){
  document.getElementById('income-display').textContent = fmtMoney(state.monthlyIncomeBase);
  document.getElementById('currency-display').textContent = CURRENCIES[state.currency].label;
  const goalEl = document.getElementById('goal-display');
  if(goalEl) goalEl.textContent = (state.savingsGoal && state.savingsGoal > 0) ? fmtMoney(state.savingsGoal) : 'Off';
}

function renderCategoryManage(){
  const listEl = document.getElementById('category-manage-list');
  listEl.innerHTML = state.categories.map(function(c){
    return '<div class="category-manage-row" data-id="'+c.id+'">' +
      '<div class="cat-icon" style="background:'+c.color+'22;">'+catGlyph(c)+'</div>' +
      '<div class="cat-info"><span class="cat-name">'+escapeHtml(c.name)+'</span></div>' +
      '<svg viewBox="0 0 24 24" fill="none" width="16" height="16" style="color:var(--text-faint)"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  }).join('');
}

// ===================== VIEW NAVIGATION =====================

function showView(name){
  ['home','history','budgets','recurring','settings','categories'].forEach(function(v){
    const el = document.getElementById('view-'+v);
    const show = (v === name);
    el.hidden = !show;
    if(show && !REDUCED_MOTION){
      el.classList.remove('enter');
      void el.offsetWidth; // restart the animation
      el.classList.add('enter');
    }
  });
  document.getElementById('bottom-nav').hidden = !(name === 'home' || name === 'history' || name === 'budgets' || name === 'recurring');
  document.querySelectorAll('.nav-btn[data-view]').forEach(function(btn){
    btn.classList.toggle('active', btn.dataset.view === name);
  });
  currentView = name;
  window.scrollTo(0,0);
  updateNavGlide();
}

// ===================== SHEETS =====================

function openSheet(id){
  document.getElementById('sheet-backdrop').hidden = false;
  document.getElementById(id).hidden = false;
}
function closeSheet(id){
  document.getElementById('sheet-backdrop').hidden = true;
  document.getElementById(id).hidden = true;
}
function closeAllSheets(){
  ['sheet-add','sheet-tx-detail','sheet-income','sheet-budget','sheet-recurring','sheet-category','sheet-profile','sheet-goal','sheet-savings'].forEach(function(id){
    const el = document.getElementById(id);
    if(el){ el.hidden = true; el.style.transform = ''; }
  });
  editingTxId = null;
  document.getElementById('sheet-backdrop').hidden = true;
}

// ---------- Category picker grid ----------
function buildCategoryGrid(containerId, selectedId, onSelect){
  const el = document.getElementById(containerId);
  el.innerHTML = state.categories.map(function(c){
    return '<button type="button" class="category-chip '+(c.id===selectedId?'selected':'')+'" data-cat="'+c.id+'">' +
      '<span class="cc-icon" style="background:'+c.color+'22;">'+catGlyph(c)+'</span><span>'+escapeHtml(c.name)+'</span></button>';
  }).join('');
  Array.from(el.querySelectorAll('.category-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      Array.from(el.querySelectorAll('.category-chip')).forEach(function(c){ c.classList.remove('selected'); });
      chip.classList.add('selected');
      onSelect(chip.dataset.cat);
    });
  });
}

// ---------- Add / edit transaction sheet ----------
function openAddSheet(editId){
  editingTxId = (typeof editId === 'string') ? editId : null;
  const editing = editingTxId ? state.transactions.find(function(t){return t.id===editingTxId;}) : null;

  document.getElementById('add-sheet-title').textContent = editing ? 'Edit transaction' : 'New transaction';
  document.getElementById('btn-save-tx').textContent = editing ? 'Save changes' : 'Save transaction';

  txTypeInSheet = editing ? editing.type : 'expense';
  selectedCategoryInSheet = editing ? (editing.categoryId || state.categories[0].id) : state.categories[0].id;

  document.getElementById('amount-input').value = editing ? formatAmountString(String(editing.amount)) : '';
  document.getElementById('note-input').value = editing ? (editing.note || '') : '';
  document.getElementById('date-input').value = editing ? editing.date : todayISO();
  document.getElementById('time-input').value = editing ? txTime(editing) : currentHHMM();

  document.querySelectorAll('.type-pill').forEach(function(p){ p.classList.toggle('active', p.dataset.type===txTypeInSheet); });
  document.getElementById('category-field-group').hidden = (txTypeInSheet === 'income');
  document.getElementById('amount-stage-label').textContent = txTypeInSheet === 'income' ? 'Income amount' : 'Amount';

  buildCategoryGrid('category-grid-add', selectedCategoryInSheet, function(id){ selectedCategoryInSheet = id; });
  openSheet('sheet-add');
  if(!editing) setTimeout(function(){ document.getElementById('amount-input').focus(); }, 250);
}

function saveTransactionFromSheet(){
  const amount = parseAmount(document.getElementById('amount-input').value);
  if(!amount || amount <= 0){ toast('Enter a valid amount'); return; }
  const note = document.getElementById('note-input').value.trim();
  const date = document.getElementById('date-input').value || todayISO();
  const time = document.getElementById('time-input').value || currentHHMM();
  const categoryId = txTypeInSheet === 'expense' ? selectedCategoryInSheet : null;

  // for the over-budget nudge: category spend before this save
  const watchBudget = (txTypeInSheet === 'expense' && categoryId)
    ? state.budgets.find(function(b){ return b.categoryId === categoryId; }) : null;
  const spentBefore = watchBudget ? spentThisMonthFor(categoryId) : 0;

  if(editingTxId){
    const tx = state.transactions.find(function(t){ return t.id === editingTxId; });
    if(tx){
      tx.type = txTypeInSheet;
      tx.amount = amount;
      tx.categoryId = categoryId;
      tx.note = note;
      tx.date = date;
      tx.time = time;
    }
    editingTxId = null;
    saveState();
    closeSheet('sheet-add');
    renderAll();
    toast('Transaction updated');
  } else {
    state.transactions.push({
      id: uid(),
      type: txTypeInSheet,
      amount: amount,
      categoryId: categoryId,
      note: note,
      date: date,
      time: time,
      createdAt: Date.now(),
    });
    saveState();
    closeSheet('sheet-add');
    renderAll();
    const spentAfter = watchBudget ? spentThisMonthFor(categoryId) : 0;
    if(watchBudget && spentBefore <= watchBudget.amount && spentAfter > watchBudget.amount){
      toast('Heads up — over your ' + getCategory(categoryId).name + ' budget by ' + fmtMoney(spentAfter - watchBudget.amount));
    } else {
      toast(txTypeInSheet === 'expense' ? 'Expense added' : 'Income added');
    }
  }
}

// ---------- Transaction detail (view) sheet ----------
function openTxDetail(id){
  const tx = state.transactions.find(function(t){ return t.id === id; });
  if(!tx) return;
  viewingTxId = id;
  const isIncome = tx.type === 'income';
  const cat = getCategory(tx.categoryId);

  document.getElementById('detail-icon').innerHTML = isIncome ? incomeGlyph() : catGlyph(cat);
  document.getElementById('detail-icon').style.background = isIncome ? 'rgba(185,212,240,0.18)' : (cat.color + '22');

  const amtEl = document.getElementById('detail-amount');
  amtEl.textContent = (isIncome ? '+' : '-') + fmtMoney(tx.amount).replace('-','');
  amtEl.style.color = isIncome ? '#DCEEFF' : '#FFD1D1';

  document.getElementById('detail-type-badge').textContent = isIncome ? 'Income' : 'Expense';
  document.getElementById('detail-category').textContent = isIncome ? 'Income' : cat.name;
  document.getElementById('detail-note').textContent = tx.note || '—';
  document.getElementById('detail-date').textContent =
    new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' }) + ' · ' + formatTime12(txTime(tx));

  openSheet('sheet-tx-detail');
}

function editTxFromDetail(){
  const id = viewingTxId;
  closeSheet('sheet-tx-detail');
  if(id) setTimeout(function(){ openAddSheet(id); }, 60);
}

function deleteTxFromDetail(){
  const id = viewingTxId;
  if(!id) return;
  const tx = state.transactions.find(function(t){ return t.id === id; });
  const label = tx ? (tx.note || (tx.type==='income' ? 'income' : getCategory(tx.categoryId).name)) : 'this transaction';
  if(confirm('Delete "' + label + '"? This cannot be undone.')){
    state.transactions = state.transactions.filter(function(t){ return t.id !== id; });
    viewingTxId = null;
    saveState();
    closeSheet('sheet-tx-detail');
    renderAll();
    toast('Transaction deleted');
  }
}

// ---------- Income sheet ----------
function openIncomeSheet(){
  document.getElementById('income-input').value = state.monthlyIncomeBase ? formatAmountString(String(state.monthlyIncomeBase)) : '';
  openSheet('sheet-income');
  setTimeout(function(){ document.getElementById('income-input').focus(); }, 250);
}
function saveIncome(){
  const val = parseAmount(document.getElementById('income-input').value);
  state.monthlyIncomeBase = isNaN(val) ? 0 : val;
  saveState();
  closeSheet('sheet-income');
  renderAll();
  toast('Monthly income updated');
}

// ---------- Budget sheet ----------
function openBudgetSheet(budgetId){
  editingBudgetId = budgetId || null;
  const budget = budgetId ? state.budgets.find(function(b){return b.id===budgetId;}) : null;
  document.getElementById('budget-sheet-title').textContent = budget ? 'Edit budget' : 'New budget';
  document.getElementById('btn-delete-budget').hidden = !budget;
  selectedCategoryInSheet = budget ? budget.categoryId : state.categories[0].id;
  buildCategoryGrid('category-grid-budget', selectedCategoryInSheet, function(id){ selectedCategoryInSheet = id; });
  document.getElementById('budget-amount-input').value = budget ? formatAmountString(String(budget.amount)) : '';
  openSheet('sheet-budget');
}
function saveBudget(){
  const amount = parseAmount(document.getElementById('budget-amount-input').value);
  if(!amount || amount<=0){ toast('Enter a valid amount'); return; }
  const existing = state.budgets.find(function(b){ return b.categoryId === selectedCategoryInSheet && b.id !== editingBudgetId; });
  if(existing){ toast('A budget for this category already exists'); return; }

  if(editingBudgetId){
    const b = state.budgets.find(function(x){return x.id===editingBudgetId;});
    b.categoryId = selectedCategoryInSheet;
    b.amount = amount;
  } else {
    state.budgets.push({ id: uid(), categoryId: selectedCategoryInSheet, amount: amount });
  }
  saveState();
  closeSheet('sheet-budget');
  renderAll();
  toast('Budget saved');
}
function deleteBudget(){
  state.budgets = state.budgets.filter(function(b){ return b.id !== editingBudgetId; });
  saveState();
  closeSheet('sheet-budget');
  renderAll();
  toast('Budget deleted');
}

// ---------- Recurring sheet ----------
function openRecurringSheet(recId){
  editingRecurringId = recId || null;
  const rec = recId ? state.recurring.find(function(r){return r.id===recId;}) : null;
  document.getElementById('recurring-sheet-title').textContent = rec ? 'Edit recurring item' : 'New recurring item';
  document.getElementById('btn-delete-recurring').hidden = !rec;
  document.getElementById('recurring-name-input').value = rec ? rec.name : '';
  document.getElementById('recurring-amount-input').value = rec ? formatAmountString(String(rec.amount)) : '';
  document.getElementById('recurring-day-input').value = rec ? rec.dayOfMonth : '';
  selectedCategoryInSheet = rec ? rec.categoryId : state.categories[0].id;
  buildCategoryGrid('category-grid-recurring', selectedCategoryInSheet, function(id){ selectedCategoryInSheet = id; });
  openSheet('sheet-recurring');
}
function saveRecurring(){
  const name = document.getElementById('recurring-name-input').value.trim();
  const amount = parseAmount(document.getElementById('recurring-amount-input').value);
  const day = parseInt(document.getElementById('recurring-day-input').value, 10);
  if(!name){ toast('Enter a name'); return; }
  if(!amount || amount<=0){ toast('Enter a valid amount'); return; }
  if(!day || day<1 || day>28){ toast('Day must be between 1 and 28'); return; }

  if(editingRecurringId){
    const r = state.recurring.find(function(x){return x.id===editingRecurringId;});
    r.name = name; r.amount = amount; r.dayOfMonth = day; r.categoryId = selectedCategoryInSheet;
  } else {
    state.recurring.push({ id: uid(), name: name, amount: amount, dayOfMonth: day, categoryId: selectedCategoryInSheet, lastAppliedMonth: null });
  }
  saveState();
  closeSheet('sheet-recurring');
  applyDueRecurring();
  renderAll();
  toast('Recurring item saved');
}
function deleteRecurring(){
  state.recurring = state.recurring.filter(function(r){ return r.id !== editingRecurringId; });
  saveState();
  closeSheet('sheet-recurring');
  renderAll();
  toast('Recurring item deleted');
}

// ---------- Category sheet ----------
let sheetCategoryIcon = ICON_CHOICES[0];
let sheetCategoryColor = COLOR_CHOICES[0];

function buildIconGrid(selectedIcon){
  const el = document.getElementById('icon-grid-category');
  el.innerHTML = ICON_CHOICES.map(function(key){
    return '<button type="button" class="icon-chip '+(key===selectedIcon?'selected':'')+'" data-icon="'+key+'">'+svgGlyph(ICON_LIBRARY[key], 'currentColor')+'</button>';
  }).join('');
  Array.from(el.querySelectorAll('.icon-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      Array.from(el.querySelectorAll('.icon-chip')).forEach(function(c){c.classList.remove('selected');});
      chip.classList.add('selected');
      sheetCategoryIcon = chip.dataset.icon;
    });
  });
}
function buildColorGrid(selectedColor){
  const el = document.getElementById('color-grid-category');
  el.innerHTML = COLOR_CHOICES.map(function(col){
    return '<button type="button" class="color-chip '+(col===selectedColor?'selected':'')+'" data-color="'+col+'" style="background:'+col+';"></button>';
  }).join('');
  Array.from(el.querySelectorAll('.color-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      Array.from(el.querySelectorAll('.color-chip')).forEach(function(c){c.classList.remove('selected');});
      chip.classList.add('selected');
      sheetCategoryColor = chip.dataset.color;
    });
  });
}

function openCategorySheet(catId){
  editingCategoryId = catId || null;
  const cat = catId ? state.categories.find(function(c){return c.id===catId;}) : null;
  document.getElementById('category-sheet-title').textContent = cat ? 'Edit category' : 'New category';
  document.getElementById('btn-delete-category').hidden = !cat;
  document.getElementById('category-name-input').value = cat ? cat.name : '';
  // Prefer an existing icon key; if old emoji data, default to first key.
  sheetCategoryIcon = (cat && ICON_LIBRARY[cat.icon]) ? cat.icon : ICON_CHOICES[0];
  sheetCategoryColor = cat ? cat.color : COLOR_CHOICES[0];
  buildIconGrid(sheetCategoryIcon);
  buildColorGrid(sheetCategoryColor);
  openSheet('sheet-category');
}
function saveCategory(){
  const name = document.getElementById('category-name-input').value.trim();
  if(!name){ toast('Enter a category name'); return; }
  if(editingCategoryId){
    const c = state.categories.find(function(x){return x.id===editingCategoryId;});
    c.name = name; c.icon = sheetCategoryIcon; c.color = sheetCategoryColor;
  } else {
    state.categories.push({ id: uid(), name: name, icon: sheetCategoryIcon, color: sheetCategoryColor });
  }
  saveState();
  closeSheet('sheet-category');
  renderAll();
  toast('Category saved');
}
function deleteCategory(){
  if(state.categories.length <= 1){ toast("You need at least one category"); return; }
  const inUse = state.transactions.some(function(t){return t.categoryId===editingCategoryId;}) ||
                state.budgets.some(function(b){return b.categoryId===editingCategoryId;}) ||
                state.recurring.some(function(r){return r.categoryId===editingCategoryId;});
  if(inUse){ toast("Can't delete — category is in use"); return; }
  state.categories = state.categories.filter(function(c){ return c.id !== editingCategoryId; });
  saveState();
  closeSheet('sheet-category');
  renderAll();
  toast('Category deleted');
}

// ===================== EXPORT / IMPORT =====================

function exportBackup(){
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateTag = todayISO();
  a.href = url;
  a.download = 'orbit-backup-' + dateTag + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Backup downloaded');
}

function importBackup(file){
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const parsed = JSON.parse(e.target.result);
      if(!parsed || typeof parsed !== 'object'){ throw new Error('bad format'); }
      state = Object.assign(defaultState(), parsed);
      saveState();
      renderAll();
      toast('Backup imported');
    }catch(err){
      toast('Could not read this backup file');
    }
  };
  reader.readAsText(file);
}

function resetAllData(){
  if(!confirm('This will permanently erase all transactions, budgets, and settings on this device. Continue?')) return;
  state = defaultState();
  saveState();
  renderAll();
  toast('All data reset');
}

// ===================== EVENT WIRING =====================

function wireEvents(){
  document.querySelectorAll('.nav-btn[data-view]').forEach(function(btn){
    btn.addEventListener('click', function(){ showView(btn.dataset.view); });
  });
  document.getElementById('btn-open-add').addEventListener('click', function(){ openAddSheet(); });

  document.getElementById('btn-profile').addEventListener('click', function(){ showView('settings'); });
  document.getElementById('btn-settings-back').addEventListener('click', function(){ showView('home'); });
  document.getElementById('row-budgets').addEventListener('click', function(){ showView('budgets'); });
  document.getElementById('row-recurring').addEventListener('click', function(){ showView('recurring'); });
  document.getElementById('row-categories').addEventListener('click', function(){ showView('categories'); });
  document.getElementById('btn-categories-back').addEventListener('click', function(){ showView('settings'); });
  document.getElementById('btn-budgets-back').addEventListener('click', function(){ showView('home'); });
  document.getElementById('btn-recurring-back').addEventListener('click', function(){ showView('home'); });
  document.getElementById('btn-history-back').addEventListener('click', function(){ showView('home'); });
  document.getElementById('btn-see-all').addEventListener('click', function(){ showView('history'); });

  document.getElementById('period-switch').addEventListener('click', function(e){
    const pill = e.target.closest('.period-pill');
    if(!pill) return;
    document.querySelectorAll('.period-pill').forEach(function(p){p.classList.remove('active');});
    pill.classList.add('active');
    currentPeriod = pill.dataset.period;
    requestEntryAnimation();
    renderHome();
    entryAnimate = false;
  });

  // Add / edit transaction sheet
  document.querySelectorAll('.type-pill').forEach(function(pill){
    pill.addEventListener('click', function(){
      document.querySelectorAll('.type-pill').forEach(function(p){p.classList.remove('active');});
      pill.classList.add('active');
      txTypeInSheet = pill.dataset.type;
      document.getElementById('category-field-group').hidden = (txTypeInSheet === 'income');
      document.getElementById('amount-stage-label').textContent = txTypeInSheet === 'income' ? 'Income amount' : 'Amount';
    });
  });
  document.getElementById('btn-save-tx').addEventListener('click', saveTransactionFromSheet);

  // Tap a transaction -> detail (view / edit / delete)
  document.getElementById('tx-list-home').addEventListener('click', handleTxRowClick);
  document.getElementById('tx-list-full').addEventListener('click', handleTxRowClick);
  document.getElementById('btn-edit-tx').addEventListener('click', editTxFromDetail);
  document.getElementById('btn-delete-tx').addEventListener('click', deleteTxFromDetail);

  // Income sheet
  document.getElementById('btn-edit-income').addEventListener('click', openIncomeSheet);
  document.getElementById('btn-save-income').addEventListener('click', saveIncome);

  document.getElementById('btn-edit-currency').addEventListener('click', cycleCurrency);

  // Budgets
  document.getElementById('btn-add-budget').addEventListener('click', function(){ openBudgetSheet(null); });
  document.getElementById('btn-save-budget').addEventListener('click', saveBudget);
  document.getElementById('btn-delete-budget').addEventListener('click', deleteBudget);
  document.getElementById('budget-list').addEventListener('click', function(e){
    const card = e.target.closest('.budget-card');
    if(card) openBudgetSheet(card.dataset.id);
  });

  // Recurring
  document.getElementById('btn-add-recurring').addEventListener('click', function(){ openRecurringSheet(null); });
  document.getElementById('btn-save-recurring').addEventListener('click', saveRecurring);
  document.getElementById('btn-delete-recurring').addEventListener('click', deleteRecurring);
  document.getElementById('recurring-list').addEventListener('click', function(e){
    const card = e.target.closest('.recurring-card');
    if(card) openRecurringSheet(card.dataset.id);
  });

  // Categories
  document.getElementById('btn-add-category').addEventListener('click', function(){ openCategorySheet(null); });
  document.getElementById('btn-save-category').addEventListener('click', saveCategory);
  document.getElementById('btn-delete-category').addEventListener('click', deleteCategory);
  document.getElementById('category-manage-list').addEventListener('click', function(e){
    const row = e.target.closest('.category-manage-row');
    if(row) openCategorySheet(row.dataset.id);
  });

  // History search & filters
  document.getElementById('search-input').addEventListener('input', function(e){
    historySearch = e.target.value;
    renderHistory();
  });
  document.getElementById('filter-chips').addEventListener('click', function(e){
    const chip = e.target.closest('.filter-chip');
    if(!chip) return;
    historyFilter = chip.dataset.cat;
    renderHistory();
  });

  // Export / import / reset
  document.getElementById('btn-export').addEventListener('click', exportBackup);
  document.getElementById('btn-export-csv').addEventListener('click', exportCsv);

  // v3: savings history
  document.getElementById('savings-card').addEventListener('click', openSavingsSheet);

  // v3: budget date-range filter
  document.getElementById('budget-range-switch').addEventListener('click', function(e){
    const pill = e.target.closest('.range-pill');
    if(!pill) return;
    budgetRangePreset = pill.dataset.range;
    if(budgetRangePreset === 'custom' && !budgetCustomFrom && !budgetCustomTo){
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      budgetCustomFrom = first.getFullYear() + '-' + String(first.getMonth()+1).padStart(2,'0') + '-01';
      budgetCustomTo = todayISO();
      document.getElementById('budget-from').value = budgetCustomFrom;
      document.getElementById('budget-to').value = budgetCustomTo;
    }
    renderBudgets();
  });
  document.getElementById('budget-from').addEventListener('change', function(){
    budgetCustomFrom = this.value; renderBudgets();
  });
  document.getElementById('budget-to').addEventListener('change', function(){
    budgetCustomTo = this.value; renderBudgets();
  });

  // v3: quick amount chips
  document.getElementById('quick-chips').addEventListener('click', function(e){
    const chip = e.target.closest('.quick-chip');
    if(!chip) return;
    const input = document.getElementById('amount-input');
    const current = parseAmount(input.value);
    const next = (isNaN(current) ? 0 : current) + parseInt(chip.dataset.add, 10);
    input.value = formatAmountString(String(next));
  });
  document.getElementById('btn-import').addEventListener('click', function(){
    document.getElementById('import-file-input').click();
  });
  document.getElementById('import-file-input').addEventListener('change', function(e){
    if(e.target.files && e.target.files[0]) importBackup(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('btn-reset').addEventListener('click', resetAllData);

  // Profile sheet
  document.getElementById('btn-edit-profile').addEventListener('click', openProfileSheet);
  document.getElementById('btn-save-profile').addEventListener('click', saveProfile);
  document.getElementById('profile-upload-btn').addEventListener('click', function(){ document.getElementById('profile-avatar-file').click(); });
  document.getElementById('profile-icon-btn').addEventListener('click', function(){
    const g = document.getElementById('profile-icon-grid'); g.hidden = !g.hidden;
  });
  document.getElementById('profile-avatar-file').addEventListener('change', function(e){
    if(e.target.files && e.target.files[0]) readAvatarFile(e.target.files[0], function(dataUrl){ profileDraftAvatar = dataUrl; renderProfileSheetAvatar(); });
    e.target.value = '';
  });
  document.getElementById('profile-name-input').addEventListener('input', renderProfileSheetAvatar);

  // Savings goal sheet
  document.getElementById('btn-edit-goal').addEventListener('click', openGoalSheet);
  document.getElementById('btn-save-goal').addEventListener('click', saveGoal);

  // Onboarding
  document.getElementById('ob-next').addEventListener('click', obNext);
  document.getElementById('ob-back').addEventListener('click', obBack);
  document.getElementById('ob-upload-btn').addEventListener('click', function(){ document.getElementById('ob-avatar-file').click(); });
  document.getElementById('ob-icon-btn').addEventListener('click', function(){
    const g = document.getElementById('ob-icon-grid'); g.hidden = !g.hidden;
  });
  document.getElementById('ob-avatar-file').addEventListener('change', function(e){
    if(e.target.files && e.target.files[0]) readAvatarFile(e.target.files[0], function(dataUrl){ obDraft.avatar = dataUrl; renderObAvatar(); });
    e.target.value = '';
  });

  // Live comma formatting on all amount inputs
  ['amount-input','income-input','budget-amount-input','recurring-amount-input','ob-income','ob-goal','goal-input'].forEach(function(id){
    attachAmountFormatting(document.getElementById(id));
  });

  document.getElementById('sheet-backdrop').addEventListener('click', closeAllSheets);

  // Drag-to-dismiss for every sheet (handle + header)
  ['sheet-add','sheet-tx-detail','sheet-income','sheet-budget','sheet-recurring','sheet-category','sheet-profile','sheet-goal','sheet-savings'].forEach(makeSheetDraggable);

  // Instagram-style nav: shrink on scroll down, grow on scroll up
  initNavScroll();

  window.addEventListener('resize', function(){
    if(currentView === 'home'){ drawTrendChart(); renderHome(); }
  });
}

function handleTxRowClick(e){
  const row = e.target.closest('.tx-row');
  if(!row) return;
  openTxDetail(row.dataset.id);
}

function cycleCurrency(){
  const keys = Object.keys(CURRENCIES);
  const idx = keys.indexOf(state.currency);
  state.currency = keys[(idx+1) % keys.length];
  saveState();
  renderAll();
  toast('Currency set to ' + CURRENCIES[state.currency].label);
}

// ===================== v2.0: FORMATTING / PROFILE / ONBOARDING =====================

// ---------- Amount input: live thousands separators ----------
function parseAmount(str){
  if(typeof str === 'number') return str;
  if(str === null || str === undefined) return NaN;
  const cleaned = String(str).replace(/,/g, '').replace(/[^0-9.]/g, '');
  if(cleaned === '' || cleaned === '.') return NaN;
  return parseFloat(cleaned);
}
function formatAmountString(raw){
  let s = String(raw == null ? '' : raw).replace(/,/g, '').replace(/[^0-9.]/g, '');
  const firstDot = s.indexOf('.');
  if(firstDot !== -1){
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }
  let parts = s.split('.');
  let intPart = parts[0].replace(/^0+(?=\d)/, '');
  const grouped = intPart ? Number(intPart).toLocaleString('en-US') : (s.indexOf('.') === 0 ? '0' : '');
  if(parts.length > 1){
    return (grouped || '0') + '.' + parts[1].slice(0, 2);
  }
  return grouped;
}
function attachAmountFormatting(input){
  if(!input) return;
  input.addEventListener('input', function(){
    input.value = formatAmountString(input.value);
    try { input.setSelectionRange(input.value.length, input.value.length); } catch(e){}
  });
}

// ---------- Time helpers ----------
function currentHHMM(){
  const d = new Date();
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}
function txTime(t){
  if(t && t.time) return t.time;
  if(t && t.createdAt){ const d = new Date(t.createdAt); return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); }
  return '12:00';
}
function formatTime12(hhmm){
  if(!hhmm) return '';
  const parts = String(hhmm).split(':');
  let h = parseInt(parts[0], 10) || 0;
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if(h === 0) h = 12;
  return h + ':' + m + ' ' + ampm;
}

// ---------- Avatar / profile ----------
function avatarMarkup(profile){
  const p = profile || state.profile || {};
  if(p.avatar && p.avatar.indexOf('data:') === 0){
    return '<img class="avatar-img" src="' + p.avatar + '" alt="">';
  }
  if(p.avatar && p.avatar.indexOf('icon:') === 0){
    const key = p.avatar.slice(5);
    const inner = AVATAR_ICON_LIBRARY[key] || ICON_LIBRARY[key];
    if(inner) return svgGlyph(inner, '#EAF3FF');
  }
  const name = (p.name || '').trim();
  if(name){
    return '<span class="avatar-initial">' + escapeHtml(name.charAt(0).toUpperCase()) + '</span>';
  }
  return svgGlyph('<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/>', '#EAF3FF');
}
function renderAvatarTargets(){
  const m = avatarMarkup(state.profile);
  ['profile-avatar-top','settings-avatar'].forEach(function(id){
    const el = document.getElementById(id);
    if(el) el.innerHTML = m;
  });
}
function greetingFor(d){
  const h = d.getHours();
  if(h < 5)  return 'Good night';
  if(h < 12) return 'Good morning';
  if(h < 17) return 'Good afternoon';
  if(h < 21) return 'Good evening';
  return 'Good night';
}
function renderProfile(){
  const name = (state.profile.name || '').trim();
  const firstName = name ? name.split(/\s+/)[0] : '';
  const hello = document.getElementById('greeting-hello');
  const dateEl = document.getElementById('greeting-date');
  if(hello) hello.textContent = greetingFor(new Date()) + (firstName ? ',' : '');
  if(dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
  const nameTop = document.getElementById('profile-name-top');
  if(nameTop) nameTop.textContent = firstName || 'You';
  const sName = document.getElementById('settings-name');
  if(sName) sName.textContent = name || 'Set up your profile';
  const sMeta = document.getElementById('settings-meta');
  if(sMeta) sMeta.textContent = state.profile.age ? ('Age ' + state.profile.age) : 'Tap to edit your profile';
  renderAvatarTargets();
}

// ---------- Savings goal strip (home) ----------
function renderGoalStrip(saved){
  const strip = document.getElementById('goal-strip');
  if(!strip) return;
  const goal = state.savingsGoal || 0;
  if(goal <= 0){ strip.hidden = true; return; }
  strip.hidden = false;
  const have = Math.max(saved, 0);
  const pct = Math.max(0, Math.min(100, (have / goal) * 100));
  document.getElementById('goal-strip-val').textContent = fmtMoney(have) + ' / ' + fmtMoney(goal);
  const fill = document.getElementById('goal-bar-fill');
  fill.style.width = pct + '%';
  const note = document.getElementById('goal-strip-note');
  if(have >= goal){
    note.textContent = 'Goal reached — nicely done 🎉';
    fill.classList.add('reached');
    strip.classList.add('complete');
  } else {
    note.textContent = Math.round(pct) + '% there · ' + fmtMoney(goal - have) + ' to go';
    fill.classList.remove('reached');
    strip.classList.remove('complete');
  }
}

// ---------- Avatar file -> downscaled dataURL ----------
function readAvatarFile(file, cb){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    const img = new Image();
    img.onload = function(){
      try {
        const size = 160;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const scale = Math.max(size / img.width, size / img.height);
        const dw = img.width * scale, dh = img.height * scale;
        ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
        cb(canvas.toDataURL('image/jpeg', 0.82));
      } catch(err){ cb(e.target.result); }
    };
    img.onerror = function(){ cb(e.target.result); };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ---------- Onboarding ----------
let obStep = 0;
const OB_TOTAL_STEPS = 4;
let obDraft = { name:'', age:'', avatar:'', currency:'BDT', income:0, goal:0 };

function startOnboarding(){
  obStep = 0;
  obDraft = { name:'', age:'', avatar:'', currency: state.currency || 'BDT', income:0, goal:0 };
  const ob = document.getElementById('onboarding');
  ob.hidden = false;
  buildObCurrencyGrid();
  buildObIconGrid();
  renderObAvatar();
  const sym = CURRENCIES[obDraft.currency].symbol;
  document.getElementById('ob-income-symbol').textContent = sym;
  document.getElementById('ob-goal-symbol').textContent = sym;
  showObStep(0);
}
function showObStep(n){
  obStep = Math.max(0, Math.min(OB_TOTAL_STEPS - 1, n));
  Array.from(document.querySelectorAll('.ob-step')).forEach(function(s){
    s.classList.toggle('active', Number(s.dataset.step) === obStep);
  });
  Array.from(document.querySelectorAll('.ob-dot')).forEach(function(d, i){
    d.classList.toggle('active', i === obStep);
    d.classList.toggle('done', i < obStep);
  });
  document.getElementById('ob-back').hidden = (obStep === 0);
  const next = document.getElementById('ob-next');
  next.textContent = (obStep === 0) ? 'Get started' : (obStep === OB_TOTAL_STEPS - 1 ? 'Start using Orbit' : 'Continue');
}
function obNext(){
  if(obStep === 1){
    const name = document.getElementById('ob-name').value.trim();
    if(!name){ toast('Please enter your name'); return; }
    obDraft.name = name;
    obDraft.age = document.getElementById('ob-age').value.trim();
  } else if(obStep === 2){
    obDraft.income = parseAmount(document.getElementById('ob-income').value) || 0;
  } else if(obStep === 3){
    obDraft.goal = parseAmount(document.getElementById('ob-goal').value) || 0;
    finishOnboarding();
    return;
  }
  showObStep(obStep + 1);
}
function obBack(){ if(obStep > 0) showObStep(obStep - 1); }
function finishOnboarding(){
  state.profile.name = obDraft.name;
  state.profile.age = obDraft.age;
  state.profile.avatar = obDraft.avatar;
  state.currency = obDraft.currency;
  state.monthlyIncomeBase = obDraft.income;
  state.savingsGoal = obDraft.goal;
  state.onboarded = true;
  saveState();
  const ob = document.getElementById('onboarding');
  ob.classList.add('hide');
  setTimeout(function(){ ob.hidden = true; ob.classList.remove('hide'); }, 450);
  renderAll();
  showView('home');
  const first = obDraft.name.split(/\s+/)[0];
  toast('Welcome to Orbit' + (first ? ', ' + first : '') + '!');
}
function buildObCurrencyGrid(){
  const el = document.getElementById('ob-currency-grid');
  el.innerHTML = Object.keys(CURRENCIES).map(function(code){
    return '<button type="button" class="ob-currency-chip ' + (code === obDraft.currency ? 'selected' : '') + '" data-cur="' + code + '">' +
      '<span class="ob-cur-sym">' + CURRENCIES[code].symbol + '</span><span class="ob-cur-code">' + code + '</span></button>';
  }).join('');
  Array.from(el.querySelectorAll('.ob-currency-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      obDraft.currency = chip.dataset.cur;
      Array.from(el.querySelectorAll('.ob-currency-chip')).forEach(function(c){ c.classList.remove('selected'); });
      chip.classList.add('selected');
      const sym = CURRENCIES[obDraft.currency].symbol;
      document.getElementById('ob-income-symbol').textContent = sym;
      document.getElementById('ob-goal-symbol').textContent = sym;
    });
  });
}
function renderObAvatar(){
  const el = document.getElementById('ob-avatar');
  if(el) el.innerHTML = avatarMarkup(obDraft);
}
function buildObIconGrid(){
  const el = document.getElementById('ob-icon-grid');
  el.innerHTML = AVATAR_ICONS.map(function(key){
    return '<button type="button" class="icon-chip" data-icon="' + key + '">' + svgGlyph(AVATAR_ICON_LIBRARY[key], 'currentColor') + '</button>';
  }).join('');
  Array.from(el.querySelectorAll('.icon-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      obDraft.avatar = 'icon:' + chip.dataset.icon;
      renderObAvatar();
      el.hidden = true;
    });
  });
}

// ---------- Profile sheet ----------
let profileDraftAvatar = '';
function openProfileSheet(){
  document.getElementById('profile-name-input').value = state.profile.name || '';
  document.getElementById('profile-age-input').value = state.profile.age || '';
  profileDraftAvatar = state.profile.avatar || '';
  buildProfileIconGrid();
  document.getElementById('profile-icon-grid').hidden = true;
  renderProfileSheetAvatar();
  openSheet('sheet-profile');
}
function renderProfileSheetAvatar(){
  const el = document.getElementById('profile-sheet-avatar');
  if(el) el.innerHTML = avatarMarkup({ name: document.getElementById('profile-name-input').value, avatar: profileDraftAvatar });
}
function buildProfileIconGrid(){
  const el = document.getElementById('profile-icon-grid');
  el.innerHTML = AVATAR_ICONS.map(function(key){
    return '<button type="button" class="icon-chip" data-icon="' + key + '">' + svgGlyph(AVATAR_ICON_LIBRARY[key], 'currentColor') + '</button>';
  }).join('');
  Array.from(el.querySelectorAll('.icon-chip')).forEach(function(chip){
    chip.addEventListener('click', function(){
      profileDraftAvatar = 'icon:' + chip.dataset.icon;
      renderProfileSheetAvatar();
      el.hidden = true;
    });
  });
}
function saveProfile(){
  state.profile.name = document.getElementById('profile-name-input').value.trim();
  state.profile.age = document.getElementById('profile-age-input').value.trim();
  state.profile.avatar = profileDraftAvatar;
  saveState();
  closeSheet('sheet-profile');
  renderProfile();
  toast('Profile saved');
}

// ---------- Savings goal sheet ----------
function openGoalSheet(){
  document.getElementById('goal-currency-symbol').textContent = CURRENCIES[state.currency].symbol;
  document.getElementById('goal-input').value = state.savingsGoal ? formatAmountString(String(state.savingsGoal)) : '';
  openSheet('sheet-goal');
}
function saveGoal(){
  const v = parseAmount(document.getElementById('goal-input').value);
  state.savingsGoal = isNaN(v) ? 0 : v;
  saveState();
  closeSheet('sheet-goal');
  renderAll();
  toast(state.savingsGoal > 0 ? 'Savings goal set' : 'Savings goal turned off');
}

// ---------- Nav glide: sliding active indicator ----------
function updateNavGlide(){
  const glide = document.getElementById('nav-glide');
  const nav = document.getElementById('bottom-nav');
  if(!glide || !nav || nav.hidden) return;
  const active = nav.querySelector('.nav-btn.active[data-view]');
  if(!active){ glide.style.opacity = '0'; return; }
  glide.style.opacity = '1';
  glide.style.width = active.offsetWidth + 'px';
  glide.style.transform = 'translateX(' + active.offsetLeft + 'px)';
}

// ---------- Instagram-style nav: shrink on scroll ----------
let lastScrollY = 0;
function initNavScroll(){
  const nav = document.getElementById('bottom-nav');
  if(!nav) return;
  window.addEventListener('scroll', function(){
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if(y > lastScrollY + 5 && y > 50){ nav.classList.add('shrink'); }
    else if(y < lastScrollY - 5){ nav.classList.remove('shrink'); }
    lastScrollY = y;
  }, { passive: true });
}

// ---------- Drag-to-dismiss sheets ----------
function makeSheetDraggable(sheetId){
  const sheet = document.getElementById(sheetId);
  if(!sheet) return;
  const zones = sheet.querySelectorAll('.sheet-handle, .sheet-header');
  let startY = 0, lastY = 0, dragging = false;
  function start(e){
    dragging = true;
    startY = lastY = (e.touches ? e.touches[0].clientY : e.clientY);
    sheet.style.transition = 'none';
  }
  function move(e){
    if(!dragging) return;
    lastY = (e.touches ? e.touches[0].clientY : e.clientY);
    const dy = Math.max(0, lastY - startY);
    sheet.style.transform = 'translate(-50%,' + dy + 'px)';
    if(dy > 4 && e.cancelable) e.preventDefault();
  }
  function end(){
    if(!dragging) return;
    dragging = false;
    const dy = Math.max(0, lastY - startY);
    sheet.style.transition = '';
    if(dy > 110){
      closeSheet(sheetId);
      setTimeout(function(){ sheet.style.transform = ''; }, 320);
    } else {
      sheet.style.transform = '';
    }
  }
  zones.forEach(function(z){
    z.addEventListener('touchstart', start, { passive: true });
    z.addEventListener('touchmove', move, { passive: false });
    z.addEventListener('touchend', end);
    z.addEventListener('touchcancel', end);
  });
}

// ===================== INIT =====================

function hideSplash(){
  const splash = document.getElementById('splash');
  if(!splash) return;
  setTimeout(function(){ splash.classList.add('hide'); }, 1700);
  setTimeout(function(){ if(splash.parentNode) splash.parentNode.removeChild(splash); }, 2350);
}

function init(){
  applyDueRecurring();
  wireEvents();
  renderAll();
  showView('home');
  hideSplash();

  // First-run onboarding (splash fades to reveal it for new users)
  if(!state.onboarded){
    startOnboarding();
  }

  updateNavGlide();
  window.addEventListener('resize', updateNavGlide);
  setTimeout(updateNavGlide, 60); // after first paint/fonts

  if('serviceWorker' in navigator && navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js').catch(function(err){
      console.warn('SW registration failed', err);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
