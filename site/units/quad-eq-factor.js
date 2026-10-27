/* 單元：4-1 因式分解法解一元二次方程 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "乘積為零的零乘積原理");
    s("rect", { x: 30, y: 35, width: 340, height: 50, rx: 8, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 65, "A × B = 0  <=>  A = 0 或 B = 0", { size: 16, color: C.ink, bold: true });

    s("rect", { x: 50, y: 110, width: 130, height: 60, rx: 6, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 115, 135, "(x - 2) = 0", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 115, 155, "x = 2", { size: 15, color: C.orange.s, bold: true });

    s("rect", { x: 220, y: 110, width: 130, height: 60, rx: 6, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 285, 135, "(x + 3) = 0", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 285, 155, "x = -3", { size: 15, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "quad-eq-factor",
    en: "Solving Quadratic Equations by Factoring",
    formula: "\\text{因式分解解方程式：若 } A \\times B = 0 \\text{，則 } A = 0 \\text{ 或 } B = 0",

    hook: {
      html: "如果兩個數相乘等於 0，我們能百分之百肯定：這兩數之中<b>至少有一個必須是 0</b>！利用這個看似質樸的「零乘積性質」，只要把二次方程式因式分解成兩個一次式相乘等於 0，二次方程立刻降階成兩個極好解的一元一次方程！",
      ask: "解方程式 $x(x - 5) = 0$ 時，如果兩邊同時除以 $x$，會犯下什麼不可挽回的致命失根錯誤？",
      visual: hookVisual
    },

    guess: {
      q: "解方程式 $x^2 = 3x$，正確的解為下列何者？",
      options: [
        { t: "x = 0 或 x = 3", truth: true, explain: "移項得 $x^2 - 3x = 0 \\implies x(x - 3) = 0 \\implies x = 0$ 或 $x = 3$！千萬不能兩邊直接同除以 $x$，否則 $x=0$ 這個解就白白丟失了！" },
        { t: "只有 x = 3", common: true, explain: "典型致命失根錯誤！兩邊同除以 $x$ 忽略了 $x$ 可能為 0 的情況。" },
        { t: "x = \\pm 3", explain: "誤把右邊當成 9。" },
        { t: "x = 3 或 x = -3", explain: "解方程式並非開平方根。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變兩根 $\\alpha$ 與 $\\beta$，觀察因式分解降階與兩根在數線上的對應。",
      frames: [
        { cap: "一元二次方程式標準式：化簡後形如 $ax^2 + bx + c = 0$（其中 $a \\ne 0$）。等號右邊必須整理為 0！", tex: "ax^2 + bx + c = 0\\ (a\\ne 0)" },
        { cap: "零乘積性質：若 $A \\cdot B = 0$，則必定 $A = 0$ 或 $B = 0$。這是因式分解法的核心心臟。", tex: "(ax+b)(cx+d)=0 \\implies x=-\\frac{b}{a}\\text{ 或 }x=-\\frac{d}{c}" },
        { cap: "重根現象：當方程式分解為完全平方 $(x - k)^2 = 0$ 時，兩根相等，稱為<b>重根</b>，必須註明「重根」。", tex: "(x-k)^2=0 \\implies x = k\\ \\text{（重根）}" },
        { cap: "絕不可隨意除以未知數：若未知數可能為 0，方程式兩邊除以未知數會導致「失根」；正確作法一律<b>移項提公因式</b>！", tex: "x^2=kx \\implies x^2-kx=0 \\implies x(x-k)=0" }
      ],
      hint: "解二次方程第一戒律：先把所有項通通移到等號左邊，讓右邊等於 0 再分解！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "二次方程因式解動態圖");
        var slR1 = SK.slider({ label: "第一根 r1", min: -4, max: 4, step: 1, value: -1, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slR2 = SK.slider({ label: "第二根 r2", min: -4, max: 4, step: 1, value: 3, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slR1.el);
        ctx.sliders.appendChild(slR2.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var r1 = slR1.value, r2 = slR2.value;
          var ox = 220, oy = 130, scale = 25;
          svg.innerHTML = "";
          // 數線
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          var pr1 = ox + r1 * scale, pr2 = ox + r2 * scale;
          s("circle", { cx: pr1, cy: oy, r: 6, fill: C.orange.s }, svg);
          SK.label(svg, pr1, oy - 15, "x=" + r1, { size: 14, color: C.orange.s, bold: true });
          s("circle", { cx: pr2, cy: oy, r: 6, fill: C.blue.s }, svg);
          SK.label(svg, pr2, oy + 25, "x=" + r2, { size: 14, color: C.blue.s, bold: true });

          var b = -(r1 + r2), c = r1 * r2;
          var eqStr = "x^2 " + (b>=0?"+ ":"") + b + "x " + (c>=0?"+ ":"") + c + " = 0";
          var facStr = "(x " + (-r1>=0?"+ ":"") + (-r1) + ")(x " + (-r2>=0?"+ ":"") + (-r2) + ") = 0";
          read.innerHTML = SK.tex(eqStr + " \\implies " + facStr + " \\implies x = " + r1 + (r1 === r2 ? "\\text{（重根）}" : "\\ \\text{或}\\ " + r2), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "十字交乘與提公因式解方程",
        code: "A-8-6",
        demo: {
          q: "解下列一元二次方程式：(1) $2x^2 + 5x - 3 = 0$；(2) $(x - 3)^2 = 4(x - 3)$。",
          steps: [
            "(1) 十字交乘分解：$(2x - 1)(x + 3) = 0$。",
            "令各因式為 0：$2x - 1 = 0 \\implies x = \\frac{1}{2}$；$x + 3 = 0 \\implies x = -3$。解為 $x = \\frac{1}{2}$ 或 $-3$。",
            "(2) 移項提公因式：$(x - 3)^2 - 4(x - 3) = 0$。",
            "提出 $(x - 3)$：$(x - 3)[(x - 3) - 4] = (x - 3)(x - 7) = 0$。",
            "解得 $x = 3$ 或 $7$。"
          ]
        },
        tries: [
          {
            q: "解方程式 $x^2 - 6x + 9 = 0$，其解為下列何者？",
            options: ["x = 3 (重根)", "x = 3 或 x = -3", "x = 9", "無解"],
            ans: 0,
            explain: "因式分解得 $(x - 3)^2 = 0$，兩根相等，解為 $x = 3$（重根）。"
          },
          {
            q: "已知方程式 $x^2 + px - 12 = 0$ 的一根為 $3$，求常數 $p$ 及另一根為何？",
            options: ["p = 1，另一根為 -4", "p = -1，另一根為 4", "p = 4，另一根為 -1", "p = -4，另一根為 1"],
            ans: 0,
            explain: "將 $x=3$ 代入：$3^2 + 3p - 12 = 0 \\implies 3p = 3 \\implies p = 1$。原式為 $x^2 + x - 12 = 0 \\implies (x - 3)(x + 4) = 0$，另一根為 $-4$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若方程式 $(2x - 1)(x + 3) = (2x - 1)(2x - 5)$，則此方程式的兩根為何？",
        options: ["x = 1/2 或 x = 8", "x = 8", "x = 1/2", "x = -3 或 x = 5/2"],
        ans: 0,
        hint: "移項提公因式 $(2x - 1)$，切勿直接兩邊消去！",
        explain: "移項得 $(2x - 1)(x + 3) - (2x - 1)(2x - 5) = 0 \\implies (2x - 1)[(x + 3) - (2x - 5)] = 0 \\implies (2x - 1)(-x + 8) = 0$。解得 $x = \\frac{1}{2}$ 或 $x = 8$。"
      }
    ],

    angles: [
      { title: "拋物線與 x 軸交點的幾何對照", body: "九年級將學到二次函數圖形 $y = ax^2 + bx + c$ 是一條拋物線。方程式等於 0 的兩個解，幾何意義正是這條拋物線穿過水平 $x$ 軸的兩個交點橫坐標！" },
      { title: "量子力學中的零化子算子", body: "現代物理在求解波動方程式時，也是利用算子分解 $(D - \\lambda_1)(D - \\lambda_2)\psi = 0$，將高階微分方程逐層化簡為一階方程，核心思路與國中的因式分解法如出一轍！" }
    ],

    where: {
      past: "八年級剛剛熟練的各類多項式因式分解技巧。",
      current: "運用「零乘積性質」將因式分解轉化為求解一元二次方程式的俐落工具。",
      next: "當十字交乘法失靈湊不出來時，下一節的「配方法與公式解」能無條件暴力秒殺任何二次方程式！"
    }
  });
})();
