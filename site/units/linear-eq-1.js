/* 單元：3-2 一元一次方程式求解 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "等量公理天平模型");
    s("polygon", { points: "200,160 180,185 220,185", fill: C.cocoa }, svg);
    s("line", { x1: 60, y1: 120, x2: 340, y2: 120, stroke: C.cocoa, "stroke-width": 4 }, svg);
    s("circle", { cx: 200, cy: 120, r: 6, fill: C.orange.s }, svg);
    s("rect", { x: 70, y: 70, width: 50, height: 50, rx: 6, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 95, 95, "2x", { size: 16, color: C.orange.s, bold: true });
    s("circle", { cx: 140, cy: 95, r: 14, fill: C.mint.f, stroke: C.mint.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 140, 95, "3", { size: 12, color: C.mint.s, bold: true });
    s("circle", { cx: 300, cy: 95, r: 20, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 300, 95, "11", { size: 16, color: C.blue.s, bold: true });
    SK.label(svg, 200, 50, "天平平衡: 2x + 3 = 11", { size: 15, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "linear-eq-1",
    en: "Solving Linear Equations in One Variable",
    formula: "ax + b = c \\xrightarrow{\\text{移項整理}} ax = c - b \\xrightarrow{\\text{同除以 } a} x = \\frac{c-b}{a} \\quad (a \\ne 0)",

    hook: {
      html: "方程式就像一座平衡的<b>天平</b>。天平兩端同時拿走相同重量、或同時放大相同倍數，天平依然保持完美平衡！利用這個特性，我們就能像剝洋蔥一樣，一步步將未知數 $x$ 身邊的數字剝離，找出它的真面目。",
      ask: "移項法則中「加變減、乘變除」，背後真正的原理是什麼？",
      visual: hookVisual
    },

    guess: {
      q: "解一元一次方程式 $5x - 7 = 2x + 8$，求 $x$ 的值為何？",
      options: [
        { t: "$x = 5$", truth: true, explain: "移項：$5x - 2x = 8 + 7 \\implies 3x = 15 \\implies x = 5$。代回檢驗：$5(5)-7=18$，$2(5)+8=18$，完全吻合！" },
        { t: "$x = 1$", common: true, explain: "移項變號出錯：算成 $5x - 2x = 8 - 7 \\implies 3x = 1$，移項時 $-7$ 移到等號右邊應該要變成 $+7$。" },
        { t: "$x = \\frac{1}{3}$", explain: "兩邊常數項符號處理顛倒。" },
        { t: "$x = -5$", explain: "符號算反，係數化為 1 時正負出錯。" }
      ]
    },

    derive: {
      intro: "透過天平逐步消去常數項與係數，親眼見證移項法則的推導過程。",
      frames: [
        { cap: "等量公理：等號兩邊同加、同減、同乘、同除以同一個非零數，等式依然成立。", tex: "A = B \\iff A \\pm c = B \\pm c,\\quad A\\times c = B\\times c" },
        { cap: "移項法則：把一項從等號一邊移到另一邊時，<b>運算符號必須改變</b>（加變減、減變加、乘變除）。", tex: "ax + b = c \\implies ax = c - b" },
        { cap: "去括號與化簡：利用分配律展開括號，並將含未知數的項移到左邊、常數項移到右邊整理成 $ax = b$。", tex: "ax = b \\implies x = \\frac{b}{a}\\quad (a\\ne 0)" },
        { cap: "去分母技巧：方程式兩邊同乘所有分母的<b>最小公倍數</b>，將分數方程式化為整數方程式求解。", tex: "\\frac{x}{2} + \\frac{x}{3} = 5 \\xrightarrow{\\times 6} 3x + 2x = 30" }
      ],
      hint: "解完方程式後，一定要將解代回原式做「驗算」，看看左式是否等於右式。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "方程式求解動畫");
        var slA = SK.slider({ label: "未知數解 x", min: -3, max: 7, step: 1, value: 4, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slA.value, lhs = 2 * x + 3;
          svg.innerHTML = "";
          s("polygon", { points: "220,180 200,205 240,205", fill: C.cocoa }, svg);
          s("line", { x1: 60, y1: 140, x2: 380, y2: 140, stroke: C.cocoa, "stroke-width": 4 }, svg);
          s("circle", { cx: 220, cy: 140, r: 6, fill: C.orange.s }, svg);
          s("rect", { x: 100, y: 90, width: 70, height: 50, rx: 6, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 135, 115, "2x + 3", { size: 16, color: C.orange.s, bold: true });
          s("rect", { x: 270, y: 90, width: 70, height: 50, rx: 6, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 305, 115, String(lhs), { size: 18, color: C.blue.s, bold: true });
          SK.label(svg, 220, 50, "方程式: 2x + 3 = " + lhs, { size: 16, color: C.ink, bold: true });
          read.innerHTML = SK.tex("2x + 3 = " + lhs + " \\iff 2x = " + (lhs - 3) + " \\iff x = " + x, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "解含分母與括號的一元一次方程式",
        code: "A-7-3",
        demo: {
          q: "解方程式 $\\frac{x - 1}{2} - \\frac{2x + 3}{5} = 1$。",
          steps: [
            "找分母 2 和 5 的最小公倍數 10，方程式兩邊同乘 10（注意右邊的 1 也要乘 10！）。",
            "去分母展開：$5(x - 1) - 2(2x + 3) = 10$。",
            "分配律去括號：$5x - 5 - 4x - 6 = 10$。",
            "同類項合併：$x - 11 = 10 \\implies x = 21$。"
          ]
        },
        tries: [
          {
            q: "解方程式 $3(2x - 1) = 4x + 7$。",
            hint: "先展開左邊括號：$6x - 3 = 4x + 7$。",
            ans: "$6x - 4x = 7 + 3 \\implies 2x = 10 \\implies x = 5$。"
          },
          {
            q: "解方程式 $\\frac{x + 2}{3} = \\frac{2x - 1}{4}$。",
            hint: "交叉相乘或兩邊同乘 12。",
            ans: "$4(x + 2) = 3(2x - 1) \\implies 4x + 8 = 6x - 3 \\implies 2x = 11 \\implies x = \\frac{11}{2}$。"
          }
        ],
        edge: "兩邊同乘公分母時，沒帶分母的整數項（如等號右邊的 1）極常漏乘！必須每一項都乘上 10。"
      }
    ],

    angles: [
      {
        title: "回推思考（逆運算）",
        icon: "sparkle",
        html: "把方程式當成猜心魔術：心中的數 $x$，先乘以 2 再加上 3 得到 11。要找回原來的數，只要反向操作：先減去 3 得到 8，再除以 2 得到 4！解方程式就是一套倒序還原的邏輯。"
      },
      {
        title: "特殊解的情況：無解與無限多解",
        icon: "leaf",
        html: "整理到最後化成 $ax = b$ 時：<br>‧ 若 $a\\ne 0$，有唯一解 $x = \\frac{b}{a}$。<br>‧ 若 $a = 0$ 且 $b \\ne 0$（如 $0x = 5$），則<b>無解</b>。<br>‧ 若 $a = 0$ 且 $b = 0$（如 $0x = 0$），代入任何數都成立，有<b>無限多解</b>。"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "若 $x = 3$ 是方程式 $2x - a = 5$ 的解，求 $a$ 的值。",
        hint: "將 $x=3$ 直接代入方程式中。",
        idea: "$2(3) - a = 5 \\implies 6 - a = 5 \\implies a = 1$。"
      },
      {
        lv: "Explore",
        q: "已知方程式 $2(x - 3) = ax + b$ 有無限多組解，求數對 $(a, b)$ 之值。",
        hint: "展開左邊為 $2x - 6$，有無限多組解代表兩邊式子完全恆等。",
        idea: "兩邊對應係數相同：$x$ 的係數 $a = 2$，常數項 $b = -6$。故 $(a, b) = (2, -6)$。"
      },
      {
        lv: "Wonder",
        q: "解方程式 $|2x - 1| = 7$。",
        hint: "絕對值等於 7 代表內部式子可能等於 $+7$ 或 $-7$。",
        idea: "$2x - 1 = 7 \\implies 2x = 8 \\implies x = 4$；或者 $2x - 1 = -7 \\implies 2x = -6 \\implies x = -3$。故解為 $x = 4$ 或 $x = -3$。"
      }
    ],

    where: {
      codes: [["A-7-2", "一元一次方程式的意義與解"], ["A-7-3", "等量公理、移項法則與求解"]],
      exam: "會考計算題與選填題必備核心工具，整張考卷有三分之一以上的題目最終需化為方程式求解。",
      stop: "七年級以一元一次方程式為限，不涉及二次方程式或雙絕對值不等式。"
    }
  });
})();
