/* 單元：1-1 等差數列 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "等差數列的固定階梯步長");
    var a1 = 2, d = 3;
    for (var i = 0; i < 5; i++) {
      var val = a1 + i * d;
      var h = val * 10;
      s("rect", { x: 50 + i * 65, y: 170 - h, width: 45, height: h, rx: 4, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
      SK.label(svg, 72 + i * 65, 170 - h - 10, String(val), { size: 14, color: C.orange.s, bold: true });
      SK.label(svg, 72 + i * 65, 190, "a_" + (i + 1), { size: 12, color: C.soft });
      if (i > 0) {
        SK.label(svg, 47 + i * 65, 150, "+3", { size: 11, color: C.blue.s, bold: true });
      }
    }
  }

  SK.mountUnit({
    slug: "arith-seq",
    en: "Arithmetic Sequences",
    formula: "a_n = a_1 + (n - 1)d",

    hook: {
      html: "從電影院排數、行事曆日期，到高鐵每節車廂編號，生活處處充滿固定步長增加的數字規律。若第一項是 $a_1$，每走一步就加上同一個公差 $d$，那麼要走到第 $n$ 項，究竟需要<b>跨出幾步公差</b>？",
      ask: "為什麼第 $n$ 項公式中乘上的公差數是 $(n - 1)$ 步，而不是 $n$ 步？",
      visual: hookVisual
    },

    guess: {
      q: "一個等差數列首項 $a_1 = 5$，公差 $d = -3$，則此數列的第 10 項 $a_{10}$ 是多少？",
      options: [
        { t: "-22", truth: true, explain: "代入第 $n$ 項公式：$a_{10} = a_1 + (10 - 1)d = 5 + 9(-3) = 5 - 27 = -22$！" },
        { t: "-25", common: true, explain: "誤用乘 10 步：$5 + 10(-3) = -25$，從第 1 項走到第 10 項只需要跨 9 步！" },
        { t: "32", explain: "公差是負數，數字會越來越小，不是越來越大。" },
        { t: "-19", explain: "計算錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整首項 $a_1$ 與公差 $d$，觀察各項數值階梯的線性爬升或遞減變化。",
      frames: [
        { cap: "數列與項：將一串數字按特定順序排列稱為數列。記作 $a_1, a_2, \\dots, a_n$，其中 $a_1$ 為<b>首項</b>、$a_n$ 為<b>第 $n$ 項（一般項）</b>。", tex: "a_1,\\ a_2,\\ a_3,\\ \\dots,\\ a_n" },
        { cap: "公差 $d$ 的定義：後項減前項恆等於固定常數 $d$。$d > 0$ 數列遞增，$d < 0$ 數列遞減，$d = 0$ 為常數數列。", tex: "d = a_n - a_{n-1} = a_2 - a_1" },
        { cap: "第 $n$ 項公式：從 $a_1$ 出發要走 $(n - 1)$ 個間隔步幅，因此 $a_n = a_1 + (n - 1)d$。", tex: "a_n = a_1 + (n - 1)d" },
        { cap: "等差中項：若 $a, b, c$ 成等差數列，則中間項 $b$ 恰為前後兩項的平均數：$b = \\frac{a + c}{2}$！", tex: "b = \\frac{a + c}{2} \\iff 2b = a + c" }
      ],
      hint: "記憶公式哲學：植樹問題中 $n$ 棵樹只有 $(n - 1)$ 個間距，所以只需加 $(n - 1)$ 個公差！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "等差數列動態階梯圖");
        var slA1 = SK.slider({ label: "首項 a1", min: 1, max: 6, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slD = SK.slider({ label: "公差 d", min: 1, max: 4, step: 1, value: 3, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA1.el);
        ctx.sliders.appendChild(slD.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a1 = slA1.value, d = slD.value;
          svg.innerHTML = "";
          for (var i = 0; i < 6; i++) {
            var val = a1 + i * d;
            var h = Math.min(val * 8, 160);
            s("rect", { x: 40 + i * 60, y: 190 - h, width: 40, height: h, rx: 4, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
            SK.label(svg, 60 + i * 60, 190 - h - 10, String(val), { size: 12, color: C.orange.s, bold: true });
            SK.label(svg, 60 + i * 60, 210, "a" + (i + 1), { size: 12, color: C.soft });
          }
          var a6 = a1 + 5 * d;
          read.innerHTML = SK.tex("a_n = " + a1 + " + (n - 1)(" + d + ") \\implies a_6 = " + a1 + " + 5(" + d + ") = " + a6, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求等差數列的公差、一般項與項數",
        code: "N-8-3",
        demo: {
          q: "已知等差數列第 3 項 $a_3 = 11$，第 7 項 $a_7 = 27$。求此數列的首項 $a_1$ 與公差 $d$。",
          steps: [
            "看項數間隔：從第 3 項到第 7 項相差 $7 - 3 = 4$ 步公差。",
            "求公差：$4d = a_7 - a_3 = 27 - 11 = 16 \\implies d = 4$。",
            "回推首項：$a_3 = a_1 + 2d \\implies 11 = a_1 + 2(4) \\implies a_1 = 11 - 8 = 3$。"
          ]
        },
        tries: [
          {
            q: "等差數列 $4, 9, 14, 19, \\dots$ 中，第幾項開始會大於 100？",
            options: ["第 21 項", "第 20 項", "第 22 項", "第 19 項"],
            ans: 0,
            explain: "$a_1 = 4, d = 5$。令 $a_n = 4 + (n - 1)5 > 100 \\implies 5(n - 1) > 96 \\implies n - 1 > 19.2 \\implies n > 20.2$。因為 $n$ 為正整數，最小項數為第 21 項。"
          },
          {
            q: "若兩數 $x$ 與 $y$ 的等差中項為 12，且 $x - y = 6$，則較大數 $x$ 的值是多少？",
            options: ["15", "9", "18", "12"],
            ans: 0,
            explain: "等差中項公式：$\\frac{x + y}{2} = 12 \\implies x + y = 24$。聯立 $x - y = 6$，兩式相加得 $2x = 30 \\implies x = 15$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知一個直角三角形的三邊長成等差數列，且周長為 36 公分，則此直角三角形的面積是多少平方公分？",
        options: ["54 平方公分", "72 平方公分", "48 平方公分", "108 平方公分"],
        ans: 0,
        hint: "設三邊長為 $(a - d), a, (a + d)$，周長和可直接解出中間項 $a$！",
        explain: "設三邊為 $(a - d), a, (a + d)$。周長 $(a - d) + a + (a + d) = 3a = 36 \\implies a = 12$。由畢氏定理：$(12 - d)^2 + 12^2 = (12 + d)^2 \\implies 144 = 48d \\implies d = 3$。三邊長為 $9, 12, 15$。面積 $= \\frac{1}{2} \\times 9 \\times 12 = 54$ 平方公分。"
      }
    ],

    angles: [
      { title: "時鐘報時與高斯神童故事的前奏", body: "老式鐘樓整點敲鐘，從 1 點敲 1 下到 12 點敲 12 下，這串鐘聲次數就是標準的等差數列。當我們要統計一天總共敲了幾下鐘時，就引發了下一節的「等差級數」！" },
      { title: "電腦演算法中的等步長尋址", body: "在 C 語言或記憶體硬體中，一維陣列 arr[i] 尋址公式 Address = Base + i * Size，正是以等差數列的數學原理在記憶體中進行常數時間 O(1) 的秒速跳轉！" }
    ],

    where: {
      past: "七年級以符號代數列式與生活數規律尋找。",
      current: "八年級下學期嚴格形式化等差數列：首項、公差、一般項與等差中項。",
      next: "下一節將把數列所有項相加，推導名垂青史的高斯梯形公式——「等差級數」！"
    }
  });
})();
