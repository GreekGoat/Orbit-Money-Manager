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
    categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
    transactions: [],
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
    return Object.assign(defaultState(), parsed, {
      categories: parsed.categories && parsed.categories.length ? parsed.categories : JSON.parse(JSON.stringify(DEFAULT_CATEGORIES))
    });
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

function renderAll(){
  renderCurrencySymbols();
  renderHome();
  renderHistory();
  renderBudgets();
  renderRecurring();
  renderSettings();
  renderCategoryManage();
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

  document.getElementById('stat-income').textContent = fmtMoney(income);
  document.getElementById('stat-spent').textContent = fmtMoney(spent);
  document.getElementById('stat-saved').textContent = fmtMoney(saved);

  const labelEl = document.getElementById('orbit-label');
  const amtEl = document.getElementById('orbit-amount');
  labelEl.textContent = over ? 'Overspent by' : 'Remaining this month';
  amtEl.textContent = over ? fmtMoney(Math.abs(remaining)) : fmtMoney(remaining);
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
    catContainer.innerHTML = sorted.map(([catId, amt])=>{
      const cat = getCategory(catId);
      const pctOfTotal = totalSpentPeriod>0 ? Math.round((amt/totalSpentPeriod)*100) : 0;
      return '<div class="category-row">' +
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

  drawTrendChart();
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}

function renderTxRow(t){
  const isIncome = t.type === 'income';
  const cat = getCategory(t.categoryId);
  const sign = isIncome ? '+' : '-';
  const dateLabel = formatDateLabel(t.date);
  const iconBg = isIncome ? 'rgba(185,212,240,0.18)' : (cat.color + '22');
  const glyph = isIncome ? incomeGlyph() : catGlyph(cat);
  return '<div class="tx-row" data-id="'+t.id+'">' +
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

// ---------- Trend chart (canvas) ----------
function drawTrendChart(){
  const canvas = document.getElementById('chart-trend');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width || (canvas.parentElement.clientWidth - 20);
  const h = 140;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0,0,w,h);

  let buckets = [];
  const now = new Date();

  if(currentPeriod === 'day'){
    const labels = ['12am','4am','8am','12pm','4pm','8pm'];
    buckets = labels.map(function(l){ return {label:l, value:0}; });
    state.transactions.filter(function(t){ return t.type==='expense' && t.date === todayISO(); }).forEach(function(t){
      const hour = new Date(t.createdAt).getHours();
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
        buckets[wk].value += t.amount;
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

  const maxVal = Math.max.apply(null, buckets.map(function(b){return b.value;}).concat([1]));
  const padTop = 14, padBottom = 22, padSide = 6;
  const chartH = h - padTop - padBottom;
  const barW = (w - padSide*2) / buckets.length;
  const barInnerW = Math.max(barW * 0.5, 8);

  const grad = ctx.createLinearGradient(0, padTop, 0, padTop+chartH);
  grad.addColorStop(0, '#B9D4F0');
  grad.addColorStop(0.55, '#3DA9E8');
  grad.addColorStop(1, '#1A3A8F');

  ctx.font = '11px -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.textAlign = 'center';

  buckets.forEach(function(b,i){
    const x = padSide + i*barW + barW/2;
    const barH = Math.max((b.value/maxVal) * chartH, b.value>0 ? 4 : 0);
    const y = padTop + chartH - barH;

    ctx.beginPath();
    const r = Math.min(6, barInnerW/2);
    roundRect(ctx, x - barInnerW/2, y, barInnerW, barH, r);
    ctx.fillStyle = b.value>0 ? grad : 'rgba(255,255,255,0.14)';
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillText(b.label, x, h - 6);
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
  const range = getRangeForPeriod('month');
  const monthTx = txInRange(range.start, range.end).filter(function(t){return t.type==='expense';});

  if(state.budgets.length === 0){
    listEl.innerHTML = '';
    document.getElementById('budgets-empty').hidden = false;
    return;
  }
  document.getElementById('budgets-empty').hidden = true;

  listEl.innerHTML = state.budgets.map(function(b){
    const cat = getCategory(b.categoryId);
    const spent = monthTx.filter(function(t){return t.categoryId===b.categoryId;}).reduce(function(s,t){return s+t.amount;},0);
    const pct = b.amount>0 ? Math.min((spent/b.amount)*100, 100) : 0;
    let statusClass = 'ok', statusText = fmtMoney(b.amount - spent) + ' left';
    if(spent >= b.amount){ statusClass='over'; statusText = fmtMoney(spent-b.amount) + ' over budget'; }
    else if(spent/b.amount >= 0.8){ statusClass='warn'; statusText = fmtMoney(b.amount-spent) + ' left · almost there'; }

    return '<div class="budget-card" data-id="'+b.id+'">' +
      '<div class="budget-top">' +
        '<div class="cat-icon" style="background:'+cat.color+'22;">'+catGlyph(cat)+'</div>' +
        '<span class="budget-cat-name">'+escapeHtml(cat.name)+'</span>' +
        '<span class="budget-amounts"><strong>'+fmtMoney(spent)+'</strong> / '+fmtMoney(b.amount)+'</span>' +
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
    document.getElementById('view-'+v).hidden = (v !== name);
  });
  document.getElementById('bottom-nav').hidden = !(name === 'home' || name === 'history' || name === 'budgets' || name === 'recurring');
  document.querySelectorAll('.nav-btn[data-view]').forEach(function(btn){
    btn.classList.toggle('active', btn.dataset.view === name);
  });
  currentView = name;
  window.scrollTo(0,0);
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
  ['sheet-add','sheet-tx-detail','sheet-income','sheet-budget','sheet-recurring','sheet-category'].forEach(function(id){
    const el = document.getElementById(id);
    if(el) el.hidden = true;
  });
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

  document.getElementById('amount-input').value = editing ? editing.amount : '';
  document.getElementById('note-input').value = editing ? (editing.note || '') : '';
  document.getElementById('date-input').value = editing ? editing.date : todayISO();

  document.querySelectorAll('.type-pill').forEach(function(p){ p.classList.toggle('active', p.dataset.type===txTypeInSheet); });
  document.getElementById('category-field-group').hidden = (txTypeInSheet === 'income');
  document.getElementById('amount-stage-label').textContent = txTypeInSheet === 'income' ? 'Income amount' : 'Amount';

  buildCategoryGrid('category-grid-add', selectedCategoryInSheet, function(id){ selectedCategoryInSheet = id; });
  openSheet('sheet-add');
  if(!editing) setTimeout(function(){ document.getElementById('amount-input').focus(); }, 250);
}

function saveTransactionFromSheet(){
  const amount = parseFloat(document.getElementById('amount-input').value);
  if(!amount || amount <= 0){ toast('Enter a valid amount'); return; }
  const note = document.getElementById('note-input').value.trim();
  const date = document.getElementById('date-input').value || todayISO();
  const categoryId = txTypeInSheet === 'expense' ? selectedCategoryInSheet : null;

  if(editingTxId){
    const tx = state.transactions.find(function(t){ return t.id === editingTxId; });
    if(tx){
      tx.type = txTypeInSheet;
      tx.amount = amount;
      tx.categoryId = categoryId;
      tx.note = note;
      tx.date = date;
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
      createdAt: Date.now(),
    });
    saveState();
    closeSheet('sheet-add');
    renderAll();
    toast(txTypeInSheet === 'expense' ? 'Expense added' : 'Income added');
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
    new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });

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
  document.getElementById('income-input').value = state.monthlyIncomeBase || '';
  openSheet('sheet-income');
  setTimeout(function(){ document.getElementById('income-input').focus(); }, 250);
}
function saveIncome(){
  const val = parseFloat(document.getElementById('income-input').value);
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
  document.getElementById('budget-amount-input').value = budget ? budget.amount : '';
  openSheet('sheet-budget');
}
function saveBudget(){
  const amount = parseFloat(document.getElementById('budget-amount-input').value);
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
  document.getElementById('recurring-amount-input').value = rec ? rec.amount : '';
  document.getElementById('recurring-day-input').value = rec ? rec.dayOfMonth : '';
  selectedCategoryInSheet = rec ? rec.categoryId : state.categories[0].id;
  buildCategoryGrid('category-grid-recurring', selectedCategoryInSheet, function(id){ selectedCategoryInSheet = id; });
  openSheet('sheet-recurring');
}
function saveRecurring(){
  const name = document.getElementById('recurring-name-input').value.trim();
  const amount = parseFloat(document.getElementById('recurring-amount-input').value);
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

  document.getElementById('btn-settings').addEventListener('click', function(){ showView('settings'); });
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
    renderHome();
  });

  // Add / edit transaction sheet
  document.getElementById('btn-close-add').addEventListener('click', function(){ editingTxId = null; closeSheet('sheet-add'); });
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
  document.getElementById('btn-close-tx-detail').addEventListener('click', function(){ closeSheet('sheet-tx-detail'); });
  document.getElementById('btn-edit-tx').addEventListener('click', editTxFromDetail);
  document.getElementById('btn-delete-tx').addEventListener('click', deleteTxFromDetail);

  // Income sheet
  document.getElementById('btn-edit-income').addEventListener('click', openIncomeSheet);
  document.getElementById('btn-close-income').addEventListener('click', function(){ closeSheet('sheet-income'); });
  document.getElementById('btn-save-income').addEventListener('click', saveIncome);

  document.getElementById('btn-edit-currency').addEventListener('click', cycleCurrency);

  // Budgets
  document.getElementById('btn-add-budget').addEventListener('click', function(){ openBudgetSheet(null); });
  document.getElementById('btn-close-budget').addEventListener('click', function(){ closeSheet('sheet-budget'); });
  document.getElementById('btn-save-budget').addEventListener('click', saveBudget);
  document.getElementById('btn-delete-budget').addEventListener('click', deleteBudget);
  document.getElementById('budget-list').addEventListener('click', function(e){
    const card = e.target.closest('.budget-card');
    if(card) openBudgetSheet(card.dataset.id);
  });

  // Recurring
  document.getElementById('btn-add-recurring').addEventListener('click', function(){ openRecurringSheet(null); });
  document.getElementById('btn-close-recurring').addEventListener('click', function(){ closeSheet('sheet-recurring'); });
  document.getElementById('btn-save-recurring').addEventListener('click', saveRecurring);
  document.getElementById('btn-delete-recurring').addEventListener('click', deleteRecurring);
  document.getElementById('recurring-list').addEventListener('click', function(e){
    const card = e.target.closest('.recurring-card');
    if(card) openRecurringSheet(card.dataset.id);
  });

  // Categories
  document.getElementById('btn-add-category').addEventListener('click', function(){ openCategorySheet(null); });
  document.getElementById('btn-close-category').addEventListener('click', function(){ closeSheet('sheet-category'); });
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
  document.getElementById('btn-import').addEventListener('click', function(){
    document.getElementById('import-file-input').click();
  });
  document.getElementById('import-file-input').addEventListener('change', function(e){
    if(e.target.files && e.target.files[0]) importBackup(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('btn-reset').addEventListener('click', resetAllData);

  document.getElementById('sheet-backdrop').addEventListener('click', closeAllSheets);

  window.addEventListener('resize', function(){
    if(currentView === 'home') drawTrendChart();
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

  if('serviceWorker' in navigator && navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js').catch(function(err){
      console.warn('SW registration failed', err);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
