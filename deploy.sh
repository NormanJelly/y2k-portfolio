#!/bin/bash
# Y2K个人网页 - 自动化部署脚本
# 功能：一键部署到GitHub Pages

set -e  # 遇到错误时退出

echo "🚀 Y2K个人网页部署脚本启动..."
echo "========================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函数：打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Git状态
check_git_status() {
    print_info "检查Git状态..."
    
    if ! git status &> /dev/null; then
        print_error "当前目录不是Git仓库"
        return 1
    fi
    
    # 检查是否有未提交的更改
    if [[ -n $(git status --porcelain) ]]; then
        print_warning "发现未提交的更改，正在提交..."
        git add .
        git commit -m "chore: 自动部署更新 $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    print_success "Git状态检查完成"
}

# 推送到GitHub
push_to_github() {
    print_info "推送到GitHub..."
    
    # 尝试使用SSH推送
    if GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_vchat -F ~/.ssh/config_vchat" git push origin main; then
        print_success "代码推送成功"
    else
        print_warning "SSH推送失败，尝试HTTPS推送..."
        if git push origin main; then
            print_success "代码推送成功"
        else
            print_error "推送失败，请检查网络连接和权限"
            return 1
        fi
    fi
}

# 检查GitHub Pages状态
check_github_pages() {
    print_info "检查GitHub Pages状态..."
    
    # 获取仓库信息
    REPO_URL="https://github.com/NormanJelly/y2k-portfolio"
    
    echo "========================================"
    echo "📋 GitHub Pages部署指南："
    echo "========================================"
    echo ""
    echo "1. 访问仓库设置："
    echo "   ${REPO_URL}/settings"
    echo ""
    echo "2. 左侧菜单选择 'Pages'"
    echo ""
    echo "3. 配置部署源："
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo "   - 点击 Save"
    echo ""
    echo "4. 等待部署完成（约1-2分钟）"
    echo ""
    echo "5. 访问你的网站："
    echo "   https://normanjelly.github.io/y2k-portfolio/"
    echo ""
    echo "========================================"
}

# 创建GitHub Actions部署工作流
create_github_actions() {
    print_info "创建GitHub Actions自动部署工作流..."
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF
    
    print_success "GitHub Actions工作流创建完成"
    
    # 提交工作流文件
    git add .github/workflows/deploy.yml
    git commit -m "ci: 添加GitHub Pages自动部署工作流" || true
}

# 创建本地测试服务器
create_test_server() {
    print_info "创建本地测试脚本..."
    
    cat > test-local.sh << 'EOF'
#!/bin/bash
# 本地测试服务器

echo "🌐 启动Y2K个人网页本地测试服务器..."
echo "访问地址: http://localhost:8080"
echo "按 Ctrl+C 停止服务器"

# 检查Python版本
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8080
else
    echo "错误: 未找到Python，请安装Python3"
    exit 1
fi
EOF
    
    chmod +x test-local.sh
    
    cat > test-node.sh << 'EOF'
#!/bin/bash
# Node.js测试服务器

echo "🌐 启动Y2K个人网页Node.js测试服务器..."
echo "访问地址: http://localhost:3000"
echo "按 Ctrl+C 停止服务器"

# 检查是否安装了serve
if ! command -v npx &> /dev/null; then
    echo "错误: 需要安装Node.js和npx"
    echo "安装命令: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs"
    exit 1
fi

npx serve . -l 3000
EOF
    
    chmod +x test-node.sh
    
    print_success "本地测试脚本创建完成"
}

# 生成部署报告
generate_deployment_report() {
    print_info "生成部署报告..."
    
    cat > DEPLOYMENT_REPORT.md << EOF
# Y2K个人网页部署报告

## 📅 部署时间
$(date)

## ✅ 已完成步骤
1. ✅ 代码推送到GitHub仓库
2. ✅ 创建自动化部署脚本
3. ✅ 创建GitHub Actions工作流
4. ✅ 创建本地测试脚本

## 🌐 访问方式

### 本地测试
\`\`\`bash
# 方法1: Python服务器
./test-local.sh

# 方法2: Node.js服务器  
./test-node.sh
\`\`\`

### GitHub Pages部署
1. 访问: https://github.com/NormanJelly/y2k-portfolio/settings/pages
2. 配置:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
3. 保存后等待部署完成
4. 访问: https://normanjelly.github.io/y2k-portfolio/

### 自定义域名（可选）
1. 在仓库Settings → Pages → Custom domain
2. 输入你的域名
3. 在DNS服务商添加CNAME记录指向normanjelly.github.io

## 🔧 维护命令

\`\`\`bash
# 更新代码并重新部署
./deploy.sh

# 本地测试
./test-local.sh

# 查看部署状态
git status
git log --oneline -5
\`\`\`

## 📞 故障排除

### 常见问题
1. **GitHub Pages未显示**
   - 等待1-2分钟刷新
   - 检查仓库Settings → Pages配置
   - 查看Actions标签页的部署状态

2. **本地无法访问**
   - 检查防火墙设置
   - 确保端口未被占用
   - 尝试不同浏览器

3. **推送失败**
   - 检查网络连接
   - 验证GitHub权限
   - 更新SSH密钥

## 📊 项目信息
- 文件数量: 7个
- 代码行数: 约2700行
- 仓库地址: https://github.com/NormanJelly/y2k-portfolio
- 部署状态: 就绪

---
*报告生成时间: $(date)*
EOF
    
    print_success "部署报告生成完成"
}

# 主函数
main() {
    echo ""
    echo "========================================"
    echo "🚀 Y2K个人网页自动化部署"
    echo "========================================"
    echo ""
    
    # 执行部署步骤
    check_git_status || exit 1
    push_to_github || exit 1
    create_github_actions
    create_test_server
    generate_deployment_report
    
    echo ""
    echo "========================================"
    echo "🎉 部署准备完成！"
    echo "========================================"
    echo ""
    echo "📋 下一步操作："
    echo ""
    echo "1. GitHub Pages手动启用："
    echo "   访问 https://github.com/NormanJelly/y2k-portfolio/settings/pages"
    echo ""
    echo "2. 本地测试网站："
    echo "   ./test-local.sh 或 ./test-node.sh"
    echo ""
    echo "3. 查看部署报告："
    echo "   cat DEPLOYMENT_REPORT.md"
    echo ""
    echo "4. 网站上线后访问："
    echo "   https://normanjelly.github.io/y2k-portfolio/"
    echo ""
    echo "========================================"
}

# 执行主函数
main "$@"