/* 單元：1-2 解二元一次聯立方程式 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "消去法天平示意");
    s("rect", { x: 50, y: 40, width: 140, height: 60, rx: 8, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 120, 70, "x + y = 10", { size: 16, color: C.blue.s, bold: true });
    s("rect", { x: 210, y: 40, width: 140, height: 60, rx: 8, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 280, 70, "x - y = 4", { size: 16, color: C.orange.s, bold: true });
    s("line", { x1: 50, y1: 120, x2: 350, y2: 120, stroke: C.cocoa, "stroke-width": 2 }, svg);
    SK.label(svg, 200, 145, "兩式相加: 2x = 14 ➔ x = 7, y = 3", { size: 16, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "linear-sys-2",
    en: "Solving Systems of Linear Equations in Two Variables",
    formula: "\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases} \\xrightarrow{\\text{代入或加減消去法}} (x, y)",

    hook: {
      html: "單獨一條二元一次方程式有無限多組解，就像兩個人的各自願望清單；但當兩條方程式用大括號聯立起來時，只有同時滿足兩者的<b>「共同解」</b>才能雀屏中選！解聯立的核心秘訣就四個字：<b>化二為一（消去法）</b>。",
      ask: "代入消去法與加減消去法，哪一個更好用？如何一眼決定用哪招？",
      visual: hookVisual
    },

    guess: {
      q: "解聯立方程式 $\\begin{cases} x = 2y - 1 \\ 3x + 4y = 17 \\end{cases}$，最適合優先使用哪種方法？",
      options: [
        { t: "代入消去法：把第一式的 $x$ 直接換成 $2y - 1$", truth: true, explain: "第一式已經整理好「$x = \\cdots$」，直接代入第二式可一秒消去 $x$：$3(2y-1)+4y=17$！" },
        { t: "加減消去法：必須先同乘擴分", common: true, explain: "也可以做，但要先移項整理成 $x-2y=-1$ 再同乘 3，步驟多繞了一大圈。" },
        { t: "十字交乘法", explain: "十字交乘法是用於二次多項式因式分解，不能拿來解一次聯立方程式。" },
        { t: "直接猜數字", explain: "隨機猜測容易漏解且遇到分數解時完全無法處理。" }
      ]
    },

    derive: {
      intro: "透過步驟逐步展示消去法如何把兩個未知數縮減為一個未知數。",
      frames: [
        { cap: "代入消去法：當某個未知數係數為 1 或 $-1$ 時，將其表示為 $x = ky + m$，代入另一式消去該未知數。", tex: "x = 2y - 1 \\implies 3(2y - 1) + 4y = 17" },
        { cap: "加減消去法：找出某一未知數係數的最小公倍數，兩式分別擴分後「同號相減、異號相加」消去它。", tex: "3x + 2y = 13,\\ 5x - 2y = 11 \\xrightarrow{+} 8x = 24" },
        { cap: "回代求另一數：求出第一個未知數後，代回最簡單的一式求出第二個未知數，寫成數對 $(x, y)$。", tex: "x = 3 \\implies 2y = 13 - 3(3) = 4 \\implies y = 2" },
        { cap: "檢驗共同解：將求得的 $(x, y)$ 代回兩式，確認兩條等式同時完全平衡。", tex: "3(3) + 2(2) = 13\\text{ (成立)},\\quad 5(3) - 2(2) = 11\\text{ (成立)}" }
      ],
      hint: "係數為 1 用代入消去法最快；係數較大但對齊好時，用加減消去法最穩。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "聯立求解步進");
        var slX = SK.slider({ label: "解 x", min: 1, max: 8, step: 1, value: 5, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slY = SK.slider({ label: "解 y", min: 1, max: 8, step: 1, value: 2, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        ctx.sliders.appendChild(slY.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value, y = slY.value;
          var c1 = x + y, c2 = 2 * x - y;
          svg.innerHTML = "";
          s("rect", { x: 50, y: 40, width: 340, height: 140, rx: 14, fill: "#FDFBF6", stroke: C.cocoa, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 80, "式一: x + y = " + c1, { size: 18, color: C.blue.s, bold: true });
          SK.label(svg, 220, 115, "式二: 2x - y = " + c2, { size: 18, color: C.orange.s, bold: true });
          SK.label(svg, 220, 155, "共同解: x = " + x + ",  y = " + y, { size: 20, color: C.green.s, bold: true });
          read.innerHTML = SK.tex("\\begin{cases} x + y = " + c1 + " \\ 2x - y = " + c2 + " \\end{cases} \\implies (x, y) = (" + x + ", " + y + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "二元一次聯立方程式求解與特殊型",
        code: "A-7-5",
        demo: {
          q: "解聯立方程式 $\\begin{cases} 3x + 2y = 12 \\quad \\cdots (1) \\ 4x + 3y = 17 \\quad \\cdots (2) \\end{cases}$。",
          steps: [
            "目標消去 $y$：$y$ 係數為 2 與 3，最小公倍數是 6。",
            "$(1)\\times 3 \\implies 9x + 6y = 36$；$(2)\\times 2 \\implies 8x + 6y = 34$。",
            "兩式符號相同相減：$(9x + 6y) - (8x + 6y) = 36 - 34 \\implies x = 2$。",
            "代入 $(1)$ 式：$3(2) + 2y = 12 \\implies 2y = 6 \\implies y = 3$。",
            "聯立解為 $x = 2, y = 3$。"
          ]
        },
        tries: [
          {
            q: "解聯立方程式 $\\begin{cases} y = 3x - 5 \\ 2x + 3y = 18 \\end{cases}$。",
            hint: "用代入消去法，將 $3x-5$ 取代第二式的 $y$。",
            ans: "$2x + 3(3x - 5) = 18 \\implies 11x - 15 = 18 \\implies 11x = 33 \\implies x = 3$；代入得 $y = 3(3) - 5 = 4$。"
          },
          {
            q: "解聯立方程式 $\\begin{cases} 2x + 5y = 9 \\ 3x - 2y = 4 \\end{cases}$。",
            hint: "兩式分別乘 2 與 5 消去 $y$（異號相加）。",
            ans: "第一式乘 2 得 $4x+10y=18$，第二式乘 5 得 $15x-10y=20$。相加得 $19x=38\\implies x=2$；代入得 $y=1$。"
          }
        ],
        edge: "加減消去法兩式相減時，整列式子包含常數項全部都要變號！忘記常數項也要相減是最常見的錯誤。"
      }
    ],

    angles: [
      {
        title: "對稱型聯立巧算",
        icon: "sparkle",
        html: "遇到對稱係數如 $\\begin{cases} 37x + 13y = 113 \\ 13x + 37y = 87 \\end{cases}$，千萬別直接擴分！<br>先<b>兩式相加</b>得 $50x + 50y = 200 \\implies x + y = 4$；<br>再<b>兩式相減</b>得 $24x - 24y = 26 \\implies x - y = 1$。<br>大數瞬間化為最簡單的小學加減！"
      },
      {
        title: "聯立方程式的幾何圖像",
        icon: "leaf",
        html: "兩條二元一次方程式各代表坐標平面上的一條直線：<br>‧ 兩線相交於一點 $\\implies$ <b>恰有一組解</b>。<br>‧ 兩線平行不相交 $\\implies$ <b>無解</b>。<br>‧ 兩線完全重合 $\\implies$ <b>無限多組解</b>。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "若聯立方程式 $\\begin{cases} ax + by = 7 \\ 2ax - by = 5 \\end{cases}$ 的解為 $x=2, y=1$，求 $a$ 與 $b$ 的值。",
        hint: "將 $x=2, y=1$ 代入，變成關於 $a$ 和 $b$ 的聯立方程式。",
        idea: "代入得 $\\begin{cases} 2a + b = 7 \\ 4a - b = 5 \\end{cases}$。兩式相加得 $6a = 12 \\implies a = 2$；代回得 $b = 3$。"
      },
      {
        lv: "Explore",
        q: "已知聯立方程式 $\\begin{cases} 2x - 3y = 7 \\ 4x - 6y = k \\end{cases}$ 無解，求常數 $k$ 的條件。",
        hint: "第二式的 $x, y$ 係數剛好是第一式的 2 倍，無解代表常數項不能等於對應的 2 倍。",
        idea: "第一式同乘 2 為 $4x - 6y = 14$。若要無解，兩直線必須平行而不重合，故 $k \\ne 14$。"
      },
      {
        lv: "Wonder",
        q: "解方程式連等式 $2x - y + 1 = 3x + y - 2 = x + 2y + 5$。",
        hint: "三連等可拆成任意兩個二元一次方程聯立求解。",
        idea: "拆成：(1) $2x-y+1 = 3x+y-2 \\implies x+2y=3$；(2) $3x+y-2 = x+2y+5 \\implies 2x-y=7$。由 (2) 得 $y=2x-7$，代入 (1) 得 $x+2(2x-7)=3 \\implies 5x=17 \\implies x=\\frac{17}{5}$，代回得 $y=-\\frac{1}{5}$。"
      }
    ],

    where: {
      codes: [["A-7-5", "二元一次聯立方程式的解法：代入消去法與加減消去法"]],
      exam: "會考年年必考聯立方程式計算或化簡題，更是後續所有幾何坐標與函數交點的解題基礎。",
      stop: "國中以兩式二元一次聯立方程式為限，只處理恰有一組解的情況；無解與無限多解以直觀幾何討論為主。"
    }
  });
})();
