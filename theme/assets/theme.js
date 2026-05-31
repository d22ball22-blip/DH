/* ============================================================
   AUVELLE — Shopify theme interactions (AJAX cart + UI)
   ============================================================ */
(function () {
  'use strict';
  var R = (window.AUVELLE && window.AUVELLE.routes) || {};
  var FREE = (window.AUVELLE && window.AUVELLE.freeShip) || 5000;
  var MF = (window.AUVELLE && window.AUVELLE.moneyFormat) || '${{amount}}';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- money ---------- */
  function money(cents) {
    var v = (cents / 100).toFixed(2);
    var parts = v.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var amount = parts.join('.');
    return MF.replace(/\{\{\s*amount\s*\}\}/g, amount)
             .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, parts[0])
             .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, v.replace('.', ','));
  }

  /* ---------- cart fetch / render ---------- */
  function getCart() { return fetch(R.cart + '.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); }); }

  function renderCart(cart) {
    $$('.cart-count').forEach(function (el) { el.textContent = cart.item_count; el.style.display = cart.item_count ? 'grid' : 'none'; });
    var items = $('#cartItems'), foot = $('#cartFoot'), free = $('#cartFree');
    if (!items) return;
    if (!cart.item_count) {
      items.innerHTML = '<div class="cart__empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="9.5" cy="20.5" r="1.5"/><circle cx="17.5" cy="20.5" r="1.5"/></svg><p>Your bag is empty</p><p style="font-size:13px;margin-top:6px;">Discover your perfect glow ritual.</p></div>';
      if (foot) foot.style.display = 'none';
      if (free) free.innerHTML = 'Free shipping on orders over <b>' + money(FREE) + '</b>';
      return;
    }
    if (foot) foot.style.display = 'block';
    items.innerHTML = cart.items.map(function (l) {
      var img = l.image ? '<img src="' + l.image + '" alt="" style="width:100%;height:100%;object-fit:cover;">' : '<div style="height:100%;background:linear-gradient(135deg,#E8D5C4,#D4B483)"></div>';
      var opts = (l.options_with_values || []).map(function (o) { return o.value; }).filter(function (v) { return v && v !== 'Default Title'; }).join(' · ');
      return '<div class="cart-item">' +
        '<div class="cart-item__img">' + img + '</div>' +
        '<div><div class="cart-item__name">' + l.product_title + '</div>' +
        (opts ? '<div class="cart-item__var">' + opts + '</div>' : '') +
        '<div class="qty" data-key="' + l.key + '"><button data-act="dec" aria-label="Decrease">−</button><span>' + l.quantity + '</span><button data-act="inc" aria-label="Increase">+</button></div></div>' +
        '<div style="text-align:right;display:flex;flex-direction:column;justify-content:space-between;"><div class="cart-item__price">' + money(l.final_line_price) + '</div><button class="cart-item__remove" data-rmkey="' + l.key + '">Remove</button></div>' +
        '</div>';
    }).join('');
    var sub = cart.items_subtotal_price;
    var disc = cart.total_discount || 0;
    if ($('#cartSubtotal')) $('#cartSubtotal').textContent = money(sub);
    var dRow = $('#cartDiscRow');
    if (dRow) { dRow.style.display = disc > 0 ? 'flex' : 'none'; if ($('#cartDisc')) $('#cartDisc').textContent = '−' + money(disc); }
    if ($('#cartTotal')) $('#cartTotal').textContent = money(cart.total_price);
    var remain = FREE - sub;
    if (free) free.innerHTML = remain > 0 ? "You're <b>" + money(remain) + '</b> away from free shipping' : "🎉 You've unlocked <b>free shipping</b>";
  }

  function refresh() { return getCart().then(renderCart); }

  /* ---------- add / change ---------- */
  function addId(id, qty) {
    return fetch(R.cart_add + '.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: [{ id: id, quantity: qty || 1 }] })
    }).then(function (r) { return r.json(); }).then(function (res) {
      return refresh().then(function () { openCart(); toast((res.items ? res.items[0].product_title : 'Item') + ' added to your bag'); });
    });
  }
  function addItems(items) {
    return fetch(R.cart_add + '.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: items })
    }).then(function (r) { return r.json(); }).then(function () {
      return refresh().then(function () { openCart(); toast(items.length + ' items added to your bag'); });
    });
  }
  function changeKey(key, qty) {
    return fetch(R.cart_change + '.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    }).then(function (r) { return r.json(); }).then(renderCart);
  }

  /* ---------- drawer ---------- */
  var scrim = $('#scrim'), drawer = $('#cart');
  function openCart() { if (scrim) scrim.classList.add('is-open'); if (drawer) drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { if (scrim) scrim.classList.remove('is-open'); if (drawer) drawer.classList.remove('is-open'); document.body.style.overflow = ''; }

  /* ---------- toast ---------- */
  var tT;
  function toast(msg) { var t = $('#toast'); if (!t) return; $('#toastMsg').textContent = msg; t.classList.add('is-show'); clearTimeout(tT); tT = setTimeout(function () { t.classList.remove('is-show'); }, 2600); }

  /* ---------- discount (sets Shopify discount cookie; applies at checkout) ---------- */
  function applyPromo(code) {
    code = (code || '').trim();
    var msg = $('#promoMsg');
    if (!code) return;
    fetch('/discount/' + encodeURIComponent(code), { method: 'GET' }).then(function () {
      return refresh();
    }).then(function () {
      if (msg) { msg.textContent = '✓ ' + code.toUpperCase() + ' applied — shown at checkout'; msg.className = 'cart__promo-msg is-ok'; }
    }).catch(function () {
      if (msg) { msg.textContent = 'Could not apply that code.'; msg.className = 'cart__promo-msg is-err'; }
    });
  }

  /* ---------- delegated events ---------- */
  document.addEventListener('click', function (e) {
    var openC = e.target.closest('[data-open-cart]'); if (openC) { e.preventDefault(); openCart(); refresh(); return; }
    if (e.target.closest('[data-close-cart]')) { closeCart(); return; }

    var q = e.target.closest('.qty button');
    if (q) {
      var wrap = q.parentElement, key = wrap.getAttribute('data-key');
      var cur = parseInt(wrap.querySelector('span').textContent, 10) || 1;
      changeKey(key, q.getAttribute('data-act') === 'inc' ? cur + 1 : cur - 1); return;
    }
    var rm = e.target.closest('[data-rmkey]'); if (rm) { changeKey(rm.getAttribute('data-rmkey'), 0); return; }

    var pq = e.target.closest('[data-pqty]');
    if (pq) { var inp = $('#pdpQtyVal'); var v = parseInt(inp.value, 10) || 1; v = Math.max(1, v + (pq.getAttribute('data-pqty') === 'inc' ? 1 : -1)); inp.value = v; return; }

    var opt = e.target.closest('.opt[data-option]');
    if (opt) { selectOption(opt); return; }

    var thumb = e.target.closest('.pdp__thumb');
    if (thumb) {
      $$('.pdp__thumb').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      var src = thumb.getAttribute('data-media'); var main = $('#pdpMainImg');
      if (src && main) main.src = src;
      return;
    }
    var fbt = e.target.closest('[data-fbt-add]');
    if (fbt) {
      e.preventDefault();
      var raw = (fbt.getAttribute('data-ids') || '').split(',').filter(Boolean);
      if (raw.length) { addItems(raw.map(function (id) { return { id: id.trim(), quantity: 1 }; })); }
      return;
    }
    if (e.target.closest('#promoApply')) { e.preventDefault(); applyPromo($('#promoInput') && $('#promoInput').value); return; }
    if (e.target.closest('[data-sticky-add]')) { e.preventDefault(); var f = $('#product-form'); if (f) f.requestSubmit ? f.requestSubmit() : f.querySelector('[type=submit]').click(); return; }

    if (e.target.closest('[data-mnav-open]')) { $('#mnav').classList.add('is-open'); document.body.style.overflow = 'hidden'; return; }
    if (e.target.closest('[data-mnav-close]')) { $('#mnav').classList.remove('is-open'); document.body.style.overflow = ''; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCart(); var m = $('#mnav'); if (m) m.classList.remove('is-open'); }
    if (e.key === 'Enter' && e.target && e.target.id === 'promoInput') { e.preventDefault(); applyPromo(e.target.value); }
  });

  /* ---------- intercept ALL add-to-cart forms ---------- */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var action = (form.getAttribute('action') || '');
    if (action.indexOf('/cart/add') === -1) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var idField = form.querySelector('[name="id"]');
    var qtyField = form.querySelector('[name="quantity"]');
    if (!idField) return;
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.setAttribute('aria-disabled', 'true'); btn.classList.add('loading'); btn.disabled = true; }
    addId(idField.value, qtyField ? parseInt(qtyField.value, 10) || 1 : 1).finally(function () {
      if (btn) { btn.removeAttribute('aria-disabled'); btn.classList.remove('loading'); btn.disabled = false; }
    });
  }, true);

  /* ---------- PDP variant selection ---------- */
  function selectOption(btn) {
    var group = btn.closest('.opt-group');
    $$('.opt', group).forEach(function (o) { o.classList.remove('is-active'); });
    btn.classList.add('is-active');
    // gather selected values per option group
    var chosen = $$('.opt-group').map(function (g) { var a = g.querySelector('.opt.is-active'); return a ? a.getAttribute('data-value') : null; });
    var sel = $('#variantSelect'); if (!sel) return;
    // find matching variant by title join
    var want = chosen.filter(Boolean).join(' / ');
    var match = $$('option', sel).filter(function (o) { return o.textContent.trim() === want; })[0];
    if (match) {
      sel.value = match.value;
      var price = match.getAttribute('data-price');
      if (price && $('#pdpPrice')) $('#pdpPrice').textContent = price;
      var add = $('#pdpAdd'); if (add && price) add.textContent = 'Add to Bag — ' + price;
      if (match.disabled && add) { add.disabled = true; add.textContent = 'Sold Out'; } else if (add) { add.disabled = false; }
    }
  }

  /* ---------- sticky header + ATC ---------- */
  var header = $('#header'), hero = $('#hero');
  function onScroll() {
    if (!header) return;
    var th = hero ? hero.offsetHeight - 90 : 80;
    if (window.scrollY > th || !hero) { header.classList.add('is-solid'); header.classList.remove('is-transparent'); }
    else { header.classList.add('is-transparent'); header.classList.remove('is-solid'); }
    var atc = $('#stickyAtc');
    if (atc) {
      var buy = $('#pdpBuy'), show;
      if (buy) { show = buy.getBoundingClientRect().bottom < 0; } else { show = window.scrollY > (hero ? hero.offsetHeight + 200 : 600); }
      var nearFoot = window.scrollY + window.innerHeight > document.body.offsetHeight - 380;
      atc.classList.toggle('is-visible', show && !nearFoot);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- before/after sliders ---------- */
  $$('.ba').forEach(function (el) {
    var before = el.querySelector('.ba__before'), handle = el.querySelector('.ba__handle'), knob = el.querySelector('.ba__knob');
    var drag = false;
    function set(p) { p = Math.max(2, Math.min(98, p)); before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)'; handle.style.left = p + '%'; knob.style.left = p + '%'; }
    function from(e) { var r = el.getBoundingClientRect(); var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left; set(x / r.width * 100); }
    el.addEventListener('mousedown', function (e) { drag = true; from(e); });
    el.addEventListener('touchstart', function (e) { drag = true; from(e); }, { passive: true });
    window.addEventListener('mousemove', function (e) { if (drag) from(e); });
    window.addEventListener('touchmove', function (e) { if (drag) from(e); }, { passive: true });
    window.addEventListener('mouseup', function () { drag = false; });
    window.addEventListener('touchend', function () { drag = false; });
    set(50);
  });

  /* ---------- reviews carousel ---------- */
  (function () {
    var track = $('#revTrack'); if (!track) return;
    var cards = $$('.rev-card', track), index = 0;
    function per() { return window.innerWidth <= 760 ? 1 : window.innerWidth <= 1024 ? 2 : 3; }
    function maxI() { return Math.max(0, cards.length - per()); }
    var dots = $('#revDots');
    function build() { if (!dots) return; dots.innerHTML = ''; for (var i = 0; i <= maxI(); i++) { (function (i) { var d = document.createElement('button'); d.className = 'rev-dot' + (i === index ? ' is-active' : ''); d.addEventListener('click', function () { index = i; upd(); }); dots.appendChild(d); })(i); } }
    function upd() { index = Math.min(index, maxI()); var gap = parseFloat(getComputedStyle(track).gap) || 24; var step = cards[0].offsetWidth + gap; track.style.transform = 'translateX(' + (-index * step) + 'px)'; $$('.rev-dot', dots).forEach(function (d, i) { d.classList.toggle('is-active', i === index); }); }
    var prev = $('#revPrev'), next = $('#revNext');
    if (prev) prev.addEventListener('click', function () { index = index <= 0 ? maxI() : index - 1; upd(); });
    if (next) next.addEventListener('click', function () { index = index >= maxI() ? 0 : index + 1; upd(); });
    setInterval(function () { index = index >= maxI() ? 0 : index + 1; upd(); }, 5000);
    build(); upd();
    window.addEventListener('resize', function () { build(); upd(); });
  })();

  /* ---------- FAQ ---------- */
  $$('.faq__q').forEach(function (q) { q.addEventListener('click', function () { var item = q.closest('.faq__item'); var open = item.classList.contains('is-open'); $$('.faq__item').forEach(function (i) { i.classList.remove('is-open'); }); if (!open) item.classList.add('is-open'); }); });

  /* ---------- reveal ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- init ---------- */
  refresh(); onScroll();
})();
