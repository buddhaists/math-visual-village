/* 單元：3-1 以符號列式與運算 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "代數箱子模型");
    for (var i = 0; i < 3; i++) {
      s("rect", { x: 60 + i * 55, y: 70, width: 45, height: 55, rx: 6, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
      SK.label(svg, 82 + i * 55, 102, "x", { size: 20, color: C.orange.s, bold: true });
    }
    SK.label(svg, 240, 102, "+", { size: 22, color: C.cocoa, bold: true });
    for (var j = 0; j < 4; j++) {
      s("circle", { cx: 275 + j * 24, cy: 102, r: 8, fill: C.green.f, stroke: C.green.s, "stroke-width": 1.5 }, svg);
      SK.label(svg, 275 + j * 24, 102, "1", { size: 10, color: C.green.s });
    }
    SK.label(svg, 200, 170, "3 個箱子加 4 顆球 = 3x + 4", { size: 15, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "alg-expr",
    en: "Algebraic Expressions and Operations",
    formula: "ax + bx = \\co{(a+b)x},\\quad a(bx+c) = \\co{abx} + \\cb{ac}",

    hook: {
      html: "當我們不知道確切數字時，用英文字母 $x$ 或 $y$ 當作「代表箱子」。箱子裡可以裝任何數字。學會用<b>代數式</b>思考，就能把世間萬物千變萬化的數量關係，寫成簡潔明確的數學語言！",
      ask: "$x\\times x$ 與 $x + x$ 有什麼本質上的不同？",
      visual: hookVisual
    },

    guess: {
      q: "化簡一次式 $3(2x - 5) - 4(x - 3)$ 的結果是多少？",
      options: [
        { t: "$2x - 3$", truth: true, explain: "展開：$6x - 15 - 4x + 12 = (6x - 4x) + (-15 + 12) = 2x - 3$。注意 $-4\\times(-3) = +12$！" },
        { t: "$2x - 27$", common: true, explain: "忘記負負得正！後面算成 $-15 - 12 = -27$，這是去括號變號最常跌倒的地方。" },
        { t: "$10x - 3$", explain: "減法算成了加法：$6x - 4x = 2x$，不是 $10x$。" },
        { t: "$2x + 3$", explain: "常數項符號算錯了，$-15 + 12 = -3$。" }
      ]
    },

    derive: {
      intro: "拖動滑桿代入不同的未知數 $x$，觀察代數式的值如何隨著 $x$ 同步連動。",
      frames: [
        { cap: "符號簡記約定：數字與文字相乘，乘號省略且數字寫在文字前方（$x\\times 3 = 3x$）；係數為 1 略寫（$1x = x$）；除法寫成分數。", tex: "a\\times x = ax,\\quad x\\div a = \\frac{x}{a}" },
        { cap: "同類項合併：含相同文字符號且次數相同的項稱為同類項。同類項的係數可以依分配律直接相加減。", tex: "3x + 5x = (3+5)x = 8x" },
        { cap: "去括號與分配律：括號外有負號時，乘進去每一項都要變號。", tex: "-(ax - b) = -ax + b" },
        { cap: "代數式求值：將給定的數代入式中的未知數計算；若代入負數，務必加上括號。", tex: "x = -2 \\implies 3x^2 - 4x = 3(-2)^2 - 4(-2) = 12 + 8 = 20" }
      ],
      hint: "同類項才能合併！$3x$ 與 $5$ 不是同類項，絕對不能合編成 $8x$。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "代數求值連動");
        var slX = SK.slider({ label: "未知數 $\\co{x}$", min: -4, max: 6, step: 1, value: 3, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value, val = 4 * x - 5;
          svg.innerHTML = "";
          s("rect", { x: 70, y: 60, width: 300, height: 120, rx: 14, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 95, "代數式: 4x - 5", { size: 20, color: C.ink, bold: true });
          SK.label(svg, 220, 140, "當 x = " + x + " 時，值為 4(" + x + ") - 5 = " + val, { size: 16, color: C.blue.s, bold: true });
          read.innerHTML = SK.tex("x = " + x + " \\implies 4(" + x + ") - 5 = " + val, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "一次式的化簡與去分母迷思",
        code: "A-7-1",
        demo: {
          q: "化簡分數型一次式 $\\frac{3x - 1}{2} - \\frac{2x - 3}{3}$。",
          steps: [
            "這是「式子的化簡」，沒有等號，不能把分母直接消掉！必須進行「通分」，公分母為 6。",
            "通分擴分：$\\frac{3(3x - 1)}{6} - \\frac{2(2x - 3)}{6}$。",
            "合併分子去括號：$\\frac{(9x - 3) - (4x - 6)}{6} = \\frac{9x - 3 - 4x + 6}{6} = \\frac{5x + 3}{6}$。"
          ]
        },
        tries: [
          {
            q: "化簡式子 $5(x - 2) - 2(3x - 4)$。",
            hint: "括號展開：$5x - 10 - 6x + 8$。",
            ans: "$(5x - 6x) + (-10 + 8) = -x - 2$。"
          },
          {
            q: "當 $x = -3$ 時，求代數式 $-2x^2 + 5x - 7$ 的值。",
            hint: "代入負數加括號：$(-3)^2 = 9$。",
            ans: "$-2(-3)^2 + 5(-3) - 7 = -2(9) - 15 - 7 = -18 - 15 - 7 = -40$。"
          }
        ],
        edge: "最致命錯誤：化簡 $\\frac{x}{2} - \\frac{x}{3}$ 時直接把分母消掉寫成 $3x - 2x = x$！式子化簡只能「通分保留分母」，只有「方程式（兩邊有等號）」才能同乘消分母。"
      }
    ],

    angles: [
      {
        title: "生活情境的符號化",
        icon: "sparkle",
        html: "一件衣服原價 $x$ 元：<br>‧ 打八折：$0.8x$ 元。<br>‧ 降價 100 元：$x - 100$ 元。<br>‧ 加三成：$x(1 + 0.3) = 1.3x$ 元。<br>文字敘述與數學算式是一對一翻譯的鏡像。"
      },
      {
        title: "同類項的積木比喻",
        icon: "leaf",
        html: "把 $x$ 想成「蘋果」，常數項想成「元」。$3$ 顆蘋果加 $5$ 顆蘋果是 $8$ 顆蘋果（$3x+5x=8x$）；但 $3$ 顆蘋果加 $5$ 元不能說成 $8$ 顆蘋果（$3x+5 \\ne 8x$）！單位不同絕不可混為一談。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "某班有男生 $x$ 人，女生人數比男生的 2 倍少 5 人。用 $x$ 表示全班的總人數。",
        hint: "女生人數為 $2x - 5$ 人，全班為男生加女生。",
        idea: "全班總人數 $= x + (2x - 5) = 3x - 5$ 人。"
      },
      {
        lv: "Explore",
        q: "若兩代數式 $3x + 2a$ 與 $bx - 4$ 化簡後完全相等，求常數 $a$ 與 $b$ 的值。",
        hint: "兩式完全相等代表同類項係數相同、常數項也相同。",
        idea: "$x$ 的係數對應：$b = 3$；常數項對應：$2a = -4 \\implies a = -2$。"
      },
      {
        lv: "Wonder",
        q: "小明今年 $x$ 歲，媽媽今年的年齡是小明的 3 倍多 2 歲。請問 5 年後，媽媽的年齡比小明大幾歲？（用含 $x$ 的式子化簡）",
        hint: "兩人的年齡差，無論過幾年都永遠不會改變！",
        idea: "今年媽媽年齡為 $3x + 2$ 歲。年齡差距永遠固定：$(3x + 2) - x = 2x + 2$ 歲。5 年後媽媽依然比小明大 $2x + 2$ 歲。"
      }
    ],

    where: {
      codes: [["A-7-1", "代數符號：代數符號表徵運算律、一次式化簡與同類項"]],
      exam: "會考前幾題必考代數式文字題列式與一次式去括號合併化簡。",
      stop: "七上代數式以一次式為主，二次項僅在代入求值短暫出現，不作二次多項式的乘除法。"
    }
  });
})();
