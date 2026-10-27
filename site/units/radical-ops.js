/* 單元：2-2 根式的運算 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "最簡根式與分母有理化");
    s("rect", { x: 40, y: 35, width: 320, height: 45, rx: 6, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 62, "\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}\\quad (a, b \\ge 0)", { size: 14, color: C.ink, bold: true });

    s("rect", { x: 50, y: 105, width: 130, height: 60, rx: 6, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 115, 130, "\\sqrt{18} = \\sqrt{9 \times 2}", { size: 13, color: C.orange.s });
    SK.label(svg, 115, 152, "= 3\\sqrt{2} (提平方)", { size: 13, color: C.orange.s, bold: true });

    s("rect", { x: 220, y: 105, width: 130, height: 60, rx: 6, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 285, 130, "1 / \\sqrt{2} = \\sqrt{2} / 2", { size: 13, color: C.blue.s });
    SK.label(svg, 285, 152, "分母有理化", { size: 13, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "radical-ops",
    en: "Operations with Radicals",
    formula: "\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab},\\quad \\frac{1}{\\sqrt{a}+\\sqrt{b}}=\\frac{\\sqrt{a}-\\sqrt{b}}{a-b}",

    hook: {
      html: "當我們遇到 $\\sqrt{12} + \\sqrt{27}$ 時，不能直接把裡面加成 $\\sqrt{39}$！就像同類項合併一樣，我們必須先把完全平方數提出來化為「最簡根式」：$2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$。這就是<b>根式運算</b>的優雅規律。",
      ask: "為什麼分母有根號時必須進行「分母有理化」？平方差公式在雙項分母中如何發揮奇效？",
      visual: hookVisual
    },

    guess: {
      q: "計算 $\\frac{6}{\\sqrt{3}}$ 進行分母有理化後的結果是下列何者？",
      options: [
        { t: "$2\\sqrt{3}$", truth: true, explain: "分子分母同乘 $\\sqrt{3}$：$\\frac{6\\sqrt{3}}{\\sqrt{3}\\times\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$！" },
        { t: "$3\\sqrt{2}$", explain: "數字混淆，$\\frac{6}{3} = 2$ 不是 3。" },
        { t: "$6\\sqrt{3}$", common: true, explain: "忘記分母 $\\sqrt{3} \\times \\sqrt{3} = 3$ 還要與分子 6 約分。" },
        { t: "2", explain: "誤將根號直接消去。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變根號內的被開方數，觀察最簡根式的平方分解與同類方根合併。",
      frames: [
        { cap: "最簡根式三大準則：(1) 被開方數無完全平方因數；(2) 根號內不含分數或小數；(3) 分母不得含有根號。", tex: "\\sqrt{a^2 b} = a\\sqrt{b}" },
        { cap: "乘除法同根相乘：同次根號相乘除，外面乘外面、裡面乘裡面。$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$。", tex: "m\\sqrt{a} \\times n\\sqrt{b} = mn\\sqrt{ab}" },
        { cap: "加減法同類方根：只有化為最簡根式後「根號內數字完全相同」的方根才能合併係數相加減！", tex: "2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}" },
        { cap: "平方差有理化：遇到 $(\\sqrt{a}+\\sqrt{b})$ 分母，同乘共軛式 $(\\sqrt{a}-\\sqrt{b})$，利用 $(x+y)(x-y)=x^2-y^2$ 徹底消除分母根號！", tex: "\\frac{1}{\\sqrt{a}+\\sqrt{b}} = \\frac{\\sqrt{a}-\\sqrt{b}}{a-b}" }
      ],
      hint: "根式加減切記：$\\sqrt{2} + \\sqrt{3} \\ne \\sqrt{5}$！就像 $2x + 3y$ 不是 $5xy$，不同類方根絕不能加在一起！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "根式化簡推導");
        var slA = SK.slider({ label: "提出數 a", min: 1, max: 5, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "殘留質數 b", min: 2, max: 7, step: 1, value: 3, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var inside = a * a * b;
          svg.innerHTML = "";
          SK.label(svg, 220, 60, "\\sqrt{" + inside + "}", { size: 24, color: C.ink, bold: true });
          s("line", { x1: 220, y1: 80, x2: 220, y2: 110, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 135, "= \\sqrt{" + (a*a) + " \\times " + b + "} = \\sqrt{" + a + "^2 \\times " + b + "}", { size: 16, color: C.orange.s, bold: true });
          s("line", { x1: 220, y1: 155, x2: 220, y2: 180, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 205, "= " + a + "\\sqrt{" + b + "}", { size: 22, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\sqrt{" + inside + "} = \\sqrt{" + (a*a) + "}\\times\\sqrt{" + b + "} = " + a + "\\sqrt{" + b + "}，\\text{完全平方數 }" + (a*a) + "\\text{ 順利提出根號！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "根式四則混合運算與分母有理化",
        code: "N-8-1",
        demo: {
          q: "計算下列各式並化為最簡根式：(1) $\\sqrt{48} - \\sqrt{27} + \\sqrt{12}$；(2) $\\frac{1}{\\sqrt{5} - \\sqrt{3}}$。",
          steps: [
            "(1) 全部化為最簡根式：$\\sqrt{48} = 4\\sqrt{3}$，$\\sqrt{27} = 3\\sqrt{3}$，$\\sqrt{12} = 2\\sqrt{3}$。",
            "同類方根合併：$(4 - 3 + 2)\\sqrt{3} = 3\\sqrt{3}$。",
            "(2) 利用平方差有理化：上下同乘 $(\\sqrt{5} + \\sqrt{3})$。",
            "分母 $= (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$。",
            "得到：$\\frac{\\sqrt{5} + \\sqrt{3}}{2}$。"
          ]
        },
        tries: [
          {
            q: "計算 $(\\sqrt{7} + \\sqrt{3})(\\sqrt{7} - \\sqrt{3})$ 的值為多少？",
            options: ["4", "10", "$4\\sqrt{21}$", "2"],
            ans: 0,
            explain: "利用平方差公式 $(a+b)(a-b) = a^2 - b^2$：$(\\sqrt{7})^2 - (\\sqrt{3})^2 = 7 - 3 = 4$。"
          },
          {
            q: "化簡 $\\sqrt{75} \\div \\sqrt{3}$ 的結果為多少？",
            options: ["5", "25", "$5\\sqrt{3}$", "15"],
            ans: 0,
            explain: "根號相除：$\\sqrt{75 \\div 3} = \\sqrt{25} = 5$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若 $\\frac{\\sqrt{3} + 1}{\\sqrt{3} - 1} = a + b\\sqrt{3}$，其中 $a, b$ 為有理數，求 $a + b$ 的值是多少？",
        options: ["3", "2", "4", "1"],
        ans: 0,
        hint: "上下同乘 $(\\sqrt{3} + 1)$，展開後對照有理數部分與根號係數。",
        explain: "分子分母同乘 $(\\sqrt{3}+1)$：分母 $(\\sqrt{3})^2 - 1^2 = 2$；分子 $(\\sqrt{3}+1)^2 = 3 + 2\\sqrt{3} + 1 = 4 + 2\\sqrt{3}$。結果為 $\\frac{4+2\\sqrt{3}}{2} = 2 + \\sqrt{3}$。對照得 $a = 2, b = 1$，因此 $a + b = 3$。"
      }
    ],

    angles: [
      { title: "雙重根號的化簡巧思", body: "高中數學常遇到像 $\\sqrt{4 + 2\\sqrt{3}}$ 這樣的「巢狀雙重根號」。若能看成 $(\\sqrt{3}+1)^2 = 4 + 2\\sqrt{3}$，就能脫去外層根號化簡成 $\\sqrt{3} + 1$，背後靠的就是乘法公式與根式運算的結合！" },
      { title: "手算開平方根的直式除法", body: "在沒有計算機的年代，古代天文學家使用類似長除法的「直式開平方法」，每兩位一節，一格一格算出精確的小數點後十幾位根號值。" }
    ],

    where: {
      past: "上一節學會平方根的意義與估算。",
      current: "精通根式乘除、同類方根加減以及共軛分母有理化技巧。",
      next: "下一節將迎來整個幾何學的皇冠明珠——「畢氏定理」！"
    }
  });
})();
