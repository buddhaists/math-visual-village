/* 單元：1-1 二元一次方程式 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "兩種硬幣湊金額");
    s("rect", { x: 50, y: 40, width: 300, height: 120, rx: 12, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 200, 70, "10 元硬幣 x 個 + 5 元硬幣 y 個 = 50 元", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 200, 100, "10x + 5y = 50", { size: 18, color: C.orange.s, bold: true });
    SK.label(svg, 200, 135, "(x, y) 可以是 (5, 0)、(4, 2)、(3, 4)、(2, 6)...", { size: 13, color: C.blue.s });
  }

  SK.mountUnit({
    slug: "linear-eq-2",
    en: "Linear Equations in Two Variables",
    formula: "ax + by = c\\quad (a\\ne 0\\ \\text{或}\\ b\\ne 0)",

    hook: {
      html: "當情境中同時有兩種未知數量（例如 10 元與 5 元硬幣個數、大瓶與小瓶容量、鉛筆與筆記本單價）時，單一未知數 $x$ 就不夠用了。我們需要兩個未知數 $x$ 與 $y$ 一起合作，寫成<b>二元一次方程式</b>！",
      ask: "一個二元一次方程式（如 $x+y=10$）會有幾組解？加上「正整數」限制後呢？",
      visual: hookVisual
    },

    guess: {
      q: "二元一次方程式 $2x + y = 10$ 在「正整數（$x, y$ 都是大於 0 的整數）」範圍內，共有幾組解？",
      options: [
        { t: "4 組解：(1, 8)、(2, 6)、(3, 4)、(4, 2)", truth: true, explain: "依序代入 $x=1,2,3,4$，對應出 $y=8,6,4,2$ 皆為正整數；當 $x=5$ 時 $y=0$ 不是正整數。因此恰好 4 組！" },
        { t: "無限多組解", common: true, explain: "若沒有限定「正整數」，確實有無限多組解；但限定正整數後只有有限組。" },
        { t: "5 組解", explain: "誤把 $(5, 0)$ 也算進去，$0$ 不是正整數。" },
        { t: "只有 1 組解", explain: "二元一次方程式只要未聯立，單獨一條方程式通常有多組搭配解。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整 $x$ 的數值，觀察 $y$ 如何自動配合保持等式 $ax+by=c$ 恆成立。",
      frames: [
        { cap: "二元一次式定義：含有兩個未知數，且未知數的最高次數都是 1 次的整式。例如 $3x - 5y + 7$。", tex: "ax + by + c\\quad (a\\ne 0,\\ b\\ne 0)" },
        { cap: "同類項合併：含相同字母且次方相同的項才能合併，$x$ 的項與 $y$ 的項分開相加減。", tex: "(3x + 2y) + (4x - 5y) = 7x - 3y" },
        { cap: "方程式的解：能讓等式成立的一對數值 $(x, y)$。沒有限制時有<b>無限多組解</b>。", tex: "2x + y = 10 \\implies y = 10 - 2x" },
        { cap: "整數解的列舉：解應用題時常利用表格，依序從係數較大的未知數代入檢驗。", tex: "\\begin{array}{c|cccc} x & 1 & 2 & 3 & 4 \\\\ \\hline y & 8 & 6 & 4 & 2 \\end{array}" }
      ],
      hint: "列舉整數解時，優先從「係數較大」的未知數開始代入，範圍會被快速縮小。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "二元解動態對應");
        var slX = SK.slider({ label: "未知數 x", min: 0, max: 5, step: 1, value: 2, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value, y = 10 - 2 * x;
          svg.innerHTML = "";
          s("rect", { x: 70, y: 50, width: 300, height: 130, rx: 14, fill: C.mint.f, stroke: C.mint.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 85, "方程式: 2x + y = 10", { size: 18, color: C.ink, bold: true });
          SK.label(svg, 220, 125, "當 x = " + x + " 時， y = " + y, { size: 20, color: C.blue.s, bold: true });
          SK.label(svg, 220, 155, (x > 0 && y > 0 ? "✓ 是正整數解" : "✗ 不是正整數解"), { size: 14, color: (x > 0 && y > 0 ? C.green.s : C.pink.s), bold: true });
          read.innerHTML = SK.tex("x = " + x + " \\implies y = 10 - 2(" + x + ") = " + y + "\\quad \\implies (x, y) = (" + x + ", " + y + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "二元一次式的化簡與非負整數解枚舉",
        code: "A-7-4",
        demo: {
          q: "化簡式子 $4(2x - 3y + 1) - 3(x - 4y - 2)$，並求當 $x=2, y=-1$ 時的值。",
          steps: [
            "展開括號：$8x - 12y + 4 - 3x + 12y + 6$。",
            "同類項合併：$(8x - 3x) + (-12y + 12y) + (4 + 6) = 5x + 10$（$y$ 恰好抵消）。",
            "代入求值：當 $x=2, y=-1$ 時，$5(2) + 10 = 20$。"
          ]
        },
        tries: [
          {
            q: "化簡二元一次式 $\\frac{x - 2y}{3} - \\frac{2x - y}{4}$。",
            hint: "公分母為 12，通分後去括號合併同類項。",
            ans: "$\\frac{4(x - 2y) - 3(2x - y)}{12} = \\frac{4x - 8y - 6x + 3y}{12} = \\frac{-2x - 5y}{12}$。"
          },
          {
            q: "求方程式 $3x + 4y = 25$ 的所有「正整數解」$(x, y)$。",
            hint: "由 $y$ 從 1, 2, 3... 依序代入，看 $25-4y$ 是否能被 3 整除。",
            ans: "當 $y=1$，$3x=21\\implies x=7$；當 $y=4$，$3x=9\\implies x=3$。共 2 組正整數解：$(7, 1)$ 與 $(3, 4)$。"
          }
        ],
        edge: "式子化簡只能通分保留分母，千萬不能任意同乘 12 把分母消掉；只有方程式兩邊有等號時才能消分母。"
      }
    ],

    angles: [
      {
        title: "生活中的多元約束",
        icon: "sparkle",
        html: "到超市買每顆 25 元的蘋果 $x$ 顆與每顆 15 元的橘子 $y$ 顆，總共花了 150 元：$25x + 15y = 150$（化簡為 $5x + 3y = 30$）。水果顆數不能是小數也不能是負數，生活天然替方程式加上了「非負整數」的邊界。"
      },
      {
        title: "幾何直線上無限多個點",
        icon: "leaf",
        html: "如果把二元一次方程式的每一組解 $(x, y)$ 當成平面直角坐標系上的一個點，這無數個點排起來會剛好連成一條筆直的<b>直線</b>！代數的一條方程式，在幾何世界裡就是一條直線。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "若數對 $(2, k)$ 是方程式 $3x - 4y = 10$ 的一組解，求 $k$ 的值。",
        hint: "將 $x=2$ 與 $y=k$ 直接代入方程式中。",
        idea: "$3(2) - 4k = 10 \\implies 6 - 4k = 10 \\implies -4k = 4 \\implies k = -1$。"
      },
      {
        lv: "Explore",
        q: "已知某二位數的個位數字為 $y$，十位數字為 $x$。若將十位與個位數字對調，則新數比原數大 18。求 $y - x$ 的值。",
        hint: "原數為 $10x + y$，新數為 $10y + x$。",
        idea: "新數 $-$ 原數 $= (10y + x) - (10x + y) = 9y - 9x = 9(y - x) = 18 \\implies y - x = 2$。"
      },
      {
        lv: "Wonder",
        q: "郵局只有 5 元與 12 元兩種郵票。若小英買了兩種郵票共花了 100 元，且兩種郵票都至少各買 1 張，請問小英買了 5 元郵票幾張？",
        hint: "設 5 元郵票 $x$ 張，12 元郵票 $y$ 張，列出 $5x + 12y = 100$ 找正整數解。",
        idea: "由 $5x = 100 - 12y$，代表 $100 - 12y$ 必須是 5 的倍數，因此 $12y$ 的個位數字必須是 0，故 $y = 5$。代入得 $5x = 100 - 60 = 40 \\implies x = 8$。故 5 元郵票買了 8 張。"
      }
    ],

    where: {
      codes: [["A-7-4", "二元一次聯立方程式的意義：二元一次方程式及其解的意義、具體情境列式"]],
      exam: "會考常考文字題列出二元一次式，或找出限定正整數範圍下的特定解組合。",
      stop: "單一二元一次方程式重點在理解「解有無限多組」以及表格枚舉正整數解，不延伸至三元方程式。"
    }
  });
})();
