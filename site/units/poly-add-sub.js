/* 單元：1-2 多項式的加減 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "同類項分類直式對齊");
    s("rect", { x: 30, y: 35, width: 340, height: 40, rx: 6, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 60, "(3x^2 + 5x - 4) + (2x^2 - 3x + 1)", { size: 14, color: C.ink, bold: true });

    s("rect", { x: 50, y: 95, width: 80, height: 60, rx: 6, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 90, 120, "x^2 項", { size: 12, color: C.orange.s });
    SK.label(svg, 90, 142, "5x^2", { size: 14, color: C.orange.s, bold: true });

    s("rect", { x: 160, y: 95, width: 80, height: 60, rx: 6, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 200, 120, "x 項", { size: 12, color: C.blue.s });
    SK.label(svg, 200, 142, "+2x", { size: 14, color: C.blue.s, bold: true });

    s("rect", { x: 270, y: 95, width: 80, height: 60, rx: 6, fill: C.green.f, stroke: C.green.s }, svg);
    SK.label(svg, 310, 120, "常數項", { size: 12, color: C.green.s });
    SK.label(svg, 310, 142, "-3", { size: 14, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "poly-add-sub",
    en: "Addition and Subtraction of Polynomials",
    formula: "P(x) \\pm Q(x):\\ \\text{同類項係數相加減，缺項補零}",

    hook: {
      html: "當我們整理零錢時，會把 50 元硬幣疊一起、10 元硬幣疊一起、1 元硬幣疊一起。在代數中，<b>$x^2$ 項與 $x^2$ 項相加、常數與常數相加</b>，絕不能混為一談！這就是多項式加減的「同類項合併」法則。",
      ask: "為什麼式子中未知數在分母或根號內時，就不能算是多項式？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一個式子是合法的「一元二次多項式」？",
      options: [
        { t: "3x^2 - 5x + 7", truth: true, explain: "含有單一變數 $x$，最高次方為 2 次，且變數不在分母、絕對值或根號內，標準的一元二次多項式！" },
        { t: "2x^2 + 3/x - 1", common: true, explain: "未知數 $x$ 在分母（$\\frac{3}{x}$ 是分式），不屬於多項式。" },
        { t: "x^2 + \\sqrt{x} + 4", explain: "未知數在根號內（$\\sqrt{x} = x^{1/2}$ 不是非負整數次），不是多項式。" },
        { t: "x^2 - 4x + 3 = 0", explain: "有等號是「方程式」，不是「多項式」。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變多項式係數，動態觀察降冪排列與同類項合併過程。",
      frames: [
        { cap: "多項式的定義：由數與文字符號經由加、減、乘運算組成的式子。變數不可在分母、絕對值或根號內。", tex: "a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0" },
        { cap: "次數與排列：非零多項式中變數的最高次方稱為<b>次數（degree）</b>。習慣按次數由大到小寫成<b>降冪排列</b>。", tex: "\\deg(3x^2 - 4x + 5) = 2" },
        { cap: "加減法法則：橫式去括號（減法務必分配變號）或直式按降冪對齊，<b>缺項補 0</b> 後同類項係數相加減。", tex: "(ax^2+bx+c) - (dx^2+ex+f) = (a-d)x^2 + (b-e)x + (c-f)" },
        { cap: "加減次數定理：兩多項式加減後，新多項式的次數小於或等於兩者中原本較高者的次數。", tex: "\\deg(A \\pm B) \\le \\max(\\deg A, \\deg B)" }
      ],
      hint: "計算減法時，直式對齊前先將除式每一項正負號倒轉，再做加法最不易粗心！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "多項式加減動態圖");
        var slA = SK.slider({ label: "A 的 x^2 係數", min: -3, max: 4, step: 1, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "B 的 x^2 係數", min: -3, max: 4, step: 1, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var sum = a + b;
          svg.innerHTML = "";
          // 畫直式
          SK.label(svg, 150, 60, "A(x) = " + a + "x^2 + 4x - 1", { size: 14, color: C.orange.s, bold: true });
          SK.label(svg, 150, 100, "(+) B(x) = " + b + "x^2 - 2x + 5", { size: 14, color: C.blue.s, bold: true });
          s("line", { x1: 50, y1: 120, x2: 380, y2: 120, stroke: C.cocoa, "stroke-width": 2 }, svg);
          SK.label(svg, 150, 155, "= " + sum + "x^2 + 2x + 4", { size: 16, color: C.ink, bold: true });

          read.innerHTML = SK.tex("A(x) + B(x) = (" + a + " + " + b + ")x^2 + (4 - 2)x + (-1 + 5) = " + sum + "x^2 + 2x + 4", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "多項式橫式與直式加減化簡",
        code: "A-8-3",
        demo: {
          q: "計算 $(4x^2 - 3x + 5) - (2x^2 + 7x - 6)$，並將結果依降冪排列。",
          steps: [
            "去括號（注意減號分配律變號）：$4x^2 - 3x + 5 - 2x^2 - 7x + 6$。",
            "同類項歸類：$(4x^2 - 2x^2) + (-3x - 7x) + (5 + 6)$。",
            "係數合併：$2x^2 - 10x + 11$。"
          ]
        },
        tries: [
          {
            q: "化簡 $(3x^2 + 2x - 4) - (5x^2 - 4x + 1)$ 的結果為下列何者？",
            options: ["-2x^2 + 6x - 5", "-2x^2 - 2x - 5", "8x^2 + 6x - 3", "-2x^2 + 6x - 3"],
            ans: 0,
            explain: "去括號變號：$3x^2 + 2x - 4 - 5x^2 + 4x - 1 = (3-5)x^2 + (2+4)x + (-4-1) = -2x^2 + 6x - 5$。"
          },
          {
            q: "若多項式 $A$ 加上 $(2x^2 - 3x + 1)$ 後等於 $(5x^2 + x - 4)$，則多項式 $A$ 為何？",
            options: ["3x^2 + 4x - 5", "7x^2 - 2x - 3", "3x^2 - 2x - 5", "3x^2 + 4x - 3"],
            ans: 0,
            explain: "移項減回去：$A = (5x^2 + x - 4) - (2x^2 - 3x + 1) = (5-2)x^2 + (1 - (-3))x + (-4 - 1) = 3x^2 + 4x - 5$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知多項式 $(a - 2)x^3 + (b + 3)x^2 + 4x - 5$ 是一個「一次多項式」，則 $a + b$ 的值是多少？",
        options: ["-1", "5", "1", "-5"],
        ans: 0,
        hint: "因為是一次多項式，最高次項只能是 $x$ 的 1 次方，3 次項與 2 次項係數必定為 0！",
        explain: "三次項係數 $a - 2 = 0 \\implies a = 2$；二次項係數 $b + 3 = 0 \\implies b = -3$。因此 $a + b = 2 + (-3) = -1$。"
      }
    ],

    angles: [
      { title: "電腦符號運算系統 (CAS)", body: "像 Mathematica、Wolfram Alpha 等先進數學軟體，內部就是把多項式儲存成係數陣列 $[a_0, a_1, \\dots, a_n]$，執行極其高效的同類項位移相加！" },
      { title: "零多項式 vs 零次多項式", body: "常數多項式如 $f(x) = 5$ 稱為「零次多項式」（次數為 0，因為 $5 = 5x^0$）；但唯獨 $f(x) = 0$ 稱為「零多項式」，規定其次數為「無意義」或「不定義」，這是一個極常考的觀念陷阱！" }
    ],

    where: {
      past: "七年級的一元一次代數式合併運算。",
      current: "八年級升級至含有二次、三次甚至更高次方的一元多項式加減運算。",
      next: "下一節將學習多項式的乘法與直式長除法，推導除法原理 $A = B \\times Q + R$！"
    }
  });
})();
