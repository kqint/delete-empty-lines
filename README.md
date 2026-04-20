# Obsidian Delete Empty Lines

Obsidian插件，用于删除或压缩笔记中的空行。支持全文处理和选中区域处理，可自定义保留的空行数量。


## 核心功能

- **全文处理**：一键清理整个文档的多余空行
- **选中区域处理**：仅处理选中的文本段落
- **空行压缩**：将连续多个空行压缩为指定数量（默认保留1行）
- **可配置**：可单独设置全文和选中区域的默认保留空行数
- **空格行识别**：可选择是否将仅含空格/制表符的行视为空行并删除

## 使用方法

### 命令面板
`Ctrl/Cmd+P` 搜索以下命令：
- `压缩空行（全文，保留 X 行）`
- `压缩空行（选中区域，保留 X 行）`

### 右键菜单
- 选中文本时 → 压缩选中区域空行
- 未选中文本时 → 压缩全文空行

### 快捷键
在 Obsidian 设置 → 快捷键中为两个命令自定义快捷键。

## 安装

### 手动安装
1. 从 Releases 下载 `main.js` 和 `manifest.json`
2. 在库中创建文件夹：`.obsidian/plugins/delete-empty-lines/`
3. 将文件复制进去，重启 Obsidian 并启用插件

### 通过 BRAT 安装
1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. 在 BRAT 设置中添加插件仓库地址

## 许可证

[MIT License](LICENSE)