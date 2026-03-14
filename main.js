const { Plugin, PluginSettingTab, Setting, Notice, MarkdownView } = require('obsidian');

const DEFAULT_SETTINGS = {
    preserveIndentation: true,
    preserveListIndentation: true,
    defaultFullMaxLines: 0,      // 全文默认最大连续空行数
    defaultSelectionMaxLines: 0   // 选中区域默认最大连续空行数
}

module.exports = class DeleteEmptyLinesPlugin extends Plugin {
    async onload() {
        await this.loadSettings();

        // 动态更新命令名称的函数
        this.updateCommands = () => {
            // 移除旧命令（如果有）
            this.removeCommand('full-default');
            this.removeCommand('selection-default');
            
            // 添加全文命令
            this.addCommand({
                id: 'full-default',
                name: `压缩空行（全文，保留 ${this.settings.defaultFullMaxLines} 行）`,
                callback: () => this.processDocument(this.settings.defaultFullMaxLines)
            });

            // 添加选中区域命令
            this.addCommand({
                id: 'selection-default',
                name: `压缩空行（选中区域，保留 ${this.settings.defaultSelectionMaxLines} 行）`,
                callback: () => this.processSelection(this.settings.defaultSelectionMaxLines)
            });
        };

        // 初始化命令
        this.updateCommands();

        // 右键菜单
        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu, editor, view) => {
                if (editor.somethingSelected()) {
                    // 有选中文本：显示选中区域操作
                    menu.addItem((item) => {
                        item.setTitle(`压缩选中区域空行（保留 ${this.settings.defaultSelectionMaxLines} 行）`)
                            .setIcon('minimize-2')
                            .onClick(() => this.processSelection(this.settings.defaultSelectionMaxLines, editor));
                    });
                } else {
                    // 无选中：显示全文操作
                    menu.addItem((item) => {
                        item.setTitle(`压缩全文空行（保留 ${this.settings.defaultFullMaxLines} 行）`)
                            .setIcon('minimize-2')
                            .onClick(() => this.processDocument(this.settings.defaultFullMaxLines));
                    });
                }
            })
        );

        // 设置选项卡
        this.addSettingTab(new DeleteEmptyLinesSettingTab(this.app, this));
    }

    /**
     * 处理整个文档
     */
    async processDocument(maxLines) {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('没有打开的文件');
            return;
        }

        try {
            const content = await this.app.vault.read(activeFile);
            const processedContent = this.processText(content, maxLines);

            if (content !== processedContent) {
                await this.app.vault.modify(activeFile, processedContent);
                new Notice(`空行处理完成（保留 ≤${maxLines} 行）`);
            } else {
                new Notice('没有需要处理的空行');
            }
        } catch (error) {
            new Notice('处理失败: ' + error.message);
            console.error('处理空行失败:', error);
        }
    }

    /**
     * 处理选中区域
     */
    async processSelection(maxLines, editor) {
        if (!editor) {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) {
                new Notice('没有找到编辑器');
                return;
            }
            editor = view.editor;
        }

        if (!editor.somethingSelected()) {
            new Notice('请先选中要处理的文本');
            return;
        }

        const selection = editor.getSelection();
        const processed = this.processText(selection, maxLines);

        if (selection !== processed) {
            editor.replaceSelection(processed);
            new Notice(`选中区域处理完成（保留 ≤${maxLines} 行）`);
        } else {
            new Notice('选中区域没有需要处理的空行');
        }
    }

    /**
     * 核心文本处理函数
     */
    processText(text, maxEmptyLines) {
        const lines = text.split('\n');
        const processedLines = [];
        let emptyLineCount = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (this.isEmptyLine(line)) {
                emptyLineCount++;
                if (emptyLineCount <= maxEmptyLines) {
                    processedLines.push(''); // 保留空行
                }
            } else {
                emptyLineCount = 0;
                processedLines.push(line);
            }
        }

        // 处理末尾空行（不超过 maxEmptyLines）
        // 简单方法：如果末尾空行数超过 maxEmptyLines，则裁剪
        let tailEmpty = 0;
        for (let i = processedLines.length - 1; i >= 0; i--) {
            if (this.isEmptyLine(processedLines[i])) tailEmpty++;
            else break;
        }
        if (tailEmpty > maxEmptyLines) {
            processedLines.splice(processedLines.length - (tailEmpty - maxEmptyLines));
        }

        return processedLines.join('\n');
    }

    isEmptyLine(line) {
        if (this.settings.preserveIndentation) {
            return line.trim() === '';
        } else {
            return line === '';
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        // 设置保存后，更新命令名称以反映新数值
        this.updateCommands();
    }

    onunload() {
        console.log('空行删除插件已卸载');
    }
}

class DeleteEmptyLinesSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: '空行删除设置' });

        // 保留缩进空行选项
        new Setting(containerEl)
            .setName('删除只包含空格和制表符的空行')
            .setDesc('开启后，只包含空格和制表符的行，会被视为空行；关闭后，会被视为非空行。例如，一行中只有5个空格，没有其他字符。开启该选项，该行在操作时会被删除，关闭选项，则会被保留。')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.preserveIndentation)
                .onChange(async (value) => {
                    this.plugin.settings.preserveIndentation = value;
                    await this.plugin.saveSettings();
                }));

        // 全文默认最大连续空行数
        new Setting(containerEl)
            .setName('全文默认最大连续空行数')
            .setDesc('处理整个文档时，保留的最大连续空行数（0 = 删除所有空行）')
            .addText(text => text
                .setValue(String(this.plugin.settings.defaultFullMaxLines))
                .setPlaceholder('输入 ≥0 的整数')
                .onChange(async (value) => {
                    const num = parseInt(value, 10);
                    if (!isNaN(num) && num >= 0) {
                        this.plugin.settings.defaultFullMaxLines = num;
                        await this.plugin.saveSettings();
                        // 刷新显示（可选）
                        this.display();
                    } else {
                        text.setValue(String(this.plugin.settings.defaultFullMaxLines));
                        new Notice('请输入大于等于0的整数');
                    }
                }));

        // 选中区域默认最大连续空行数
        new Setting(containerEl)
            .setName('选中区域默认最大连续空行数')
            .setDesc('处理选中文本时，保留的最大连续空行数（0 = 删除所有空行）')
            .addText(text => text
                .setValue(String(this.plugin.settings.defaultSelectionMaxLines))
                .setPlaceholder('输入 ≥0 的整数')
                .onChange(async (value) => {
                    const num = parseInt(value, 10);
                    if (!isNaN(num) && num >= 0) {
                        this.plugin.settings.defaultSelectionMaxLines = num;
                        await this.plugin.saveSettings();
                        this.display();
                    } else {
                        text.setValue(String(this.plugin.settings.defaultSelectionMaxLines));
                        new Notice('请输入大于等于0的整数');
                    }
                }));

        containerEl.createEl('h3', { text: '使用说明' });
        const usageEl = containerEl.createEl('div', { cls: 'setting-item-description' });
        usageEl.innerHTML = `
            <p><strong>命令面板</strong>：按 Ctrl/Cmd+P，搜索“压缩空行”即可看到两个动态命令（全文和选中区域），命令名称中会显示当前设置的保留空行数。</p>
            <p><strong>右键菜单</strong>：在编辑器中右键，会根据是否有选中文本显示对应的压缩命令。</p>
        `;
    }
}