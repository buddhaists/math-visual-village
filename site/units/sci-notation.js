/* 單元：1-4 指數與科學記號 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "科學記號尺度比較");
    s("circle", { cx: 100, cy: 100, r: 60, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 100, 95, "地球質量", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 100, 118, "6 × 10²⁴ kg", { size: 13, color: C.orange.s, bold: true });

    s("circle", { cx: 300, cy: 100, r: 25, fill: C.mint.f, stroke: C.mint.s, "stroke-width": 2 }, svg);
    SK.label(svg, 300, 95, "病毒直徑", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 300, 118, "10⁻⁷ m", { size: 13, color: C.blue.s, bold: true });

    s("line", { x1: 170, y1: 100, x2: 260, y2: 100, stroke: C.cocoa, "stroke-width": 1.5, "stroke-dasharray": "4 4" }, svg);
    SK.label(svg, 215, 80, "尺度倍率", { size: 12, color: C.soft });
  }

  SK.mountUnit({
    slug: "sci-notation",
    en: "Index Notation and Scientific Notation",
    formula: "a\\times 10^n\\quad (1\\le \\co{a}<10,\\ \\cb{n}\\text{ 為整數})",

    hook: {
      html: "太陽到地球的距離約為 $149600000000$ 公尺，水分子直徑約為 $0.00000000028$ 公尺。如果每次都要數那麼多個 0，既容易看錯又浪費版面。<b>科學記號</b>就是科學家發明的超級放大鏡與縮小鏡！",
      ask: "$(-2)^4$ 與 $-2^4$ 算出來的答案一樣嗎？差在哪裡？",
      visual: hookVisual
    },

    guess: {
      q: "關於 $(-3)^4$ 與 $-3^4$ 的計算結果，下列敘述何者正確？",
      options: [
        { t: "$(-3)^4 = 81$，而 $-3^4 = -81$", truth: true, explain: "括號很重要！$(-3)^4 = (-3)\\times(-3)\\times(-3)\\times(-3) = 81$；而 $-3^4 = -(3\\times 3\\times 3\\times 3) = -81$，負號沒有參與 4 次方。" },
        { t: "兩者都等於 $81$", common: true, explain: "誤以為只要看到 4 次方偶數次方，負號就自動消失，忘記 $-3^4$ 的負號在次方外側！" },
        { t: "兩者都等於 $-81$", explain: "誤以為負號一定會保留。" },
        { t: "$(-3)^4 = -12$，而 $-3^4 = -12$", explain: "把次方算成乘法了，指數是連乘而不是乘係數。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整科學記號的次方 $n$，觀察小數點移動與位數變化。",
      frames: [
        { cap: "指數定義：$a^n$ 表示 $n$ 個 $a$ 連乘。規定 $a\\ne 0$ 時 $a^0=1$，負指數 $a^{-n}=\\frac{1}{a^n}$。", tex: "a^n = \\underbrace{a\\times a\\times\\cdots\\times a}_{n\\text{ 個}},\\quad 10^0 = 1,\\quad 10^{-n} = \\frac{1}{10^n}" },
        { cap: "科學記號標準式：寫成 $a\\times 10^n$，其中 $1\\le a<10$，$n$ 為整數。", tex: "a\\times 10^n\\quad (1\\le a < 10,\\ n\\text{ 為整數})" },
        { cap: "大數判別（$n>0$）：整數部分共有 $(n+1)$ 位數。例如 $3.5\\times 10^6$ 共有 $6+1=7$ 位數。", tex: "\\text{整數位數} = n + 1\\quad (n\\ge 0)" },
        { cap: "小數判別（$n<0$）：小數點後第 $|n|$ 位開始出現不為 0 的數字。例如 $4.2\\times 10^{-5}$ 在小數點後第 5 位始不為 0。", tex: "\\text{小數點後第 }|n|\\text{ 位始不為 }0\\quad (n<0)" }
      ],
      hint: "比大小時先比 10 的次方 $n$；次方相同時，再比前方係數 $a$ 的大小。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "科學記號位數演示");
        var slN = SK.slider({ label: "次方 $\\cb{n}$", min: -4, max: 6, step: 1, value: 3, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slN.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var n = slN.value;
          var val = 3.6 * Math.pow(10, n);
          var str = n >= 0 ? val.toLocaleString("en-US") : val.toFixed(Math.abs(n) + 1);
          svg.innerHTML = "";
          s("rect", { x: 50, y: 50, width: 340, height: 140, rx: 16, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 95, "3.6 × 10" + (n >= 0 ? "⁺" + n : "⁻" + Math.abs(n)), { size: 26, color: C.ink, bold: true });
          SK.label(svg, 220, 145, "= " + str, { size: 22, color: C.orange.s, bold: true });
          read.innerHTML = SK.tex("3.6\\times 10^{" + n + "} = " + (n >= 0 ? (n + 1) + "\\text{ 位數}" : "\\text{小數點後第 }" + Math.abs(n) + "\\text{ 位始不為 0}"), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "科學記號的轉換與大小比較",
        code: "N-7-8",
        demo: {
          q: "將 $0.0000458$ 表示成科學記號，並判斷與 $3.2\\times 10^{-4}$ 誰比較大？",
          steps: [
            "小數點向右移 5 位使首數介於 1 到 10 之間：$4.58\\times 10^{-5}$。",
            "比較 $4.58\\times 10^{-5}$ 與 $3.2\\times 10^{-4}$：先比較指數部分，$-4 > -5$。",
            "故 $3.2\\times 10^{-4} > 4.58\\times 10^{-5}$。"
          ]
        },
        tries: [
          {
            q: "將 $72000000$ 表示成科學記號，並寫出它是幾位數。",
            hint: "寫成 $a\\times 10^n$，位數為 $n+1$。",
            ans: "$7.2\\times 10^7$，它是 $7+1=8$ 位數。"
          },
          {
            q: "將 $5.08\\times 10^{-6}$ 展開成小數，小數點後第幾位開始出現不為 0 的數字？",
            hint: "負指數是幾，小數點後第幾位就開始不是 0。",
            ans: "$0.00000508$，小數點後第 6 位開始不為 0。"
          }
        ],
        edge: "科學記號首數 $a$ 的範圍必須是 $1\\le a < 10$，例如 $24\\times 10^5$ 或 $0.35\\times 10^4$ 都不是合格的科學記號標準式。"
      }
    ],

    angles: [
      {
        title: "位數與對數概念的萌芽",
        icon: "sparkle",
        html: "十進位系統每逢 10 就進一位，科學記號中的指數 $n$ 其實直接宣告了數量級：$10^3$ 是千、$10^6$ 是百萬、$10^9$ 是十億。只要看次方，就能一秒知道宇宙天體或微觀粒子的數量層級。"
      },
      {
        title: "零次方的邏輯一致性",
        icon: "leaf",
        html: "為什麼任何非零數的 0 次方都是 1？依除法規律：$10^3\\div 10 = 10^2$，$10^2\\div 10 = 10^1$，$10^1\\div 10 = 10^0$。既然 $10\\div 10=1$，那麼為了維持數學規則不破壞，$10^0$ 必須規定為 1。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "計算 $(-1)^{2026} + (-1)^{2027}$ 的值。",
        hint: "偶數次方為 1，奇數次方為 -1。",
        idea: "$(-1)^{2026} = 1$（偶數次方），$(-1)^{2027} = -1$（奇數次方），故 $1 + (-1) = 0$。"
      },
      {
        lv: "Explore",
        q: "若 $A = 4\\times 10^6$，$B = 8\\times 10^5$，求 $A + B$ 以科學記號表示之值。",
        hint: "將兩數的次方化成相同後再合併係數。",
        idea: "$B = 0.8\\times 10^6$，故 $A+B = (4 + 0.8)\\times 10^6 = 4.8\\times 10^6$。"
      },
      {
        lv: "Wonder",
        q: "已知某種細菌每過 30 分鐘數量就會分裂成原本的 2 倍。若最初有 1 隻細菌，經過 5 小時後共有幾隻細菌？",
        hint: "5 小時包含幾個 30 分鐘？是連乘幾次 2？",
        idea: "5 小時 $= 300$ 分鐘，共分裂了 $300\\div 30 = 10$ 次。細菌數量為 $2^{10} = 1024$ 隻。"
      }
    ],

    where: {
      codes: [["N-7-6", "指數的意義：指數為非負整數、同底數運算"], ["N-7-8", "科學記號：以科學記號表達大數與小數"]],
      exam: "會考常結合自然科題材（奈米尺寸、天文光年、細胞數量）考科學記號的運算與大小比較。",
      stop: "科學記號只處理正數；負數的科學記號（如 $-3.2\\times 10^5$）課綱僅作符號附加，運算以正數為主。"
    }
  });
})();
