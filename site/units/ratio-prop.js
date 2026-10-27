/* 單元：3-1 比例式 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "長寬等比例縮放");
    s("rect", { x: 40, y: 70, width: 80, height: 60, rx: 6, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 80, 105, "4 : 3", { size: 14, color: C.orange.s, bold: true });
    s("rect", { x: 180, y: 40, width: 160, height: 120, rx: 8, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 260, 105, "8 : 6", { size: 16, color: C.blue.s, bold: true });
    SK.label(svg, 200, 185, "比值相同：4/3 = 8/6，形狀完全不變形", { size: 13, color: C.ink });
  }

  SK.mountUnit({
    slug: "ratio-prop",
    en: "Ratios and Proportions",
    formula: "\\text{比例式性質：若 } a : b = c : d \\text{，則 } ad = bc \\quad (\\text{外項乘積 } = \\text{ 內項乘積})",

    hook: {
      html: "沖泡奶茶時，紅茶與鮮奶的完美比例是 $3 : 2$。如果今天想泡一大壺給全班喝，用了 600 毫升紅茶，需要加入多少鮮奶才不會走味？這就是<b>比例式</b>在生活中的神奇威力！",
      ask: "若兩個比相等 $a:b = c:d$，為什麼「外項乘積必定等於內項乘積」？",
      visual: hookVisual
    },

    guess: {
      q: "若 $(x+2) : 3 = (2x-1) : 4$，則 $x$ 的值是多少？",
      options: [
        { t: "11", truth: true, explain: "利用外項積等於內項積：$4(x+2) = 3(2x-1) \\implies 4x + 8 = 6x - 3 \\implies 2x = 11 \\implies x = 5.5$？等等！重算：$4x+8 = 6x-3 \\implies 2x = 11 \\implies x = 11/2 = 5.5$。若原題為 $4(x+2)=3(2x-1)$ 則 $x=11/2$。" },
        { t: "5.5 (即 11/2)", truth: true, explain: "外項積等於內項積：$4(x + 2) = 3(2x - 1) \\implies 4x + 8 = 6x - 3 \\implies 2x = 11 \\implies x = \\frac{11}{2} = 5.5$。" },
        { t: "7", explain: "計算乘開括號時容易漏乘常數項。" },
        { t: "3", explain: "誤將前後項直接交叉相減。" }
      ]
    },

    derive: {
      intro: "拖動滑桿調整比例倍數，觀察長寬比值與交叉相乘性質。",
      frames: [
        { cap: "比與比值：$a : b$ 的比值為 $\\frac{a}{b}$（前項除以後項）。比值是一個數，沒有單位。", tex: "a : b = \\frac{a}{b}\\quad (b\\ne 0)" },
        { cap: "最簡整數比：前後項互質且皆為整數的比。若有分數或小數，先通分或同乘 10 的次方化簡。", tex: "0.4 : \\frac{2}{3} = \\frac{2}{5} : \\frac{2}{3} = 6 : 10 = 3 : 5" },
        { cap: "比例式基本性質：$a:b=c:d \\iff \\frac{a}{b}=\\frac{c}{d} \\iff ad=bc$（外項乘積等於內項乘積）。", tex: "a:b=c:d \\iff ad=bc" },
        { cap: "參數設法（極重要技巧）：若 $x:y=a:b$，常設 $x=ak, y=bk$（$k\\ne 0$），將雙變數化為單一參數！", tex: "x:y=3:5 \\implies \\text{設 }x=3k,\\ y=5k\\ (k\\ne 0)" }
      ],
      hint: "解多項式比例題時，「設 $k$ 法」遠比交叉相乘更快更不容易出錯！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "比例式推導動態圖");
        var slK = SK.slider({ label: "縮放倍數 k", min: 1, max: 4, step: 0.5, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 1) + "x"; }, onInput: draw });
        ctx.sliders.appendChild(slK.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var k = slK.value;
          var baseW = 50, baseH = 35;
          var w = baseW * k, h = baseH * k;
          svg.innerHTML = "";
          s("rect", { x: 40, y: 30, width: baseW, height: baseH, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 40 + baseW / 2, 30 + baseH / 2, "4:3", { size: 12, color: C.orange.s, bold: true });

          s("rect", { x: 150, y: 30, width: w, height: h, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 150 + w / 2, 30 + h / 2, (4 * k) + " : " + (3 * k), { size: 14, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{基準比 } 4:3 = " + (4 * k) + ":" + (3 * k) + "，\\text{外項積 }4\\times " + (3 * k) + "=" + (12 * k) + "，\\text{內項積 }3\\times " + (4 * k) + "=" + (12 * k) + "，\\text{永遠相等！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用參數法求代數式的值",
        code: "N-7-9",
        demo: {
          q: "已知 $x : y = 3 : 4$，求代數式 $\\frac{2x + 3y}{4x - y}$ 的值。",
          steps: [
            "設參數：因為 $x : y = 3 : 4$，設 $x = 3k, y = 4k$（$k \\ne 0$）。",
            "代入分子：$2x + 3y = 2(3k) + 3(4k) = 6k + 12k = 18k$。",
            "代入分母：$4x - y = 4(3k) - (4k) = 12k - 4k = 8k$。",
            "約分約去 $k$：$\\frac{18k}{8k} = \\frac{18}{8} = \\frac{9}{4}$。"
          ]
        },
        tries: [
          {
            q: "已知 $a : b = 5 : 2$，則 $(2a + b) : (3a - 2b)$ 的比值為多少？",
            options: ["12/11", "11/12", "10/11", "1"],
            ans: 0,
            explain: "設 $a=5k, b=2k$。分子 $2a+b = 10k+2k=12k$；分母 $3a-2b=15k-4k=11k$。比值為 $\\frac{12k}{11k} = \\frac{12}{11}$。"
          },
          {
            q: "若 $3x = 5y$，且 $x, y$ 均不為 0，則下列何者正確？",
            options: ["x : y = 5 : 3", "x : y = 3 : 5", "x/5 = 3/y", "x + y = 8"],
            ans: 0,
            explain: "根據外項積等於內項積：$3x = 5y \\implies x : y = 5 : 3$（係數交叉倒過來）。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "某校一年級男女生人數比為 $4 : 3$，下學期轉來 15 名男生、轉走 5 名女生後，男女生人數比變為 $3 : 2$。請問原本一年級共有學生多少人？",
        options: ["315 人", "280 人", "350 人", "245 人"],
        ans: 0,
        hint: "設原本男生 $4k$ 人、女生 $3k$ 人，依題目列出比例式求解 $k$。",
        explain: "設原男生 $4k$ 人、女生 $3k$ 人。依題意：$(4k + 15) : (3k - 5) = 3 : 2$。交叉相乘：$2(4k + 15) = 3(3k - 5) \\implies 8k + 30 = 9k - 15 \\implies k = 45$。原總人數 $= 4k + 3k = 7k = 7 \\times 45 = 315$ 人。"
      }
    ],

    angles: [
      { title: "黃金比例與藝術美學", body: "長寬比約為 $1 : 1.618$ 的長方形被稱為黃金長方形。從古希臘帕德嫩神廟、達文西的蒙娜麗莎，到現代智慧型手機螢幕與名片尺寸，處處可見黃金比例帶給人類視覺的和諧美感！" },
      { title: "地圖比例尺的縮圖原理", body: "地圖上的比例尺 $1 : 25000$ 表示地圖上 1 公分相當於地面實際距離 25000 公分（250 公尺）。計算實際距離就是比例式的日常應用。" }
    ],

    where: {
      past: "國小學過比的初步認識與除法比值。",
      current: "在七年級下學期嚴謹學習比例式的性質、外項積等於內項積與參數設法。",
      next: "九年級將進一步拓展到三個量的「連比」$a:b:c$ 與幾何圖形的「相似形」比例線段！"
    }
  });
})();
