/* Penny AI Teaching 内容入口。价格、课程大纲、网址等真实资料到齐后，在这里更新。 */
window.PENNY_SITE = {
  name: "Penny AI Teaching",
  aboutRole: "英语教师｜AI 教师培训者",
  about: [
    "深耕剑桥原版英语教学的一线教师，AI 教师培训者，已帮助约 150 位英语老师探索 AI 教学实践。",
    "专注于将 AI 技术与真实教学需求结合，分享实用教学资源、AI 备课工作流和 Skill，帮助英语老师减少重复工作，建立更高效、可持续的教学系统。"
  ],
  aboutMotto: "让 AI 真正服务于教学，让老师专注于教育。",
  resourceGroups: [
    {
      id: "think-resources", title: "Think 教材配套资源",
      items: [
        {
          title: "Think 知识库",
          description: "Think 0–Think 2 全册知识整理 · 付费资料",
          url: "",
          note: "Think 知识库为付费资料，购买后由 Penny 发送正式交付链接。\n想了解内容或购买，请通过「联系方式」里的微信找 Penny。"
        },
        {
          title: "Think 练习册",
          description: "Think 配套练习册 · 付费资料",
          url: "",
          note: "Think 练习册为付费资料，购买后由 Penny 发送正式交付链接。\n想了解内容或购买，请通过「联系方式」里的微信找 Penny。"
        },
        {
          title: "Think 课件",
          description: "Think 配套课件 · 付费资料",
          url: "",
          note: "Think 课件为付费资料，购买后由 Penny 发送正式交付链接。\n想了解内容或购买，请通过「联系方式」里的微信找 Penny。"
        }
      ]
    }
  ],
  resources: [
    {
      title: "Skill 合集",
      description: "英语教师 AI 教学工具箱：7 大类 Skill 已上线，覆盖备课、练习设计、作业批改与教师复盘",
      url: "",
      hasRecordings: true,
      recordings: [],
      recordingsNote: "使用方法录播暂未上线，上线后会在这里补充。",
      note: "Skill 全套合集购买后交付，含安装与使用说明。\n想了解或购买，请通过「联系方式」里的微信找 Penny。",
      details: [
        { title: "情境词汇 Skill", description: "根据 CEFR 水平生成语境化词汇练习，帮助学生理解并运用词汇。" },
        { title: "语法 Skill", description: "结合真实语境设计语法讲解与分层练习，促进理解和迁移。" },
        { title: "Writing Skill", description: "提供分级写作任务、写作支架及评价标准。" },
        { title: "听力练习纸 Skill", description: "围绕听力主题生成分层听力理解任务与练习纸，配套音频与答案解析。" },
        { title: "Homework Skill", description: "根据教学内容生成个性化课后练习，支持互动答题与自动批改。" },
        { title: "教师自我练习与复盘 Skill", description: "辅助教师分析课堂表现、发现问题并优化教学。" },
        { title: "写作作业批改 Skill", description: "分析学生作文中的语言问题，提供修改建议和针对性训练。" },
        { title: "阅读 Skill", description: "阅读理解任务与分层练习设计。", status: "筹备中" },
        { title: "口语 Skill", description: "口语任务、情景对话与课堂口语活动设计。", status: "筹备中" }
      ]
    }
  ],
  plannedResources: ["RE 课件"],
  courses: [
    {
      id: "course-gemini",
      title: "Gemini + NotebookLM 基础营",
      example: false,
      description: "帮助英语教师用 AI 完成系统备课、课件制作及教学资料生成。",
      meta: ["3 天录播", "可反复观看", "¥399"],
      outlineHeading: "课程大纲与报名",
      outline: [
        "Day 1｜Gemini + NotebookLM 基础操作、教材分析、单元拆分与单课教学骨架",
        "Day 2｜Lesson Plan、PPT 大纲、课堂 PPT 制作与教师逐字稿",
        "Day 3｜分级练习纸、课后任务、家长课堂简报及教学资料质检",
        "配套｜教学规则文件、提示词模板、实操案例",
        "课时与形式｜3 天核心课程，录播学习，可反复观看",
        "价格与报名｜¥399，微信私信报名，购买后获取录播课程及配套资料"
      ]
    },
    {
      id: "course-codex",
      title: "Codex 进阶营",
      example: false,
      description: "教英语教师用 Codex 搭建可复用、可个性化的 AI 备课教研系统。",
      status: "下一期时间待定",
      meta: ["5 次 × 120 分钟", "直播 + 回放", "¥999"],
      outlineHeading: "课程大纲与报名",
      outline: [
        "Day 1｜Codex 基础操作、Project 架构与 AI 教研工作台搭建",
        "Day 2｜教材管理、学生档案、Teaching Rules 与个性化教学设置",
        "Day 3｜自动化备课工作流：Lesson Plan、PPT Outline 与课堂课件",
        "Day 4｜Skill 设计、封装与调用：打造自己的 Worksheet / Homework Skill",
        "Day 5｜Teaching Agent 质量控制、自动检查、修复循环与系统复用",
        "课时与形式｜5 次 × 120 分钟，直播实操 + 课程回放 + 2 周陪跑答疑",
        "价格与报名｜¥999，微信私信「进阶营」报名",
        "赠送｜前 10 名报名赠送情境词汇 Skill；Starter Kit 为全体学员提供的基础资料",
        "开营｜下一期时间待定，可先微信预约占位"
      ]
    }
  ],
  membership: { title: "付费会员专区", pageUrl: "membership.html", price: "¥299 / 年" },
  rechargeUrl: "",
  rechargeUrlB64: "aHR0cHM6Ly9wZW5ueWFpaHViLmNvbS8=",
  rechargeNote: "充值入口暂未开放。添加微信 fgpenny2022 获取。",
  contact: {
    email: "pennymoon0531@gmail.com", qqEmail: "1364140539@qq.com",
    wechat: "fgpenny2022", otherUrl: ""
  }
};
