(function () {
  'use strict';
  var S = window.SEED;
  var FR = {};
  S.friends.forEach(function (f) { FR[f.id] = f; });
  var STORE_KEY = 'reli:v1';

  // ---------- estado ----------
  var saved = load();
  var state = {
    tab: 'lib', q: '', type: 'todo', genre: 'Todos', plat: 'Todas',
    showF: false, showProfile: false, open: null, friend: null, recOpen: false,
    me: Object.assign({}, S.me, saved.me || {}),
    mine: saved.mine || {},   // id -> cambios del usuario sobre lo que trae SEED
    sent: saved.sent || {}    // id -> [friendIds]
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ me: state.me, mine: state.mine, sent: state.sent })); } catch (e) { /* sin storage: sigue andando en memoria */ }
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function rep(g, n) { var o = ''; for (var i = 0; i < n; i++) o += g; return o; }
  function score(glyph, n) { return '<span class="score">' + rep(glyph, n) + '<span class="off">' + rep(glyph, 5 - n) + '</span></span>'; }

  function item(x) {
    var m = Object.assign({ status: null, rating: 0, season: 1, ep: 1, platform: '', country: '' }, x.mine, state.mine[x.id] || {});
    if (!m.country && (m.status === 'vista' || m.status === 'viendo')) m.country = state.me.country;
    return Object.assign({}, x, m, {
      eps: x.eps || 8,
      kindLabel: x.kind === 'serie' ? 'Serie' : 'Película',
      genreText: x.genres.join(' · ')
    });
  }
  function all() { return S.catalog.map(item); }
  function byId(id) { return item(S.catalog.filter(function (x) { return x.id === id; })[0]); }
  function update(id, patch) {
    state.mine[id] = Object.assign({}, state.mine[id] || {}, patch);
    persist();
  }
  function passes(x) {
    if (state.type !== 'todo' && x.kind !== state.type) return false;
    if (state.genre !== 'Todos' && x.genres.indexOf(state.genre) < 0) return false;
    if (state.plat !== 'Todas' && x.platform !== state.plat && x.ar.indexOf(state.plat) < 0) return false;
    return true;
  }
  function whereText(x) {
    if (!x.platform) return '';
    return x.platform + (x.country && x.country !== state.me.country ? ' · ' + x.country : '');
  }
  function poster(x, cls, inner) {
    return '<div class="poster ' + (cls || '') + '" style="background:' + esc(x.color) + '">' + (inner != null ? inner : esc(x.title)) + '</div>';
  }

  var ICON = {
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8A3B0" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    filter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    lib: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="16" rx="1"/><path d="M17.5 5.5l3 14"/></svg>',
    rec: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/></svg>',
    fr: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.4.2 4 1.8 4.5 4.5"/></svg>',
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };

  // ---------- vistas ----------
  function header() {
    var nF = (state.genre !== 'Todos' ? 1 : 0) + (state.plat !== 'Todas' ? 1 : 0);
    var h = '<header class="header">' +
      '<div class="brand-row"><div class="brand">reli<span>.</span></div>' +
      '<button class="avatar-btn" data-a="profile" aria-label="Mi perfil" aria-expanded="' + state.showProfile + '">' + esc(state.me.emoji) + '</button></div>';
    if (state.showProfile) {
      h += '<div class="panel">' +
        '<div class="label">Mi perfil</div>' +
        '<div class="two">' +
        '<label class="field"><span class="small">Mi emoji para valorar</span><input class="text-input" data-a="emoji" maxlength="4" value="' + esc(state.me.emoji) + '"></label>' +
        '<label class="field"><span class="small">Mi país</span><select data-a="mycountry">' + S.countries.map(function (c) { return '<option' + (c === state.me.country ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></label>' +
        '</div><div class="small">Tu país es el que se usa por defecto en "La vi en".</div>' +
        '<button class="ghost-btn" data-a="reset">Borrar mis cambios de prueba</button></div>';
    }
    h += '<label class="search">' + ICON.search + '<span class="sr-only">Buscar</span>' +
      '<input id="q" type="search" autocomplete="off" placeholder="¿Ya la vi? Buscá una serie o peli" value="' + esc(state.q) + '">' +
      (state.q ? '<button class="icon-btn" data-a="clearq" aria-label="Borrar búsqueda">×</button>' : '') + '</label>';
    h += '<div class="toolbar"><div class="segmented">' +
      [['todo', 'Todo'], ['serie', 'Series'], ['pelicula', 'Películas']].map(function (t) {
        return '<button data-a="type" data-v="' + t[0] + '" aria-pressed="' + (state.type === t[0]) + '">' + t[1] + '</button>';
      }).join('') + '</div>' +
      '<button class="filters-btn' + (nF ? ' on' : '') + '" data-a="filters" aria-expanded="' + state.showF + '">' + ICON.filter + (nF ? 'Filtros · ' + nF : 'Filtros') + '</button></div>';
    if (state.showF) {
      h += '<div class="panel"><div class="label">Género</div><div class="chips">' +
        ['Todos'].concat(S.genres).map(function (g) { return '<button class="chip" data-a="genre" data-v="' + esc(g) + '" aria-pressed="' + (state.genre === g) + '">' + esc(g) + '</button>'; }).join('') +
        '</div><div class="label">Plataforma</div><div class="chips">' +
        ['Todas'].concat(S.platforms.slice(0, 8)).map(function (p) { return '<button class="chip" data-a="plat" data-v="' + esc(p) + '" aria-pressed="' + (state.plat === p) + '">' + esc(p) + '</button>'; }).join('') +
        '</div></div>';
    }
    return h + '</header>';
  }

  function searchView() {
    var q = norm(state.q.trim());
    var res = all().filter(function (x) { return norm(x.title).indexOf(q) >= 0; });
    if (!res.length) return '<div class="empty">No la tenés registrada. Cuando conectemos TMDB, acá van a aparecer los resultados de todo el catálogo para agregarla.</div>';
    return '<div class="section"><div class="small">En tu videoteca y la de tus amigos</div>' + res.map(function (x) {
      var badge, on = false;
      if (x.status === 'vista') { badge = 'Ya la viste · ' + rep(state.me.emoji, x.rating); on = true; }
      else if (x.status === 'viendo') { badge = 'La estás viendo · T' + x.season + '·E' + x.ep; on = true; }
      else if (x.status === 'quiero') badge = 'Está en tu lista';
      else badge = 'No la viste todavía';
      return '<button class="row-card" data-a="open" data-id="' + x.id + '">' + poster(x, 'poster-sm') +
        '<div class="body"><div class="row-title">' + esc(x.title) + '</div>' +
        '<div class="small">' + x.kindLabel + ' · ' + x.year + ' · IMDb ' + x.imdb + ' · RT ' + x.rt + '</div>' +
        '<div class="badge' + (on ? ' on' : '') + '">' + esc(badge) + '</div></div></button>';
    }).join('') + '</div>';
  }

  function libView() {
    var items = all();
    var f = items.filter(passes);
    var watching = f.filter(function (x) { return x.status === 'viendo'; });
    var seen = f.filter(function (x) { return x.status === 'vista'; });
    var want = f.filter(function (x) { return x.status === 'quiero'; });
    var nSeen = items.filter(function (x) { return x.status === 'vista'; }).length;
    var nW = items.filter(function (x) { return x.status === 'viendo'; }).length;
    var h = '<div class="title-row"><h1>Mi videoteca</h1><div class="small">' + nSeen + ' vistas · ' + nW + ' en curso</div></div>';
    if (watching.length) {
      h += '<div class="section"><div class="label">Viendo ahora</div>' + watching.map(function (x) {
        var pct = Math.round(x.ep / x.eps * 100);
        return '<div class="watch-card"><button data-a="open" data-id="' + x.id + '" aria-label="Abrir ' + esc(x.title) + '" style="border:none;padding:0;background:none">' + poster(x, 'poster-sm') + '</button>' +
          '<div class="body"><div class="row-title">' + esc(x.title) + '</div>' +
          '<div class="small">T' + x.season + ' · E' + x.ep + ' de ' + x.eps + (whereText(x) ? ' · en ' + esc(whereText(x)) : '') + '</div>' +
          '<div class="bar"><div style="width:' + pct + '%"></div></div></div>' +
          '<button class="ghost-btn" data-a="ep" data-id="' + x.id + '" data-v="1">+1 ep</button></div>';
      }).join('') + '</div>';
    }
    h += '<div class="section"><div class="label">Ya las vi</div>';
    h += seen.length ? '<div class="grid">' + seen.map(function (x) {
      return '<button class="grid-item" data-a="open" data-id="' + x.id + '">' +
        poster(x, '', '<span class="tag">' + x.kindLabel + '</span><span>' + esc(x.title) + '</span>') +
        score(state.me.emoji, x.rating) + '</button>';
    }).join('') + '</div>' : '<div class="empty">Nada con esos filtros.</div>';
    h += '</div>';
    if (want.length) {
      h += '<div class="section"><div class="label">Quiero ver</div>' + want.map(function (x) {
        return '<button class="dashed" data-a="open" data-id="' + x.id + '"><span style="font-weight:600">' + esc(x.title) + '</span><span class="small">IMDb ' + x.imdb + ' · RT ' + x.rt + '</span></button>';
      }).join('') + '</div>';
    }
    return h;
  }

  function recView() {
    var recs = all().filter(passes).filter(function (x) {
      return x.status !== 'vista' && x.status !== 'viendo' && (x.recBy || x.why);
    }).sort(function (a, b) { return (b.recBy ? 1 : 0) - (a.recBy ? 1 : 0); });
    var h = '<div class="section" style="gap:4px"><h1>Para vos</h1><div class="sub">Mezcla lo que te gustó con lo que vieron tus amigos.</div></div>';
    if (!recs.length) return h + '<div class="empty">Nada con esos filtros.</div>';
    return h + recs.map(function (x) {
      var why = x.recBy ? FR[x.recBy].name + ' te la recomendó' : x.why;
      var fl = x.friends.map(function (f) { return esc(FR[f.f].name) + ' ' + rep(FR[f.f].emoji, f.r); }).join('&nbsp;&nbsp; ');
      return '<button class="rec-card" data-a="open" data-id="' + x.id + '">' + poster(x) +
        '<div class="body"><div class="why">' + esc(why) + '</div><div class="row-title" style="font-size:16px">' + esc(x.title) + '</div>' +
        '<div class="small">' + x.kindLabel + ' · ' + x.year + ' · ' + esc(x.genreText) + '</div>' +
        '<div class="pills"><span class="pill">IMDb ' + x.imdb + '</span><span class="pill">RT ' + x.rt + '</span></div>' +
        '<div class="small">' + fl + '</div></div></button>';
    }).join('');
  }

  function friendsView() {
    var h = '<h1>Amigos</h1><div class="friends-row noscroll">' +
      [{ id: '', name: 'Todos', emoji: '✦' }].concat(S.friends).map(function (f) {
        var on = (state.friend || '') === f.id;
        return '<button class="friend" data-a="friend" data-v="' + f.id + '" aria-pressed="' + on + '"><span class="face">' + f.emoji + '</span>' + esc(f.name) + '</button>';
      }).join('') +
      '<button class="friend" data-a="invite"><span class="face add">' + ICON.plus + '</span>Invitar</button></div>';
    var feed = S.feed.filter(function (e) { return (!state.friend || e.f === state.friend) && passes(byId(e.id)); });
    if (!feed.length) return h + '<div class="empty">Nada con esos filtros.</div>';
    return h + feed.map(function (e) {
      var x = byId(e.id), fr = FR[e.f];
      var r = x.friends.filter(function (z) { return z.f === e.f; })[0] || { r: 0, c: '' };
      var mine = x.status === 'vista' ? 'Vos: ' + rep(state.me.emoji, x.rating) : x.status === 'viendo' ? 'Vos la estás viendo' : x.status === 'quiero' ? 'Está en tu lista' : 'Vos no la viste';
      return '<div class="feed-card"><div class="feed-head"><span class="face-sm">' + fr.emoji + '</span>' +
        '<div class="feed-text"><b>' + esc(fr.name) + '</b> ' + e.verb + ' <b>' + esc(x.title) + '</b></div><div class="small">' + esc(e.when) + '</div></div>' +
        '<button class="feed-item" data-a="open" data-id="' + x.id + '"><span class="swatch" style="background:' + x.color + '"></span>' +
        '<span class="body" style="display:flex;flex-direction:column;gap:4px">' + score(fr.emoji, r.r) +
        (r.c ? '<span class="quote">“' + esc(r.c) + '”</span>' : '') +
        '<span class="small">' + esc(mine) + '</span></span></button></div>';
    }).join('');
  }

  function detailView() {
    var x = byId(state.open);
    var sent = state.sent[x.id] || [];
    var h = '<div class="detail" role="dialog" aria-modal="true" aria-label="' + esc(x.title) + '"><div class="detail-inner">' +
      '<div class="hero" style="background:' + x.color + '"><button class="back" data-a="close" aria-label="Volver">' + ICON.back + '</button></div>' +
      '<div class="detail-body"><div class="detail-top">' + poster(x) +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;padding-bottom:4px"><h2>' + esc(x.title) + '</h2>' +
      '<div class="small">' + x.kindLabel + ' · ' + x.year + ' · ' + esc(x.genreText) + '</div>' +
      '<div class="pills" style="margin-top:4px"><div class="rating-box"><span>IMDb</span><span>' + x.imdb + '</span></div>' +
      '<div class="rating-box"><span>Rotten T.</span><span>' + x.rt + '</span></div></div></div></div>';

    h += '<div class="field"><div class="label">Mi estado</div><div class="status-row">' +
      [['quiero', 'Quiero verla'], ['viendo', 'Viendo'], ['vista', 'Vista']].map(function (p) {
        return '<button data-a="status" data-v="' + p[0] + '" aria-pressed="' + (x.status === p[0]) + '">' + p[1] + '</button>';
      }).join('') + '</div></div>';

    if (x.status === 'viendo' && x.kind === 'serie') {
      h += '<div class="prog"><div><div class="small">Voy por</div><div style="font-size:18px;font-weight:700">T' + x.season + ' · E' + x.ep + ' de ' + x.eps + '</div></div>' +
        '<div style="display:flex;gap:8px"><button class="step" data-a="season" aria-label="Temporada siguiente" title="Temporada siguiente">T+</button>' +
        '<button class="step" data-a="ep" data-v="-1" aria-label="Episodio anterior">−</button>' +
        '<button class="step primary" data-a="ep" data-v="1" aria-label="Episodio siguiente">+</button></div></div>';
    }

    if (x.status === 'vista' || x.status === 'viendo') {
      h += '<div class="field"><div class="label">Mi valoración</div><div class="rate">' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<button class="' + (n <= x.rating ? 'on' : '') + '" data-a="rate" data-v="' + n + '" aria-label="Valorar ' + n + ' de 5">' + esc(state.me.emoji) + '</button>';
        }).join('') + '</div></div>';
      h += '<div class="field"><div class="label">La vi en</div><div class="two">' +
        '<label><span class="sr-only">Plataforma</span><select data-a="platform"><option value="">Plataforma</option>' +
        S.platforms.map(function (p) { return '<option' + (p === x.platform ? ' selected' : '') + '>' + esc(p) + '</option>'; }).join('') + '</select></label>' +
        '<label><span class="sr-only">País</span><select data-a="country">' +
        S.countries.map(function (c) { return '<option' + (c === x.country ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></label>' +
        '</div><div class="small">El país arranca en el tuyo (' + esc(state.me.country) + '). Cambialo si la viste en otro lado.</div></div>';
      h += '<label class="field"><span class="label">Qué me pareció</span><textarea data-a="comment" rows="3" placeholder="Escribí algo para vos (o tus amigos)">' + esc(x.comment || '') + '</textarea></label>';
    }

    if (x.friends.length) {
      h += '<div class="field"><div class="label">Tus amigos</div>' + x.friends.map(function (f) {
        var fr = FR[f.f];
        return '<div class="friend-rate"><span class="face-sm">' + fr.emoji + '</span><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">' +
          '<div style="display:flex;justify-content:space-between;align-items:center"><b>' + esc(fr.name) + '</b>' + score(fr.emoji, f.r) + '</div>' +
          (f.c ? '<div class="quote" style="font-style:normal">“' + esc(f.c) + '”</div>' : '') + '</div></div>';
      }).join('') + '</div>';
    }

    h += '<div class="field"><div class="label">Dónde verla en Argentina</div><div class="chips">' +
      (x.ar.length ? x.ar.map(function (p) { return '<span class="pill" style="padding:6px 12px;font-size:13px">' + esc(p) + '</span>'; }).join('') :
        '<span class="small">Sin datos para AR. Cada uno anota dónde la vio.</span>') + '</div></div>';

    h += '<div class="field"><button class="primary-btn" data-a="rec" aria-expanded="' + state.recOpen + '">Recomendar a un amigo</button>';
    if (state.recOpen) {
      h += '<div class="chips">' + S.friends.map(function (f) {
        var done = sent.indexOf(f.id) >= 0;
        return '<button class="send-chip' + (done ? ' done' : '') + '" data-a="send" data-v="' + f.id + '"' + (done ? ' disabled' : '') + '>' + f.emoji + ' ' + esc(f.name) + (done ? ' ✓' : '') + '</button>';
      }).join('') + '</div>';
    }
    if (sent.length) h += '<div class="note">Le mandaste ' + esc(x.title) + ' a ' + sent.map(function (id) { return esc(FR[id].name); }).join(', ') + '.</div>';
    h += '</div><div class="footer-note">Versión de prueba · datos de ejemplo · se guarda solo en este navegador</div></div></div></div>';
    return h;
  }

  function nav() {
    return '<nav class="nav" aria-label="Secciones">' +
      [['lib', 'Mi videoteca'], ['rec', 'Para vos'], ['fr', 'Amigos']].map(function (t) {
        return '<button data-a="tab" data-v="' + t[0] + '"' + (state.tab === t[0] ? ' aria-current="page"' : '') + '>' + ICON[t[0]] + t[1] + '</button>';
      }).join('') + '</nav>';
  }

  // ---------- render ----------
  var root = document.getElementById('app');
  function render() {
    var active = document.activeElement;
    var refocus = active && active.id === 'q' ? { start: active.selectionStart, end: active.selectionEnd } : null;
    var body = state.q.trim() ? searchView() : state.tab === 'lib' ? libView() : state.tab === 'rec' ? recView() : friendsView();
    root.innerHTML = '<div class="shell">' + header() + '<main class="content">' + body + '</main>' + nav() + '</div>' + (state.open ? detailView() : '');
    document.body.style.overflow = state.open ? 'hidden' : '';
    if (refocus) {
      var q = document.getElementById('q');
      q.focus();
      try { q.setSelectionRange(refocus.start, refocus.end); } catch (e) { /* noop */ }
    }
  }

  // ---------- eventos ----------
  root.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-a]');
    if (!el || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') return;
    var a = el.dataset.a, v = el.dataset.v, id = el.dataset.id || state.open;
    var x;
    switch (a) {
      case 'tab': state.tab = v; window.scrollTo(0, 0); break;
      case 'type': state.type = v; break;
      case 'filters': state.showF = !state.showF; break;
      case 'genre': state.genre = v; break;
      case 'plat': state.plat = v; break;
      case 'profile': state.showProfile = !state.showProfile; break;
      case 'reset':
        if (!confirm('¿Borrar todo lo que cambiaste en esta prueba?')) return;
        state.mine = {}; state.sent = {}; state.me = Object.assign({}, S.me); persist(); break;
      case 'clearq': state.q = ''; break;
      case 'open': state.open = id; state.recOpen = false; break;
      case 'close': state.open = null; break;
      case 'friend': state.friend = v || null; break;
      case 'invite': alert('Invitar amigos llega cuando sumemos el login.'); return;
      case 'status':
        x = byId(id);
        var next = x.status === v ? null : v;
        var patch = { status: next };
        if ((next === 'vista' || next === 'viendo') && !x.country) patch.country = state.me.country;
        update(id, patch); break;
      case 'rate': update(id, { rating: +v }); break;
      case 'ep':
        x = byId(id);
        update(id, { ep: Math.max(1, Math.min(x.eps, x.ep + (+v))) }); break;
      case 'season':
        x = byId(id);
        update(id, { season: x.season + 1, ep: 1 }); break;
      case 'rec': state.recOpen = !state.recOpen; break;
      case 'send':
        var s = (state.sent[id] || []).slice();
        if (s.indexOf(v) < 0) s.push(v);
        state.sent[id] = s; persist(); break;
      default: return;
    }
    render();
  });

  root.addEventListener('input', function (ev) {
    var t = ev.target;
    if (t.id === 'q') { state.q = t.value; render(); return; }
    if (t.dataset.a === 'comment') { update(state.open, { comment: t.value }); return; }
    if (t.dataset.a === 'emoji' && t.value.trim()) { state.me.emoji = t.value.trim(); persist(); }
  });

  root.addEventListener('change', function (ev) {
    var t = ev.target, a = t.dataset.a;
    if (a === 'platform') update(state.open, { platform: t.value });
    else if (a === 'country') update(state.open, { country: t.value });
    else if (a === 'mycountry') { state.me.country = t.value; persist(); }
    else if (a === 'emoji') { /* ya guardado en input */ }
    else return;
    render();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && state.open) { state.open = null; render(); }
  });

  render();
})();
