/* 單元：2-2 古典機率與樹狀圖 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "樹狀圖分支展開所有可能");
    // 拋硬幣兩次樹狀圖
    s("circle", { cx: 60, cy: 100, r: 6, fill: C.ink }, svg);
    SK.label(svg, 40, 100, "開始", { size: 12, color: C.ink });

    // 第一次
    s("line", { x1: 60, y1: 100, x2: 150, y2: 60, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("line", { x1: 60, y1: 100, x2: 150, y2: 140, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 160, 60, "正 (H)", { size: 12, color: C.orange.s, bold: true });
    SK.label(svg, 160, 140, "反 (T)", { size: 12, color: C.blue.s, bold: true });

    // 第二次
    s("line", { x1: 175, y1: 60, x2: 260, y2: 40, stroke: C.orange.s }, svg);
    s("line", { x1: 175, y1: 60, x2: 260, y2: 80, stroke: C.blue.s }, svg);
    s("line", { x1: 175, y1: 140, x2: 260, y2: 120, stroke: C.orange.s }, svg);
    s("line", { x1: 175, y1: 140, x2: 260, y2: 160, stroke: C.blue.s }, svg);

    SK.label(svg, 300, 40, "(正, 正)", { size: 12, color: C.ink });
    SK.label(svg, 300, 80, "(正, 反)", { size: 12, color: C.ink });
    SK.label(svg, 300, 120, "(反, 正)", { size: 12, color: C.ink });
    SK.label(svg, 300, 160, "(反, 反)", { size: 12, color: C.ink });

    SK.label(svg, 200, 190, "4 種機會均等的結果，每種機率 1/4", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "classical-prob",
    en: "Classical Probability and Tree Diagrams",
    formula: "P(A) = \\frac{n(A)}{n(S)},\\quad 0 \\le P(A) \\le 1",

    hook: {
      html: "擲一顆公正的六面骰子，每一面朝上的機會完全相等；同時擲兩枚硬幣，「一正一反」的機率真的是 $\\frac{1}{3}$ 嗎？法國數學家巴斯卡與費馬在通信中透過<b>樹狀圖逐層展開所有可能性</b>，創立了度量不確定未來的科學——<b>古典機率</b>！",
      ask: "為什麼同時擲兩枚均勻硬幣，「一正一反」的機率其實是 2/4（即 1/2），而不是 1/3？",
      visual: hookVisual
    },

    guess: {
      q: "同時投擲兩顆公正骰子，出現的點數和大於 10 的機率是多少？",
      options: [
        { t: "1 / 12 (即 3/36)", truth: true, explain: "所有樣本空間共有 $6 \\times 6 = 36$ 種可能。點數和大於 10（即 11 或 12）的組合為：(5,6)、(6,5)、(6,6) 共 3 種。因此機率為 $\\frac{3}{36} = \\frac{1}{12}$！" },
        { t: "1 / 18 (即 2/36)", common: true, explain: "漏算了 (6, 5) 與 (5, 6) 是兩種不同的骰子搭配順序。" },
        { t: "1 / 6", explain: "誤以為大於 10 有 6 種可能。" },
        { t: "1 / 9", explain: "計算約分錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整擲骰子或擲硬幣事件，動態計算有利結果佔全體樣本空間的機率比值。",
      frames: [
        { cap: "古典機率的基石：樣本空間中每一種結果發生的<b>機會均等</b>。事件 $A$ 的機率為有利結果個數除以總結果數。", tex: "P(A) = \\frac{n(A)}{n(S)}" },
        { cap: "機率的範圍：任何事件的機率必介於 0 與 1 之間（$0 \\le P(A) \\le 1$）。不可能事件機率為 0，必然事件機率為 1。", tex: "P(\\text{不可能事件}) = 0,\\quad P(\\text{必然事件}) = 1" },
        { cap: "樹狀圖分支法：按實驗的先後順序逐層分支展開，能確保<b>不重複、不遺漏</b>地列出所有可能的樣本點！", tex: "\\text{樹狀圖全面列舉}" },
        { cap: "餘事件性質（正面難攻則反向包抄）：事件發生的機率等於 1 減去「它不發生」的機率：$P(A) = 1 - P(A')$！", tex: "P(A) = 1 - P(A')" }
      ],
      hint: "解多骰子或多硬幣題目的黃金守則：把物品標上號碼（硬幣甲、硬幣乙），視為不同個體列舉，絕不漏解！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "機率樹狀動態推導");
        var slHead = SK.slider({ label: "硬幣正面個數需求 (0~2)", min: 0, max: 2, step: 1, value: 1, color: "orange", fmt: function(v){ return "恰好 " + v + " 個正面"; }, onInput: draw });
        ctx.sliders.appendChild(slHead.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var targetH = slHead.value;
          var outcomes = [
            { name: "(正, 正)", h: 2 },
            { name: "(正, 反)", h: 1 },
            { name: "(反, 正)", h: 1 },
            { name: "(反, 反)", h: 0 }
          ];
          var matchCount = outcomes.filter(function(o){ return o.h === targetH; }).length;

          svg.innerHTML = "";
          for (var i = 0; i < 4; i++) {
            var isMatch = outcomes[i].h === targetH;
            s("rect", { x: 70 + (i % 2) * 160, y: 50 + Math.floor(i / 2) * 70, width: 130, height: 50, rx: 8, fill: isMatch ? C.gold.f : "#fff", stroke: isMatch ? C.gold.s : C.cocoa, "stroke-width": isMatch ? 2.5 : 1 }, svg);
            SK.label(svg, 135 + (i % 2) * 160, 80 + Math.floor(i / 2) * 70, outcomes[i].name, { size: 14, color: isMatch ? C.orange.s : C.soft, bold: isMatch });
          }

          var prob = (matchCount / 4);
          read.innerHTML = SK.tex("\\text{投擲兩枚硬幣：符合【恰好 " + targetH + " 個正面】的結果共有 " + matchCount + " 種，機率 } P = \\frac{" + matchCount + "}{4} = " + prob.toFixed(2), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用樣本空間與樹狀圖求機率",
        code: "D-9-3",
        demo: {
          q: "袋子中有紅球 3 顆、白球 2 顆，每顆球被取出的機會均等。隨機取出一球，求：(1) 取出紅球的機率；(2) 取出黃球的機率。",
          steps: [
            "袋中球的總數：$3 + 2 = 5$ 顆。",
            "(1) 紅球有 3 顆，機率 $P(\\text{紅球}) = \\frac{3}{5}$。",
            "(2) 袋中沒有黃球（不可能事件），機率 $P(\\text{黃球}) = \\frac{0}{5} = 0$。"
          ]
        },
        tries: [
          {
            q: "同時投擲兩枚公正的硬幣，出現「至少一個正面」的機率是多少？",
            options: ["3 / 4", "1 / 2", "1 / 4", "2 / 3"],
            ans: 0,
            explain: "利用餘事件：所有結果 4 種，只有 (反, 反) 這一種情況沒有正面。因此機率為 $1 - \\frac{1}{4} = \\frac{3}{4}$。"
          },
          {
            q: "一個家庭有 3 個孩子，若生男與生女機會均等，則這 3 個孩子「恰有 2 個女孩」的機率是多少？",
            options: ["3 / 8", "1 / 4", "1 / 2", "1 / 8"],
            ans: 0,
            explain: "總可能結果為 $2^3 = 8$ 種。恰有 2 女 1 男的排列組合為：(女,女,男)、(女,男,女)、(男,女,女) 共 3 種。機率為 $\\frac{3}{8}$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "連續擲一顆公正骰子兩次，第一次點數為 $a$，第二次點數為 $b$。則一元二次方程式 $x^2 - ax + b = 0$ 有「實數解」的機率是多少？",
        options: ["19 / 36", "17 / 36", "1 / 2", "5 / 12"],
        ans: 0,
        hint: "有實數解代表判別式 $D = a^2 - 4b \\ge 0 \\implies a^2 \\ge 4b$！列出符合條件的 $(a, b)$ 配對！",
        explain: "總可能數 36 種。條件 $a^2 \\ge 4b$：當 $a=1, 2$ 時 $a^2 \\le 4$，只有 $(2, 1)$ 共 1 種；當 $a=3$，$9 \\ge 4b \\implies b=1, 2$（2 種）；當 $a=4$，$16 \\ge 4b \\implies b=1,2,3,4$（4 種）；當 $a=5$，$25 \\ge 4b \\implies b=1..6$（6 種）；當 $a=6$，$36 \\ge 4b \\implies b=1..6$（6 種）。總共 $1 + 2 + 4 + 6 + 6 = 19$ 種。機率為 $\\frac{19}{36}$！"
      }
    ],

    angles: [
      { title: "蒙地卡羅方法算圓周率", body: "電腦隨機朝一個內切於正方形的圓形靶投擲 100 萬個隨機點 $(x, y)$，落在圓內的點數佔總點數的比例，根據機率幾何型剛好等於 $\\frac{\\pi r^2}{(2r)^2} = \\frac{\\pi}{4}$！電腦就是靠這套「蒙地卡羅法（Monte Carlo）」估算出高精度的 $\\pi$ 值與核反應堆中子擴散機率！" },
      { title: "三門問題（Monty Hall Problem）的思維衝擊", body: "美國電視節目讓參賽者猜三扇門後的大獎。主持人打開一扇山羊門後問：「你要不要換一扇門？」直覺以為換與不換機率都是 1/2，但機率論證明：選擇「換門」的人中獎機率立刻翻倍成 2/3！" }
    ],

    where: {
      past: "整數分數除法比值與樹狀圖列舉。",
      current: "九年級掌握機會均等下的古典機率公式、餘事件原理與多步驟獨立試驗樹狀圖。",
      next: "第三章最後單元將躍升進入三維空間——「空間中的線與面、柱體與錐體展開圖」！"
    }
  });
})();
