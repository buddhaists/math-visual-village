/* 單元：4-3 一元二次方程式的應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "花園十字步道平移平鋪");
    // 大矩形
    s("rect", { x: 50, y: 30, width: 140, height: 100, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
    // 十字步道
    s("rect", { x: 100, y: 30, width: 25, height: 100, fill: "#fff", stroke: C.cocoa }, svg);
    s("rect", { x: 50, y: 70, width: 140, height: 25, fill: "#fff", stroke: C.cocoa }, svg);
    SK.label(svg, 120, 160, "十字步道切割", { size: 12, color: C.soft });

    SK.label(svg, 215, 80, "=>", { size: 24, color: C.orange.s, bold: true });

    // 平移合併草地
    s("rect", { x: 250, y: 30, width: 110, height: 75, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
    SK.label(svg, 305, 75, "(長-x)(寬-x)", { size: 13, color: C.ink, bold: true });
    SK.label(svg, 305, 160, "平移靠邊：一秒列式！", { size: 13, color: C.orange.s, bold: true });
  }

  SK.mountUnit({
    slug: "quad-eq-app",
    en: "Applications of Quadratic Equations",
    formula: "\\text{設未知數 }x \\to \\text{依題意列二次方程} \\to \\text{求解並檢驗合理性}",

    hook: {
      html: "一塊長 20 公尺、寬 15 公尺的長方形農地，若要在正中央開闢等寬的十字交叉道路，剩下的四塊草地總面積要剛好等於 204 平方公尺，路寬應該是多少？運用<b>圖形平移巧思</b>，四塊草地推到角落合體，二次方程立即可解！",
      ask: "解出二次方程式的兩個解後，為什麼最後一定要嚴格檢驗「解的合理性」？哪種解必須斷然捨去？",
      visual: hookVisual
    },

    guess: {
      q: "兩個連續正奇數的平方和為 130，若設較小的正奇數為 $x$，則下列方程式何者正確？",
      options: [
        { t: "x^2 + (x + 2)^2 = 130", truth: true, explain: "連續奇數相鄰差 2，若小者為 $x$，則大者為 $(x + 2)$，平方和為 $x^2 + (x + 2)^2 = 130$！" },
        { t: "x^2 + (x + 1)^2 = 130", common: true, explain: "這是連續整數的設法；連續奇數或連續偶數差都是 2。" },
        { t: "x + (x + 2) = 130", explain: "這是兩數和，題目要求的是「平方和」。" },
        { t: "(x + x + 2)^2 = 130", explain: "這是和的平方，不是平方和。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整路寬 $x$，觀察平移後草地面積變化與二次方程式的列式過程。",
      frames: [
        { cap: "應用題四大步驟：(1) 設未知數（標註單位）；(2) 尋找等量關係列二次方程；(3) 解方程；(4) <b>檢驗解的合理性</b>。", tex: "\\text{審題} \\to \\text{列式} \\to \\text{求解} \\to \\text{檢驗}" },
        { cap: "草地步道平移技巧：長寬各被道路佔去寬度 $x$，將剩餘草地平移拼在一起，長變 $(L - x)$、寬變 $(W - x)$！", tex: "(L - x)(W - x) = \\text{草地總面積}" },
        { cap: "商品定價與利潤：每降價 $d$ 元多賣 $n$ 件。總利潤＝單件利潤 $\\times$ 銷售數量。", tex: "(\\text{單件售價} - \\text{成本}) \\times \\text{件數} = \\text{總利潤}" },
        { cap: "不合解的捨去條件：幾何長度不能為負、人數量必須為正整數、路寬不能大於土地原本長寬等。", tex: "x > 0,\\quad x < W" }
      ],
      hint: "幾何題最重要避坑指南：長度必為正，且路寬不能超過農地本身寬度！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "二次方程應用平移模擬");
        var slX = SK.slider({ label: "十字步道路寬 x (米)", min: 1, max: 4, step: 0.5, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 1) + " m"; }, onInput: draw });
        ctx.sliders.appendChild(slX.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var x = slX.value;
          var L = 20, W = 15;
          var remainArea = (L - x) * (W - x);
          svg.innerHTML = "";
          // 畫平移合併長方形
          s("rect", { x: 80, y: 40, width: (L - x) * 10, height: (W - x) * 10, fill: C.green.f, stroke: C.green.s, "stroke-width": 2 }, svg);
          SK.label(svg, 80 + (L - x) * 5, 40 + (W - x) * 5, "剩餘面積 = " + remainArea.toFixed(1) + " m^2", { size: 14, color: C.ink, bold: true });
          SK.label(svg, 80 + (L - x) * 5, 25, "長 = 20 - " + x + " = " + (L - x), { size: 12, color: C.blue.s, bold: true });
          SK.label(svg, 40, 40 + (W - x) * 5, "寬 = 15 - " + x + " = " + (W - x), { size: 12, color: C.orange.s, bold: true });

          read.innerHTML = SK.tex("(20 - " + x + ")(15 - " + x + ") = " + remainArea.toFixed(1) + "\\implies x^2 - 35x + " + (300 - remainArea).toFixed(0) + " = 0", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "幾何面積與生活定價應用題",
        code: "A-8-7",
        demo: {
          q: "一個直角三角形的三邊長為連續三個偶數，求此直角三角形的面積。",
          steps: [
            "設中間偶數為 $x$，三邊長為 $(x - 2), x, (x + 2)$。斜邊為最長邊 $(x + 2)$。",
            "依畢氏定理：$(x - 2)^2 + x^2 = (x + 2)^2$。",
            "展開：$x^2 - 4x + 4 + x^2 = x^2 + 4x + 4 \\implies x^2 - 8x = 0 \\implies x(x - 8) = 0$。",
            "因為邊長必須為正數，$x = 0$ 不合，取 $x = 8$。",
            "三邊長為 $6, 8, 10$。面積 $= \\frac{1}{2} \\times 6 \\times 8 = 24$ 平方單位。"
          ]
        },
        tries: [
          {
            q: "某商店進貨手套每雙成本 40 元，定價 60 元時每天可賣 100 雙。若每雙降價 1 元，每天可多賣 10 雙。若想獲得每天 2250 元的利潤，每雙應降價多少元？",
            options: ["5 元", "15 元", "10 元", "2 元"],
            ans: 0,
            explain: "設每雙降價 $x$ 元。每雙利潤為 $(60 - x) - 40 = (20 - x)$；每日銷售量為 $(100 + 10x)$。$(20 - x)(100 + 10x) = 2250 \\implies 10(20 - x)(10 + x) = 2250 \\implies 200 + 10x - x^2 = 225 \\implies x^2 - 10x + 25 = 0 \\implies (x - 5)^2 = 0 \\implies x = 5$ 元。"
          },
          {
            q: "將一張長 12 公分、寬 8 公分的長方形紙張，四個角各剪去一個大小相同的正方形，摺成一個無蓋紙盒。若底面積為 32 平方公分，剪去的正方形邊長為多少公分？",
            options: ["2 公分", "4 公分", "1 公分", "3 公分"],
            ans: 0,
            explain: "設剪去正方形邊長為 $x$ 公分。底面長為 $(12 - 2x)$、寬為 $(8 - 2x)$。$(12 - 2x)(8 - 2x) = 32 \\implies 4(6 - x)(4 - x) = 32 \\implies (6 - x)(4 - x) = 8 \\implies x^2 - 10x + 24 = 8 \\implies x^2 - 10x + 16 = 0 \\implies (x - 2)(x - 8) = 0$。因為紙張寬度只有 8 公分，$2x < 8 \\implies x < 4$。故 $x = 8$ 不合，剪去邊長為 2 公分！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "有一群好友聚餐，餐費共 2400 元平均分攤。結帳時有 4 人沒帶錢，其餘每人必須多付 100 元。請問最初參加聚餐的共有多少人？",
        options: ["12 人", "10 人", "16 人", "8 人"],
        ans: 0,
        hint: "設最初參加共有 $x$ 人，原本每人付 $\\frac{2400}{x}$，實際每人付 $\\frac{2400}{x - 4}$。",
        explain: "設最初 $x$ 人。依題意：$\\frac{2400}{x - 4} - \\frac{2400}{x} = 100$。同除以 100：$\\frac{24}{x - 4} - \\frac{24}{x} = 1$。同乘 $x(x - 4)$：$24x - 24(x - 4) = x(x - 4) \\implies 96 = x^2 - 4x \\implies x^2 - 4x - 96 = 0 \\implies (x - 12)(x + 8) = 0$。人數必為正數，負數不合，故最初共有 12 人。"
      }
    ],

    angles: [
      { title: "拋體運動與火箭彈道計算", body: "物理學中物體垂直上拋的飛行高度公式為 $h = v_0 t - \\frac{1}{2}g t^2$，這是一個關於時間 $t$ 的一元二次方程式。想要計算砲彈何時落地（$h=0$）或何時達到目標高度，全靠二次方程的精確解！" },
      { title: "利潤最大化的極值前哨站", body: "定價問題中解利潤方程式時，我們會發現降價太少賣得少、降價太多利潤薄。九年級將用二次函數頂點坐標，直接算出能帶來「全場最高利潤」的黃金定價！" }
    ],

    where: {
      past: "八年級學會因式分解法、配方法與萬能公式解。",
      current: "將代數求解工具全面投射回生活幾何、物理與商業定價等真實情境。",
      next: "九年級下學期將把定價與面積問題升級為二次函數極值，尋求最佳化完美解答！"
    }
  });
})();
