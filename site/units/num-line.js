/* 單元：1-1 數與數線 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "數線上的正負數與距離");
    s("line", { x1: 20, y1: 100, x2: 380, y2: 100, class: "m-axis", "stroke-width": 2 }, svg);
    s("polygon", { points: "385,100 375,95 375,105", fill: C.cocoa }, svg);
    for (var x = -4; x <= 4; x++) {
      var px = 200 + x * 40;
      s("line", { x1: px, y1: 94, x2: px, y2: 106, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
      SK.label(svg, px, 126, String(x), { size: 14, color: x === 0 ? C.orange.s : C.soft, bold: x === 0 });
    }
    s("circle", { cx: 80, cy: 100, r: 6, fill: C.blue.s }, svg);
    SK.label(svg, 80, 72, "A (-3)", { size: 14, color: C.blue.s, bold: true });
    s("circle", { cx: 280, cy: 100, r: 6, fill: C.orange.s }, svg);
    SK.label(svg, 280, 72, "B (2)", { size: 14, color: C.orange.s, bold: true });
    SK.brace(svg, 80, 85, 280, 85, 12, C.green.s);
    SK.label(svg, 180, 52, "距離 = |(-3) - 2| = 5", { size: 13, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "num-line",
    en: "Numbers and the Number Line",
    formula: "|a-b|=\\text{數線上 }\\co{a}\\text{ 與 }\\cb{b}\\text{ 兩點的距離}",

    hook: {
      html: "生活中有許多具有「相對意義」的量：賺錢與賠錢、海平面之上與之下、向東走與向西走。以 0 為基準，我們用<b>正數（+）</b>與<b>負數（-）</b>來清楚記錄大小與方向。",
      ask: "數線上 $A(-3)$ 與 $B(2)$ 兩點之間，究竟相距幾格？",
      visual: hookVisual
    },

    guess: {
      q: "數線上點 $P(a)$ 與點 $Q(b)$ 的距離，下列哪一個式子永遠正確？",
      options: [
        { t: "$|a-b|$ 或 $|b-a|$", truth: true, explain: "距離一定是非負數（$\\ge 0$），兩數相減加上絕對值，不論哪一個數在右邊，算出來的距離都相同！" },
        { t: "$a-b$", common: true, explain: "若 $a<b$（即 $a$ 在左邊），$a-b$ 會算出負數，但幾何長度不能為負。" },
        { t: "$a+b$", explain: "兩數相加是代數和，並不是兩點在數線上的相隔長度。" },
        { t: "$|a|+|b|$", explain: "只有當 $a$ 與 $b$ 分居原點兩側時，$|a|+|b|$ 剛好等於距離；如果兩點在原點同側就會算錯。" }
      ]
    },

    derive: {
      intro: "拖動滑桿改變兩點坐標 $\\co{a}$ 與 $\\cb{b}$，觀察數線上兩點的相對位置與距離計算。",
      frames: [
        { cap: "數線三要素：<b>原點 $O(0)$</b>、<b>正向（箭頭向右）</b>與<b>單位長</b>。越往右的數越大，越往左的數越小。", tex: "\\text{原點 } O(0),\\quad \\text{正向 } \\to,\\quad \\text{單位長}" },
        { cap: "相反數：在數線上與原點距離相等的兩個數，符號相反、和為 0。$a$ 的相反數是 $-a$，$0$ 的相反數是 $0$。", tex: "a + (-a) = 0,\\quad |a| = |-a|" },
        { cap: "絕對值：點 $P(a)$ 到原點的距離，記作 $|a|$。除了 0 之外，任何數的絕對值都是正數。", tex: "|a|=\\begin{cases} a, & a\\ge 0 \\ -a, & a<0 \\end{cases}" },
        { cap: "兩點距離：數線上 $A(a)$ 與 $B(b)$ 的距離為 $|a-b|$。若大數減小數，則直接為 $\\text{右邊坐標} - \\text{左邊坐標}$。", tex: "\\overline{AB} = |a-b| = \\max(a,b) - \\min(a,b)" }
      ],
      hint: "拖動滑桿，觀察坐標減法加上絕對值後如何確保距離恆為正數。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "數線推導圖");
        var slA = SK.slider({ label: "點 A 坐標 $\\co{a}$", min: -5, max: 5, step: 1, value: -3, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "點 B 坐標 $\\cb{b}$", min: -5, max: 5, step: 1, value: 2, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var X = function (val) { return 220 + val * 35; };
          svg.innerHTML = "";
          s("line", { x1: 20, y1: 140, x2: 420, y2: 140, class: "m-axis", "stroke-width": 2 }, svg);
          s("polygon", { points: "425,140 415,135 415,145", fill: C.cocoa }, svg);
          for (var t = -5; t <= 5; t++) {
            var px = X(t);
            s("line", { x1: px, y1: 135, x2: px, y2: 145, stroke: C.cocoa, "stroke-width": 1.2 }, svg);
            SK.label(svg, px, 162, String(t), { size: 12, color: t === 0 ? C.orange.s : C.soft, bold: t === 0 });
          }
          var pa = X(a), pb = X(b);
          s("circle", { cx: pa, cy: 140, r: 6.5, fill: C.orange.s }, svg);
          SK.label(svg, pa, 115, "A (" + a + ")", { size: 14, color: C.orange.s, bold: true });
          s("circle", { cx: pb, cy: 140, r: 6.5, fill: C.blue.s }, svg);
          SK.label(svg, pb, 115, "B (" + b + ")", { size: 14, color: C.blue.s, bold: true });

          var dist = Math.abs(a - b);
          if (a !== b) {
            var minP = Math.min(pa, pb), maxP = Math.max(pa, pb);
            SK.brace(svg, minP, 100, maxP, 100, 10, C.green.s);
            SK.label(svg, (minP + maxP) / 2, 72, "距離 = " + dist, { size: 14, color: C.green.s, bold: true });
          }
          read.innerHTML = SK.tex("\\overline{AB} = |(" + a + ") - (" + b + ")| = |" + (a - b) + "| = " + dist, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求數線上兩點距離與中點坐標",
        code: "N-7-5",
        demo: {
          q: "數線上兩點坐標分別為 $A(-7)$ 與 $B(5)$，求 $\\overline{AB}$ 的距離及線段中點 $M$ 的坐標。",
          steps: [
            "距離公式：$\\overline{AB} = |(-7) - 5| = |-12| = 12$。",
            "中點坐標公式：$M = \\frac{(-7) + 5}{2} = \\frac{-2}{2} = -1$。",
            "驗算：$M(-1)$ 到 $A(-7)$ 距離為 $|(-1)-(-7)|=6$；$M(-1)$ 到 $B(5)$ 距離為 $|5-(-1)|=6$，兩邊等長。"
          ]
        },
        tries: [
          {
            q: "數線上點 $P$ 坐標為 $-9$，點 $Q$ 坐標為 $7$。求線段 $PQ$ 的長度。",
            hint: "大數減小數，或者用絕對值 $|(-9)-7|$ 計算。",
            ans: "長度為 $|7 - (-9)| = |16| = 16$。"
          },
          {
            q: "數線上點 $A(-4)$，若點 $B$ 與點 $A$ 的距離為 $9$，求點 $B$ 的可能坐標。",
            hint: "在點 $A$ 的右邊或左邊都有一個點，分別用加法與減法求出。",
            ans: "往右：$(-4) + 9 = 5$；往左：$(-4) - 9 = -13$。故點 $B$ 坐標為 $5$ 或 $-13$。"
          }
        ],
        edge: "兩點距離永遠為正數或 0，算式若寫成 $(-7)-5=-12$ 忘記加絕對值就是最常見的失分陷阱。"
      }
    ],

    angles: [
      {
        title: "正負號的兩種身份",
        icon: "sparkle",
        html: "數字前面的「$+$」與「$-$」有兩種意思：一種是<b>性質符號</b>（表示正數或負數，如 $-5$ 讀作「負五」）；另一種是<b>運算符號</b>（表示加法或減法運算，如 $8-5$ 讀作「八減五」）。當性質符號遇到運算符號時，通常會用小括號保護起來，例如 $3+(-5)$。"
      },
      {
        title: "距離的對稱性",
        icon: "leaf",
        html: "$|a-b|$ 與 $|b-a|$ 算出來的結果完全一樣，因為互為相反數的兩數擁有相同的絕對值，例如 $|-5|=|5|=5$。這代表「從你家走到學校」和「從學校走回家」，步數是完全相等的！"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "若 $|x|=7$，則整數 $x$ 的值為何？",
        hint: "數線上到原點距離為 7 的點有幾個？",
        idea: "到原點距離為 7 的點有一正一負，故 $x = 7$ 或 $x = -7$。"
      },
      {
        lv: "Explore",
        q: "若 $|x+3|=5$，求 $x$ 的值。",
        hint: "可以看成 $x$ 到 $-3$ 的距離等於 5，在數線上從 $-3$ 往右走 5 步與往左走 5 步。",
        idea: "$x+3 = 5$ 得 $x = 2$；或者 $x+3 = -5$ 得 $x = -8$。故 $x = 2$ 或 $-8$。"
      },
      {
        lv: "Wonder",
        q: "數線上三點 $A(-2)$、$B(3)$、$C(x)$，若 $\\overline{AC}+\\overline{BC}=5$，滿足條件的整數 $x$ 共有幾個？",
        hint: "先算算看 $\\overline{AB}$ 的距離是多少？點 $C$ 落在什麼區間時，到兩端的距離和剛好等於全長？",
        idea: "因為 $\\overline{AB}=|3-(-2)|=5$，當點 $C$ 落在線段 $AB$ 上（即 $-2\\le x\\le 3$）時，到兩端的距離和剛好為 5。整數解為 $-2, -1, 0, 1, 2, 3$，共有 6 個！"
      }
    ],

    where: {
      codes: [["N-7-3", "負數與數的四則運算：使用正負表徵生活中的量、相反數"], ["N-7-5", "數線：擴充至含負數的數線、比較數的大小、絕對值的意義與兩點距離"]],
      exam: "國中會考第一部分基礎題必定出現數線讀數、相反數、絕對值或兩點距離概念。",
      stop: "七年級數線教學以整數、有限小數與簡單分數為主；絕對值方程式以單一絕對值為原則，不引進高中多重分段討論。"
    }
  });
})();
