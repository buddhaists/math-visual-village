/* 單元：2-1 一次函數及其圖形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "自動販賣機的函數對應");
    s("rect", { x: 50, y: 40, width: 90, height: 110, rx: 8, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 95, 75, "輸入 x", { size: 14, color: C.ink, bold: true });
    SK.label(svg, 95, 105, "按鍵投幣", { size: 12, color: C.soft });

    s("line", { x1: 145, y1: 95, x2: 245, y2: 95, stroke: C.orange.s, "stroke-width": 3 }, svg);
    s("polygon", { points: "245,95 235,90 235,100", fill: C.orange.s }, svg);
    SK.label(svg, 195, 80, "y = f(x)", { size: 14, color: C.orange.s, bold: true });

    s("rect", { x: 250, y: 40, width: 100, height: 110, rx: 8, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 300, 75, "輸出 y", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 300, 105, "唯一掉落飲料", { size: 12, color: C.soft });
    SK.label(svg, 200, 185, "一個 x 只能對應恰好一個 y！", { size: 13, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "linear-func",
    en: "Linear Functions and Their Graphs",
    formula: "f(x) = ax + b\\quad (a\\ne 0:\\ \\text{一次函數};\\ a=0:\\ \\text{常數函數})",

    hook: {
      html: "當你按下自動販賣機上的按鍵 $x$，掉下來的飲料 $y$ 必定是唯一且明確的——按下紅茶鍵絕不可能同時掉出綠茶跟奶茶，更不能什麼都不掉！萊布尼茲將這種「<b>每一個輸入 $x$，都恰好對應唯一的輸出 $y$</b>」的關係，命名為<b>函數（Function）</b>！",
      ask: "多對一可以是函數嗎？為什麼一對多與一對無絕對不能稱為函數？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一個對應關係「不是」 $y$ 是 $x$ 的函數？",
      options: [
        { t: "x 為正整數，y 為 x 的因數", truth: true, explain: "當輸入 $x = 6$ 時，因數 $y$ 可以是 1、2、3、6（一對多），違反了「恰好唯一對應一個值」的函數定義！" },
        { t: "x 為學生座號，y 為該學生的身高", common: true, explain: "每個座號恰好對應一個身高，即使兩人同高（多對一）也完全符合函數定義。" },
        { t: "正方形的邊長 x，y 為該正方形的周長", explain: "$y = 4x$，每個邊長恰對應唯一周長，標準函數。" },
        { t: "平年某月份的天數 y 與月份 x", explain: "每個月份只有固定的天數（如 1 月 31 天），是合法的函數。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變函數 $f(x) = ax + b$ 的斜率 $a$ 與截距 $b$，觀察直線傾斜與升降規律。",
      frames: [
        { cap: "函數的核心法則：每一個自變數 $x$，都必定有且僅有一個應變數 $y$ 與之對應。允許「多對一」，嚴禁「一對多」與「一對無」。", tex: "x \\mapsto f(x) = y" },
        { cap: "一次函數：$f(x) = ax + b$（$a\\ne 0$）。其圖形為一條<b>不平行於兩坐標軸的斜直線</b>。$a>0$ 往右上斜，$a<0$ 往右下斜。", tex: "f(x) = ax + b\\ (a\\ne 0)" },
        { cap: "常數函數：$f(x) = b$（$a=0$）。不論輸入什麼 $x$，輸出永遠恆等於常數 $b$，圖形為<b>水平線</b>（平行 $x$ 軸）。", tex: "f(x) = b\\ (\\text{平行 }x\\text{ 軸})" },
        { cap: "鉛直線不是函數：鉛直線 $x = c$ 上有無數個不同的 $y$（一對多），因此<b>鉛直線絕不是函數圖形</b>！", tex: "x = c\\ \\text{不是函數圖形}" }
      ],
      hint: "幾何檢驗法（垂直線檢驗法）：在坐標平面上畫任何鉛直線，如果只跟圖形交於「最多一個點」，它就是函數圖形！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "一次函數圖形推導");
        var slA = SK.slider({ label: "斜率 a", min: -2, max: 2, step: 0.5, value: 1, color: "orange", fmt: function(v){ return SK.fmt(v, 1); }, onInput: draw });
        var slB = SK.slider({ label: "常數項 b", min: -3, max: 3, step: 1, value: 1, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var ox = 220, oy = 130, scale = 25;
          svg.innerHTML = "";
          // 軸
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: 15, x2: ox, y2: 245, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 直線
          var x1 = -7, y1 = a * x1 + b;
          var x2 = 7, y2 = a * x2 + b;
          var px1 = ox + x1 * scale, py1 = oy - y1 * scale;
          var px2 = ox + x2 * scale, py2 = oy - y2 * scale;
          s("line", { x1: px1, y1: py1, x2: px2, y2: py2, stroke: a === 0 ? C.blue.s : C.orange.s, "stroke-width": 3 }, svg);

          // 標記 (0, b)
          var pyB = oy - b * scale;
          s("circle", { cx: ox, cy: pyB, r: 5, fill: C.red.s }, svg);
          SK.label(svg, ox + 15, pyB - 5, "(0, " + b + ")", { size: 12, color: C.red.s, bold: true });

          var typeStr = a !== 0 ? "一次函數" : "常數函數（水平線）";
          read.innerHTML = SK.tex("f(x) = " + (a===0?"":a===1?"x":a===-1?"-x":a+"x") + (b>=0&&a!==0?"+":"") + (b===0&&a!==0?"":b) + "\\quad \\implies \\text{【" + typeStr + "】}，\\text{過截距 }(0, " + b + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求函數值與待定係數法",
        code: "F-8-2",
        demo: {
          q: "已知一次函數 $f(x) = ax + b$，若 $f(2) = 7$ 且 $f(-1) = -2$，求：(1) $a$ 與 $b$ 的值；(2) $f(4)$ 的值。",
          steps: [
            "列聯立方程式：代入 $x=2$ 得 $2a + b = 7$；代入 $x=-1$ 得 $-a + b = -2$。",
            "解聯立方程：兩式相減得 $3a = 9 \\implies a = 3$。代回得 $b = 1$。函數為 $f(x) = 3x + 1$。",
            "求函數值：代入 $x=4$ 得 $f(4) = 3(4) + 1 = 13$。"
          ]
        },
        tries: [
          {
            q: "若常數函數 $g(x) = c$ 滿足 $g(5) = -8$，則 $g(-100)$ 的值是多少？",
            options: ["-8", "-100", "0", "8"],
            ans: 0,
            explain: "常數函數的輸出永遠恆等於常數 $c$！因為 $g(5) = -8$，所以對任意 $x$ 都有 $g(x) = -8$，故 $g(-100) = -8$。"
          },
          {
            q: "一次函數 $f(x) = 2x - 6$ 的圖形與兩坐標軸圍成的直角三角形面積是多少？",
            options: ["9", "18", "6", "12"],
            ans: 0,
            explain: "交點：令 $y=0 \\implies 2x=6 \\implies x=3$，交 $x$ 軸於 $(3, 0)$，底為 3；令 $x=0 \\implies y=-6$，交 $y$ 軸於 $(0, -6)$，高為 $|-6|=6$。面積 $= \\frac{1}{2} \\times 3 \\times 6 = 9$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知彈簧在彈性限度內掛重物，長度 $y$ 公分是掛重 $x$ 公克的一次回歸函數。掛 20 克時長 14 公分，掛 50 克時長 20 公分。若不掛任何物體（$x = 0$）時，彈簧原本長度是多少公分？",
        options: ["10 公分", "12 公分", "8 公分", "14 公分"],
        ans: 0,
        hint: "原長就是當 $x = 0$ 時的函數值（即常數項 $b$）。",
        explain: "設 $y = ax + b$。代入得 $20a + b = 14$ 與 $50a + b = 20$。兩式相減 $30a = 6 \\implies a = 0.2$。代入得 $b = 14 - 20(0.2) = 14 - 4 = 10$。故彈簧原本長度為 10 公分。"
      }
    ],

    angles: [
      { title: "電腦程式中的 Function 與數學函數", body: "寫程式時定義的 def calculate(x): return 2*x + 1，概念完全源自數學函數！只要輸入相同的參數 x，回傳的結果就必然確定唯一，沒有任何隨機副作用（純函數 Pure Function）。" },
      { title: "機器學習的最簡模型：線性迴歸", body: "現代人工智慧在預測房價、氣溫時，最基礎的演算法就是「單變量線性迴歸」$y = wx + b$。AI 訓練的目的，就是找到一條最佳的一段函數直線，讓所有歷史數據點到直線的誤差平方和最小！" }
    ],

    where: {
      past: "七年級二元一次方程式圖形直線。",
      current: "八年級升級至現代數學核心概念「函數」$y=f(x)$，強調對應關係與變動思維。",
      next: "九年級下學期將把一次函數升級為曲線拋物線——「二次函數」！"
    }
  });
})();
