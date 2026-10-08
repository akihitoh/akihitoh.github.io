/* 研究業績ページ — publications-data.js から描画（検索・カテゴリ・年代折りたたみ）
   <html lang="en"> のページでは英語 UI で表示する */
(function () {
  var DATA = window.PUBLICATIONS;
  if (!DATA) return;
  var CATS = ["journal", "intl", "domestic"];
  var EN = document.documentElement.lang === "en";

  var T = EN ? {
    all: "All", unit: "", emptyBig: "No matching publications",
    emptySmall: "Try a different keyword."
  } : {
    all: "すべて", unit: "件", emptyBig: "該当する業績が見つかりませんでした",
    emptySmall: "別のキーワードでお試しください。"
  };

  var state = { cat: "all", query: "", open: {} };

  // 初期展開：各カテゴリの最新グループ（先頭）のみ開く
  eachGroup(function (k, g, i) { state.open[k + "|" + g.era] = (i === 0); });

  var chipsEl = document.getElementById("pubChips");
  var mainEl = document.getElementById("pubMain");
  var searchEl = document.getElementById("pubSearch");

  function eachGroup(fn) {
    CATS.forEach(function (k) {
      (DATA[k].groups || []).forEach(function (g, i) { fn(k, g, i); });
    });
  }

  // エントリは文字列、または { c: 引用文字列, doi: DOI }
  function textOf(it) { return typeof it === "string" ? it : it.c; }
  function doiOf(it) { return typeof it === "string" ? "" : (it.doi || ""); }

  function countOf(k) {
    return (DATA[k].groups || []).reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  function catLabel(k) { return EN ? DATA[k].labelEn : DATA[k].label; }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  // 題目（最初の "…"）を強調し、本人名を太字にする
  var SELF = /(廣森 聡仁|Akihito Hiromori)/g;
  function formatCitation(text) {
    var html = esc(text).replace(/&quot;(.+?)&quot;/, '&quot;<span class="ttl">$1</span>&quot;');
    return html.replace(SELF, '<strong class="me">$1</strong>');
  }

  function doiLink(doi) {
    if (!doi) return "";
    var url = "https://doi.org/" + encodeURI(doi);
    return ' <a class="doi" href="' + url + '" target="_blank" rel="noopener">DOI</a>';
  }

  function setAllOpen(val) {
    eachGroup(function (k, g) { state.open[k + "|" + g.era] = val; });
    render();
  }

  function renderChips() {
    var defs = [{ key: "all", label: T.all, n: 0 }];
    CATS.forEach(function (k) {
      var n = countOf(k);
      defs[0].n += n;
      defs.push({ key: k, label: catLabel(k), n: n });
    });
    chipsEl.innerHTML = "";
    defs.forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (state.cat === d.key ? " active" : "");
      b.setAttribute("aria-pressed", state.cat === d.key);
      b.innerHTML = esc(d.label) + ' <span class="c-count">' + d.n + "</span>";
      b.addEventListener("click", function () { state.cat = d.key; render(); });
      chipsEl.appendChild(b);
    });
  }

  function groupHtml(k, g, q) {
    var filtered = q ? g.items.filter(function (it) {
      return textOf(it).toLowerCase().indexOf(q) !== -1 || doiOf(it).toLowerCase().indexOf(q) !== -1;
    }) : g.items;
    if (q && filtered.length === 0) return "";
    var key = k + "|" + g.era;
    var open = q ? true : !!state.open[key];
    var items = filtered.map(function (it, i) {
      return '<li><span class="n">' + (i + 1) + '</span><span class="txt">' +
        formatCitation(textOf(it)) + doiLink(doiOf(it)) + "</span></li>";
    }).join("");
    return '<div class="pub-group">' +
      '<button type="button" class="pub-group-toggle" data-key="' + key + '" aria-expanded="' + open + '">' +
        '<span class="chev" aria-hidden="true">' + (open ? "▼" : "▶") + "</span>" +
        '<span class="era">' + esc(g.era) + "</span>" +
        '<span class="era-count">' + filtered.length + T.unit + "</span>" +
      "</button>" +
      '<ol class="pub-list"' + (open ? "" : " hidden") + ">" + items + "</ol>" +
    "</div>";
  }

  function sectionHead(k) {
    var sub = EN ? "" : '<span class="en">' + esc(DATA[k].labelEn) + "</span>";
    return '<div class="section-head"><h2>' + esc(catLabel(k)) + "</h2>" + sub +
      '<span class="count">' + countOf(k) + T.unit + "</span></div>";
  }

  function render() {
    renderChips();
    var q = (state.query || "").trim().toLowerCase();
    var activeCats = state.cat === "all" ? CATS : [state.cat];
    mainEl.innerHTML = "";

    activeCats.forEach(function (k) {
      var groups = (DATA[k].groups || []).map(function (g) { return groupHtml(k, g, q); }).join("");
      if (!groups) return;
      var sec = document.createElement("section");
      sec.className = "pub-section";
      sec.innerHTML = sectionHead(k) + groups;
      mainEl.appendChild(sec);
    });

    if (!mainEl.children.length) {
      mainEl.innerHTML = '<div class="pub-empty"><div class="big">' + T.emptyBig + "</div>" +
        '<div class="small">' + T.emptySmall + "</div></div>";
    }
  }

  // 折りたたみトグル（イベント委譲）
  mainEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".pub-group-toggle");
    if (!btn) return;
    var key = btn.getAttribute("data-key");
    state.open[key] = !state.open[key];
    render();
    var again = mainEl.querySelector('.pub-group-toggle[data-key="' + key + '"]');
    if (again) again.focus();
  });
  searchEl.addEventListener("input", function (e) { state.query = e.target.value; render(); });
  document.getElementById("pubExpand").addEventListener("click", function () { setAllOpen(true); });
  document.getElementById("pubCollapse").addEventListener("click", function () { setAllOpen(false); });

  render();
})();
