const dimensions = [
  { id: "goal", label: "目标清晰度", core: true },
  { id: "feedback", label: "反馈强度", core: true },
  { id: "difficulty", label: "难度曲线", core: true },
  { id: "pace", label: "节奏与时长", core: true },
  { id: "immersion", label: "沉浸感", core: false },
  { id: "control", label: "操作手感", core: false },
  { id: "social", label: "社交协作", core: false },
  { id: "accessibility", label: "可访问性", core: false },
];

const categories = [
  { id: "bug", label: "Bug", tone: "danger" },
  { id: "balance", label: "数值问题", tone: "warning" },
  { id: "guide", label: "引导问题", tone: "info" },
  { id: "pace", label: "节奏问题", tone: "neutral" },
  { id: "monetization", label: "付费问题", tone: "danger" },
  { id: "control", label: "操作手感", tone: "success" },
];

const typicalExamples = [
  {
    category: "bug",
    title: "任务卡死",
    problem: "玩家完成支线任务后 NPC 没有刷新下一段对话，任务列表仍停留在旧目标，导致无法继续推进。",
    playerType: "核心玩家",
    gameStage: "核心循环",
    dimensions: ["feedback", "goal", "accessibility"],
  },
  {
    category: "balance",
    title: "怪物伤害过高",
    problem: "玩家反馈第三关怪物伤害太高，普通攻击两下就会失败，装备掉率也偏低，感觉不是自己操作问题而是数值压制。",
    playerType: "核心玩家",
    gameStage: "核心循环",
    dimensions: ["difficulty", "feedback", "pace"],
  },
  {
    category: "guide",
    title: "新手目标不清",
    problem: "新手玩家在第 3 关频繁流失。访谈里他们说目标不清楚，失败后不知道应该换策略还是继续练操作。",
    playerType: "新手玩家",
    gameStage: "新手引导",
    dimensions: ["goal", "feedback", "difficulty", "pace"],
  },
  {
    category: "pace",
    title: "重复刷图疲劳",
    problem: "玩家进入中期后每天需要重复刷同一张资源图，奖励变化少，连续 3 天后活跃率明显下降。",
    playerType: "轻度玩家",
    gameStage: "中后期留存",
    dimensions: ["pace", "difficulty", "immersion"],
  },
  {
    category: "monetization",
    title: "首充弹窗频繁",
    problem: "玩家觉得首充礼包弹窗出现太早，刚完成教学就连续看到 3 个付费入口，影响继续探索的意愿。",
    playerType: "新手玩家",
    gameStage: "付费转化",
    dimensions: ["pace", "goal", "immersion"],
  },
  {
    category: "control",
    title: "闪避不跟手",
    problem: "玩家反馈闪避按键有时没有立刻响应，尤其在攻击动画结束前输入会丢失，失败时容易归因于操作不顺。",
    playerType: "核心玩家",
    gameStage: "核心循环",
    dimensions: ["control", "feedback", "difficulty"],
  },
];

const fightingDemoSamples = [
  { category: "guide", priority: "P2", time: "0-10 秒", text: "第一次进入后只知道移动，不知道方向键可以射击，直到被怪追上才误触发现。", playerType: "新手玩家", stage: "新手引导", dimensions: ["goal", "feedback", "control"] },
  { category: "guide", priority: "P2", time: "0-10 秒", text: "画面里有倒计时，但我不明白目标是活到 60 秒还是必须清光所有敌人。", playerType: "新手玩家", stage: "新手引导", dimensions: ["goal", "feedback"] },
  { category: "control", priority: "P1", time: "8-18 秒", text: "边移动边转向射击时，按键组合不太容易理解，常常朝错误方向开火。", playerType: "轻度玩家", stage: "前 10 分钟", dimensions: ["control", "feedback", "goal"] },
  { category: "balance", priority: "P1", time: "12-20 秒", text: "基础敌人贴近后掉血很快，前几次还没理解攻击距离就结束了，感觉容错偏低。", playerType: "新手玩家", stage: "核心循环", dimensions: ["difficulty", "feedback", "pace"] },
  { category: "guide", priority: "P2", time: "15-25 秒", text: "捡到图标后不知道获得了什么效果，也不知道是移速、射速还是范围变化。", playerType: "新手玩家", stage: "核心循环", dimensions: ["feedback", "goal", "immersion"] },
  { category: "pace", priority: "P2", time: "15-25 秒", text: "前十几秒敌人变化很少，连续移动和射击但没有新的判断，节奏有一点平。", playerType: "核心玩家", stage: "核心循环", dimensions: ["pace", "immersion", "feedback"] },
  { category: "pace", priority: "P1", time: "20-35 秒", text: "20 秒后快怪和爆炸怪同时从两侧进来，我还没搞懂方向射击就被包围，每次都在同一个时间点重开，明显影响完成率。", playerType: "新手玩家", stage: "核心循环", dimensions: ["pace", "difficulty", "goal", "control"] },
  { category: "control", priority: "P1", time: "20-35 秒", text: "想边后退边射击时，转向和射击反馈有点跟不上，失败时分不清是自己按慢了还是动作没出来。", playerType: "核心玩家", stage: "核心循环", dimensions: ["control", "feedback", "difficulty"] },
  { category: "balance", priority: "P1", time: "20-35 秒", text: "快怪的追击速度高得突然，普通怪还没处理完就必须逃跑，压力曲线像断层。", playerType: "核心玩家", stage: "核心循环", dimensions: ["difficulty", "pace", "feedback"] },
  { category: "guide", priority: "P2", time: "20-35 秒", text: "爆炸怪出现时我不知道要优先拉开距离还是先击杀，缺少一个明确的危险提示。", playerType: "新手玩家", stage: "核心循环", dimensions: ["goal", "feedback", "difficulty"] },
  { category: "control", priority: "P1", time: "30-45 秒", text: "敌人多的时候角色和弹幕混在一起，想判断自己有没有命中比较困难。", playerType: "核心玩家", stage: "核心循环", dimensions: ["feedback", "control", "accessibility"] },
  { category: "pace", priority: "P2", time: "30-45 秒", text: "中段存活下来后一直是绕圈和射击，缺少一个短目标或奖励节点来提醒我打得不错。", playerType: "轻度玩家", stage: "核心循环", dimensions: ["pace", "feedback", "immersion"] },
  { category: "balance", priority: "P1", time: "30-45 秒", text: "有时连续两次拿不到有用的拾取物，面对多种怪时只能拖时间，成长感不稳定。", playerType: "核心玩家", stage: "核心循环", dimensions: ["difficulty", "feedback", "pace"] },
  { category: "bug", priority: "P0", time: "任意时点", text: "一局结束后点击重新开始，偶尔没有进入下一局，画面停在结算状态无法继续操作。", playerType: "核心玩家", stage: "核心循环", dimensions: ["feedback", "accessibility", "control"] },
  { category: "guide", priority: "P2", time: "45-60 秒", text: "快到 60 秒时不知道是否快赢了，倒计时和胜利条件没有形成足够强的收尾感。", playerType: "轻度玩家", stage: "核心循环", dimensions: ["goal", "feedback", "immersion"] },
  { category: "pace", priority: "P2", time: "结算后", text: "失败后直接重开很快，但没有告诉我死于哪种敌人或哪一波，下一局不知道该改什么。", playerType: "新手玩家", stage: "核心循环", dimensions: ["feedback", "goal", "pace"] },
  { category: "control", priority: "P2", time: "结算后", text: "想继续挑战时希望能更快重开，结算界面的确认动作让连续练习被打断。", playerType: "核心玩家", stage: "核心循环", dimensions: ["control", "pace", "feedback"] },
  { category: "balance", priority: "P2", time: "完整试玩后", text: "如果熟悉操作后能稳定活到 60 秒，后半段的压力和奖励变化不够大，重复挑战动力会下降。", playerType: "核心玩家", stage: "中后期留存", dimensions: ["difficulty", "pace", "immersion"] },
];

const priorityRules = [
  { label: "P0", title: "阻断与严重异常", text: "崩溃、卡死、无法重开、进度损失，或影响大量玩家完成核心流程。需要立即止损与修复。" },
  { label: "P1", title: "核心体验受损", text: "明显降低完成率、留存或核心手感，例如波次压力断层、输入不跟手、关键数值失衡。进入近期迭代。" },
  { label: "P2", title: "局部摩擦与优化", text: "不阻断流程，但影响理解、节奏或反馈质量，例如提示不清、结算反馈弱。排入常规优化。" },
];

const dimensionAdvice = {
  goal: {
    issue: "玩家可能无法快速理解当前目标、成功条件或下一步动作。",
    action: "把目标拆成可见任务链：当前目标、完成条件、失败后提示分别单独展示。",
    metric: "关卡目标查看率、首轮完成率、提示触发后通关率",
  },
  feedback: {
    issue: "成功、失败和接近成功的反馈可能不够可感知。",
    action: "强化即时反馈：命中、受击、资源变化和关键失败原因需要在 1 秒内被玩家感知。",
    metric: "失败原因识别率、重复尝试率、玩家主观反馈评分",
  },
  difficulty: {
    issue: "挑战强度可能在玩家掌握规则前过快抬升。",
    action: "增加低风险练习段，把关键机制从考核场景前移到安全场景。",
    metric: "首次失败节点、连续失败次数、第三次尝试通过率",
  },
  pace: {
    issue: "体验节奏可能让玩家在理解、行动和奖励之间等待过久。",
    action: "压缩低信息等待时间，并把奖励反馈放在关键动作之后。",
    metric: "单局平均时长、无操作时长、关键奖励触达时间",
  },
  immersion: {
    issue: "玩法目标和世界表达之间可能存在断裂。",
    action: "用场景线索解释规则变化，让任务、视觉和音效服务同一个情绪目标。",
    metric: "剧情跳过率、场景停留时长、沉浸感问卷评分",
  },
  control: {
    issue: "输入结果可能不够稳定，玩家把失败归因于操作不顺。",
    action: "检查输入缓冲、镜头、命中判定和动画锁定，优先修复高频动作。",
    metric: "误操作反馈量、取消动作使用率、输入到反馈延迟",
  },
  social: {
    issue: "协作目标或他人贡献可能不够可见。",
    action: "让队友行为、共同目标进度和个人贡献在同一屏幕层级被看到。",
    metric: "组队完成率、协作行为次数、好友邀请转化",
  },
  accessibility: {
    issue: "信息呈现可能对色弱、低熟练度或小屏玩家不够友好。",
    action: "增加非颜色提示、字号层级和可跳过/可回看的说明。",
    metric: "设置调整率、说明回看率、低端设备完成率",
  },
};

const categoryAdvice = {
  bug: {
    judgement: "这类反馈优先判断是否阻断主流程或造成进度损失，核心是复现路径、影响范围和临时兜底。",
    causes: ["状态机没有正确流转", "任务或关卡触发条件缺失", "客户端与服务端数据不同步", "异常分支缺少恢复入口"],
    suggestions: ["记录稳定复现路径、账号状态、设备信息和关卡节点。", "先补临时绕行或自动修复入口，再安排根因修复。", "给受影响玩家提供进度恢复、补偿或明确提示。"],
    metrics: ["复现率", "异常日志量", "任务完成率", "客服工单量"],
    nextAction: "建立复现用例和日志埋点，修复后用同一路径回归验证。",
  },
  balance: {
    judgement: "这类反馈通常来自难度、收益、成长速度或资源消耗不匹配，需要先确认玩家失败是学习成本还是数值压制。",
    causes: ["敌人伤害或血量超过当前成长预期", "奖励掉率不足以支撑继续挑战", "关卡难度跳升过快", "资源消耗和产出比例失衡"],
    suggestions: ["定位失败率最高的关卡、怪物或资源节点。", "先做小幅数值回调或奖励补偿，不一次性重做整条成长线。", "给高失败节点增加低风险练习或保底机制。"],
    metrics: ["失败率", "通关率", "战斗时长", "资源消耗/获得比"],
    nextAction: "拉取关卡失败和资源消耗数据，做一版小范围数值对比测试。",
  },
  guide: {
    judgement: "这类反馈说明玩家没有理解当前目标、规则或下一步动作，优先降低理解成本。",
    causes: ["目标提示不够明确", "失败后缺少下一步建议", "教程信息过长或出现时机过早", "关键路径缺少视觉引导"],
    suggestions: ["把当前目标、完成条件和失败后建议拆开展示。", "在卡点加入可回看的短提示，而不是一次性长说明。", "用高亮、动线或任务追踪降低玩家寻找成本。"],
    metrics: ["提示查看率", "首轮完成率", "卡点停留时长"],
    nextAction: "针对最高流失的新手节点补一版短提示，观察提示后完成率。",
  },
  pace: {
    judgement: "这类反馈说明玩家在理解、行动和奖励之间等待过久，或重复内容缺少变化。",
    causes: ["低信息等待时间过长", "重复玩法缺少阶段目标", "奖励反馈不及时", "每日任务结构过于固定"],
    suggestions: ["压缩无意义等待，把奖励反馈放在关键动作之后。", "给重复玩法加入阶段目标、随机事件或扫荡条件。", "减少玩家每天必须重复完成的低价值步骤。"],
    metrics: ["单局时长", "等待时长", "重复玩法进入率", "3/7 日留存"],
    nextAction: "先优化一个重复率最高的节点，对比 3 日和 7 日回访变化。",
  },
  monetization: {
    judgement: "这类反馈重点判断付费入口是否打断玩家自主感，避免短期转化伤害长期留存。",
    causes: ["弹窗出现过早或过密", "付费入口打断核心探索", "非付费成长路径不清晰", "礼包文案制造压迫感"],
    suggestions: ["降低连续弹窗频次，给玩家明确关闭路径。", "把付费推荐延后到玩家产生资源需求之后。", "给非付费玩家保留清晰成长路线，避免付费像唯一解。"],
    metrics: ["弹窗关闭率", "付费转化率", "弹窗后退出率", "次日留存"],
    nextAction: "做弹窗时机和频次 A/B 测试，同时观察转化和次日留存。",
  },
  control: {
    judgement: "这类反馈会被玩家直接归因为公平性和技术质量，优先检查输入、动画和反馈链路。",
    causes: ["输入缓冲不足", "动画锁定或取消窗口不清晰", "命中判定与视觉表现不一致", "反馈延迟让失败原因不可感知"],
    suggestions: ["逐帧检查输入、动画锁定、镜头和命中反馈的时间关系。", "优先给高频动作加入输入缓冲或取消窗口。", "强化失败原因反馈，让玩家知道是操作失误还是规则限制。"],
    metrics: ["输入延迟", "误操作反馈量", "动作主观评分", "取消/缓冲触发率"],
    nextAction: "用高频动作做逐帧验证，再组织一轮主观手感评分测试。",
  },
};

const categorySolutions = {
  bug: {
    title: "异常定位与修复",
    steps: ["记录稳定复现路径、账号状态、关卡节点和设备信息。", "加日志确认触发条件，先修阻断路径，再补偿受影响玩家。", "修复后用同一复现路径回归，并观察任务完成率和客服反馈量。"],
  },
  balance: {
    title: "数值校准与保底",
    steps: ["锁定失败率、战斗时长或资源缺口最异常的节点。", "先做小幅参数回调、奖励保底或难度缓冲。", "用通关率、失败率和资源消耗/获得比验证是否回到合理区间。"],
  },
  guide: {
    title: "目标引导补强",
    steps: ["把当前目标、完成条件和失败后建议拆成短提示。", "在关键卡点补充视觉动线或任务追踪。", "用提示查看率、首轮完成率和卡点停留时长验证。"],
  },
  pace: {
    title: "节奏压缩与变化",
    steps: ["定位等待最长或重复最多的体验节点。", "压缩低信息等待，加入阶段目标或内容变化。", "观察单局时长、重复玩法进入率和 3/7 日留存。"],
  },
  monetization: {
    title: "付费触点降压",
    steps: ["降低弹窗频次，把付费入口放到玩家产生需求之后。", "给非付费玩家保留明确成长路径，避免让付费像唯一解。", "同时观察付费转化、关闭率、次日留存和负面反馈。"],
  },
  control: {
    title: "手感与输入校准",
    steps: ["逐帧检查输入、动画锁定、镜头和命中反馈的时间关系。", "优先加入输入缓冲、取消窗口或更清晰的失败反馈。", "用高频动作主观评分和输入延迟数据验证是否变顺。"],
  },
};

const storageKey = "game-experience-saved-reports";

const legacyCategoryMap = {
  praise: "guide",
  improve: "guide",
  retention: "pace",
  operation: "control",
};

const state = {
  markdown: "",
  currentReport: null,
  savedReports: readSavedReports(),
  categoryEditedByUser: false,
};

const gatePage = document.querySelector("#gatePage");
const appShell = document.querySelector("#appShell");
const dimensionGrid = document.querySelector("#dimensionGrid");
const exampleGrid = document.querySelector("#exampleGrid");
const fightingSampleList = document.querySelector("#fightingSampleList");
const priorityRuleList = document.querySelector("#priorityRuleList");
const categorySelect = document.querySelector("#analysisCategory");
const problemInput = document.querySelector("#problemInput");
const playerType = document.querySelector("#playerType");
const gameStage = document.querySelector("#gameStage");
const reportOutput = document.querySelector("#reportOutput");
const reportStatus = document.querySelector("#reportStatus");
const priorityScore = document.querySelector("#priorityScore");
const exportButton = document.querySelector("#exportMarkdown");
const saveButton = document.querySelector("#saveReport");
const savedList = document.querySelector("#savedList");

function enterExperience() {
  gatePage.classList.add("is-opening");
  window.setTimeout(() => {
    gatePage.classList.add("is-hidden");
    appShell.classList.remove("is-hidden");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 620);
}

function returnToGate() {
  appShell.classList.add("is-hidden");
  gatePage.classList.remove("is-hidden", "is-opening");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderCategories() {
  categorySelect.innerHTML = categories
    .map((category) => `<option value="${category.id}">${category.label}</option>`)
    .join("");
  categorySelect.value = "guide";
}

function renderExamples() {
  exampleGrid.innerHTML = typicalExamples
    .map((example, index) => {
      const category = getCategory(example.category);
      return `
        <button class="example-card ${category.tone}" type="button" data-example-index="${index}">
          <strong>${example.title}</strong>
          <span>${category.label}</span>
        </button>
      `;
    })
    .join("");
}

function renderFightingSamples() {
  fightingSampleList.innerHTML = fightingDemoSamples
    .map((sample, index) => {
      const category = getCategory(sample.category);
      return `
        <button class="sample-item" type="button" data-fighting-sample-index="${index}">
          <span class="sample-meta"><span class="category-pill ${category.tone}">${category.label}</span><span class="sample-priority ${sample.priority.toLowerCase()}">${sample.priority}</span><small>${sample.time}</small></span>
          <span>${escapeHtml(sample.text)}</span>
        </button>
      `;
    })
    .join("");
}

function renderPriorityRules() {
  priorityRuleList.innerHTML = priorityRules
    .map(
      (rule) => `
        <article class="priority-rule ${rule.label.toLowerCase()}">
          <strong>${rule.label}</strong>
          <div><h4>${rule.title}</h4><p>${rule.text}</p></div>
        </article>
      `,
    )
    .join("");
}

function renderDimensions() {
  dimensionGrid.innerHTML = dimensions
    .map(
      (dimension) => `
        <label class="dimension-option">
          <input type="checkbox" value="${dimension.id}" ${dimension.core ? "checked" : ""}>
          <span>${dimension.label}</span>
        </label>
      `,
    )
    .join("");
}

function renderSavedReports() {
  if (state.savedReports.length === 0) {
    savedList.innerHTML = `<p class="saved-empty">还没有保存的报告。生成报告后点击「保存报告」即可加入这里。</p>`;
    return;
  }

  savedList.innerHTML = state.savedReports
    .map((report) => {
      const category = getCategory(report.categoryId);
      const priorityDisplay = getPriorityDisplay(report);
      return `
        <article class="saved-item">
          <div>
            <span class="category-pill ${category.tone}">${category.label}</span>
            <h3>${escapeHtml(report.title)}</h3>
            <p>${escapeHtml(report.problem)}</p>
            <small>${report.createdAt} · 优先级 ${priorityDisplay}</small>
          </div>
          <div class="saved-actions">
            <button class="ghost-button" type="button" data-load-report="${report.id}">载入</button>
            <button class="ghost-button danger-button" type="button" data-delete-report="${report.id}">删除</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function getSelectedDimensions() {
  return [...dimensionGrid.querySelectorAll("input:checked")].map((input) =>
    dimensions.find((dimension) => dimension.id === input.value),
  );
}

function getCategory(categoryId) {
  const normalizedId = legacyCategoryMap[categoryId] || categoryId;
  return categories.find((category) => category.id === normalizedId) || categories[2];
}

function setSelectedDimensions(ids) {
  dimensionGrid.querySelectorAll("input").forEach((input) => {
    input.checked = ids.includes(input.value);
  });
}

function inferCategory(feedback) {
  const rules = [
    { id: "bug", keywords: ["崩溃", "闪退", "卡死", "无法继续", "没刷新", "丢失", "报错", "黑屏", "死机"] },
    { id: "balance", keywords: ["太难", "太简单", "伤害", "血量", "掉率", "数值", "战力", "装备", "奖励太少", "资源不够", "过不去"] },
    { id: "guide", keywords: ["不知道", "目标不清", "迷路", "看不懂", "教程", "引导", "下一步", "提示", "不会玩"] },
    { id: "pace", keywords: ["重复", "疲劳", "无聊", "刷", "节奏", "等待", "太慢", "耗时", "肝", "流失"] },
    { id: "monetization", keywords: ["付费", "首充", "礼包", "弹窗", "氪金", "充值", "广告", "强迫", "逼氪"] },
    { id: "control", keywords: ["不跟手", "延迟", "按键", "闪避", "操作", "手感", "卡顿", "命中", "输入"] },
  ];

  const normalized = feedback.toLowerCase();
  const matched = rules
    .map((rule) => ({
      id: rule.id,
      score: rule.keywords.filter((keyword) => normalized.includes(keyword.toLowerCase())).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return matched[0]?.id || "guide";
}

function syncAutoCategory() {
  const feedback = problemInput.value.trim();
  if (!feedback || state.categoryEditedByUser) return;
  categorySelect.value = inferCategory(feedback);
}

function inferPriority(feedback, categoryId) {
  const p0Words = ["崩溃", "闪退", "卡死", "无法继续", "进度丢失", "大量流失", "强迫付费", "无法登录", "黑屏"];
  const p1Words = ["流失", "退出", "差评", "投诉", "失败", "过不去", "太难", "付费", "弹窗", "不跟手", "延迟", "目标不清", "完成率", "重开", "压力曲线"];
  const categoryP0 = categoryId === "bug" && p0Words.some((word) => feedback.includes(word));

  if (categoryP0 || p0Words.some((word) => feedback.includes(word))) {
    return {
      label: "P0",
      reason: "阻断流程、造成进度损失或引发强烈负反馈，需要优先处理。",
    };
  }

  if (["bug", "monetization", "control", "balance"].includes(categoryId) || p1Words.some((word) => feedback.includes(word))) {
    return {
      label: "P1",
      reason: "明显影响完成率、留存、付费转化或核心手感，应进入近期优化。",
    };
  }

  return {
    label: "P2",
    reason: "属于局部体验摩擦或轻量优化点，可排入常规迭代。",
  };
}

function getPriorityDisplay(report) {
  if (report.priorityLabel) return report.priorityLabel;
  if (typeof report.priority === "number") return `${report.priority}/10`;
  return "--";
}

function buildReport() {
  const problem = problemInput.value.trim();
  const selected = getSelectedDimensions();
  syncAutoCategory();
  const category = getCategory(categorySelect.value);
  const categoryDetail = categoryAdvice[category.id];

  if (!problem) {
    problemInput.focus();
    reportStatus.textContent = "需要问题";
    return;
  }

  if (selected.length === 0) {
    reportStatus.textContent = "请选择维度";
    return;
  }

  const priority = inferPriority(problem, category.id);
  const stage = gameStage.value;
  const audience = playerType.value;
  const hypotheses = selected.map((dimension) => ({
    label: dimension.label,
    ...dimensionAdvice[dimension.id],
  }));
  const solutions = buildSolutions(problem, category, selected);
  const suggestions = categoryDetail.suggestions;
  const metrics = categoryDetail.metrics;

  const diagnosis = [
    `自动分类结果：${category.label}`,
    `优先级：${priority.label}`,
    `目标玩家：${audience}`,
    `体验阶段：${stage}`,
    categoryDetail.judgement,
    priority.reason,
  ];

  const title = makeReportTitle(problem, category.label);
  const markdown = [
    `# ${title}`,
    "",
    `## 玩家反馈`,
    problem,
    "",
    "## 分析范围",
    `- 自动分类结果：${category.label}`,
    `- 玩家类型：${audience}`,
    `- 体验阶段：${stage}`,
    `- 分析维度：${selected.map((dimension) => dimension.label).join("、")}`,
    `- 优先级：${priority.label}`,
    `- 优先级依据：${priority.reason}`,
    "",
    "## 问题判断",
    ...diagnosis.map((item) => `- ${item}`),
    "",
    "## 可能原因",
    ...categoryDetail.causes.map((item) => `- ${item}`),
    "",
    "## 改进建议",
    ...suggestions.map((item) => `- ${item}`),
    "",
    "## 验证指标",
    ...metrics.map((item) => `- ${item}`),
    "",
    "## 维度拆解",
    ...hypotheses.flatMap((item) => [
      `### ${item.label}`,
      `- 可能问题：${item.issue}`,
      `- 设计建议：${item.action}`,
      `- 验证指标：${item.metric}`,
      "",
    ]),
    "## 参考解决方案",
    ...solutions.flatMap((solution, index) => [
      `### ${index + 1}. ${solution.title}`,
      `- 适用反馈：${solution.target}`,
      `- 处理动作：${solution.action}`,
      `- 验证方式：${solution.validation}`,
      "",
    ]),
    "## 下一步行动",
    `- ${categoryDetail.nextAction}`,
    "- 观察 24-72 小时内的关键指标变化，优先判断问题是否被准确命中。",
    "- 如果指标改善但主观反馈下降，再回头压缩提示打扰、文本长度或弹窗频次。",
    "",
    "## 风险提醒",
    "- 不要一次改太多系统，否则难以判断真正有效的体验因素。",
    "- 不要只看单一指标，必须同时看行为数据和玩家主观反馈。",
  ].join("\n");

  state.markdown = markdown;
  state.currentReport = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    title,
    problem,
    categoryId: category.id,
    audience,
    stage,
    dimensions: selected.map((dimension) => dimension.id),
    priorityLabel: priority.label,
    priorityReason: priority.reason,
    priority,
    suggestions,
    metrics,
    markdown,
    solutions,
    createdAt: formatDateTime(new Date()),
  };

  priorityScore.textContent = priority.label;
  reportStatus.textContent = "报告已生成";
  exportButton.disabled = false;
  saveButton.disabled = false;

  reportOutput.classList.remove("empty-state");
  reportOutput.innerHTML = `
    <section class="report-section">
      <h3>玩家反馈</h3>
      <p>${escapeHtml(problem)}</p>
      <div class="tag-row">
        <span class="category-pill ${category.tone}">${category.label}</span>
        <span class="tag">${priority.label}</span>
        <span class="tag">${audience}</span>
        <span class="tag">${stage}</span>
        ${selected.map((dimension) => `<span class="tag">${dimension.label}</span>`).join("")}
      </div>
    </section>
    <section class="report-section">
      <h3>问题判断</h3>
      <ul class="finding-list">${diagnosis.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section class="report-section">
      <h3>可能原因</h3>
      <ul class="finding-list">${categoryDetail.causes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section class="report-section">
      <h3>改进建议</h3>
      <ul class="finding-list">
        ${suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
    <section class="report-section solution-section">
      <h3>参考解决方案</h3>
      <div class="solution-list">
        ${solutions
          .map(
            (solution, index) => `
              <article class="solution-card">
                <div class="solution-index">${index + 1}</div>
                <div>
                  <h4>${solution.title}</h4>
                  <p><strong>适用反馈：</strong>${solution.target}</p>
                  <p><strong>处理动作：</strong>${solution.action}</p>
                  <p><strong>验证方式：</strong>${solution.validation}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="report-section">
      <h3>维度拆解</h3>
      <ul class="finding-list">
        ${hypotheses
          .map(
            (item) => `
              <li>
                <strong>${item.label}</strong><br>
                可能问题：${item.issue}<br>
                设计建议：${item.action}
              </li>
            `,
          )
          .join("")}
      </ul>
    </section>
    <section class="report-section">
      <h3>验证指标</h3>
      <ul class="metric-list">
        ${metrics.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        ${hypotheses.map((item) => `<li>${item.label}：${item.metric}</li>`).join("")}
      </ul>
    </section>
    <section class="report-section">
      <h3>下一步行动</h3>
      <p>${escapeHtml(categoryDetail.nextAction)}</p>
    </section>
  `;
}

function buildSolutions(problem, category, selectedDimensions) {
  const categoryPlan = categorySolutions[category.id] || categorySolutions.guide;
  const dimensionPlans = selectedDimensions.map((dimension) => {
    const advice = dimensionAdvice[dimension.id];
    return {
      title: `${dimension.label}解决方案`,
      target: advice.issue,
      action: advice.action,
      validation: advice.metric,
    };
  });

  const problemPlan = inferProblemSolution(problem, category);
  return [
    {
      title: categoryPlan.title,
      target: `当前反馈被归类为「${category.label}」。`,
      action: categoryPlan.steps.join(" "),
      validation: categoryAdvice[category.id].metrics.join("、"),
    },
    problemPlan,
    ...dimensionPlans,
  ];
}

function inferProblemSolution(problem, category) {
  const rules = [
    {
      keywords: ["卡死", "无法继续", "没刷新", "崩溃", "丢失"],
      title: "阻断问题兜底方案",
      action: "先提供临时绕行提示或自动修复入口，同时把异常节点记录到日志；修复后给受影响玩家补偿或进度恢复。",
      validation: "复现路径通过率、异常日志数量、客服相关工单量。",
    },
    {
      keywords: ["太难", "伤害", "掉率", "数值", "资源不够", "过不去"],
      title: "数值压力校准方案",
      action: "先定位失败率和资源缺口最高的节点，做小幅伤害、血量、掉率或保底调整，避免一次性改变整条成长曲线。",
      validation: "失败率、通关率、战斗时长、资源消耗/获得比。",
    },
    {
      keywords: ["目标不清", "不知道", "迷路", "看不懂"],
      title: "目标引导补强方案",
      action: "在关键节点补充当前目标、下一步动作和失败后建议；把长文本拆成短提示，并允许玩家回看。",
      validation: "目标提示查看率、提示后通过率、同节点停留时长。",
    },
    {
      keywords: ["重复", "疲劳", "无聊", "刷"],
      title: "重复体验降噪方案",
      action: "给重复玩法加入随机事件、阶段目标或扫荡条件；把低价值等待合并到一次领取。",
      validation: "重复玩法进入率、单日重复次数、3 日回访率。",
    },
    {
      keywords: ["弹窗", "礼包", "付费", "首充"],
      title: "付费打扰控制方案",
      action: "减少连续弹窗，把付费推荐延后到玩家完成目标或产生资源需求之后，并提供明确关闭路径。",
      validation: "弹窗关闭率、付费转化率、弹窗后退出率。",
    },
    {
      keywords: ["不跟手", "延迟", "按键", "闪避", "操作"],
      title: "操作响应修复方案",
      action: "检查输入缓冲、动画取消窗口和反馈延迟；优先修复最高频动作，再做手感参数对比测试。",
      validation: "输入延迟、误操作反馈量、动作主观评分。",
    },
  ];

  const matched = rules.find((rule) => rule.keywords.some((keyword) => problem.includes(keyword)));
  if (matched) {
    return {
      title: matched.title,
      target: "从输入反馈中识别出的高频问题。",
      action: matched.action,
      validation: matched.validation,
    };
  }

  return {
    title: "通用负面反馈处理方案",
    target: `当前反馈需要结合「${category.label}」分类进一步验证。`,
    action: "先拆成可复现现象、玩家感受、影响节点和可能原因，再选择 1 个最小改动上线验证。",
    validation: categoryAdvice[category.id].metrics.join("、"),
  };
}

function saveCurrentReport() {
  if (!state.currentReport) return;

  const savedReport = {
    ...state.currentReport,
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    createdAt: formatDateTime(new Date()),
  };
  state.savedReports = [savedReport, ...state.savedReports].slice(0, 12);
  writeSavedReports();
  renderSavedReports();
  reportStatus.textContent = "报告已保存";
}

function loadSavedReport(reportId) {
  const report = state.savedReports.find((item) => item.id === reportId);
  if (!report) return;

  state.categoryEditedByUser = true;
  categorySelect.value = getCategory(report.categoryId).id;
  problemInput.value = report.problem;
  playerType.value = report.audience;
  gameStage.value = report.stage;
  setSelectedDimensions(report.dimensions || dimensions.filter((dimension) => dimension.core).map((dimension) => dimension.id));
  state.markdown = report.markdown;
  buildReport();
  reportStatus.textContent = "已载入保存报告";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteSavedReport(reportId) {
  state.savedReports = state.savedReports.filter((item) => item.id !== reportId);
  writeSavedReports();
  renderSavedReports();
  reportStatus.textContent = "已删除保存报告";
}

function exportMarkdown() {
  if (!state.markdown) return;

  const blob = new Blob([state.markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "game-experience-analysis-report.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  reportStatus.textContent = "Markdown 已导出";
}

function applyExample(index) {
  const example = typicalExamples[index];
  if (!example) return;

  state.categoryEditedByUser = false;
  categorySelect.value = example.category;
  problemInput.value = example.problem;
  syncAutoCategory();
  playerType.value = example.playerType;
  gameStage.value = example.gameStage;
  setSelectedDimensions(example.dimensions);
  buildReport();
}

function applyFightingSample(index) {
  const sample = fightingDemoSamples[index];
  if (!sample) return;

  state.categoryEditedByUser = false;
  problemInput.value = sample.text;
  categorySelect.value = sample.category;
  playerType.value = sample.playerType;
  gameStage.value = sample.stage;
  setSelectedDimensions(sample.dimensions);
  buildReport();
  reportStatus.textContent = `已载入 Fighting Demo 模拟反馈 · ${sample.priority}`;
  document.querySelector(".report-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearInput() {
  problemInput.value = "";
  state.categoryEditedByUser = false;
  categorySelect.value = "guide";
  priorityScore.textContent = "--";
  state.markdown = "";
  state.currentReport = null;
  exportButton.disabled = true;
  saveButton.disabled = true;
  reportStatus.textContent = "等待输入";
  reportOutput.classList.add("empty-state");
  reportOutput.innerHTML = `
    <h3>输入玩家反馈后生成报告</h3>
    <p>报告会包含自动分类、P0/P1/P2 优先级、改进建议、验证指标和下一步行动。</p>
  `;
}

function readSavedReports() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function writeSavedReports() {
  localStorage.setItem(storageKey, JSON.stringify(state.savedReports));
}

function makeReportTitle(problem, categoryLabel) {
  const shortProblem = problem.replace(/\s+/g, "").slice(0, 16);
  return `${categoryLabel}分析：${shortProblem || "未命名问题"}`;
}

function formatDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#enterApp").addEventListener("click", enterExperience);
document.querySelector("#backToGate").addEventListener("click", returnToGate);
document.querySelector("#clearInput").addEventListener("click", clearInput);
document.querySelector("#selectCore").addEventListener("click", () => {
  setSelectedDimensions(dimensions.filter((dimension) => dimension.core).map((dimension) => dimension.id));
});
document.querySelector("#generateReport").addEventListener("click", buildReport);
exportButton.addEventListener("click", exportMarkdown);
saveButton.addEventListener("click", saveCurrentReport);
problemInput.addEventListener("input", () => {
  syncAutoCategory();
});
categorySelect.addEventListener("change", () => {
  state.categoryEditedByUser = true;
});
document.querySelector("#clearSaved").addEventListener("click", () => {
  state.savedReports = [];
  writeSavedReports();
  renderSavedReports();
  reportStatus.textContent = "已清空保存";
});

exampleGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-example-index]");
  if (!button) return;
  applyExample(Number(button.dataset.exampleIndex));
});

fightingSampleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-fighting-sample-index]");
  if (!button) return;
  applyFightingSample(Number(button.dataset.fightingSampleIndex));
});

document.querySelector("#loadFightingCase").addEventListener("click", () => {
  applyFightingSample(6);
});

savedList.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load-report]");
  const deleteButton = event.target.closest("[data-delete-report]");
  if (loadButton) loadSavedReport(loadButton.dataset.loadReport);
  if (deleteButton) deleteSavedReport(deleteButton.dataset.deleteReport);
});

renderCategories();
renderExamples();
renderFightingSamples();
renderPriorityRules();
renderDimensions();
renderSavedReports();
