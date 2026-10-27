/* 單元：2-1 平方根與近似值 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "正方形面積與平方根");
    s("rect", { x: 50, y: 40, width: 110, height: 110, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 105, 95, "面積 = 2", { size: 15, color: C.orange.s, bold: true });
    SK.label(svg, 105, 175, "邊長 = \\sqrt{2} \\approx 1.414", { size: 13, color: C.ink, bold: true });

    s("rect", { x: 230, y: 40, width: 110, height: 110, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 285, 95, "面積 = 9", { size: 15, color: C.blue.s, bold: true });
    SK.label(svg, 285, 175, "邊長 = \\sqrt{9} = 3", { size: 14, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "sqrt-approx",
    en: "Square Roots and Approximations",
    formula: "\\text{平方根的意義：若 } x^2 = a\\ (a \\ge 0) \\text{，則 } x = \\pm\\sqrt{a}",

    hook: {
      html: "面積是 9 的正方形，邊長是 3；面積是 16 的正方形，邊長是 4。那如果面積恰好是 2，這個正方形的邊長到底是多少？古希臘畢達哥拉斯學派發現：這個長度不可能寫成任何分數，它是一個全新種類的數——<b>無理數（根號）</b>！",
      ask: "為什麼正數 $a$ 一定有「兩個」平方根（一正一負），而 $\\sqrt{a}$ 符號本身卻只代表正的那一個？",
      visual: hookVisual
    },

    guess: {
      q: "下列關於平方根的敘述，哪一個是「完全正確」的？",
      options: [
        { t: "16 的平方根是 4 與 -4，但 $\\sqrt{16} = 4$", truth: true, explain: "「$a$ 的平方根」問的是誰的平方等於 $a$，有正負兩個（$\\pm 4$）；而「根號符號 $\\sqrt{a}$」代表的是主平方根（非負的那一個），所以 $\\sqrt{16} = 4$！" },
        { t: "$\\sqrt{16} = \\pm 4$", common: true, explain: "超級常見混淆！$\\sqrt{16}$ 是算術平方根，值恆正，只有 4，不能寫 $\\pm 4$。" },
        { t: "-9 的平方根是 -3", explain: "負數沒有實數平方根，因為任何實數的平方都不可能是負數。" },
        { t: "0 沒有平方根", explain: "0 的平方根就是 0，恰好有一個。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變面積數值，觀察邊長與十分逼近法尋找平方根小數點後精確值的過程。",
      frames: [
        { cap: "平方根定義：若 $x^2 = a$，則稱 $x$ 為 $a$ 的平方根。正數 $a$ 有兩個平方根：$\\sqrt{a}$ 與 $-\\sqrt{a}$。", tex: "x^2 = a \\implies x = \\pm\\sqrt{a}\\ (a > 0)" },
        { cap: "算術平方根：符號 $\\sqrt{a}$ 專指非負的平方根。因此 $\\sqrt{a} \\ge 0$ 永遠成立。", tex: "\\sqrt{a} \\ge 0,\\quad (\\sqrt{a})^2 = a" },
        { cap: "根號的化簡：根號內部有平方可以直接脫出絕對值：$\\sqrt{x^2} = |x|$。", tex: "\\sqrt{x^2} = |x| = \\begin{cases} x, & x\\ge 0 \\ -x, & x<0 \\end{cases}" },
        { cap: "十分逼近法：求非完全平方數的近似值。例如找 $\\sqrt{10}$：$3^2=9 < 10 < 4^2=16$，再夾 $3.1^2=9.61$ 到 $3.2^2=10.24$ 之間。", tex: "3.16 < \\sqrt{10} < 3.17" }
      ],
      hint: "核心警語：看到文字「...的平方根」要加 $\\pm$；看到題目本身印有根號「$\\sqrt{\\dots}$」答案一定是正數！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "平方根逼近模擬");
        var slA = SK.slider({ label: "目標整數 a", min: 2, max: 20, step: 1, value: 5, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value;
          var sqrtVal = Math.sqrt(a);
          var floorN = Math.floor(sqrtVal);
          var ceilN = floorN + 1;
          var ox = 40, oy = 140, sc = 18;
          svg.innerHTML = "";

          // 畫數線區間
          s("line", { x1: ox, y1: oy, x2: 400, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          for (var i = 1; i <= 5; i++) {
            var px = ox + i * 70;
            s("line", { x1: px, y1: oy - 5, x2: px, y2: oy + 5, stroke: C.cocoa }, svg);
            SK.label(svg, px, oy + 25, String(i) + " (\\sqrt{" + (i*i) + "})", { size: 12, color: (i === floorN || i === ceilN) ? C.orange.s : C.soft });
          }

          var pSqrt = ox + sqrtVal * 70;
          s("circle", { cx: pSqrt, cy: oy, r: 6, fill: C.red.s }, svg);
          SK.label(svg, pSqrt, oy - 20, "\\sqrt{" + a + "} \\approx " + sqrtVal.toFixed(3), { size: 13, color: C.red.s, bold: true });

          read.innerHTML = SK.tex(floorN + "^2 = " + (floorN*floorN) + " < " + a + " < " + ceilN + "^2 = " + (ceilN*ceilN) + "\\implies " + floorN + " < \\sqrt{" + a + "} < " + ceilN + "，\\text{整數部分為 }" + floorN, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "判斷平方根與整數部分",
        code: "N-8-1",
        demo: {
          q: "求下列各數的值或範圍：(1) $\\sqrt{121}$；(2) 若 $a < \\sqrt{53} < a + 1$ 且 $a$ 為整數，求 $a$ 的值。",
          steps: [
            "(1) 因為 $11^2 = 121$，且根號取正值，所以 $\\sqrt{121} = 11$。",
            "(2) 找完全平方數夾擠：$7^2 = 49$，$8^2 = 64$。",
            "因為 $49 < 53 < 64$，所以 $\\sqrt{49} < \\sqrt{53} < \\sqrt{64} \\implies 7 < \\sqrt{53} < 8$。",
            "因此整數 $a = 7$。"
          ]
        },
        tries: [
          {
            q: "若 $(2x - 3)$ 是 25 的負平方根，則 $x$ 的值是多少？",
            options: ["-1", "4", "1", "-4"],
            ans: 0,
            explain: "25 的負平方根為 $-5$。依題意：$2x - 3 = -5 \\implies 2x = -2 \\implies x = -1$。"
          },
          {
            q: "計算 $\\sqrt{(-7)^2}$ 的值為多少？",
            options: ["7", "-7", "$\\pm 7$", "49"],
            ans: 0,
            explain: "$\\sqrt{(-7)^2} = \\sqrt{49} = 7$（或由公式 $\\sqrt{x^2} = |x| = |-7| = 7$），根號結果必為非負數。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若 $x$ 是正整數，且滿足 $3 < \\sqrt{x} \\le 6$，則滿足條件的整數 $x$ 共有多少個？",
        options: ["27 個", "28 個", "26 個", "25 個"],
        ans: 0,
        hint: "將不等式三邊同時平方，脫去根號。",
        explain: "全體平方得 $3^2 < x \\le 6^2 \\implies 9 < x \\le 36$。整數 $x$ 的個數為 $36 - 9 = 27$ 個。"
      }
    ],

    angles: [
      { title: "第一次數學危機與希帕索斯", body: "畢達哥拉斯學派深信「萬物皆數（整數或整數比）」。門徒希帕索斯發現等腰直角三角形斜邊 $\\sqrt{2}$ 無法寫成任何分數，引發了數學史上的「第一次數學危機」，傳說他因此被殘忍地投入海中！" },
      { title: "A4 紙張的黃金規格密碼", body: "國際標準 A4 紙張的長寬比恰好是 $\\sqrt{2} : 1 \\approx 1.414 : 1$。這個比值最神奇之處在於：將紙張沿長邊對摺切半後（變成 A5），長寬比依然維持 $\\sqrt{2} : 1$ 完全不變形！" }
    ],

    where: {
      past: "七年級指數次方運算與整數乘法。",
      current: "八年級引入平方的逆運算「平方根」，打破有理數界限認識根號。",
      next: "下一節將學習根號的四則運算與化簡，隨後在「畢氏定理」中大展身手！"
    }
  });
})();
