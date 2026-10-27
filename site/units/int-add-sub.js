/* 單元：1-2 整數的加減 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "整數加減向量圖解");
    s("line", { x1: 20, y1: 120, x2: 380, y2: 120, class: "m-axis", "stroke-width": 2 }, svg);
    s("polygon", { points: "385,120 375,115 375,125", fill: C.cocoa }, svg);
    for (var x = -5; x <= 5; x++) {
      var px = 200 + x * 32;
      s("line", { x1: px, y1: 115, x2: px, y2: 125, stroke: C.cocoa, "stroke-width": 1.2 }, svg);
      SK.label(svg, px, 142, String(x), { size: 12, color: x === 0 ? C.orange.s : C.soft });
    }
    SK.arrow(svg, 200, 95, 296, 95, C.blue.s, 3);
    SK.label(svg, 248, 80, "+3", { size: 14, color: C.blue.s, bold: true });
    SK.arrow(svg, 296, 60, 136, 60, C.pink.s, 3);
    SK.label(svg, 216, 45, "-5", { size: 14, color: C.pink.s, bold: true });
    s("circle", { cx: 136, cy: 120, r: 6, fill: C.green.s }, svg);
    SK.label(svg, 136, 170, "結果: -2", { size: 14, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "int-add-sub",
    en: "Addition and Subtraction of Integers",
    formula: "a - b = a + (\\co{-b}),\\quad -(\\co{a}-\\cb{b}) = -\\co{a} + \\cb{b}",

    hook: {
      html: "想像你在數線上走路：<b>加正數</b>向右走，<b>加負數</b>向左走；而<b>減法就是加上相反數</b>。如果賺了 3 元又賠了 5 元，總結算會是在哪裡？",
      ask: "減去一個負數（如 $3 - (-5)$），為什麼結果反而變大了？",
      visual: hookVisual
    },

    guess: {
      q: "計算算式 $(-8) - (-12)$ 的結果是多少？",
      options: [
        { t: "$4$", truth: true, explain: "減去負數等於加上正數：$(-8) - (-12) = (-8) + 12 = 12 - 8 = 4$。" },
        { t: "$-20$", common: true, explain: "看到兩個負號就全部加在一起算出 $-20$，這是把減負數誤當成連續扣除！" },
        { t: "$-4$", explain: "符號算反了，$12$ 的絕對值大於 $8$，異號相加後符號由較大的 $12$ 決定，應該是正數。" },
        { t: "$20$", explain: "把前方的負號漏掉了，原式第一項是 $-8$ 而不是 $+8$。" }
      ]
    },

    derive: {
      intro: "操作滑桿調整被加數與加數，觀察數線上箭頭的行進方向與正負抵消機制。",
      frames: [
        { cap: "同號數相加：符號相同時，將絕對值相加，並保留原符號。例如 $(-3)+(-5)=-(3+5)=-8$。", tex: "(-a) + (-b) = -(a+b)" },
        { cap: "異號數相加：符號相反時，用大絕對值減小絕對值，結果符號取絕對值較大者。", tex: "a + (-b) = a - b\\quad (a > b)" },
        { cap: "減法轉加法：<b>減去一個數，等於加上該數的相反數</b>。減負等於加正！", tex: "a - b = a + (-b),\\quad a - (-b) = a + b" },
        { cap: "去括號法則：括號前面是負號時，去掉括號裡面每一項都要變號。", tex: "-(a + b) = -a - b,\\quad -(a - b) = -a + b" }
      ],
      hint: "拖動滑桿，觀察箭頭向右為加正、向左為加負的連續運動。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "加減運算數線");
        var slA = SK.slider({ label: "第一數 $\\co{a}$", min: -6, max: 6, step: 1, value: 3, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "第二數 $\\cb{b}$", min: -6, max: 6, step: 1, value: -5, color: "blue", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value, sum = a + b;
          var X = function (val) { return 220 + val * 24; };
          svg.innerHTML = "";
          s("line", { x1: 20, y1: 150, x2: 420, y2: 150, class: "m-axis", "stroke-width": 2 }, svg);
          for (var t = -8; t <= 8; t += 2) {
            var px = X(t);
            s("line", { x1: px, y1: 145, x2: px, y2: 155, stroke: C.cocoa }, svg);
            SK.label(svg, px, 172, String(t), { size: 11, color: t === 0 ? C.orange.s : C.soft });
          }
          if (a !== 0) {
            SK.arrow(svg, X(0), 110, X(a), 110, a > 0 ? C.blue.s : C.pink.s, 2.5);
            SK.label(svg, (X(0) + X(a)) / 2, 92, String(a), { size: 13, color: a > 0 ? C.blue.s : C.pink.s, bold: true });
          }
          if (b !== 0) {
            SK.arrow(svg, X(a), 70, X(sum), 70, b > 0 ? C.blue.s : C.pink.s, 2.5);
            SK.label(svg, (X(a) + X(sum)) / 2, 52, String(b), { size: 13, color: b > 0 ? C.blue.s : C.pink.s, bold: true });
          }
          s("circle", { cx: X(sum), cy: 150, r: 6.5, fill: C.green.s }, svg);
          SK.label(svg, X(sum), 195, "和 = " + sum, { size: 14, color: C.green.s, bold: true });
          read.innerHTML = SK.tex("(" + a + ") + (" + b + ") = " + sum, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "整數去括號與加減綜合運算",
        code: "N-7-4",
        demo: {
          q: "計算算式 $15 - (-8) + (-20) - 7$ 的值。",
          steps: [
            "把減法全部轉為加上相反數：$15 + 8 + (-20) + (-7)$。",
            "正數與負數分別合併：$(15 + 8) + [(-20) + (-7)] = 23 + (-27)$。",
            "異號相加：$23 - 27 = -4$。"
          ]
        },
        tries: [
          {
            q: "計算算式 $(-18) - (-25) + (-12)$ 的值。",
            hint: "先處理減負數：$-(-25) = +25$。",
            ans: "$(-18) + 25 + (-12) = 7 + (-12) = -5$。"
          },
          {
            q: "計算算式 $42 - [(-13) - (8 - 15)]$ 的值。",
            hint: "由最內層小括號先算：$8 - 15 = -7$。",
            ans: "$8-15=-7$，中括號內為 $(-13)-(-7) = -13+7 = -6$；最後 $42 - (-6) = 42 + 6 = 48$。"
          }
        ],
        edge: "去括號時若括號前為負號，括號內的「每一項」都要變號，例如 $-(5-8)=-5+8$；只變第一項是極易犯的錯誤。"
      }
    ],

    angles: [
      {
        title: "溫度計模型",
        icon: "sparkle",
        html: "想像氣溫：原本是 $-3^\\circ\\text{C}$，若氣溫上升 $8^\\circ\\text{C}$，表示向高溫走，變成 $(-3)+8 = 5^\\circ\\text{C}$；若氣溫再下降 $10^\\circ\\text{C}$，表示往低溫走，變成 $5-10 = -5^\\circ\\text{C}$。生活中的冷熱變化就是整數加減的最佳寫照。"
      },
      {
        title: "加法交換律與結合律",
        icon: "leaf",
        html: "整數加法滿足交換律 $a+b=b+a$ 與結合律 $(a+b)+c=a+(b+c)$。連加時，先將所有「同號正數」加在一起，再將所有「同號負數」加在一起，最後做一次異號相加，既快速又不會出錯。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "計算 $(-1)+2+(-3)+4+(-5)+\\cdots+(-19)+20$ 的總和。",
        hint: "兩兩一組觀察：$(-1)+2=1$，$(-3)+4=1$……一共有幾組？",
        idea: "每兩項結合成一組：$[(-1)+2] + [(-3)+4] + \\cdots + [(-19)+20]$，每組和皆為 1。共有 10 組，總和為 $10\\times 1 = 10$。"
      },
      {
        lv: "Explore",
        q: "若 $|a|=5$，$|b|=3$，且 $a<b$，求 $a-b$ 的可能值。",
        hint: "先求出 $a$ 與 $b$ 的所有可能值，篩選出符合 $a<b$ 的組合。",
        idea: "$a$ 可為 $5$ 或 $-5$；$b$ 可為 $3$ 或 $-3$。因為 $a<b$，只有 $a=-5$ 滿足條件。當 $a=-5, b=3$ 時，$a-b=-5-3=-8$；當 $a=-5, b=-3$ 時，$a-b=-5-(-3)=-2$。故可能值為 $-8$ 或 $-2$。"
      },
      {
        lv: "Wonder",
        q: "數線上四個點從左到右依序為 $A, B, C, D$，且相鄰兩點間的距離都相等。若點 $A$ 坐標為 $-14$，點 $D$ 坐標為 $10$，求點 $B$ 與點 $C$ 的坐標。",
        hint: "從點 $A$ 到點 $D$ 一共包含了幾個等長的間隔？全長是多少？",
        idea: "全長 $\\overline{AD} = 10 - (-14) = 24$。中間有 3 個等長間隔，每段間隔長度為 $24\\div 3 = 8$。因此點 $B = (-14)+8 = -6$；點 $C = (-6)+8 = 2$。"
      }
    ],

    where: {
      codes: [["N-7-3", "負數的四則運算：加減法符號規則"], ["N-7-4", "數的運算規律：交換律、結合律、去括號規則"]],
      exam: "整數四則混合運算幾乎是每份會考數學科第 1 或第 2 題的送分指標題，務求完全正確。",
      stop: "七上整數加減重點在概念扎根與符號熟悉，不宜設計包含六七層括號的繁瑣技巧題。"
    }
  });
})();
