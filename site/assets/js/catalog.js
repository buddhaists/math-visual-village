/* 全站課程目錄：國中南一數學（1上～3下 共六冊、60個核心小節互動單元）
   首頁地圖、單元頁麵包屑／上下篇／連結小路都讀這裡。 */
window.CATALOG = {
  tracks: {
    "7a": { name: "1上 (七上)", en: "Grade 7A", cls: "t-10" },
    "7b": { name: "1下 (七下)", en: "Grade 7B", cls: "t-A" },
    "8a": { name: "2上 (八上)", en: "Grade 8A", cls: "t-B" },
    "8b": { name: "2下 (八下)", en: "Grade 8B", cls: "t-J" },
    "9a": { name: "3上 (九上)", en: "Grade 9A", cls: "t-Y" },
    "9b": { name: "3下 (九下)", en: "Grade 9B", cls: "t-X" }
  },

  regions: [
    { id: "num", name: "數與運算", en: "Numbers & Operations", color: "#F3D5C3", deep: "#B8674A" },
    { id: "eq1", name: "一次方程與不等式", en: "Linear Equations", color: "#DCE4D2", deep: "#647A58" },
    { id: "poly", name: "多項式與二次方程", en: "Polynomials & Quadratics", color: "#F1E6C6", deep: "#9C8038" },
    { id: "seq", name: "比例與數列", en: "Ratios & Sequences", color: "#E6E1D3", deep: "#7D6E4F" },
    { id: "func", name: "坐標與函數", en: "Coordinates & Functions", color: "#D3E0DE", deep: "#4F7479" },
    { id: "geom", name: "三角形與四邊形", en: "Triangles & Quads", color: "#E2DAE6", deep: "#7A6889" },
    { id: "circle", name: "相似、圓與立體", en: "Circles & Solids", color: "#D6E6DA", deep: "#4F8270" },
    { id: "stat", name: "統計與機率", en: "Data & Chance", color: "#EFD9D6", deep: "#A85E66" }
  ],

  units: [
    // ==== 數與運算 (num: 10 單元) ====
    { slug: "num-line", ready: true, region: "num", title: "1-1 數與數線", sub: "正負數、相反數與絕對值距離",
      tex: "|a-b|=\\text{數線上 }a,b\\text{ 兩點的距離}", tracks: ["7a"], codes: ["N-7-3", "N-7-5"], links: ["int-add-sub", "cartesian-plane"] },
    { slug: "int-add-sub", ready: true, region: "num", title: "1-2 整數的加減", sub: "同號相加、異號抵消與去括號",
      tex: "a-b=a+(-b),\\ -(a-b)=-a+b", tracks: ["7a"], codes: ["N-7-3", "N-7-4", "N-7-5"], links: ["int-mul-div", "alg-expr"] },
    { slug: "int-mul-div", ready: true, region: "num", title: "1-3 整數的乘除", sub: "負負得正、四則順序與分配律",
      tex: "(-a)\\times(-b)=ab,\\ a(b+c)=ab+ac", tracks: ["7a"], codes: ["N-7-3", "N-7-4"], links: ["sci-notation", "frac-ops"] },
    { slug: "sci-notation", ready: true, region: "num", title: "1-4 指數與科學記號", sub: "10 的次方放大鏡與天文微觀世界",
      tex: "a\\times 10^n\\ (1\\le a<10,\\ n\\in\\mathbb{Z})", tracks: ["7a"], codes: ["N-7-6", "N-7-8"], links: ["exp-laws"] },
    { slug: "prime-factor", ready: true, region: "num", title: "2-1 質因數分解", sub: "倍數判別、質數篩法與標準分解式",
      tex: "n=p_1^{a_1}p_2^{a_2}\\cdots p_k^{a_k}", tracks: ["7a"], codes: ["N-7-1", "N-7-2"], links: ["gcd-lcm"] },
    { slug: "gcd-lcm", ready: true, region: "num", title: "2-2 公因數與公倍數", sub: "鋪磁磚與排週期：(a,b) 與 [a,b]",
      tex: "(a,b)\\times[a,b]=a\\times b", tracks: ["7a"], codes: ["N-7-2"], links: ["frac-ops", "factor-common"] },
    { slug: "frac-ops", ready: true, region: "num", title: "2-3 分數的四則運算", sub: "通分、倒數與正負分數混合運算",
      tex: "\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}", tracks: ["7a"], codes: ["N-7-3", "N-7-4", "N-7-5"], links: ["exp-laws", "linear-eq-1"] },
    { slug: "exp-laws", ready: true, region: "num", title: "2-4 指數律", sub: "次方的加減乘：同底數與積的乘方",
      tex: "a^m\\cdot a^n=a^{m+n},\\ (a^m)^n=a^{mn}", tracks: ["7a"], codes: ["N-7-6", "N-7-7"], links: ["poly-mul-div", "geom-seq"] },
    { slug: "sqrt-approx", ready: true, region: "num", title: "2-1 平方根與近似值", sub: "面積為 a 的正方形邊長與十分逼近",
      tex: "(\\sqrt{a})^2=a\\ (a\\ge 0)", tracks: ["8a"], codes: ["N-8-1", "N-8-2"], links: ["radical-ops", "pythagoras"] },
    { slug: "radical-ops", ready: true, region: "num", title: "2-2 根式的運算", sub: "最簡根式、同類方根與分母有理化",
      tex: "\\frac{1}{\\sqrt{a}+\\sqrt{b}}=\\frac{\\sqrt{a}-\\sqrt{b}}{a-b}", tracks: ["8a"], codes: ["N-8-1"], links: ["pythagoras", "quad-eq-formula"] },

    // ==== 一次方程與不等式 (eq1: 8 單元) ====
    { slug: "alg-expr", ready: true, region: "eq1", title: "3-1 以符號列式與運算", sub: "未知數 x 的簡記、代值與同類項化簡",
      tex: "ax+bx=(a+b)x", tracks: ["7a"], codes: ["A-7-1"], links: ["linear-eq-1", "poly-add-sub"] },
    { slug: "linear-eq-1", ready: true, region: "eq1", title: "3-2 一元一次方程式求解", sub: "等量公理天平與移項變號法則",
      tex: "ax+b=c\\iff x=\\frac{c-b}{a}", tracks: ["7a"], codes: ["A-7-2", "A-7-3"], links: ["linear-eq-1-app", "linear-eq-2", "ineq-solve"] },
    { slug: "linear-eq-1-app", ready: true, region: "eq1", title: "3-3 一元一次方程式應用", sub: "把文字題畫成線段圖：折扣、分配與速率",
      tex: "\\text{距離}=\\text{速率}\\times\\text{時間}", tracks: ["7a"], codes: ["A-7-3"], links: ["linear-sys-2-app"] },
    { slug: "linear-eq-2", ready: true, region: "eq1", title: "1-1 二元一次方程式", sub: "兩個未知數的搭配與非負整數解",
      tex: "ax+by=c", tracks: ["7b"], codes: ["A-7-4"], links: ["linear-sys-2", "linear-graph"] },
    { slug: "linear-sys-2", ready: true, region: "eq1", title: "1-2 解二元一次聯立方程式", sub: "代入消去與加減消去：把兩個未知數變一個",
      tex: "\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}", tracks: ["7b"], codes: ["A-7-5"], links: ["linear-sys-2-app", "linear-graph"] },
    { slug: "linear-sys-2-app", ready: true, region: "eq1", title: "1-3 聯立方程式的應用", sub: "雞兔同籠、票價優惠與二位數對調問題",
      tex: "10a+b\\xrightarrow{\\text{對調}}10b+a", tracks: ["7b"], codes: ["A-7-5"], links: ["ratio-prop"] },
    { slug: "ineq-meaning", ready: true, region: "eq1", title: "4-1 一元一次不等式及其解", sub: "不超過、至少與數線上的空心實心區間",
      tex: "x\\ge a,\\ x<b", tracks: ["7b"], codes: ["A-7-7", "A-7-8"], links: ["ineq-solve"] },
    { slug: "ineq-solve", ready: true, region: "eq1", title: "4-2 解一元一次不等式與應用", sub: "為什麼乘除負數時，不等號一定要轉向？",
      tex: "a<b,\\ c<0\\implies ac>bc", tracks: ["7b"], codes: ["A-7-8"], links: ["tri-inequality"] },

    // ==== 多項式與二次方程 (poly: 8 單元) ====
    { slug: "mul-formulas", ready: true, region: "poly", title: "1-1 乘法公式", sub: "切開正方形：和的平方、差的平方與平方差",
      tex: "(a\\pm b)^2=a^2\\pm 2ab+b^2,\\ (a+b)(a-b)=a^2-b^2", tracks: ["8a"], codes: ["A-8-1"], links: ["poly-add-sub", "factor-common", "radical-ops"] },
    { slug: "poly-add-sub", ready: true, region: "poly", title: "1-2 多項式的加減", sub: "次數、升降冪排列與同類項直式對齊",
      tex: "(ax^2+bx+c)+(dx^2+ex+f)", tracks: ["8a"], codes: ["A-8-2", "A-8-3"], links: ["poly-mul-div"] },
    { slug: "poly-mul-div", ready: true, region: "poly", title: "1-3 多項式的乘除", sub: "分配展開與長除法：被除式＝除式×商＋餘式",
      tex: "A=B\\times Q+R\\ (\\deg R<\\deg B)", tracks: ["8a"], codes: ["A-8-3"], links: ["factor-common"] },
    { slug: "factor-common", ready: true, region: "poly", title: "3-1 提公因式與公式因式分解", sub: "把展開的面積碎片重新拼回長方形",
      tex: "ma+mb=m(a+b),\\ a^2-b^2=(a+b)(a-b)", tracks: ["8a"], codes: ["A-8-4", "A-8-5"], links: ["factor-cross", "quad-eq-factor"] },
    { slug: "factor-cross", ready: true, region: "poly", title: "3-2 十字交乘法因式分解", sub: "拆開頭尾、交叉相乘湊出中間一次項",
      tex: "x^2+(p+q)x+pq=(x+p)(x+q)", tracks: ["8a"], codes: ["A-8-5"], links: ["quad-eq-factor"] },
    { slug: "quad-eq-factor", ready: true, region: "poly", title: "4-1 因式分解法解一元二次方程", sub: "兩數相乘為 0，至少有一個是 0",
      tex: "A\\cdot B=0\\iff A=0\\ \\text{或}\\ B=0", tracks: ["8a"], codes: ["A-8-6", "A-8-7"], links: ["quad-eq-formula"] },
    { slug: "quad-eq-formula", ready: true, region: "poly", title: "4-2 配方法與公式解", sub: "補上正方形缺角 $(b/2)^2$，推導公式解與判別式",
      tex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}", tracks: ["8a"], codes: ["A-8-7"], links: ["quad-eq-app", "quad-func-graph"] },
    { slug: "quad-eq-app", ready: true, region: "poly", title: "4-3 一元二次方程式的應用", sub: "花園步道平移、商品定價與解的合理性",
      tex: "(L-2x)(W-2x)=\\text{剩餘面積}", tracks: ["8a"], codes: ["A-8-7"], links: ["quad-func-extrema"] },

    // ==== 比例與數列 (seq: 6 單元) ====
    { slug: "ratio-prop", ready: true, region: "seq", title: "3-1 比例式", sub: "比與比值、外項積等於內項積與參數設法",
      tex: "a:b=c:d\\iff ad=bc", tracks: ["7b"], codes: ["N-7-9"], links: ["direct-inv-prop", "continued-ratio", "prop-segments"] },
    { slug: "direct-inv-prop", ready: true, region: "seq", title: "3-2 正比與反比", sub: "比值固定的直線 y=kx 與乘積固定的曲線 xy=k",
      tex: "\\text{正比 }y=kx,\\quad \\text{反比 }xy=k", tracks: ["7b"], codes: ["N-7-9"], links: ["linear-func"] },
    { slug: "arith-seq", ready: true, region: "seq", title: "1-1 等差數列", sub: "每一步都加同一個公差 d：走 (n−1) 步到第 n 項",
      tex: "a_n=a_1+(n-1)d", tracks: ["8b"], codes: ["N-8-3", "N-8-4"], links: ["arith-series", "geom-seq"] },
    { slug: "arith-series", ready: true, region: "seq", title: "1-2 等差級數", sub: "把階梯倒過來拼成長方形：首項加末項乘項數除以 2",
      tex: "S_n=\\frac{n(a_1+a_n)}{2}", tracks: ["8b"], codes: ["N-8-5"], links: ["angle-polygon"] },
    { slug: "geom-seq", ready: true, region: "seq", title: "1-3 等比數列", sub: "每一步都乘同一個公比 r：倍增與折半的力量",
      tex: "a_n=a_1\\cdot r^{n-1}", tracks: ["8b"], codes: ["N-8-6"], links: [] },
    { slug: "continued-ratio", ready: true, region: "seq", title: "1-1 連比", sub: "把兩個比透過共同橋樑接成 x:y:z",
      tex: "x:y:z=a:b:c\\implies x=ak,y=bk,z=ck", tracks: ["9a"], codes: ["N-9-1"], links: ["prop-segments", "similar-polygons"] },

    // ==== 坐標與函數 (func: 5 單元) ====
    { slug: "cartesian-plane", ready: true, region: "func", title: "2-1 直角坐標平面", sub: "先橫走再直走：有序數對 (x,y) 與四個象限",
      tex: "P(x,y):\\ (+,+),(-,+),(-,-),(+,-)", tracks: ["7b"], codes: ["G-7-1"], links: ["linear-graph", "pythagoras"] },
    { slug: "linear-graph", ready: true, region: "func", title: "2-2 二元一次方程式的圖形", sub: "方程式的無數組解連成直線，聯立解就是兩線交點",
      tex: "ax+by=c\\ \\text{的圖形為一直線}", tracks: ["7b"], codes: ["A-7-6", "G-7-1"], links: ["linear-func"] },
    { slug: "linear-func", ready: true, region: "func", title: "2-1 一次函數及其圖形", sub: "對應關係、一次函數 y=ax+b 與常數函數 y=c",
      tex: "y=ax+b", tracks: ["8b"], codes: ["F-8-1", "F-8-2"], links: ["quad-func-graph"] },
    { slug: "quad-func-graph", ready: true, region: "func", title: "1-1 二次函數及其圖形", sub: "拋物線的開口、對稱軸 x=h 與頂點 (h,k) 平移",
      tex: "y=a(x-h)^2+k", tracks: ["9b"], codes: ["F-9-1", "F-9-2"], links: ["quad-func-extrema"] },
    { slug: "quad-func-extrema", ready: true, region: "func", title: "1-2 二次函數的最大值與最小值", sub: "頂點就是最高點或最低點：生活極值問題",
      tex: "a>0\\implies \\min=k;\\quad a<0\\implies \\max=k", tracks: ["9b"], codes: ["F-9-2"], links: [] },

    // ==== 三角形與四邊形 (geom: 9 單元) ====
    { slug: "pythagoras", ready: true, region: "geom", title: "2-3 畢氏定理", sub: "直角三角形三邊正方形面積與坐標兩點距離",
      tex: "a^2+b^2=c^2,\\ AB=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}", tracks: ["8a"], codes: ["S-8-6", "G-8-1"], links: ["tri-congruence", "similar-tri-app", "circle-line-rel"] },
    { slug: "angle-polygon", ready: true, region: "geom", title: "3-1 內角與外角", sub: "外角等於兩內對角和、多邊形內角和與繞一圈 360°",
      tex: "(n-2)\\times 180^\\circ,\\ \\text{外角和}=360^\\circ", tracks: ["8b"], codes: ["S-8-1", "S-8-2"], links: ["tri-congruence", "parallel-lines"] },
    { slug: "compass-draw", ready: true, region: "geom", title: "3-2 基本尺規作圖", sub: "只用直尺與圓規：等線段、等角、中垂線與角平分線",
      tex: "\\overline{PA}=\\overline{PB}\\iff P\\text{ 在 }\\overline{AB}\\text{ 中垂線上}", tracks: ["8b"], codes: ["S-8-12"], links: ["tri-congruence", "tri-congruence-app"] },
    { slug: "tri-congruence", ready: true, region: "geom", title: "3-3 三角形全等", sub: "五種鎖死三角形形狀的條件：SSS、SAS、ASA、AAS、RHS",
      tex: "\\triangle ABC\\cong\\triangle DEF", tracks: ["8b"], codes: ["S-8-4", "S-8-5"], links: ["tri-congruence-app", "proof-reasoning"] },
    { slug: "tri-congruence-app", ready: true, region: "geom", title: "3-4 全等三角形的應用", sub: "中垂線到兩端等距、角平分線到兩邊等距與等腰三角形",
      tex: "\\overline{AB}=\\overline{AC}\\iff \\angle B=\\angle C", tracks: ["8b"], codes: ["S-8-5", "S-8-8"], links: ["triangle-centers"] },
    { slug: "tri-inequality", ready: true, region: "geom", title: "3-5 三角形的邊角關係", sub: "兩邊和大於第三邊、大邊對大角與大角對大邊",
      tex: "|a-b|<c<a+b,\\quad a>b\\iff \\angle A>\\angle B", tracks: ["8b"], codes: ["S-8-8"], links: [] },
    { slug: "parallel-lines", ready: true, region: "geom", title: "4-1 平行線", sub: "同位角相等、內錯角相等、同側內角互補與鋸齒轉角",
      tex: "L_1\\parallel L_2\\iff \\angle 1=\\angle 2", tracks: ["8b"], codes: ["S-8-1", "S-8-3"], links: ["parallelogram", "prop-segments"] },
    { slug: "parallelogram", ready: true, region: "geom", title: "4-2 平行四邊形", sub: "對邊等長、對角相等、對角線互相平分與五大判別",
      tex: "\\overline{AB}\\parallel\\overline{CD},\\ \\overline{AB}=\\overline{CD}\\implies ABCD\\text{ 為平行四邊形}", tracks: ["8b"], codes: ["S-8-9"], links: ["special-quads"] },
    { slug: "special-quads", ready: true, region: "geom", title: "4-3 特殊的四邊形", sub: "長方形、菱形、正方形、箏形對角線與梯形兩腰中點連線",
      tex: "\\text{梯形兩腰中點連線}=\\frac{\\text{上底}+\\text{下底}}{2}", tracks: ["8b"], codes: ["S-8-10", "S-8-11"], links: ["prop-segments"] },

    // ==== 相似、圓與立體 (circle: 10 單元) ====
    { slug: "sym-three-views", ready: true, region: "circle", title: "6-1 線對稱與三視圖", sub: "對稱軸垂直平分連線段，以及 3D 積木的前、上、右視圖",
      tex: "\\text{對稱軸}\\perp\\overline{PP'}\\ \\text{且平分}\\ \\overline{PP'}", tracks: ["7b"], codes: ["S-7-1", "S-7-2", "S-7-3", "S-7-4", "S-7-5"], links: ["compass-draw", "space-lines-planes"] },
    { slug: "prop-segments", ready: true, region: "circle", title: "1-2 比例線段", sub: "等高三角形面積比與平行線截比例線段性質",
      tex: "\\overline{DE}\\parallel\\overline{BC}\\implies \\overline{AD}:\\overline{DB}=\\overline{AE}:\\overline{EC}", tracks: ["9a"], codes: ["S-9-3"], links: ["similar-polygons"] },
    { slug: "similar-polygons", ready: true, region: "circle", title: "1-3 相似形", sub: "放大縮小角度不變：AA、SAS、SSS 三角形相似判別",
      tex: "\\triangle ABC\\sim\\triangle DEF", tracks: ["9a"], codes: ["S-9-1", "S-9-2"], links: ["similar-tri-app"] },
    { slug: "similar-tri-app", ready: true, region: "circle", title: "1-4 相似三角形的應用", sub: "面積比等於邊長平方比、直角母子相似與特殊直角三角形比值",
      tex: "\\frac{\\triangle ABC}{\\triangle DEF}=\\left(\\frac{a}{d}\\right)^2,\\ 1:\\sqrt{3}:2", tracks: ["9a"], codes: ["S-9-2", "S-9-4"], links: ["proof-reasoning"] },
    { slug: "circle-line-rel", ready: true, region: "circle", title: "2-1 點、直線與圓的關係", sub: "扇形弧長與面積、切線垂直半徑、弦心距垂直平分弦",
      tex: "\\text{弧長}=2\\pi r\\times\\frac{\\theta}{360^\\circ},\\ \\overline{OP}\\perp L", tracks: ["9a"], codes: ["S-9-5", "S-9-6", "S-9-7"], links: ["arc-inscribed-angle"] },
    { slug: "arc-inscribed-angle", ready: true, region: "circle", title: "2-2 弧與圓周角", sub: "圓周角等於所對弧度數的一半、半圓對直角與圓內接四邊形",
      tex: "\\text{圓周角}=\\frac{1}{2}\\text{圓心角}=\\frac{1}{2}\\text{所對弧度數}", tracks: ["9a"], codes: ["S-9-6"], links: ["triangle-centers"] },
    { slug: "proof-reasoning", ready: true, region: "circle", title: "3-1 推理與證明", sub: "從已知走向求證：幾何全等相似推理與代數奇偶倍數證明",
      tex: "\\text{已知}\\implies\\text{性質依據}\\implies\\text{結論}", tracks: ["9a"], codes: ["S-9-11"], links: ["triangle-centers"] },
    { slug: "triangle-centers", ready: true, region: "circle", title: "3-2 三角形的外心、內心與重心", sub: "三中垂線交於外心、三角平分線交於內心、三中線 2:1 交於重心",
      tex: "\\triangle\\text{面積}=\\frac{1}{2}sr,\\quad \\overline{AG}:\\overline{GD}=2:1", tracks: ["9a"], codes: ["S-9-8", "S-9-9", "S-9-10"], links: [] },
    { slug: "space-lines-planes", ready: true, region: "circle", title: "3-1a 空間中的線與平面", sub: "長方體與正四面體中，直線的平行、相交、垂直與歪斜",
      tex: "\\text{空間兩直線：交於一點、平行、或歪斜}", tracks: ["9b"], codes: ["S-9-12"], links: ["solid-surface-volume"] },
    { slug: "solid-surface-volume", ready: true, region: "circle", title: "3-1b 柱體與錐體展開圖", sub: "把立體剪開攤平：直角柱、正角錐與直圓錐的表面積與體積",
      tex: "V_{\\text{柱}}=\\text{底面積}\\times\\text{高},\\ S_{\\text{圓錐側}}=\\pi r R", tracks: ["9b"], codes: ["S-9-13"], links: [] },

    // ==== 統計與機率 (stat: 4 單元) ====
    { slug: "stat-charts-center", ready: true, region: "stat", title: "5-1 統計圖表與平均數、中位數、眾數", sub: "看懂直方圖與折線圖，比較平均數、中位數與眾數誰不怕極端值",
      tex: "\\bar{x}=\\frac{x_1+x_2+\\cdots+x_n}{n}", tracks: ["7b"], codes: ["D-7-1", "D-7-2"], links: ["cum-freq", "box-plot-iqr"] },
    { slug: "cum-freq", ready: true, region: "stat", title: "5-1 相對與累積次數分配圖表", sub: "相對次數百分比與一路往上累加的累積相對次數折線圖",
      tex: "\\text{相對次數}(\\%)=\\frac{\\text{該組次數}}{\\text{總次數}}\\times 100\\%", tracks: ["8a"], codes: ["D-8-1"], links: ["box-plot-iqr"] },
    { slug: "box-plot-iqr", ready: true, region: "stat", title: "2-1 統計數據的分布", sub: "把資料切成四等份：四分位數 Q1,Q2,Q3、四分位距 IQR 與盒狀圖",
      tex: "\\text{IQR}=Q_3-Q_1,\\ \\text{全距}=\\max-\\min", tracks: ["9b"], codes: ["D-9-1"], links: ["classical-prob"] },
    { slug: "classical-prob", ready: true, region: "stat", title: "2-2 古典機率與樹狀圖", sub: "機會均等時數樣本點，或畫兩層樹狀圖把所有可能排出來",
      tex: "P(A)=\\frac{n(A)}{n(S)},\\ 0\\le P(A)\\le 1", tracks: ["9b"], codes: ["D-9-2", "D-9-3"], links: [] }
  ],

  /* 建議閱讀順序（依南一國中數學 1上 → 1下 → 2上 → 2下 → 3上 → 3下 課本章節順序排列） */
  order: [
    // 1上 (7a: 11)
    "num-line", "int-add-sub", "int-mul-div", "sci-notation",
    "prime-factor", "gcd-lcm", "frac-ops", "exp-laws",
    "alg-expr", "linear-eq-1", "linear-eq-1-app",
    // 1下 (7b: 11)
    "linear-eq-2", "linear-sys-2", "linear-sys-2-app",
    "cartesian-plane", "linear-graph",
    "ratio-prop", "direct-inv-prop",
    "ineq-meaning", "ineq-solve",
    "stat-charts-center", "sym-three-views",
    // 2上 (8a: 12)
    "mul-formulas", "poly-add-sub", "poly-mul-div",
    "sqrt-approx", "radical-ops", "pythagoras",
    "factor-common", "factor-cross",
    "quad-eq-factor", "quad-eq-formula", "quad-eq-app",
    "cum-freq",
    // 2下 (8b: 12)
    "arith-seq", "arith-series", "geom-seq",
    "linear-func",
    "angle-polygon", "compass-draw", "tri-congruence", "tri-congruence-app", "tri-inequality",
    "parallel-lines", "parallelogram", "special-quads",
    // 3上 (9a: 8)
    "continued-ratio", "prop-segments", "similar-polygons", "similar-tri-app",
    "circle-line-rel", "arc-inscribed-angle",
    "proof-reasoning", "triangle-centers",
    // 3下 (9b: 6)
    "quad-func-graph", "quad-func-extrema",
    "box-plot-iqr", "classical-prob",
    "space-lines-planes", "solid-surface-volume"
  ]
};

window.CATALOG.get = function (slug) {
  return window.CATALOG.units.find(function (u) { return u.slug === slug; });
};
window.CATALOG.region = function (id) {
  return window.CATALOG.regions.find(function (r) { return r.id === id; });
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = window.CATALOG;
}

