/* 單元：4-2 平行四邊形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "平行四邊形對邊等長與對角線互相平分");
    s("polygon", { points: "60,150 240,150 320,60 140,60", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

    // 兩對角線
    s("line", { x1: 60, y1: 150, x2: 320, y2: 60, stroke: C.orange.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);
    s("line", { x1: 140, y1: 60, x2: 240, y2: 150, stroke: C.blue.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);

    // 交點 O
    s("circle", { cx: 190, cy: 105, r: 4, fill: C.red.s }, svg);
    SK.label(svg, 190, 90, "O (互相平分)", { size: 12, color: C.red.s, bold: true });

    SK.label(svg, 100, 105, "AB = CD", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 280, 105, "AD = BC", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 200, 185, "對邊等長、對角相等、對角線互相平分", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "parallelogram",
    en: "Parallelograms",
    formula: "\\text{一組對邊平行且相等} \\implies \\text{此四邊形為平行四邊形}",

    hook: {
      html: "當兩組平行線在平面上交織在一起，就誕生了幾何中最勻稱平衡的四邊形——<b>平行四邊形</b>。只要畫出一條對角線，它立刻被劈成兩個全等三角形；而兩條對角線在正中心交會時，更會奇蹟般地<b>把彼此精確切成一半（互相平分）</b>！",
      ask: "五大判別平行四邊形的條件中，哪一個最容易被誤解？為什麼「一組對邊平行、另一組對邊等長」不一定是平行四邊形？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一個條件「無法」斷定四邊形 $ABCD$ 一定是平行四邊形？",
      options: [
        { t: "一組對邊平行，另一組對邊等長 (AB // CD 且 AD = BC)", truth: true, explain: "超級幾何陷阱！這可能是「等腰梯形」而不是平行四邊形！必須是「同一組對邊平行且等長」才能保證平行四邊形！" },
        { t: "一組對邊平行且相等 (AB // CD 且 AB = CD)", explain: "同一組對邊平行且相等，是標準且最高頻的平行四邊形判別法！" },
        { t: "兩組對邊分別等長 (AB = CD 且 AD = BC)", explain: "兩組對邊等長由 SSS 可證全等，是標準判別。" },
        { t: "兩條對角線互相平分", explain: "對角線互相平分是平行四邊形的充要條件。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變傾斜度與底邊長，觀察平行四邊形四個基本性質與面積公式。",
      frames: [
        { cap: "平行四邊形定義：兩組對邊分別平行的四邊形，記作 $\\square ABCD$。", tex: "\\overline{AB}\\parallel\\overline{CD}\\quad \\text{且}\\quad \\overline{AD}\\parallel\\overline{BC}" },
        { cap: "四大核心性質：<br>1. <b>兩組對邊分別等長</b><br>2. <b>兩組對角分別相等</b>（鄰角互補）<br>3. <b>兩條對角線互相平分</b><br>4. 每一條對角線平分面積", tex: "\\overline{OA}=\\overline{OC},\\quad \\overline{OB}=\\overline{OD}" },
        { cap: "五大判別法（任一滿足即可）：<br>• 定義：兩組對邊平行<br>• 邊：兩組對邊等長<br>• 邊：<b>一組對邊平行且等長</b>（極重要！）<br>• 角：兩組對角相等<br>• 對角線：兩對角線互相平分", tex: "\\text{五大充要判別法}" },
        { cap: "四等分面積：兩條對角線將平行四邊形分割成<b>四個面積完全相等</b>的小三角形！", tex: "\\text{四小塊三角形面積全部相等}" }
      ],
      hint: "判定防坑口訣：同組邊平行加等長可證，異組邊平行配等長可能是等腰梯形！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "平行四邊形對角線平分模擬");
        var slShift = SK.slider({ label: "頂點偏移量 dx", min: 20, max: 80, step: 10, value: 50, color: "orange", fmt: function(v){ return v + " px"; }, onInput: draw });
        ctx.sliders.appendChild(slShift.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var dx = slShift.value;
          var baseW = 160, h = 90;
          var ox = 90, oy = 170;
          svg.innerHTML = "";
          var pA = [ox + dx, oy - h];
          var pB = [ox, oy];
          var pC = [ox + baseW, oy];
          var pD = [ox + baseW + dx, oy - h];
          s("polygon", { points: pA[0]+","+pA[1]+" "+pB[0]+","+pB[1]+" "+pC[0]+","+pC[1]+" "+pD[0]+","+pD[1], fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

          // 對角線
          s("line", { x1: pA[0], y1: pA[1], x2: pC[0], y2: pC[1], stroke: C.orange.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);
          s("line", { x1: pB[0], y1: pB[1], x2: pD[0], y2: pD[1], stroke: C.blue.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);

          var mX = (pA[0] + pC[0]) / 2, mY = (pA[1] + pC[1]) / 2;
          s("circle", { cx: mX, cy: mY, r: 5, fill: C.red.s }, svg);
          SK.label(svg, mX, mY - 12, "O", { size: 13, color: C.red.s, bold: true });

          read.innerHTML = SK.tex("\\text{兩對角線交於 }O\\text{ 點，}\\overline{OA}=\\overline{OC}\\text{ 且 }\\overline{OB}=\\overline{OD}，\\text{對角線精準互相平分！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "平行四邊形角度與對角線計算",
        code: "S-8-9",
        demo: {
          q: "在 $\\square ABCD$ 中，已知 $\\angle A = (2x + 10)^\\circ, \\angle B = (3x - 10)^\\circ$。求 $\\angle C$ 與 $\\angle D$ 的度數。",
          steps: [
            "鄰角互補性質：平行四邊形鄰角相加等於 180°。",
            "列方程式：$(2x + 10) + (3x - 10) = 180 \\implies 5x = 180 \\implies x = 36$。",
            "代入求角：$\\angle A = 2(36) + 10 = 82^\\circ$，$\\angle B = 3(36) - 10 = 98^\\circ$。",
            "對角相等性質：$\\angle C = \\angle A = 82^\\circ$，$\\angle D = \\angle B = 98^\\circ$。"
          ]
        },
        tries: [
          {
            q: "在 $\\square ABCD$ 中，對角線交於 $O$ 點。若 $\\overline{AC} = 16, \\overline{BD} = 12$，且 $\\overline{AB} = 10$，則 $\\triangle AOB$ 的周長是多少？",
            options: ["24", "38", "19", "20"],
            ans: 0,
            explain: "對角線互相平分：$\\overline{OA} = 16 \\div 2 = 8$，$\\overline{OB} = 12 \\div 2 = 6$。$\\triangle AOB$ 周長為 $\\overline{OA} + \\overline{OB} + \\overline{AB} = 8 + 6 + 10 = 24$。"
          },
          {
            q: "若平行四邊形 $ABCD$ 的面積為 48 平方公分，兩對角線交於 $O$，則 $\\triangle AOB$ 的面積是多少平方公分？",
            options: ["12 平方公分", "24 平方公分", "16 平方公分", "8 平方公分"],
            ans: 0,
            explain: "兩條對角線將平行四邊形面積四等分，因此 $\\triangle AOB$ 面積 $= 48 \\div 4 = 12$ 平方公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知點 $A(-2, 1), B(4, 1), C(2, 5)$ 為平行四邊形的三個頂點，若第四個頂點 $D$ 在第一象限，求點 $D$ 的坐標為何？",
        options: ["(-4, 5)", "(8, 5)", "(0, -3)", "(4, 9)"],
        ans: 0,
        hint: "利用向量位移相同：從 $B(4, 1)$ 到 $A(-2, 1)$ 是向左移 6 單位，則從 $C(2, 5)$ 到 $D$ 也是向左移 6 單位！",
        explain: "平行四邊形對邊平行且等長。$\\overline{AB}$ 水平長度為 $4 - (-2) = 6$。頂邊 $\\overline{DC}$ 亦為長度 6 的水平線。由 $C(2, 5)$ 向左移 6 單位得 $D(2 - 6, 5) = (-4, 5)$。"
      }
    ],

    angles: [
      { title: "物理向量加法的平行四邊形定則", body: "高中物理中兩個不同方向的力 $\\vec{F}_1$ 與 $\\vec{F}_2$ 作用在同一物體上，合力的大小與方向就是以這兩個力為鄰邊所作出的平行四邊形對角線！兩千年前的幾何學，成為了力學合成的基本法則。" },
      { title: "伸縮衣架與剪刀升降機", body: "工業剪刀升降平台與可伸縮衣架，底層全都是由多個活動銷釘連接的平行四邊形機構。不論如何拉伸收縮，平台檯面永遠與地面維持絕對平行！" }
    ],

    where: {
      past: "上一節學會平行線的截角性質。",
      current: "八年級掌握平行四邊形的四大性質與五大判別法，熟練對角線互相平分與面積四等分。",
      next: "下一節將給平行四邊形加上「直角」或「四邊等長」的強條件，誕生長方形、菱形與正方形！"
    }
  });
})();
