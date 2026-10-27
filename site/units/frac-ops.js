/* 單元：2-3 分數的四則運算 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "分數乘法面積模型");
    s("rect", { x: 80, y: 30, width: 240, height: 140, fill: "#FDFBF6", stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("rect", { x: 80, y: 30, width: 160, height: 140, fill: C.blue.f, opacity: 0.5 }, svg);
    s("rect", { x: 80, y: 30, width: 240, height: 70, fill: C.orange.f, opacity: 0.5 }, svg);
    s("rect", { x: 80, y: 30, width: 160, height: 70, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
    SK.label(svg, 160, 65, "2/3 × 1/2", { size: 14, color: C.green.s, bold: true });
    SK.label(svg, 200, 18, "寬 2/3", { size: 13, color: C.blue.s });
    SK.label(svg, 50, 100, "長 1/2", { size: 13, color: C.orange.s });
  }

  SK.mountUnit({
    slug: "frac-ops",
    en: "Operations with Fractions",
    formula: "\\frac{a}{b}\\div\\frac{c}{d} = \\frac{a}{b}\\times\\frac{\\cb{d}}{\\co{c}} = \\frac{ad}{bc}",

    hook: {
      html: "除以分數為什麼要<b>「顛倒相乘」</b>？例如有 6 塊披薩，每人分 $\\frac{1}{2}$ 塊，總共可以分給幾個人？$6\\div\\frac{1}{2} = 6\\times 2 = 12$ 人！因為每 1 塊披薩可以切出 2 個半塊，所以乘上倒數。",
      ask: "負號放在分數前面、分子、分母，意思都一樣嗎？",
      visual: hookVisual
    },

    guess: {
      q: "關於負分數符號的位置，下列等式何者錯誤？",
      options: [
        { t: "$-\\frac{3}{4} = \\frac{-3}{-4}$", truth: true, explain: "錯誤！分子分母都是負數時，負負得正，$\\frac{-3}{-4} = \\frac{3}{4}$，變成正數了！" },
        { t: "$-\\frac{3}{4} = \\frac{-3}{4}$", explain: "正確，負號放在分數前或分子，代表同一個負分數。" },
        { t: "$-\\frac{3}{4} = \\frac{3}{-4}$", explain: "正確，正除以負仍為負數。" },
        { t: "$-2\\frac{1}{3} = -\\left(2 + \\frac{1}{3}\\right) = -2 - \\frac{1}{3}$", explain: "正確，帶分數的負號管轄整個數，拆開時整數與分數部分都要帶負號。" }
      ]
    },

    derive: {
      intro: "操作滑桿觀察通分相加與倒數相乘的幾何面積分配原理。",
      frames: [
        { cap: "約分與擴分：分子分母同乘或同除以同一非零整數，分數數值不變。最簡分數為分子分母互質。", tex: "\\frac{a}{b} = \\frac{a\\times k}{b\\times k}\\quad (k\\ne 0)" },
        { cap: "分數加減法：異分母分數相加減時，必須先找到分母的公倍數進行<b>通分</b>，再將分子相加減。", tex: "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}" },
        { cap: "分數乘法：分子乘分子、分母乘分母，計算前先交叉約分能大幅簡化運算。", tex: "\\frac{a}{b}\\times\\frac{c}{d} = \\frac{ac}{bd}" },
        { cap: "除以分數等於乘以倒數：兩數相乘等於 1 互為倒數，除法轉為乘法倒數運算。", tex: "\\frac{a}{b}\\div\\frac{c}{d} = \\frac{a}{b}\\times\\frac{d}{c}" }
      ],
      hint: "帶分數進行乘除時，一定要先化成假分數才能約分！切勿整數與整數乘、分數與分數乘。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "分數切片示意");
        var slA = SK.slider({ label: "分子 a", min: 1, max: 5, step: 1, value: 2, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "分母 b", min: 2, max: 6, step: 1, value: 3, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = Math.min(slA.value, slB.value);
          var b = slB.value;
          svg.innerHTML = "";
          for (var i = 0; i < b; i++) {
            s("rect", { x: 60 + i * (300 / b), y: 70, width: 300 / b, height: 100, fill: i < a ? C.blue.f : "#FDFBF6", stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          }
          SK.label(svg, 210, 200, "塗色部分佔整體的 " + a + "/" + b, { size: 16, color: C.blue.s, bold: true });
          read.innerHTML = SK.tex("\\text{圖示分數: }\\frac{" + a + "}{" + b + "}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "分數的四則混合運算",
        code: "N-7-3",
        demo: {
          q: "計算算式 $\\left(-1\\frac{1}{2}\\right)\\div\\frac{3}{4} - \\left(-\\frac{2}{3}\\right)\\times\\frac{9}{4}$ 的值。",
          steps: [
            "帶分數化為假分數：$-1\\frac{1}{2} = -\\frac{3}{2}$。",
            "除法變乘倒數：$\\left(-\\frac{3}{2}\\right)\\times\\frac{4}{3} = -2$。",
            "乘法約分計算：$\\left(-\\frac{2}{3}\\right)\\times\\frac{9}{4} = -\\frac{3}{2}$。",
            "合併加減：$(-2) - \\left(-\\frac{3}{2}\\right) = -2 + \\frac{3}{2} = -\\frac{1}{2}$。"
          ]
        },
        tries: [
          {
            q: "計算算式 $\\frac{5}{6} - \\left(-\\frac{3}{4}\\right) + \\left(-\\frac{2}{3}\\right)$ 的值。",
            hint: "分母 6、4、3 的最小公倍數是 12，通分後再計算。",
            ans: "$\\frac{10}{12} + \\frac{9}{12} - \\frac{8}{12} = \\frac{11}{12}$。"
          },
          {
            q: "計算算式 $\\left(-\\frac{4}{5}\\right)\\times\\frac{15}{8}\\div\\left(-1\\frac{1}{2}\\right)$ 的值。",
            hint: "三個負數符號判別：兩負得正，結果為正數；除以 $3/2$ 等於乘以 $2/3$。",
            ans: "$\\frac{4}{5}\\times\\frac{15}{8}\\times\\frac{2}{3} = 1$。"
          }
        ],
        edge: "注意帶分數的拆法：$-3\\frac{2}{5} = -(3 + \\frac{2}{5}) = -3 - \\frac{2}{5}$，絕對不能寫成 $-3 + \\frac{2}{5}$！"
      }
    ],

    angles: [
      {
        title: "倒數與天平平衡",
        icon: "sparkle",
        html: "若 $\\frac{2}{3}\\times x = 1$，兩邊同乘 $\\frac{3}{2}$ 即可解出 $x=\\frac{3}{2}$。任何非零數與其倒數相乘恆等於 1，倒數在方程式求解時是將未知數係數變回 1 的最佳武器。"
      },
      {
        title: "乘法分配律在帶分數乘法中的巧用",
        icon: "leaf",
        html: "計算 $99\\frac{5}{6}\\times 12$ 時，不要傻傻把整數乘進分子！拆成 $(100 - \\frac{1}{6})\\times 12 = 1200 - 2 = 1198$，幾秒鐘就能口算得出答案。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "求 $-\\frac{5}{7}$ 的相反數與倒數。",
        hint: "相反數變號，倒數分子分母顛倒。",
        idea: "相反數為 $\\frac{5}{7}$；倒數為 $-\\frac{7}{5}$（或 $-1\\frac{2}{5}$）。"
      },
      {
        lv: "Explore",
        q: "若水桶裝滿水時重 18 公斤，喝掉 $\\frac{2}{3}$ 的水後連桶重 8 公斤，求水桶本身的空桶重為多少公斤？",
        hint: "喝掉的水占原來水的幾分之幾？重量減輕了多少？",
        idea: "喝掉 $\\frac{2}{3}$ 的水重為 $18 - 8 = 10$ 公斤，故全部水重為 $10\\div\\frac{2}{3} = 15$ 公斤。空桶重量為 $18 - 15 = 3$ 公斤。"
      },
      {
        lv: "Wonder",
        q: "計算算式 $\\frac{1}{1\\times 2} + \\frac{1}{2\\times 3} + \\frac{1}{3\\times 4} + \\cdots + \\frac{1}{99\\times 100}$ 的總和。",
        hint: "裂項拆開：$\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$。",
        idea: "拆項對消：$(1 - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + \\cdots + (\\frac{1}{99} - \\frac{1}{100}) = 1 - \\frac{1}{100} = \\frac{99}{100}$。"
      }
    ],

    where: {
      codes: [["N-7-3", "負數與分數的四則混合運算"]],
      exam: "會考常考分數的四則運算規則、倒數概念與折扣分裝應用題。",
      stop: "分數運算著重基本通分、約分與符號規則，避免分母數字極為龐大或多層繁分數的技巧性題目。"
    }
  });
})();
