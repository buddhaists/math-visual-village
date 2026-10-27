/* 單元：3-5 三角形的邊角關係 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "兩邊之和大於第三邊");
    // 兩邊伸直剛好搆不到底邊
    s("line", { x1: 50, y1: 140, x2: 350, y2: 140, stroke: C.cocoa, "stroke-width": 3 }, svg);
    SK.label(svg, 200, 165, "底邊 c = 10", { size: 13, color: C.cocoa, bold: true });

    s("line", { x1: 50, y1: 140, x2: 150, y2: 80, stroke: C.orange.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 90, 95, "a = 4", { size: 12, color: C.orange.s, bold: true });

    s("line", { x1: 350, y1: 140, x2: 230, y2: 80, stroke: C.blue.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 300, 95, "b = 5", { size: 12, color: C.blue.s, bold: true });

    SK.label(svg, 200, 50, "4 + 5 = 9 < 10 (兩手太短，根本碰不到！)", { size: 13, color: C.red.s, bold: true });
  }

  SK.mountUnit({
    slug: "tri-inequality",
    en: "Side-Angle Inequalities in Triangles",
    formula: "|a - b| < c < a + b \\quad (\\text{任兩邊之和大於第三邊、大邊對大角})",

    hook: {
      html: "隨意拿三根木棒，就一定能拼出三角形嗎？如果底邊長 10 公分，兩側木棒只有 3 公分與 4 公分，就算把兩根木棒完全壓平（$3 + 4 = 7$），也搆不到彼此！幾何公理告訴我們：<b>三角形任意兩邊之和，必須嚴格大於第三邊</b>！",
      ask: "在同一個三角形中，為什麼「大邊對大角、大角對大邊」？開口越大的夾角，對應的邊長為何越長？",
      visual: hookVisual
    },

    guess: {
      q: "下列各組線段長度中，哪一組「可以」拼成一個三角形？",
      options: [
        { t: "5, 6, 10", truth: true, explain: "檢查技巧：只要「兩小邊之和大於最長邊」即可！$5 + 6 = 11 > 10$，完全滿足條件！" },
        { t: "3, 4, 7", common: true, explain: "$3 + 4 = 7$，剛好等於最長邊，壓平會重疊成一條直線，無法撐起三角形。" },
        { t: "2, 5, 8", explain: "$2 + 5 = 7 < 8$，太短搆不到。" },
        { t: "1, 2, 4", explain: "$1 + 2 = 3 < 4$，無法拼成。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整第三邊長度 $c$，觀察三角形從無法閉合到成功拼合的臨界範圍。",
      frames: [
        { cap: "三角形三邊長不等式：任意兩邊之和大於第三邊、任意兩邊之差（取正）小於第三邊。", tex: "|a - b| < c < a + b" },
        { cap: "快速判定捷徑：檢驗三線段能否構成三角形，只需檢驗<b>兩較小邊之和是否大於最長邊</b>！", tex: "\\text{兩小邊和} > \\text{最長邊}" },
        { cap: "大邊對大角：在同一個三角形中，較長的邊所對的內角較大；反之較大的角所對的邊較長。", tex: "a > b \\iff \\angle A > \\angle B" },
        { cap: "樞紐定理（兩三角形間）：若兩三角形有兩組邊對應相等，夾角越大者，所對的第三邊越長！", tex: "\\angle 1 > \\angle 2 \\implies \\text{第三邊}_1 > \\text{第三邊}_2" }
      ],
      hint: "求第三邊範圍秒解公式：差小於邊小於和！$|a - b| < x < a + b$！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "三角形邊長不等式動態模擬");
        var slC = SK.slider({ label: "第三邊長度 c", min: 2, max: 12, step: 1, value: 7, color: "orange", fmt: function(v){ return v + " cm"; }, onInput: draw });
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var c = slC.value;
          var a = 4, b = 6;
          var diff = b - a; // 2
          var sum = a + b;  // 10
          var isValid = (c > diff && c < sum);
          svg.innerHTML = "";

          s("line", { x1: 50, y1: 170, x2: 50 + c * 25, y2: 170, stroke: C.cocoa, "stroke-width": 3 }, svg);
          SK.label(svg, 50 + (c * 25) / 2, 195, "c = " + c, { size: 14, color: C.cocoa, bold: true });

          var statusStr = isValid ? "能拼成三角形！" : (c <= diff ? "太短！差為 2，c 必須大於 2" : "太長！和為 10，c 必須小於 10");
          SK.label(svg, 220, 80, statusStr, { size: 16, color: isValid ? C.green.s : C.red.s, bold: true });

          read.innerHTML = SK.tex("\\text{已給兩邊 } a=4, b=6 \\implies \\text{差 } 2 < c < \\text{和 } 10，\\text{當前 } c=" + c + "\\quad \\implies " + (isValid ? "\\text{合情合理}" : "\\text{無法構成！}"), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求第三邊範圍與邊角大小排序",
        code: "S-8-8",
        demo: {
          q: "已知三角形兩邊長分別為 5 與 9，第三邊長為整數 $x$。求：(1) $x$ 的可能範圍；(2) $x$ 的最大整數值與最小整數值。",
          steps: [
            "由邊長不等式：$|9 - 5| < x < 9 + 5$。",
            "化簡範圍：$4 < x < 14$。",
            "若 $x$ 為整數，最大值為 13，最小值為 5。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 中，若 $\\angle A = 55^\\circ, \\angle B = 65^\\circ$，則三邊長 $\\overline{AB}, \\overline{BC}, \\overline{CA}$ 的大小關係為何？",
            options: ["CA > AB > BC", "AB > CA > BC", "BC > CA > AB", "CA > BC > AB"],
            ans: 0,
            explain: "求第三角：$\\angle C = 180 - 55 - 65 = 60^\\circ$。角度大小：$\\angle B (65^\\circ) > \\angle C (60^\\circ) > \\angle A (55^\\circ)$。大角對大邊，對應邊長：$\\overline{CA} > \\overline{AB} > \\overline{BC}$！"
          },
          {
            q: "已知一個等腰三角形的一邊長為 4，另一邊長為 9，則此等腰三角形的周長是多少？",
            options: ["22", "17", "22 或 17", "26"],
            ans: 0,
            explain: "兩腰可能為 4 或 9：若腰長為 4，三邊為 4, 4, 9，但 $4 + 4 = 8 < 9$（不符）；若腰長為 9，三邊為 9, 9, 4，$4 + 9 = 13 > 9$（符合！）。因此周長為 $9 + 9 + 4 = 22$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在 $\\triangle ABC$ 的內部任意取一點 $P$，則 $(\\overline{PA} + \\overline{PB} + \\overline{PC})$ 與周長的一半 $s = \\frac{a+b+c}{2}$ 之間，永遠滿足下列哪一個關係？",
        options: [
          "PA + PB + PC > s (大於半周長)",
          "PA + PB + PC < s (小於半周長)",
          "PA + PB + PC = s",
          "無法比較"
        ],
        ans: 0,
        hint: "在 $\\triangle PAB, \\triangle PBC, \\triangle PCA$ 中分別使用兩邊之和大於第三邊，三式相加！",
        explain: "在三個小三角形中：$\\overline{PA} + \\overline{PB} > c$、$\\overline{PB} + \\overline{PC} > a$、$\\overline{PC} + \\overline{PA} > b$。三式相加得 $2(\\overline{PA} + \\overline{PB} + \\overline{PC}) > a + b + c \\implies \\overline{PA} + \\overline{PB} + \\overline{PC} > \\frac{a+b+c}{2} = s$！"
      }
    ],

    angles: [
      { title: "兩點之間線段最短與光程", body: "「兩點之間直線段最短」是整個宇宙的基本法則。在三角形 $\\triangle ABC$ 中，從 $A$ 走到 $B$ 的直線距離 $\\overline{AB}$，必然小於繞經 $C$ 點的路徑 $\\overline{AC} + \\overline{CB}$，這正是三角形不等式背後的物理本質！" },
      { title: "電腦網路最短路徑路由 (Dijkstra 演算法)", body: "網路封包在路由器之間轉發時，Dijkstra 演算法不斷利用三角不等式 $d(u, v) \\le d(u, w) + d(w, v)$ 進行「鬆弛（Relaxation）」操作，尋找全球互聯網延遲最低的黃金通訊鏈路。" }
    ],

    where: {
      past: "上一節學會全等三角形邊角相等特性。",
      current: "八年級掌握邊角不等制約：兩邊和大於第三邊、差小於第三邊，以及大邊對大角。",
      next: "第四章將邁向幾何平行論——「平行線的截角性質與平行四邊形」！"
    }
  });
})();
