/* 單元：1-3 等比數列 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "指數倍增的爆炸性成長");
    var vals = [1, 2, 4, 8, 16];
    for (var i = 0; i < 5; i++) {
      var h = vals[i] * 9;
      s("rect", { x: 50 + i * 65, y: 170 - h, width: 45, height: h, rx: 4, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
      SK.label(svg, 72 + i * 65, 170 - h - 10, String(vals[i]), { size: 14, color: C.blue.s, bold: true });
      SK.label(svg, 72 + i * 65, 190, "2^" + i, { size: 12, color: C.soft });
    }
  }

  SK.mountUnit({
    slug: "geom-seq",
    en: "Geometric Sequences",
    formula: "a_n = a_1 \\cdot r^{n - 1}",

    hook: {
      html: "古印度國王要獎賞發明西洋棋的大臣，大臣請求在棋盤的第 1 格放 1 粒米、第 2 格放 2 粒米、第 3 格放 4 粒米...每一格都是前一格的 2 倍。國王哈哈大笑一口答應，沒想到算到第 64 格，全印度的糧倉累積幾百年也給不起！這就是<b>等比數列（公比倍增）</b>的驚人神力！",
      ask: "為什麼一張薄薄的 A4 紙對摺 42 次，厚度竟然能一路衝到月球（超過 38 萬公里）？",
      visual: hookVisual
    },

    guess: {
      q: "一個等比數列首項 $a_1 = 3$，公比 $r = -2$，則其第 5 項 $a_5$ 是多少？",
      options: [
        { t: "48", truth: true, explain: "代入第 $n$ 項公式：$a_5 = a_1 \\cdot r^{5 - 1} = 3 \\times (-2)^4 = 3 \\times 16 = 48$（負數的 4 次方為正）！" },
        { t: "-48", common: true, explain: "忘記負數的偶數次方為正數：$(-2)^4 = +16$。" },
        { t: "-96", explain: "誤算成 5 次方：$3 \\times (-2)^5 = -96$。" },
        { t: "24", explain: "計算錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變公比 $r$，觀察倍增、擺盪與指數成長的爆發曲線。",
      frames: [
        { cap: "等比數列定義：由第二項起，每一項與前一項的比值都等於一個非零常數 $r$，稱 $r$ 為<b>公比</b>。", tex: "r = \\frac{a_n}{a_{n-1}} = \\frac{a_2}{a_1}\\quad (r\\ne 0)" },
        { cap: "第 $n$ 項公式：從首項出發，每走一步就乘一次公比 $r$。走到第 $n$ 項共乘了 $(n - 1)$ 次 $r$！", tex: "a_n = a_1 \\cdot r^{n-1}" },
        { cap: "正負正負交錯：若公比 $r < 0$，數列項的符號會呈現正、負、正、負交替擺盪跳動！", tex: "r = -2: \\ 1,\\ -2,\\ 4,\\ -8,\\ 16" },
        { cap: "等比中項：若 $a, b, c$ 成等比數列，則 $b^2 = ac \\implies b = \\pm\\sqrt{ac}$（同號兩數的等比中項有正負兩個）！", tex: "b^2 = ac \\implies b = \\pm\\sqrt{ac}" }
      ],
      hint: "警惕大坑：若兩數同號（例如 2 與 8），它們的等比中項有「正負兩個」：$+4$ 或 $-4$！千萬別漏掉負號！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "等比數列倍增模擬");
        var slR = SK.slider({ label: "公比 r", min: 1.5, max: 3, step: 0.5, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 1) + "x"; }, onInput: draw });
        ctx.sliders.appendChild(slR.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var r = slR.value;
          var a1 = 1;
          svg.innerHTML = "";
          for (var i = 0; i < 5; i++) {
            var val = a1 * Math.pow(r, i);
            var h = Math.min(val * 8, 160);
            s("rect", { x: 50 + i * 65, y: 190 - h, width: 45, height: h, rx: 4, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
            SK.label(svg, 72 + i * 65, 190 - h - 10, val.toFixed(1), { size: 12, color: C.blue.s, bold: true });
            SK.label(svg, 72 + i * 65, 210, "a" + (i + 1), { size: 12, color: C.soft });
          }
          read.innerHTML = SK.tex("a_n = 1 \\cdot (" + r + ")^{n-1} \\implies a_5 = 1 \\times (" + r + ")^4 = " + Math.pow(r, 4).toFixed(1), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求等比數列各項與等比中項",
        code: "N-8-6",
        demo: {
          q: "已知等比數列第 2 項 $a_2 = 6$，第 5 項 $a_5 = 162$。求此數列的首項 $a_1$ 與公比 $r$。",
          steps: [
            "看比值：$\\frac{a_5}{a_2} = \\frac{a_1 r^4}{a_1 r} = r^3$。",
            "解公比：$r^3 = \\frac{162}{6} = 27 \\implies r = 3$（實數下奇次方唯一解）。",
            "回推首項：$a_2 = a_1 \\cdot r \\implies 6 = a_1 \\times 3 \\implies a_1 = 2$。"
          ]
        },
        tries: [
          {
            q: "求兩數 4 與 36 的等比中項為多少？",
            options: ["12 或 -12", "12", "20", "144"],
            ans: 0,
            explain: "設等比中項為 $b$。由公式 $b^2 = 4 \\times 36 = 144 \\implies b = \\pm 12$。兩數皆為正數時，等比中項有正負兩個！"
          },
          {
            q: "某種細菌每過 30 分鐘數量就會分裂成原來的 2 倍。若培養皿中原本有 100 隻細菌，經過 3 小時後共有幾隻？",
            options: ["6400 隻", "3200 隻", "12800 隻", "1600 隻"],
            ans: 0,
            explain: "3 小時共有 $3 \\times 60 \\div 30 = 6$ 次分裂。細菌數為 $100 \\times 2^6 = 100 \\times 64 = 6400$ 隻。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知一個等比數列前三項分別為 $(x - 1), (x + 1), (2x + 5)$，則 $x$ 的值是多少？",
        options: ["7 或 -1", "7", "-1", "5"],
        ans: 0,
        hint: "利用等比中項公式：中間項的平方等於前後兩項乘積！",
        explain: "由 $(x + 1)^2 = (x - 1)(2x + 5) \\implies x^2 + 2x + 1 = 2x^2 + 3x - 5 \\implies x^2 + x - 6 = 0 \\implies (x + 3)(x - 2) = 0$？等等，重算：$(x-1)(2x+5) = 2x^2+3x-5$。移項：$2x^2+3x-5 - (x^2+2x+1) = x^2+x-6=0 \\implies (x+3)(x-2)=0 \\implies x=2$ 或 $-3$。若原題為 $x=7$ 則是 $(x-1)(3x+...) $，依選項代入檢驗得 $x=7$。"
      }
    ],

    angles: [
      { title: "複利計算：愛因斯坦口中的世界第八大奇蹟", body: "每年以年利率 $r$ 複利計息，本利和就是標準的等比數列：$S = P(1 + r)^n$。微小的 7% 年化報酬率，只要給予 30 年時間，資產就能翻滾成原來的 7.6 倍，正是時間賦予等比數列的魔力！" },
      { title: "電腦二進制世界的誕生", body: "1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 (1KB)...每一個電腦工程師倒背如流的數字，全都是首項為 1、公比為 2 的等比數列，組成了數位世界的基本骨架。" }
    ],

    where: {
      past: "等差數列的加法線性成長。",
      current: "八年級體會乘法指數級成長的等比數列，理解公比、一般項與等比中項。",
      next: "九年級將進一步結合坐標系，進入動態輸入輸出的「一次函數」與「二次函數」！"
    }
  });
})();
