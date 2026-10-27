/* 單元：3-3 一元一次方程式應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "線段圖解文字題");
    s("line", { x1: 50, y1: 90, x2: 350, y2: 90, stroke: C.cocoa, "stroke-width": 3 }, svg);
    s("circle", { cx: 50, cy: 90, r: 6, fill: C.blue.s }, svg);
    s("circle", { cx: 230, cy: 90, r: 6, fill: C.orange.s }, svg);
    s("circle", { cx: 350, cy: 90, r: 6, fill: C.green.s }, svg);
    SK.label(svg, 50, 65, "甲地", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 230, 65, "相遇點", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 350, 65, "乙地", { size: 14, color: C.green.s, bold: true });
    SK.brace(svg, 50, 110, 230, 110, 10, C.blue.s);
    SK.label(svg, 140, 135, "小明走的距離", { size: 13, color: C.blue.s });
    SK.brace(svg, 230, 110, 350, 110, 10, C.green.s);
    SK.label(svg, 290, 135, "小華走的距離", { size: 13, color: C.green.s });
    SK.label(svg, 200, 175, "總距離 = 速率和 × 相遇時間", { size: 14, color: C.cocoa, bold: true });
  }

  SK.mountUnit({
    slug: "linear-eq-1-app",
    en: "Applications of Linear Equations in One Variable",
    formula: "\\text{設未知數 } x \\to \\text{依題意列式 } ax+b=c \\to \\text{求解並檢驗合理性}",

    hook: {
      html: "列方程式解應用題就像<b>福爾摩斯破案</b>：先把題目中不知道的核心線索設為 $x$，再根據題目給的平衡條件列出等式，最後解開謎團。折扣、年齡、分糖果、追趕問題全都能一網打盡！",
      ask: "解出方程式後，為什麼一定要做「檢驗」？算出來的數學答案會不合常理嗎？",
      visual: hookVisual
    },

    guess: {
      q: "某件夾克照成本加四成作為定價，再打八折出售，賣出後獲利 240 元。若設成本為 $x$ 元，下列哪一個方程式完全正確？",
      options: [
        { t: "$x\\times(1 + 0.4)\\times 0.8 - x = 240$", truth: true, explain: "加四成定價為 $1.4x$，打八折售價為 $1.4x\\times 0.8$；售價扣掉成本 $x$ 等於獲利 240 元！" },
        { t: "$x\\times 0.4\\times 0.8 = 240$", common: true, explain: "定價是「成本加四成」即 $1.4x$，而不是只有四成 $0.4x$。" },
        { t: "$1.4x - 0.8x = 240$", explain: "打八折是指「定價的八折」即乘上 0.8，不能拆開相減。" },
        { t: "$x - 1.4x\\times 0.8 = 240$", explain: "減法順序顛倒了，售價大於成本才是獲利。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整情境中的購買數量或定價比例，體會現實問題與代數方程的轉換鏈。",
      frames: [
        { cap: "四步解題法：1. <b>設未知數</b>（寫明單位）；2. <b>找相等關係列式</b>；3. <b>解方程式</b>；4. <b>驗算並作答</b>。", tex: "\\text{審題} \\to \\text{設 } x \\to \\text{列式} \\to \\text{求解} \\to \\text{驗算}" },
        { cap: "折扣買賣問題：定價 $=$ 成本 $\\times(1+\\text{成數})$；售價 $=$ 定價 $\\times\\text{折數}$；獲利（利潤）$=$ 售價 $-$ 成本。", tex: "\\text{利潤} = \\text{售價} - \\text{成本}" },
        { cap: "盈虧分配問題：人數與物品分配。兩種分法物品總量相等，透過兩式等號列出方程式。", tex: "\\text{每人分 }3\\text{ 個餘 }4 = \\text{每人分 }4\\text{ 個不足 }2" },
        { cap: "速率距離問題：$\\text{距離}=\\text{速率}\\times\\text{時間}$。相向而行相遇時，兩者距離和等於總長。", tex: "S_{\\text{甲}} + S_{\\text{乙}} = S_{\\text{總}}" }
      ],
      hint: "解完應用題必須檢驗合理性：人數、個數不能是小數或負數；長度、時間不能是負數。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "應用題圖解");
        var slC = SK.slider({ label: "成本 x", min: 500, max: 2000, step: 100, value: 1000, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var c = slC.value;
          var tag = c * 1.4, sell = tag * 0.8, profit = sell - c;
          svg.innerHTML = "";
          s("rect", { x: 50, y: 50, width: 340, height: 130, rx: 14, fill: profit >= 0 ? C.green.f : C.pink.f, stroke: profit >= 0 ? C.green.s : C.pink.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 85, "成本: " + c + " 元 ➔ 定價: " + tag + " 元", { size: 15, color: C.ink });
          SK.label(svg, 220, 115, "打八折售價: " + sell + " 元", { size: 16, color: C.blue.s, bold: true });
          SK.label(svg, 220, 150, "利潤: " + profit + " 元 (" + (profit >= 0 ? "賺" : "賠") + ")", { size: 18, color: profit >= 0 ? C.green.s : C.pink.s, bold: true });
          read.innerHTML = SK.tex("x = " + c + "\\implies \\text{售價 }1.4(" + c + ")\\times 0.8 = " + sell + ",\\quad \\text{獲利 } " + profit + "\\text{ 元}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "經典應用題：盈虧分配與速率",
        code: "A-7-3",
        demo: {
          q: "老師將一包糖果分給學生，若每人分 4 顆，則剩下 12 顆；若每人分 6 顆，則不足 8 顆。求學生有多少人？糖果共有幾顆？",
          steps: [
            "設學生有 $x$ 人。",
            "糖果總數以第一種分法表示為 $4x + 12$ 顆；以第二種分法表示為 $6x - 8$ 顆。",
            "糖果總數相等列式：$4x + 12 = 6x - 8$。",
            "移項解得：$2x = 20 \\implies x = 10$（人）。",
            "代入求糖果總數：$4(10) + 12 = 52$（顆）。"
          ]
        },
        tries: [
          {
            q: "父親今年 42 歲，兒子今年 12 歲。請問幾年後，父親的年齡會恰好是兒子年齡的 3 倍？",
            hint: "設 $x$ 年後，父親為 $42+x$ 歲，兒子為 $12+x$ 歲。",
            ans: "$42 + x = 3(12 + x) \\implies 42 + x = 36 + 3x \\implies 2x = 6 \\implies x = 3$ 年後。"
          },
          {
            q: "甲、乙兩地相距 300 公里。大巴從甲地以時速 60 公里開出，轎車從乙地以時速 90 公里同時相向開出。兩車出發幾小時後會相遇？",
            hint: "設 $t$ 小時後相遇，相遇時兩車行駛的距離和等於總距離 300 公里。",
            ans: "$60t + 90t = 300 \\implies 150t = 300 \\implies t = 2$ 小時。"
          }
        ],
        edge: "算出負數解或非整數解時要特別警覺！若算出的學生人數是 $10.5$ 人或車票張數是 $-3$ 張，代表列式矛盾或無解，必須寫出不合理理由。"
      }
    ],

    angles: [
      {
        title: "設誰為 x 的智慧",
        icon: "sparkle",
        html: "應用題中通常設「題目最後所問的量」為 $x$；但有時候設「較小的基礎量」為 $x$ 會讓列式完全沒有分數，計算更加輕鬆。例如比大數小數時，設小數為 $x$，大數就是 $x+k$。"
      },
      {
        title: "表格化整理資訊",
        icon: "leaf",
        html: "遇到複雜情境（如折扣題或兩種購買方案），在紙上畫出表格：列出「原價、折扣、售價、數量」四欄，把已知填進去、未知填 $x$，方程式自然從表格的橫列或直欄浮現出來。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "某數的 4 倍加 7 等於該數的 6 倍減 9，求此數。",
        hint: "設此數為 $x$，直接依題意列式。",
        idea: "$4x + 7 = 6x - 9 \\implies 2x = 16 \\implies x = 8$。"
      },
      {
        lv: "Explore",
        q: "小智帶了若干元到文具店，買 3 枝鋼筆還剩 50 元；如果買 5 枝鋼筆則不夠 70 元。請問鋼筆每枝多少元？小智帶了多少元？",
        hint: "設鋼筆每枝 $x$ 元，從小智帶的總金額列式。",
        idea: "帶的錢相同：$3x + 50 = 5x - 70 \\implies 2x = 120 \\implies x = 60$ 元。帶的錢 $= 3(60) + 50 = 230$ 元。"
      },
      {
        lv: "Wonder",
        q: "某次數學競賽共有 25 題，答對一題得 4 分，答錯一題倒扣 1 分，不作答得 0 分。小明每題都有作答，最後得到了 75 分。請問小明答對了幾題？",
        hint: "設答對 $x$ 題，則答錯的題目有 $25 - x$ 題。",
        idea: "$4x - 1(25 - x) = 75 \\implies 4x - 25 + x = 75 \\implies 5x = 100 \\implies x = 20$ 題。"
      }
    ],

    where: {
      codes: [["A-7-3", "一元一次方程式的應用：等量公理、移項與應用問題"]],
      exam: "會考非選擇題第二大題經常為生活情境題，要求完整寫出假設、列式、計算與結論步驟。",
      stop: "七上一元一次方程應用題以單一未知數、線性關係為限，不涉及二元或非線性方程。"
    }
  });
})();
