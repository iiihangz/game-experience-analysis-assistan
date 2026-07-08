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
  { id: "bug", label: "Bug / 异常", tone: "danger" },
  { id: "praise", label: "好评亮点", tone: "success" },
  { id: "improve", label: "可优化点", tone: "warning" },
  { id: "retention", label: "留存风险", tone: "danger" },
  { id: "monetization", label: "付费体验", tone: "info" },
  { id: "operation", label: "操作手感", tone: "neutral" },
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
    category: "praise",
    title: "战斗打击感好",
    problem: "玩家普遍反馈近战攻击命中反馈很爽，音效、屏幕震动和敌人受击动画配合自然，愿意反复挑战精英怪。",
    playerType: "核心玩家",
    gameStage: "核心循环",
    dimensions: ["feedback", "control", "immersion"],
  },
  {
    category: "improve",
    title: "新手目标不清",
    problem: "新手玩家在第 3 关频繁流失。访谈里他们说目标不清楚，失败后不知道应该换策略还是继续练操作。",
    playerType: "新手玩家",
    gameStage: "新手引导",
    dimensions: ["goal", "feedback", "difficulty", "pace"],
  },
  {
    category: "retention",
    title: "重复刷图疲劳",
    problem: "玩家进入中期后每天需要重复刷同一张资源图，奖励变化少，连续 3 天后活跃率明显下降。",
    playerType: "轻度玩家",
    gameStage: "中后期留存",
    dimensions: ["pace", "difficulty", "immersion"],
  },
  {
    category: "monetization",
    title: "礼包压迫感",
    problem: "玩家觉得首充礼包弹窗出现太早，刚完成教学就连续看到 3 个付费入口，影响继续探索的意愿。",
    playerType: "新手玩家",
    gameStage: "付费转化",
    dimensions: ["pace", "goal", "immersion"],
  },
  {
    category: "operation",
    title: "闪避不跟手",
    problem: "玩家反馈闪避按键有时没有立刻响应，尤其在攻击动画结束前输入会丢失，失败时容易归因于操作不顺。",
    playerType: "核心玩家",
    gameStage: "核心循环",
    dimensions: ["control", "feedback", "difficulty"],
  },
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
    judgement: "这类问题优先按阻断体验处理，重点确认复现路径、影响范围和临时绕行方案。",
    experiment: "先建立复现用例和日志埋点，再验证修复后任务完成率是否回升。",
  },
  praise: {
    judgement: "这是可复用的体验资产，应该拆解出触发好评的设计要素，迁移到相邻玩法。",
    experiment: "保留核心反馈组合，做相邻场景复用测试，观察重复游玩率和主动分享率。",
  },
  improve: {
    judgement: "这是体验摩擦点，通常不会马上阻断，但会持续消耗耐心和理解成本。",
    experiment: "做低成本版本优化，对比优化前后的完成率、停留时长和负面反馈量。",
  },
  retention: {
    judgement: "这是留存风险，需要判断玩家是在缺少目标、缺少变化，还是奖励预期被耗尽。",
    experiment: "给重复节点加入节奏变化或短期目标，观察 3 日和 7 日回访变化。",
  },
  monetization: {
    judgement: "这是商业化触点问题，重点是判断付费入口是否打断了玩家的自主感。",
    experiment: "调整弹窗时机、频次和上下文，观察转化率、关闭率和后续留存。",
  },
  operation: {
    judgement: "这是手感和可控性问题，玩家会把它直接归因到公平性和技术质量。",
    experiment: "检查输入缓冲和反馈延迟，做高频动作的逐帧验证和主观评分测试。",
  },
};

const categorySolutions = {
  bug: {
    title: "异常定位与修复",
    steps: ["记录稳定复现路径、账号状态、关卡节点和设备信息。", "加日志确认触发条件，先修阻断路径，再补偿受影响玩家。", "修复后用同一复现路径回归，并观察任务完成率和客服反馈量。"],
  },
  praise: {
    title: "亮点复用与放大",
    steps: ["提炼好评来源：反馈、节奏、奖励、情绪或社交触发点。", "保留原体验的关键手感，不要为了扩展而稀释核心爽点。", "把亮点迁移到相邻玩法，并观察复玩率、分享率和正向评论。"],
  },
  improve: {
    title: "低成本体验优化",
    steps: ["先找最小可改点，优先解决玩家最常提到的理解成本或等待成本。", "做一版轻量提示、流程缩短或反馈增强，不一次重做整个系统。", "用完成率、停留时长和负面反馈量判断是否值得继续投入。"],
  },
  retention: {
    title: "留存节奏修复",
    steps: ["定位流失前 1-2 个关键节点，判断是目标断档、奖励疲劳还是重复劳动。", "加入短期目标、阶段奖励或内容变化，降低每日重复感。", "观察 3 日、7 日回访和重复玩法进入率。"],
  },
  monetization: {
    title: "付费触点降压",
    steps: ["降低弹窗频次，把付费入口放到玩家产生需求之后。", "给非付费玩家保留明确成长路径，避免让付费像唯一解。", "同时观察付费转化、关闭率、次日留存和负面反馈。"],
  },
  operation: {
    title: "手感与输入校准",
    steps: ["逐帧检查输入、动画锁定、镜头和命中反馈的时间关系。", "优先加入输入缓冲、取消窗口或更清晰的失败反馈。", "用高频动作主观评分和输入延迟数据验证是否变顺。"],
  },
};

const storageKey = "game-experience-saved-reports";

const state = {
  markdown: "",
  currentReport: null,
  savedReports: readSavedReports(),
};

const gatePage = document.querySelector("#gatePage");
const appShell = document.querySelector("#appShell");
const dimensionGrid = document.querySelector("#dimensionGrid");
const exampleGrid = document.querySelector("#exampleGrid");
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
  categorySelect.value = "improve";
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
      return `
        <article class="saved-item">
          <div>
            <span class="category-pill ${category.tone}">${category.label}</span>
            <h3>${escapeHtml(report.title)}</h3>
            <p>${escapeHtml(report.problem)}</p>
            <small>${report.createdAt} · 优先级 ${report.priority}/10</small>
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
  return categories.find((category) => category.id === categoryId) || categories[2];
}

function setSelectedDimensions(ids) {
  dimensionGrid.querySelectorAll("input").forEach((input) => {
    input.checked = ids.includes(input.value);
  });
}

function inferPriority(problem, selectedCount, categoryId) {
  const urgentWords = ["流失", "退出", "差评", "付费", "卡关", "崩溃", "投诉", "失败", "卡死", "丢失"];
  const categoryWeight = {
    bug: 3,
    praise: -1,
    improve: 1,
    retention: 3,
    monetization: 2,
    operation: 2,
  };
  const urgentHits = urgentWords.filter((word) => problem.includes(word)).length;
  return Math.min(10, Math.max(3, 4 + urgentHits + Math.ceil(selectedCount / 2) + categoryWeight[categoryId]));
}

function buildReport() {
  const problem = problemInput.value.trim();
  const selected = getSelectedDimensions();
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

  const priority = inferPriority(problem, selected.length, category.id);
  const stage = gameStage.value;
  const audience = playerType.value;
  const hypotheses = selected.map((dimension) => ({
    label: dimension.label,
    ...dimensionAdvice[dimension.id],
  }));
  const solutions = buildSolutions(problem, category, selected);

  const diagnosis = [
    `分析分类：${category.label}`,
    `目标玩家：${audience}`,
    `体验阶段：${stage}`,
    categoryDetail.judgement,
  ];

  const title = makeReportTitle(problem, category.label);
  const markdown = [
    `# ${title}`,
    "",
    `## 体验问题`,
    problem,
    "",
    "## 分析范围",
    `- 分析分类：${category.label}`,
    `- 玩家类型：${audience}`,
    `- 体验阶段：${stage}`,
    `- 分析维度：${selected.map((dimension) => dimension.label).join("、")}`,
    `- 优先级：${priority}/10`,
    "",
    "## 初步判断",
    ...diagnosis.map((item) => `- ${item}`),
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
    "## 下一步实验",
    `- ${categoryDetail.experiment}`,
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
    priority,
    markdown,
    solutions,
    createdAt: formatDateTime(new Date()),
  };

  priorityScore.textContent = priority;
  reportStatus.textContent = "报告已生成";
  exportButton.disabled = false;
  saveButton.disabled = false;

  reportOutput.classList.remove("empty-state");
  reportOutput.innerHTML = `
    <section class="report-section">
      <h3>体验问题</h3>
      <p>${escapeHtml(problem)}</p>
      <div class="tag-row">
        <span class="category-pill ${category.tone}">${category.label}</span>
        <span class="tag">${audience}</span>
        <span class="tag">${stage}</span>
        ${selected.map((dimension) => `<span class="tag">${dimension.label}</span>`).join("")}
      </div>
    </section>
    <section class="report-section">
      <h3>初步判断</h3>
      <ul class="finding-list">${diagnosis.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section class="report-section">
      <h3>分类建议</h3>
      <ul class="finding-list">
        <li><strong>${category.label}</strong><br>${categoryDetail.judgement}</li>
        <li>${categoryDetail.experiment}</li>
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
        ${hypotheses.map((item) => `<li>${item.label}：${item.metric}</li>`).join("")}
      </ul>
    </section>
  `;
}

function buildSolutions(problem, category, selectedDimensions) {
  const categoryPlan = categorySolutions[category.id] || categorySolutions.improve;
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
      validation: categoryAdvice[category.id].experiment,
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
    validation: "负面反馈量、关键行为转化率、玩家主观满意度。",
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

  categorySelect.value = report.categoryId;
  problemInput.value = report.problem;
  playerType.value = report.audience;
  gameStage.value = report.stage;
  setSelectedDimensions(report.dimensions);
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

  categorySelect.value = example.category;
  problemInput.value = example.problem;
  playerType.value = example.playerType;
  gameStage.value = example.gameStage;
  setSelectedDimensions(example.dimensions);
  buildReport();
}

function clearInput() {
  problemInput.value = "";
  priorityScore.textContent = "--";
  state.markdown = "";
  state.currentReport = null;
  exportButton.disabled = true;
  saveButton.disabled = true;
  reportStatus.textContent = "等待输入";
  reportOutput.classList.add("empty-state");
  reportOutput.innerHTML = `
    <h3>输入体验问题后生成报告</h3>
    <p>报告会包含问题判断、分类拆解、设计建议、验证指标和下一步实验。</p>
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

savedList.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load-report]");
  const deleteButton = event.target.closest("[data-delete-report]");
  if (loadButton) loadSavedReport(loadButton.dataset.loadReport);
  if (deleteButton) deleteSavedReport(deleteButton.dataset.deleteReport);
});

renderCategories();
renderExamples();
renderDimensions();
renderSavedReports();
