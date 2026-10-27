/* 單元：2-1 直角坐標平面 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "平面上的點與象限");
    s("line", { x1: 20, y1: 100, x2: 380, y2: 100, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 200, y1: 10, x2: 200, y2: 190, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    SK.label(svg, 370, 90, "x", { size: 14, color: C.soft });
    SK.label(svg, 215, 25, "y", { size: 14, color: C.soft });
    SK.label(svg, 290, 50, "第一象限 (+, +)", { size: 12, color: C.orange.s, bold: true });
    SK.label(svg, 110, 50, "第二象限 (-, +)", { size: 12, color: C.blue.s, bold: true });
    SK.label(svg, 110, 160, "第三象限 (-, -)", { size: 12, color: C.green.s, bold: true });
    SK.label(svg, 290, 160, "第四象限 (+, -)", { size: 12, color: C.plum.s, bold: true });
    s("circle", { cx: 280, cy: 50, r: 5, fill: C.orange.s }, svg);
    SK.label(svg, 280, 32, "P(3, 2)", { size: 12, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "cartesian-plane",
    en: "The Cartesian Coordinate Plane",
    formula: "P(x, y):\\ \\text{橫軸坐標 }x,\\ \\text{縱軸坐標 }y",

    hook: {
      html: "在電影院找座位時，我們需要「第幾排、第幾號」兩筆資訊才能精確定位。笛卡兒把兩條垂直相交的數線組合在一起，創造了<b>直角坐標系</b>，讓幾何圖形與代數坐標有了完美的對應！",
      ask: "點 $P(-3, 4)$ 位於第幾象限？到 $x$ 軸與 $y$ 軸的距離分別是多少？",
      visual: hookVisual
    },

    guess: {
      q: "坐標平面上一點 $P(a, b)$，已知 $ab < 0$ 且 $a - b > 0$，請問點 $P$ 位於第幾象限？",
      options: [
        { t: "第四象限", truth: true, explain: "因為 $ab < 0$，表示 $a$ 與 $b$ 異號（一正一負）；又 $a - b > 0 \\implies a > b$，所以必定 $a > 0$ 且 $b < 0$（正、負），落在第四象限！" },
        { t: "第二象限", common: true, explain: "若 $a < 0$ 且 $b > 0$，則 $a - b$ 會小於 0，與題意矛盾。" },
        { t: "第一象限", explain: "第一象限點 $(+, +)$ 其 $ab > 0$，不符合條件。" },
        { t: "第三象限", explain: "第三象限點 $(-, -)$ 其 $ab > 0$，也不符合條件。" }
      ]
    },

    derive: {
      intro: "滑動滑桿改變點 $P$ 的坐標 $(x, y)$，觀察點所在的象限以及它到兩坐標軸的垂直距離。",
      frames: [
        { cap: "兩軸與原點：水平為 $x$ 軸（橫軸），鉛直為 $y$ 軸（縱軸），交點為原點 $O(0, 0)$。", tex: "O(0, 0),\\quad x\\text{ 軸: }y=0,\\quad y\\text{ 軸: }x=0" },
        { cap: "四個象限：坐標軸將平面分為四區，逆時針依序為 I $(+,+)$、II $(-,+)$、III $(-,-)$、IV $(+,-)$。軸上的點不屬於任何象限。", tex: "\\text{I}(+,+),\\quad \\text{II}(-,+),\\quad \\text{III}(-,-),\\quad \\text{IV}(+,-)" },
        { cap: "點到軸的距離：點 $P(x, y)$ 到 $x$ 軸的距離為 $|y|$；到 $y$ 軸的距離為 $|x|$。", tex: "\\text{到 }x\\text{ 軸距離}=|y|,\\quad \\text{到 }y\\text{ 軸距離}=|x|" },
        { cap: "對稱點規律：關於 $x$ 軸對稱變 $(x, -y)$；關於 $y$ 軸對稱變 $(-x, y)$；關於原點對稱變 $(-x, -y)$。", tex: "(x, y)\\xrightarrow{x\\text{軸}}(x, -y),\\quad (x, y)\\xrightarrow{\\text{原點}}(-x, -y)" }
      ],
      hint: "特別注意：點到 $x$ 軸的距離看 $y$ 坐標的絕對值，到 $y$ 軸距離看 $x$ 坐標的絕對值，千萬別看反了！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "直角坐標推導動態圖");
        var slX = SK.slider({ label: "x 坐標", min: -5, max: 5, step: 1, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slY = SK.slider({ label: "y 坐標", min: -4, max: 4, step: 1, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        ctx.sliders.appendChild(slY.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value, y = slY.value;
          var ox = 220, oy = 130, scale = 25;
          svg.innerHTML = "";
          // 坐標軸
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: 15, x2: ox, y2: 245, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          // 格線刻度
          for (var i = -8; i <= 8; i++) {
            if (i !== 0 && Math.abs(i) <= 5) {
              s("line", { x1: ox + i * scale, y1: oy - 3, x2: ox + i * scale, y2: oy + 3, stroke: C.cocoa }, svg);
            }
          }
          var px = ox + x * scale, py = oy - y * scale;
          // 垂直垂足線
          s("line", { x1: px, y1: oy, x2: px, y2: py, stroke: C.blue.s, "stroke-dasharray": "3,3", "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: py, x2: px, y2: py, stroke: C.orange.s, "stroke-dasharray": "3,3", "stroke-width": 1.5 }, svg);
          s("circle", { cx: px, cy: py, r: 6, fill: C.red.s }, svg);
          SK.label(svg, px + (x >= 0 ? 15 : -15), py - 10, "P(" + x + ", " + y + ")", { size: 14, color: C.red.s, bold: true });

          var quad = "";
          if (x > 0 && y > 0) quad = "第一象限";
          else if (x < 0 && y > 0) quad = "第二象限";
          else if (x < 0 && y < 0) quad = "第三象限";
          else if (x > 0 && y < 0) quad = "第四象限";
          else if (x === 0 && y === 0) quad = "原點";
          else if (x === 0) quad = "y 軸上";
          else quad = "x 軸上";

          read.innerHTML = SK.tex("P(" + x + ", " + y + ")\\text{ 位於【" + quad + "】}，\\text{到 }x\\text{ 軸距離}=|" + y + "|=" + Math.abs(y) + "，\\text{到 }y\\text{ 軸距離}=|" + x + "|=" + Math.abs(x), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "判斷象限與到軸距離",
        code: "G-7-1",
        demo: {
          q: "已知點 $A(-4, 3)$，求點 $A$ 位於第幾象限？到 $x$ 軸與 $y$ 軸的距離各是多少？",
          steps: [
            "看符號：橫坐標為負（$-4 < 0$），縱坐標為正（$3 > 0$），落在第二象限（-, +）。",
            "到 $x$ 軸距離：取縱坐標絕對值 $|3| = 3$。",
            "到 $y$ 軸距離：取橫坐標絕對值 $|-4| = 4$。"
          ]
        },
        tries: [
          {
            q: "坐標平面上一點 $Q(5, -8)$ 到 $x$ 軸的垂直距離為多少？",
            options: ["8", "-8", "5", "13"],
            ans: 0,
            explain: "點 $(x, y)$ 到 $x$ 軸的距離為 $|y|$。因此距離為 $|-8| = 8$（長度必為正數）。"
          },
          {
            q: "若點 $M(a, b)$ 在第二象限，則點 $N(b, -a)$ 會落在第幾象限？",
            options: ["第一象限", "第二象限", "第三象限", "第四象限"],
            ans: 0,
            explain: "因為 $M(a, b)$ 在第二象限，所以 $a < 0$ 且 $b > 0$。對點 $N(b, -a)$ 而言：橫坐標 $b > 0$，縱坐標 $-a > 0$（負負得正），因此落在第一象限 $(+, +)$！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若點 $A(2a-4, a+3)$ 在 $y$ 軸上，則點 $A$ 到 $x$ 軸的距離是多少？",
        options: ["5", "2", "3", "4"],
        ans: 0,
        hint: "在 $y$ 軸上的點，橫坐標必定為 0，先解出 $a$。",
        explain: "在 $y$ 軸上代表橫坐標 $2a - 4 = 0 \\implies a = 2$。將 $a = 2$ 代入縱坐標得 $a + 3 = 5$。點 $A$ 坐標為 $(0, 5)$，到 $x$ 軸的距離就是 $|5| = 5$。"
      }
    ],

    angles: [
      { title: "笛卡兒的天花板蜘蛛傳說", body: "相傳法國哲學家笛卡兒臥病在床時，望著天花板上爬行的蜘蛛，發現只要以兩面交界的牆角為基準，記錄蜘蛛離兩邊牆面的距離，就能隨時鎖定蜘蛛的位置，這正是直角坐標系的誕生靈感！" },
      { title: "GPS 與經緯度系統", body: "地球上的經度與緯度就是一種球面坐標系。赤道相當於 $x$ 軸，本初子午線相當於 $y$ 軸，任何一個位置都能用經緯度（東經/西經、北緯/南緯）精確表示。" }
    ],

    where: {
      past: "從七年級上學期的一維「數線」出發，只能向左或向右走。",
      current: "將兩條垂直數線結合成「二維坐標平面」，能自由描述平面上任意點的位置。",
      next: "接下來將二元一次方程式的所有解描在坐標平面上，會驚喜地連成一條直線！"
    }
  });
})();
