/* 單元：3-1 提公因式與公式因式分解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "提公因式與乘開的逆運算");
    s("rect", { x: 30, y: 40, width: 140, height: 60, rx: 6, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 100, 65, "展開（乘開）", { size: 12, color: C.soft });
    SK.label(svg, 100, 85, "a(b + c) = ab + ac", { size: 12, color: C.orange.s, bold: true });

    s("line", { x1: 185, y1: 70, x2: 215, y2: 70, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("polygon", { points: "215,70 205,65 205,75", fill: C.cocoa }, svg);

    s("rect", { x: 230, y: 40, width: 140, height: 60, rx: 6, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 300, 65, "因式分解（倒回去）", { size: 12, color: C.soft });
    SK.label(svg, 300, 85, "ab + ac = a(b + c)", { size: 12, color: C.blue.s, bold: true });

    s("rect", { x: 50, y: 125, width: 300, height: 45, rx: 8, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 152, "把散開的面積碎片重新拼回「長方形」！", { size: 13, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "factor-common",
    en: "Factoring by Common Factors and Formulas",
    formula: "ma + mb = m(a+b),\\quad a^2 - b^2 = (a+b)(a-b)",

    hook: {
      html: "多項式展開是把積化為和（拆括號）；而<b>因式分解</b>恰好是完全反方向的倒車操作：把一長串多項式的「和」化為幾個多項式的「連乘積」。就像把散落一地的積木重新拼裝成一個個完整的長方形盒子！",
      ask: "因式分解的第一準則是什麼？為什麼一定要先檢查有沒有「公因式」可以提？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一個式子是多項式 $4x^2 - 9$ 的正確因式分解結果？",
      options: [
        { t: "(2x + 3)(2x - 3)", truth: true, explain: "利用平方差公式倒回去：$4x^2 - 9 = (2x)^2 - 3^2 = (2x + 3)(2x - 3)$！" },
        { t: "(4x - 9)(x + 1)", explain: "展開後交叉乘出來是一次項 $-5x$，不符。" },
        { t: "(2x - 3)^2", common: true, explain: "展開是 $4x^2 - 12x + 9$，多了一次項且常數項符號為正。" },
        { t: "4(x^2 - 9)", explain: "9 不能被 4 整除，且括號內尚未分解完畢。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變公因式的大小，觀察提公因式與公式分解如何將多項式化為乘積長方形。",
      frames: [
        { cap: "因式分解意義：將一個多項式寫成兩個或多個相乘的因式乘積。每個因式的次數都必須大於 0（不能只提常數）。", tex: "A(x) = B(x) \\cdot C(x)" },
        { cap: "第一步：提公因式。觀察所有項的係數最大公因數與文字符號的最低次方，整包提到最前面！", tex: "6x^3 + 9x^2 = 3x^2(2x + 3)" },
        { cap: "第二步：分組提公因式。四項式常採「兩兩一組」或「三一分組」，製造出共通的括號因式再提一次。", tex: "ac+ad+bc+bd = a(c+d)+b(c+d) = (a+b)(c+d)" },
        { cap: "第三步：乘法公式逆用。平方差 $a^2-b^2=(a+b)(a-b)$、完全平方式 $a^2\\pm 2ab+b^2=(a\\pm b)^2$。", tex: "x^2 - 6x + 9 = (x - 3)^2" }
      ],
      hint: "因式分解口訣：有公先提公，無公看項數；兩項平方差，三項配完全，四項兩兩分！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "因式分解動態圖");
        var slM = SK.slider({ label: "公因式係數 m", min: 2, max: 5, step: 1, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slM.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var m = slM.value;
          var term1 = m * 2, term2 = m * 5;
          svg.innerHTML = "";
          SK.label(svg, 220, 60, term1 + "x + " + term2, { size: 22, color: C.ink, bold: true });
          s("line", { x1: 220, y1: 85, x2: 220, y2: 115, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 140, "= (" + m + " × 2x) + (" + m + " × 5)", { size: 16, color: C.orange.s, bold: true });
          s("line", { x1: 220, y1: 160, x2: 220, y2: 190, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 215, "= " + m + "(2x + 5)", { size: 22, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex(term1 + "x + " + term2 + " = " + m + "(2x + 5)，\\text{順利提取公因式 }" + m + "！", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "提公因式與公式法因式分解",
        code: "A-8-4",
        demo: {
          q: "因式分解下列各式：(1) $3x(x - 2) - 5(x - 2)$；(2) $9x^2 - 30x + 25$。",
          steps: [
            "(1) 發現兩項皆有共通的括號 $(x - 2)$，提出公因式：$(x - 2)(3x - 5)$。",
            "(2) 檢查是否為完全平方式：$9x^2 = (3x)^2$，$25 = 5^2$，$2(3x)(5) = 30x$。",
            "套用差的平方公式：$(3x - 5)^2$。"
          ]
        },
        tries: [
          {
            q: "因式分解 $2x^3 - 8x$ 的完全分解結果為何？",
            options: ["2x(x + 2)(x - 2)", "2x(x^2 - 4)", "(2x^2 + 4)(x - 2)", "2(x^3 - 4x)"],
            ans: 0,
            explain: "先提公因式 $2x$ 得 $2x(x^2 - 4)$；括號內仍可利用平方差繼續分解，最終結果為 $2x(x + 2)(x - 2)$！"
          },
          {
            q: "因式分解 $x^2 - y^2 + 2x + 2y$ 的結果為下列何者？",
            options: ["(x + y)(x - y + 2)", "(x - y)(x + y + 2)", "(x + y)^2", "(x + y)(x - y)"],
            ans: 0,
            explain: "分組處理：前兩項 $(x^2 - y^2) = (x+y)(x-y)$，後兩項 $2(x+y)$。兩組皆有 $(x+y)$，提出得 $(x+y)[(x-y)+2] = (x+y)(x-y+2)$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若多項式 $x^2 + kx + 36$ 是一個「完全平方式」，則常數 $k$ 的值可能為多少？",
        options: ["12 或 -12", "12", "6 或 -6", "18 或 -18"],
        ans: 0,
        hint: "完全平方式 $(x \\pm a)^2 = x^2 \\pm 2ax + a^2$，$a^2=36 \\implies a=6$。",
        explain: "因為 $x^2 + kx + 36 = (x \\pm 6)^2 = x^2 \\pm 12x + 36$，中間一次項係數 $k$ 可以是 $+12$ 或 $-12$！切記有兩個可能！"
      }
    ],

    angles: [
      { title: "RSA 公鑰加密體系的數學盾牌", body: "現代網際網路最核心的 RSA 加密機制，其安全性完全建立在「把兩個幾千位元的大質數相乘很容易（只需毫秒），但要把乘積因數分解回來，超級電腦算上一萬年也解不開」的單向不可逆性上！" },
      { title: "幾何拼圖看因式分解", body: "代數因式分解的本質，就是給你一堆規格不同的面積板塊（$x^2$ 方塊、大小條形方塊與單位方塊），考驗你能不能把它們恰好拼接成一個毫無縫隙的大長方形。" }
    ],

    where: {
      past: "八年級乘法公式與多項式乘除運算。",
      current: "提公因式與公式法因式分解，將和差式化為連乘積。",
      next: "下一節將學習威力最強大的三項式分解武器——「十字交乘法」！"
    }
  });
})();
