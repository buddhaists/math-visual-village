/* 單元：4-3 特殊的四邊形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "特殊四邊形的對角線特徵");
    // 長方形：對角線等長
    s("rect", { x: 40, y: 50, width: 90, height: 60, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    s("line", { x1: 40, y1: 50, x2: 130, y2: 110, stroke: C.red.s, "stroke-dasharray": "2,2" }, svg);
    s("line", { x1: 40, y1: 110, x2: 130, y2: 50, stroke: C.red.s, "stroke-dasharray": "2,2" }, svg);
    SK.label(svg, 85, 135, "長方形：對角線等長", { size: 11, color: C.blue.s, bold: true });

    // 菱形：對角線垂直
    s("polygon", { points: "200,45 235,80 200,115 165,80", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("line", { x1: 200, y1: 45, x2: 200, y2: 115, stroke: C.red.s }, svg);
    s("line", { x1: 165, y1: 80, x2: 235, y2: 80, stroke: C.red.s }, svg);
    SK.label(svg, 200, 135, "菱形：對角線垂直", { size: 11, color: C.orange.s, bold: true });

    // 正方形：既等長又垂直
    s("rect", { x: 275, y: 50, width: 60, height: 60, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
    s("line", { x1: 275, y1: 50, x2: 335, y2: 110, stroke: C.red.s }, svg);
    s("line", { x1: 275, y1: 110, x2: 335, y2: 50, stroke: C.red.s }, svg);
    SK.label(svg, 305, 135, "正方形：等長且垂直", { size: 11, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "special-quads",
    en: "Special Quadrilaterals",
    formula: "\\text{梯形兩腰中點連線} = \\frac{\\text{上底} + \\text{下底}}{2}",

    hook: {
      html: "如果讓平行四邊形的一個角變成直角，它會瞬間變身成<b>長方形</b>；如果讓它鄰邊等長，它就化身為<b>菱形</b>；當兩者完美結合，就誕生了幾何中最完美的<b>正方形</b>！觀察它們的<b>對角線性質（等長？垂直？平分角？）</b>，是解開所有幾何題目的金鑰匙！",
      ask: "為什麼只要知道菱形的兩條對角線長度，就能一秒算出它的面積？梯形中點連線有什麼神奇性質？",
      visual: hookVisual
    },

    guess: {
      q: "若一個四邊形的兩條對角線「互相垂直平分且等長」，則此四邊形必定是下列哪一種？",
      options: [
        { t: "正方形", truth: true, explain: "平分代表平行四邊形；等長加上直角代表長方形；垂直代表菱形；三者兼備就是最完美的「正方形」！" },
        { t: "菱形", common: true, explain: "菱形的對角線只有垂直平分，不一定等長。" },
        { t: "長方形", explain: "長方形的對角線只有等長平分，不一定垂直。" },
        { t: "等腰梯形", explain: "等腰梯形對角線等長但不會互相平分。" }
      ]
    },

    derive: {
      intro: "透過滑桿切換長方形、菱形、正方形與梯形，動態對比各類特殊四邊形的對角線與邊角關係。",
      frames: [
        { cap: "長方形（矩形）：四個角都是直角的平行四邊形。特色：<b>兩條對角線等長且互相平分</b>。", tex: "\\overline{AC} = \\overline{BD}\\quad \\text{且互相平分}" },
        { cap: "菱形：四邊等長的平行四邊形。特色：<b>兩條對角線互相垂直平分且平分內角</b>。面積 $= \\frac{1}{2} d_1 d_2$。", tex: "\\overline{AC}\\perp\\overline{BD},\\quad \\text{面積}=\\frac{d_1 d_2}{2}" },
        { cap: "正方形：四邊等長且四角皆為直角。集長方形與菱形所有優點於一身：<b>對角線等長、垂直且互相平分</b>！", tex: "\\text{正方形} = \\text{長方形} \\cap \\text{菱形}" },
        { cap: "梯形中位線定理：連接梯形兩腰中點的線段平行於兩底，且<b>長度等於（上底＋下底）的一半</b>！", tex: "\\text{中點連線}\\parallel \\text{底邊},\\quad \\text{長度}=\\frac{a + b}{2}" }
      ],
      hint: "對角線三大判定秒殺表：等長看長方形，垂直看菱形，垂直又等長必是正方形！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "梯形兩腰中點連線幾何模擬");
        var slTop = SK.slider({ label: "上底長度 a", min: 40, max: 100, step: 10, value: 60, color: "orange", fmt: function(v){ return v + " px"; }, onInput: draw });
        var slBot = SK.slider({ label: "下底長度 b", min: 100, max: 200, step: 20, value: 160, color: "blue", fmt: function(v){ return v + " px"; }, onInput: draw });
        ctx.sliders.appendChild(slTop.el);
        ctx.sliders.appendChild(slBot.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slTop.value, b = slBot.value;
          var ox = 220, topY = 50, botY = 170, midY = 110;
          svg.innerHTML = "";
          // 畫等腰梯形
          var pA = [ox - a / 2, topY], pB = [ox + a / 2, topY];
          var pC = [ox + b / 2, botY], pD = [ox - b / 2, botY];
          s("polygon", { points: pA[0]+","+pA[1]+" "+pB[0]+","+pB[1]+" "+pC[0]+","+pC[1]+" "+pD[0]+","+pD[1], fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

          // 兩腰中點連線
          var midL = (a + b) / 2;
          s("line", { x1: ox - midL / 2, y1: midY, x2: ox + midL / 2, y2: midY, stroke: C.red.s, "stroke-width": 2.5 }, svg);

          SK.label(svg, ox, topY - 10, "上底 a=" + a, { size: 12, color: C.orange.s, bold: true });
          SK.label(svg, ox, botY + 20, "下底 b=" + b, { size: 12, color: C.blue.s, bold: true });
          SK.label(svg, ox, midY - 10, "中位線 = " + midL, { size: 13, color: C.red.s, bold: true });

          read.innerHTML = SK.tex("\\text{梯形兩腰中點連線長度 } = \\frac{\\text{上底 } " + a + " + \\text{下底 } " + b + "}{2} = " + midL + "，\\text{剛好等於兩底長度的算術平均數！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "菱形面積與梯形中位線計算",
        code: "S-8-10",
        demo: {
          q: "一個菱形的一條對角線長為 12 公分，邊長為 10 公分。求：(1) 另一條對角線長度；(2) 此菱形的面積。",
          steps: [
            "利用菱形對角線互相垂直平分：半條對角線為 $12 \\div 2 = 6$ 公分。",
            "在直角三角形中，由畢氏定理求另一半對角線：$\\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = 8$ 公分。",
            "另一條完整對角線長度：$8 \\times 2 = 16$ 公分。",
            "菱形面積公式：$\\frac{1}{2} \\times d_1 \\times d_2 = \\frac{1}{2} \\times 12 \\times 16 = 96$ 平方公分。"
          ]
        },
        tries: [
          {
            q: "一個梯形的兩腰中點連線段長為 15 公分，高為 8 公分，則此梯形的面積是多少平方公分？",
            options: ["120 平方公分", "60 平方公分", "240 平方公分", "90 平方公分"],
            ans: 0,
            explain: "梯形面積公式為 $\\frac{\\text{上底}+\\text{下底}}{2} \\times \\text{高}$。因為兩腰中點連線就是 $\\frac{\\text{上底}+\\text{下底}}{2} = 15$，所以面積直接等於 $15 \\times 8 = 120$ 平方公分！"
          },
          {
            q: "正方形的對角線長為 10 公分，則此正方形的面積是多少平方公分？",
            options: ["50 平方公分", "100 平方公分", "25 平方公分", "75 平方公分"],
            ans: 0,
            explain: "正方形也是菱形（對角線垂直等長），面積 $= \\frac{1}{2} \\times d_1 \\times d_2 = \\frac{1}{2} \\times 10 \\times 10 = 50$ 平方公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "任意凸四邊形 $ABCD$ 的四邊中點順次連接所圍成的新四邊形 $EFGH$，其形狀必定是下列哪一種？",
        options: ["平行四邊形", "長方形", "菱形", "梯形"],
        ans: 0,
        hint: "畫一條對角線，利用三角形中位線定理：中點連線平行對角線且長度為其一半！",
        explain: "著名的「瓦里農定理（Varignon Theorem）」：連對角線 $\\overline{AC}$，由三角形中點連線定理，$\\overline{EF} \\parallel \\overline{AC}$ 且 $\\overline{EF} = \\frac{1}{2}\\overline{AC}$；同理 $\\overline{HG} \\parallel \\overline{AC}$ 且 $\\overline{HG} = \\frac{1}{2}\\overline{AC}$。一組對邊平行且等長，因此必為平行四邊形！"
      }
    ],

    angles: [
      { title: "四邊形包容家族樹", body: "四邊形家族有嚴密的包容階層關係：四邊形 $\supset$ 梯形 $\supset$ 等腰梯形；四邊形 $\supset$ 平行四邊形 $\supset$ 長方形與菱形 $\supset$ 正方形。正方形是長方形的特例，也是菱形的特例，更是平行四邊形的集大成者！" },
      { title: "鑽石車工與菱形琢面", body: "珠寶設計中著名的鑽石明亮式切工（Brilliant Cut），亭部與冠部的刻面多採用精確對稱的菱形與箏形，確保進入寶石的光線能發生 100% 全內反射，綻放出最耀眼的火彩。" }
    ],

    where: {
      past: "上一節學會一般平行四邊形的判定與性質。",
      current: "八年級掌握長方形、菱形、正方形與梯形中位線的對角線特色與面積巧算。",
      next: "九年級將跨入第三學年——「比例線段、相似形、圓與幾何三大心」！"
    }
  });
})();
