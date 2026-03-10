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
