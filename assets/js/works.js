/* 研究業績ページ — publications-data.js から描画（検索・カテゴリ・年代折りたたみ） */
(function () {
  var DATA = window.PUBLICATIONS;
  if (!DATA) return;
  var CATS = ["journal", "intl", "domestic"];

  var state = { cat: "all", query: "", open: {} };

  // 初期展開：各カテゴリの最新グループ（先頭）のみ開く
  CATS.forEach(function (k) {
    (DATA[k].groups || []).forEach(function (g, i) {
      state.open[k + "|" + g.era] = (i === 0);
    });
  });

  var chipsEl = document.getElementById("pubChips");
  var mainEl = document.getElementById("pubMain");
  var searchEl = document.getElementById("pubSearch");

  function counts() {
    var c = {}, total = 0;
    CATS.forEach(function (k) {
      var n = 0;
      (DATA[k].groups || []).forEach(function (g) { n += g.items.length; });
      c[k] = n; total += n;
    });
    c.all = total;
    return c;
  }

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (ch) {
      return ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : "&gt;";
    });
  }

  function setAllOpen(val) {
    CATS.forEach(function (k) {
      (DATA[k].groups || []).forEach(function (g) { state.open[k + "|" + g.era] = val; });
    });
    render();
  }

  function renderChips() {
    var c = counts();
    var defs = [
      { key: "all", label: "すべて", n: c.all },
      { key: "journal", label: DATA.journal.label, n: c.journal },
      { key: "intl", label: DATA.intl.label, n: c.intl },
      { key: "domestic", label: DATA.domestic.label, n: c.domestic }
    ];
    chipsEl.innerHTML = "";
    defs.forEach(function (d) {
      var b = document.createElement("button");
      b.className = "chip" + (state.cat === d.key ? " active" : "");
      b.innerHTML = esc(d.label) + ' <span class="c-count">' + d.n + "</span>";
      b.addEventListener("click", function () { state.cat = d.key; render(); });
      chipsEl.appendChild(b);
    });
  }

  function render() {
    renderChips();
    var q = (state.query || "").trim().toLowerCase();
    var activeCats = state.cat === "all" ? CATS : [state.cat];
    mainEl.innerHTML = "";

    var any = false;
    activeCats.forEach(function (k) {
      var src = DATA[k];
      var groupsHtml = [];
      (src.groups || []).forEach(function (g) {
        var filtered = q ? g.items.filter(function (it) { return it.toLowerCase().indexOf(q) !== -1; }) : g.items;
        if (q && filtered.length === 0) return;
        var key = k + "|" + g.era;
        var open = q ? true : !!state.open[key];
        var items = filtered.map(function (t, i) {
          return '<li><span class="n">' + (i + 1) + '</span><span class="txt">' + esc(t) + "</span></li>";
        }).join("");
        groupsHtml.push(
          '<div class="pub-group">' +
            '<button class="pub-group-toggle" data-key="' + key + '">' +
              '<span class="chev">' + (open ? "▼" : "▶") + "</span>" +
              '<span class="era">' + esc(g.era) + "</span>" +
            "</button>" +
            '<ol class="pub-list"' + (open ? "" : " hidden") + ">" + items + "</ol>" +
          "</div>"
        );
      });
      if (groupsHtml.length === 0) return;
      any = true;
      var sec = document.createElement("section");
      sec.className = "pub-section";
      sec.innerHTML =
        '<div class="section-head"><h2>' + esc(src.label) + '</h2>' +
        '<span class="en">' + esc(src.labelEn) + "</span></div>" +
        groupsHtml.join("");
      mainEl.appendChild(sec);
    });

    if (!any) {
      mainEl.innerHTML =
        '<div class="pub-empty"><div class="big">該当する業績が見つかりませんでした</div>' +
        '<div class="small">別のキーワードでお試しください。</div></div>';
      return;
    }

    // 折りたたみトグル
    mainEl.querySelectorAll(".pub-group-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-key");
        state.open[key] = !state.open[key];
        render();
      });
    });
  }

  searchEl.addEventListener("input", function (e) { state.query = e.target.value; render(); });
  document.getElementById("pubExpand").addEventListener("click", function () { setAllOpen(true); });
  document.getElementById("pubCollapse").addEventListener("click", function () { setAllOpen(false); });

  render();
})();
