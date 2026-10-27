/* 單元：2-1 質因數分解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "質數篩法示意");
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    for (var i = 0; i < 10; i++) {
      var x = 40 + (i % 5) * 70, y = 55 + Math.floor(i / 5) * 70;
      s("circle", { cx: x, cy: y, r: 24, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
      SK.label(svg, x, y, String(primes[i]), { size: 16, color: C.ink, bold: true });
    }
    SK.label(svg, 200, 175, "不可再分解的數學積木（質數）", { size: 14, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "prime-factor",
    en: "Prime Factorization",
    formula: "n = 2^a \\times 3^b \\times 5^c \\times \\cdots \\quad (2, 3, 5\\cdots \\text{為質數})",

    hook: {
      html: "就像所有化學物質都是由元素週期表上的原子構成一樣，在乘法世界裡，每個大於 1 的正整數都是由<b>質數</b>這群基本積木相乘而成的！這在數學上稱為<b>算術基本定理</b>。",
      ask: "「1」為什麼被排除在質數之外？如果 1 是質數會發生什麼事？",
      visual: hookVisual
    },

    guess: {
      q: "關於質數與合數的性質，下列敘述何者完全正確？",
      options: [
        { t: "2 是唯一的偶質數，也是最小的質數", truth: true, explain: "2 只有 1 和 2 兩個因數，因此是質數；其餘所有大於 2 的偶數都能被 2 整除，所以都是合數！" },
        { t: "所有奇數都是質數", common: true, explain: "像是 9、15、21、25 都是奇數，但它們都是合數！" },
        { t: "1 是最小的質數", explain: "1 只有 1 個因數（自己），質數規定恰好要有「兩個相異因數」，故 1 既非質數也非合數。" },
        { t: "一個正整數如果不是質數，就一定是合數", explain: "忘記了 1！1 既不是質數，也不是合數。" }
      ]
    },

    derive: {
      intro: "透過倍數判別法與短除法，一步步將整數拆解成質因數連乘的標準分解式。",
      frames: [
        { cap: "因數與倍數：若整數 $a$ 能被整數 $b$ 整除（$a=b\\times q$），則 $b$ 是 $a$ 的因數，$a$ 是 $b$ 的倍數。", tex: "a \\div b = q \\implies b \\text{ 是 } a \\text{ 的因數}" },
        { cap: "倍數判別法：末位偶數（2的倍數）、數字和為 3的倍數（3的倍數）、末兩位被4整除（4的倍數）、奇數偶數位差為 11的倍數（11的倍數）。", tex: "\\text{各位數字之和為 } 3 \\text{ 的倍數} \\iff n \\text{ 為 } 3 \\text{ 的倍數}" },
        { cap: "質數與合數：大於 1 的整數中，因數只有 1 與本身的數稱為質數；除了 1 與本身還有其他因數的稱為合數。", tex: "\\text{質數恰有兩個因數：}1\\text{ 與自己}" },
        { cap: "標準分解式：由小到大將質因數以乘方形式排列，任何大於 1 的整數其標準分解式皆唯一確定。", tex: "360 = 2^3 \\times 3^2 \\times 5 \\quad (\\text{質因數由小到大排列})" }
      ],
      hint: "做質因數分解時，由最小的質數 2、3、5、7……依序嘗試短除法。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "短除法樹狀圖");
        var slN = SK.slider({ label: "整數 $\\co{N}$", min: 12, max: 72, step: 4, value: 36, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slN.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var n = slN.value, temp = n;
          var factors = [];
          for (var p = 2; p <= temp; p++) {
            while (temp % p === 0) { factors.push(p); temp /= p; }
          }
          svg.innerHTML = "";
          s("rect", { x: 80, y: 50, width: 280, height: 140, rx: 16, fill: C.mint.f, stroke: C.mint.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 95, String(n), { size: 30, color: C.ink, bold: true });
          SK.label(svg, 220, 145, "= " + factors.join(" × "), { size: 20, color: C.blue.s, bold: true });
          read.innerHTML = SK.tex(n + " = " + factors.join(" \\times "), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用短除法寫出標準分解式",
        code: "N-7-2",
        demo: {
          q: "將 $360$ 做質因數分解，並寫出其標準分解式。",
          steps: [
            "用最小質數 2 連續除：$360\\div 2 = 180$，$180\\div 2 = 90$，$90\\div 2 = 45$（共 3 個 2）。",
            "用質數 3 繼續除：$45\\div 3 = 15$，$15\\div 3 = 5$（共 2 個 3）。",
            "剩下質數 5。寫成標準分解式：$360 = 2^3\\times 3^2\\times 5$。"
          ]
        },
        tries: [
          {
            q: "判斷五位數 $4721a$ 若是 $3$ 的倍數，個位數字 $a$ 可以是多少？",
            hint: "將所有數字相加：$4+7+2+1+a = 14+a$，必須是 3 的倍數。",
            ans: "$14+a$ 為 3 的倍數，且 $0\\le a\\le 9$。故 $a = 1, 4, 7$。"
          },
          {
            q: "求 $180$ 的相異質因數共有哪幾個？所有質因數的和是多少？",
            hint: "先求 $180 = 2^2\\times 3^2\\times 5$ 的底數質因數。",
            ans: "相異質因數為 $2, 3, 5$，共有 3 個；和為 $2+3+5=10$。"
          }
        ],
        edge: "1 不是質數！如果 1 是質數，那麼 $6 = 2\\times 3 = 1\\times 2\\times 3 = 1^2\\times 2\\times 3$，質因數分解就無法維持唯一性了。"
      }
    ],

    angles: [
      {
        title: "正方形與長方形的拼法",
        icon: "sparkle",
        html: "給定 $n$ 個小正方形積木，若只能排成一種長寬形狀（即 $1\\times n$ 的單行長條），這個數 $n$ 就是質數；若可以排成兩種以上的長方形（例如 12 可以排成 $1\\times 12$、$2\\times 6$、$3\\times 4$），這個數就是合數。"
      },
      {
        title: "11 的倍數奇偶檢驗法",
        icon: "leaf",
        html: "判斷 11 的倍數時：將「奇數位的數字和」減去「偶數位的數字和」，若相減的差是 11 的倍數（包含 0），原數就保證能被 11 整除。例如 $8514$：$(8+1) - (5+4) = 9 - 9 = 0$，確實是 11 的倍數！"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "在 30 到 50 之間，共有幾個質數？",
        hint: "利用篩法排除 2、3、5、7 的倍數。",
        idea: "30 到 50 之間的質數有：31, 37, 41, 43, 47，共有 5 個。"
      },
      {
        lv: "Explore",
        q: "若四位數 $735\\square$ 同時是 2 的倍數也是 3 的倍數，則方框中的數字可能為何？",
        hint: "同時是 2 和 3 的倍數，代表它是 6 的倍數，末位必為偶數。",
        idea: "數字和為 $7+3+5+\\square = 15+\\square$，需為 3 的倍數，故方框可為 $0, 3, 6, 9$；又必須是 2 的倍數（偶數），篩選後方框可填 $0$ 或 $6$。"
      },
      {
        lv: "Wonder",
        q: "將一個大於 10 的正整數 $N$ 質因數分解後為 $2^a\\times 3^b$。若 $N$ 的所有正因數個數共有 12 個，且 $a+b=5$，求 $N$ 的值。",
        hint: "因數個數公式：$(a+1)(b+1)$。",
        idea: "因數個數為 $(a+1)(b+1) = 12$。由 $a+b=5$，可知兩整數和為 5 且加一後的乘積為 12，組合為 $a=2, b=3$ 或 $a=3, b=2$。若 $a=2, b=3$ 則 $N=4\\times 27 = 108$；若 $a=3, b=2$ 則 $N=8\\times 9 = 72$。兩者皆大於 10。"
      }
    ],

    where: {
      codes: [["N-7-1", "100以內的質數：質數與合數的定義、質數篩法"], ["N-7-2", "質因數分解的標準分解式與應用"]],
      exam: "會考必定出現倍數判別法或根據標準分解式求因倍數關係的分析題。",
      stop: "質數教學以 100 以內質數為核心；大數的質數檢驗只要求檢驗到 $\\sqrt{n}$ 以內的質數即可。"
    }
  });
})();
