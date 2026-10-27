/* 單元：3-1 內角與外角 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "三角形外角等於兩內對角和");
    // 三角形
    s("polygon", { points: "80,140 220,140 180,50", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    // 延長線
    s("line", { x1: 220, y1: 140, x2: 340, y2: 140, stroke: C.cocoa, "stroke-width": 1.5, "stroke-dasharray": "3,3" }, svg);
    // 外角弧
    s("path", { d: "M 245 140 A 25 25 0 0 0 205 105", fill: "none", stroke: C.red.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 260, 115, "外角", { size: 13, color: C.red.s, bold: true });
    SK.label(svg, 110, 130, "內角 A", { size: 11, color: C.blue.s });
    SK.label(svg, 175, 75, "內角 B", { size: 11, color: C.orange.s });
    SK.label(svg, 200, 185, "外角定理：外角 = 內角 A + 內角 B", { size: 13, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "angle-polygon",
    en: "Interior and Exterior Angles of Polygons",
    formula: "\\text{外角}=\\text{兩內對角和},\\quad \\text{內角和}=(n-2)\\times 180^\\circ,\\quad \\text{外角和}=360^\\circ",

    hook: {
      html: "想像你拿著方向盤沿著一個多邊形跑道走完一整圈回到起點，不論是三角形、五邊形還是百邊形，方向盤轉過的所有外角總和，永遠恰好等於<b>轉滿一整圈的 360 度</b>！而將多邊形切成多個三角形，更揭開了內角和的萬能公式！",
      ask: "為什麼任意凸 $n$ 邊形的外角和永遠是 360°，跟它到底有幾條邊完全無關？",
      visual: hookVisual
    },

    guess: {
      q: "一個正八邊形的「每一個內角」度數是多少？",
      options: [
        { t: "135 度", truth: true, explain: "正八邊形外角和為 360°，每個外角 $= 360^\\circ \\div 8 = 45^\\circ$。因此每個內角 $= 180^\\circ - 45^\\circ = 135^\\circ$！用外角推內角最快！" },
        { t: "120 度", explain: "這是正六邊形的內角度數（$360 \\div 6 = 60, 180 - 60 = 120$）。" },
        { t: "140 度", explain: "這是正九邊形的內角度數。" },
        { t: "108 度", common: true, explain: "這是正五邊形的內角度數。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整多邊形邊數 $n$，觀察三角形切分法與外角轉一圈 360° 的幾何本質。",
      frames: [
        { cap: "三角形外角定理：三角形任一外角，等於它兩個不相鄰的內對角之和！", tex: "\\angle 1 = \\angle A + \\angle B" },
        { cap: "凸 $n$ 邊形內角和：從一個頂點出發連對角線，可將 $n$ 邊形切分成 $(n - 2)$ 個三角形。內角和為 $(n - 2) \\times 180^\\circ$。", tex: "\\sum \\text{內角} = (n - 2) \\times 180^\\circ" },
        { cap: "任意多邊形外角和：每個頂點取一個外角，順著同方向繞行一圈恰轉了 360°。因此<b>任意凸多邊形外角和恆為 360°</b>！", tex: "\\sum \\text{外角} = 360^\\circ\\ (\\text{與邊數 }n\\text{ 無關！})" },
        { cap: "正多邊形巧算技巧：求正 $n$ 邊形內角時，先算外角 $\\frac{360^\\circ}{n}$，再用 $180^\\circ - \\text{外角}$，遠比帶內角和公式快得多！", tex: "\\text{正 }n\\text{ 邊形內角} = 180^\\circ - \\frac{360^\\circ}{n}" }
      ],
      hint: "解多邊形角度神技巧：先算外角再回推內角，計算量立減一半！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "多邊形角度推導動態圖");
        var slN = SK.slider({ label: "邊數 n", min: 3, max: 8, step: 1, value: 5, color: "orange", fmt: function(v){ return v + " 邊形"; }, onInput: draw });
        ctx.sliders.appendChild(slN.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var n = slN.value;
          var ox = 220, oy = 120, r = 70;
          svg.innerHTML = "";
          var pts = [];
          for (var i = 0; i < n; i++) {
            var ang = (i * 2 * Math.PI) / n - Math.PI / 2;
            pts.push([ox + r * Math.cos(ang), oy + r * Math.sin(ang)]);
          }
          var polyStr = pts.map(function(p){ return p[0] + "," + p[1]; }).join(" ");
          s("polygon", { points: polyStr, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);

          // 畫對角線切分三角形
          for (var j = 2; j < n - 1; j++) {
            s("line", { x1: pts[0][0], y1: pts[0][1], x2: pts[j][0], y2: pts[j][1], stroke: C.orange.s, "stroke-dasharray": "3,3" }, svg);
          }

          var intSum = (n - 2) * 180;
          var extAng = (360 / n).toFixed(1);
          var intAng = (180 - extAng).toFixed(1);

          read.innerHTML = SK.tex("\\text{正 " + n + " 邊形：可切為 " + (n - 2) + " 個三角形，內角和 } = " + intSum + "^\\circ，\\text{外角 } = " + extAng + "^\\circ，\\text{內角 } = " + intAng + "^\\circ", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "運用外角定理與多邊形角度計算",
        code: "S-8-2",
        demo: {
          q: "一個凸多邊形的內角和是 1260°，求：(1) 此多邊形的邊數；(2) 若此多邊形為正多邊形，每一個外角是多少度？",
          steps: [
            "(1) 設邊數為 $n$。$(n - 2) \\times 180^\\circ = 1260^\\circ \\implies n - 2 = 7 \\implies n = 9$（九邊形）。",
            "(2) 任意多邊形外角和恆為 360°，正九邊形每個外角 $= 360^\\circ \\div 9 = 40^\\circ$。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 中，若 $\\angle A = 50^\\circ$，且 $\\angle B$ 的外角是 $115^\\circ$，則 $\\angle C$ 的度數是多少？",
            options: ["65 度", "115 度", "50 度", "75 度"],
            ans: 0,
            explain: "根據外角定理：$\\angle B$ 的外角等於兩內對角之和，即 $115^\\circ = \\angle A + \\angle C = 50^\\circ + \\angle C \\implies \\angle C = 65^\\circ$。"
          },
          {
            q: "若一個正多邊形的每一個內角是其外角的 3 倍，則此正多邊形是正幾邊形？",
            options: ["正八邊形", "正六邊形", "正十邊形", "正十二邊形"],
            ans: 0,
            explain: "內角加外角等於 180°。設外角為 $x$，內角為 $3x$：$x + 3x = 180^\\circ \\implies 4x = 180^\\circ \\implies x = 45^\\circ$。邊數 $n = 360^\\circ \\div 45^\\circ = 8$（正八邊形）。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "常見的五角星形狀（五芒星），其五個頂角的度數總和是多少？",
        options: ["180 度", "360 度", "540 度", "108 度"],
        ans: 0,
        hint: "利用外角定理兩次，將五個頂角集中到中間的小三角形內。",
        explain: "將星形頂點標為 $A, B, C, D, E$。利用三角形外角定理，$\\angle 1 = \\angle A + \\angle D$ 且 $\\angle 2 = \\angle B + \\angle E$。這兩個角與 $\\angle C$ 恰好構成一個小三角形的三個內角，因此 $\\angle A + \\angle B + \\angle C + \\angle D + \\angle E = 180^\\circ$！"
      }
    ],

    angles: [
      { title: "鋪地磚的密鋪幾何密碼", body: "為什麼浴室磁磚只有「正三角形、正方形、正六邊形」能完美拼合鋪滿地面，而正五邊形或正八邊形卻不行？因為只有當頂點處每個內角度數能整除 360°（正三 60°×6、正四 90°×4、正六 120°×3）時，才能做到無縫隙密鋪！" },
      { title: "機器人避障導航轉角算法", body: "自駕車與掃地機器人在多邊形房間沿牆邊巡航時，計算車身總轉向角就是利用多邊形外角和定理：繞完一整圈恰好旋轉 360 度，藉此校正慣性陀螺儀的累積漂移誤差。" }
    ],

    where: {
      past: "七年級對角度、射線與平角對頂角的基本認識。",
      current: "八年級下學期掌握三角形外角定理與凸多邊形內外角和通式。",
      next: "下一節將使用古希臘純粹的「直尺與圓規」，進行線段與角平分線的尺規作圖！"
    }
  });
})();
