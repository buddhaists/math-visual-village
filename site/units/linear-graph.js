/* 單元：2-2 二元一次方程式的圖形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "點連成直線");
    s("line", { x1: 20, y1: 100, x2: 380, y2: 100, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 200, y1: 20, x2: 200, y2: 180, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 80, y1: 160, x2: 320, y2: 40, stroke: C.orange.s, "stroke-width": 3 }, svg);
    s("circle", { cx: 140, cy: 130, r: 4.5, fill: C.blue.s }, svg);
    s("circle", { cx: 200, cy: 100, r: 4.5, fill: C.blue.s }, svg);
    s("circle", { cx: 260, cy: 70, r: 4.5, fill: C.blue.s }, svg);
    SK.label(svg, 290, 45, "y = 0.5x", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 200, 190, "兩點即可決定一條直線", { size: 12, color: C.ink });
  }

  SK.mountUnit({
    slug: "linear-graph",
    en: "Graphs of Linear Equations in Two Variables",
    formula: "ax + by = c\\ \\text{的圖形是一條直線}",

    hook: {
      html: "一個二元一次方程式有無限多組解，如果我們把每一組解 $(x, y)$ 當成坐標平面上的一個點點出來，這無數個密集的小點最後會連成什麼奇妙的圖形？答案是一條筆直的<b>直線</b>！",
      ask: "要畫出二元一次方程式的直線圖形，最少需要找出幾個解？",
      visual: hookVisual
    },

    guess: {
      q: "二元一次方程式 $2x - 3y = 6$ 的圖形不通過第幾象限？",
      options: [
        { t: "第二象限", truth: true, explain: "找兩軸交點：令 $x=0 \\implies y=-2$，過 $(0, -2)$；令 $y=0 \\implies x=3$，過 $(3, 0)$。連線穿過第一、三、四象限，唯獨不通過第二象限！" },
        { t: "第一象限", explain: "當 $x=6, y=2$ 時落在第一象限，直線有通過第一象限。" },
        { t: "第三象限", explain: "當 $x=-3, y=-4$ 時落在第三象限，直線有通過第三象限。" },
        { t: "第四象限", common: true, explain: "兩軸交點之一 $(0, -2)$ 就在第四象限邊緣，往右下延伸會穿過第四象限。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變二元一次方程式 $ax + by = c$ 的係數，觀察直線的傾斜、截距與兩軸交點變化。",
      frames: [
        { cap: "兩點決定一直線：國中幾何公理指出，相異兩點恰可決定一條唯一的直線。因此畫圖只要找 2 組解即可。", tex: "\\text{取兩軸交點：}(k, 0)\\text{ 與 }(0, m)" },
        { cap: "水平線與鉛直線：當 $a=0$ 時得 $y=k$（水平線，平行 $x$ 軸）；當 $b=0$ 時得 $x=h$（鉛直線，平行 $y$ 軸）。", tex: "x=h\\parallel y\\text{軸},\\quad y=k\\parallel x\\text{軸}" },
        { cap: "過原點直線：常數項 $c=0$ 時，方程式 $ax+by=0$ 必定通過原點 $(0, 0)$。", tex: "ax+by=0 \\implies (0, 0)\\text{ 在直線上}" },
        { cap: "聯立方程與交點：二元一次聯立方程式的「唯一解」，幾何意義就是兩條直線的「唯一交點坐標」。", tex: "\\begin{cases}L_1\\\\L_2\\end{cases}\\text{ 的代數解}=\\text{交點坐標}" }
      ],
      hint: "最快捷的作圖法就是「求兩軸截距」：分別令 $x=0$ 求 $y$，令 $y=0$ 求 $x$！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "直線圖形推導");
        var slA = SK.slider({ label: "係數 a (x 項)", min: -3, max: 3, step: 1, value: 1, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slC = SK.slider({ label: "常數項 c", min: -4, max: 4, step: 1, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, c = slC.value;
          // 方程式 y = ax + c
          var ox = 220, oy = 130, scale = 25;
          svg.innerHTML = "";
          // 軸
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: 15, x2: ox, y2: 245, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 畫 y = a*x + c
          var x1 = -7, y1 = a * x1 + c;
          var x2 = 7, y2 = a * x2 + c;
          var px1 = ox + x1 * scale, py1 = oy - y1 * scale;
          var px2 = ox + x2 * scale, py2 = oy - y2 * scale;
          s("line", { x1: px1, y1: py1, x2: px2, y2: py2, stroke: C.orange.s, "stroke-width": 3 }, svg);

          // 標示 (0, c)
          var pyC = oy - c * scale;
          s("circle", { cx: ox, cy: pyC, r: 5, fill: C.blue.s }, svg);
          SK.label(svg, ox + 15, pyC - 5, "(0, " + c + ")", { size: 12, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("L:\\ y = " + (a === 1 ? "" : a === -1 ? "-" : a) + "x " + (c >= 0 ? "+ " + c : "- " + Math.abs(c)) + "，\\text{斜率為 }" + a + "，y\\text{ 截距為 }(0, " + c + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求兩軸交點與所圍三角形面積",
        code: "G-7-1",
        demo: {
          q: "求直線 $3x + 4y = 12$ 與兩坐標軸的交點坐標，以及此直線與兩軸所圍成的三角形面積。",
          steps: [
            "令 $y = 0 \\implies 3x = 12 \\implies x = 4$，與 $x$ 軸交於 $A(4, 0)$。",
            "令 $x = 0 \\implies 4y = 12 \\implies y = 3$，與 $y$ 軸交於 $B(0, 3)$。",
            "所圍成的三角形為直角三角形，兩股長分別為 $|4| = 4$ 與 $|3| = 3$。",
            "面積 $= \\frac{1}{2} \\times 4 \\times 3 = 6$ 平方單位。"
          ]
        },
        tries: [
          {
            q: "直線 $2x - 5y = 10$ 與兩坐標軸所圍成的直角三角形面積為多少？",
            options: ["5", "10", "20", "2.5"],
            ans: 0,
            explain: "令 $y=0 \\implies x=5$，與 $x$ 軸交於 $(5, 0)$，底為 5；令 $x=0 \\implies y=-2$，與 $y$ 軸交於 $(0, -2)$，高為 $|-2|=2$。面積 $= \\frac{1}{2} \\times 5 \\times 2 = 5$。"
          },
          {
            q: "已知直線方程式為 $x = -3$，則下列關於此圖形的敘述何者正確？",
            options: [
              "是一條平行 y 軸的鉛直線",
              "是一條平行 x 軸的水平線",
              "通過原點 (0, 0)",
              "通過點 (3, -3)"
            ],
            ans: 0,
            explain: "$x = -3$ 上所有點的橫坐標皆為 $-3$（縱坐標可為任意實數），這是一條垂直 $x$ 軸且平行 $y$ 軸的鉛直線。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若兩直線 $L_1: 2x - y = 4$ 與 $L_2: ax + 2y = 8$ 的交點落在 $x$ 軸上，則常數 $a$ 的值是多少？",
        options: ["4", "2", "-2", "8"],
        ans: 0,
        hint: "交點在 $x$ 軸上代表其 $y$ 坐標為 0，先代入第一條求出交點坐標。",
        explain: "因為交點在 $x$ 軸上，令 $y = 0$ 代入 $L_1$：$2x - 0 = 4 \\implies x = 2$，交點坐標為 $(2, 0)$。將 $(2, 0)$ 代入 $L_2$：$a(2) + 2(0) = 8 \\implies 2a = 8 \\implies a = 4$。"
      }
    ],

    angles: [
      { title: "電腦繪圖中的光柵化與線段演算法", body: "螢幕上顯示的線條其實是由無數像素方格拼成的。電腦圖學中最著名的 Bresenham 畫線演算法，就是利用二元一次方程式的斜率，逐格判斷下一個像素該點在哪裡，既快速又精準！" },
      { title: "二元一次聯立方程式的三種幾何關係", body: "兩條直線如果恰交於一點，聯立方程式恰有一組解；如果兩線平行且不重合，聯立方程式無解；如果兩線完全重合，聯立方程式有無限多組解！" }
    ],

    where: {
      past: "在上一節學會代數求解二元一次聯立方程式。",
      current: "將方程式化為幾何直線，明白解就是兩條直線的交點坐標。",
      next: "八年級將進一步將直線延伸為「一次函數」$y=ax+b$，研究輸入與輸出的動態變化。"
    }
  });
})();
