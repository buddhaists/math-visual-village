/* 單元：1-2 二次函數的最大值與最小值 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "頂點即為極值點");
    // 左開口向上
    s("path", { d: "M 40 40 Q 110 160 180 40", stroke: C.orange.s, "stroke-width": 2.5, fill: "none" }, svg);
    s("circle", { cx: 110, cy: 130, r: 5, fill: C.red.s }, svg);
    SK.label(svg, 110, 155, "a > 0 有最小值 k", { size: 12, color: C.orange.s, bold: true });

    // 右開口向下
    s("path", { d: "M 220 160 Q 290 40 360 160", stroke: C.blue.s, "stroke-width": 2.5, fill: "none" }, svg);
    s("circle", { cx: 290, cy: 70, r: 5, fill: C.red.s }, svg);
    SK.label(svg, 290, 50, "a < 0 有最大值 k", { size: 12, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "quad-func-extrema",
    en: "Extrema of Quadratic Functions",
    formula: "y = a(x-h)^2 + k \\implies \\text{開口向上}(a>0)\\text{有最小值 } k；\\text{開口向下}(a<0)\\text{有最大值 } k",

    hook: {
      html: "農夫用固定長度 40 公尺的籬笆圍一座靠牆的長方形菜園，長寬該如何分配才能圈出「最大面積」？商店該定價多少錢才能賺取「最高利潤」？在現實世界中，最賺錢、最省料、飛得最高的生活最佳化問題，答案通通隱藏在<b>二次函數的拋物線頂點</b>！",
      ask: "為什麼完全平方式 $(x - h)^2$ 恆大於等於 0，能保證頂點就是全局唯一的最高點或最低點？",
      visual: hookVisual
    },

    guess: {
      q: "當 $x$ 等於多少時，二次函數 $y = -3(x - 5)^2 + 18$ 會有最大值？最大值是多少？",
      options: [
        { t: "當 x = 5 時，有最大值 18", truth: true, explain: "因為平方項 $(x - 5)^2 \\ge 0$，乘上負號 $-3(x - 5)^2 \\le 0$。因此當 $x = 5$ 時，括號為 0，整體達到最高頂峰，最大值為 18！" },
        { t: "當 x = -5 時，有最大值 18", common: true, explain: "正負號錯誤，令括號為 0 得 $x - 5 = 0 \\implies x = 5$。" },
        { t: "當 x = 5 時，有最小值 18", explain: "開口向下（$a = -3 < 0$），頂點是最高點，是最大值而非最小值。" },
        { t: "沒有最大值", explain: "開口向下的拋物線必有唯一的最大值。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整自變數 $x$ 的數值，觀察函數值如何從兩側爬升至頂點極值巔峰。",
      frames: [
        { cap: "極值的代數根基：任何實數的平方必為非負數：$(x - h)^2 \\ge 0$。只有當 $x = h$ 時，平方項才達到極小值 0！", tex: "(x - h)^2 \\ge 0\\quad (\\text{當 }x=h\\text{ 時為 }0)" },
        { cap: "開口向上（$a > 0$）：$y = a(x - h)^2 + k \\ge k$。拋物線有最低點，當 $x = h$ 時有<b>最小值 $k$</b>（無最大值）。", tex: "a > 0 \\implies \\text{當 }x=h\\text{ 時，}\\min = k" },
        { cap: "開口向下（$a < 0$）：$y = a(x - h)^2 + k \\le k$。拋物線有最高點，當 $x = h$ 時有<b>最大值 $k$</b>（無最小值）。", tex: "a < 0 \\implies \\text{當 }x=h\\text{ 時，}\\max = k" },
        { cap: "有範圍限制時的極值：若題目限制自變數範圍 $\\alpha \\le x \\le \\beta$，需比較<b>頂點與兩端點</b>的函數值大小！", tex: "\\text{比較 }f(h), f(\\alpha), f(\\beta)" }
      ],
      hint: "生活極值題三部曲：設變數 $x$、依題意列出二次函數 $y$、配方找頂點即為極值！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "二次函數極值模擬");
        var slX = SK.slider({ label: "代入自變數 x", min: -1, max: 7, step: 0.5, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 1); }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value;
          // y = -(x - 3)^2 + 16 (h=3, k=16, max=16)
          var y = -(x - 3) * (x - 3) + 16;
          var ox = 220, oy = 210, scaleX = 25, scaleY = 10;
          svg.innerHTML = "";
          // 軸
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 畫拋物線
          var dStr = "";
          for (var tx = -1; tx <= 7; tx += 0.2) {
            var currY = -(tx - 3) * (tx - 3) + 16;
            var px = ox + (tx - 3) * scaleX;
            var py = oy - currY * scaleY;
            dStr += (dStr === "" ? "M " : " L ") + px + " " + py;
          }
          s("path", { d: dStr, stroke: C.blue.s, "stroke-width": 2.5, fill: "none" }, svg);

          // 當前點
          var pCurX = ox + (x - 3) * scaleX;
          var pCurY = oy - y * scaleY;
          s("circle", { cx: pCurX, cy: pCurY, r: 6, fill: x === 3 ? C.red.s : C.orange.s }, svg);
          SK.label(svg, pCurX, pCurY - 12, "(" + x + ", " + y.toFixed(1) + ")", { size: 12, color: x === 3 ? C.red.s : C.ink, bold: true });

          read.innerHTML = SK.tex("y = -(x - 3)^2 + 16\\quad \\implies \\text{當 }x = 3\\text{ 時達到最高巔峰，最大值 }\\max = 16\\text{！當前 }y = " + y.toFixed(1), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求二次函數極值與圍籬最大面積",
        code: "F-9-2",
        demo: {
          q: "用一條長 40 公尺的鐵絲網圍成一座長方形花圃。求花圃的最大面積是多少平方公尺？此時花圃的長寬各是多少？",
          steps: [
            "設未知數：周長為 40 公尺，長寬和為 20 公尺。設寬為 $x$ 公尺，則長為 $(20 - x)$ 公尺。",
            "列二次函數面積：$y = x(20 - x) = -x^2 + 20x$。",
            "配方法求極值：$y = -(x^2 - 20x + 100) + 100 = -(x - 10)^2 + 100$。",
            "分析結果：開口向下，當寬 $x = 10$ 公尺（此時長亦為 $20 - 10 = 10$ 公尺，圍成正方形）時，有最大面積為 $100$ 平方公尺！"
          ]
        },
        tries: [
          {
            q: "求二次函數 $y = 2x^2 - 12x + 23$ 的最小值是多少？",
            options: ["5", "23", "-5", "11"],
            ans: 0,
            explain: "配方：$y = 2(x^2 - 6x + 9) + 23 - 18 = 2(x - 3)^2 + 5$。開口向上，當 $x = 3$ 時有最小值 $5$。"
          },
          {
            q: "將兩正數之和定為 16，若欲使其乘積達到最大，則這兩數的乘積最大值是多少？",
            options: ["64", "60", "48", "32"],
            ans: 0,
            explain: "設一數為 $x$，另一數為 $(16 - x)$。乘積 $P = x(16 - x) = -(x - 8)^2 + 64$。當兩數相等皆為 8 時，乘積有最大值 64。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "某旅行社舉辦一日遊，預定人數為 30 人，每人收費 600 元。若人數每增加 1 人，每人團費可減收 10 元。若旅行社想收到最高的總收入，應招攬多少人參加？最高總收入是多少元？",
        options: [
          "招攬 45 人，最高收入 20250 元",
          "招攬 30 人，最高收入 18000 元",
          "招攬 40 人，最高收入 20000 元",
          "招攬 50 人，最高收入 20000 元"
        ],
        ans: 0,
        hint: "設增加 $x$ 人，總人數為 $(30 + x)$ 人，每人收費 $(600 - 10x)$ 元。",
        explain: "總收入 $y = (30 + x)(600 - 10x) = -10(x + 30)(x - 60) = -10(x^2 - 30x - 1800) = -10(x - 15)^2 + 20250$。當 $x = 15$ 時，總人數為 $30 + 15 = 45$ 人，每人團費 $600 - 150 = 450$ 元，最高總收入為 $20250$ 元！"
      }
    ],

    angles: [
      { title: "幾何等周定理（Isoperimetric Problem）", body: "當周長固定為常數時，長方形中以「正方形」面積最大；而在所有任意封閉形狀中，以「圓形」能包覆的面積為最大！這正是肥皂泡、水滴在表面張力作用下自然收縮成完美球體的最省能量物理原理。" },
      { title: "機器學習損失函數的梯度下降", body: "AI 神經網路在訓練時，目標是讓預測誤差（損失函數 Loss）降到最小。對於凸二次問題，神經網路沿著拋物線碗壁的斜率一路向下尋找最底部的極小值點，這就是梯度下降演算法（Gradient Descent）！" }
    ],

    where: {
      past: "上一節學會二次函數的配方與拋物線頂點。",
      current: "九年級下學期掌握利用拋物線頂點求解生活利潤、面積與物理極值的終極利器。",
      next: "第二章將從幾何代數轉向數據統計——「四分位數、四分位距與盒狀圖」！"
    }
  });
})();
