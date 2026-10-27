/* 單元：4-2 解一元一次不等式與應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "乘負數不等號大逆轉");
    s("rect", { x: 40, y: 35, width: 320, height: 50, rx: 8, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 65, "2 < 5  （2 確實在 5 的左邊）", { size: 14, color: C.ink, bold: true });

    s("line", { x1: 200, y1: 90, x2: 200, y2: 120, stroke: C.red.s, "stroke-width": 2 }, svg);
    SK.label(svg, 250, 108, "同乘 (-1)", { size: 12, color: C.red.s, bold: true });

    s("rect", { x: 40, y: 125, width: 320, height: 50, rx: 8, fill: C.red.f, stroke: C.red.s }, svg);
    SK.label(svg, 200, 155, "-2 > -5  （不等號立刻轉向！）", { size: 15, color: C.red.s, bold: true });
  }

  SK.mountUnit({
    slug: "ineq-solve",
    en: "Solving Linear Inequalities in One Variable and Applications",
    formula: "\\text{若 } a < b \\text{ 且 } c < 0 \\text{，則 } ac > bc \\quad (\\text{同乘或同除以負數，不等號反向})",

    hook: {
      html: "解不等式的大多數步驟（移項、去括號、去分母）都跟解一元一次方程式一模一樣。但是有一個最致命、最容易摔跤的陷阱：<b>當兩邊同乘或同除以一個負數時，不等號必須立刻調轉方向</b>！",
      ask: "為什麼同乘負數時，大於一定要變成小於？",
      visual: hookVisual
    },

    guess: {
      q: "解一元一次不等式 $-3x + 5 \\le 17$，求 $x$ 的解範圍為何？",
      options: [
        { t: "x >= -4", truth: true, explain: "移項：$-3x \\le 17 - 5 \\implies -3x \\le 12$。兩邊同除以負數 $-3$，不等號轉向：$x \\ge \\frac{12}{-3} \\implies x \\ge -4$！" },
        { t: "x <= -4", common: true, explain: "忘記同除以負數時不等號必須反轉（$\\le$ 變 $\\ge$）。" },
        { t: "x >= 4", explain: "正負號計算錯誤：$12 \\div (-3) = -4$。" },
        { t: "x <= 4", explain: "既忘了轉向又算錯負號。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變不等式係數，特別觀察除以負數時不等號如何自動翻轉方向。",
      frames: [
        { cap: "加減運算不變向：不等式兩邊同加或同減一個數，不等號方向不變。$a < b \\iff a + c < b + c$。", tex: "a < b \\implies a \\pm c < b \\pm c" },
        { cap: "乘除正數不變向：不等式兩邊同乘或同除以一個正數（$c > 0$），不等號方向不變。", tex: "a < b,\\ c > 0 \\implies ac < bc" },
        { cap: "乘除負數必反向：數線上取相反數就像以原點為中心照鏡子，右邊的數翻到左邊反而變得更小！所以 $c < 0$ 時方向反轉。", tex: "a < b,\\ c < 0 \\implies ac > bc" },
        { cap: "應用題驗證：解完不等式後，需檢驗解是否符合生活常理（例如人數、件數必須是正整數）。", tex: "\\text{解為 } x > 3.2,\\ x\\text{ 為正整數} \\implies \\text{最小值為 } 4" }
      ],
      hint: "解題檢查口訣：只要手寫除以負號或乘負號，筆尖立刻把不等號倒過來寫！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "不等號轉向推導");
        var slC = SK.slider({ label: "同乘乘數 c", min: -3, max: 3, step: 1, value: -1, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var c = slC.value;
          var a = 2, b = 5;
          var ac = a * c, bc = b * c;
          var ox = 220, oy = 130, scale = 18;
          svg.innerHTML = "";
          // 數線
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          if (c !== 0) {
            var pac = ox + ac * scale, pbc = ox + bc * scale;
            s("circle", { cx: pac, cy: oy, r: 6, fill: C.orange.s }, svg);
            SK.label(svg, pac, oy - 15, "2 × (" + c + ") = " + ac, { size: 12, color: C.orange.s, bold: true });
            s("circle", { cx: pbc, cy: oy, r: 6, fill: C.blue.s }, svg);
            SK.label(svg, pbc, oy + 25, "5 × (" + c + ") = " + bc, { size: 12, color: C.blue.s, bold: true });

            var symbol = ac < bc ? "<" : ">";
            var flipText = c < 0 ? "【乘負數，不等號反向！】" : "【乘正數，不等號保持不變】";
            read.innerHTML = SK.tex("2 < 5 \\xrightarrow{\\times (" + c + ")} " + ac + " \\ " + symbol + " \\ " + bc + "\\quad " + flipText, true);
          } else {
            read.innerHTML = "同乘 0 會讓兩邊都變成 0，不等式失去意義，不能同乘 0！";
          }
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "解一元一次不等式綜合題",
        code: "A-7-8",
        demo: {
          q: "解一元一次不等式 $\\frac{x - 1}{2} - \\frac{2x + 1}{3} \\ge 1$。",
          steps: [
            "同乘分母公倍數 6 去分母（6 是正數，不變向）：$3(x - 1) - 2(2x + 1) \\ge 6$。",
            "展開括號（注意負號分配）：$3x - 3 - 4x - 2 \\ge 6 \\implies -x - 5 \\ge 6$。",
            "移項合併：$-x \\ge 11$。",
            "兩邊同除以 $-1$（除以負數，不等號轉向）：$x \\le -11$。"
          ]
        },
        tries: [
          {
            q: "解不等式 $5 - 2(x + 1) > 3x - 7$，求其解範圍？",
            options: ["x < 2", "x > 2", "x < -2", "x > -2"],
            ans: 0,
            explain: "展開：$5 - 2x - 2 > 3x - 7 \\implies 3 - 2x > 3x - 7$。移項：$-5x > -10$。同除以 $-5$ 轉向：$x < 2$。"
          },
          {
            q: "阿木買了每張 15 元的明信片若干張，付了一張千元大鈔，找回的錢超過 400 元。阿木最多買了幾張明信片？",
            options: ["39 張", "40 張", "41 張", "38 張"],
            ans: 0,
            explain: "設買了 $x$ 張明信片。找回的錢為 $1000 - 15x > 400 \\implies -15x > -600 \\implies x < 40$。因為 $x < 40$ 且為整數，最多只能買 39 張（不包含 40）！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若不等式 $ax + 3 > 7$ 的解為 $x < -2$，則常數 $a$ 的值是多少？",
        options: ["-2", "2", "-4", "4"],
        ans: 0,
        hint: "注意原題大於符號最後變成小於符號，代表 $a$ 必定是負數。",
        explain: "由 $ax > 4$，其解為 $x < -2$。因為方向反轉，可知 $a < 0$ 且 $\\frac{4}{a} = -2 \\implies a = -2$。"
      }
    ],

    angles: [
      { title: "為什麼負負得正會導致轉向？", body: "在數線上，正數越大離原點越遠（越靠右）；當乘上負號時，這兩個數被鏡射鏡像到負半軸，原本離原點越遠的數，到了負半軸反而變得更小、越靠左！這就是幾何上不等號必定轉向的直觀本質。" },
      { title: "線性規劃入門", body: "高中數學的線性規劃與大學的最佳化理論，就是利用多個一次不等式交織出「可行解區域」，在限制預算與原料下找出利潤最大化的方案。" }
    ],

    where: {
      past: "上一節掌握不等式的意義與數線圖示。",
      current: "熟練一元一次不等式的移項求解技巧，並嚴密掌握乘除負數必轉向原則。",
      next: "八年級下學期將把不等式應用在幾何中，證明「三角形兩邊之和大於第三邊」！"
    }
  });
})();
