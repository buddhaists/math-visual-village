/* 單元：3-2 基本尺規作圖 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "中垂線尺規作圖雙弧交點");
    s("line", { x1: 80, y1: 100, x2: 260, y2: 100, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("circle", { cx: 80, cy: 100, r: 4, fill: C.blue.s }, svg);
    SK.label(svg, 70, 120, "A", { size: 14, color: C.blue.s, bold: true });
    s("circle", { cx: 260, cy: 100, r: 4, fill: C.blue.s }, svg);
    SK.label(svg, 270, 120, "B", { size: 14, color: C.blue.s, bold: true });

    // 上下雙弧交點
    s("path", { d: "M 150 40 Q 170 50 190 40", stroke: C.orange.s, fill: "none", "stroke-width": 1.5 }, svg);
    s("path", { d: "M 150 160 Q 170 150 190 160", stroke: C.orange.s, fill: "none", "stroke-width": 1.5 }, svg);
    s("line", { x1: 170, y1: 30, x2: 170, y2: 170, stroke: C.red.s, "stroke-width": 2, "stroke-dasharray": "4,4" }, svg);
    SK.label(svg, 170, 20, "中垂線 L", { size: 13, color: C.red.s, bold: true });
    SK.label(svg, 330, 100, "PA = PB", { size: 14, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "compass-draw",
    en: "Basic Ruler-and-Compass Constructions",
    formula: "\\text{中垂線性質：點 } P \\text{ 在中垂線上} \\iff \\overline{PA} = \\overline{PB} \\quad (\\text{到兩端點等距離})",

    hook: {
      html: "古希臘幾何的終極浪漫：<b>不使用任何刻度尺、不使用量角器</b>，僅憑一把沒有刻度的「直尺」（用來畫直線）與一支「圓規」（用來畫圓與等長線段），就能精確無誤地複製角度、找到線段正中心，甚至做出完美的垂直線與角平分線！",
      ask: "作線段中垂線時，為什麼圓規張開的半徑必須「大於線段長度的一半」？若小於一半會發生什麼事？",
      visual: hookVisual
    },

    guess: {
      q: "想用尺規作圖將一個任意角 $\\angle A$ 精確分成 $4$ 等分，最少需要執行幾次「角平分線作圖」？",
      options: [
        { t: "3 次", truth: true, explain: "第一次作角平分線分成 2 等份；對這兩個半角各自再作一次角平分線（共作 2 次），總共 $1 + 2 = 3$ 次，就能分成 4 等份！" },
        { t: "4 次", common: true, explain: "誤以為分成幾等份就要作幾次。" },
        { t: "2 次", explain: "2 次只能分出其中一部分，無法將整個角平分成 4 等份。" },
        { t: "1 次", explain: "一次只能二等分。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變線段與角度大小，親眼見證四大基本尺規作圖的圓弧交會軌跡。",
      frames: [
        { cap: "作等長線段與等角：圓規量取長度截取，利用全等三角形 SSS 性質複製相同的開口角度。", tex: "\\text{複製等長線段、等角}" },
        { cap: "垂直平分線（中垂線）作圖：分別以兩端點為圓心，以<b>大於 $\\frac{1}{2}\\overline{AB}$</b> 的相同半徑畫弧交於兩點，連線即為中垂線！", tex: "\\text{半徑 } r > \\frac{1}{2}\\overline{AB}" },
        { cap: "中垂線性質定理：中垂線上任意一點，到線段兩端點的距離等長；反之到兩端等距的點必在中垂線上！", tex: "P\\text{ 在中垂線上} \\iff \\overline{PA} = \\overline{PB}" },
        { cap: "角平分線作圖與性質：角平分線上任意一點，到角的兩邊垂直距離等長！", tex: "P\\text{ 在角平分線上} \\iff d(P, L_1) = d(P, L_2)" }
      ],
      hint: "尺規作圖核心定理雙璧：中垂線「到兩端等距」，角平分線「到兩邊等距」！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "中垂線尺規作圖幾何模擬");
        var slLen = SK.slider({ label: "線段長度 L", min: 80, max: 200, step: 20, value: 140, color: "orange", fmt: function(v){ return v + " px"; }, onInput: draw });
        ctx.sliders.appendChild(slLen.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var L = slLen.value;
          var ox = 220, oy = 130;
          var ax = ox - L / 2, bx = ox + L / 2;
          svg.innerHTML = "";
          // 線段 AB
          s("line", { x1: ax, y1: oy, x2: bx, y2: oy, stroke: C.cocoa, "stroke-width": 2.5 }, svg);
          s("circle", { cx: ax, cy: oy, r: 5, fill: C.blue.s }, svg);
          SK.label(svg, ax - 15, oy + 5, "A", { size: 14, color: C.blue.s, bold: true });
          s("circle", { cx: bx, cy: oy, r: 5, fill: C.blue.s }, svg);
          SK.label(svg, bx + 15, oy + 5, "B", { size: 14, color: C.blue.s, bold: true });

          // 中垂線
          s("line", { x1: ox, y1: 30, x2: ox, y2: 230, stroke: C.red.s, "stroke-width": 2, "stroke-dasharray": "4,4" }, svg);
          SK.label(svg, ox + 15, 45, "中垂線 L", { size: 12, color: C.red.s, bold: true });

          // 標記直角
          s("rect", { x: ox, y: oy - 12, width: 12, height: 12, fill: "none", stroke: C.cocoa }, svg);

          read.innerHTML = SK.tex("\\overline{AB} = " + L + "，\\text{中點坐標恰好平分兩側長度 }\\frac{L}{2} = " + (L/2) + "，\\text{線上任一點 }P\\text{ 恆有 }\\overline{PA}=\\overline{PB}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "尺規作圖作圖次數與特殊角",
        code: "S-8-12",
        demo: {
          q: "下列哪一個角度「無法」單純利用尺規作圖（作垂線與角平分線）精確作出？",
          steps: [
            "分析可作出的基本角：平角 180° $\\to$ 作垂線得 90° $\\to$ 角平分線得 45°、22.5°。",
            "正三角形作圖得 60° $\\to$ 角平分線得 30°、15°、7.5°。",
            "組合角度：$60^\\circ + 45^\\circ = 105^\\circ$、$90^\\circ - 15^\\circ = 75^\\circ$ 皆可作出。",
            "但任意角三等分（如 20°、40°）已被證明不可能只用尺規作出。"
          ]
        },
        tries: [
          {
            q: "下列哪一個角度「可以」僅用尺規作圖精確作出？",
            options: ["75 度", "20 度", "50 度", "40 度"],
            ans: 0,
            explain: "作正三角形得 60°，再作角平分線的半角 15°，兩角相加 $60^\\circ + 15^\\circ = 75^\\circ$（或 $90^\\circ - 15^\\circ = 75^\\circ$）可精準作出！"
          },
          {
            q: "作線段 $\\overline{AB}$ 的中垂線時，若圓規張開的半徑小於 $\\frac{1}{2}\\overline{AB}$，會造成什麼結果？",
            options: [
              "兩圓弧在中間無法相交，作圖失敗",
              "畫出的直線不是垂直線",
              "作出來的直線不會通過中點",
              "沒有任何影響"
            ],
            ans: 0,
            explain: "若半徑小於一半，兩圓半徑之和小於圓心距，兩弧在空間中互相搆不到、沒有任何交點，因此無法連線。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知線段 $\\overline{AB}$ 長 16 公分，欲在其上利用尺規作圖找出一點 $C$，使 $\\overline{AC} : \\overline{CB} = 5 : 3$。最少需要作幾次「垂直平分線作圖」？",
        options: ["3 次", "4 次", "5 次", "2 次"],
        ans: 0,
        hint: "$5 : 3$ 代表總共分成 $5 + 3 = 8$ 等份，每等份長 2 公分。",
        explain: "將線段等分成 8 等份（$2^3$ 等份）：第一次中垂線分成 2 等份；對兩半段各作一次中垂線分成 4 等份（累計 3 次作圖）；最後在需要處再作一次中垂線二等分，總共最少需要 3 次二分中垂線作圖即可找到 8 等分點！"
      }
    ],

    angles: [
      { title: "古希臘三大幾何不能作圖難題", body: "兩千年來無數數學家為之瘋狂的「三大尺規作圖難題」：(1) 三等分任意角；(2) 倍立方（造出體積雙倍的立方體）；(3) 化圓為方（作面積等於圓的正方形）。十九世紀利用代數伽羅瓦理論終於證實：僅靠尺規這三題絕對不可能做到！" },
      { title: "幾何原本的公理化起點", body: "歐幾里得《幾何原本》前三條公設就是尺規作圖的數學抽象：過兩點可連成直線、線段可任意延長、可以任意點為圓心任意長為半徑作圓，構成了整座現代幾何學大廈的基石。" }
    ],

    where: {
      past: "七年級線對稱圖形的摺紙中垂線體驗。",
      current: "八年級掌握歐幾里得純粹尺規作圖（中垂線、角平分線、等角）。",
      next: "下一節將用尺規作圖揭開判定三角形形狀的五大鐵律——「三角形全等」！"
    }
  });
})();
