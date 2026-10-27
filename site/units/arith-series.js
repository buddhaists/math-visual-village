/* 單元：1-2 等差級數 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "階梯倒轉倒拼成長方形");
    // 左邊階梯 (1+2+3+4)
    s("polygon", { points: "50,150 150,150 150,50 125,50 125,75 100,75 100,100 75,100 75,125 50,125", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
    // 右邊倒轉拼上的藍色階梯
    s("polygon", { points: "50,125 50,50 150,50 150,75 125,75 125,100 100,100 100,125", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);

    SK.label(svg, 270, 75, "高斯倒拼長方形", { size: 15, color: C.ink, bold: true });
    SK.label(svg, 270, 105, "底 = (首項 + 末項)", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 270, 130, "高 = 項數 n", { size: 13, color: C.blue.s, bold: true });
    SK.label(svg, 270, 160, "S_n = n(a_1 + a_n) / 2", { size: 14, color: C.green.s, bold: true });
  }

  SK.mountUnit({
    slug: "arith-series",
    en: "Arithmetic Series",
    formula: "S_n = \\frac{n(a_1 + a_n)}{2} = \\frac{n[2a_1 + (n - 1)d]}{2}",

    hook: {
      html: "相傳德國數學王子高斯在小學十歲時，老師出了一道題目要大家算 $1 + 2 + 3 + \\dots + 100$。全班都在埋頭苦算時，高斯幾秒鐘就寫下 5050！他的天才秘訣就是：<b>頭尾配對成 101，把階梯倒過來拼成長方形</b>！",
      ask: "等差級數求和公式中，為什麼可以看成「平均數 $\\times$ 項數」？",
      visual: hookVisual
    },

    guess: {
      q: "計算等差級數 $2 + 5 + 8 + \\dots + 29$（共 10 項）的總和是多少？",
      options: [
        { t: "155", truth: true, explain: "代入梯形公式：$S_{10} = \\frac{10(2 + 29)}{2} = 5 \\times 31 = 155$！" },
        { t: "310", common: true, explain: "忘記除以 2！長方形是由「兩個」完全相同的階梯拼成的，算完面積必須除以 2。" },
        { t: "145", explain: "末項或項數代錯。" },
        { t: "165", explain: "計算錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變項數 $n$，動態看見等差階梯倒拼成長方形雙倍面積的求和推導。",
      frames: [
        { cap: "級數定義：將數列的各項以加號相連稱為級數，前 $n$ 項總和記作 $S_n = a_1 + a_2 + \\dots + a_n$。", tex: "S_n = \\sum_{i=1}^n a_i" },
        { cap: "倒寫相加法：正寫一遍、倒寫一遍相加，每一對的「頭尾和」恆等於 $(a_1 + a_n)$，共有 $n$ 對！", tex: "2S_n = n(a_1 + a_n)" },
        { cap: "第一公式（知首末項）：像梯形面積一樣好記——（上底加下底）乘高除以 2。", tex: "S_n = \\frac{n(a_1 + a_n)}{2}" },
        { cap: "第二公式（知公差）：將 $a_n = a_1 + (n-1)d$ 代入，得 $S_n = \\frac{n[2a_1 + (n-1)d]}{2}$。", tex: "S_n = \\frac{n[2a_1 + (n-1)d]}{2}" },
        { cap: "重要關聯：第 $n$ 項等於前 $n$ 項和減前 $(n-1)$ 項和：$a_n = S_n - S_{n-1}$（$n\\ge 2$）。", tex: "a_n = S_n - S_{n-1}\\ (n\\ge 2),\\quad a_1 = S_1" }
      ],
      hint: "解題策略：有首末項用第一公式，有公差用第二公式；算完別忘除以 2！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "等差級數倒拼長方形");
        var slN = SK.slider({ label: "項數 n", min: 4, max: 10, step: 1, value: 6, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slN.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var n = slN.value;
          var a1 = 1, d = 2;
          var an = a1 + (n - 1) * d;
          var sum = (n * (a1 + an)) / 2;
          svg.innerHTML = "";
          // 畫長方形
          s("rect", { x: 50, y: 50, width: (a1 + an) * 12, height: n * 18, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // 對角虛線
          s("line", { x1: 50, y1: 50 + n * 18, x2: 50 + (a1 + an) * 12, y2: 50, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4,4" }, svg);

          SK.label(svg, 50 + ((a1 + an) * 12) / 2, 40, "底 = a1 + an = " + a1 + " + " + an + " = " + (a1 + an), { size: 12, color: C.orange.s, bold: true });
          SK.label(svg, 25, 50 + (n * 18) / 2, "高 n=" + n, { size: 12, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("S_{" + n + "} = \\frac{" + n + "(" + a1 + " + " + an + ")}{2} = \\frac{" + n + " \\times " + (a1 + an) + "}{2} = " + sum, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求等差級數和與生活應用",
        code: "N-8-5",
        demo: {
          q: "某展覽場共有 15 排座位，第一排有 20 個座位，往後每一排比前一排多 2 個座位。求該展場總共有多少個座位？",
          steps: [
            "辨認條件：首項 $a_1 = 20$，公差 $d = 2$，項數 $n = 15$。",
            "代入第二公式：$S_{15} = \\frac{15[2(20) + (15 - 1) \\times 2]}{2}$。",
            "計算括號內：$40 + 14 \\times 2 = 40 + 28 = 68$。",
            "求和：$S_{15} = \\frac{15 \\times 68}{2} = 15 \\times 34 = 510$ 個座位。"
          ]
        },
        tries: [
          {
            q: "求等差級數 $7 + 10 + 13 + \\dots + 40$ 的總和是多少？",
            options: ["282", "564", "270", "294"],
            ans: 0,
            explain: "先求項數：$40 = 7 + (n - 1)3 \\implies 3(n - 1) = 33 \\implies n = 12$。代入求和公式：$S_{12} = \\frac{12(7 + 40)}{2} = 6 \\times 47 = 282$。"
          },
          {
            q: "已知某等差級數前 $n$ 項和公式為 $S_n = 2n^2 + 3n$，求此數列的第 5 項 $a_5$ 為多少？",
            options: ["21", "65", "44", "19"],
            ans: 0,
            explain: "利用 $a_5 = S_5 - S_4$。$S_5 = 2(25) + 3(5) = 50 + 15 = 65$；$S_4 = 2(16) + 3(4) = 32 + 12 = 44$。因此 $a_5 = 65 - 44 = 21$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "某等差級數首項為 25，公差為 $-2$，請問當 $n$ 等於多少時，前 $n$ 項的和 $S_n$ 會有最大值？",
        options: ["13", "12", "14", "25"],
        ans: 0,
        hint: "數列遞減，只要加到「最後一個正數項」，總和就會達到最大值！",
        explain: "求最後一個非負項：$a_n = 25 + (n - 1)(-2) \\ge 0 \\implies 25 - 2n + 2 \\ge 0 \\implies 2n \\le 27 \\implies n \\le 13.5$。當 $n = 13$ 時 $a_{13} = 25 - 24 = 1 > 0$，加完第 13 項達到巔峰；第 14 項 $a_{14} = -1 < 0$ 會使總和開始減少。故加到第 13 項和最大。"
      }
    ],

    angles: [
      { title: "高斯十歲的天才直覺", body: "1787 年在布藍茲維的小學課堂上，小高斯敏銳地看出 $1+100=101$、$2+99=101$、$3+98=101$...總共有 50 對 101，因而得出 $50 \\times 101 = 5050$。這項思維奠定了他日後成為數學王子的非凡洞察力！" },
      { title: "幾何多邊形內角和的背後支持", body: "從三角形內角和 180°、四邊形 360°、五邊形 540°，這些角度值本身構成了一個首項 180、公差 180 的等差數列，等差級數的思維貫穿了整個幾何世界。" }
    ],

    where: {
      past: "上一節學會等差數列的各項計算與公差。",
      current: "八年級掌握高斯梯形公式與倒寫相加法，秒算等差級數總和。",
      next: "下一節將探討乘法倍增的全新力量——「等比數列」！"
    }
  });
})();
