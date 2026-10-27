/* 單元：2-3 畢氏定理 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "三邊正方形面積關係");
    // 直角三角形 (股3, 股4, 弦5)
    s("polygon", { points: "150,130 210,130 210,50", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    // 直角標記
    s("rect", { x: 198, y: 118, width: 12, height: 12, fill: "none", stroke: C.cocoa }, svg);
    // 股正方形 3^2
    s("rect", { x: 150, y: 130, width: 60, height: 60, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 180, 165, "a^2=9", { size: 12, color: C.orange.s, bold: true });
    // 股正方形 4^2
    s("rect", { x: 210, y: 50, width: 80, height: 80, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 1.5 }, svg);
    SK.label(svg, 250, 95, "b^2=16", { size: 12, color: C.blue.s, bold: true });
    // 弦文字
    SK.label(svg, 160, 80, "c^2 = 25", { size: 14, color: C.green.s, bold: true });
    SK.label(svg, 200, 195, "a^2 + b^2 = c^2 (9 + 16 = 25)", { size: 13, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "pythagoras",
    en: "The Pythagorean Theorem",
    formula: "a^2 + b^2 = c^2\\quad (\\angle C = 90^\\circ)",

    hook: {
      html: "古埃及尼羅河每年氾濫沖毀農田邊界，土地測量員用一根打了 12 個等距繩結的繩子拉成 $3 : 4 : 5$ 的三角形，就能精確造出直角！兩千多年前畢達哥拉斯證明了：<b>直角三角形兩股平方和，永遠等於斜邊平方</b>！",
      ask: "直角三角形三邊中，哪一條邊永遠最長？坐標平面上兩點之間的距離公式是怎麼用它推出來的？",
      visual: hookVisual
    },

    guess: {
      q: "一個直角三角形的一條股長為 5，斜邊長為 13，則另一條股長是多少？",
      options: [
        { t: "12", truth: true, explain: "畢氏定理：$a^2 + b^2 = c^2 \\implies 5^2 + b^2 = 13^2 \\implies 25 + b^2 = 169 \\implies b^2 = 144 \\implies b = 12$！標準常見畢氏三元數 (5, 12, 13)！" },
        { t: "\\sqrt{194}", common: true, explain: "致命錯誤！誤把兩邊平方相加（以為求斜邊）：$5^2 + 13^2 = 194$。題目給的是斜邊 13，應該用減法！" },
        { t: "8", explain: "誤用 $13 - 5 = 8$ 線性相減，幾何長度不是這樣算的。" },
        { t: "10", explain: "隨意猜測。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整直角三角形的兩股長度 $a$ 與 $b$，即時觀察斜邊長度與坐標距離公式計算。",
      frames: [
        { cap: "畢氏定理：直角三角形中，兩股長為 $a, b$，斜邊為 $c$，則 $a^2 + b^2 = c^2$。斜邊必為最長邊。", tex: "a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2}" },
        { cap: "常用畢氏三元整數組：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(9, 40, 41) 及其任意倍數！", tex: "(3k, 4k, 5k),\\ (5k, 12k, 13k)" },
        { cap: "畢氏定理逆定理：若三角形三邊滿足 $a^2 + b^2 = c^2$（其中 $c$ 為最長邊），則此三角形必為直角三角形，$\\angle C = 90^\\circ$。", tex: "a^2+b^2=c^2 \\iff \\triangle\\text{ 為直角三角形}" },
        { cap: "平面兩點距離公式：點 $A(x_1, y_1)$ 與 $B(x_2, y_2)$ 作水平鉛直輔助線構成直角三角形，由畢氏定理推得距離公式！", tex: "\\overline{AB} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" }
      ],
      hint: "審題第一步：先確認題目給的是「兩股」還是「一股一斜邊」！求斜邊用加法，求股長用減法！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "畢氏定理推導動態圖");
        var slA = SK.slider({ label: "股長 a", min: 3, max: 9, step: 1, value: 3, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        var slB = SK.slider({ label: "股長 b", min: 4, max: 12, step: 1, value: 4, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slB.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, b = slB.value;
          var c2 = a * a + b * b;
          var c = Math.sqrt(c2);
          var ox = 80, oy = 190, sc = 14;
          svg.innerHTML = "";
          // 直角三角形
          var p1 = [ox, oy];
          var p2 = [ox + b * sc, oy];
          var p3 = [ox + b * sc, oy - a * sc];
          s("polygon", { points: p1[0]+","+p1[1]+" "+p2[0]+","+p2[1]+" "+p3[0]+","+p3[1], fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // 直角標記
          s("rect", { x: p2[0] - 12, y: p2[1] - 12, width: 12, height: 12, fill: "none", stroke: C.cocoa }, svg);

          SK.label(svg, ox + (b * sc) / 2, oy + 18, "底股 b=" + b, { size: 12, color: C.blue.s, bold: true });
          SK.label(svg, p2[0] + 25, oy - (a * sc) / 2, "高股 a=" + a, { size: 12, color: C.orange.s, bold: true });
          SK.label(svg, ox + (b * sc) / 2 - 15, oy - (a * sc) / 2 - 10, "斜邊 c=" + c.toFixed(2), { size: 13, color: C.green.s, bold: true });

          read.innerHTML = SK.tex("c = \\sqrt{" + a + "^2 + " + b + "^2} = \\sqrt{" + (a*a) + " + " + (b*b) + "} = \\sqrt{" + c2 + "} \\approx " + c.toFixed(2), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "畢氏定理求邊長與坐標距離",
        code: "S-8-6",
        demo: {
          q: "直角三角形中兩股長分別為 6 與 8，求：(1) 斜邊長；(2) 斜邊上的高。",
          steps: [
            "(1) 由畢氏定理：斜邊 $c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$。",
            "(2) 利用面積相等（兩股乘積除以 2 ＝ 斜邊乘高除以 2）：",
            "$\\frac{1}{2} \\times 6 \\times 8 = \\frac{1}{2} \\times 10 \\times h \\implies 10h = 48 \\implies h = 4.8$。"
          ]
        },
        tries: [
          {
            q: "坐標平面上兩點 $A(-1, 2)$ 與 $B(3, 5)$，求線段 $\\overline{AB}$ 的長度為多少？",
            options: ["5", "\\sqrt{7}", "7", "25"],
            ans: 0,
            explain: "兩點距離公式：$\\overline{AB} = \\sqrt{(3 - (-1))^2 + (5 - 2)^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$。"
          },
          {
            q: "下列哪一組數字「無法」作為直角三角形的三邊長？",
            options: ["4, 5, 6", "3, 4, 5", "5, 12, 13", "7, 24, 25"],
            ans: 0,
            explain: "檢驗兩小邊平方和：$4^2 + 5^2 = 16 + 25 = 41 \\ne 6^2 (36)$，不滿足畢氏定理，因此不是直角三角形！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "有一隻長度為 25 公尺的梯子靠在垂直牆邊，梯腳離牆底 7 公尺。若梯頂下滑了 4 公尺，則梯腳向外滑移了多少公尺？",
        options: ["8 公尺", "15 公尺", "4 公尺", "5 公尺"],
        ans: 0,
        hint: "梯長不變恆為 25 公尺，先求原本梯頂高度，再算下滑後的新三角形。",
        explain: "原本梯頂高度 $h_1 = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24$ 公尺。下滑 4 公尺後新高度為 $24 - 4 = 20$ 公尺。新底邊離牆距離 $d = \\sqrt{25^2 - 20^2} = \\sqrt{625 - 400} = \\sqrt{225} = 15$ 公尺。原本離牆 7 公尺，因此滑移了 $15 - 7 = 8$ 公尺！"
      }
    ],

    angles: [
      { title: "總統證法：加菲爾德的梯形證明", body: "美國第 20 任總統詹姆斯·加菲爾德在 1876 年提出了一個極為優雅的畢氏定理證明：只用一個梯形由三個直角三角形拼成，以兩種不同方式計算面積（梯形面積公式 vs 三三角形面積和），展開直接得出 $a^2+b^2=c^2$！" },
      { title: "愛因斯坦相對論與四維時空距", body: "愛因斯坦在狹義相對論中，將畢氏定理推廣至四維時空，定義時空間隔 $s^2 = (c\\Delta t)^2 - (\\Delta x^2 + \\Delta y^2 + \\Delta z^2)$，這正是近代物理學最重要的幾何基石！" }
    ],

    where: {
      past: "七年級坐標平面與八年級剛學完的平方根運算。",
      current: "八年級掌握畢氏定理及兩點距離公式，連結代數平方與幾何直角。",
      next: "九年級將進一步結合圓的半徑與切線、相似三角形邊長比，深化畢氏定理的無窮威力！"
    }
  });
})();
