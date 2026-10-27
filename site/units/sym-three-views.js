/* 單元：6-1 線對稱與三視圖 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "線對稱與空間視圖");
    // 左側線對稱
    s("line", { x1: 100, y1: 20, x2: 100, y2: 180, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4,4" }, svg);
    s("polygon", { points: "40,60 90,40 90,160 50,140", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    s("polygon", { points: "160,60 110,40 110,160 150,140", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 100, 192, "對稱軸平分垂線", { size: 12, color: C.orange.s, bold: true });

    // 右側立體積木與前視圖
    s("rect", { x: 250, y: 70, width: 40, height: 40, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 290, y: 70, width: 40, height: 40, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 250, y: 30, width: 40, height: 40, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 310, 150, "正視圖（由前往後看）", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "sym-three-views",
    en: "Line Symmetry and Three-View Drawings",
    formula: "\\text{對稱軸垂直平分對稱點連線段},\\quad \\text{前視圖、上視圖、右視圖}",

    hook: {
      html: "蝴蝶展翅、剪紙窗花、古代宮殿建築，無一不展現和諧對稱的平衡美；而在建築製圖與 3D 建模中，工程師透過<b>前視圖（正視圖）、上視圖（俯視圖）、右視圖（側視圖）</b>三張 2D 平面圖，就能精確還原複雜的 3D 立體結構！",
      ask: "沿著一條直線對摺能完全重疊的圖形，其對稱軸與對稱點連線有什麼關鍵幾何定理？",
      visual: hookVisual
    },

    guess: {
      q: "下列英文字母中，哪一個「同時具備水平與鉛直兩條對稱軸」？",
      options: [
        { t: "H", truth: true, explain: "字母 H 有一條左右鉛直對稱軸，還有一條上下水平對稱軸，共 2 條對稱軸！" },
        { t: "A", explain: "字母 A 只有一條鉛直對稱軸。" },
        { t: "E", explain: "字母 E 只有一條水平對稱軸。" },
        { t: "N", common: true, explain: "字母 N 是中心對稱圖形（旋轉 180 度重合），但不是線對稱圖形！" }
      ]
    },

    derive: {
      intro: "拖動滑桿觀察對稱點鏡射與三視圖視角切換的幾何原理。",
      frames: [
        { cap: "線對稱圖形：沿著一條直線對摺後，直線兩側的部分能完全重合。這條直線稱為<b>對稱軸</b>。", tex: "\\text{對摺後完全重疊}" },
        { cap: "對稱核心定理：<b>對稱軸垂直平分對稱點所連成的線段</b>。對稱點到對稱軸的垂直距離相等。", tex: "L \\perp \\overline{PP'}\\ \\text{且平分 }\\overline{PP'}" },
        { cap: "幾何圖形對稱軸數：等腰三角形 1 條、長方形 2 條、等邊三角形 3 條、正方形 4 條、圓有無數條。", tex: "\\text{正 }n\\text{ 邊形恰有 }n\\text{ 條對稱軸}" },
        { cap: "三視圖投影：工程上的正投影，由前向後為前視圖（長與高），由上往下為上視圖（長與寬），由右向左為右視圖（寬與高）。", tex: "\\text{長對正、高平齊、寬相等}" }
      ],
      hint: "數立體積木題目時，善用「由上往下看在上視圖每個格子填上該柱積木層數」的標數法，絕不漏算！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "線對稱與投影推導");
        var slDist = SK.slider({ label: "對稱點離軸距離 d", min: 20, max: 80, step: 10, value: 50, color: "orange", fmt: function(v){ return v + " px"; }, onInput: draw });
        ctx.sliders.appendChild(slDist.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var d = slDist.value;
          var ox = 220, oy = 130;
          svg.innerHTML = "";
          // 對稱軸 L
          s("line", { x1: ox, y1: 20, x2: ox, y2: 240, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "5,5" }, svg);
          SK.label(svg, ox + 15, 35, "對稱軸 L", { size: 12, color: C.orange.s, bold: true });

          // P 與 P'
          var p1x = ox - d, p2x = ox + d;
          s("line", { x1: p1x, y1: oy, x2: p2x, y2: oy, stroke: C.blue.s, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);
          s("circle", { cx: p1x, cy: oy, r: 6, fill: C.blue.s }, svg);
          SK.label(svg, p1x, oy - 15, "P", { size: 14, color: C.blue.s, bold: true });
          s("circle", { cx: p2x, cy: oy, r: 6, fill: C.blue.s }, svg);
          SK.label(svg, p2x, oy - 15, "P'", { size: 14, color: C.blue.s, bold: true });

          // 垂直符號
          s("rect", { x: ox - 10, y: oy - 10, width: 10, height: 10, fill: "none", stroke: C.cocoa }, svg);

          read.innerHTML = SK.tex("L\\perp \\overline{PP'}，\\text{左距離 }d=" + d + " = \\text{右距離 }d'=" + d + "，\\text{對稱軸即為 }\\overline{PP'}\\text{ 的垂直平分線（中垂線）！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "判斷對稱軸條數與對稱點坐標",
        code: "S-7-3",
        demo: {
          q: "坐標平面上，點 $P(3, -5)$ 關於 $y$ 軸的對稱點為 $Q$，求 $Q$ 點坐標。",
          steps: [
            "關於 $y$ 軸對稱：垂直距離由橫坐標決定，$y$ 軸為鉛直線，橫坐標變相反數，縱坐標維持不變。",
            "橫坐標 $3 \\implies -3$；縱坐標不變仍然為 $-5$。",
            "因此對稱點 $Q$ 的坐標為 $(-3, -5)$。"
          ]
        },
        tries: [
          {
            q: "下列哪一個常見的幾何圖形「恰有 4 條對稱軸」？",
            options: ["正方形", "長方形", "菱形", "正三角形"],
            ans: 0,
            explain: "正方形有 2 條對邊中點連線與 2 條對角線，共 4 條對稱軸；長方形有 2 條，菱形有 2 條，正三角形有 3 條。"
          },
          {
            q: "由若干個相同大小正立方體積木堆疊而成的立體，從正前方看是 2 列 3 欄，從右方看是 2 列 2 欄。請問最少需要多少個積木？",
            options: ["4 個", "5 個", "6 個", "3 個"],
            ans: 0,
            explain: "前視圖與右視圖的最高層數必須匹配。最少時可將積木放置在交錯位置，最少僅需 4 塊積木即可同時滿足前視與右視圖。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知點 $A(a, 4)$ 與點 $B(-3, b)$ 關於直線 $x = 1$ 對稱，求 $a + b$ 的值是多少？",
        options: ["9", "5", "7", "1"],
        ans: 0,
        hint: "垂直平分線 $x = 1$ 代表兩點縱坐標相同，且橫坐標的中點為 1。",
        explain: "因為對稱軸為鉛直線 $x = 1$：(1) 縱坐標相等 $\\implies b = 4$；(2) 對稱軸為中垂線，中點橫坐標為 $1 \\implies \\frac{a + (-3)}{2} = 1 \\implies a - 3 = 2 \\implies a = 5$。因此 $a + b = 5 + 4 = 9$。"
      }
    ],

    angles: [
      { title: "鏡子反射與最短路徑（海龍公式與台球問題）", body: "桌球選手打出母球撞擊庫邊反彈擊中目標球，其入射角等於反射角。在幾何上只要把目標球作關於邊框的「對稱點」，兩點連成直線就是最短行進路徑！" },
      { title: "CAD 工程製圖與立體視角", body: "工業設計軟體（如 SolidWorks、AutoCAD）畫零件時，標準三視圖是全球機械加工廠通用的共通語言，確保工廠師傅能 100% 精準無誤地依照圖紙車削出工件。" }
    ],

    where: {
      past: "七年級學習數線、坐標與平面圖形幾何初探。",
      current: "透過摺紙線對稱與 3D 積木三視圖，建立強大的空間感與幾何變換思維。",
      next: "八年級將正式進入歐幾里得幾何系統：尺規作圖、全等三角形與平行線嚴密論證！"
    }
  });
})();
