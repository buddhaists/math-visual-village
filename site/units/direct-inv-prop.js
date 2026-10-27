/* 單元：3-2 正比與反比 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "正比與反比的幾何形貌");
    // 左正比直線
    s("line", { x1: 30, y1: 160, x2: 170, y2: 160, stroke: C.cocoa }, svg);
    s("line", { x1: 40, y1: 170, x2: 40, y2: 30, stroke: C.cocoa }, svg);
    s("line", { x1: 40, y1: 160, x2: 160, y2: 40, stroke: C.orange.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 100, 25, "正比 y = kx (比值固定)", { size: 12, color: C.orange.s, bold: true });
    // 右反比曲線
    s("line", { x1: 230, y1: 160, x2: 370, y2: 160, stroke: C.cocoa }, svg);
    s("line", { x1: 240, y1: 170, x2: 240, y2: 30, stroke: C.cocoa }, svg);
    s("path", { d: "M 250 45 Q 260 130 360 150", stroke: C.blue.s, "stroke-width": 2.5, fill: "none" }, svg);
    SK.label(svg, 300, 25, "反比 xy = k (乘積固定)", { size: 12, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "direct-inv-prop",
    en: "Direct and Inverse Proportions",
    formula: "\\text{正比: }y=kx\\ (\\frac{y}{x}=k),\\quad \\text{反比: }xy=k\\ (k\\ne 0)",

    hook: {
      html: "汽車以固定速度行駛時，行駛的時間越長，走過的距離等比例增加（正比）；而如果要行駛固定 100 公里的路程，車速越快，所需的時間就越短，兩者乘積固定（反比）。",
      ask: "生活中的「一個變大、另一個也變大」就一定是正比嗎？關鍵標準到底是什麼？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一個日常情境中的兩個變量「成反比」？",
      options: [
        { t: "面積固定為 36 平方公分的長方形，其長度與寬度", truth: true, explain: "長方形面積 $=$ 長 $\\times$ 寬 $= 36$（乘積固定為常數 $k$），符合反比定義 $xy = k$！" },
        { t: "個人的年齡與身高", common: true, explain: "年齡增長身高通常增加，但兩者比值並不固定，絕對不是正比，更不是反比！" },
        { t: "每包餅乾單價固定時，購買包數與總金額", explain: "總金額 $\\div$ 包數 $=$ 單價（比值固定），這是「成正比」。" },
        { t: "圓的半徑與圓面積", explain: "圓面積 $= \\pi r^2$，面積與半徑的「平方」成正比，與半徑本身不成正比。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整常數 $k$ 與變量 $x$，體會正比與反比在代數與圖像上的本質差別。",
      frames: [
        { cap: "正比的定義：當兩變數 $x, y$ 的比值恆為非零常數 $k$，稱 $y$ 與 $x$ 成正比。關係式為 $y = kx$。", tex: "\\frac{y}{x} = k \\implies y = kx\\ (k\\ne 0)" },
        { cap: "正比圖形：正比的圖形是一條<b>通過原點 $(0, 0)$</b> 且不與兩軸重合的直線。", tex: "\\text{圖形為通過 }(0, 0)\\text{ 的直線}" },
        { cap: "反比的定義：當兩變數 $x, y$ 的乘積恆為非零常數 $k$，稱 $y$ 與 $x$ 成反比。關係式為 $xy = k$ 或 $y = \\frac{k}{x}$。", tex: "x \\cdot y = k\\ (k\\ne 0)" },
        { cap: "反比圖形：反比的圖形是一條光滑的<b>雙曲線</b>，曲線會無限接近兩坐標軸，但永遠不會相交！", tex: "y = \\frac{k}{x}\\quad (x\\ne 0, y\\ne 0)" }
      ],
      hint: "判斷口訣：比值固定為正比，乘積固定為反比！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "正反比動態推導");
        var slType = SK.slider({ label: "模式 (0: 正比 y=kx, 1: 反比 xy=k)", min: 0, max: 1, step: 1, value: 0, color: "orange", fmt: function(v){ return v===0 ? "正比模式" : "反比模式"; }, onInput: draw });
        var slK = SK.slider({ label: "常數 k", min: 1, max: 4, step: 1, value: 2, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slType.el);
        ctx.sliders.appendChild(slK.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var type = slType.value, k = slK.value;
          var ox = 40, oy = 210, scale = 30;
          svg.innerHTML = "";
          // 軸
          s("line", { x1: ox, y1: oy, x2: 400, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: oy, x2: ox, y2: 30, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          if (type === 0) {
            // 正比 y = kx
            s("line", { x1: ox, y1: oy, x2: ox + 10 * scale, y2: oy - 10 * k * (scale / 4), stroke: C.orange.s, "stroke-width": 3 }, svg);
            read.innerHTML = SK.tex("\\text{【正比】 }y = " + k + "x，\\text{當 }x\\text{ 變成 2 倍、3 倍，}y\\text{ 也跟著變成 2 倍、3 倍！}", true);
          } else {
            // 反比 xy = 8*k
            var cVal = 6 * k;
            var dStr = "";
            for (var t = 1; t <= 10; t += 0.2) {
              var currY = cVal / t;
              var px = ox + t * scale;
              var py = oy - currY * scale;
              if (py >= 30 && py <= oy) {
                dStr += (dStr === "" ? "M " : " L ") + px + " " + py;
              }
            }
            s("path", { d: dStr, stroke: C.blue.s, "stroke-width": 3, fill: "none" }, svg);
            read.innerHTML = SK.tex("\\text{【反比】 }xy = " + cVal + " \\implies y = \\frac{" + cVal + "}{x}，x\\text{ 越大，}y\\text{ 越接近 0 但永不為 0！}", true);
          }
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "正反比關係式求解與代值",
        code: "N-7-9",
        demo: {
          q: "設 $y$ 與 $x$ 成反比，當 $x = 3$ 時，$y = 8$。求 $y$ 與 $x$ 的關係式，以及當 $x = 6$ 時 $y$ 的值。",
          steps: [
            "設關係式：因為成反比，設 $xy = k$（$k \\ne 0$）。",
            "代入已知求 $k$：將 $x = 3, y = 8$ 代入得 $k = 3 \\times 8 = 24$。關係式為 $xy = 24$（或 $y = \\frac{24}{x}$）。",
            "代入新值：當 $x = 6$ 時，$6y = 24 \\implies y = 4$。"
          ]
        },
        tries: [
          {
            q: "已知 $y$ 與 $x$ 成正比，當 $x = 4$ 時 $y = -12$。當 $x = -5$ 時，$y$ 的值是多少？",
            options: ["15", "-15", "20", "-20"],
            ans: 0,
            explain: "成正比設 $y = kx$。代入得 $-12 = 4k \\implies k = -3$。關係式為 $y = -3x$。當 $x = -5$ 時，$y = -3(-5) = 15$。"
          },
          {
            q: "工程隊修築一條公路，若每天出工 12 人需 20 天完工。若想提前至 15 天完工，在工作效率相同下，每天需出工多少人？",
            options: ["16 人", "15 人", "18 人", "25 人"],
            ans: 0,
            explain: "總工程量固定，出工人數與完工天數成反比：$12 \\times 20 = 240$ 工人天。改為 15 天完工，每天需 $240 \\div 15 = 16$ 人。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知 $(y + 2)$ 與 $(x - 1)$ 成反比，且當 $x = 3$ 時 $y = 4$。請問當 $x = 5$ 時，$y$ 的值是多少？",
        options: ["1", "3", "2", "0.5"],
        ans: 0,
        hint: "將整體視為反比：設 $(x - 1)(y + 2) = k$。",
        explain: "設 $(x - 1)(y + 2) = k$。將 $x = 3, y = 4$ 代入：$(3 - 1)(4 + 2) = 2 \\times 6 = 12$，所以 $k = 12$。當 $x = 5$ 時：$(5 - 1)(y + 2) = 12 \\implies 4(y + 2) = 12 \\implies y + 2 = 3 \\implies y = 1$。"
      }
    ],

    angles: [
      { title: "物理學中的反比定律", body: "波以耳定律指出：固定溫度的密閉氣體，壓力 $P$ 與體積 $V$ 成反比（$PV = k$）。當你把針筒頭堵住往內推時，體積縮小一半，內部的氣體壓力立刻翻倍，推起來越發費力！" },
      { title: "齒輪傳動與轉速比", body: "兩個緊密咬合的齒輪，齒數較多的齒輪轉得慢，齒數較少的齒輪轉得快。齒數 $N$ 與每分鐘轉速 $R$ 的乘積固定（$NR = k$），正是反比的絕佳應用。" }
    ],

    where: {
      past: "剛學完比與比值、比例式的交叉相乘。",
      current: "透過正比（商固定）與反比（積固定）刻劃現實世界中兩數量的共變規律。",
      next: "八年級下學期將正比拓展為一次函數 $y=ax+b$，反比則銜接國高中物理與雙曲線概念。"
    }
  });
})();
