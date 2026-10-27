/* 單元：1-4 相似三角形的應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "母子直角相似定理");
    // 大直角三角形 ABC (斜邊 BC, 頂角 A=90)
    s("polygon", { points: "80,150 320,150 180,50", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    // 斜邊上的高 AD
    s("line", { x1: 180, y1: 50, x2: 180, y2: 150, stroke: C.red.s, "stroke-width": 2 }, svg);
    s("rect", { x: 180, y: 138, width: 12, height: 12, fill: "none", stroke: C.cocoa }, svg);

    SK.label(svg, 180, 35, "A (90°)", { size: 13, color: C.ink, bold: true });
    SK.label(svg, 65, 160, "B", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 335, 160, "C", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 180, 170, "D", { size: 13, color: C.red.s, bold: true });

    SK.label(svg, 200, 195, "母子相似：h^2 = BD × CD, c^2 = BD × BC", { size: 12, color: C.red.s, bold: true });
  }

  SK.mountUnit({
    slug: "similar-tri-app",
    en: "Applications of Similar Triangles",
    formula: "\\frac{\\text{面積}_1}{\\text{面積}_2} = \\left(\\frac{a}{d}\\right)^2,\\quad \\overline{AD}^2 = \\overline{BD}\\cdot\\overline{CD}",

    hook: {
      html: "當你站在大樹旁測量自己的身高與影子長度時，陽光把大樹、你、地面連成了兩組相似三角形，瞬間算出十幾公尺高的樹高！而在直角三角形中自直角頂點向斜邊作高，一隻「母三角形」肚子裡更孕育出兩隻「子三角形」，三者通通相似，誕生了威力驚人的<b>母子相似定理</b>！",
      ask: "為什麼兩個相似三角形邊長比是 $2:3$ 時，周長比也是 $2:3$，但面積比卻會暴衝成 $4:9$？",
      visual: hookVisual
    },

    guess: {
      q: "兩個相似三角形的對應邊長比為 $3 : 4$，若較小三角形的面積為 18 平方公分，則較大三角形的面積是多少？",
      options: [
        { t: "32 平方公分", truth: true, explain: "相似形面積比等於「邊長的平方比」！面積比為 $3^2 : 4^2 = 9 : 16$。$\\frac{18}{\\text{大面積}} = \\frac{9}{16} \\implies \\text{大面積} = 18 \\times \\frac{16}{9} = 32$ 平方公分！" },
        { t: "24 平方公分", common: true, explain: "誤拿邊長比直接乘：$18 \\times \\frac{4}{3} = 24$。切記面積是二維的，必須平方！" },
        { t: "48 平方公分", explain: "計算錯誤。" },
        { t: "36 平方公分", explain: "隨意猜測。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整高線垂足位置，觀察直角三角形母子相似的三大射影公式推導。",
      frames: [
        { cap: "長度比 vs 面積比：相似三角形對應邊長比、對應高比、周長比皆為 $a : b$；而<b>面積比等於邊長平方比 $a^2 : b^2$</b>！", tex: "\\frac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\frac{\\text{Side}_1}{\\text{Side}_2}\\right)^2" },
        { cap: "直角母子相似定理：直角 $\\triangle ABC$ 中，$\\angle A = 90^\\circ$，作斜邊上的高 $\\overline{AD}$。則 $\\triangle DBA \\sim \\triangle DAC \\sim \\triangle ABC$！", tex: "\\triangle DBA \\sim \\triangle DAC \\sim \\triangle ABC" },
        { cap: "三大母子公式：<br>1. 高平方＝兩截線乘積：$\\overline{AD}^2 = \\overline{BD} \\cdot \\overline{CD}$<br>2. 股平方＝截線乘全斜邊：$\\overline{AB}^2 = \\overline{BD} \\cdot \\overline{BC}$<br>3. 面積算高：$\\overline{AD} = \\frac{\\overline{AB}\\cdot\\overline{AC}}{\\overline{BC}}$", tex: "h^2 = x \\cdot y,\\quad c^2 = x \\cdot (x+y)" },
        { cap: "特殊直角三角形邊長比（必背金字招牌）：<br>• $45^\\circ - 45^\\circ - 90^\\circ \\implies 1 : 1 : \\sqrt{2}$<br>• $30^\\circ - 60^\\circ - 90^\\circ \\implies 1 : \\sqrt{3} : 2$！", tex: "1:1:\\sqrt{2},\\quad 1:\\sqrt{3}:2" }
      ],
      hint: "母子相似口訣：中間高的平方等於兩側底的積，兩側股的平方等於投影乘全部！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "母子相似射影幾何模擬");
        var slX = SK.slider({ label: "左側投影長 BD", min: 2, max: 8, step: 1, value: 4, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slY = SK.slider({ label: "右側投影長 CD", min: 3, max: 9, step: 1, value: 9, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        ctx.sliders.appendChild(slY.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value, y = slY.value;
          var h2 = x * y;
          var h = Math.sqrt(h2);
          var sc = 18;
          var ox = 60, oy = 180;
          svg.innerHTML = "";
          var pB = [ox, oy];
          var pD = [ox + x * sc, oy];
          var pC = [ox + (x + y) * sc, oy];
          var pA = [pD[0], oy - h * sc];

          // 大直角三角形
          s("polygon", { points: pB[0]+","+pB[1]+" "+pC[0]+","+pC[1]+" "+pA[0]+","+pA[1], fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // 高 AD
          s("line", { x1: pA[0], y1: pA[1], x2: pD[0], y2: pD[1], stroke: C.red.s, "stroke-width": 2 }, svg);

          SK.label(svg, pA[0], pA[1] - 10, "A", { size: 14, color: C.ink, bold: true });
          SK.label(svg, pB[0] - 15, oy, "B", { size: 14, color: C.ink, bold: true });
          SK.label(svg, pC[0] + 15, oy, "C", { size: 14, color: C.ink, bold: true });
          SK.label(svg, pD[0], oy + 18, "D", { size: 12, color: C.red.s, bold: true });

          SK.label(svg, (pB[0] + pD[0]) / 2, oy + 18, "BD=" + x, { size: 11, color: C.orange.s });
          SK.label(svg, (pD[0] + pC[0]) / 2, oy + 18, "CD=" + y, { size: 11, color: C.blue.s });
          SK.label(svg, pD[0] + 25, (pA[1] + pD[1]) / 2, "h=" + h.toFixed(2), { size: 12, color: C.red.s, bold: true });

          read.innerHTML = SK.tex("\\text{斜邊上的高 }\\overline{AD}^2 = \\overline{BD}\\cdot\\overline{CD} = " + x + "\\times " + y + " = " + h2 + " \\implies \\overline{AD} = " + h.toFixed(2), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "母子相似定理與面積比計算",
        code: "S-9-4",
        demo: {
          q: "直角 $\\triangle ABC$ 中，$\\angle BAC = 90^\\circ$，$\\overline{AD} \\perp \\overline{BC}$ 於 $D$。若 $\\overline{BD} = 4, \\overline{CD} = 9$，求：(1) 高 $\\overline{AD}$；(2) 股長 $\\overline{AB}$。",
          steps: [
            "(1) 由母子相似第一公式：$\\overline{AD}^2 = \\overline{BD} \\cdot \\overline{CD} = 4 \\times 9 = 36 \\implies \\overline{AD} = 6$。",
            "(2) 全斜邊長 $\\overline{BC} = 4 + 9 = 13$。",
            "由母子相似第二公式：$\\overline{AB}^2 = \\overline{BD} \\cdot \\overline{BC} = 4 \\times 13 = 52 \\implies \\overline{AB} = \\sqrt{52} = 2\\sqrt{13}$。"
          ]
        },
        tries: [
          {
            q: "某人身高 1.6 公尺，在路燈下測得其影長為 2.4 公尺。若他距離路燈基底 4.8 公尺，則路燈的高度是多少公尺？",
            options: ["4.8 公尺", "3.2 公尺", "5.6 公尺", "4.0 公尺"],
            ans: 0,
            explain: "大三角形底邊長為 $2.4 + 4.8 = 7.2$ 公尺。利用相似比：$\\frac{1.6}{\\text{燈高}} = \\frac{2.4}{7.2} = \\frac{1}{3} \\implies \\text{燈高} = 1.6 \\times 3 = 4.8$ 公尺。"
          },
          {
            q: "直角 $\\triangle ABC$ 中，$\\angle B = 90^\\circ, \\angle C = 30^\\circ$。若斜邊 $\\overline{AC} = 10$，則兩股長 $\\overline{AB}$ 與 $\\overline{BC}$ 分別是多少？",
            options: [
              "$AB = 5,\\ BC = 5\\sqrt{3}$",
              "$AB = 5\\sqrt{3},\\ BC = 5$",
              "$AB = 5,\\ BC = 5\\sqrt{2}$",
              "$AB = 5\\sqrt{2},\\ BC = 5$"
            ],
            ans: 0,
            explain: "$30^\\circ - 60^\\circ - 90^\\circ$ 的特殊直角三角形邊長比為 $1 : \\sqrt{3} : 2$。斜邊為 10（佔 2 份），每份為 5。$30^\\circ$ 對邊 $\\overline{AB} = 5$，$60^\\circ$ 對邊 $\\overline{BC} = 5\\sqrt{3}$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在 $\\triangle ABC$ 中，$D$ 為 $\\overline{BC}$ 上一點，$\\overline{DE} \\parallel \\overline{AB}$ 交 $\\overline{AC}$ 於 $E$，$\\overline{DF} \\parallel \\overline{AC}$ 交 $\\overline{AB}$ 於 $F$。若 $\\triangle BDF$ 面積為 4，$\\triangle CDE$ 面積為 9，則原 $\\triangle ABC$ 的總面積是多少？",
        options: ["25", "13", "36", "49"],
        ans: 0,
        hint: "利用相似形面積比等於邊長平方比，邊長比為 $\\sqrt{4} : \\sqrt{9} = 2 : 3$！",
        explain: "兩小三角形分別與大三角形相似，面積比為 $4 : 9 \\implies$ 底邊長度比 $\\overline{BD} : \\overline{DC} = \\sqrt{4} : \\sqrt{9} = 2 : 3$。全底邊 $\\overline{BC}$ 佔 $2 + 3 = 5$ 份。大三角形邊長與小三角形邊長比為 $5 : 2$。因此大三角形面積 $= 4 \\times (\\frac{5}{2})^2 = 4 \\times \\frac{25}{4} = 25$！"
      }
    ],

    angles: [
      { title: "幾何平均數的尺規作圖", body: "給定長度 $a$ 與 $b$，如何用圓規尺規做出長度 $\\sqrt{ab}$？答案就是母子相似：將兩線段拼成直徑 $(a+b)$ 畫半圓，在交界點向上作垂直垂線交圓周於點 $P$，這條垂線段長度剛好就是 $\\sqrt{ab}$！" },
      { title: "地圖等高線與立體視差", body: "空照測繪飛機在不同位置拍攝兩張重疊航拍照，電腦比對同一座山峰在兩張照片中的位移像素差（視差 Parallax），運用相似三角形測距原理，精確計算出地表任意點的海拔高度。" }
    ],

    where: {
      past: "上一節學會三大三角形相似判定法。",
      current: "九年級掌握相似三角形在現實測量、母子射影定理與特殊邊長比 $1:\\sqrt{3}:2$ 的應用。",
      next: "第二章將從直線跨入完美曲線——「圓與直線、弧度與圓周角」！"
    }
  });
})();
