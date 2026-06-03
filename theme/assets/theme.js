/* ============================================================
   AUVELLE BEAUTY 2026 — Interactions
   Rhode-inspired luxury UX · AJAX cart · Popup · Mega menu
   ============================================================ */
(function () {
  'use strict';

  var R   = (window.AUVELLE && window.AUVELLE.routes) || {};
  var FREE = (window.AUVELLE && window.AUVELLE.freeShip) || 5000;
  var MF   = (window.AUVELLE && window.AUVELLE.moneyFormat) || '${{amount}}';
  var $    = function (s, r) { return (r || document).querySelector(s); };
  var $$   = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── money ─────────────────────────────────────────────── */
  function money(cents) {
    var v = (cents / 100).toFixed(2);
    var p = v.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var amt = p.join('.');
    return MF.replace(/\{\{\s*amount\s*\}\}/g, amt)
             .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, p[0])
             .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, v.replace('.', ','));
  }

  /* ── cart fetch / render ────────────────────────────────── */
  function getCart() {
    return fetch(R.cart + '.js', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); });
  }

  function renderCart(cart) {
    /* counts */
    $$('.cart-count').forEach(function (el) {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count ? 'grid' : 'none';
    });

    var items = $('#cartItems'), foot = $('#cartFoot');
    if (!items) return;

    /* progress bar */
    updateProgress(cart.items_subtotal_price);

    if (!cart.item_count) {
      items.innerHTML = '<div class="cart__empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6L22 7H6"/><circle cx="9.5" cy="20.5" r="1.5"/><circle cx="17.5" cy="20.5" r="1.5"/></svg><p style="font-family:var(--display);font-size:22px;color:var(--ink)">Your bag is empty</p><p>Discover your perfect glow ritual.</p></div>';
      if (foot) foot.style.display = 'none';
      return;
    }

    if (foot) foot.style.display = 'block';

    items.innerHTML = cart.items.map(function (l) {
      var img = l.image
        ? '<img src="' + l.image + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;">'
        : '<div style="height:100%;background:linear-gradient(135deg,var(--blush),var(--sand))"></div>';
      var opts = (l.options_with_values || [])
        .map(function (o) { return o.value; })
        .filter(function (v) { return v && v !== 'Default Title'; })
        .join(' · ');
      return '<div class="cart-item">' +
        '<div class="cart-item__img">' + img + '</div>' +
        '<div>' +
          '<div class="cart-item__name">' + l.product_title + '</div>' +
          (opts ? '<div class="cart-item__var">' + opts + '</div>' : '') +
          '<div class="cart-item__price">' + money(l.final_line_price) + '</div>' +
          '<div class="qty" data-key="' + l.key + '">' +
            '<button data-act="dec" aria-label="Decrease">−</button>' +
            '<span>' + l.quantity + '</span>' +
            '<button data-act="inc" aria-label="Increase">+</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;">' +
          '<button class="cart-item__remove" data-rmkey="' + l.key + '">Remove</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var sub  = cart.items_subtotal_price;
    var disc = cart.total_discount || 0;
    if ($('#cartSubtotal')) $('#cartSubtotal').textContent = money(sub);
    var dRow = $('#cartDiscRow');
    if (dRow) {
      dRow.style.display = disc > 0 ? 'flex' : 'none';
      if ($('#cartDisc')) $('#cartDisc').textContent = '−' + money(disc);
    }
    if ($('#cartTotal')) $('#cartTotal').textContent = money(cart.total_price);
  }

  function updateProgress(subCents) {
    var fill = $('#progressFill'), msg = $('#progressMsg');
    if (!fill || !msg) return;
    var pct = Math.min(100, Math.round(subCents / FREE * 100));
    fill.style.width = pct + '%';
    var remain = FREE - subCents;
    if (remain <= 0) {
      msg.innerHTML = '🎉 You\'ve unlocked <b>free shipping!</b>';
      msg.className = 'cart__progress-msg is-free';
    } else {
      msg.innerHTML = 'You\'re <b>' + money(remain) + '</b> away from free shipping';
      msg.className = 'cart__progress-msg';
    }
  }

  function refresh() { return getCart().then(renderCart); }

  /* ── add / change ───────────────────────────────────────── */
  function addId(id, qty) {
    return fetch(R.cart_add + '.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: [{ id: id, quantity: qty || 1 }] })
    }).then(function (r) { return r.json(); })
      .then(function (res) {
        return refresh().then(function () {
          openCart();
          toast((res.items ? res.items[0].product_title : 'Item') + ' added to your bag');
        });
      });
  }

  function addItems(items) {
    return fetch(R.cart_add + '.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: items })
    }).then(function (r) { return r.json(); })
      .then(function () {
        return refresh().then(function () {
          openCart();
          toast(items.length + ' items added to your bag');
        });
      });
  }

  function changeKey(key, qty) {
    return fetch(R.cart_change + '.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    }).then(function (r) { return r.json(); }).then(renderCart);
  }

  /* ── drawer ─────────────────────────────────────────────── */
  var scrim = $('#scrim'), drawer = $('#cart');
  function openCart() {
    if (scrim) scrim.classList.add('is-open');
    if (drawer) drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (scrim) scrim.classList.remove('is-open');
    if (drawer) drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── toast ──────────────────────────────────────────────── */
  var tT;
  function toast(msg) {
    var t = $('#toast');
    if (!t) return;
    $('#toastMsg').textContent = msg;
    t.classList.add('is-show');
    clearTimeout(tT);
    tT = setTimeout(function () { t.classList.remove('is-show'); }, 2800);
  }

  /* ── promo code ─────────────────────────────────────────── */
  function applyPromo(code) {
    code = (code || '').trim();
    var msg = $('#promoMsg');
    if (!code) return;
    fetch('/discount/' + encodeURIComponent(code), { method: 'GET' })
      .then(function () { return refresh(); })
      .then(function () {
        if (msg) { msg.textContent = '✓ ' + code.toUpperCase() + ' applied — shown at checkout'; msg.className = 'cart__promo-msg is-ok'; }
      })
      .catch(function () {
        if (msg) { msg.textContent = 'Could not apply that code.'; msg.className = 'cart__promo-msg is-err'; }
      });
  }

  /* ── delegated events ───────────────────────────────────── */
  document.addEventListener('click', function (e) {
    /* cart open */
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); refresh(); return; }
    if (e.target.closest('[data-close-cart]')) { closeCart(); return; }

    /* qty in cart */
    var q = e.target.closest('.qty button');
    if (q) {
      var wrap = q.parentElement, key = wrap.getAttribute('data-key');
      var cur = parseInt(wrap.querySelector('span').textContent, 10) || 1;
      changeKey(key, q.getAttribute('data-act') === 'inc' ? cur + 1 : cur - 1);
      return;
    }

    /* remove */
    var rm = e.target.closest('[data-rmkey]');
    if (rm) { changeKey(rm.getAttribute('data-rmkey'), 0); return; }

    /* pdp qty */
    var pq = e.target.closest('[data-pqty]');
    if (pq) {
      var inp = $('#pdpQtyVal');
      var v = parseInt(inp.value, 10) || 1;
      v = Math.max(1, v + (pq.getAttribute('data-pqty') === 'inc' ? 1 : -1));
      inp.value = v;
      return;
    }

    /* variant option */
    var opt = e.target.closest('.opt[data-option]');
    if (opt) { selectOption(opt); return; }

    /* gallery thumb */
    var thumb = e.target.closest('.pdp__thumb');
    if (thumb) {
      $$('.pdp__thumb').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      var src = thumb.getAttribute('data-media'), main = $('#pdpMainImg');
      if (src && main) { main.style.opacity = '0'; setTimeout(function () { main.src = src; main.style.opacity = '1'; }, 200); }
      return;
    }

    /* FBT */
    var fbt = e.target.closest('[data-fbt-add]');
    if (fbt) {
      e.preventDefault();
      var raw = (fbt.getAttribute('data-ids') || '').split(',').filter(Boolean);
      if (raw.length) { addItems(raw.map(function (id) { return { id: id.trim(), quantity: 1 }; })); }
      return;
    }

    /* promo */
    if (e.target.closest('#promoApply')) { e.preventDefault(); applyPromo($('#promoInput') && $('#promoInput').value); return; }

    /* sticky ATC */
    if (e.target.closest('[data-sticky-add]')) {
      e.preventDefault();
      var f = $('#product-form');
      if (f) f.requestSubmit ? f.requestSubmit() : f.querySelector('[type=submit]').click();
      return;
    }

    /* upsell add */
    var upsellBtn = e.target.closest('[data-upsell-id]');
    if (upsellBtn) {
      e.preventDefault();
      addId(upsellBtn.getAttribute('data-upsell-id'), 1);
      return;
    }

    /* mobile nav */
    if (e.target.closest('[data-mnav-open]')) { var m = $('#mnav'); if (m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; } return; }
    if (e.target.closest('[data-mnav-close]')) { var mn = $('#mnav'); if (mn) { mn.classList.remove('is-open'); document.body.style.overflow = ''; } return; }

    /* popup close */
    if (e.target.closest('[data-popup-close]') || (e.target.classList.contains('popup-overlay') && !e.target.closest('.popup'))) {
      closePopup();
      return;
    }
    if (e.target.closest('[data-popup-skip]')) { closePopup(); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCart();
      var m = $('#mnav'); if (m) m.classList.remove('is-open');
      closePopup();
      document.body.style.overflow = '';
    }
    if (e.key === 'Enter' && e.target && e.target.id === 'promoInput') { e.preventDefault(); applyPromo(e.target.value); }
  });

  /* ── form submission ────────────────────────────────────── */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var action = (form.getAttribute('action') || '');
    if (action.indexOf('/cart/add') === -1) return;
    e.preventDefault();
    var idField  = form.querySelector('[name="id"]');
    var qtyField = form.querySelector('[name="quantity"]');
    if (!idField) return;
    addId(idField.value, qtyField ? parseInt(qtyField.value, 10) || 1 : 1);
  });

  /* ── PDP variant selection ──────────────────────────────── */
  function selectOption(btn) {
    var group = btn.closest('.opt-group');
    $$('.opt', group).forEach(function (o) { o.classList.remove('is-active'); });
    btn.classList.add('is-active');
    var chosen = $$('.opt-group').map(function (g) {
      var a = g.querySelector('.opt.is-active');
      return a ? a.getAttribute('data-value') : null;
    });
    var sel = $('#variantSelect'); if (!sel) return;
    var want = chosen.filter(Boolean).join(' / ');
    var match = $$('option', sel).filter(function (o) { return o.textContent.trim() === want; })[0];
    if (match) {
      sel.value = match.value;
      var price = match.getAttribute('data-price');
      if (price && $('#pdpPrice')) $('#pdpPrice').textContent = price;
      var add = $('#pdpAdd');
      if (add && price) add.textContent = 'Add to Bag — ' + price;
      if (match.disabled && add) { add.disabled = true; add.textContent = 'Sold Out'; }
      else if (add) { add.disabled = false; }
    }
  }

  /* ── sticky header ──────────────────────────────────────── */
  var header = $('#header'), hero = $('#hero');
  function onScroll() {
    if (!header) return;
    var threshold = hero ? Math.max(0, hero.offsetHeight - 100) : 80;
    if (window.scrollY > threshold || !hero) {
      header.classList.add('is-solid');
      header.classList.remove('is-transparent');
    } else {
      header.classList.add('is-transparent');
      header.classList.remove('is-solid');
    }

    /* sticky ATC */
    var atc = $('#stickyAtc');
    if (atc) {
      var buy = $('#pdpBuy'), show;
      if (buy) { show = buy.getBoundingClientRect().bottom < 0; }
      else { show = window.scrollY > (hero ? hero.offsetHeight + 200 : 600); }
      var nearFoot = window.scrollY + window.innerHeight > document.body.offsetHeight - 400;
      atc.classList.toggle('is-visible', show && !nearFoot);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── before/after sliders ───────────────────────────────── */
  $$('.ba').forEach(function (el) {
    var before = el.querySelector('.ba__before');
    var handle = el.querySelector('.ba__handle');
    var knob   = el.querySelector('.ba__knob');
    var drag = false;
    function set(p) {
      p = Math.max(2, Math.min(98, p));
      before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
      handle.style.left = p + '%';
      knob.style.left = p + '%';
    }
    function from(e) {
      var r = el.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      set(x / r.width * 100);
    }
    el.addEventListener('mousedown', function (e) { drag = true; from(e); });
    el.addEventListener('touchstart', function (e) { drag = true; from(e); }, { passive: true });
    window.addEventListener('mousemove', function (e) { if (drag) from(e); });
    window.addEventListener('touchmove', function (e) { if (drag) from(e); }, { passive: true });
    window.addEventListener('mouseup',   function () { drag = false; });
    window.addEventListener('touchend',  function () { drag = false; });
    set(50);
  });

  /* ── reviews carousel ───────────────────────────────────── */
  (function () {
    var track = $('#revTrack'); if (!track) return;
    var cards = $$('.rev-card', track), index = 0;
    function per() { return window.innerWidth <= 760 ? 1 : window.innerWidth <= 1100 ? 2 : 3; }
    function maxI() { return Math.max(0, cards.length - per()); }
    var dots = $('#revDots');
    function build() {
      if (!dots) return;
      dots.innerHTML = '';
      for (var i = 0; i <= maxI(); i++) {
        (function (i) {
          var d = document.createElement('button');
          d.className = 'rev-dot' + (i === index ? ' is-active' : '');
          d.setAttribute('aria-label', 'Review ' + (i + 1));
          d.addEventListener('click', function () { index = i; upd(); });
          dots.appendChild(d);
        })(i);
      }
    }
    function upd() {
      index = Math.min(index, maxI());
      var gap  = parseFloat(getComputedStyle(track).gap) || 24;
      var step = cards[0].offsetWidth + gap;
      track.style.transform = 'translateX(' + (-index * step) + 'px)';
      $$('.rev-dot', dots).forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
    }
    var prev = $('#revPrev'), next = $('#revNext');
    if (prev) prev.addEventListener('click', function () { index = index <= 0 ? maxI() : index - 1; upd(); });
    if (next) next.addEventListener('click', function () { index = index >= maxI() ? 0 : index + 1; upd(); });
    var autoplay = setInterval(function () { index = index >= maxI() ? 0 : index + 1; upd(); }, 5500);
    track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    build(); upd();
    window.addEventListener('resize', function () { build(); upd(); });
  })();

  /* ── FAQ accordion ──────────────────────────────────────── */
  $$('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var open = item.classList.contains('is-open');
      $$('.faq__item').forEach(function (i) { i.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
    });
  });

  /* ── intersection reveal ────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -48px 0px' });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ── PDP gallery image transition ──────────────────────── */
  var pdpImg = $('#pdpMainImg');
  if (pdpImg) pdpImg.style.transition = 'opacity .3s';

  /* ── EMAIL POPUP ─────────────────────────────────────────
     Shows after 10s on first visit, or on exit intent.
     Suppressed for 30 days after signup.
  ─────────────────────────────────────────────────────────── */
  var POPUP_KEY = 'auvelle_popup_shown';
  var overlay   = $('#popupOverlay');

  function cookieGet(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : '';
  }
  function cookieSet(name, val, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + val + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function openPopup() {
    if (!overlay) return;
    if (cookieGet(POPUP_KEY)) return;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (overlay) {
    /* 10-second delay trigger */
    var popupTimer = setTimeout(openPopup, 10000);

    /* exit intent (desktop) */
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 5) {
        clearTimeout(popupTimer);
        openPopup();
      }
    });

    /* form submission */
    var popupForm = $('#popupForm');
    if (popupForm) {
      popupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = $('#popupEmail').value.trim();
        if (!email) return;
        /* mark shown for 30 days */
        cookieSet(POPUP_KEY, '1', 30);
        /* Klaviyo / newsletter integration point */
        var klaviyoId = overlay.getAttribute('data-list-id');
        if (klaviyoId && window._learnq) {
          window._learnq.push(['identify', { '$email': email }]);
          window._learnq.push(['track', 'Signed Up', { source: 'popup' }]);
        }
        /* show success */
        var form    = $('#popupFormWrap');
        var success = $('#popupSuccess');
        if (form)    form.style.display    = 'none';
        if (success) success.classList.add('is-show');
        setTimeout(closePopup, 3000);
      });
    }

    /* prevent reopening if already closed deliberately */
    var popupClose = $$('[data-popup-close]');
    popupClose.forEach(function (btn) {
      btn.addEventListener('click', function () {
        cookieSet(POPUP_KEY, '1', 1); /* 1 day if manually closed */
      });
    });
    var popupSkip = $$('[data-popup-skip]');
    popupSkip.forEach(function (s) {
      s.addEventListener('click', function () {
        cookieSet(POPUP_KEY, '1', 1);
      });
    });
  }

  /* ── MEGA MENU ──────────────────────────────────────────── */
  /* Products previewed on hover over category links in mega menu */
  $$('.mega-cat').forEach(function (cat) {
    cat.addEventListener('mouseenter', function () {
      $$('.mega-cat').forEach(function (c) { c.classList.remove('is-active'); });
      cat.classList.add('is-active');
    });
  });

  /* ── ANNOUNCEMENT BAR duplicate for seamless loop ─────── */
  (function () {
    var track = $('.announce__track');
    if (!track) return;
    /* clone content for infinite scroll illusion */
    track.innerHTML = track.innerHTML + track.innerHTML;
  })();

  /* ── init ───────────────────────────────────────────────── */
  refresh();
  onScroll();

})();
