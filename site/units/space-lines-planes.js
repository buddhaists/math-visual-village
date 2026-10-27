/* 單元：3-1a 空間中的線與平面 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "空間長方體中的歪斜線");
    // 透視長方體
    var p = [
      [80, 80], [180, 80], [180, 160], [80, 160],
      [140, 40], [240, 40], [240, 120], [140, 120]
    ];
    // 前面
    s("polygon", { points: p[0][0]+","+p[0][1]+" "+p[1][0]+","+p[1][1]+" "+p[2][0]+","+p[2][1]+" "+p[3][0]+","+p[3][1], fill: "none", stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    // 頂面與側面連線
    s("line", { x1: p[0][0], y1: p[0][1], x2: p[4][0], y2: p[4][1], stroke: C.cocoa }, svg);
    s("line", { x1: p[1][0], y1: p[1][1], x2: p[5][0], y2: p[5][1], stroke: C.cocoa }, svg);
    s("line", { x1: p[2][0], y1: p[2][1], x2: p[6][0], y2: p[6][1], stroke: C.cocoa }, svg);
    s("line", { x1: p[4][0], y1: p[4][1], x2: p[5][0], y2: p[5][1], stroke: C.cocoa }, svg);
    s("line", { x1: p[5][0], y1: p[5][1], x2: p[6][0], y2: p[6][1], stroke: C.cocoa }, svg);

    // 高亮歪斜線 1 (頂面後橫線)
    s("line", { x1: p[4][0], y1: p[4][1], x2: p[5][0], y2: p[5][1], stroke: C.orange.s, "stroke-width": 3 }, svg);
    // 高亮歪斜線 2 (前側鉛直線)
    s("line", { x1: p[0][0], y1: p[0][1], x2: p[3][0], y2: p[3][1], stroke: C.blue.s, "stroke-width": 3 }, svg);

    SK.label(svg, 320, 80, "歪斜線：", { size: 14, color: C.red.s, bold: true });
    SK.label(svg, 320, 105, "不相交、不平行", { size: 12, color: C.ink });
    SK.label(svg, 320, 130, "不在同一平面上！", { size: 12, color: C.red.s, bold: true });
  }

  SK.mountUnit({
    slug: "space-lines-planes",
    en: "Lines and Planes in Space",
    formula: "\\text{空間兩直線：相交、平行、或歪斜（不在同一平面）}",

    hook: {
      html: "在平面幾何中，兩條直線如果不相交，就必定平行。但是當我們跨入真實的三維立體空間時，天花板上由東向西的樑柱，與地面上由南向北的鐵軌，它們<b>既不平行、也永遠不會相交</b>！數學把這種三維空間特有的絕妙關係稱為<b>歪斜（Skew）</b>！",
      ask: "長方體的 12 條稜邊中，任選兩條，有多少對互相是「歪斜線」？如何判斷直線垂直於平面？",
      visual: hookVisual
    },

    guess: {
      q: "在長方體 $ABCD-EFGH$ 中，下列哪一條稜邊與底面上的邊 $\\overline{AB}$「互為歪斜線」？",
      options: [
        { t: "稜邊 CG (後方鉛直線)", truth: true, explain: "稜邊 $\\overline{AB}$ 與 $\\overline{CG}$ 不在同一個平面上，兩線既不平行，也永遠不可能相交，是標準的「歪斜線」！" },
        { t: "稜邊 CD", explain: "$\\overline{AB}$ 與 $\\overline{CD}$ 在底面上互相平行。" },
        { t: "稜邊 BC", explain: "$\\overline{AB}$ 與 $\\overline{BC}$ 在底面上相交於點 $B$。" },
        { t: "稜邊 EF", explain: "$\\overline{AB}$ 與 $\\overline{EF}$ 在前側面互相平行。" }
      ]
    },

    derive: {
      intro: "透過滑桿切換空間中直線與直線、直線與平面的立體幾何三維關係。",
      frames: [
        { cap: "空間兩直線三種關係：<br>1. <b>相交於一點</b>（共面）<br>2. <b>互相平行</b>（共面）<br>3. <b>歪斜線</b>（不共面、不相交且不平行）！", tex: "\\text{相交},\\quad \\text{平行},\\quad \\text{歪斜}" },
        { cap: "直線與平面垂直：若直線 $L$ 垂直於平面 $E$ 上的兩條相交直線，則直線 $L$ 必垂直於平面 $E$ 上經過垂足的<b>任意直線</b>！", tex: "L \\perp L_1,\\ L \\perp L_2 \\implies L \\perp E" },
        { cap: "空間長方體對角線公式：長、寬、高分別為 $a, b, c$ 的長方體，其內部最長空間對角線長度為 $\\sqrt{a^2 + b^2 + c^2}$！", tex: "D = \\sqrt{a^2 + b^2 + c^2}" },
        { cap: "兩平面位置關係：在空間中，兩個平面要麼互相平行（如天花板與地板），要麼相交於一條直線（如牆壁交界線）。", tex: "E_1 \\parallel E_2\\quad \\text{或}\\quad \\text{兩平面相交於直線 } L" }
      ],
      hint: "判斷歪斜線秒殺法：在長方體上找一條與它「不同方向、且不連在同一個矩形面上」的稜邊！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "空間對角線長度推導");
        var slA = SK.slider({ label: "長 a", min: 2, max: 6, step: 1, value: 4, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "寬 b", min: 2, max: 6, step: 1, value: 3, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value, c = 5; // 固定高 c=5
          var dBottom2 = a * a + b * b;
          var dSpace2 = dBottom2 + c * c;
          var dSpace = Math.sqrt(dSpace2);
          svg.innerHTML = "";

          SK.label(svg, 220, 50, "【長方體空間對角線兩次畢氏定理】", { size: 14, color: C.ink, bold: true });
          SK.label(svg, 220, 90, "底面對角線 d_底 = \\sqrt{" + a + "^2 + " + b + "^2} = \\sqrt{" + dBottom2 + "}", { size: 13, color: C.orange.s, bold: true });
          SK.label(svg, 220, 130, "空間對角線 D = \\sqrt{d_底^2 + 高^2} = \\sqrt{" + dBottom2 + " + " + (c*c) + "} = \\sqrt{" + dSpace2 + "}", { size: 14, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{長 }a=" + a + ", \\text{寬 }b=" + b + ", \\text{高 }c=" + c + "\\implies \\text{空間對角線 }D = \\sqrt{" + a + "^2 + " + b + "^2 + " + c + "^2} = \\sqrt{" + dSpace2 + "} \\approx " + dSpace.toFixed(2), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "判斷空間直線關係與長方體對角線",
        code: "S-9-12",
        demo: {
          q: "一個長方體的長、寬、高分別為 3 公分、4 公分、12 公分。求此長方體內部空間對角線的長度。",
          steps: [
            "底面對角線：由畢氏定理，底面對角線長 $= \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5$ 公分。",
            "立體直角三角形：底面對角線與鉛直高垂直相交，構成直角三角形。",
            "空間對角線：$D = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ 公分。",
            "（亦可直接套用通式：$\\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$ 公分）。"
          ]
        },
        tries: [
          {
            q: "正立方體共有 12 條稜邊。與其中某一條特定稜邊「互相歪斜」的稜邊共有幾條？",
            options: ["4 條", "3 條", "2 條", "6 條"],
            ans: 0,
            explain: "全體 12 條稜邊：扣除自身（1 條）、平行邊（3 條）、共面相交邊（4 條，兩端各連 2 條），剩下的恰好有 $12 - 1 - 3 - 4 = 4$ 條歪斜線！"
          },
          {
            q: "邊長為 6 公分的正四面體（四個面皆為正三角形），其任意兩條不相交的稜邊必定滿足什麼關係？",
            options: ["互相歪斜且垂直", "互相平行", "互相重合", "無法確定"],
            ans: 0,
            explain: "正四面體中任何一對對邊（不相交的兩稜邊）既不相交也不平行，是標準的歪斜線；在三維空間中它們更互相保持垂直！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "有一隻螞蟻要從長 4、寬 3、高 5 的封閉長方體木盒的一個頂點，沿著木盒表面爬行到最遠的對角頂點。請問螞蟻爬行的「最短路徑長度」是多少？",
        options: ["$\\sqrt{74}$", "$\\sqrt{50}$", "$\\sqrt{80}$", "12"],
        ans: 0,
        hint: "將長方體展開成平面，在展開圖上連成直線，比較三種展開組合！",
        explain: "將表面攤平展開有三種長寬組合：(1) $\\sqrt{(4+3)^2 + 5^2} = \\sqrt{49+25} = \\sqrt{74}$；(2) $\\sqrt{(4+5)^2 + 3^2} = \\sqrt{81+9} = \\sqrt{90}$；(3) $\\sqrt{(3+5)^2 + 4^2} = \\sqrt{64+16} = \\sqrt{80}$。最短路徑為 $\\sqrt{74} \\approx 8.6$。"
      }
    ],

    angles: [
      { title: "高架立交橋的歪斜立體交叉", body: "現代高速公路交流道與立體高架橋，如果兩條路都蓋在同一水平面上就必然發生平面相交車禍。交通工程師將一條抬高至二層、一條維持地面，兩條道路就在三維空間中化為「歪斜線」，互不干擾、永不相交！" },
      { title: "三維電腦圖學 (3D WebGL / Blender)", body: "在 3D 遊戲引擎中，物體的射線檢測（Raycasting）需要頻繁計算射線與平面的交點、判定兩相機視錐線是否歪斜，底層完全依賴空間向量叉積與直線平面幾何。" }
    ],

    where: {
      past: "七年級三視圖與八年級畢氏定理。",
      current: "九年級下學期拓展空間思維，認識歪斜線、直線與平面垂直，以及三維空間對角線通式。",
      next: "國中數學最後一個單元——「柱體與錐體表面積與體積計算」！"
    }
  });
})();
