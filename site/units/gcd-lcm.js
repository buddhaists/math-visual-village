/* 單元：2-2 公因數與公倍數 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "鋪磁磚問題");
    s("rect", { x: 60, y: 40, width: 280, height: 120, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    for (var x = 0; x < 7; x++) {
      for (var y = 0; y < 3; y++) {
        s("rect", { x: 60 + x * 40, y: 40 + y * 40, width: 40, height: 40, fill: "none", stroke: C.cocoa, "stroke-dasharray": "2 2" }, svg);
      }
    }
    SK.label(svg, 200, 25, "長 28 cm", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 35, 100, "寬 12", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 200, 185, "正方形磁磚邊長 = (28, 12) = 4 cm", { size: 14, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "gcd-lcm",
    en: "Greatest Common Divisor and Least Common Multiple",
    formula: "(a,b)\\times [a,b] = \\co{a}\\times\\cb{b}",

    hook: {
      html: "想用相同大小的「正方形磁磚」剛好鋪滿長 28、寬 12 的長方形地板，磁磚邊長最大是幾公分？（求最大公因數）；若兩個路口的紅綠燈分別每 28 秒與 12 秒變換一次，下一次同時變燈是幾秒後？（求最小公倍數）。",
      ask: "兩個整數如果互質，代表它們都必須是質數嗎？",
      visual: hookVisual
    },

    guess: {
      q: "若兩整數 $a$ 與 $b$ 互質，記作 $(a, b) = 1$。下列敘述何者正確？",
      options: [
        { t: "兩數的最大公因數只有 1，但不代表兩數都必須是質數", truth: true, explain: "例如 8 和 9 都是合數，但 $(8, 9) = 1$，它們彼此互質！" },
        { t: "$a$ 和 $b$ 兩者必定都是質數", common: true, explain: "互質是指「沒有大於 1 的公因數」，個別數字可以是合數。" },
        { t: "兩數的最小公倍數也是 1", explain: "互質的兩數最小公倍數為兩數相乘 $[a, b] = a\\times b$。" },
        { t: "兩數相除一定能整除", explain: "互質表示除了 1 之外沒有共同因數，相除絕對無法整除。" }
      ]
    },

    derive: {
      intro: "透過標準分解式，看清楚最大公因數（取共同最低次）與最小公倍數（取所有最高次）的結構。",
      frames: [
        { cap: "最大公因數 $(a, b)$：所有公因數中最大者。標準分解式中<b>取共同質因數的最小次方</b>相乘。", tex: "(2^3\\times 3^2,\\ 2^2\\times 3^3) = 2^2\\times 3^2 = 36" },
        { cap: "最小公倍數 $[a, b]$：所有正公倍數中最小者。標準分解式中<b>取所有出現過的質因數之最大次方</b>相乘。", tex: "[2^3\\times 3^2,\\ 2^2\\times 3^3] = 2^3\\times 3^3 = 216" },
        { cap: "短除法雙刀流：用公因數同除兩數，直到商互質為止；左邊乘積為最大公因數，左邊連同底層商全部相乘為最小公倍數。", tex: "\\text{左側} = (a,b),\\quad \\text{L形全乘} = [a,b]" },
        { cap: "兩數乘積恆等式：任意兩正整數的乘積，永遠等於它們的最大公因數乘以最小公倍數。", tex: "(a,b)\\times [a,b] = a\\times b" }
      ],
      hint: "想把大東西切成等分正方體用最大公因數；想找排隊同時到、週期重疊用最小公倍數。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "文氏圖求公因倍數");
        var slA = SK.slider({ label: "數 A", min: 12, max: 48, step: 6, value: 24, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "數 B", min: 12, max: 48, step: 6, value: 36, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }

        function draw() {
          var a = slA.value, b = slB.value;
          var g = gcd(a, b), l = (a * b) / g;
          svg.innerHTML = "";
          s("circle", { cx: 170, cy: 110, r: 75, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          s("circle", { cx: 270, cy: 110, r: 75, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 120, 110, String(a / g), { size: 18, color: C.orange.s, bold: true });
          SK.label(svg, 220, 110, String(g), { size: 22, color: C.green.s, bold: true });
          SK.label(svg, 320, 110, String(b / g), { size: 18, color: C.blue.s, bold: true });
          SK.label(svg, 220, 205, "最大公因數 (A,B) = " + g + "，最小公倍數 [A,B] = " + l, { size: 14, color: C.cocoa, bold: true });
          read.innerHTML = SK.tex("(" + a + ", " + b + ") = " + g + ",\\quad [" + a + ", " + b + "] = " + l, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "標準分解式求最大公因數與最小公倍數",
        code: "N-7-2",
        demo: {
          q: "設 $A = 2^3\\times 3^2\\times 5$， $B = 2^2\\times 3^3\\times 7$，求 $(A, B)$ 與 $[A, B]$ 的標準分解式。",
          steps: [
            "最大公因數 $(A, B)$ 取共同質因數之最低次方：$2^2\\times 3^2$。",
            "最小公倍數 $[A, B]$ 取所有出現質因數之最高次方：$2^3\\times 3^3\\times 5\\times 7$。",
            "檢查：$A\\times B = (A,B)\\times [A,B]$ 兩邊次方完全平衡。"
          ]
        },
        tries: [
          {
            q: "用短除法求 $48$ 與 $72$ 的最大公因數與最小公倍數。",
            hint: "連續用公因數除，直到兩數互質為止。",
            ans: "$(48, 72) = 24$，$[48, 72] = 144$。"
          },
          {
            q: "長方體積木長 6 公分、寬 4 公分、高 3 公分。若想用這種積木堆出一個最小的正方體，需要幾個積木？",
            hint: "正方體邊長為長寬高的最小公倍數 $[6, 4, 3]$。",
            ans: "$[6, 4, 3] = 12$ 公分。長需 2 塊、寬需 3 塊、高需 4 塊，共需 $2\\times 3\\times 4 = 24$ 個積木。"
          }
        ],
        edge: "做三個數的最小公倍數短除法時，只要其中任「兩數」有公因數就必須繼續除，沒除到的數字直接照抄掉下來！這與求三個數的最大公因數（必須三數同時有公因數）截然不同。"
      }
    ],

    angles: [
      {
        title: "幾何拼圖與切割",
        icon: "sparkle",
        html: "<b>公因數是切割問題</b>：將大長方形無縫切成等大的正方形；<b>公倍數是拼圖問題</b>：將小長方形磚塊組裝鋪成大正方形。一個向內切，一個向外拼，方向正好互逆。"
      },
      {
        title: "公倍數在分數通分中的角色",
        icon: "leaf",
        html: "計算分數加法如 $\\frac{1}{12} + \\frac{1}{18}$ 時，之所以要把分母通分成 36，就是因為 $36=[12, 18]$ 是它們的最小公倍數！公倍數架起了不同刻度之間的共通溝通橋樑。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "兩整數 $A$ 與 $B$ 的最大公因數為 12，最小公倍數為 72。若 $A=24$，求 $B$ 的值。",
        hint: "利用兩數乘積等於最大公因數乘最小公倍數的性質。",
        idea: "$A\\times B = (A,B)\\times [A,B] \\implies 24\\times B = 12\\times 72 \\implies B = 36$。"
      },
      {
        lv: "Explore",
        q: "某車站公車 A 每 15 分鐘發一班，公車 B 每 20 分鐘發一班。若上午 6:00 兩公車同時出發，下一次同時發車是在幾點幾分？",
        hint: "求 15 與 20 的最小公倍數。",
        idea: "$[15, 20] = 60$ 分鐘 $= 1$ 小時。上午 6:00 加上 1 小時為上午 7:00。"
      },
      {
        lv: "Wonder",
        q: "一個正整數除以 5 餘 3，除以 6 餘 4，除以 7 餘 5。滿足條件的最小正整數是多少？",
        hint: "觀察餘數特點：$5-3=2$，$6-4=2$，$7-5=2$，都是「不足 2」！",
        idea: "因為不足 2，代表該數如果加上 2，就能被 5、6、7 同時整除。$[5, 6, 7] = 210$。故此數最小為 $210 - 2 = 208$。"
      }
    ],

    where: {
      codes: [["N-7-2", "利用標準分解式與短除法求最大公因數與最小公倍數及應用"]],
      exam: "會考常見生活排程、物品分裝、磁磚鋪設等以因倍數為骨架的應用題。",
      stop: "國中公因倍數以二至三數為限，不考輾轉相除法及四個數以上之複雜多重短除。"
    }
  });
})();
