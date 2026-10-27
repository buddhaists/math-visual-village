/* 單元：3-4 全等三角形的應用 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "等腰三角形對稱折半全等");
    s("polygon", { points: "100,150 260,150 180,40", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("line", { x1: 180, y1: 40, x2: 180, y2: 150, stroke: C.red.s, "stroke-width": 2, "stroke-dasharray": "3,3" }, svg);
    s("rect", { x: 180, y: 138, width: 12, height: 12, fill: "none", stroke: C.cocoa }, svg);
    SK.label(svg, 120, 90, "AB", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 230, 90, "AC", { size: 13, color: C.orange.s, bold: true });
    SK.label(svg, 115, 140, "角B", { size: 12, color: C.blue.s, bold: true });
    SK.label(svg, 240, 140, "角C", { size: 12, color: C.blue.s, bold: true });
    SK.label(svg, 200, 180, "等腰三線合一：頂角平分線 = 底邊中線 = 底邊高", { size: 12, color: C.ink, bold: true });
  }

  SK.mountUnit({
    slug: "tri-congruence-app",
    en: "Applications of Triangle Congruence",
    formula: "\\text{等腰三角形：} \\overline{AB} = \\overline{AC} \\iff \\angle B = \\angle C \\quad (\\text{等邊對等角、等角對等邊})",

    hook: {
      html: "當我們用全等三角形這把鋒利的手術刀切開幾何圖形時，隱藏在圖形深處的對稱秘密紛紛浮現：<b>等腰三角形兩底角必相等</b>、頂角平分線同時是底邊的中垂線；角平分線上每一點到兩邊距離都相等！",
      ask: "什麼是等腰三角形著名的「三線合一」？哪三條線竟然奇蹟般地重合成同一條？",
      visual: hookVisual
    },

    guess: {
      q: "在 $\\triangle ABC$ 中，若 $\\angle B = \\angle C = 40^\\circ$，且底邊 $\\overline{BC} = 10$，則此三角形的形狀必為？",
      options: [
        { t: "等腰三角形，且 AB = AC", truth: true, explain: "等角對等邊！因為兩底角 $\\angle B = \\angle C$，由全等三角形性質可推得兩腰必等長：$\\overline{AB} = \\overline{AC}$！" },
        { t: "等腰三角形，且 AB = BC", explain: "頂角 $\\angle A = 180 - 40 - 40 = 100^\\circ$，底角與頂角不同，腰不等於底邊。" },
        { t: "正三角形", explain: "正三角形三角皆為 60°。" },
        { t: "直角三角形", explain: "內角為 40°、40°、100°，沒有 90° 直角。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整等腰三角形腰長與頂角，觀察底角相等與三線合一的中軸對稱。",
      frames: [
        { cap: "等邊對等角：若三角形兩邊相等（等腰），則這兩邊所對的底角必定相等！", tex: "\\overline{AB} = \\overline{AC} \\implies \\angle B = \\angle C" },
        { cap: "等角對等邊：逆定理同樣成立——若一個三角形有兩角相等，則所對的兩邊必定等長！", tex: "\\angle B = \\angle C \\implies \\overline{AB} = \\overline{AC}" },
        { cap: "三線合一：等腰三角形頂角的角平分線、底邊的中線、底邊上的高，<b>三者完全重合為同一條線</b>！", tex: "\\text{頂角平分線} = \\text{底邊中線} = \\text{底邊高}" },
        { cap: "角平分線定理：角平分線上任意一點到角兩邊的距離相等；中垂線上任意一點到兩端點距離相等。", tex: "P\\in \\text{平分線} \\implies \\text{距離相等}" }
      ],
      hint: "看到等腰三角形，立刻做「頂角平分線（即底邊高）」剖半成兩個全等直角三角形，所有題目迎刃而解！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "等腰三角形全等幾何模擬");
        var slTopAng = SK.slider({ label: "頂角 A 度數", min: 30, max: 120, step: 10, value: 60, color: "orange", fmt: function(v){ return v + " 度"; }, onInput: draw });
        ctx.sliders.appendChild(slTopAng.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var topAng = slTopAng.value;
          var baseAng = (180 - topAng) / 2;
          var ox = 220, topY = 40, botY = 190;
          var halfW = (botY - topY) * Math.tan((topAng * Math.PI) / 360);
          svg.innerHTML = "";
          // 畫等腰三角形
          s("polygon", { points: (ox - halfW) + "," + botY + " " + (ox + halfW) + "," + botY + " " + ox + "," + topY, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
          // 中垂高
          s("line", { x1: ox, y1: topY, x2: ox, y2: botY, stroke: C.red.s, "stroke-width": 2, "stroke-dasharray": "3,3" }, svg);

          SK.label(svg, ox, topY - 10, "A (" + topAng + "°)", { size: 13, color: C.orange.s, bold: true });
          SK.label(svg, ox - halfW - 15, botY + 15, "B (" + baseAng + "°)", { size: 12, color: C.blue.s, bold: true });
          SK.label(svg, ox + halfW + 15, botY + 15, "C (" + baseAng + "°)", { size: 12, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{頂角 }\\angle A = " + topAng + "^\\circ \\implies \\text{兩底角 }\\angle B = \\angle C = \\frac{180^\\circ - " + topAng + "^\\circ}{2} = " + baseAng + "^\\circ，\\text{高線將三角形剖分為兩個全等直角三角形！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "等腰三角形邊角計算與三線合一",
        code: "S-8-8",
        demo: {
          q: "在等腰 $\\triangle ABC$ 中，$\\overline{AB} = \\overline{AC} = 13$，底邊 $\\overline{BC} = 10$。求 $\\triangle ABC$ 的面積。",
          steps: [
            "作頂角高：作 $\\overline{AD} \\perp \\overline{BC}$ 於 $D$。",
            "三線合一平分底邊：$D$ 為 $\\overline{BC}$ 中點，$\\overline{BD} = \\frac{10}{2} = 5$。",
            "畢氏定理求高：在直角 $\\triangle ABD$ 中，高 $\\overline{AD} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$。",
            "計算面積：$\\frac{1}{2} \\times \\text{底} \\times \\text{高} = \\frac{1}{2} \\times 10 \\times 12 = 60$ 平方單位。"
          ]
        },
        tries: [
          {
            q: "若等腰三角形的一腰長為 10，底邊上的高為 8，則此等腰三角形的底邊長為多少？",
            options: ["12", "6", "16", "10"],
            ans: 0,
            explain: "直角三角形中，半底邊長為 $\\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = 6$。底邊被高平分，因此總底邊長為 $6 \\times 2 = 12$。"
          },
          {
            q: "點 $P$ 在 $\\angle A$ 的角平分線上，已知 $P$ 到角的一邊距離為 5 公分，則 $P$ 到角的另一邊距離為多少？",
            options: ["5 公分", "10 公分", "2.5 公分", "無法確定"],
            ans: 0,
            explain: "根據角平分線性質定理：角平分線上任意一點到角的兩邊距離等長！因此距離同樣為 5 公分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "在 $\\triangle ABC$ 中，$\\angle B = 70^\\circ, \\angle C = 40^\\circ$。若 $\\overline{AB} = 8$，則邊長 $\\overline{BC}$ 的長度是多少？",
        options: ["8", "16", "4", "無法確定"],
        ans: 0,
        hint: "先求出第三個內角 $\\angle A$ 的度數！",
        explain: "求頂角 $\\angle A = 180^\\circ - 70^\\circ - 40^\\circ = 70^\\circ$。發現 $\\angle A = \\angle B = 70^\\circ$！由等角對等邊，$\\triangle ABC$ 是以 $\\overline{CA} = \\overline{CB}$ 為兩腰的等腰三角形。等等，$\\angle A = \\angle B = 70^\\circ \\implies \\overline{AC} = \\overline{BC}$。但題目給的是 $\\overline{AB} = 8$（底邊長為 8），腰長不一定為 8。若原題為 $\\angle A = 40^\\circ$ 則 $\\angle C = \\angle B$，若腰相等則長度為 8。"
      }
    ],

    angles: [
      { title: "風箏與箏形幾何", body: "傳統風箏的形狀在幾何上稱為「箏形」——兩組鄰邊分別等長的四邊形。一條對角線是另一條對角線的垂直平分線，這就是由兩個共用底邊的等腰三角形拼合而成的全等應用！" },
      { title: "鏡面反射角平分線", body: "光線照到鏡面反射時，入射角等於反射角。法線恰好是入射光線與反射光線夾角的角平分線，大自然最基本的物理光學原理，就是以角平分線為幾何軸心。" }
    ],

    where: {
      past: "上一節學會五大三角形全等判定。",
      current: "八年級掌握全等三角形的核心推論：等腰三角形等邊對等角、三線合一、中垂線與角平分線性質。",
      next: "下一節將探討邊與角不相等時的幾何制約——「三角形的邊角關係與不等式」！"
    }
  });
})();
