/* 單元：1-1 二次函數及其圖形 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "二次函數拋物線頂點與開口");
    s("line", { x1: 20, y1: 150, x2: 380, y2: 150, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
    s("line", { x1: 200, y1: 20, x2: 200, y2: 180, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

    // 拋物線 y = 0.05 * (x - 200)^2 + 40
    s("path", { d: "M 100 40 Q 200 170 300 40", stroke: C.orange.s, "stroke-width": 3, fill: "none" }, svg);
    s("circle", { cx: 200, cy: 150, r: 5, fill: C.red.s }, svg);
    SK.label(svg, 200, 170, "頂點 (h, k)", { size: 12, color: C.red.s, bold: true });

    s("line", { x1: 200, y1: 20, x2: 200, y2: 180, stroke: C.red.s, "stroke-dasharray": "3,3", "stroke-width": 1.5 }, svg);
    SK.label(svg, 290, 60, "y = a(x - h)^2 + k", { size: 14, color: C.orange.s, bold: true });
    SK.label(svg, 290, 85, "對稱軸 x = h", { size: 12, color: C.red.s });
  }

  SK.mountUnit({
    slug: "quad-func-graph",
    en: "Quadratic Functions and Their Graphs",
    formula: "y = a(x - h)^2 + k\\quad (\\text{頂點 }(h, k),\\ \\text{對稱軸 }x = h)",

    hook: {
      html: "籃球投出後的空中弧線、噴泉噴出的水柱軌跡、金門大橋懸索的垂懸曲線，全都遵循一條優美的 U 形幾何曲線——<b>拋物線（Parabola）</b>！透過配方法將二次函數化為標準頂點式 $y = a(x-h)^2 + k$，開口方向、對稱軸與頂點坐標一覽無餘！",
      ask: "拋物線的開口方向由誰決定？為什麼左右兩邊總是嚴格關於直線 $x = h$ 鏡面對稱？",
      visual: hookVisual
    },

    guess: {
      q: "二次函數 $y = -2(x - 3)^2 + 5$ 的圖形頂點坐標與開口方向分別為何？",
      options: [
        { t: "頂點為 (3, 5)，開口向下", truth: true, explain: "對照標準式 $y = a(x - h)^2 + k$：$a = -2 < 0$，負數開口向下；頂點為 $(h, k) = (3, 5)$！" },
        { t: "頂點為 (-3, 5)，開口向下", common: true, explain: "正負號看錯！括號內是 $(x - 3)$，所以橫坐標 $h = +3$。" },
        { t: "頂點為 (3, 5)，開口向上", explain: "二次項係數 $a = -2$ 為負數，開口必須向下。" },
        { t: "頂點為 (3, -5)，開口向上", explain: "常數項 $k = +5$。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整開口係數 $a$、水平平移 $h$ 與鉛直平移 $k$，觀察拋物線在平面上的動態舞動。",
      frames: [
        { cap: "基礎型 $y = ax^2$：頂點在原點 $(0, 0)$，對稱軸為 $y$ 軸（$x = 0$）。<br>• $a > 0$：開口向上，有最低點<br>• $a < 0$：開口向下，有最高點。<br>• $|a|$ 越大，開口越狹窄！", tex: "a>0 \\implies \\text{開口向上};\\quad a<0 \\implies \\text{開口向下};\\quad |a|\\uparrow \\implies \\text{開口變小}" },
        { cap: "標準頂點式：由 $y = ax^2$ 經由平移得到：<b>向右移 $h$ 單位、向上移 $k$ 單位</b>得 $y = a(x - h)^2 + k$。", tex: "y = a(x - h)^2 + k \\iff \\text{頂點 }(h, k)" },
        { cap: "對稱軸方程式：通過頂點的鉛直線，方程式恆為 $x = h$。圖形上關於此軸對稱的兩點，其 $y$ 值相等！", tex: "\\text{對稱軸: }x = h" },
        { cap: "一般式配方化簡：遇到 $y = ax^2 + bx + c$，提出 $a$ 對 $x$ 項配方，即可化為頂點式求得頂點坐標！", tex: "y = a\\left(x + \\frac{b}{2a}\\right)^2 + \\frac{4ac - b^2}{4a}" }
      ],
      hint: "平移記憶口訣：括號內左加右減（$x-h$ 向右移），括號外上加下減（$+k$ 向上移）！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "二次函數拋物線平移模擬");
        var slA = SK.slider({ label: "開口 a (-1 或 1)", min: -1, max: 1, step: 2, value: 1, color: "orange", fmt: function(v){ return v > 0 ? "+1 (向上)" : "-1 (向下)"; }, onInput: draw });
        var slH = SK.slider({ label: "水平平移 h", min: -3, max: 3, step: 1, value: 1, color: "blue", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slA.el);
        ctx.sliders.appendChild(slH.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var a = slA.value, h = slH.value;
          var k = 2; // 固定 k=2
          var ox = 220, oy = 130, scale = 20;
          svg.innerHTML = "";
          // 坐標軸
          s("line", { x1: 20, y1: oy, x2: 420, y2: oy, stroke: C.cocoa, "stroke-width": 1.5 }, svg);
          s("line", { x1: ox, y1: 15, x2: ox, y2: 245, stroke: C.cocoa, "stroke-width": 1.5 }, svg);

          // 對稱軸
          var pAxisX = ox + h * scale;
          s("line", { x1: pAxisX, y1: 15, x2: pAxisX, y2: 245, stroke: C.red.s, "stroke-dasharray": "3,3", "stroke-width": 1.5 }, svg);

          // 畫拋物線點
          var dStr = "";
          for (var tx = -4; tx <= 4; tx += 0.2) {
            var currX = h + tx;
            var currY = a * (tx * tx) + k;
            var px = ox + currX * scale;
            var py = oy - currY * scale;
            if (py >= 15 && py <= 245) {
              dStr += (dStr === "" ? "M " : " L ") + px + " " + py;
            }
          }
          s("path", { d: dStr, stroke: C.orange.s, "stroke-width": 2.5, fill: "none" }, svg);

          // 頂點
          var pVx = ox + h * scale, pVy = oy - k * scale;
          s("circle", { cx: pVx, cy: pVy, r: 5, fill: C.red.s }, svg);
          SK.label(svg, pVx + 15, pVy - 8, "(" + h + ", " + k + ")", { size: 12, color: C.red.s, bold: true });

          read.innerHTML = SK.tex("y = " + (a>0?"":"-") + "(x " + (-h>=0?"+ ":"") + (-h) + ")^2 + " + k + "\\implies \\text{頂點 }(" + h + ", " + k + ")，\\text{對稱軸 }x = " + h + "，\\text{開口向}" + (a>0?"上":"下"), true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求二次函數的頂點、對稱軸與開口",
        code: "F-9-1",
        demo: {
          q: "將二次函數 $y = 2x^2 - 8x + 5$ 配方化為頂點式，並寫出其頂點坐標與對稱軸方程式。",
          steps: [
            "提二次項係數：$y = 2(x^2 - 4x) + 5$。",
            "在括號內補上一半的平方：$4$ 的一半是 $2$，$2^2 = 4$。",
            "括號內加 4 相當於整體加了 $2 \\times 4 = 8$，外面必須減 8 保持平衡：$y = 2(x^2 - 4x + 4) + 5 - 8$。",
            "化簡得頂點式：$y = 2(x - 2)^2 - 3$。",
            "結論：頂點坐標為 $(2, -3)$，對稱軸方程式為 $x = 2$，開口向上。"
          ]
        },
        tries: [
          {
            q: "二次函數 $y = -3(x + 4)^2 - 7$ 的對稱軸方程式為下列何者？",
            options: ["x = -4", "x = 4", "y = -7", "x = -7"],
            ans: 0,
            explain: "對稱軸通過頂點橫坐標：由 $(x + 4) = 0 \\implies x = -4$，因此對稱軸方程式為鉛直線 $x = -4$。"
          },
          {
            q: "若將拋物線 $y = 3x^2$ 向右平移 2 單位，再向下平移 5 單位，得到的新拋物線方程式為？",
            options: ["y = 3(x - 2)^2 - 5", "y = 3(x + 2)^2 - 5", "y = 3(x - 2)^2 + 5", "y = 3(x + 2)^2 + 5"],
            ans: 0,
            explain: "向右平移 2 單位 $x$ 變 $(x - 2)$；向下平移 5 單位常數項變 $-5$。新方程式為 $y = 3(x - 2)^2 - 5$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知拋物線 $y = ax^2 + bx + c$ 通過三點 $(0, 3), (1, 0), (2, -1)$，求此拋物線的頂點坐標為何？",
        options: ["(2, -1)", "(1.5, -1.25)", "(1, 0)", "(0, 3)"],
        ans: 0,
        hint: "代入求出係數 $a, b, c$，再進行配方。",
        explain: "代入 $(0, 3) \\implies c = 3$。代入另兩點得 $a + b + 3 = 0 \\implies a + b = -3$；$4a + 2b + 3 = -1 \\implies 2a + b = -2$。兩式相減得 $a = 1, b = -4$。方程式為 $y = x^2 - 4x + 3 = (x - 2)^2 - 1$。頂點坐標為 $(2, -1)$！"
      }
    ],

    angles: [
      { title: "衛星雷達天線與太陽能聚焦爐", body: "拋物線具有神奇的光學幾何性質：所有平行於對稱軸射入的射線，經過拋物線內壁反射後，全部百分之百聚焦到同一點（焦點 Focus）！衛星天線接收碟與奧運聖火採集鏡，就是利用旋轉拋物面將微弱訊號放大數萬倍。" },
      { title: "微積分頂點導數為零", body: "到了高中與大學微積分，求頂點不再需要繁瑣的配方法，只要對二次函數求導 $y' = 2ax + b = 0$，一秒得出極值點橫坐標 $x = -\\frac{b}{2a}$，與國中幾何頂點完美呼應！" }
    ],

    where: {
      past: "八年級解一元二次方程式的配方法。",
      current: "九年級將二次式賦予幾何圖像生命，畫出對稱優美的拋物線，掌握頂點式平移。",
      next: "下一節將探討二次函數最重要的生活應用——「頂點求最大值與最小值」！"
    }
  });
})();
