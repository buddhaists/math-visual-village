/* 單元：4-2 配方法與公式解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "補齊正方形缺角");
    // 左正方形 x^2
    s("rect", { x: 50, y: 50, width: 80, height: 80, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 90, 95, "x^2", { size: 16, color: C.orange.s, bold: true });
    // 右長條 (b/2)x
    s("rect", { x: 130, y: 50, width: 30, height: 80, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    s("rect", { x: 50, y: 130, width: 80, height: 30, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    // 右下缺角 (b/2)^2
    s("rect", { x: 130, y: 130, width: 30, height: 30, fill: C.green.f, stroke: C.green.s, "stroke-width": 2, "stroke-dasharray": "3,3" }, svg);
    SK.label(svg, 145, 148, "+(b/2)^2", { size: 10, color: C.green.s, bold: true });

    SK.label(svg, 280, 75, "x^2 + bx + (b/2)^2", { size: 13, color: C.ink, bold: true });
    SK.label(svg, 280, 105, "= (x + b/2)^2", { size: 16, color: C.orange.s, bold: true });
    SK.label(svg, 280, 145, "判別式 D = b^2 - 4ac", { size: 13, color: C.red.s, bold: true });
  }

  SK.mountUnit({
    slug: "quad-eq-formula",
    en: "Completing the Square and the Quadratic Formula",
    formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a},\\quad D = b^2 - 4ac",

    hook: {
      html: "當方程式的根帶有醜陋的根號（例如 $x^2 + 4x - 1 = 0$）時，十字交乘法完全無能為力。但古代數學家透過「<b>補上正方形缺角 $(b/2)^2$</b>」的配方法，硬生生把式子配成完全平方，並推導出能通殺世間所有一元二次方程式的萬能公式解！",
      ask: "為什麼判別式 $D = b^2 - 4ac$ 的正負號，能一眼判定方程式到底有「兩相異實根」、「重根」還是「無解」？",
      visual: hookVisual
    },

    guess: {
      q: "方程式 $2x^2 - 3x + 5 = 0$ 的根的情況為何？",
      options: [
        { t: "無解（無實數根）", truth: true, explain: "計算判別式 $D = b^2 - 4ac = (-3)^2 - 4(2)(5) = 9 - 40 = -31 < 0$。因為根號內不能為負數，所以此方程式無解！" },
        { t: "有兩相異實根", common: true, explain: "算判別式時容易忽略減號或乘錯符號。" },
        { t: "有兩相等實根（重根）", explain: "只有當 $D = 0$ 時才會產生重根。" },
        { t: "只有一正根一負根", explain: "無實數解，根本沒有實根可分正負。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整係數 $a, b, c$，動態觀察配方補角與判別式 $D$ 的三種根狀態。",
      frames: [
        { cap: "配方法核心：首項係數化為 1 後，兩邊同時加上「<b>一次項係數一半的平方 $(b/2)^2$</b>」，湊成完全平方。", tex: "x^2 + bx + \\left(\\frac{b}{2}\\right)^2 = \\left(x + \\frac{b}{2}\\right)^2" },
        { cap: "直接開平方：等號左邊配成 $(x+k)^2$，右邊為常數 $M$。若 $M \\ge 0$，直接開方得 $x + k = \\pm\\sqrt{M}$！", tex: "(x+k)^2 = M \\implies x = -k \\pm \\sqrt{M}" },
        { cap: "萬能公式解：對一般式 $ax^2+bx+c=0$ 執行完整配方，推導出公式解：$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$。", tex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" },
        { cap: "判別式三大準則：$D = b^2 - 4ac$。<br>• $D > 0$：兩相異解<br>• $D = 0$：兩相等解（重根）<br>• $D < 0$：無解", tex: "D>0 \\iff 2\\text{根},\\quad D=0 \\iff \\text{重根},\\quad D<0 \\iff \\text{無解}" }
      ],
      hint: "配方三部曲：二次項係數除成 1、常數項移到右邊、兩邊補上一半的平方！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "配方法與公式解推導");
        var slB = SK.slider({ label: "一次項係數 b", min: -6, max: 6, step: 2, value: 4, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slC = SK.slider({ label: "常數項 c", min: -5, max: 7, step: 1, value: 1, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slB.el);
        ctx.sliders.appendChild(slC.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var b = slB.value, c = slC.value;
          // x^2 + bx + c = 0
          var d = b * b - 4 * 1 * c;
          svg.innerHTML = "";
          SK.label(svg, 220, 50, "x^2 " + (b>=0?"+ ":"") + b + "x " + (c>=0?"+ ":"") + c + " = 0", { size: 18, color: C.ink, bold: true });

          var half = b / 2;
          var halfSq = half * half;
          var rightSide = -c + halfSq;

          SK.label(svg, 220, 95, "配方: (x " + (half>=0?"+ ":"") + half + ")^2 = " + (-c) + " + " + halfSq + " = " + rightSide, { size: 15, color: C.orange.s, bold: true });

          var dDesc = "";
          if (d > 0) dDesc = "判別式 D = " + d + " > 0，有兩相異實根！";
          else if (d === 0) dDesc = "判別式 D = 0，有兩相等實根（重根）！";
          else dDesc = "判別式 D = " + d + " < 0，無實數解！";

          SK.label(svg, 220, 150, dDesc, { size: 16, color: d > 0 ? C.green.s : d === 0 ? C.blue.s : C.red.s, bold: true });

          read.innerHTML = SK.tex("x = \\frac{-(" + b + ") \\pm \\sqrt{" + d + "}}{2} \\implies " + dDesc, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用配方法與公式解求解方程",
        code: "A-8-7",
        demo: {
          q: "用公式解求解一元二次方程式 $x^2 - 4x + 1 = 0$。",
          steps: [
            "辨識係數：$a = 1, b = -4, c = 1$。",
            "計算判別式：$D = b^2 - 4ac = (-4)^2 - 4(1)(1) = 16 - 4 = 12 > 0$（有兩相異解）。",
            "代入公式：$x = \\frac{-(-4) \\pm \\sqrt{12}}{2(1)} = \\frac{4 \\pm 2\\sqrt{3}}{2}$。",
            "上下約分得：$x = 2 \\pm \\sqrt{3}$。"
          ]
        },
        tries: [
          {
            q: "若方程式 $x^2 - 6x + k = 0$ 有重根，則常數 $k$ 的值為多少？",
            options: ["9", "-9", "3", "36"],
            ans: 0,
            explain: "有重根表示判別式 $D = 0$：$b^2 - 4ac = (-6)^2 - 4(1)(k) = 36 - 4k = 0 \\implies 4k = 36 \\implies k = 9$。"
          },
          {
            q: "將二次方程式 $2x^2 - 8x + 3 = 0$ 化為 $(x - p)^2 = q$ 的形式，則 $p + q$ 的值是多少？",
            options: ["4.5 (即 9/2)", "4", "3.5", "5"],
            ans: 0,
            explain: "同除以 2：$x^2 - 4x + 1.5 = 0 \\implies x^2 - 4x = -1.5$。兩邊加 $2^2=4$：$(x - 2)^2 = -1.5 + 4 = 2.5$。因此 $p = 2, q = 2.5 \\implies p + q = 4.5$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若關於 $x$ 的方程式 $x^2 + 2kx + (k + 6) = 0$ 有實數解，則 $k$ 的取值範圍為何？",
        options: ["k >= 3 或 k <= -2", "k > 3 或 k < -2", "-2 <= k <= 3", "k <= 3"],
        ans: 0,
        hint: "有實數解包含「兩相異實根」或「重根」，即判別式 $D \\ge 0$！",
        explain: "有實根代表 $D \\ge 0$：$(2k)^2 - 4(1)(k + 6) \\ge 0 \\implies 4k^2 - 4k - 24 \\ge 0 \\implies k^2 - k - 6 \\ge 0 \\implies (k - 3)(k + 2) \\ge 0$。解得 $k \\ge 3$ 或 $k \\le -2$。"
      }
    ],

    angles: [
      { title: "花刺子密與《代數學》的誕生", body: "九世紀阿拉伯數學家花刺子密在巴格達「智慧之家」寫下人類第一本系統性代數著作，書名《Al-Jabr》（Algebra 代數學的字源）。他用幾何畫正方形割補的方式，給出了配方法解二次方程的嚴密證明！" },
      { title: "複數虛數的伏筆", body: "當 $D < 0$ 時國中階段稱「無實數解」；而十六世紀義大利數學家卡當為了解三次方程，大膽定義了虛數單位 $i = \\sqrt{-1}$，開啟了現代工程學（交流電、量子物理）必不可少的複數大門！" }
    ],

    where: {
      past: "因式分解法解二次方程（受限於整數交乘）。",
      current: "八年級掌握配方法補角原理，推導萬能公式解與判別式 $D$。",
      next: "下一節將把一元二次方程式投入生活實際情境，解距離、面積與定價利潤應用題！"
    }
  });
})();
