/* 單元：1-1 乘法公式 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "正方形切開看和的平方");
    s("rect", { x: 50, y: 30, width: 90, height: 90, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("rect", { x: 140, y: 30, width: 50, height: 90, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 50, y: 120, width: 90, height: 50, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 140, y: 120, width: 50, height: 50, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
    SK.label(svg, 95, 75, "a^2", { size: 16, color: C.orange.s, bold: true });
    SK.label(svg, 165, 75, "ab", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 95, 145, "ab", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 165, 145, "b^2", { size: 14, color: C.green.s, bold: true });
    SK.label(svg, 280, 80, "(a + b)^2", { size: 18, color: C.ink, bold: true });
    SK.label(svg, 280, 115, "= a^2 + 2ab + b^2", { size: 15, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "mul-formulas",
    en: "Multiplication Formulas",
    formula: "(a\\pm b)^2 = a^2 \\pm 2ab + b^2,\\quad (a+b)(a-b) = a^2 - b^2",

    hook: {
      html: "心算 $103^2$ 或 $98 \\times 102$ 時，如果用直式硬乘既耗時又容易算錯。但是古希臘幾何學家把大正方形切成四塊拼圖：一塊 $a^2$、兩塊 $ab$、一塊 $b^2$，發現了威力無窮的<b>乘法公式</b>！",
      ask: "為什麼 $(a+b)^2$ 絕對不等於 $a^2 + b^2$？中間遺漏了哪兩塊關鍵面積？",
      visual: hookVisual
    },

    guess: {
      q: "計算 $999^2$ 的最快巧算方法是下列哪一個？",
      options: [
        { t: "(1000 - 1)^2 = 1000000 - 2000 + 1 = 998001", truth: true, explain: "將 999 拆成 $1000 - 1$，利用差的平方公式 $(a-b)^2 = a^2 - 2ab + b^2$，完全不必動用複雜筆算！" },
        { t: "1000^2 - 1^2 = 1000000 - 1 = 999999", common: true, explain: "嚴重的常見迷思！誤把 $(a-b)^2$ 當成 $a^2 - b^2$，少減了中間項 $2ab = 2000$。" },
        { t: "(990 + 9)^2", explain: "雖然結果相同，但 $990^2$ 仍不好心算，不如選 1000 好算。" },
        { t: "(1000 - 1)(1000 + 1)", explain: "這是平方差公式，算出來是 $1000^2 - 1^2 = 999 \\times 1001$，不是 $999^2$。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變邊長 $a$ 與 $b$ 的大小，動態看見和的平方與平方差的幾何拼圖變化。",
      frames: [
        { cap: "和的平方公式：邊長 $(a+b)$ 的大正方形面積，等於一大一小兩正方形與兩塊長方形的和。", tex: "(a+b)^2 = a^2 + 2ab + b^2" },
        { cap: "差的平方公式：從邊長 $a$ 的正方形扣除兩條邊長為 $b$ 的長條時，右下角 $b^2$ 被多扣了一次，必須補回！", tex: "(a-b)^2 = a^2 - 2ab + b^2" },
        { cap: "平方差公式：邊長 $a$ 的大正方形挖掉邊長 $b$ 的小正方形，剪開拼接成長為 $(a+b)$、寬為 $(a-b)$ 的長方形。", tex: "a^2 - b^2 = (a+b)(a-b)" },
        { cap: "速算對稱性：遇到兩數相乘，若兩數平均是漂亮整數，必用平方差！例如 $102 \\times 98 = (100+2)(100-2) = 10000 - 4 = 9996$。", tex: "(k+d)(k-d) = k^2 - d^2" }
      ],
      hint: "幾何拼圖口訣：和的平方多兩倍積，差的平方減兩倍積，一加一減平方差！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "乘法公式幾何推導");
        var slA = SK.slider({ label: "邊長 a", min: 3, max: 7, step: 1, value: 5, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "邊長 b", min: 1, max: 4, step: 1, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var ox = 50, oy = 30, sc = 18;
          svg.innerHTML = "";
          // a^2
          s("rect", { x: ox, y: oy, width: a * sc, height: a * sc, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, ox + (a * sc) / 2, oy + (a * sc) / 2, "a^2=" + (a * a), { size: 14, color: C.orange.s, bold: true });
          // 右 ab
          s("rect", { x: ox + a * sc, y: oy, width: b * sc, height: a * sc, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
          SK.label(svg, ox + a * sc + (b * sc) / 2, oy + (a * sc) / 2, "ab=" + (a * b), { size: 12, color: C.blue.s, bold: true });
          // 下 ab
          s("rect", { x: ox, y: oy + a * sc, width: a * sc, height: b * sc, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
          SK.label(svg, ox + (a * sc) / 2, oy + a * sc + (b * sc) / 2, "ab=" + (a * b), { size: 12, color: C.blue.s, bold: true });
          // 右下 b^2
          s("rect", { x: ox + a * sc, y: oy + a * sc, width: b * sc, height: b * sc, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
          SK.label(svg, ox + a * sc + (b * sc) / 2, oy + a * sc + (b * sc) / 2, "b^2=" + (b * b), { size: 12, color: C.green.s, bold: true });

          var tot = (a + b) * (a + b);
          read.innerHTML = SK.tex("(" + a + " + " + b + ")^2 = " + (a + b) + "^2 = " + a + "^2 + 2(" + a + ")(" + b + ") + " + b + "^2 = " + (a*a) + " + " + (2*a*b) + " + " + (b*b) + " = " + tot, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "運用乘法公式巧算數值",
        code: "A-8-1",
        demo: {
          q: "計算下列各式之值：(1) $10.2^2$；(2) $199 \\times 201$。",
          steps: [
            "(1) $10.2^2 = (10 + 0.2)^2 = 10^2 + 2(10)(0.2) + 0.2^2 = 100 + 4 + 0.04 = 104.04$。",
            "(2) $199 \\times 201 = (200 - 1)(200 + 1) = 200^2 - 1^2 = 40000 - 1 = 39999$。"
          ]
        },
        tries: [
          {
            q: "計算 $203^2 - 197^2$ 的值為多少？",
            options: ["2400", "2000", "2404", "1200"],
            ans: 0,
            explain: "利用平方差公式 $a^2 - b^2 = (a+b)(a-b)$：$(203 + 197)(203 - 197) = 400 \\times 6 = 2400$。"
          },
          {
            q: "若 $(a + b) = 7$ 且 $ab = 10$，則 $a^2 + b^2$ 的值是多少？",
            options: ["29", "49", "39", "19"],
            ans: 0,
            explain: "由 $(a+b)^2 = a^2 + 2ab + b^2$ 移項：$a^2 + b^2 = (a+b)^2 - 2ab = 7^2 - 2(10) = 49 - 20 = 29$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若 $x + \\frac{1}{x} = 5$，則 $x^2 + \\frac{1}{x^2}$ 的值是多少？",
        options: ["23", "25", "27", "21"],
        ans: 0,
        hint: "將等式兩邊同時平方，注意中間項 $2 \\cdot x \\cdot \\frac{1}{x} = 2$。",
        explain: "兩邊平方得 $(x + \\frac{1}{x})^2 = x^2 + 2(x)(\\frac{1}{x}) + \\frac{1}{x^2} = x^2 + 2 + \\frac{1}{x^2} = 5^2 = 25$。因此 $x^2 + \\frac{1}{x^2} = 25 - 2 = 23$。"
      }
    ],

    angles: [
      { title: "巴比倫人的平方乘法表", body: "在沒有電子計算機的遠古時代，巴比倫泥板刻滿了平方數表。乘法 $a \\times b$ 可以透過公式 $ab = \\frac{(a+b)^2 - (a-b)^2}{4}$ 轉化為查表查兩次平方相減，大幅減少乘法算力！" },
      { title: "二項式定理的高維延伸", body: "乘法公式是二項式定理 $(a+b)^n$ 的 $n=2$ 特例。當展開 $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ 時，就對應到三維空間中切割大立方體的幾何碎片！" }
    ],

    where: {
      past: "七年級以符號代數列式與分配律展開式子。",
      current: "透過幾何圖形直觀記憶三大人氣乘法公式：和平方、差平方、平方差。",
      next: "乘法公式是八年級下學期「因式分解」的倒車操作（逆運算），也是解一元二次方程式的必備基石！"
    }
  });
})();
