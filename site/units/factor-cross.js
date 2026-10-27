/* 單元：3-2 十字交乘法因式分解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "十字交叉湊一次項");
    // 左邊兩項
    SK.label(svg, 120, 60, "x", { size: 18, color: C.orange.s, bold: true });
    SK.label(svg, 120, 140, "x", { size: 18, color: C.orange.s, bold: true });
    // 右邊兩項
    SK.label(svg, 220, 60, "+2", { size: 18, color: C.blue.s, bold: true });
    SK.label(svg, 220, 140, "+3", { size: 18, color: C.blue.s, bold: true });
    // 交叉線
    s("line", { x1: 135, y1: 65, x2: 205, y2: 135, stroke: C.red.s, "stroke-width": 2 }, svg);
    s("line", { x1: 135, y1: 135, x2: 205, y2: 65, stroke: C.red.s, "stroke-width": 2 }, svg);
    // 右側說明
    SK.label(svg, 310, 80, "3x + 2x = 5x", { size: 15, color: C.red.s, bold: true });
    SK.label(svg, 310, 120, "x^2 + 5x + 6", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 310, 145, "= (x+2)(x+3)", { size: 15, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "factor-cross",
    en: "Factoring by Cross-Multiplication",
    formula: "x^2 + (p+q)x + pq = (x+p)(x+q)",

    hook: {
      html: "當面對一個二次三項式如 $x^2 + 5x + 6$，它沒有公因式可提，也不是完全平方式，這時候該怎麼辦？數學家發明了名震天下的<b>十字交乘法</b>：拆開頭、拆開尾、交叉相乘相加，湊出正中間的一次項！",
      ask: "拆尾巴時，如果常數項是「正數」，拆開的兩個數正負號必須如何？如果是「負數」呢？",
      visual: hookVisual
    },

    guess: {
      q: "利用十字交乘法因式分解 $x^2 - 7x + 12$，其分解結果為何？",
      options: [
        { t: "(x - 3)(x - 4)", truth: true, explain: "常數項 $+12 = (-3) \\times (-4)$，交叉相乘 $(-3x) + (-4x) = -7x$ 恰好符合中間項！" },
        { t: "(x - 2)(x - 6)", common: true, explain: "雖然 $(-2) \\times (-6) = 12$，但相加是 $-8x$，不符合中間的 $-7x$。" },
        { t: "(x + 3)(x + 4)", explain: "相加為 $+7x$，中間符號相反。" },
        { t: "(x - 1)(x - 12)", explain: "相加為 $-13x$，不符合。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整常數 $p$ 與 $q$，直觀看見十字交叉相乘如何湊出中間項係數 $(p+q)$。",
      frames: [
        { cap: "展開原理回顧：$(x+p)(x+q) = x^2 + (p+q)x + pq$。中間一次項係數是兩數之和，常數項是兩數之積。", tex: "(x+p)(x+q) = x^2 + (p+q)x + pq" },
        { cap: "首項係數為 1 的判別：尋找兩整數 $p, q$，使 $p \\cdot q = c$ 且 $p + q = b$。常數為正同號、常數為負異號！", tex: "pq=c,\\ p+q=b" },
        { cap: "首項係數不為 1 的進階：若二次項係數為 $a$（如 $2x^2 + 7x + 3$），首項需拆為 $a_1 \\times a_2$，尾項拆為 $c_1 \\times c_2$ 交互試湊。", tex: "(a_1 x + c_1)(a_2 x + c_2)" },
        { cap: "橫寫成因式：十字交乘成功後，由上到下<b>橫著讀取</b>寫入括號！", tex: "\\begin{array}{c} a_1 x \\quad c_1 \\ a_2 x \\quad c_2 \\end{array} \\implies (a_1 x + c_1)(a_2 x + c_2)" }
      ],
      hint: "試湊小秘訣：先看尾巴常數項的所有整數分解配對，再看中間項正負號決定分配！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "十字交乘動態試湊圖");
        var slP = SK.slider({ label: "常數 p", min: -5, max: 5, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slQ = SK.slider({ label: "常數 q", min: -5, max: 5, step: 1, value: 3, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slP.el);
        ctx.sliders.appendChild(slQ.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var p = slP.value, q = slQ.value;
          var sum = p + q, prod = p * q;
          svg.innerHTML = "";
          // 十字骨架
          SK.label(svg, 120, 60, "x", { size: 20, color: C.orange.s, bold: true });
          SK.label(svg, 120, 150, "x", { size: 20, color: C.orange.s, bold: true });
          SK.label(svg, 220, 60, (p >= 0 ? "+" : "") + p, { size: 20, color: C.blue.s, bold: true });
          SK.label(svg, 220, 150, (q >= 0 ? "+" : "") + q, { size: 20, color: C.blue.s, bold: true });

          s("line", { x1: 135, y1: 70, x2: 205, y2: 140, stroke: C.red.s, "stroke-width": 2 }, svg);
          s("line", { x1: 135, y1: 140, x2: 205, y2: 70, stroke: C.red.s, "stroke-width": 2 }, svg);

          SK.label(svg, 320, 85, "和: (" + p + ") + (" + q + ") = " + sum, { size: 14, color: C.red.s, bold: true });
          SK.label(svg, 320, 125, "積: (" + p + ") × (" + q + ") = " + prod, { size: 14, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("x^2 " + (sum>=0?"+ ":"") + sum + "x " + (prod>=0?"+ ":"") + prod + " = (x " + (p>=0?"+ ":"") + p + ")(x " + (q>=0?"+ ":"") + q + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "十字交乘法求解二次三項式",
        code: "A-8-5",
        demo: {
          q: "因式分解下列各式：(1) $x^2 - 2x - 15$；(2) $3x^2 + 10x + 3$。",
          steps: [
            "(1) 拆尾項 $-15$：使兩數之和為 $-2$。選用 $-5$ 與 $+3$（$(-5) + 3 = -2$）。",
            "得到：$x^2 - 2x - 15 = (x - 5)(x + 3)$。",
            "(2) 拆首項 $3x^2 = x \\times 3x$；拆尾項 $3 = 1 \\times 3$。",
            "交叉相乘：$(x \\times 1) + (3x \\times 3) = x + 9x = 10x$ 恰合中間項！",
            "橫寫得：$(3x + 1)(x + 3)$。"
          ]
        },
        tries: [
          {
            q: "因式分解 $2x^2 - 5x - 3$ 的結果為何？",
            options: ["(2x + 1)(x - 3)", "(2x - 1)(x + 3)", "(2x - 3)(x + 1)", "(2x + 3)(x - 1)"],
            ans: 0,
            explain: "首項拆 $2x$ 與 $x$；尾項拆 $+1$ 與 $-3$。交叉相乘：$2x(-3) + x(1) = -6x + x = -5x$。橫讀得 $(2x + 1)(x - 3)$。"
          },
          {
            q: "若二次式 $x^2 + ax - 24$ 可被因式分解為 $(x - 3)(x + b)$，則 $a + b$ 的值是多少？",
            options: ["13", "5", "8", "-5"],
            ans: 0,
            explain: "比較常數項：$(-3) \\times b = -24 \\implies b = 8$。比較一次項：$a = (-3) + b = -3 + 8 = 5$。因此 $a + b = 5 + 8 = 13$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若 $x^2 + mx - 18$ 可利用十字交乘法分解為兩個一次整係數因式的乘積，其中 $m$ 為正整數，則 $m$ 的「最大可能值」是多少？",
        options: ["17", "7", "3", "18"],
        ans: 0,
        hint: "將 $-18$ 拆為一正一負兩數之積，兩數相差越大，$m$ 越大。",
        explain: "將 $-18$ 拆為 $p \\cdot q$ 且 $p + q = m > 0$。可能配對為：$18 \\times (-1) \\implies m = 17$；$9 \\times (-2) \\implies m = 7$；$6 \\times (-3) \\implies m = 3$。因此 $m$ 的最大可能值為 $17$。"
      }
    ],

    angles: [
      { title: "韋達定理的二度亮相", body: "十六世紀法國數學家韋達發現的「兩根之和為 $-b/a$、兩根之積為 $c/a$」，本質上就是十字交乘法展開後的對照係數規律，貫穿了整個高中高等代數學！" },
      { title: "為什麼電腦不用十字交乘法？", body: "人類大腦擅長小數字直覺試湊，但對程式而言「試湊」效率低。電腦解一元二次方程時，一律直接套用無腦通殺的「公式解」，這就是人腦直覺與機器算法的有趣對比。" }
    ],

    where: {
      past: "上一節學會提公因式與公式法因式分解。",
      current: "八年級掌握十字交乘法，成為攻克二次多項式分解的關鍵主力技巧。",
      next: "下一節將把因式分解運用到「解一元二次方程式」：$A \\cdot B = 0 \\implies A=0$ 或 $B=0$！"
    }
  });
})();
