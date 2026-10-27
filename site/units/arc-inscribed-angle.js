/* 單元：2-2 弧與圓周角 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "圓周角等於同弧圓心角之一半");
    // 圓 O
    s("circle", { cx: 200, cy: 110, r: 65, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("circle", { cx: 200, cy: 110, r: 3, fill: C.ink }, svg);
    SK.label(svg, 200, 125, "O", { size: 12, color: C.ink });

    // 底弧 AB
    var pA = [150, 155], pB = [250, 155];
    s("line", { x1: 200, y1: 110, x2: pA[0], y2: pA[1], stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("line", { x1: 200, y1: 110, x2: pB[0], y2: pB[1], stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 200, 95, "圓心角 80°", { size: 12, color: C.orange.s, bold: true });

    // 圓周頂點 P
    var pP = [170, 48];
    s("line", { x1: pP[0], y1: pP[1], x2: pA[0], y2: pA[1], stroke: C.blue.s, "stroke-width": 1.8 }, svg);
    s("line", { x1: pP[0], y1: pP[1], x2: pB[0], y2: pB[1], stroke: C.blue.s, "stroke-width": 1.8 }, svg);
    SK.label(svg, pP[0], pP[1] - 8, "圓周角 40°", { size: 12, color: C.blue.s, bold: true });
    SK.label(svg, 200, 195, "同弧所對圓周角 = 圓心角的一半", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "arc-inscribed-angle",
    en: "Arcs and Inscribed Angles",
    formula: "\\text{圓周角} = \\frac{1}{2}\\text{圓心角} = \\frac{1}{2}\\text{所對弧度數}",

    hook: {
      html: "站在劇院舞台的觀眾席，前排中央看到的視角最開闊（圓心角）；如果退到最後排牆邊的任意一個座位（圓周角），你會驚喜地發現：不論你坐在左側、中央還是右側，<b>只要看著同一個舞台寬度，你眼睛張開的視角角度完全一模一樣，且剛好等於圓心角度數的一半</b>！",
      ask: "為什麼「半圓所對的圓周角必定是 90 度直角」？圓內接四邊形的對角有何神奇關係？",
      visual: hookVisual
    },

    guess: {
      q: "如圖，線段 $\\overline{AB}$ 為圓 $O$ 的直徑，點 $C$ 為圓周上不與 $A, B$ 重合的任意一點，則 $\\angle ACB$ 的度數是多少？",
      options: [
        { t: "90 度（直角）", truth: true, explain: "直徑所對的弧為半圓（180°）。根據圓周角定理：圓周角等於所對弧度數的一半，因此 $\\angle ACB = \\frac{1}{2} \\times 180^\\circ = 90^\\circ$！" },
        { t: "180 度", explain: "180° 是一條直線平角，不是三角形內角。" },
        { t: "45 度", explain: "數值減半錯誤。" },
        { t: "視點 C 的位置而定", common: true, explain: "不論點 $C$ 游移到上半圓的哪一個位置，所對的始終是 180° 半圓弧，角度永遠死死鎖定在 90°！" }
      ]
    },

    derive: {
      intro: "透過滑桿調整圓周角頂點位置與弧度數，動態驗證圓周角永遠等於圓心角一半的黃金定律。",
      frames: [
        { cap: "弧度數與圓心角：圓心角的頂點在圓心，其度數定義為<b>所對弧的度數</b>。一整個圓周為 360°。", tex: "\\text{圓心角} = \\text{所對弧度數}" },
        { cap: "圓周角定理：頂點在圓周上、兩邊為圓的弦的角稱為圓周角。<b>圓周角度數等於同弧所對圓心角度數的一半</b>！", tex: "\\angle P = \\frac{1}{2}\\angle AOB = \\frac{1}{2}\\widehat{AB}" },
        { cap: "同弧圓周角處處相等：只要對著同一段弧，圓周頂點無論在圓周上怎麼跑，張開的圓周角度數完全不變！", tex: "\\angle C_1 = \\angle C_2 = \\angle C_3" },
        { cap: "圓內接四邊形對角互補：四邊形四頂點都在同一個圓上時，兩對角所對的弧合起來剛好是一整個圓周（360°），因此<b>對角互補（和為 180°）</b>！", tex: "\\angle A + \\angle C = 180^\\circ,\\quad \\angle B + \\angle D = 180^\\circ" }
      ],
      hint: "幾何解題超級暗號：看到「直徑」立刻連線造出「90° 直角」！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "圓周角定理動態驗證");
        var slArc = SK.slider({ label: "弧 AB 度數", min: 40, max: 140, step: 10, value: 80, color: "orange", fmt: function(v){ return v + " 度"; }, onInput: draw });
        ctx.sliders.appendChild(slArc.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var arcDeg = slArc.value;
          var inAng = arcDeg / 2;
          var ox = 220, oy = 130, r = 70;
          svg.innerHTML = "";
          // 圓
          s("circle", { cx: ox, cy: oy, r: r, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

          // 弦 AB
          var rad = (arcDeg * Math.PI) / 360;
          var ax = ox - r * Math.sin(rad), ay = oy + r * Math.cos(rad);
          var bx = ox + r * Math.sin(rad), by = oy + r * Math.cos(rad);
          var px = ox - 20, py = oy - r; // 圓頂點

          // 圓心角線段
          s("line", { x1: ox, y1: oy, x2: ax, y2: ay, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: oy, x2: bx, y2: by, stroke: C.orange.s, "stroke-width": 1.5 }, svg);

          // 圓周角線段
          s("line", { x1: px, y1: py, x2: ax, y2: ay, stroke: C.blue.s, "stroke-width": 2 }, svg);
          s("line", { x1: px, y1: py, x2: bx, y2: by, stroke: C.blue.s, "stroke-width": 2 }, svg);

          SK.label(svg, ox, oy + 5, "圓心角=" + arcDeg + "°", { size: 11, color: C.orange.s, bold: true });
          SK.label(svg, px, py - 10, "圓周角=" + inAng + "°", { size: 12, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{所對弧度數 }\\widehat{AB} = " + arcDeg + "^\\circ \\implies \\text{圓心角 } = " + arcDeg + "^\\circ，\\text{圓周角 } = \\frac{" + arcDeg + "^\\circ}{2} = " + inAng + "^\\circ", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "圓周角與圓內接四邊形計算",
        code: "S-9-6",
        demo: {
          q: "如圖，四邊形 $ABCD$ 為圓內接四邊形。若 $\\angle A = 85^\\circ$，且 $\\angle B$ 比 $\\angle D$ 的 2 倍少 $30^\\circ$，求 $\\angle C$ 與 $\\angle B$ 的度數。",
          steps: [
            "利用圓內接四邊形對角互補：$\\angle A + \\angle C = 180^\\circ$。",
            "$\\angle C = 180^\\circ - 85^\\circ = 95^\\circ$。",
            "同理 $\\angle B + \\angle D = 180^\\circ$。依題意 $\\angle B = 2\\angle D - 30^\\circ$。",
            "代入：$(2\\angle D - 30^\\circ) + \\angle D = 180^\\circ \\implies 3\\angle D = 210^\\circ \\implies \\angle D = 70^\\circ$。",
            "求出 $\\angle B = 180^\\circ - 70^\\circ = 110^\\circ$。"
          ]
        },
        tries: [
          {
            q: "圓 $O$ 上有一段劣弧 $\\widehat{AB}$，其所對的圓周角是 $55^\\circ$。請問優弧 $\\widehat{AB}$ 的度數是多少？",
            options: ["250 度", "110 度", "125 度", "290 度"],
            ans: 0,
            explain: "劣弧 $\\widehat{AB}$ 度數 $= 2 \\times 55^\\circ = 110^\\circ$。整個圓周為 360°，優弧度數 $= 360^\\circ - 110^\\circ = 250^\\circ$。"
          },
          {
            q: "在圓內接四邊形 $ABCD$ 中，若 $\\angle B = 100^\\circ$，則其對角 $\\angle D$ 的度數是多少？",
            options: ["80 度", "100 度", "50 度", "90 度"],
            ans: 0,
            explain: "圓內接四邊形對角互補：$\\angle B + \\angle D = 180^\\circ \\implies \\angle D = 180^\\circ - 100^\\circ = 80^\\circ$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在圓 $O$ 中，弦 $\\overline{AB}$ 等於半徑 $r$，則弦 $\\overline{AB}$ 所對的「圓周角」度數可能為多少？",
        options: ["30 度 或 150 度", "30 度", "60 度 或 120 度", "60 度"],
        ans: 0,
        hint: "弦長等於半徑時，與兩半徑構成正三角形，圓心角為 60°！注意優弧與劣弧各自對應一個圓周角！",
        explain: "因為弦 $\\overline{AB} = \\overline{OA} = \\overline{OB} = r$，$\\triangle OAB$ 為正三角形，圓心角 $\\angle AOB = 60^\\circ$。劣弧對應的圓周角為 $\\frac{60^\\circ}{2} = 30^\\circ$；優弧對應的圓周角（在另一側）與其互補為 $180^\\circ - 30^\\circ = 150^\\circ$。共有兩個可能值！"
      }
    ],

    angles: [
      { title: "足球射門的危險視角弧線", body: "足球場上前鋒帶球推進時，球門兩根門柱與足球構成一個張角。當防守球員將前鋒逼到底線時，這條圓弧的圓周角會被壓榨到極致狹小，射門角度幾乎趨近於零，這就是幾何圓周角在防守戰術中的妙用！" },
      { title: "弦切角定理的自然推論", body: "當圓周頂點沿圓周滑動到切點時，一條弦退化為切線，圓周角就演變成了「弦切角」。弦切角同樣等於它所夾弧度數的一半，展現了幾何變換的光滑連續性。" }
    ],

    where: {
      past: "上一節學會切線垂直半徑與圓心距判定。",
      current: "九年級掌握圓周角定理、半圓對直角與圓內接四邊形對角互補定理。",
      next: "第三章將把幾何論證升級為邏輯嚴密的——「推理與證明、三角形外心內心與重心」！"
    }
  });
})();
