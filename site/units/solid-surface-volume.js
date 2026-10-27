/* 單元：3-1b 柱體與錐體展開圖 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "圓錐展開成扇形與底面圓");
    // 圓錐
    s("polygon", { points: "80,140 160,140 120,40", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("ellipse", { cx: 120, cy: 140, rx: 40, ry: 10, fill: "none", stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    SK.label(svg, 120, 175, "直圓錐 (母線 R, 底半徑 r)", { size: 11, color: C.soft });

    SK.label(svg, 195, 95, "展開", { size: 14, color: C.orange.s, bold: true });

    // 展開圖：扇形 + 小圓
    s("path", { d: "M 300 50 L 250 110 A 70 70 0 0 0 350 110 Z", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 300, 85, "側面積 \\pi r R", { size: 11, color: C.orange.s, bold: true });
    s("circle", { cx: 300, cy: 140, r: 20, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 300, 145, "底面積", { size: 10, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "solid-surface-volume",
    en: "Surface Area and Volume of Prisms and Pyramids",
    formula: "V_{\\text{柱}} = \\text{底面積}\\times h,\\quad V_{\\text{錐}} = \\frac{1}{3}\\text{底面積}\\times h,\\quad S_{\\text{圓錐側}} = \\pi r R",

    hook: {
      html: "當我們剪開飲料紙盒攤平成 2D 平面時，側面積一秒變成了一個大長方形；而若把冰淇淋甜筒（圓錐）側邊剪開攤平，竟然會變成一個優雅的<b>扇形</b>！古希臘阿基米德證明了：<b>同底等高的錐體體積，剛好是柱體體積的 $\\frac{1}{3}$</b>！",
      ask: "圓錐展開後的扇形弧長，為什麼必須恰好等於底面小圓的完整圓周長？",
      visual: hookVisual
    },

    guess: {
      q: "一個底面半徑為 3 公分、母線長為 5 公分的直圓錐，其「側面展開後的扇形面積」是多少平方公分？",
      options: [
        { t: "$15\\pi$ 平方公分", truth: true, explain: "圓錐側面積神速公式：$S = \\pi r R$（$\\pi \\times \\text{底半徑} \\times \\text{母線}$）！代入得 $\\pi \\times 3 \\times 5 = 15\\pi$ 平方公分，一秒搞定！" },
        { t: "$24\\pi$ 平方公分", common: true, explain: "誤將底面積 $\\pi r^2 = 9\\pi$ 也加了進去（那是「總表面積」不是「側面積」）。" },
        { t: "$30\\pi$ 平方公分", explain: "忘記扇形面積公式中的一半。" },
        { t: "$12\\pi$ 平方公分", explain: "計算錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整柱體與錐體的底面積與高，觀察柱體與錐體體積 3:1 的立體注水關係。",
      frames: [
        { cap: "柱體體積公式：直角柱（圓柱、三角柱、四角柱）的體積等於<b>底面積乘上柱高</b>！", tex: "V_{\\text{柱}} = \\text{底面積} \\times h" },
        { cap: "錐體體積公式：角錐與圓錐的體積，永遠是同底等高柱體體積的<b>三分之一（$\\frac{1}{3}$）</b>！", tex: "V_{\\text{錐}} = \\frac{1}{3} \\times \\text{底面積} \\times h" },
        { cap: "直圓柱表面積：展開後為兩個底面圓與一個長方形（長為底面圓周長 $2\\pi r$，寬為高 $h$）。", tex: "S_{\\text{圓柱}} = 2\\pi r^2 + 2\\pi r h" },
        { cap: "直圓錐側面積公式：側邊展開為半徑為母線 $R$ 的扇形，弧長等於底圓周 $2\\pi r$。側面積 $= \\pi r R$！", tex: "S_{\\text{側}} = \\pi r R,\\quad \\text{總表面積} = \\pi r^2 + \\pi r R" }
      ],
      hint: "圓錐側面積秒殺公式：$\\pi \\times r (底半徑) \\times R (母線)$，不需算圓心角度數！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "柱體與錐體體積比動態圖");
        var slR = SK.slider({ label: "底面半徑 r", min: 2, max: 6, step: 1, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slH = SK.slider({ label: "立體高 h", min: 4, max: 10, step: 2, value: 6, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slR.el);
        ctx.sliders.appendChild(slH.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var r = slR.value, h = slH.value;
          var baseArea = Math.PI * r * r;
          var vCyl = baseArea * h;
          var vCone = vCyl / 3;
          svg.innerHTML = "";

          SK.label(svg, 220, 50, "【圓柱 vs 圓錐體積 3:1 關係】", { size: 15, color: C.ink, bold: true });
          SK.label(svg, 220, 95, "底面積 A = \\pi r^2 = " + (r*r) + "\\pi \\approx " + baseArea.toFixed(1), { size: 13, color: C.orange.s, bold: true });
          SK.label(svg, 220, 135, "圓柱體積 V_柱 = 底面積 × h = " + (r*r*h) + "\\pi \\approx " + vCyl.toFixed(1), { size: 14, color: C.blue.s, bold: true });
          SK.label(svg, 220, 175, "圓錐體積 V_錐 = (1/3) V_柱 = " + ((r*r*h)/3).toFixed(1) + "\\pi \\approx " + vCone.toFixed(1), { size: 14, color: C.green.s, bold: true });

          read.innerHTML = SK.tex("\\text{用圓錐注水到等底等高的圓柱中，剛好注滿 3 次！} V_{\\text{錐}} = \\frac{1}{3} V_{\\text{柱}}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "圓柱圓錐表面積與體積計算",
        code: "S-9-13",
        demo: {
          q: "一個直圓錐的底面半徑為 5 公分，高為 12 公分。求：(1) 此圓錐的體積；(2) 此圓錐的表面積（結果以 $\\pi$ 表示）。",
          steps: [
            "(1) 錐體體積：$\\frac{1}{3} \\times \\text{底面積} \\times h = \\frac{1}{3} \\times (\\pi \\times 5^2) \\times 12 = \\frac{1}{3} \\times 25\\pi \\times 12 = 100\\pi$ 立方公分。",
            "(2) 畢氏定理求母線 $R$：母線 $R = \\sqrt{5^2 + 12^2} = 13$ 公分。",
            "側面積：$S_{\\text{側}} = \\pi r R = \\pi \\times 5 \\times 13 = 65\\pi$ 平方公分。",
            "底面積：$S_{\\text{底}} = \\pi r^2 = 25\\pi$ 平方公分。",
            "總表面積：$65\\pi + 25\\pi = 90\\pi$ 平方公分。"
          ]
        },
        tries: [
          {
            q: "一個圓柱的底面半徑為 4 公分，高為 10 公分，則此圓柱的體積是多少立方公分？",
            options: ["$160\\pi$", "$80\\pi$", "$40\\pi$", "$320\\pi$"],
            ans: 0,
            explain: "柱體體積 $=$ 底面積 $\\times$ 高 $= (\\pi \\times 4^2) \\times 10 = 16\\pi \\times 10 = 160\\pi$ 立方公分。"
          },
          {
            q: "一個正四角錐的底面為邊長 6 公分的正方形，高為 4 公分，則此角錐的體積是多少立方公分？",
            options: ["48 立方公分", "144 立方公分", "72 立方公分", "24 立方公分"],
            ans: 0,
            explain: "底面積為 $6 \\times 6 = 36$ 平方公分。角錐體積 $= \\frac{1}{3} \\times \\text{底面積} \\times \\text{高} = \\frac{1}{3} \\times 36 \\times 4 = 48$ 立方公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "將一個底面半徑為 6 公分、高為 18 公分的實心金屬圓柱完全熔化，重新鑄造成底面半徑為 6 公分的實心金屬圓錐，則鑄造出的圓錐高為多少公分？",
        options: ["54 公分", "18 公分", "6 公分", "36 公分"],
        ans: 0,
        hint: "熔化前後體積守恆，利用圓錐體積為同底柱體的 1/3！",
        explain: "圓柱體積為 $V = \\pi \\times 6^2 \\times 18 = 648\\pi$。新圓錐體積為 $\\frac{1}{3} \\times (\\pi \\times 6^2) \\times H = 12\\pi H = 648\\pi \\implies H = 648 \\div 12 = 54$ 公分（高為原本圓柱的 3 倍）！"
      }
    ],

    angles: [
      { title: "祖暅原理與微積分體積積分", body: "南北朝數學家祖沖之的兒子祖暅提出「冪勢既同，則積不容異」——若兩個立體在任何等高處的截面積都相等，則它們的體積必定相等！比西方卡瓦列里原理早了一千多年，是現代微積分旋轉體體積的起源。" },
      { title: "金字塔建造者的立體智慧", body: "古埃及吉薩大金字塔是人類歷史上最宏偉的正四角錐。四個側面三角形的斜高與底邊半長滿足黃金比例，歷經四千五百年風沙洗禮，展現了錐體幾何抗壓穩定的極致物理形態。" }
    ],

    where: {
      past: "七年級三視圖展開圖初探與九年級空間線面關係。",
      current: "九年級下學期掌握柱體與錐體體積（1/3 關係）、圓錐母線側面積 $\\pi r R$ 巧算。",
      next: "國中數學 60 個單元至此全面完工圓滿！奠定堅若磐石的數理思維，昂首邁向高中數學新天地！"
    }
  });
})();
