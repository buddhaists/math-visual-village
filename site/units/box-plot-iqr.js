/* 單元：2-1 統計數據的分布 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "五數綜合與盒狀圖");
    s("line", { x1: 40, y1: 150, x2: 360, y2: 150, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

    // 盒狀圖本體
    s("rect", { x: 120, y: 70, width: 140, height: 50, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("line", { x1: 190, y1: 70, x2: 190, y2: 120, stroke: C.red.s, "stroke-width": 2.5 }, svg); // Q2 中位數

    // 左右鬍鬚
    s("line", { x1: 60, y1: 95, x2: 120, y2: 95, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("line", { x1: 60, y1: 80, x2: 60, y2: 110, stroke: C.cocoa, "stroke-width": 2 }, svg); // Min
    s("line", { x1: 260, y1: 95, x2: 330, y2: 95, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("line", { x1: 330, y1: 80, x2: 330, y2: 110, stroke: C.cocoa, "stroke-width": 2 }, svg); // Max

    SK.label(svg, 60, 65, "Min", { size: 11, color: C.soft });
    SK.label(svg, 120, 60, "Q1 (25%)", { size: 11, color: C.orange.s, bold: true });
    SK.label(svg, 190, 55, "Q2 (50%)", { size: 12, color: C.red.s, bold: true });
    SK.label(svg, 260, 60, "Q3 (75%)", { size: 11, color: C.blue.s, bold: true });
    SK.label(svg, 330, 65, "Max", { size: 11, color: C.soft });

    SK.label(svg, 200, 185, "IQR = Q3 - Q1 (中間 50% 核心資料跨度)", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "box-plot-iqr",
    en: "Data Distribution and Box Plots",
    formula: "\\text{IQR} = Q_3 - Q_1,\\quad \\text{五數綜合: }\\{Min, Q_1, Q_2, Q_3, Max\\}",

    hook: {
      html: "當你拿到全班段考成績時，單看平均數往往看不到「成績是否兩極化」或「大部分同學集中在哪個分數帶」。統計學家約翰·圖基（John Tukey）發明了著名的<b>盒狀圖（Box Plot）</b>：把數據切成四等份，用一個箱子與兩條鬍鬚，一眼看透全班成績的<b>分散與集中分布</b>！",
      ask: "為什麼「四分位距 IQR」比「全距（Max - Min）」更能客觀描述數據的分散程度？它如何免疫極端值的干擾？",
      visual: hookVisual
    },

    guess: {
      q: "已知某班成績的盒狀圖中，$Q_1 = 52, Q_2 = 68, Q_3 = 80$。請問下列哪一個敘述必定正確？",
      options: [
        { t: "全班至少有 50% 的同學成績在 52 分到 80 分之間", truth: true, explain: "$Q_1$ 是第 25 百分位數，$Q_3$ 是第 75 百分位數。盒狀圖箱子涵蓋了從 25% 到 75% 的範圍，恰好鎖定全體「中間 50%」的核心資料跨度！" },
        { t: "全班有恰好一半的人及格（>=60分）", common: true, explain: "中位數 $Q_2 = 68 > 60$，代表超過一半的人及格。" },
        { t: "四分位距 IQR 等於 68", explain: "$\\text{IQR} = Q_3 - Q_1 = 80 - 52 = 28$。" },
        { t: "平均分數必定是 68 分", explain: "中位數不等於平均數。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整數據分布的偏態，觀察五數綜合指標與盒狀圖的箱體壓縮伸展。",
      frames: [
        { cap: "五數綜合：將數據由小到大排列後，取：<b>最小值（Min）、第一四分位數（$Q_1$）、中位數（$Q_2$）、第三四分位數（$Q_3$）、最大值（Max）</b>。", tex: "\\{\\min, Q_1, Q_2, Q_3, \\max\\}" },
        { cap: "四分位數算法：設有 $n$ 筆資料。求 $Q_k$ 時算 $n \\times \\frac{k}{4}$。<br>• 若為整數，取該項與下一項的平均<br>• 若非整數，無條件進位取該整數項！", tex: "Q_k = \\text{切分 } 25\\%, 50\\%, 75\\%" },
        { cap: "四分位距（IQR）：$\\text{IQR} = Q_3 - Q_1$。代表中間 50% 數據的跨度範圍，<b>完全不受極端值影響</b>，最具穩健代表性。", tex: "\\text{IQR} = Q_3 - Q_1" },
        { cap: "盒狀圖判讀：四個區間（Min~Q1, Q1~Q2, Q2~Q3, Q3~Max）各自容納了約 <b>25% 的資料筆數</b>！區間越短代表資料越密集！", tex: "\\text{每段均佔約 25\\% 筆數}" }
      ],
      hint: "讀盒狀圖關鍵：線段長度長代表「數據分散跨度大」，線段短代表「數據極度密集擠在一起」！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "盒狀圖動態模擬");
        var slIQR = SK.slider({ label: "核心區間跨度 IQR", min: 20, max: 60, step: 10, value: 30, color: "orange", fmt: function(v){ return v + " 分"; }, onInput: draw });
        ctx.sliders.appendChild(slIQR.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var iqr = slIQR.value;
          var q2 = 60;
          var q1 = q2 - iqr / 2;
          var q3 = q2 + iqr / 2;
          var minV = Math.max(0, q1 - 20);
          var maxV = Math.min(100, q3 + 20);
          var ox = 40, oy = 110, sc = 3.2;
          svg.innerHTML = "";

          // 軸
          s("line", { x1: ox, y1: 170, x2: ox + 100 * sc, y2: 170, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 箱子
          s("rect", { x: ox + q1 * sc, y: 70, width: iqr * sc, height: 60, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // Q2 中位線
          s("line", { x1: ox + q2 * sc, y1: 70, x2: ox + q2 * sc, y2: 130, stroke: C.red.s, "stroke-width": 2.5 }, svg);

          // 鬍鬚
          s("line", { x1: ox + minV * sc, y1: 100, x2: ox + q1 * sc, y2: 100, stroke: C.cocoa, "stroke-width": 2 }, svg);
          s("line", { x1: ox + q3 * sc, y1: 100, x2: ox + maxV * sc, y2: 100, stroke: C.cocoa, "stroke-width": 2 }, svg);

          SK.label(svg, ox + q1 * sc, 55, "Q1=" + q1, { size: 12, color: C.orange.s, bold: true });
          SK.label(svg, ox + q2 * sc, 55, "Q2=" + q2, { size: 12, color: C.red.s, bold: true });
          SK.label(svg, ox + q3 * sc, 55, "Q3=" + q3, { size: 12, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{四分位距 }\\text{IQR} = Q_3 - Q_1 = " + q3 + " - " + q1 + " = " + iqr + "，\\text{全距 } = " + maxV + " - " + minV + " = " + (maxV - minV), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求四分位數與四分位距",
        code: "D-9-1",
        demo: {
          q: "已知某小組 12 位學生的測驗分數如下：$45, 52, 58, 62, 65, 70, 72, 75, 80, 85, 90, 95$。求此組數據的 $Q_1, Q_2, Q_3$ 及四分位距 IQR。",
          steps: [
            "數據已排序，總筆數 $n = 12$。",
            "求 $Q_1$：$12 \\times 25\\% = 3$（整數），取第 3 項與第 4 項平均：$\\frac{58 + 62}{2} = 60$。",
            "求 $Q_2$（中位數）：$12 \\times 50\\% = 6$（整數），取第 6 項與第 7 項平均：$\\frac{70 + 72}{2} = 71$。",
            "求 $Q_3$：$12 \\times 75\\% = 9$（整數），取第 9 項與第 10 項平均：$\\frac{80 + 85}{2} = 82.5$。",
            "求四分位距：$\\text{IQR} = Q_3 - Q_1 = 82.5 - 60 = 22.5$。"
          ]
        },
        tries: [
          {
            q: "某組數據由小到大排列共有 15 筆，則這組數據的第三四分位數 $Q_3$ 是第幾筆資料？",
            options: ["第 12 筆", "第 11 筆", "第 11 與 12 筆的平均", "第 13 筆"],
            ans: 0,
            explain: "計算位置：$15 \\times \\frac{3}{4} = 11.25$。因為不是整數，依規定無條件進位取下一個整數，因此 $Q_3$ 就是「第 12 筆」資料！"
          },
          {
            q: "若一組數據的最小值為 15，最大值為 95，$Q_1 = 35, Q_3 = 75$。則這組數據的全距與四分位距分別是多少？",
            options: ["全距 80，IQR 40", "全距 40，IQR 80", "全距 95，IQR 35", "全距 80，IQR 75"],
            ans: 0,
            explain: "全距 $= \\max - \\min = 95 - 15 = 80$；四分位距 $\\text{IQR} = Q_3 - Q_1 = 75 - 35 = 40$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若甲班與乙班人數相同，盒狀圖顯示甲班的箱子長度（IQR）只有 10 分，而乙班的箱子長度（IQR）有 35 分。下列哪一個推論最為合理？",
        options: [
          "甲班中間 50% 學生的成績比乙班更為集中",
          "甲班的平均成績一定比乙班高",
          "甲班的最高分一定比乙班低",
          "乙班的及格人數一定比甲班少"
        ],
        ans: 0,
        hint: "箱子長度代表 IQR（四分位距），跨度越小代表中間 50% 的同學分數越緊密集中！",
        explain: "IQR 衡量的是中間 50% 核心資料的離散程度。甲班 $\\text{IQR} = 10$ 遠小於乙班的 35，說明甲班中間半數同學的實力非常接近、成績高度集中；而平均分或及格人數無法單從箱子長度推斷。"
      }
    ],

    angles: [
      { title: "統計極端值檢測（Outlier 法則）", body: "大數據分析與金融詐欺偵測中，如何自動識別異常值？統計學標準定義：超過箱子邊緣 $1.5$ 倍 IQR 之外的點（即 $< Q_1 - 1.5\\text{IQR}$ 或 $> Q_3 + 1.5\\text{IQR}$），就被判定為「極端異常值（Outlier）」，在盒狀圖中以獨立星號標出！" },
      { title: "跨班級橫向績效評估", body: "大學聯考或跨校模考分析報告中，常將各班的盒狀圖水平並列排開。評鑑委員無須看數百頁成績單，只需 5 秒鐘就能比較出哪個班級實力均勻、哪個班級雙峰兩極分化。" }
    ],

    where: {
      past: "七年級平均數、中位數與八年級累積相對次數分配。",
      current: "九年級下學期掌握五數綜合、四分位距 IQR 與盒狀圖的穩健資料分布分析。",
      next: "下一節將探討隨機世界中的可能性量化——「古典機率與樹狀圖」！"
    }
  });
})();
