/* 單元：2-1 點、直線與圓的關係 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "直線與圓的三種位置關係");
    // 圓 O
    s("circle", { cx: 200, cy: 100, r: 50, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("circle", { cx: 200, cy: 100, r: 3, fill: C.ink }, svg);
    SK.label(svg, 200, 90, "O", { size: 12, color: C.ink, bold: true });

    // 割線 d < r
    s("line", { x1: 50, y1: 70, x2: 350, y2: 70, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 60, 60, "割線 (2交點, d<r)", { size: 11, color: C.orange.s });

    // 切線 d = r
    s("line", { x1: 50, y1: 150, x2: 350, y2: 150, stroke: C.red.s, "stroke-width": 2 }, svg);
    SK.label(svg, 60, 140, "切線 (1切點, d=r, 垂直半徑)", { size: 11, color: C.red.s, bold: true });

    // 相離 d > r
    s("line", { x1: 50, y1: 180, x2: 350, y2: 180, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 60, 195, "相離 (0交點, d>r)", { size: 11, color: C.blue.s });
  }

  SK.mountUnit({
    slug: "circle-line-rel",
    en: "Points, Lines, and Circles",
    formula: "d < r:\\ \\text{相交兩點(割線)};\\quad d = r:\\ \\text{相切(切線)};\\quad d > r:\\ \\text{相離}",

    hook: {
      html: "硬幣在桌面上滾動時，每一瞬間硬幣的邊緣都恰好只有「一個點」與桌面親密接觸，而接觸點上的半徑永遠與桌面維持嚴格垂直！這就是幾何學中最優美的<b>圓的切線性質</b>。比較圓心到直線的距離 $d$ 與半徑 $r$，就能精準判定相交、相切或相離！",
      ask: "過圓外一點向圓引兩條切線，這兩條切線段的長度為什麼必然完全相等？",
      visual: hookVisual
    },

    guess: {
      q: "已知圓 $O$ 的半徑為 5 公分，圓心 $O$ 到直線 $L$ 的垂直距離為 4 公分，則直線 $L$ 與圓 $O$ 共有幾個交點？",
      options: [
        { t: "2 個交點（割線）", truth: true, explain: "比較圓心距與半徑：$d = 4 < r = 5$！因為圓心距小於半徑，直線穿入圓的內部，與圓恰交於 2 個相異點，這條直線稱為「割線」！" },
        { t: "1 個交點（切線）", common: true, explain: "只有當圓心距等於半徑（$d = 5$）時才會恰好相切交於 1 點。" },
        { t: "0 個交點（相離）", explain: "當 $d > 5$ 時才相離無交點。" },
        { t: "無限多個交點", explain: "直線與圓最多只可能有 2 個交點。" }
      ]
    },

    derive: {
      intro: "透過滑桿改變圓心到直線的垂直距離 $d$，動態觀察割線、切線與相離的狀態切換。",
      frames: [
        { cap: "點與圓的位置：點到圓心距離為 $d$。<br>• $d < r$：點在圓內<br>• $d = r$：點在圓上<br>• $d > r$：點在圓外。", tex: "d < r,\\quad d = r,\\quad d > r" },
        { cap: "直線與圓的位置：圓心到直線垂直距離為 $d$。<br>• $d < r$：割線（交 2 點）<br>• $d = r$：<b>切線（交 1 點）</b><br>• $d > r$：相離（交 0 點）。", tex: "d=r \\iff \\text{相切}" },
        { cap: "切線核心定理：圓心到切點的連線（半徑），<b>必定垂直於該切線</b>！$\\overline{OP} \\perp L$。", tex: "\\overline{OP} \\perp L\\quad (P\\text{ 為切點})" },
        { cap: "圓外一點切線段等長：自圓外點 $P$ 向圓作兩條切線交於 $A, B$，由 RHS 全等可知 $\\overline{PA} = \\overline{PB}$！", tex: "\\overline{PA} = \\overline{PB}" }
      ],
      hint: "解圓切線題目的標準反射動作：立刻將「圓心與切點連起來」，標上 90° 直角符號，畢氏定理瞬間出鞘！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "直線與圓動態模擬");
        var slD = SK.slider({ label: "圓心距 d (半徑 r=50)", min: 20, max: 80, step: 10, value: 50, color: "orange", fmt: function(v){ return v + " px"; }, onInput: draw });
        ctx.sliders.appendChild(slD.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var d = slD.value;
          var r = 50;
          var ox = 220, oy = 110;
          svg.innerHTML = "";
          // 圓
          s("circle", { cx: ox, cy: oy, r: r, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          s("circle", { cx: ox, cy: oy, r: 3, fill: C.ink }, svg);
          SK.label(svg, ox, oy - 10, "O", { size: 12, color: C.ink, bold: true });

          // 直線
          var lineY = oy + d;
          s("line", { x1: 50, y1: lineY, x2: 390, y2: lineY, stroke: d === r ? C.red.s : d < r ? C.orange.s : C.blue.s, "stroke-width": 2.5 }, svg);

          // 圓心到直線垂線
          s("line", { x1: ox, y1: oy, x2: ox, y2: lineY, stroke: C.cocoa, "stroke-dasharray": "3,3", "stroke-width": 1.5 }, svg);
          SK.label(svg, ox + 15, oy + d / 2, "d=" + d, { size: 12, color: C.cocoa, bold: true });

          var statusStr = d < r ? "相交兩點（割線）" : d === r ? "相切於一點（切線，垂直半徑！）" : "相離（無交點）";
          read.innerHTML = SK.tex("\\text{半徑 }r = 50，\\text{圓心距 }d = " + d + "\\quad \\implies \\text{【" + statusStr + "】}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "弦心距與切線長計算",
        code: "S-9-5",
        demo: {
          q: "圓 $O$ 的半徑為 10 公分，圓內有一條弦 $\\overline{AB}$ 長 16 公分。求圓心到這條弦的距離（弦心距 $\\overline{OM}$）。",
          steps: [
            "弦心距垂直平分弦：自圓心 $O$ 向弦作垂線 $\\overline{OM} \\perp \\overline{AB}$，則 $M$ 為 $\\overline{AB}$ 中點。",
            "求半弦長：$\\overline{AM} = \\frac{16}{2} = 8$ 公分。",
            "在直角 $\\triangle OAM$ 中，半徑 $\\overline{OA} = 10$ 為斜邊。",
            "畢氏定理求弦心距：$\\overline{OM} = \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$ 公分。"
          ]
        },
        tries: [
          {
            q: "點 $P$ 在圓 $O$ 外部，圓 $O$ 半徑為 5 公分，$\\overline{OP} = 13$ 公分。自 $P$ 向圓作切線切於 $A$，則切線段 $\\overline{PA}$ 的長度是多少？",
            options: ["12 公分", "14 公分", "$\\sqrt{194}$ 公分", "8 公分"],
            ans: 0,
            explain: "切線垂直半徑：$\\angle OAP = 90^\\circ$。在直角 $\\triangle OAP$ 中，斜邊 $\\overline{OP} = 13$，股 $\\overline{OA} = 5$。切線段長 $\\overline{PA} = \\sqrt{13^2 - 5^2} = 12$ 公分。"
          },
          {
            q: "圓外切四邊形 $ABCD$ 的四邊長分別為 $a, b, c, d$（順序排列）。下列哪一個等式永遠成立？",
            options: ["a + c = b + d", "a + b = c + d", "a × c = b × d", "a^2 + c^2 = b^2 + d^2"],
            ans: 0,
            explain: "根據圓外切四邊形切線段等長性質：四邊形兩組對邊長度和相等，即「上底加下底 ＝ 左腰加右腰」，$a + c = b + d$！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "兩同心圓的半徑分別為 3 與 5，大圓的一條弦與小圓相切，則此弦的長度是多少？",
        options: ["8", "4", "10", "6"],
        ans: 0,
        hint: "大圓的弦與小圓相切，切點即為弦的中點，小圓半徑即為弦心距！",
        explain: "弦心距等於小圓半徑 3，大圓半徑為 5。由畢氏定理，半弦長 $= \\sqrt{5^2 - 3^2} = 4$。全弦長 $= 4 \\times 2 = 8$。"
      }
    ],

    angles: [
      { title: "輪胎為什麼必須是圓形的？", body: "因為圓的切線性質保證了：圓周上任意一點到切線的距離恆等於半徑 $r$。只有圓形輪胎在平坦地面滾動時，車軸中心的高度才能永遠維持完全水平，乘客才不會上下顛簸！" },
      { title: "凸輪機構與發動機氣門開閉", body: "汽車引擎中控制進氣排氣的凸輪軸（Camshaft），其旋轉外緣就是利用切線斜率的連續變化，將旋轉運動精確轉換為氣門頂針的往復直線升降運動。" }
    ],

    where: {
      past: "圓的周長面積與八年級畢氏定理。",
      current: "九年級嚴謹分析點、直線與圓的三種位置關係，掌握切線垂直半徑與弦心距垂徑定理。",
      next: "下一節將把圓弧與圓心、圓周角相連——「弧度與圓周角定理」！"
    }
  });
})();
