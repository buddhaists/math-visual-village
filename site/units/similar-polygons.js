/* 單元：1-3 相似形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "等比例縮放形狀不變");
    s("polygon", { points: "50,140 120,140 90,80", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 85, 120, "\\triangle ABC", { size: 12, color: C.orange.s, bold: true });

    s("polygon", { points: "180,160 320,160 260,40", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 250, 120, "\\triangle DEF (2x)", { size: 14, color: C.blue.s, bold: true });

    SK.label(svg, 200, 185, "對應角相等、對應邊成比例", { size: 13, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "similar-polygons",
    en: "Similar Polygons and Triangle Similarity",
    formula: "\\triangle ABC \\sim \\triangle DEF\\ (\\text{AA, SAS, SSS 相似})",

    hook: {
      html: "當我們用放大鏡觀察螞蟻、或是把手機裡的照片雙指縮放時，圖形的尺寸改變了，但<b>形狀完全沒有走樣變形</b>！幾何學把這種「<b>所有對應角都完全相等、所有對應邊都成相同比例</b>」的關係，稱為<b>相似（記作 $\\sim$）</b>！",
      ask: "要判定兩個三角形相似，為什麼只要「兩個角對應相等（AA 相似）」就百分之百足夠了？",
      visual: hookVisual
    },

    guess: {
      q: "下列關於多邊形相似的敘述，哪一個是「永遠正確」的？",
      options: [
        { t: "任意兩個正三角形必定相似", truth: true, explain: "正三角形每個內角都是 60°（對應角相等），三邊長度皆相等（對應邊成比例），因此任意兩個正三角形必定相似！" },
        { t: "任意兩個長方形必定相似", common: true, explain: "致命陷阱！雖然四個角都是 90°，但長寬比不一定相同（例如 1x2 與 1x10 的長方形就不相似）。" },
        { t: "任意兩個菱形必定相似", explain: "菱形四邊等長，但內角角度可以任意改變，不一定相似。" },
        { t: "對應角相等的多邊形必定相似", explain: "這對三角形成立，但對四邊形以上不成立（如長方形四角相等但不一定與正方形相似）。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整縮放倍率，動態體驗 AA、SAS 與 SSS 三大三角形相似判別性質。",
      frames: [
        { cap: "相似多邊形定義：兩個多邊形同時滿足：(1) <b>對應角全部相等</b>；(2) <b>對應邊全部成比例</b>，記作 $P_1 \\sim P_2$。", tex: "\\text{對應角相等}\\quad \\text{且}\\quad \\text{對應邊成比例}" },
        { cap: "AA 相似（最常用神技）：三角形內角和固定為 180°，只要<b>任兩組對應角相等</b>，第三角必相等，三角形立刻相似！", tex: "\\angle A = \\angle D,\\ \\angle B = \\angle E \\implies \\triangle ABC \\sim \\triangle DEF" },
        { cap: "SAS 相似：兩組對應邊成比例，且其<b>夾角對應相等</b>。", tex: "\\frac{\\overline{AB}}{\\overline{DE}} = \\frac{\\overline{AC}}{\\overline{DF}},\\ \\angle A = \\angle D" },
        { cap: "SSS 相似：三組對應邊全部成相同比例。", tex: "\\frac{\\overline{AB}}{\\overline{DE}} = \\frac{\\overline{BC}}{\\overline{EF}} = \\frac{\\overline{CA}}{\\overline{FD}}" }
      ],
      hint: "找相似三角形第一直覺：狂找對頂角、同位角、內錯角或公共角，只要湊出兩個等角（AA 相似）立刻破題！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "三角形相似動態模擬");
        var slScale = SK.slider({ label: "放大倍率 k", min: 1.2, max: 2.2, step: 0.2, value: 1.6, color: "orange", fmt: function(v){ return SK.fmt(v, 1) + "x"; }, onInput: draw });
        ctx.sliders.appendChild(slScale.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var k = slScale.value;
          var ox1 = 80, oy1 = 150, baseW1 = 70, h1 = 60;
          svg.innerHTML = "";
          // 左原三角形
          s("polygon", { points: ox1+","+oy1+" "+(ox1+baseW1)+","+oy1+" "+(ox1+baseW1*0.6)+","+(oy1-h1), fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, ox1 + baseW1 * 0.4, oy1 - h1 / 2, "1x", { size: 12, color: C.orange.s, bold: true });

          // 右放大三角形
          var ox2 = 200, oy2 = 170, baseW2 = baseW1 * k, h2 = h1 * k;
          s("polygon", { points: ox2+","+oy2+" "+(ox2+baseW2)+","+oy2+" "+(ox2+baseW2*0.6)+","+(oy2-h2), fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, ox2 + baseW2 * 0.4, oy2 - h2 / 2, k.toFixed(1) + "x", { size: 14, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\triangle ABC \\sim \\triangle DEF\\quad (k = " + k.toFixed(1) + ")，\\text{對應角完全不變，邊長放大為 " + k.toFixed(1) + " 倍！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用 AA 相似求線段長度",
        code: "S-9-2",
        demo: {
          q: "如圖，$\\angle A = \\angle D = 90^\\circ$，$\\overline{AB}$ 與 $\\overline{DE}$ 交於 $C$。已知 $\\overline{AC} = 3, \\overline{BC} = 5, \\overline{CD} = 6$，求 $\\overline{CE}$ 的長度。",
          steps: [
            "找相似三角形：在 $\\triangle ABC$ 與 $\\triangle DEC$ 中，$\\angle A = \\angle D = 90^\\circ$（直角）；$\\angle ACB = \\angle DCE$（對頂角相等）。",
            "依據 AA 相似定理：$\\triangle ABC \\sim \\triangle DEC$。",
            "寫出對應邊成比例：$\\frac{\\overline{AC}}{\\overline{DC}} = \\frac{\\overline{BC}}{\\overline{EC}}$。",
            "代入數值求解：$\\frac{3}{6} = \\frac{5}{\\overline{EC}} \\implies \\frac{1}{2} = \\frac{5}{\\overline{EC}} \\implies \\overline{EC} = 10$。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 與 $\\triangle DEF$ 中，若 $\\angle A = 50^\\circ, \\angle B = 70^\\circ$，且 $\\angle D = 50^\\circ, \\angle F = 60^\\circ$，則這兩個三角形是否相似？",
            options: ["是，依據 AA 相似", "否，不相似", "是，依據 SSS 相似", "無法判定"],
            ans: 0,
            explain: "求第三角：$\\triangle ABC$ 的 $\\angle C = 180 - 50 - 70 = 60^\\circ$。發現兩三角形內角分別為 50°, 70°, 60° 與 50°, 70°, 60°，對應角全相等，依據 AA 相似定理必定相似！"
          },
          {
            q: "已知 $\\triangle ABC \\sim \\triangle DEF$，且 $\\overline{AB} : \\overline{DE} = 2 : 3$。若 $\\triangle ABC$ 的周長為 16 公分，則 $\\triangle DEF$ 的周長是多少公分？",
            options: ["24 公分", "36 公分", "32 公分", "18 公分"],
            ans: 0,
            explain: "相似三角形的周長比等於對應邊長比！$\\frac{16}{\\text{周長}_{DEF}} = \\frac{2}{3} \\implies \\text{周長}_{DEF} = 16 \\times \\frac{3}{2} = 24$ 公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在梯形 $ABCD$ 中，$\\overline{AD} \\parallel \\overline{BC}$。一條與兩底平行的線段 $\\overline{EF}$ 將梯形分割成兩個相似的梯形 $AEFD \\sim EBCF$。若 $\\overline{AD} = 4, \\overline{BC} = 9$，則 $\\overline{EF}$ 的長度是多少？",
        options: ["6", "6.5", "5.5", "7"],
        ans: 0,
        hint: "兩梯形相似代表對應邊成比例：上底比下底等於上底比下底！",
        explain: "因為兩梯形相似：$\\frac{\\overline{AD}}{\\overline{EF}} = \\frac{\\overline{EF}}{\\overline{BC}} \\implies \\overline{EF}^2 = \\overline{AD} \\times \\overline{BC} = 4 \\times 9 = 36 \\implies \\overline{EF} = 6$！$\\overline{EF}$ 恰為兩底長度的「幾何平均數（等比中項）」！"
      }
    ],

    angles: [
      { title: "分形幾何與大自然的自相似性", body: "雪花結晶、海岸線、花椰菜、人體支氣管樹，放大幾十倍後竟然能看見跟整體完全一模一樣的微縮分支！近代數學家芒德勃羅創立的「分形幾何（Fractal）」，正是相似概念在無限尺度下的終極演繹。" },
      { title: "建築縮尺模型與風洞試驗", body: "建造摩天大樓（如台北 101）或超音速飛機前，工程師會製造 1:100 的精確幾何相似模型放進風洞測試空氣動力學，藉由相似原理預測真實巨構的抗風與受力表現。" }
    ],

    where: {
      past: "上一節的平行線截比例線段。",
      current: "九年級掌握三角形三大相似判定法（AA、SAS、SSS），體會等角縮放與邊長比例。",
      next: "下一節將把相似三角形運用到測量樹高、直角母子相似定理與面積平方比！"
    }
  });
})();
