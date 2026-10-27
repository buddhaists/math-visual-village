/* 單元：2-4 指數律 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "同底數相乘指數相加示意");
    s("rect", { x: 50, y: 60, width: 120, height: 70, rx: 8, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    s("rect", { x: 200, y: 60, width: 150, height: 70, rx: 8, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 110, 95, "2³ (3個2)", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 275, 95, "2⁴ (4個2)", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 185, 95, "×", { size: 20, color: C.cocoa, bold: true });
    SK.label(svg, 200, 165, "= 2³⁺⁴ = 2⁷ (共7個2連乘)", { size: 15, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "exp-laws",
    en: "Laws of Exponents",
    formula: "a^m\\cdot a^n = \\co{a^{m+n}},\\quad (a^m)^n = \\cb{a^{mn}},\\quad (ab)^n = \\cg{a^n b^n}",

    hook: {
      html: "乘法是加法的快速寫法（$3+3+3+3 = 3\\times 4$）；而指數是<b>乘法的快速寫法</b>（$3\\times 3\\times 3\\times 3 = 3^4$）。當次方遇到乘法、除法或再乘方時，指數會遵循一套極為優雅的運算規則！",
      ask: "$2^3\\times 2^4$ 為什麼不是底數相乘變成 $4^7$ 或 $4^{12}$？",
      visual: hookVisual
    },

    guess: {
      q: "計算 $(2^3)^2$ 的結果，下列何者正確？",
      options: [
        { t: "$2^6 = 64$", truth: true, explain: "$(2^3)^2 = 2^3\\times 2^3 = 2^{3+3} = 2^{3\\times 2} = 2^6 = 64$。乘方再乘方，指數相乘！" },
        { t: "$2^5 = 32$", common: true, explain: "把外面的次方當成加法了，$(a^m)^n = a^{mn}$ 指數相乘而不是相加。" },
        { t: "$2^9 = 512$", explain: "把指數 $3^2$ 算成 9，$(2^3)^2$ 的括號表示外層是 2 次方，不是底數 2 的 $3^2$ 次方。" },
        { t: "$4^6$", explain: "底數 2 不會因為次方而變成 4。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整次方 $m$ 與 $n$，觀察同底數相乘時指數相加的幾何疊加邏輯。",
      frames: [
        { cap: "同底相乘指數相加：底數相同的乘方相乘，底數不變，指數相加。", tex: "a^m\\times a^n = a^{m+n}" },
        { cap: "同底相除指數相減：底數相同的乘方相除，底數不變，指數相減。", tex: "a^m\\div a^n = a^{m-n}\\quad (a\\ne 0)" },
        { cap: "乘方再乘方：指數直接相乘。$(a^m)^n$ 共有 $n$ 組 $a^m$ 相乘，累計 $m\\times n$ 個 $a$。", tex: "(a^m)^n = a^{mn}" },
        { cap: "積的乘方：括號內相乘的各項各自取次方。$(ab)^n = a^n b^n$。", tex: "(a\\times b)^n = a^n\\times b^n" }
      ],
      hint: "只有在「底數相同」時指數才能相加減；若底數不同（如 $2^3\\times 3^3$），可利用積的乘方化為 $(2\\times 3)^3 = 6^3$。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "指數律演示");
        var slM = SK.slider({ label: "次方 m", min: 1, max: 4, step: 1, value: 2, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slN = SK.slider({ label: "次方 n", min: 1, max: 4, step: 1, value: 3, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slM.el);
        ctx.sliders.appendChild(slN.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var m = slM.value, n = slN.value, total = m + n;
          svg.innerHTML = "";
          s("rect", { x: 60, y: 50, width: 320, height: 130, rx: 16, fill: C.mint.f, stroke: C.mint.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 95, "2^" + m + " × 2^" + n + " = 2^(" + m + "+" + n + ")", { size: 22, color: C.ink, bold: true });
          SK.label(svg, 220, 140, "= 2^" + total + " = " + Math.pow(2, total), { size: 24, color: C.orange.s, bold: true });
          read.innerHTML = SK.tex("2^{" + m + "}\\times 2^{" + n + "} = 2^{" + total + "} = " + Math.pow(2, total), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "指數律化簡與求未知指數",
        code: "N-7-7",
        demo: {
          q: "化簡算式 $(2^3\\times 5^2)^4\\div (2^2\\times 5)^3$ 並求其值。",
          steps: [
            "積的乘方展開：$(2^3\\times 5^2)^4 = 2^{12}\\times 5^8$。",
            "分母展開：$(2^2\\times 5)^3 = 2^6\\times 5^3$。",
            "同底相除指數相減：$2^{12-6}\\times 5^{8-3} = 2^6\\times 5^5 = 64\\times 3125 = 200000$。"
          ]
        },
        tries: [
          {
            q: "若 $2^{10}\\times 4^3 = 2^x$，求整數 $x$ 的值。",
            hint: "將底數全部化成 2：$4 = 2^2$。",
            ans: "$4^3 = (2^2)^3 = 2^6$；$2^{10}\\times 2^6 = 2^{16}$，故 $x = 16$。"
          },
          {
            q: "化簡 $(-a^2)^3\\times (-a)^4$ 的結果。",
            hint: "先判斷每一項的正負號，再計算指數總和。",
            ans: "$(-a^2)^3 = -a^6$；$(-a)^4 = a^4$；相乘得 $(-a^6)\\times a^4 = -a^{10}$。"
          }
        ],
        edge: "注意 $a^m + a^n \\ne a^{m+n}$！同底數「相加」不能用指數律，例如 $2^3 + 2^3 = 2\\times 2^3 = 2^4$ 而不是 $2^6$。"
      }
    ],

    angles: [
      {
        title: "比較次方大小的三大招",
        icon: "sparkle",
        html: "比次方大小有三種方法：<br>1. <b>化同底數</b>：如 $4^{15}=(2^2)^{15}=2^{30}$ 與 $8^9=(2^3)^9=2^{27}$，底數相同看次方。<br>2. <b>化同指數</b>：如 $2^{30}=(2^3)^{10}=8^{10}$ 與 $3^{20}=(3^2)^{10}=9^{10}$，次方相同看底數（$9>8$ 故 $3^{20}>2^{30}$）。<br>3. <b>估計法</b>：取對應基準比較。"
      },
      {
        title: "科學記號乘除的基石",
        icon: "leaf",
        html: "計算 $(3\\times 10^5)\\times(4\\times 10^8)$ 時，係數相乘 $3\\times 4=12$，次方依指數律相加 $10^{5+8}=10^{13}$，最後調整為 $1.2\\times 10^{14}$。整套科學記號的快速運算全靠指數律支撐。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "計算 $2^{100}\\times 5^{98}$ 的位數。",
        hint: "湊成 $10$ 的次方：拆成 $2^2\\times (2^{98}\\times 5^{98})$。",
        idea: "$2^2\\times(2\\times 5)^{98} = 4\\times 10^{98}$，共有 $98+1 = 99$ 位數。"
      },
      {
        lv: "Explore",
        q: "比較 $a = 2^{55}$、$b = 3^{33}$、$c = 5^{22}$ 的大小關係。",
        hint: "指數 55, 33, 22 的最大公因數是 11，化成相同的 11 次方！",
        idea: "$a = (2^5)^{11} = 32^{11}$；$b = (3^3)^{11} = 27^{11}$；$c = (5^2)^{11} = 25^{11}$。因為 $32 > 27 > 25$，故 $a > b > c$。"
      },
      {
        lv: "Wonder",
        q: "若 $2^x = 3$，$2^y = 5$，求 $2^{2x+y-1}$ 的精確值。",
        hint: "將次方拆開成連乘與除法：$2^{2x}\\times 2^y\\div 2^1$。",
        idea: "$2^{2x} = (2^x)^2 = 3^2 = 9$。原式 $= 2^{2x}\\times 2^y\\div 2 = 9\\times 5\\div 2 = \\frac{45}{2}$（或 22.5）。"
      }
    ],

    where: {
      codes: [["N-7-6", "指數的意義與運算"], ["N-7-7", "同底數的乘除指數律與積的乘方"]],
      exam: "會考常考同底數乘除、次方比大小以及結合科學記號的運算應用。",
      stop: "國中指數律指數以非負整數（擴充至負整數）為限，分數指數（如 $a^{1/2}$）留待高中再介紹。"
    }
  });
})();
