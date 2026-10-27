/* 單元：1-1 連比 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "三個量串接成連比");
    s("rect", { x: 40, y: 40, width: 90, height: 50, rx: 6, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 85, 70, "x : y = 2 : 3", { size: 13, color: C.orange.s, bold: true });

    s("rect", { x: 230, y: 40, width: 90, height: 50, rx: 6, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 275, 70, "y : z = 3 : 5", { size: 13, color: C.blue.s, bold: true });

    s("rect", { x: 100, y: 120, width: 160, height: 50, rx: 8, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 180, 150, "x : y : z = 2 : 3 : 5", { size: 15, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "continued-ratio",
    en: "Continued Ratios",
    formula: "\\text{若 } x : y : z = a : b : c \\text{，可設 } x = ak,\\ y = bk,\\ z = ck \\quad (k \\ne 0)",

    hook: {
      html: "做美味蛋糕時，麵粉、砂糖、雞蛋的比例是 $4 : 2 : 3$。當關係中牽涉到三個或更多數量的相對倍數時，雙變數的比例式就不夠用了，我們需要把多個比透過共同的中介橋樑接合起來，寫成<b>連比 $x : y : z$</b>！",
      ask: "若 $x:y = 2:3$ 且 $y:z = 4:5$，中間的 $y$ 數字不同，該如何透過通分搭起橋樑？",
      visual: hookVisual
    },

    guess: {
      q: "若 $a : b = 2 : 3$ 且 $b : c = 4 : 5$，則連比 $a : b : c$ 為何？",
      options: [
        { t: "8 : 12 : 15", truth: true, explain: "找出中介項 $b$ 的公倍數：$\\text{lcm}(3, 4) = 12$。第一個比同乘 4 得 $8 : 12$；第二個比同乘 3 得 $12 : 15$。接合得 $a : b : c = 8 : 12 : 15$！" },
        { t: "2 : 3 : 5", common: true, explain: "直接把頭中尾拼在一起，忽視了兩式中 $b$ 的份額並不相同。" },
        { t: "6 : 12 : 20", explain: "比例倍數擴分錯誤。" },
        { t: "8 : 12 : 10", explain: "第二個比後項乘錯倍數。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整共同橋樑變數的數值，直觀理解三量連比擴分接軌過程。",
      frames: [
        { cap: "連比定義：三個或三個以上同類量之間的倍數關係，記作 $a : b : c$。連比不能化為單一的「連比值」，但有「兩兩比值相等」。", tex: "a : b : c" },
        { cap: "連比求法（找公倍數）：以共同項為基準，取兩式中共同項的最小公倍數進行擴分，再整合成連比。", tex: "x:y=a:b,\\ y:z=c:d \\implies \\text{找 }\\text{lcm}(b,c)" },
        { cap: "參數設法（王牌技巧）：若 $x : y : z = a : b : c$，必設 $x = ak, y = bk, z = ck$（$k \\ne 0$），代入多元代數式中瞬間降為單一參數！", tex: "x=ak,\\ y=bk,\\ z=ck\\ (k\\ne 0)" },
        { cap: "反比連比轉化：若 $2x = 3y = 4z$，同除以最小公倍數 12，得 $\\frac{x}{6} = \\frac{y}{4} = \\frac{z}{3} \\implies x:y:z = 6:4:3$！", tex: "ax=by=cz \\implies x:y:z = \\frac{1}{a}:\\frac{1}{b}:\\frac{1}{c}" }
      ],
      hint: "等積轉連比口訣：看到 $2x=3y=4z$，千萬不要直接寫 $2:3:4$！係數取倒數或同除公倍數！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "連比擴分接軌動態圖");
        var slScale = SK.slider({ label: "縮放倍數 k", min: 1, max: 4, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slScale.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var k = slScale.value;
          var a = 2 * k, b = 3 * k, c = 5 * k;
          svg.innerHTML = "";
          // 畫三條長條
          s("rect", { x: 60, y: 50, width: a * 15, height: 25, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
          SK.label(svg, 40, 65, "x", { size: 14, color: C.orange.s, bold: true });
          SK.label(svg, 70 + a * 15, 65, String(a), { size: 12, color: C.ink });

          s("rect", { x: 60, y: 95, width: b * 15, height: 25, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
          SK.label(svg, 40, 110, "y", { size: 14, color: C.blue.s, bold: true });
          SK.label(svg, 70 + b * 15, 110, String(b), { size: 12, color: C.ink });

          s("rect", { x: 60, y: 140, width: c * 15, height: 25, fill: C.green.f, stroke: C.green.s, "stroke-width": 1.5 }, svg);
          SK.label(svg, 40, 155, "z", { size: 14, color: C.green.s, bold: true });
          SK.label(svg, 70 + c * 15, 155, String(c), { size: 12, color: C.ink });

          read.innerHTML = SK.tex("x : y : z = 2 : 3 : 5 = " + a + " : " + b + " : " + c + "\\quad \\implies x = 2k, y = 3k, z = 5k\\ (k=" + k + ")", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "連比求值與參數法代數運算",
        code: "N-9-1",
        demo: {
          q: "已知 $2x = 3y = 4z$ 且 $x, y, z$ 均不為 0，若 $x + y + z = 130$，求 $x, y, z$ 各自的值。",
          steps: [
            "轉化連比：2, 3, 4 的最小公倍數為 12。各項同除以 12：$\\frac{2x}{12} = \\frac{3y}{12} = \\frac{4z}{12} \\implies \\frac{x}{6} = \\frac{y}{4} = \\frac{z}{3}$。",
            "得到連比：$x : y : z = 6 : 4 : 3$。",
            "設參數：設 $x = 6k, y = 4k, z = 3k$（$k \\ne 0$）。",
            "代入求解：$6k + 4k + 3k = 130 \\implies 13k = 130 \\implies k = 10$。",
            "得值：$x = 60, y = 40, z = 30$。"
          ]
        },
        tries: [
          {
            q: "若 $x : y : z = 3 : 4 : 5$，則 $\\frac{x + y + z}{2x - y + z}$ 的值是多少？",
            options: ["12/7", "2", "7/12", "1"],
            ans: 0,
            explain: "設 $x=3k, y=4k, z=5k$。分子 $3k+4k+5k = 12k$；分母 $2(3k)-4k+5k = 6k-4k+5k = 7k$。比值為 $\\frac{12k}{7k} = \\frac{12}{7}$。"
          },
          {
            q: "三角形的三個內角度數比為 $2 : 3 : 4$，則此三角形的最大內角是多少度？",
            options: ["80 度", "60 度", "40 度", "100 度"],
            ans: 0,
            explain: "內角和 180°。總份數 $2 + 3 + 4 = 9$ 份，每份 $180^\\circ \\div 9 = 20^\\circ$。最大角佔 4 份：$4 \\times 20^\\circ = 80^\\circ$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "甲、乙、丙三人共有 720 元。若甲給乙 20 元後，甲、乙、丙三人的錢數比變為 $3 : 4 : 5$，請問原本甲有多少元？",
        options: ["200 元", "180 元", "240 元", "220 元"],
        ans: 0,
        hint: "總錢數 720 元始終不變，先按比例算出變動後甲的錢數。",
        explain: "三人總金額恆為 720 元。總份數 $3 + 4 + 5 = 12$ 份，每份 $720 \\div 12 = 60$ 元。給錢後甲有 $3 \\times 60 = 180$ 元。因為甲給了乙 20 元才剩下 180 元，故原本甲有 $180 + 20 = 200$ 元。"
      }
    ],

    angles: [
      { title: "三原色光學調色盤", body: "電視與手機螢幕的色彩呈現，是將紅（R）、綠（G）、藍（B）三原色以不同比例混合。RGB 比例 $(255 : 200 : 0)$ 構成璀璨金黃色，這正是連比在光學科技中最繽紛的應用！" },
      { title: "化學反應計量比", body: "氫氣與氧氣燃燒生成水：$2H_2 + O_2 \\to 2H_2O$。反應物與生成物的分子數連比為 $2 : 1 : 2$，掌握連比是高中化學化學計量學的先修基本功。" }
    ],

    where: {
      past: "七年級雙變數比例式 $a:b=c:d$。",
      current: "九年級將比擴展為三個量的連比 $a:b:c$，掌握公倍數接橋與參數設法。",
      next: "下一節將把比例推廣至幾何圖形——「平行線截比例線段」！"
    }
  });
})();
