/* 單元：5-1 相對與累積次數分配圖表 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "累積次數折線圖一路向上攀升");
    s("line", { x1: 50, y1: 160, x2: 360, y2: 160, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 50, y1: 160, x2: 50, y2: 30, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

    // 累積折線
    var pts = [[50, 160], [110, 140], [170, 105], [230, 60], [290, 35], [350, 35]];
    var dStr = "M " + pts[0][0] + " " + pts[0][1];
    for (var i = 1; i < pts.length; i++) {
      dStr += " L " + pts[i][0] + " " + pts[i][1];
      s("circle", { cx: pts[i][0], cy: pts[i][1], r: 4, fill: C.orange.s }, svg);
    }
    s("path", { d: dStr, stroke: C.orange.s, "stroke-width": 2.5, fill: "none" }, svg);
    SK.label(svg, 200, 25, "累積相對次數永遠只增不減，最終達 100\%", { size: 12, color: C.ink, bold: true });
    SK.label(svg, 350, 50, "100\%", { size: 12, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "cum-freq",
    en: "Relative and Cumulative Frequency Distributions",
    formula: "\\text{相對次數}(\\%) = \\frac{\\text{組次數}}{\\text{總次數}}\\times 100\%,\\quad \\text{累積至上限}",

    hook: {
      html: "當全校有 800 位考生參加模考時，只看「60~70 分有 160 人」很難直觀比較；但如果換算成「佔全校 20%」（相對次數），或是「未滿 70 分累積佔了 65%」（累積相對次數），就能一目了然自己在全體群體中的<b>排名落點</b>！",
      ask: "畫累積次數折線圖時，折線上的每個點到底應該點在該組的「組中點」還是「組上限」？",
      visual: hookVisual
    },

    guess: {
      q: "繪製「累積次數分配折線圖」時，折線上的各點坐標應該如何決定？",
      options: [
        { t: "橫坐標取「組上限」，縱坐標取「累積次數」", truth: true, explain: "因為「累積」代表包含該組及之前所有小於組上限的數值，所以點必須標在該組的最高界線——「組上限」！" },
        { t: "橫坐標取「組中點」，縱坐標取「該組次數」", common: true, explain: "這是普通的「次數分配折線圖」，不是「累積次數折線圖」。" },
        { t: "橫坐標取「組下限」，縱坐標取「累積次數」", explain: "組下限尚未計入該組的次數，標在組下限會漏算整組。" },
        { t: "橫坐標取「組距」，縱坐標取「平均數」", explain: "坐標定義完全不符。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整各組人數，動態看見次數分配表如何一步步累加成累積相對次數折線圖。",
      frames: [
        { cap: "相對次數（百分比）：該組次數除以全體總次數 $\\times 100\%$。消除樣本大小差異，便於不同班級相互比較。", tex: "\\text{相對次數} = \\frac{\\text{該組次數}}{\\text{總次數}} \\times 100\%" },
        { cap: "累積次數（以下）：由低分組向高分組一路往上加總，代表「未滿該組上限」的總人數。", tex: "\\text{累積次數}_k = \\sum_{i=1}^k f_i" },
        { cap: "累積折線圖的點位：橫坐標一律點在<b>該組上限</b>！最左端從第一組的組下限（次數為 0）開始起跑。", tex: "(\\text{組上限},\\ \\text{累積次數})" },
        { cap: "圖形特徵：累積折線圖的走勢<b>只升不降（非遞減）</b>，折線斜率越陡代表該組人數越密集，最終必收斂在 100\%。", tex: "\\text{最終點} = (\\text{最高組上限},\\ 100\%)" }
      ],
      hint: "折線圖坐標對比：普通次數折線圖點「組中點」，累積折線圖點「組上限」！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "累積頻率動態推導");
        var slGroup = SK.slider({ label: "觀察目標組 (1: 40~60, 2: 60~80, 3: 80~100)", min: 1, max: 3, step: 1, value: 2, color: "orange", fmt: function(v){ return "前 " + v + " 組累計"; }, onInput: draw });
        ctx.sliders.appendChild(slGroup.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var g = slGroup.value;
          var counts = [10, 25, 15]; // 總數 50
          var limits = [40, 60, 80, 100];
          var cum = 0;
          for (var i = 0; i < g; i++) cum += counts[i];
          var pct = ((cum / 50) * 100).toFixed(0);

          svg.innerHTML = "";
          // 坐標軸
          s("line", { x1: 50, y1: 200, x2: 400, y2: 200, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: 50, y1: 200, x2: 50, y2: 30, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 畫累積折線
          var cSum = 0;
          var lastPt = [50, 200];
          for (var j = 0; j < 3; j++) {
            cSum += counts[j];
            var px = 50 + (j + 1) * 100;
            var py = 200 - (cSum / 50) * 150;
            s("line", { x1: lastPt[0], y1: lastPt[1], x2: px, y2: py, stroke: j < g ? C.orange.s : C.soft, "stroke-width": 2.5 }, svg);
            s("circle", { cx: px, cy: py, r: 5, fill: j < g ? C.orange.s : C.soft }, svg);
            SK.label(svg, px, 218, String(limits[j+1]) + "分", { size: 12, color: C.ink });
            lastPt = [px, py];
          }

          read.innerHTML = SK.tex("\\text{未滿 " + limits[g] + " 分的累積人數為 }" + cum + "\\text{ 人，累積相對次數為 }\\frac{" + cum + "}{50} = " + pct + "\\%", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "讀取與計算累積相對次數",
        code: "D-8-1",
        demo: {
          q: "全班 40 人英文成績分組如下：40~60 分有 8 人，60~80 分有 24 人，80~100 分有 8 人。求：(1) 60~80 分的相對次數；(2) 未滿 80 分的累積相對次數。",
          steps: [
            "(1) 60~80 分相對次數：$\\frac{24}{40} \\times 100\% = 60\\%$。",
            "(2) 未滿 80 分累積次數：包含 40~60 分與 60~80 分，共 $8 + 24 = 32$ 人。",
            "累積相對次數：$\\frac{32}{40} \\times 100\% = 80\\%$。"
          ]
        },
        tries: [
          {
            q: "某校八年級學生身高累積相對次數折線圖中，150 公分對應 25%，160 公分對應 70%。請問身高在 150~160 公分之間的學生佔全校百分之幾？",
            options: ["45%", "95%", "25%", "70%"],
            ans: 0,
            explain: "該區間所佔百分比等於兩端點累積百分比相減：$70\\% - 25\\% = 45\\%$。"
          },
          {
            q: "某次數學小考 60 分以上（含 60 分）及格的同學佔了 75%，則未滿 60 分的累積相對次數是多少？",
            options: ["25%", "75%", "50%", "30%"],
            ans: 0,
            explain: "全體總和為 100\%。及格佔 75%，不及格（未滿 60 分）即為 $100\% - 75\\% = 25\\%$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知某班 50 位同學體重次數分配表中，40~50 公斤有 10 人，50~60 公斤有 $x$ 人，60~70 公斤有 18 人，70~80 公斤有 6 人。若未滿 60 公斤的累積相對次數為 52%，求 $x$ 的值是多少？",
        options: ["16", "26", "12", "18"],
        ans: 0,
        hint: "未滿 60 公斤累積人數為 $50 \\times 52\\% = 26$ 人。",
        explain: "未滿 60 公斤的總人數為 $50 \\times 0.52 = 26$ 人。累積人數包含 40~50 公斤與 50~60 公斤兩組：$10 + x = 26 \\implies x = 16$。"
      }
    ],

    angles: [
      { title: "國中會考 PR 值的本質", body: "每年國中教育會考公布的「百分等級 PR 值（Percentile Rank）」，本質就是累積相對次數的直接應用！PR 85 就代表你的成績贏過全台灣約 85% 的應屆考生。" },
      { title: "統計學中的累積分布函數 (CDF)", body: "到了大學機率論與大數據分析，累積相對次數折線圖被平滑抽象為「累積分布函數（Cumulative Distribution Function）」，是常態分佈、信賴區間與假設檢定的基底核心。" }
    ],

    where: {
      past: "七年級單純的次數分配圖表與三大集中趨勢量（平均數、中位數、眾數）。",
      current: "八年級掌握相對百分比與累積折線圖，精確評估個別資料在全體中的相對百分排位。",
      next: "九年級將由此進一步引出切分 25%、50%、75% 的「四分位數」與「盒狀圖」！"
    }
  });
})();
