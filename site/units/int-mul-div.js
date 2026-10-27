/* 單元：1-3 整數的乘除 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "乘法分配律幾何圖解");
    s("rect", { x: 50, y: 50, width: 120, height: 90, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 170, y: 50, width: 180, height: 90, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 110, 95, "a × b", { size: 16, color: C.blue.s, bold: true });
    SK.label(svg, 260, 95, "a × c", { size: 16, color: C.orange.s, bold: true });
    SK.label(svg, 30, 95, "a", { size: 16, color: C.cocoa, bold: true });
    SK.label(svg, 110, 35, "b", { size: 16, color: C.blue.s });
    SK.label(svg, 260, 35, "c", { size: 16, color: C.orange.s });
    SK.brace(svg, 50, 155, 350, 155, 12, C.cocoa);
    SK.label(svg, 200, 185, "a × (b + c) = ab + ac", { size: 15, color: C.cocoa, bold: true });
  }

  SK.mountUnit({
    slug: "int-mul-div",
    en: "Multiplication and Division of Integers",
    formula: "(-a)\\times(-b) = \\co{ab},\\quad a\\times(b+c) = \\co{ab}+\\cb{ac}",

    hook: {
      html: "「負負得正」常讓人覺得神秘。想像電影倒帶：一個倒退走（負速度）的人在倒轉播放（負時間）時，畫面看起來就是在<b>往前走</b>！連乘時只要數負號個數：<b>奇數個負為負，偶數個負為正</b>。",
      ask: "為什麼 $0$ 不能當除數？$a\\div 0$ 究竟代表什麼意思？",
      visual: hookVisual
    },

    guess: {
      q: "計算算式 $(-4)\\times 125\\times(-25)\\times(-8)$ 的結果，正負符號與數值是多少？",
      options: [
        { t: "$-100000$", truth: true, explain: "算式中共有三個負數（奇數個負），乘積必為負！搭配巧算 $[(-4)\\times(-25)]\\times[125\\times(-8)] = 100\\times(-1000) = -100000$。" },
        { t: "$100000$", common: true, explain: "算對了數值但數錯了負號個數，共有 3 個負號，結果必須是負數。" },
        { t: "$-10000$", explain: "少乘了一個 10，計算時配對 $4\\times 25=100$ 與 $125\\times 8=1000$。" },
        { t: "$0$", explain: "算式中完全沒有 0，乘積絕不可能為 0。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整負因數個數，體驗符號規律與四則運算先乘除後加減的確定性。",
      frames: [
        { cap: "正負相乘：正負得負、負正得負。例如 $3\\times(-4)=-12$。", tex: "a\\times(-b) = -(ab)" },
        { cap: "負負得正：兩負數相乘，結果為正數。例如 $(-3)\\times(-4)=12$。", tex: "(-a)\\times(-b) = ab" },
        { cap: "除法法則：除以一數等於乘以該數的倒數。同號相除為正，異號相除為負；0 除以任何非零數皆為 0，但 0 不能當除數。", tex: "a\\div(-b) = -\\left(\\frac{a}{b}\\right),\\quad (-a)\\div(-b) = \\frac{a}{b}" },
        { cap: "乘法分配律：乘法對加法與減法皆具有分配律，善用分配律可以將繁複的四則運算大幅簡化。", tex: "a(b+c) = ab+ac,\\quad (a+b)\\div c = a\\div c + b\\div c" }
      ],
      hint: "算式中有乘除與加減時，務必遵守「先乘除、後加減；由內而外先算括號」的黃金規則。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "乘法規律演示");
        var slA = SK.slider({ label: "因數 $\\co{a}$", min: -5, max: 5, step: 1, value: -3, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "因數 $\\cb{b}$", min: -5, max: 5, step: 1, value: -4, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value, prod = a * b;
          svg.innerHTML = "";
          var cols = prod > 0 ? C.green.s : prod < 0 ? C.pink.s : C.cocoa;
          s("rect", { x: 70, y: 50, width: 300, height: 140, rx: 16, fill: prod > 0 ? C.green.f : prod < 0 ? C.pink.f : "#FDFBF6", stroke: cols, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 95, "(" + a + ") × (" + b + ")", { size: 22, color: C.cocoa, bold: true });
          SK.label(svg, 220, 145, "= " + prod, { size: 28, color: cols, bold: true });
          read.innerHTML = SK.tex("(" + a + ")\\times(" + b + ") = " + prod + "\\quad \\text{(" + (prod > 0 ? "正數" : prod < 0 ? "負數" : "零") + ")}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "含負數的四則混合運算與分配律",
        code: "N-7-3",
        demo: {
          q: "計算算式 $(-24)\\div 4 - (-3)\\times [8 - (-2)] + (-5)$ 的值。",
          steps: [
            "先算最內層括號：$8 - (-2) = 8 + 2 = 10$。",
            "進行乘除運算：$(-24)\\div 4 = -6$，以及 $(-3)\\times 10 = -30$。",
            "原式化為：$(-6) - (-30) + (-5) = (-6) + 30 - 5 = 19$。"
          ]
        },
        tries: [
          {
            q: "計算算式 $98\\times(-35) + 2\\times(-35)$ 的值。",
            hint: "觀察兩項都含有共同因數 $-35$，運用逆向分配律提公因數。",
            ans: "$(98 + 2)\\times(-35) = 100\\times(-35) = -3500$。"
          },
          {
            q: "計算算式 $(-48)\\div [(-4)\\times(-2)] - (-5)\\times 3$ 的值。",
            hint: "括號先算：$(-4)\\times(-2) = 8$。",
            ans: "$(-48)\\div 8 - (-15) = (-6) + 15 = 9$。"
          }
        ],
        edge: "注意除法沒有右分配律：$a\\div(b+c) \\ne a\\div b + a\\div c$！只有被除數能拆項：$(a+b)\\div c = a\\div c + b\\div c$。"
      }
    ],

    angles: [
      {
        title: "乘法與連續扣款",
        icon: "sparkle",
        html: "如果每天帳戶被自動扣款 50 元（記為 $-50$），連續扣了 4 天，帳戶總共變動 $(-50)\\times 4 = -200$ 元；若是「取消」了過去 4 天的扣款（乘以 $-4$），帳戶就會多出 $(-50)\\times(-4) = +200$ 元，這就是「負負得正」的生活常理。"
      },
      {
        title: "為什麼不能除以 0？",
        icon: "leaf",
        html: "若 $6\\div 0 = x$，依除法定義代表 $x\\times 0 = 6$，但任何數乘以 0 都等於 0，絕不可能等於 6，這叫<b>無解</b>；若 $0\\div 0 = x$，代表 $x\\times 0 = 0$，任何數代入都成立，無法確定單一答案，這叫<b>未定（不確定）</b>。因此數學規定 0 絕對不能當除數。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "計算 $(-1)\\times(-2)\\times(-3)\\times(-4)\\times(-5)$ 的值。",
        hint: "數一數負號有幾個，奇數個負結果為負。",
        idea: "共有 5 個負號，結果為負數：$-(1\\times 2\\times 3\\times 4\\times 5) = -120$。"
      },
      {
        lv: "Explore",
        q: "計算 $199\\times(-37)$ 的值。",
        hint: "把 199 拆成 $200 - 1$，再運用分配律乘開。",
        idea: "$(200 - 1)\\times(-37) = 200\\times(-37) - 1\\times(-37) = -7400 - (-37) = -7400 + 37 = -7363$。"
      },
      {
        lv: "Wonder",
        q: "定義新運算符號 $a\\star b = a\\times b - (a + b)$。求 $(-4)\\star 6$ 的值。",
        hint: "直接依照規則代入 $a=-4$ 與 $b=6$ 計算。",
        idea: "$(-4)\\star 6 = (-4)\\times 6 - [(-4) + 6] = -24 - 2 = -26$。"
      }
    ],

    where: {
      codes: [["N-7-3", "負數的四則運算：乘除法符號規則"], ["N-7-4", "數的運算規律：乘法交換律、結合律與分配律"]],
      exam: "會考常考分配律速算及四則混合運算的運算順序，括號與符號處理為必考基礎。",
      stop: "除法只處理非零除數；分配律以整數四則簡化為限，不延伸至過於複雜的代數連鎖變換。"
    }
  });
})();
