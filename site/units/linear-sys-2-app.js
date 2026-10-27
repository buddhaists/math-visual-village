/* 單元：1-3 聯立方程式的應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "雞兔同籠經典模型");
    s("rect", { x: 70, y: 50, width: 260, height: 110, rx: 12, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 200, 80, "雞 x 隻 (2腳) + 兔 y 隻 (4腳)", { size: 15, color: C.ink, bold: true });
    SK.label(svg, 200, 110, "頭數: x + y = 35", { size: 14, color: C.blue.s, bold: true });
    SK.label(svg, 200, 135, "腳數: 2x + 4y = 94", { size: 14, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "linear-sys-2-app",
    en: "Applications of Systems of Linear Equations",
    formula: "\\begin{cases} x + y = \\text{總數量} \\\\ ax + by = \\text{總金額/總腳數} \\end{cases}",

    hook: {
      html: "古算名著《孫子算經》的<b>「雞兔同籠」</b>名題流傳千年：「今有雉兔同籠，上有三十五頭，下有九十四足，問雉兔各幾何？」只要設立雙未知數 $x$ 與 $y$，分別從「頭數」與「腳數」列出兩條等式，千古難題立刻迎刃而解！",
      ask: "如果用一元一次方程解雞兔同籠，跟聯立方程比起來差在哪裡？",
      visual: hookVisual
    },

    guess: {
      q: "雞兔同籠共有 35 個頭、94 隻腳。請問籠子裡共有幾隻兔子？",
      options: [
        { t: "12 隻兔子", truth: true, explain: "設雞 $x$ 隻、兔 $y$ 隻。$\\begin{cases} x+y=35 \\ 2x+4y=94 \\end{cases}$。第一式乘 2 得 $2x+2y=70$，兩式相減得 $2y=24\\implies y=12$（兔）！" },
        { t: "23 隻兔子", common: true, explain: "23 是雞的隻數（$35-12=23$），題目問的是兔子！" },
        { t: "15 隻兔子", explain: "計算腳數時出錯，$2(20)+4(15) = 100 \\ne 94$。" },
        { t: "10 隻兔子", explain: "腳數 $2(25)+4(10) = 90 \\ne 94$。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變兔子與雞的隻數分配，觀察總腳數如何平滑變化。",
      frames: [
        { cap: "雙未知數設法：設題目中的兩個目標量為 $x$ 與 $y$，並清楚寫下單位（隻、元、張、個）。", tex: "\\text{設雞 }x\\text{ 隻、兔 }y\\text{ 隻}" },
        { cap: "雙條件列式：題目通常會給予兩個獨立的總量關係（如「總個數」與「總值/總腳數」）。", tex: "\\begin{cases} x + y = 35 \\\\ 2x + 4y = 94 \\end{cases}" },
        { cap: "消元求解：利用加減消去法或代入消去法求出 $(x, y)$。", tex: "2(x+y) = 70 \\implies 2y = 24 \\implies y = 12,\\ x = 23" },
        { cap: "合理性檢驗：求出的解必須符合現實生活條件（正整數、非負數）。", tex: "x=23,\\ y=12\\quad (23+12=35,\\ 46+48=94\\text{ (符合)})" }
      ],
      hint: "審題時圈出兩個不同的總量（數量總和、價值總和），正好對應兩條方程式。",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "雞兔同籠滑桿");
        var slRabbit = SK.slider({ label: "兔子 y 隻", min: 0, max: 35, step: 1, value: 12, color: "orange", fmt: function (v) { return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slRabbit.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var y = slRabbit.value, x = 35 - y, legs = 2 * x + 4 * y;
          svg.innerHTML = "";
          s("rect", { x: 60, y: 50, width: 320, height: 130, rx: 14, fill: legs === 94 ? C.green.f : C.gold.f, stroke: legs === 94 ? C.green.s : C.cocoa, "stroke-width": 2 }, svg);
          SK.label(svg, 220, 85, "雞 " + x + " 隻，兔 " + y + " 隻 (共 35 隻)", { size: 16, color: C.ink, bold: true });
          SK.label(svg, 220, 125, "總腳數: 2(" + x + ") + 4(" + y + ") = " + legs + " 隻腳", { size: 18, color: legs === 94 ? C.green.s : C.pink.s, bold: true });
          SK.label(svg, 220, 155, (legs === 94 ? "✦ 符合題目 94 隻腳！" : "尚未平衡（差 " + Math.abs(legs - 94) + " 腳）"), { size: 13, color: legs === 94 ? C.green.s : C.soft });
          read.innerHTML = SK.tex("x = " + x + ",\\ y = " + y + "\\implies 2(" + x + ") + 4(" + y + ") = " + legs, true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "二位數問題與買賣票價問題",
        code: "A-7-5",
        demo: {
          q: "一個二位數，其十位數字與個位數字的和為 11。若將十位與個位數字對調，得到的新數比原數大 45，求原二位數。",
          steps: [
            "設原數的十位數字為 $x$，個位數字為 $y$。原數 $= 10x + y$，新數 $= 10y + x$。",
            "依題意列出聯立方程式：$\\begin{cases} x + y = 11 \\ (10y + x) - (10x + y) = 45 \\end{cases}$。",
            "第二式化簡：$9y - 9x = 45 \\implies y - x = 5$。",
            "聯立相加：$(x + y) + (y - x) = 11 + 5 \\implies 2y = 16 \\implies y = 8$。",
            "代入得 $x = 3$。原數為 $38$（檢查：$83 - 38 = 45$ 正確）。"
          ]
        },
        tries: [
          {
            q: "動物園全票一張 100 元，優待票一張 60 元。某校師生共 40 人參觀，門票總計花了 3200 元。請問全票與優待票各買了幾張？",
            hint: "設全票買 $x$ 張，優待票買 $y$ 張。人數與金額各列一條等式。",
            ans: "$\\begin{cases} x + y = 40 \\ 100x + 60y = 3200 \\end{cases}$，解得全票 $x = 20$ 張，優待票 $y = 20$ 張。"
          },
          {
            q: "某飲料店大杯奶茶每杯 50 元，中杯奶茶每杯 35 元。小華買了兩種容量共 12 杯，總共付了 510 元。求大杯奶茶買了幾杯？",
            hint: "設大杯 $x$ 杯，中杯 $y$ 杯。$\\begin{cases} x+y=12 \\ 50x+35y=510 \\end{cases}$。",
            ans: "第一式乘 35 相減得 $15x = 90 \\implies x = 6$（大杯 6 杯，中杯 6 杯）。"
          }
        ],
        edge: "二位數的寫法絕對不能寫成 $xy$（那是相乘），必須依十進位寫成 $10x + y$！這是二位數問題最常見的致命失分點。"
      }
    ],

    angles: [
      {
        title: "「抬腳法」的心算美學",
        icon: "sparkle",
        html: "不用代數怎麼解雞兔同籠？想像哨音一響，所有的動物都<b>抬起 2 隻腳</b>！地上剩下的腳全都是兔子的後腳：$94 - (35\\times 2) = 24$ 隻腳。每隻兔子剩下 2 隻腳，所以兔子有 $24\\div 2 = 12$ 隻！代數中的加減消去法，本質上就是這套抬腳魔法的精準符號化。"
      },
      {
        title: "順流與逆流問題",
        icon: "leaf",
        html: "船在水上航行：<br>‧ <b>順流時速</b> $=$ 船速 $+$ 水流速（$x + y$）<br>‧ <b>逆流時速</b> $=$ 船速 $-$ 水流速（$x - y$）<br>只要將順逆流速率相加除以 2 就是船速，相減除以 2 就是水流速！"
      }
    ],

    challenges: [
      {
        lv: "Warm-up",
        q: "小明有 5 元硬幣與 10 元硬幣共 20 枚，合計 160 元。求 10 元硬幣有幾枚？",
        hint: "設 5 元有 $x$ 枚，10 元有 $y$ 枚。",
        idea: "$\\begin{cases} x+y=20 \\ 5x+10y=160 \\end{cases}$。第一式乘 5 相減得 $5y = 60 \\implies y = 12$ 枚。"
      },
      {
        lv: "Explore",
        q: "某快艇順流航行 60 公里花費 2 小時，逆流航行同一段 60 公里花費 3 小時。求快艇本身在靜水中的航速與水流速度。",
        hint: "順流時速為 $60\\div 2 = 30$，逆流時速為 $60\\div 3 = 20$。",
        idea: "$\\begin{cases} x + y = 30 \\ x - y = 20 \\end{cases}$。兩式相加除以 2 得靜水船速 $x = 25$ 公里/時，水流速度 $y = 5$ 公里/時。"
      },
      {
        lv: "Wonder",
        q: "甲、乙兩人共有 1200 元。若甲給乙 100 元後，甲的錢恰好是乙的錢的 2 倍。求甲、乙原本各有多少錢？",
        hint: "甲給乙 100 元後，甲剩下 $x-100$，乙變成 $y+100$，兩人的總金額依然是 1200 元。",
        idea: "給完後乙有 $1200\\div 3 = 400$ 元，故 $y + 100 = 400 \\implies y = 300$ 元。甲原本有 $1200 - 300 = 900$ 元。"
      }
    ],

    where: {
      codes: [["A-7-5", "二元一次聯立方程式的應用問題"]],
      exam: "會考非選擇題的最熱門題型，評量學生將生活問題轉換為聯立方程式並完整表述求解過程的能力。",
      stop: "應用題以線性關係為限，不引進二次方程式或非整數解的繁複排程優化。"
    }
  });
})();
