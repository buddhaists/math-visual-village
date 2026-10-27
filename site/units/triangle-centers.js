/* 單元：3-2 三角形的外心、內心與重心 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "三角形三大心一覽");
    // 外心 O
    s("rect", { x: 30, y: 40, width: 100, height: 110, rx: 8, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 80, 65, "外心 O", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 80, 95, "三中垂線交點", { size: 11, color: C.ink });
    SK.label(svg, 80, 125, "到三頂點等距", { size: 11, color: C.red.s, bold: true });

    // 內心 I
    s("rect", { x: 150, y: 40, width: 100, height: 110, rx: 8, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 200, 65, "內心 I", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 200, 95, "三角平分線交點", { size: 11, color: C.ink });
    SK.label(svg, 200, 125, "到三邊等距", { size: 11, color: C.green.s, bold: true });

    // 重心 G
    s("rect", { x: 270, y: 40, width: 100, height: 110, rx: 8, fill: C.green.f, stroke: C.green.s }, svg);
    SK.label(svg, 320, 65, "重心 G", { size: 14, color: C.green.s, bold: true });
    SK.label(svg, 320, 95, "三中線交點", { size: 11, color: C.ink });
    SK.label(svg, 320, 125, "頂點到中點 2:1", { size: 11, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "triangle-centers",
    en: "Circumcenter, Incenter, and Centroid of Triangles",
    formula: "\\text{外心: }OA=OB=OC;\\quad \\text{內心: }\\Delta=\\frac{1}{2}sr;\\quad \\text{重心: }AG:GD=2:1",

    hook: {
      html: "隨意畫一個三角形，它內部有三個無比神秘的神奇核心：一個能撐起罩住三個頂點的大外接圓（<b>外心 O</b>）；一個能塞進緊貼三條邊的最大內切圓（<b>內心 I</b>）；還有一個用筆尖頂住就能讓整塊木板水平平衡的物理重力中心（<b>重心 G</b>）！",
      ask: "直角三角形的外心在哪裡？為什麼直角三角形「斜邊中點」到三頂點距離全部相等？",
      visual: hookVisual
    },

    guess: {
      q: "直角三角形的外心（外接圓圓心），必定落在下列哪一個位置？",
      options: [
        { t: "斜邊的中點上", truth: true, explain: "因為半圓所對的圓周角是直角（90°），直角三角形的斜邊恰好就是外接圓的直徑！因此外心必定正好落在斜邊的中點上！" },
        { t: "三角形的內部", explain: "銳角三角形的外心才在內部。" },
        { t: "直角的頂點上", common: true, explain: "直角頂點是垂心（三高的交點），不是外心。" },
        { t: "三角形的外部", explain: "鈍角三角形的外心才在外部。" }
      ]
    },

    derive: {
      intro: "透過滑桿切換外心、內心與重心，觀察三心位置、線段比例與幾何內外切圓。",
      frames: [
        { cap: "外心 O（外接圓圓心）：<b>三邊中垂線的交點</b>。性質：外心到三頂點距離等長（$\\overline{OA}=\\overline{OB}=\\overline{OC}=R$）。直角三角形外心在<b>斜邊中點</b>！", tex: "\\overline{OA}=\\overline{OB}=\\overline{OC}=R" },
        { cap: "內心 I（內切圓圓心）：<b>三個內角角平分線的交點</b>。性質：內心到三邊垂直距離等長（$=r$）。面積公式：$\\triangle = \\frac{1}{2} s r$（$s$ 為周長）！", tex: "\\text{Area} = \\frac{1}{2}(a+b+c)r" },
        { cap: "重心 G（平衡中心）：<b>三條中線的交點</b>。性質：重心將每條中線切為 $2 : 1$（頂點到重心佔 2 份，重心到對邊中點佔 1 份）！", tex: "\\overline{AG}:\\overline{GD} = 2 : 1" },
        { cap: "重心平分六等分面積：三條中線將整個三角形分割成<b>六個面積完全相等</b>的小三角形！", tex: "\\text{六塊小三角形面積全部相等}" }
      ],
      hint: "三心快速口訣：外心中垂頂點等，內心平分到邊等，重心三中二比一六塊平！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "三角形三大心模擬");
        var slCenter = SK.slider({ label: "展示核心 (0: 外心, 1: 內心, 2: 重心)", min: 0, max: 2, step: 1, value: 2, color: "orange", fmt: function(v){ return ["外心 O", "內心 I", "重心 G"][v]; }, onInput: draw });
        ctx.sliders.appendChild(slCenter.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var cType = slCenter.value;
          var ox = 220, oy = 130;
          svg.innerHTML = "";
          var pA = [220, 50], pB = [100, 180], pC = [340, 180];
          // 三角形
          s("polygon", { points: pA[0]+","+pA[1]+" "+pB[0]+","+pB[1]+" "+pC[0]+","+pC[1], fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

          if (cType === 0) {
            // 外心 (在內部偏下)
            var pO = [220, 125];
            s("circle", { cx: pO[0], cy: pO[1], r: 75, fill: "none", stroke: C.orange.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);
            s("circle", { cx: pO[0], cy: pO[1], r: 5, fill: C.orange.s }, svg);
            SK.label(svg, pO[0] + 15, pO[1], "O (外心)", { size: 13, color: C.orange.s, bold: true });
            read.innerHTML = SK.tex("\\text{【外心 O】三邊中垂線交點，}\\overline{OA}=\\overline{OB}=\\overline{OC}=\\text{外接圓半徑 }R", true);
          } else if (cType === 1) {
            // 內心
            var pI = [220, 135];
            s("circle", { cx: pI[0], cy: pI[1], r: 45, fill: "none", stroke: C.blue.s, "stroke-width": 1.5 }, svg);
            s("circle", { cx: pI[0], cy: pI[1], r: 5, fill: C.blue.s }, svg);
            SK.label(svg, pI[0] + 15, pI[1], "I (內心)", { size: 13, color: C.blue.s, bold: true });
            read.innerHTML = SK.tex("\\text{【內心 I】三角平分線交點，到三邊垂直距離恆等於內切圓半徑 }r", true);
          } else {
            // 重心 G (1/3 高度)
            var pG = [220, 137];
            // 中線
            s("line", { x1: pA[0], y1: pA[1], x2: 220, y2: 180, stroke: C.green.s, "stroke-dasharray": "3,3" }, svg);
            s("line", { x1: pB[0], y1: pB[1], x2: 280, y2: 115, stroke: C.green.s, "stroke-dasharray": "3,3" }, svg);
            s("circle", { cx: pG[0], cy: pG[1], r: 5, fill: C.green.s }, svg);
            SK.label(svg, pG[0] + 15, pG[1] - 5, "G (重心)", { size: 13, color: C.green.s, bold: true });
            read.innerHTML = SK.tex("\\text{【重心 G】三中線交點，}\\overline{AG}:\\overline{GD} = 2 : 1\\text{，六塊小三角形面積全部相等！}", true);
          }
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "直角三角形外接圓與內切圓半徑",
        code: "S-9-8",
        demo: {
          q: "直角 $\\triangle ABC$ 中，兩股長分別為 6 與 8。求：(1) 外接圓半徑 $R$；(2) 內切圓半徑 $r$。",
          steps: [
            "畢氏定理求斜邊：$c = \\sqrt{6^2 + 8^2} = 10$。",
            "(1) 直角三角形外接圓半徑等於斜邊的一半：$R = \\frac{c}{2} = \\frac{10}{2} = 5$。",
            "(2) 內切圓半徑公式（直角三角形專用）：$r = \\frac{a + b - c}{2} = \\frac{6 + 8 - 10}{2} = \\frac{4}{2} = 2$。",
            "（亦可用面積驗算：$\\frac{1}{2} \\times 6 \\times 8 = \\frac{1}{2} \\times (6+8+10) \\times r \\implies 24 = 12r \\implies r = 2$）。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 中，$G$ 為重心，中線 $\\overline{AD} = 12$ 公分。則線段 $\\overline{AG}$ 的長度是多少公分？",
            options: ["8 公分", "4 公分", "6 公分", "9 公分"],
            ans: 0,
            explain: "重心將中線分成 $2 : 1$。$\\overline{AG}$ 佔頂點側 2 份（共 3 份）：$\\overline{AG} = 12 \\times \\frac{2}{3} = 8$ 公分。"
          },
          {
            q: "一個三角形的周長為 30 公分，面積為 45 平方公分。則此三角形的「內切圓半徑」是多少公分？",
            options: ["3 公分", "1.5 公分", "6 公分", "4.5 公分"],
            ans: 0,
            explain: "利用內心面積公式：$\\text{面積} = \\frac{1}{2} \\times \\text{周長} \\times r \\implies 45 = \\frac{1}{2} \\times 30 \\times r \\implies 15r = 45 \\implies r = 3$ 公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在坐標平面上，三角形的三頂點坐標分別為 $A(1, 4), B(5, 2), C(3, 9)$。請問其重心 $G$ 的坐標為下列何者？",
        options: ["(3, 5)", "(4, 5)", "(3, 4)", "(9, 15)"],
        ans: 0,
        hint: "三角形重心坐標就是三頂點坐標的算術平均數：$(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3})$！",
        explain: "橫坐標平均：$\\frac{1 + 5 + 3}{3} = \\frac{9}{3} = 3$；縱坐標平均：$\\frac{4 + 2 + 9}{3} = \\frac{15}{3} = 5$。因此重心坐標為 $(3, 5)$！"
      }
    ],

    angles: [
      { title: "歐拉線（Euler Line）的奇蹟串聯", body: "1765 年數學大師歐拉發現了一個震撼幾何界的奇蹟定理：在任意非正三角形中，「外心 O、重心 G、垂心 H」三點竟然永遠奇蹟般地落在同一條直線上（歐拉線），而且重心 G 永遠以 $2 : 1$ 的固定比值將線段 $\\overline{HG}$ 與 $\\overline{GO}$ 完美等分！" },
      { title: "造船工程與浮心重心穩定性", body: "巨型貨輪與軍艦設計中，船舶的「重力重心 G」與「浮力中心 B」的相對位置決定了船體抗風浪傾斜時的自穩復原力矩（穩心高度 GM），這是現代船舶力學的救命核心。" }
    ],

    where: {
      past: "中垂線、角平分線、中線的尺規作圖與三角形全等性質。",
      current: "九年級將三大幾何線匯聚為三大心：外心（頂點等距）、內心（邊等距）、重心（2:1 與平分面積）。",
      next: "九年級下學期將展開最後一哩路——「二次函數圖形、統計盒狀圖與空間立體幾何」！"
    }
  });
})();
