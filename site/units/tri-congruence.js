/* 單元：3-3 三角形全等 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "全等三角形翻轉完全疊合");
    s("polygon", { points: "50,140 150,140 120,60", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 100, 115, "\\triangle ABC", { size: 14, color: C.orange.s, bold: true });

    s("line", { x1: 170, y1: 100, x2: 210, y2: 100, stroke: C.cocoa, "stroke-width": 2 }, svg);
    SK.label(svg, 190, 85, "\\cong", { size: 18, color: C.ink, bold: true });

    s("polygon", { points: "230,140 330,140 300,60", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 280, 115, "\\triangle DEF", { size: 14, color: C.blue.s, bold: true });

    SK.label(svg, 200, 180, "形狀、大小完全相同，三對應邊與對應角全相等", { size: 12, color: C.ink });
  }

  SK.mountUnit({
    slug: "tri-congruence",
    en: "Triangle Congruence",
    formula: "\\triangle ABC \\cong \\triangle DEF\\ (\\text{SSS, SAS, ASA, AAS, RHS})",

    hook: {
      html: "兩個圖形如果經過平移、旋轉或翻轉後，能夠<b>毫無縫隙地完全重合</b>，就稱它們「全等」。三角形有 3 條邊與 3 個角共 6 個要素，令人驚奇的是：我們根本不需要量完 6 個要素，只要滿足特定的 3 個條件，就能將三角形的形狀死死鎖定！",
      ask: "為什麼「SSA」與「AAA」絕對不能保證兩個三角形全等？背後的幾何破綻在哪裡？",
      visual: hookVisual
    },

    guess: {
      q: "下列哪一組條件「無法」保證兩個三角形一定全等？",
      options: [
        { t: "兩邊及其中一邊的對角相等 (SSA)", truth: true, explain: "經典幾何陷阱！SSA 可能畫出「一鈍一銳」兩種形狀完全不同的三角形，無法唯一確定，因此不是全等判別法！" },
        { t: "三邊對應相等 (SSS)", explain: "SSS 透過三邊長度剛好鎖死三角形，是標準全等判別。" },
        { t: "兩邊及其夾角對應相等 (SAS)", explain: "夾角固定了兩邊的張開角度，第三邊被唯一確定，標準全等。" },
        { t: "兩角及其中一角的對邊相等 (AAS)", explain: "兩角決定第三角（三角形內角和 180°），實質等同於 ASA，能保證全等。" }
      ]
    },

    derive: {
      intro: "透過滑桿切換五種全等判別條件，直觀理解邊角如何約束三角形的唯一形態。",
      frames: [
        { cap: "SSS 全等：三組對應邊分別相等。木工做三角形支架不會變形，就是因為 SSS 的剛性固定。", tex: "\\overline{AB}=\\overline{DE},\\ \\overline{BC}=\\overline{EF},\\ \\overline{CA}=\\overline{FD}" },
        { cap: "SAS 全等：兩組對應邊及其<b>夾角</b>對應相等。注意角必須是兩邊的中間夾角！", tex: "\\text{兩邊夾一角}" },
        { cap: "ASA 與 AAS 全等：兩角夾一邊（ASA），或兩角及其中一角對邊（AAS）。由內角和 180° 知兩者等價。", tex: "\\text{兩角一邊必定全等}" },
        { cap: "RHS 直角專用：直角（R）、斜邊（H）與一股（S）對應相等。由畢氏定理可知第三邊必相等，故全等！", tex: "\\text{R: }90^\\circ,\\ \\text{H: 斜邊},\\ \\text{S: 一股}" }
      ],
      hint: "全等符號書寫鐵律：頂點字母必須「一一對應」！若 $A$ 對應 $D$、$B$ 對應 $E$，必須寫 $\\triangle ABC \\cong \\triangle DEF$！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "三角形全等動態判定");
        var slType = SK.slider({ label: "判別性質 (0:SSS, 1:SAS, 2:ASA, 3:RHS)", min: 0, max: 3, step: 1, value: 1, color: "orange", fmt: function(v){ return ["SSS", "SAS", "ASA", "RHS"][v]; }, onInput: draw });
        ctx.sliders.appendChild(slType.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var type = slType.value;
          var names = ["SSS（三邊）", "SAS（兩邊夾一角）", "ASA（兩角夾一邊）", "RHS（直角斜邊股）"];
          svg.innerHTML = "";
          // 畫左三角形
          s("polygon", { points: "60,150 160,150 120,60", fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
          SK.label(svg, 110, 115, "\\triangle ABC", { size: 14, color: C.orange.s, bold: true });

          // 畫右三角形
          s("polygon", { points: "240,150 340,150 300,60", fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
          SK.label(svg, 290, 115, "\\triangle DEF", { size: 14, color: C.blue.s, bold: true });

          read.innerHTML = SK.tex("\\text{當前判別法則：【" + names[type] + "】} \\implies \\triangle ABC \\cong \\triangle DEF\\text{，三對應邊與三對應角完全重合！}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "判斷三角形全等條件",
        code: "S-8-5",
        demo: {
          q: "如圖，已知 $\\overline{AB} = \\overline{AC}$，且 $D$ 為 $\\overline{BC}$ 的中點。證明 $\\triangle ABD \\cong \\triangle ACD$。",
          steps: [
            "找已知條件 1：$\\overline{AB} = \\overline{AC}$（已知題目給定）。",
            "找已知條件 2：$D$ 為中點 $\\implies \\overline{BD} = \\overline{CD}$。",
            "找隱含條件 3：$\\overline{AD} = \\overline{AD}$（公共邊）。",
            "綜合三條件：三邊對應相等，因此根據 SSS 全等性質，$\\triangle ABD \\cong \\triangle ACD$。"
          ]
        },
        tries: [
          {
            q: "在 $\\triangle ABC$ 與 $\\triangle DEF$ 中，$\\overline{AB} = \\overline{DE}$，$\\angle B = \\angle E$。若想利用「SAS」判別兩三角形全等，還需要補充下列哪一個條件？",
            options: ["BC = EF", "AC = DF", "角A = 角D", "角C = 角F"],
            ans: 0,
            explain: "已知一邊 $\\overline{AB}$ 與一角 $\\angle B$，要用 SAS 必須取 $\\angle B$ 的另一夾邊，即 $\\overline{BC} = \\overline{EF}$！"
          },
          {
            q: "兩個直角三角形中，斜邊等長，且各自有一條股長相等，則這兩個直角三角形全等的依據是？",
            options: ["RHS 全等", "SAS 全等", "ASA 全等", "SSS 全等"],
            ans: 0,
            explain: "直角（R）、斜邊（H）與一股（S）對應相等，是直角三角形特有的 RHS 全等性質。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "已知 $\\triangle ABC$ 與 $\\triangle DEF$ 中，$\\overline{AB} = \\overline{DE} = 5$，$\\overline{AC} = \\overline{DF} = 8$，$\\angle B = \\angle E = 60^\\circ$。若 $\\triangle ABC$ 為銳角三角形，而 $\\triangle DEF$ 為鈍角三角形，請問這體現了下列哪一種判別「不成立」？",
        options: ["SSA 無法保證全等", "AAA 無法保證全等", "SAS 正確全等", "SSS 正確全等"],
        ans: 0,
        hint: "所給角 $\\angle B$ 並非兩邊的夾角，而是其中一邊的對角。",
        explain: "給定兩邊及其中一邊的對角（SSA），以點 $A$ 為圓心半徑 8 畫弧，與底邊有兩個交點，分別形成一銳角一鈍角三角形，形狀不同不全等！這證明了 SSA 絕非全等性質。"
      }
    ],

    angles: [
      { title: "三角形的幾何剛性（Rigidity）", body: "四邊形輕輕一推就會歪斜變形成平行四邊形，而三角形只要三邊長度確定（SSS），角度就徹底鎖死，絲毫無法變動！這就是為什麼所有鐵橋、起重機吊臂、艾菲爾鐵塔，全都是由無數個三角形鋼架拼成的。" },
      { title: "全等變換與電腦動畫剛體運動", body: "在 3D 遊戲引擎中，物體的移動與旋轉稱為「剛體變換（Rigid Motion）」。物體在運動時網格頂點之間的距離和夾角保持不變，其前後狀態構成全等圖形！" }
    ],

    where: {
      past: "尺規作圖複製線段與角。",
      current: "八年級掌握五大三角形全等判定法則：SSS、SAS、ASA、AAS、RHS。",
      next: "下一節將把全等作為核心推理武器，證明等腰三角形底角相等與中垂線、角平分線性質！"
    }
  });
})();
