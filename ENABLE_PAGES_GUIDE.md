# GitHub Pages启用指南

## 🚀 快速启用步骤

### 方法1：通过GitHub网页界面（推荐）
1. **访问仓库设置页面**：
   ```
   https://github.com/NormanJelly/y2k-portfolio/settings/pages
   ```

2. **配置部署设置**：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/ (root)`
   - 点击 **Save**

3. **等待部署完成**：
   - 页面会显示 "Your site is ready to be published at..."
   - 等待约1-2分钟，状态变为 "Your site is published at..."

4. **访问你的网站**：
   ```
   https://normanjelly.github.io/y2k-portfolio/
   ```

### 方法2：通过GitHub CLI（如果已安装）
```bash
# 登录GitHub CLI（如果未登录）
gh auth login

# 启用GitHub Pages
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/NormanJelly/y2k-portfolio/pages \
  -f source@='{"branch":"main","path":"/"}'
```

## 📊 验证部署状态

### 检查部署状态
1. **访问Actions页面**：
   ```
   https://github.com/NormanJelly/y2k-portfolio/actions
   ```
   - 查看 "Deploy to GitHub Pages" 工作流状态
   - 应该是绿色✅表示成功

2. **检查Pages设置**：
   ```
   https://github.com/NormanJelly/y2k-portfolio/settings/pages
   ```
   - 查看部署状态和URL

### 测试网站访问
```bash
# 使用curl测试
curl -I https://normanjelly.github.io/y2k-portfolio/

# 预期响应
# HTTP/2 200
# server: GitHub.com
# content-type: text/html; charset=utf-8
```

## 🔧 故障排除

### 常见问题及解决方案

#### 1. Pages未显示或404错误
**可能原因**：
- 部署尚未完成（等待1-2分钟）
- 分支或文件夹配置错误
- 仓库不是公开的

**解决方案**：
```bash
# 检查仓库可见性
# 访问：https://github.com/NormanJelly/y2k-portfolio/settings
# 确保仓库是 Public

# 重新触发部署
# 在Actions页面点击 "Re-run all jobs"
```

#### 2. 样式或脚本加载失败
**可能原因**：
- 相对路径问题
- 缓存问题

**解决方案**：
```html
<!-- 在index.html中确保使用相对路径 -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

#### 3. 自定义域名设置（可选）
如果你有自己的域名：
1. 在Pages设置中添加自定义域名
2. 在DNS服务商添加CNAME记录：
   ```
   yourdomain.com CNAME normanjelly.github.io
   www.yourdomain.com CNAME normanjelly.github.io
   ```
3. 等待DNS传播（最多24小时）

## 🎯 自动化部署工作流

我已经为你创建了GitHub Actions工作流，位于：
```
.github/workflows/deploy.yml
```

### 工作流功能：
- ✅ 自动监听main分支的push事件
- ✅ 自动构建和部署到GitHub Pages
- ✅ 提供部署状态和URL
- ✅ 支持手动触发部署

### 手动触发部署：
1. 访问Actions页面
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow"
4. 选择main分支，点击运行

## 📱 网站功能验证清单

启用Pages后，请验证以下功能：

### 基础功能
- [ ] 网站可访问（无404错误）
- [ ] 所有样式加载正常
- [ ] JavaScript功能正常工作
- [ ] 响应式设计适配移动端

### Y2K特色功能
- [ ] 加载动画正常显示
- [ ] 霓虹渐变效果正常
- [ ] 闪烁动画正常工作
- [ ] 鼠标轨迹特效正常
- [ ] 实时时钟更新

### 交互功能
- [ ] 导航菜单点击正常
- [ ] 项目卡片悬停效果
- [ ] 联系表单验证
- [ ] 弹窗系统正常

## 🚀 快速测试命令

我已经创建了本地测试脚本：

```bash
# 本地测试（Python）
./test-local.sh
# 访问：http://localhost:8080

# 本地测试（Node.js）
./test-node.sh
# 访问：http://localhost:3000
```

## 📞 技术支持

如果遇到问题：

### 1. 检查日志
```bash
# 查看GitHub Actions日志
# 访问：https://github.com/NormanJelly/y2k-portfolio/actions

# 查看部署报告
cat DEPLOYMENT_REPORT.md
```

### 2. 常见资源
- GitHub Pages文档：https://docs.github.com/pages
- 故障排除：https://docs.github.com/pages/getting-started/troubleshooting
- 社区支持：GitHub Discussions

### 3. 紧急恢复
如果网站出现问题，可以：
1. 回滚到之前的提交
2. 禁用并重新启用Pages
3. 使用本地备份测试

## 🎉 成功标志

当以下条件满足时，表示部署成功：

1. ✅ GitHub Pages设置显示绿色勾选
2. ✅ 网站URL可访问且返回200状态码
3. ✅ 所有页面功能正常工作
4. ✅ GitHub Actions部署工作流成功完成

---

**部署状态最后检查**: $(date)

**预计上线时间**: 启用Pages后1-2分钟内

**永久访问地址**: https://normanjelly.github.io/y2k-portfolio/

**仓库地址**: https://github.com/NormanJelly/y2k-portfolio

**如有问题，请参考DEPLOYMENT_REPORT.md获取完整部署报告**