/* 單元：4-1 平行線 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "平行線截角相等與互補");
    // 兩平行線
    s("line", { x1: 40, y1: 70, x2: 360, y2: 70, stroke: C.orange.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 370, 75, "L1", { size: 14, color: C.orange.s, bold: true });
    s("line", { x1: 40, y1: 140, x2: 360, y2: 140, stroke: C.orange.s, "stroke-width": 2.5 }, svg);
    SK.label(svg, 370, 145, "L2", { size: 14, color: C.orange.s, bold: true });

    // 截線
    s("line", { x1: 100, y1: 30, x2: 240, y2: 180, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 250, 185, "M (截線)", { size: 12, color: C.blue.s });

    // 同位角與內錯角
    SK.label(svg, 155, 60, "角1", { size: 12, color: C.red.s, bold: true });
    SK.label(svg, 220, 130, "角2", { size: 12, color: C.red.s, bold: true });
    SK.label(svg, 175, 85, "角3", { size: 12, color: C.green.s, bold: true });

    SK.label(svg, 200, 195, "同位角相等、內錯角相等、同側內角互補", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "parallel-lines",
    en: "Parallel Lines and Transversals",
    formula: "L_1 \\parallel L_2 \\iff \\text{同位角相等}、\\text{內錯角相等}、\\text{同側內角互補}",

    hook: {
      html: "鐵軌上的兩根鋼軌在平面上無限延伸卻永遠永不相交。當一條截線橫切過兩條平行線時，瞬間在上下創造了八個角！歐幾里得幾何最輝煌的特徵，就是這八個角呈現出驚人完美的<b>同位角相等、內錯角相等與同側內角互補</b>！",
      ask: "閃電形或鋸齒形的轉折線（如 Z 字形或 M 字形折線），如何透過一條巧妙的「輔助平行線」一秒破解？",
      visual: hookVisual
    },

    guess: {
      q: "若兩直線被一截線所截，已知一組「同側內角」度數分別為 $75^\\circ$ 與 $105^\\circ$，則這兩條直線的關係為何？",
      options: [
        { t: "互相平行", truth: true, explain: "同側內角和為 $75^\\circ + 105^\\circ = 180^\\circ$（互補）！根據平行線判別性質，兩直線必定互相平行！" },
        { t: "互相垂直", explain: "互相垂直夾角應為 90°。" },
        { t: "相交於一點且不垂直", common: true, explain: "若同側內角不互補才會相交；剛好 180° 代表永遠平行。" },
        { t: "無法確定", explain: "條件完全充分，可以確定平行。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整截線角度，觀察同位角、內錯角與同側內角的即時聯動數值變化。",
      frames: [
        { cap: "平行線定義：在同一平面上，兩條無限延長且永不相交的直線稱為平行線，記作 $L_1 \\parallel L_2$。平行線間距離處處相等。", tex: "L_1 \\parallel L_2 \\iff \\text{兩直線永不相交}" },
        { cap: "三大截角性質（平行的結果）：若 $L_1 \\parallel L_2$，則：<br>1. <b>同位角相等</b>（F 形）<br>2. <b>內錯角相等</b>（Z 形）<br>3. <b>同側內角互補</b>（C 形，和為 180°）。", tex: "\\angle 1=\\angle 2,\\quad \\angle 2+\\angle 3=180^\\circ" },
        { cap: "三大判別性質（平行的依據）：反過來，只要任一組同位角相等、內錯角相等或同側內角互補成立，就能<b>斷定兩線平行</b>！", tex: "\\text{同位角相等} \\implies L_1 \\parallel L_2" },
        { cap: "轉角折線題破局秘笈：遇到凸出或凹陷的轉折頂點，<b>過轉折點作一條平行線</b>，將大角拆成兩半，瞬間化解！", tex: "\\text{過轉折頂點作輔助平行線}" }
      ],
      hint: "記憶英文字母形狀：同位角看 F，內錯角看 Z，同側內角看 U 或 C！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "平行線截角動態模擬");
        var slAng = SK.slider({ label: "截線傾斜角度", min: 40, max: 80, step: 5, value: 60, color: "orange", fmt: function(v){ return v + " 度"; }, onInput: draw });
        ctx.sliders.appendChild(slAng.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var ang = slAng.value;
          var supAng = 180 - ang;
          svg.innerHTML = "";
          // 兩平行線
          s("line", { x1: 40, y1: 80, x2: 400, y2: 80, stroke: C.orange.s, "stroke-width": 2.5 }, svg);
          s("line", { x1: 40, y1: 160, x2: 400, y2: 160, stroke: C.orange.s, "stroke-width": 2.5 }, svg);

          // 截線
          var rad = (ang * Math.PI) / 180;
          var dx = 80 / Math.tan(rad);
          s("line", { x1: 220 - dx - 30, y1: 40, x2: 220 + dx + 30, y2: 200, stroke: C.blue.s, "stroke-width": 2 }, svg);

          SK.label(svg, 220 - dx + 20, 70, ang + "°", { size: 12, color: C.red.s, bold: true });
          SK.label(svg, 220 + dx + 20, 150, ang + "°", { size: 12, color: C.red.s, bold: true });
          SK.label(svg, 220 + dx - 25, 150, supAng + "°", { size: 12, color: C.green.s, bold: true });

          read.innerHTML = SK.tex("\\text{同位角 } = " + ang + "^\\circ\\text{（相等），內錯角 } = " + ang + "^\\circ\\text{（相等），同側內角 } = " + ang + "^\\circ + " + supAng + "^\\circ = 180^\\circ\\text{（互補）}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "利用平行線截角求未知角度",
        code: "S-8-3",
        demo: {
          q: "如圖，$L_1 \\parallel L_2$。若直線折向形成 $\\angle ABC$ 的鋸齒尖角，已知 $\\angle 1 = 35^\\circ, \\angle 2 = 45^\\circ$，求折角 $\\angle ABC$ 的度數。",
          steps: [
            "作輔助線：過頂點 $B$ 作直線 $L_3 \\parallel L_1$。",
            "因為 $L_1 \\parallel L_3$，由內錯角相等，上半角為 $35^\\circ$。",
            "因為 $L_1 \\parallel L_2$ 且 $L_1 \\parallel L_3$，所以 $L_3 \\parallel L_2$。由內錯角相等，下半角為 $45^\\circ$。",
            "兩角相加：$\\angle ABC = 35^\\circ + 45^\\circ = 80^\\circ$。"
          ]
        },
        tries: [
          {
            q: "已知 $L_1 \\parallel L_2$，且一截線交兩線於兩點。若一組同側內角的度數比為 $2 : 3$，則其中較小的角是多少度？",
            options: ["72 度", "108 度", "36 度", "60 度"],
            ans: 0,
            explain: "同側內角互補（和為 180°）。設兩角為 $2k$ 與 $3k$：$2k + 3k = 180^\\circ \\implies 5k = 180^\\circ \\implies k = 36^\\circ$。較小角為 $2 \\times 36^\\circ = 72^\\circ$。"
          },
          {
            q: "一條長方形紙帶沿直線摺疊，若摺痕與邊緣夾角為 $65^\\circ$，則摺疊後重疊部分的角平分角度為多少？",
            options: ["50 度", "65 度", "130 度", "115 度"],
            ans: 0,
            explain: "紙帶兩邊緣互相平行。摺疊後內錯角相等，兩重疊角皆為 65°，平角 $180^\\circ - 2(65^\\circ) = 180^\\circ - 130^\\circ = 50^\\circ$。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "如圖，$L_1 \\parallel L_2$，若連續轉折兩次形成 W 形態，向左凹的角分別為 $30^\\circ$ 與 $40^\\circ$，向右凸出的一角為 $50^\\circ$，求另一個向右凸的角是多少度？",
        options: ["20 度", "60 度", "10 度", "30 度"],
        ans: 0,
        hint: "平行線鋸齒口訣：向左轉的角度總和，永遠等於向右轉的角度總和！",
        explain: "由多次輔助平行線可導出「左角和等於右角和」定理：$\\sum \\text{左} = \\sum \\text{右}$。即 $30^\\circ + 40^\\circ = 50^\\circ + x \\implies 70^\\circ = 50^\\circ + x \\implies x = 20^\\circ$！"
      }
    ],

    angles: [
      { title: "第五公設與非歐幾何的狂想曲", body: "歐幾里得第五公設（平行公理）長達兩千年無人能由前四條公理證明。十九世紀高斯、羅巴切夫斯基與黎曼大膽假設「平行線可以相交或有多條」，從而誕生了雙曲幾何與球面幾何（非歐幾何），這正是愛因斯坦廣義相對論描述彎曲宇宙的數學語言！" },
      { title: "潛望鏡與光學平行反射", body: "潛艇潛望鏡內部安裝兩塊互相平行的 45° 平面鏡。光線經過兩次直角反射後，出射光線與入射光線完美平行，讓海面下的觀察員能看清海面上的真實全景。" }
    ],

    where: {
      past: "對頂角相等與平角 180° 的基礎概念。",
      current: "八年級掌握平行線截角三大定理（同位角、內錯角、同側內角）與平行判別法。",
      next: "下一節將把平行線組裝成四條邊——「平行四邊形的性質與判別」！"
    }
  });
})();
