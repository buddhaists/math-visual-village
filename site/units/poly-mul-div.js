/* 單元：1-3 多項式的乘除 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "長除法與除法原理");
    s("rect", { x: 30, y: 35, width: 340, height: 45, rx: 6, fill: C.gold.f, stroke: C.gold.s }, svg);
    SK.label(svg, 200, 62, "被除式 = 除式 × 商式 + 餘式", { size: 15, color: C.ink, bold: true });

    s("rect", { x: 40, y: 105, width: 140, height: 65, rx: 8, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 110, 130, "A = 2x^2 + 5x + 3", { size: 12, color: C.orange.s, bold: true });
    SK.label(svg, 110, 155, "除以 (x + 1)", { size: 12, color: C.soft });

    SK.label(svg, 200, 135, "=>", { size: 20, color: C.cocoa, bold: true });

    s("rect", { x: 220, y: 105, width: 150, height: 65, rx: 8, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 295, 130, "商式 Q = 2x + 3", { size: 12, color: C.blue.s, bold: true });
    SK.label(svg, 295, 155, "餘式 R = 0 (整除)", { size: 12, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "poly-mul-div",
    en: "Multiplication and Division of Polynomials",
    formula: "A = B \\times Q + R\\quad (R=0\\ \\text{或}\\ \\deg R < \\deg B)",

    hook: {
      html: "多項式乘法就像多對多的握手會，每一項都要互相乘到（指數相加）；而多項式長除法就像整數除法，每次只盯著最高次方看，直到<b>餘式的次數嚴格小於除式的次數</b>才能停筆！",
      ask: "除法運算中，什麼條件下才能稱「A 式被 B 式整除」？餘式次數有什麼不可逾越的鐵律？",
      visual: hookVisual
    },

    guess: {
      q: "若以一次式 $(2x - 3)$ 除二次多項式 $A$，則下列哪一個可能是最後的「餘式」？",
      options: [
        { t: "5", truth: true, explain: "除式為一次式（$\\deg = 1$），餘式必須是「零次多項式（常數）」或 0（即 $\\deg R < 1$），5 是常數，完全符合！" },
        { t: "3x + 1", common: true, explain: "次數為 1 次，與除式同次，代表長除法還能繼續除下去，尚未算完。" },
        { t: "x^2 - 4", explain: "餘式次數比除式更高，長除法嚴重錯誤。" },
        { t: "2x - 3", explain: "餘式等於除式代表還能再商 1，不可能留為餘式。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整多項式被除式與除式，動態理解長除法階梯消去與除法原理。",
      frames: [
        { cap: "單項式乘法：係數相乘、文字符號相同者根據指數律次方相加。如 $(3x^2)(-2x^3) = -6x^5$。", tex: "(ax^m)(bx^n) = abx^{m+n}" },
        { cap: "多項式乘法：分配律全面展開，每一個括號的項都要與另一個括號的每一項相乘，再同類項合併。", tex: "(a+b)(c+d) = ac + ad + bc + bd" },
        { cap: "長除法三字訣：<b>降冪、排列、缺項補 0</b>。每次由除式的最高次項去消滅被除式的最高次項。", tex: "\\text{除式}\\overline{)\\text{被除式}}\\to \\text{得商式，減去乘積下移下一項}" },
        { cap: "除法原理（極核心）：被除式＝除式 $\\times$ 商式＋餘式。餘式 $R=0$ 時稱<b>整除</b>；非零時 $\\deg R < \\deg B$。", tex: "A = B \\cdot Q + R,\\quad \\deg R < \\deg B" }
      ],
      hint: "長除法必備自查：被除式有缺項一定要先寫 0 補位，否則直式上下次方對不齊會全盤皆輸！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "多項式除法推導動態圖");
        var slC = SK.slider({ label: "常數 c ((x+c) 作為除式)", min: -3, max: 3, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var c = slC.value;
          // (x^2 + 5x + 6) / (x + c)
          // = x + (5-c) with Remainder = 6 - c*(5-c) = 6 - 5c + c^2
          var qConst = 5 - c;
          var rVal = 6 - 5 * c + c * c;
          svg.innerHTML = "";
          SK.label(svg, 150, 60, "被除式 A = x^2 + 5x + 6", { size: 14, color: C.ink, bold: true });
          SK.label(svg, 150, 95, "除式 B = x " + (c >= 0 ? "+ " + c : "- " + Math.abs(c)), { size: 14, color: C.orange.s, bold: true });
          s("line", { x1: 50, y1: 120, x2: 380, y2: 120, stroke: C.cocoa, "stroke-width": 2 }, svg);
          SK.label(svg, 150, 150, "商式 Q = x " + (qConst >= 0 ? "+ " + qConst : "- " + Math.abs(qConst)), { size: 14, color: C.blue.s, bold: true });
          SK.label(svg, 150, 185, "餘式 R = " + rVal + (rVal === 0 ? " (整除！)" : ""), { size: 14, color: rVal === 0 ? C.green.s : C.red.s, bold: true });

          read.innerHTML = SK.tex("(x^2+5x+6) = (x" + (c>=0?"+":"") + c + ")(x" + (qConst>=0?"+":"") + qConst + ") + (" + rVal + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "多項式長除法求商式與餘式",
        code: "A-8-3",
        demo: {
          q: "求 $(6x^2 - 7x + 4) \\div (2x - 1)$ 的商式與餘式。",
          steps: [
            "看首項：$6x^2 \\div 2x = 3x$（商第一項為 $3x$）。",
            "相乘下減：$(2x - 1) \\times 3x = 6x^2 - 3x$；相減得 $(-7x) - (-3x) = -4x$，移下 $+4$ 得 $-4x + 4$。",
            "看第二項：$-4x \\div 2x = -2$（商第二項為 $-2$）。",
            "相乘下減：$(2x - 1) \\times (-2) = -4x + 2$；相減得 $4 - 2 = 2$。",
            "得到：商式為 $3x - 2$，餘式為 $2$。"
          ]
        },
        tries: [
          {
            q: "計算 $(2x^2 + 5x - 3) \\div (x + 3)$，其餘式為多少？",
            options: ["0 (整除)", "3", "-3", "6"],
            ans: 0,
            explain: "因式分解 $2x^2 + 5x - 3 = (x + 3)(2x - 1)$，恰好可被 $(x + 3)$ 整除，商式為 $2x - 1$，餘式為 0。"
          },
          {
            q: "若以多項式 $B$ 除 $(x^2 - 2x - 8)$ 得商式為 $(x - 4)$，餘式為 0，則除式 $B$ 為何？",
            options: ["x + 2", "x - 2", "x + 4", "x - 1"],
            ans: 0,
            explain: "由除法原理 $A = B \\times Q \\implies B = A \\div Q$。$(x^2 - 2x - 8) \\div (x - 4) = x + 2$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知多項式 $A$ 除以 $(x - 2)$ 得商式 $Q$，餘式為 5。請問多項式 $3A$ 除以 $(x - 2)$，得到的餘式是多少？",
        options: ["15", "5", "3", "0"],
        ans: 0,
        hint: "利用除法原理將兩邊同乘 3：$A = (x-2)Q + 5$。",
        explain: "由 $A = (x-2)Q + 5$，兩邊同乘 3 得 $3A = 3(x-2)Q + 15 = (x-2)(3Q) + 15$。除式仍為 $(x-2)$，新餘式就是 $15$！"
      }
    ],

    angles: [
      { title: "高中綜合除法與餘式定理的萌芽", body: "到了高中，當除式是一次式 $(x-c)$ 時，數學家發明了只寫係數、不用寫 $x$ 的「綜合除法」；更有驚人的「餘式定理」：把 $x=c$ 直接代入被除式 $f(c)$，就能一秒算出餘式！" },
      { title: "電腦密碼學中的多項式編碼", body: "二進制世界的 CRC 校驗碼與 QR Code 容錯機制，底層就是利用伽羅瓦域（Galois Field）上的多項式長除法，檢查資料傳輸過程中是否發生位元錯誤並自動修復。" }
    ],

    where: {
      past: "國小的整數直式除法與七年級的代數符號。",
      current: "八年級掌握多項式乘法與長除法，貫通除法原理 $A = BQ + R$。",
      next: "此除法原理將在九年級二次函數求值，以及高中餘式定理與因式定理中爆發強大威力！"
    }
  });
})();
