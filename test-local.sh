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
