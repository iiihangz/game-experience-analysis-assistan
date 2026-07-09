# 作品集快速展示说明

这是一个面向游戏体验反馈分析的前端工具原型，适合用于作品集展示、岗位负责人预览和面试前快速演示。

## 推荐方式：Netlify Drop

1. 在本项目目录运行：

```powershell
.\make-showcase-package.ps1
```

2. 打开：

```text
https://app.netlify.com/drop
```

3. 将下面这个文件夹拖进网页：

```text
portfolio-package\netlify-drop\game-experience-analysis-assistant
```

4. Netlify 会自动生成一个可访问的网址，把网址发给岗位负责人即可。

## 备用方式：发送 zip

脚本也会生成：

```text
portfolio-package\game-experience-analysis-assistant.zip
```

如果对方只是想本地查看，可以解压后双击 `index.html`。

## 展示建议

- 先从入口页进入体验分析工作台。
- 输入一段玩家反馈，展示自动分类、优先级判断和结构化报告。
- 展示典型反馈示例、分析维度选择、保存报告和导出 Markdown。
- 展示 `assets/demo.mp4` 或页面截图，作为作品集里的补充材料。
