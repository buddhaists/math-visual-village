/* 單元：3-1 推理與證明 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "邏輯鏈條：已知邁向結論");
    s("rect", { x: 30, y: 70, width: 90, height: 50, rx: 8, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    SK.label(svg, 75, 100, "已知條件", { size: 14, color: C.orange.s, bold: true });

    s("line", { x1: 125, y1: 95, x2: 175, y2: 95, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("polygon", { points: "175,95 165,90 165,100", fill: C.cocoa }, svg);

    s("rect", { x: 180, y: 70, width: 100, height: 50, rx: 8, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    SK.label(svg, 230, 92, "公理與定義", { size: 12, color: C.ink, bold: true });
    SK.label(svg, 230, 110, "幾何定理", { size: 12, color: C.soft });

    s("line", { x1: 285, y1: 95, x2: 335, y2: 95, stroke: C.cocoa, "stroke-width": 2 }, svg);
    s("polygon", { points: "335,95 325,90 325,100", fill: C.cocoa }, svg);

    s("rect", { x: 340, y: 70, width: 50, height: 50, rx: 8, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, svg);
    SK.label(svg, 365, 100, "求證", { size: 14, color: C.blue.s, bold: true });
  }

  SK.mountUnit({
    slug: "proof-reasoning",
    en: "Reasoning and Geometric Proofs",
    formula: "\\text{已知} \\xrightarrow{\\text{定義、公理、已證定理}} \\text{求證結論}",

    hook: {
      html: "數學是唯一允許人類觸碰「百分之百絕對真理」的殿堂。物理學靠實驗觀察，而數學證明則是無懈可擊的邏輯推理鏈：從「已知條件」出發，每一步都緊扣已被證實的公理與定理，<b>環環相扣，不容任何反駁與懷疑</b>！",
      ask: "要證明一個命題是錯的，最有力、最致命的武器是什麼？（只需舉出一個什麼？）",
      visual: hookVisual
    },

    guess: {
      q: "要推翻「所有質數都是奇數」這個假命題，最佳的反駁方式是？",
      options: [
        { t: "舉出反例：數字 2 是質數但它是偶數", truth: true, explain: "推翻全稱命題「只需要舉出一個反例（Counterexample）」！因為 2 既是質數也是偶數，單憑這一個例子，原命題立刻徹底崩塌！" },
        { t: "證明奇數比質數多", explain: "這無法推翻原命題的主張。" },
        { t: "計算 1 到 100 有幾個質數", explain: "統計數量無助於邏輯真假裁決。" },
        { t: "寫一篇論文否定它", explain: "數學只看客觀邏輯與反例。" }
      ]
    },

    derive: {
      intro: "透過邏輯推導步驟，動態體會代數奇偶性論證與幾何三段論證的嚴密力量。",
      frames: [
        { cap: "命題的結構：包含「題設（已知條件）」與「結論（求證目標）」。常以「若 $P$，則 $Q$」的形式陳述。", tex: "P \\implies Q" },
        { cap: "反例的威力：要證明一個普遍陳述是偽命題，<b>只要舉出一個不符合的「反例」</b>即可一錘定音！", tex: "\\text{舉出反例：符合條件但結論不成立}" },
        { cap: "幾何三段論證：大前提（已證定理）$\\to$ 小前提（當前圖形滿足條件）$\\to$ 結論。步步都要寫出根據！", tex: "\\text{定理依據} \\to \\text{代入條件} \\to \\text{推得結論}" },
        { cap: "代數奇偶性證明法：偶數必設為 $2k$，奇數必設為 $2k+1$（$k\\text{ 為整數}$）。展開後提公因式 2 檢驗！", tex: "\\text{奇數}^2 = (2k+1)^2 = 4k^2+4k+1 = 2(2k^2+2k)+1" }
      ],
      hint: "證明代數題核心模板：奇數設 $2k+1$、偶數設 $2k$、連續整數設 $k, k+1$！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "奇偶數代數證明幾何圖");
        var slK = SK.slider({ label: "整數 k (奇數 2k+1)", min: 1, max: 4, step: 1, value: 2, color: "orange", fmt: function(v){ return SK.fmt(v, 0); }, onInput: draw });
        ctx.sliders.appendChild(slK.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var k = slK.value;
          var odd = 2 * k + 1;
          var oddSq = odd * odd;
          svg.innerHTML = "";
          SK.label(svg, 220, 50, "【證明：奇數的平方永遠是奇數】", { size: 15, color: C.ink, bold: true });
          SK.label(svg, 220, 85, "設奇數 n = 2k + 1  (k 為整數)", { size: 14, color: C.orange.s, bold: true });
          SK.label(svg, 220, 125, "n^2 = (2k + 1)^2 = 4k^2 + 4k + 1", { size: 14, color: C.blue.s, bold: true });
          SK.label(svg, 220, 165, "= 2(2k^2 + 2k) + 1 = 2m + 1  (m 為整數)", { size: 14, color: C.green.s, bold: true });

          read.innerHTML = SK.tex("\\text{當 } k=" + k + " \\implies n=" + odd + "，n^2=" + oddSq + " = 2(" + (2*k*k+2*k) + ") + 1，\\text{必為奇數！證畢 (Q.E.D.)}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "代數奇偶倍數證明與反例判斷",
        code: "S-9-11",
        demo: {
          q: "證明：兩個連續奇數的平方差，必定是 8 的倍數。",
          steps: [
            "設未知數：設較小奇數為 $(2k - 1)$，較大奇數為 $(2k + 1)$，其中 $k$ 為整數。",
            "寫出平方差：$(2k + 1)^2 - (2k - 1)^2$。",
            "展開化簡（利用平方差或乘法公式）：$(4k^2 + 4k + 1) - (4k^2 - 4k + 1) = 8k$。",
            "結論：因為 $k$ 為整數，所以 $8k$ 必定是 8 的倍數。得證！"
          ]
        },
        tries: [
          {
            q: "下列哪一個選項可以作為反駁「若 a > b，則 a^2 > b^2」的反例？",
            options: ["a = 1, b = -3", "a = 3, b = 2", "a = 5, b = 1", "a = 0, b = -1"],
            ans: 0,
            explain: "檢驗選項：$a = 1 > b = -3$ 符合題設；但平方後 $a^2 = 1$，而 $b^2 = (-3)^2 = 9$，$1 < 9$，結論不成立！這就是致命的反例！"
          },
          {
            q: "證明「三個連續整數的和必為 3 的倍數」，設中間數為 $n$，則三數之和為？",
            options: ["3n (必為 3 的倍數)", "3n + 1", "3n + 3", "n^3"],
            ans: 0,
            explain: "設三連續整數為 $(n - 1), n, (n + 1)$。總和為 $(n - 1) + n + (n + 1) = 3n$。因為 $n$ 為整數，$3n$ 必定是 3 的倍數！"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "若一個正整數 $n$ 既是完全平方數，也是完全立方數（即 $n = a^2 = b^3$），則此數 $n$ 必定是下列哪一種次方？",
        options: ["某個正整數的 6 次方", "某個正整數的 5 次方", "某個正整數的 12 次方", "無法確定"],
        ans: 0,
        hint: "由指數律，質因數的次方必須同時是 2 的倍數與 3 的倍數！",
        explain: "因為次數必須同時被 2 整除且被 3 整除，$\\text{lcm}(2, 3) = 6$。因此該正整數的質因數次方必為 6 的倍數，即 $n = k^6$（某正整數的 6 次方）！"
      }
    ],

    angles: [
      { title: "數學證明結尾的 Q.E.D.", body: "傳統數學論文在證明最後常會寫下拉丁文縮寫「Q.E.D.」（quod erat demonstrandum），意思是「這正是我們所要證明的」。當推理閉環完成時，代表此定理已在宇宙真理庫中永久刻下名字！" },
      { title: "電腦自動定理證明與軟體驗證", body: "現代航太飛行控制軟體與加密演算法核心，不容許任何軟體 Bug。工程師使用 Coq、Lean 等形式化邏輯系統進行「機器證明」，將程式碼轉為數學命題逐行自動證明其安全性！" }
    ],

    where: {
      past: "國中一到八年級所有代數公式與幾何性質的直觀運用。",
      current: "九年級將直觀歸納升級為嚴格演繹推理，建立反例思維與代數奇偶倍數證明架構。",
      next: "下一節將迎來國中幾何的巔峰結晶——「三角形的外心、內心與重心（三大心）」！"
    }
  });
})();
