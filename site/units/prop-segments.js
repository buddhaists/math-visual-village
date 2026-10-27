/* 單元：1-2 比例線段 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "平行線截三角形比例線段");
    // 三角形 ABC
    s("polygon", { points: "80,160 300,160 170,40", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    // 平行線 DE
    s("line", { x1: 125, y1: 100, x2: 235, y2: 100, stroke: C.orange.s, "stroke-width": 2.5 }, svg);

    SK.label(svg, 170, 30, "A", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 110, 100, "D", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 245, 100, "E", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 70, 170, "B", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 310, 170, "C", { size: 14, color: C.ink, bold: true });

    SK.label(svg, 200, 185, "DE // BC => AD : DB = AE : EC", { size: 13, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "prop-segments",
    en: "Proportional Segments",
    formula: "\\text{平行線截比例線段：若 } \\overline{DE} \\parallel \\overline{BC} \\text{，則 } \\frac{\\overline{AD}}{\\overline{DB}} = \\frac{\\overline{AE}}{\\overline{EC}} = \\frac{\\overline{DE}}{\\overline{BC}}",

    hook: {
      html: "如果一條直線平行於三角形的底邊，橫腰一切，兩側的腰會被切出什麼比例？古希臘泰利斯（Thales）站在金字塔前，用一根木杖與影子長度的比例測量金字塔的高度，依仗的就是名震千古的<b>平行線截比例線段性質</b>！",
      ask: "為什麼「左上：左下 = 右上：右下」，但中間底邊「短底：長底」卻只能等於「上：全」而不能等於「上：下」？",
      visual: hookVisual
    },

    guess: {
      q: "在 $\\triangle ABC$ 中，$D, E$ 分別在 $\\overline{AB}, \\overline{AC}$ 上，且 $\\overline{DE} \\parallel \\overline{BC}$。若 $\\overline{AD} = 3, \\overline{DB} = 2$，則底邊長度比 $\\overline{DE} : \\overline{BC}$ 為多少？",
      options: [
        { t: "3 : 5", truth: true, explain: "重要致命盲點！平行底邊比等於小三角形對大三角形的對應邊長比，必須用「上比全」：$\\overline{AD} : \\overline{AB} = 3 : (3 + 2) = 3 : 5$！" },
        { t: "3 : 2", common: true, explain: "嚴重的常見錯誤！誤把兩側截線段比 $AD : DB$ 當成了底邊比。" },
        { t: "2 : 5", explain: "誤拿左下比全體。" },
        { t: "9 : 4", explain: "誤用平方比（那是面積比，不是邊長比）。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變平行線 $DE$ 的高度位置，觀察左右兩側與底邊比例的同步聯動變化。",
      frames: [
        { cap: "等高三角形面積比：高相同的兩個三角形，面積比等於底邊長度比。", tex: "\\frac{\\triangle ABD}{\\triangle ACD} = \\frac{\\overline{BD}}{\\overline{CD}}" },
        { cap: "平行線截比例線段：若 $\\overline{DE} \\parallel \\overline{BC}$，則兩側截線成比例：上比下＝上比下、上比全＝上比全。", tex: "\\frac{\\overline{AD}}{\\overline{DB}} = \\frac{\\overline{AE}}{\\overline{EC}},\\quad \\frac{\\overline{AD}}{\\overline{AB}} = \\frac{\\overline{AE}}{\\overline{AC}}" },
        { cap: "底邊比的唯一鐵律：中間兩底邊長度比，<b>只能等於「上比全」</b>！絕不能等於「上比下」！", tex: "\\frac{\\overline{DE}}{\\overline{BC}} = \\frac{\\overline{AD}}{\\overline{AB}} = \\frac{\\overline{AE}}{\\overline{AC}}" },
        { cap: "逆定理判定平行：若一條直線截三角形兩邊所得線段成比例，則此直線必平行於第三邊！", tex: "\\frac{\\overline{AD}}{\\overline{DB}} = \\frac{\\overline{AE}}{\\overline{EC}} \\implies \\overline{DE} \\parallel \\overline{BC}" }
      ],
      hint: "避坑必背口訣：左右側腰隨意比（上比下＝上比下），中間底邊必須比全部（短底比長底＝上比全）！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "比例線段動態模擬");
        var slR = SK.slider({ label: "分割比例 (AD:DB)", min: 1, max: 4, step: 1, value: 2, color: "orange", fmt: function(v){ return v + " : 1"; }, onInput: draw });
        ctx.sliders.appendChild(slR.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var r = slR.value; // r : 1 => AD = r/(r+1) AB
          var ratio = r / (r + 1);
          var topY = 40, botY = 190, midY = topY + ratio * (botY - topY);
          var ax = 220, bx = 80, cx = 360;
          var dx = ax + ratio * (bx - ax), ex = ax + ratio * (cx - ax);
          svg.innerHTML = "";
          // 三角形
          s("polygon", { points: ax+","+topY+" "+bx+","+botY+" "+cx+","+botY, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // 平行線 DE
          s("line", { x1: dx, y1: midY, x2: ex, y2: midY, stroke: C.red.s, "stroke-width": 2.5 }, svg);

          SK.label(svg, ax, topY - 10, "A", { size: 14, color: C.ink, bold: true });
          SK.label(svg, dx - 15, midY, "D", { size: 13, color: C.red.s, bold: true });
          SK.label(svg, ex + 15, midY, "E", { size: 13, color: C.red.s, bold: true });
          SK.label(svg, bx - 10, botY + 15, "B", { size: 14, color: C.ink, bold: true });
          SK.label(svg, cx + 10, botY + 15, "C", { size: 14, color: C.ink, bold: true });

          read.innerHTML = SK.tex("\\overline{AD}:\\overline{DB} = " + r + ":1 \\implies \\overline{AD}:\\overline{AB} = " + r + ":" + (r+1) + "，\\text{底邊長度比 }\\overline{DE}:\\overline{BC} = " + r + ":" + (r+1), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用平行線比例線段求長度",
        code: "S-9-3",
        demo: {
          q: "如圖，$\\triangle ABC$ 中，$\\overline{DE} \\parallel \\overline{BC}$。已知 $\\overline{AD} = 6, \\overline{DB} = 4, \\overline{AE} = 9$。求 $\\overline{EC}$ 與 $\\overline{DE} : \\overline{BC}$。",
          steps: [
            "求 $\\overline{EC}$：利用左邊比等於右邊比 $\\frac{\\overline{AD}}{\\overline{DB}} = \\frac{\\overline{AE}}{\\overline{EC}}$。",
            "$\\frac{6}{4} = \\frac{9}{\\overline{EC}} \\implies 6\\overline{EC} = 36 \\implies \\overline{EC} = 6$。",
            "求底邊比：必須用上比全，$\\overline{AD} : \\overline{AB} = 6 : (6 + 4) = 6 : 10 = 3 : 5$。",
            "因此 $\\overline{DE} : \\overline{BC} = 3 : 5$。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 中，$\\overline{DE} \\parallel \\overline{BC}$，若 $\\overline{AD} = 4, \\overline{AB} = 10, \\overline{DE} = 6$，則底邊 $\\overline{BC}$ 的長度是多少？",
            options: ["15", "12", "18", "9"],
            ans: 0,
            explain: "利用上比全等於底邊比：$\\frac{\\overline{AD}}{\\overline{AB}} = \\frac{\\overline{DE}}{\\overline{BC}} \\implies \\frac{4}{10} = \\frac{6}{\\overline{BC}} \\implies 4\\overline{BC} = 60 \\implies \\overline{BC} = 15$。"
          },
          {
            q: "三條互相平行的直線截兩條直線，若在一條截線上截得的線段長分別為 3 與 5，在另一條截線上對應的較短線段長為 6，則對應的較長線段長是多少？",
            options: ["10", "8", "12", "15"],
            ans: 0,
            explain: "平行線截比例線段性質：$\\frac{3}{5} = \\frac{6}{x} \\implies 3x = 30 \\implies x = 10$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在梯形 $ABCD$ 中，$\\overline{AD} \\parallel \\overline{BC}$，且兩對角線交於 $O$ 點。若 $\\overline{AD} = 6, \\overline{BC} = 9$，則 $\\triangle AOD$ 與 $\\triangle BOC$ 的面積比是多少？",
        options: ["4 : 9", "2 : 3", "16 : 81", "6 : 9"],
        ans: 0,
        hint: "利用平行線內錯角相等證相似，相似圖形的面積比等於邊長平方比！",
        explain: "因為 $\\overline{AD} \\parallel \\overline{BC}$，由內錯角相等可得 $\\triangle AOD \\sim \\triangle COB$。對應邊長比為 $\\overline{AD} : \\overline{BC} = 6 : 9 = 2 : 3$。因此面積比等於邊長平方比：$2^2 : 3^2 = 4 : 9$！"
      }
    ],

    angles: [
      { title: "泰利斯測量金字塔", body: "西元前六世紀，古希臘七賢之首泰利斯造訪埃及。他插了一根木杖在沙地上，靜靜等待直到太陽照射下「木杖影子長度剛好等於木杖本身長度」的一瞬間，大喊：現在測量金字塔影子的長度，就等於金字塔的真實高度！" },
      { title: "電腦斷層掃描 (CT) 的幾何投影", body: "醫學 CT 掃描器由 X 射線源發出平行或扇形射線穿透人體組織，不同層面的衰減投影就是比例線段的積分逆變換（Radon 變換），精確重構出人體內部的 3D 立體斷層影像。" }
    ],

    where: {
      past: "八年級平行線截角性質與連比概念。",
      current: "九年級掌握平行線截比例線段與上比下 vs 上比全的關鍵區分。",
      next: "下一節將把比例推廣至整個三角形——「相似形的判定定理」！"
    }
  });
})();
