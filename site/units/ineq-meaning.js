/* 單元：4-1 一元一次不等式及其解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "數線上的實心點與空心點");
    s("line", { x1: 20, y1: 70, x2: 380, y2: 70, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 200, y1: 70, x2: 370, y2: 70, stroke: C.orange.s, "stroke-width": 3.5 }, svg);
    s("circle", { cx: 200, cy: 70, r: 5.5, fill: C.orange.s }, svg);
    SK.label(svg, 200, 50, "x >= 3 (包含 3，實心圓點)", { size: 12, color: C.orange.s, bold: true });

    s("line", { x1: 20, y1: 150, x2: 380, y2: 150, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 200, y1: 150, x2: 40, y2: 150, stroke: C.blue.s, "stroke-width": 3.5 }, svg);
    s("circle", { cx: 200, cy: 150, r: 5.5, fill: "#fff", stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 200, 130, "x < 3 (不包含 3，空心圓點)", { size: 12, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "ineq-meaning",
    en: "Linear Inequalities in One Variable and Their Solutions",
    formula: "x > a,\\ x < a,\\ x \\ge a,\\ x \\le a",

    hook: {
      html: "生活中有許多限制門檻：遊樂園雲霄飛車「身高至少 130 公分」、電梯載重「不超過 800 公斤」、考試及格「60 分以上（含）」。這些描述不是唯一的數字，而是一整個<b>數值區間</b>，這就是<b>不等式</b>！",
      ask: "在數線上畫出不等式的範圍時，「實心點」與「空心點」到底有什麼決定性的差別？",
      visual: hookVisual
    },

    guess: {
      q: "「小傑身上的零用錢 $x$ 元，買了一本 150 元的漫畫後，剩下的錢不低於 80 元。」請問下列哪一個不等式能正確表示這個情境？",
      options: [
        { t: "x - 150 >= 80", truth: true, explain: "「剩下的錢」是 $x - 150$；「不低於」意思是「大於或等於（$\\ge$）」，所以式子為 $x - 150 \\ge 80$！" },
        { t: "x - 150 > 80", common: true, explain: "「不低於」包含剛好等於 80 元，必須有等號。" },
        { t: "x - 150 <= 80", explain: "「不低於」是不會比它少，不是小於等於。" },
        { t: "x + 150 >= 80", explain: "買漫畫是花錢扣除，式子應該是相減。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變門檻值 $a$ 與不等號符號，觀察數線上實心、空心與箭頭覆蓋的區域。",
      frames: [
        { cap: "五種不等號：$>$（大於）、$<$（小於）、$\\ge$（大於或等於 / 不小於 / 至少）、$\\le$（小於或等於 / 不大於 / 不超過）、$\\ne$（不等於）。", tex: ">,\\ <,\\ \\ge,\\ \\le,\\ \\ne" },
        { cap: "一元一次不等式：只含有一個未知數，且未知數的最高次數為 1 的不等式，例如 $2x - 5 \\ge 9$。", tex: "ax + b > 0\\quad (a\\ne 0)" },
        { cap: "不等式的解：能使不等式成立的數值。通常有<b>無限多個解</b>，在數線上表現為一整條射線或線段。", tex: "x \\ge 3 \\implies \\{3, 3.1, 4, 100, \\dots\\}" },
        { cap: "數線圖示規則：有等號（$\\ge, \\le$）畫<b>實心點</b>（包含該數）；無等號（$>, <$）畫<b>空心點</b>（不包含該數）。大於折向右，小於折向左。", tex: "\\ge, \\le \\to \\text{實心} \\bullet;\\quad >, < \\to \\text{空心} \\circ" }
      ],
      hint: "記住口訣：有等號實心點，無等號空心圓；大於往右跑，小於往左鑽！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "不等式圖示推導");
        var slA = SK.slider({ label: "門檻值 a", min: -3, max: 3, step: 1, value: 1, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slSign = SK.slider({ label: "符號 (0: >, 1: >=, 2: <, 3: <=)", min: 0, max: 3, step: 1, value: 1, color: "blue", fmt: function(v){ return [">", ">=", "<", "<="][v]; }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slSign.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, signIdx = slSign.value;
          var ox = 220, oy = 130, scale = 35;
          svg.innerHTML = "";
          // 數線
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          for (var t = -5; t <= 5; t++) {
            var px = ox + t * scale;
            s("line", { x1: px, y1: oy - 3, x2: px, y2: oy + 3, stroke: C.cocoa }, svg);
            SK.label(svg, px, oy + 20, String(t), { size: 12, color: t === a ? C.orange.s : C.soft, bold: t === a });
          }

          var targetX = ox + a * scale;
          var isRight = (signIdx === 0 || signIdx === 1);
          var hasEq = (signIdx === 1 || signIdx === 3);

          // 覆蓋線
          var endX = isRight ? 415 : 25;
          s("line", { x1: targetX, y1: oy, x2: endX, y2: oy, stroke: C.orange.s, "stroke-width": 4 }, svg);
          // 箭頭
          var arrPoly = isRight ? "420,130 410,125 410,135" : "20,130 30,125 30,135";
          s("polygon", { points: arrPoly, fill: C.orange.s }, svg);

          // 圓點
          if (hasEq) {
            s("circle", { cx: targetX, cy: oy, r: 6, fill: C.orange.s }, svg);
          } else {
            s("circle", { cx: targetX, cy: oy, r: 6, fill: "#fff", stroke: C.orange.s, "stroke-width": 2.5 }, svg);
          }

          var signSymbol = [">", "\\ge", "<", "\\le"][signIdx];
          var desc = hasEq ? "包含 " + a + "（實心）" : "不包含 " + a + "（空心）";
          read.innerHTML = SK.tex("x " + signSymbol + " " + a + "\\quad \\implies " + desc + "，\\text{射線朝}" + (isRight ? "右" : "左") + "\\text{方延伸}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "生活用語轉換不等式",
        code: "A-7-7",
        demo: {
          q: "將下列日常敘述轉譯為數學不等式：(1) $x$ 不滿 18 歲；(2) 體重 $w$ 至少 50 公斤。",
          steps: [
            "(1) 「不滿」代表未達到、小於且不含 18：記作 $x < 18$。",
            "(2) 「至少」代表 50 公斤以上（含 50）：記作 $w \\ge 50$。"
          ]
        },
        tries: [
          {
            q: "「停車費每小時 40 元，停了 $t$ 小時，總費用不超過 200 元」，列成不等式為？",
            options: ["40t <= 200", "40t < 200", "40t >= 200", "40t > 200"],
            ans: 0,
            explain: "「不超過」意思就是「小於或等於（$\\le$）」，所以是 $40t \\le 200$。"
          },
          {
            q: "下列哪一個數是不等式 $3x - 2 < 10$ 的解？",
            options: ["3", "4", "5", "6"],
            ans: 0,
            explain: "將選項代入檢驗：代入 $x=3$ 得 $3(3)-2 = 7 < 10$（成立！）；代入 $x=4$ 得 $10 < 10$（不成立，無等號）。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若數線上滿足 $-2 \\le x < 5$ 的所有整數 $x$ 共有多少個？",
        options: ["7 個", "8 個", "6 個", "9 個"],
        ans: 0,
        hint: "列舉符合條件的所有整數：注意左端包含、右端不包含。",
        explain: "符合條件的整數為 $-2, -1, 0, 1, 2, 3, 4$，總共有 $4 - (-2) + 1 = 7$ 個整數（不含 5）。"
      }
    ],

    angles: [
      { title: "工程容許誤差與公差", body: "工業製造螺絲與機械零件時，沒有任何機台能做到精準的 10.0000 公釐。圖紙上都會標示公差，例如直徑 $d$ 必須滿足 $9.98 \\le d \\le 10.02$ 公釐，超出此不等式區間的零件就是不良品！" },
      { title: "電腦程式中的條件判斷", body: "程式語言中最重要的 if-else 邏輯判斷，就是靠不等式（x >= 18、score < 60）來決定分支路線，控制整個系統的運作行為。" }
    ],

    where: {
      past: "七年級上學期學過方程式等式天平，解通常只有一個特定數字。",
      current: "認識不等式符號，理解解可以是一整個連續範圍，並在數線上可視化。",
      next: "下一節將學習解一元一次不等式的移項運算，揭開「乘除負數要轉向」的深層核心原因！"
    }
  });
})();
