/* 單元：5-1 統計圖表與統計量 */
(function () {
  var C = SK.C, s = SK.s;

  function hookVisual(el) {
    var svg = SK.svg(el, 400, 200, "三種集中趨勢指標比較");
    s("rect", { x: 30, y: 40, width: 100, height: 110, rx: 8, fill: C.orange.f, stroke: C.orange.s }, svg);
    SK.label(svg, 80, 70, "平均數", { size: 15, color: C.orange.s, bold: true });
    SK.label(svg, 80, 100, "總和 / 個數", { size: 12, color: C.ink });
    SK.label(svg, 80, 130, "易受極端值影響", { size: 11, color: C.red.s });

    s("rect", { x: 150, y: 40, width: 100, height: 110, rx: 8, fill: C.blue.f, stroke: C.blue.s }, svg);
    SK.label(svg, 200, 70, "中位數", { size: 15, color: C.blue.s, bold: true });
    SK.label(svg, 200, 100, "排中間的數", { size: 12, color: C.ink });
    SK.label(svg, 200, 130, "抗極端值干擾", { size: 11, color: C.green.s });

    s("rect", { x: 270, y: 40, width: 100, height: 110, rx: 8, fill: C.green.f, stroke: C.green.s }, svg);
    SK.label(svg, 320, 70, "眾數", { size: 15, color: C.green.s, bold: true });
    SK.label(svg, 320, 100, "出現次數最多", { size: 12, color: C.ink });
    SK.label(svg, 320, 130, "可代表大眾喜好", { size: 11, color: C.soft });
  }

  SK.mountUnit({
    slug: "stat-charts-center",
    en: "Statistical Charts and Measures of Central Tendency",
    formula: "\\bar{x}=\\frac{\\sum x_i}{n},\\quad \\text{中位數 } Me,\\quad \\text{眾數 } Mo",

    hook: {
      html: "某家小公司有 5 位員工，月薪分別為 3 萬、3 萬、3.5 萬、4 萬，而老闆月薪是 50 萬。老闆對外宣傳「我們公司平均薪資超過 12 萬」，你覺得這樣能代表基層員工的真實收入嗎？統計學告訴我們：<b>極端值會嚴重拉偏平均數</b>！",
      ask: "面對有極端富豪或極端偏離的數據，哪一個統計量更能客觀呈現「中間水準」？",
      visual: hookVisual
    },

    guess: {
      q: "一組已由小到大排序的數據：$2, 3, 5, x, 8, 9$ 共有 6 個數。若中位數是 6，則 $x$ 的值是多少？",
      options: [
        { t: "7", truth: true, explain: "偶數個資料的中位數是中間兩數（第 3 與第 4 項）的平均：$\\frac{5 + x}{2} = 6 \\implies 5 + x = 12 \\implies x = 7$！" },
        { t: "6", common: true, explain: "若 $x=6$，則中位數會變成 $\\frac{5+6}{2} = 5.5$。" },
        { t: "8", explain: "若 $x=8$，中位數會變成 $\\frac{5+8}{2} = 6.5$。" },
        { t: "7.5", explain: "計算錯誤。" }
      ]
    },

    derive: {
      intro: "透過滑桿調整極端值的大小，觀察「平均數」與「中位數」誰被拉著跑、誰依然屹立不搖。",
      frames: [
        { cap: "算術平均數：將所有資料加總除以總筆數。最具整體代表性，但<b>極度敏感、容易受極端值扭曲</b>。", tex: "\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}" },
        { cap: "中位數：資料由小到大排列後正中間的數值。若 $n$ 為奇數取第 $\\frac{n+1}{2}$ 項；若 $n$ 為偶數取第 $\\frac{n}{2}$ 與 $\\frac{n}{2}+1$ 項的平均。", tex: "Me = \\begin{cases} x_{(n+1)/2}, & n\\text{ 奇數} \\ \\frac{x_{n/2} + x_{n/2+1}}{2}, & n\\text{ 偶數} \\end{cases}" },
        { cap: "眾數：資料中出現頻率最高、次數最多的數值。可以有多個眾數（雙峰分布），也可以沒有眾數。", tex: "Mo = \\text{次數最多的資料值}" },
        { cap: "次數分配直方圖：橫軸為組距、縱軸為次數。長條互相緊黏（連續變量），面積代表該組頻率。", tex: "\\text{組中點} = \\frac{\\text{組下限} + \\text{組上限}}{2}" }
      ],
      hint: "判斷指標優劣：有極端大數或極端小數時看「中位數」，問最受歡迎尺寸或投票看「眾數」！",
      setup: function (ctx) {
        var svg = SK.svg(ctx.stage, 440, 260, "集中趨勢動態模擬");
        var slOutlier = SK.slider({ label: "最後一位同學的薪水 (萬元)", min: 4, max: 50, step: 2, value: 50, color: "orange", fmt: function(v){ return v + " 萬"; }, onInput: draw });
        ctx.sliders.appendChild(slOutlier.el);
        var read = SK.h("div", { class: "sk-frame", style: "padding:10px 14px;background:#FDFBF6" });
        ctx.extra.appendChild(read);

        function draw() {
          var lastVal = slOutlier.value;
          var data = [3, 3, 3.5, 4, lastVal];
          var sum = data.reduce(function(a, b){ return a + b; }, 0);
          var mean = (sum / 5).toFixed(1);
          var median = data[2]; // 第 3 項
          var mode = 3;

          svg.innerHTML = "";
          // 畫 5 根長條柱狀
          for (var i = 0; i < 5; i++) {
            var val = data[i];
            var barH = Math.min(val * 3.5, 160);
            s("rect", { x: 50 + i * 70, y: 200 - barH, width: 45, height: barH, fill: i === 4 ? C.red.f : C.blue.f, stroke: i === 4 ? C.red.s : C.blue.s, "stroke-width": 2 }, svg);
            SK.label(svg, 72 + i * 70, 200 - barH - 12, val + "萬", { size: 12, color: i === 4 ? C.red.s : C.ink, bold: true });
            SK.label(svg, 72 + i * 70, 220, "員" + (i + 1), { size: 12, color: C.soft });
          }

          read.innerHTML = SK.tex("\\text{平均數 } \\bar{x} = " + mean + "\\text{ 萬（受極端值拉高！），中位數 } Me = " + median + "\\text{ 萬（穩定不變），眾數 } Mo = " + mode + "\\text{ 萬}", true);
        }
        return { show: draw };
      }
    },

    drills: [
      {
        title: "求未分組數據的三大集中趨勢指標",
        code: "D-7-2",
        demo: {
          q: "某小組 7 位同學的投籃得分如下：$4, 7, 5, 9, 7, 6, 4$。求這組數據的平均數、中位數與眾數。",
          steps: [
            "先將數據由小到大排序：$4, 4, 5, 6, 7, 7, 9$。",
            "平均數：$\\bar{x} = \\frac{4+4+5+6+7+7+9}{7} = \\frac{42}{7} = 6$ 分。",
            "中位數：共 7 筆數據，取第 $\\frac{7+1}{2} = 4$ 項，中位數 $Me = 6$ 分。",
            "眾數：4 與 7 都出現了 2 次且次數最多，因此有兩個眾數：$Mo = 4$ 分與 $7$ 分。"
          ]
        },
        tries: [
          {
            q: "8 位選手的立定跳遠成績（公分）為：190, 205, 195, 210, 185, 200, 215, 205。這組成績的中位數是多少？",
            options: ["202.5 公分", "205 公分", "200 公分", "201 公分"],
            ans: 0,
            explain: "排序得：185, 190, 195, 200, 205, 205, 210, 215。偶數 8 筆取第 4 與第 5 項（200 與 205）的平均：$\\frac{200 + 205}{2} = 202.5$ 公分。"
          },
          {
            q: "某次數學小考全班 30 人的平均為 68 分。後來發現老師算錯一位同學的成績，將 80 分誤看成 50 分。更正後全班正確的平均分數是多少分？",
            options: ["69 分", "70 分", "68.5 分", "71 分"],
            ans: 0,
            explain: "分數少算了 $80 - 50 = 30$ 分。總分增加 30 分，平均增加 $30 \\div 30 = 1$ 分。正確平均為 $68 + 1 = 69$ 分。"
          }
        ]
      }
    ],

    challenges: [
      {
        q: "某次測驗有 10 位同學參加，成績分別為 65, 70, 72, 75, 80, 82, 85, 88, 90, 95。若這 10 個數各自加 5 分後再乘以 1.1，則新成績的平均數與原本相比有何改變？",
        options: [
          "新平均 = (原平均 + 5) * 1.1",
          "新平均 = 原平均 * 1.1 + 5",
          "新平均不變",
          "新平均 = 原平均 + 5"
        ],
        ans: 0,
        hint: "利用平均數的線性運算性質：每個數做同樣線性變換 $y_i = a(x_i + b)$，平均數也跟著變動。",
        explain: "若每個數據都經歷相同變換 $y_i = 1.1(x_i + 5)$，根據分配律與平均數性質，新平均 $\\bar{y} = 1.1(\\bar{x} + 5)$。"
      }
    ],

    angles: [
      { title: "全國薪資行情：為什麼看中位數才準？", body: "主計總處每年公布國人薪資時，中位數通常比平均數低了將近 10 萬元！這是因為極少數年薪上千萬甚至億元的頂級高所得者，將全體「算術平均數」大幅拉高，使大部分受薪階層感覺「被平均」了。" },
      { title: "運動賽事的去頭去尾計分法", body: "跳水、體操等主觀評分賽事中，常採用「扣除一個最高分與一個最低分，再計算平均分」的裁決方式，正是為了消除少數裁判極端偏頗打分的影響。" }
    ],

    where: {
      past: "國小學過簡單長條圖、折線圖與圓形圖的判讀。",
      current: "在七年級下學期嚴謹定義次數分配、平均數、中位數與眾數，學會批判性看待統計數據。",
      next: "八年級將進一步學習累積次數分配，九年級學習四分位數與盒狀圖。"
    }
  });
})();
