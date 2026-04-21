"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DeleteEmptyLinesPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// locales/en.json
var en_default = {
  plugin: {
    name: "Delete Empty Lines",
    description: "Delete or compress empty lines in notes"
  },
  commands: {
    fullDefault: {
      name: "Compress empty lines (Full document, keep {count})"
    },
    selectionDefault: {
      name: "Compress empty lines (Selection, keep {count})"
    }
  },
  contextMenu: {
    fullDocument: "Compress empty lines in document (keep {count})",
    selection: "Compress empty lines in selection (keep {count})"
  },
  notices: {
    noActiveFile: "No active file",
    noEditor: "No editor found",
    noSelection: "Please select text first",
    processSuccess: "Processed (keep up to {count} consecutive empty lines)",
    noEmptyLines: "No empty lines to process",
    processFailed: "Processing failed: {error}",
    invalidNumber: "Please enter a non-negative integer",
    pluginLoaded: "Delete Empty Lines plugin loaded",
    pluginUnloaded: "Delete Empty Lines plugin unloaded",
    languageChanged: "Language switched to {language}"
  },
  settings: {
    title: "Delete Empty Lines Settings",
    language: {
      name: "Language",
      desc: "Choose display language. Changes take effect immediately.",
      options: {
        auto: "Auto (follow Obsidian)",
        "zh-CN": "Simplified Chinese",
        en: "English"
      }
    },
    numberInputPlaceholder: ">=0",
    preserveIndentation: {
      name: "Delete lines with only whitespace",
      desc: "When enabled, lines containing only spaces and tabs are treated as empty lines and deleted."
    },
    defaultFullMaxLines: {
      name: "Default max consecutive empty lines (Full document)",
      desc: "Maximum number of consecutive empty lines to keep when processing the entire document (0 = delete all)"
    },
    defaultSelectionMaxLines: {
      name: "Default max consecutive empty lines (Selection)",
      desc: "Maximum number of consecutive empty lines to keep when processing selected text (0 = delete all)"
    },
    usage: {
      title: "Usage Instructions",
      commandPalette: "Command Palette",
      commandPaletteDesc: 'Press Ctrl/Cmd+P and search for "compress empty lines".',
      contextMenu: "Context Menu",
      contextMenuDesc: "Right-click in the editor to see the matching compress command."
    }
  }
};

// locales/zh-CN.json
var zh_CN_default = {
  plugin: {
    name: "\u5220\u9664\u7A7A\u884C",
    description: "\u5220\u9664\u6216\u538B\u7F29\u7B14\u8BB0\u4E2D\u7684\u7A7A\u884C"
  },
  commands: {
    fullDefault: {
      name: "\u538B\u7F29\u7A7A\u884C\uFF08\u5168\u6587\uFF0C\u4FDD\u7559 {count} \u884C\uFF09"
    },
    selectionDefault: {
      name: "\u538B\u7F29\u7A7A\u884C\uFF08\u9009\u4E2D\u533A\u57DF\uFF0C\u4FDD\u7559 {count} \u884C\uFF09"
    }
  },
  contextMenu: {
    fullDocument: "\u538B\u7F29\u5168\u6587\u7A7A\u884C\uFF08\u4FDD\u7559 {count} \u884C\uFF09",
    selection: "\u538B\u7F29\u9009\u4E2D\u533A\u57DF\u7A7A\u884C\uFF08\u4FDD\u7559 {count} \u884C\uFF09"
  },
  notices: {
    noActiveFile: "\u6CA1\u6709\u6253\u5F00\u7684\u6587\u4EF6",
    noEditor: "\u672A\u627E\u5230\u7F16\u8F91\u5668",
    noSelection: "\u8BF7\u5148\u9009\u4E2D\u8981\u5904\u7406\u7684\u6587\u672C",
    processSuccess: "\u5904\u7406\u5B8C\u6210\uFF08\u6700\u591A\u4FDD\u7559\u8FDE\u7EED {count} \u884C\u7A7A\u884C\uFF09",
    noEmptyLines: "\u6CA1\u6709\u9700\u8981\u5904\u7406\u7684\u7A7A\u884C",
    processFailed: "\u5904\u7406\u5931\u8D25\uFF1A{error}",
    invalidNumber: "\u8BF7\u8F93\u5165\u5927\u4E8E\u7B49\u4E8E 0 \u7684\u6574\u6570",
    pluginLoaded: "\u5220\u9664\u7A7A\u884C\u63D2\u4EF6\u5DF2\u52A0\u8F7D",
    pluginUnloaded: "\u5220\u9664\u7A7A\u884C\u63D2\u4EF6\u5DF2\u5378\u8F7D",
    languageChanged: "\u754C\u9762\u8BED\u8A00\u5DF2\u5207\u6362\u4E3A {language}"
  },
  settings: {
    title: "\u5220\u9664\u7A7A\u884C\u8BBE\u7F6E",
    language: {
      name: "\u754C\u9762\u8BED\u8A00",
      desc: "\u9009\u62E9\u663E\u793A\u8BED\u8A00\uFF0C\u4FEE\u6539\u540E\u7ACB\u5373\u751F\u6548\u3002",
      options: {
        auto: "\u81EA\u52A8\uFF08\u8DDF\u968F Obsidian\uFF09",
        "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
        en: "English"
      }
    },
    numberInputPlaceholder: ">=0",
    preserveIndentation: {
      name: "\u5220\u9664\u4EC5\u5305\u542B\u7A7A\u683C\u548C\u5236\u8868\u7B26\u7684\u7A7A\u884C",
      desc: "\u5F00\u542F\u540E\uFF0C\u4EC5\u5305\u542B\u7A7A\u683C\u548C\u5236\u8868\u7B26\u7684\u884C\u4F1A\u88AB\u89C6\u4E3A\u7A7A\u884C\u5E76\u5220\u9664\u3002"
    },
    defaultFullMaxLines: {
      name: "\u5168\u6587\u9ED8\u8BA4\u6700\u5927\u8FDE\u7EED\u7A7A\u884C\u6570",
      desc: "\u5904\u7406\u6574\u4E2A\u6587\u6863\u65F6\uFF0C\u6700\u591A\u4FDD\u7559\u7684\u8FDE\u7EED\u7A7A\u884C\u6570\uFF080 = \u5220\u9664\u6240\u6709\u7A7A\u884C\uFF09"
    },
    defaultSelectionMaxLines: {
      name: "\u9009\u4E2D\u533A\u57DF\u9ED8\u8BA4\u6700\u5927\u8FDE\u7EED\u7A7A\u884C\u6570",
      desc: "\u5904\u7406\u9009\u4E2D\u6587\u672C\u65F6\uFF0C\u6700\u591A\u4FDD\u7559\u7684\u8FDE\u7EED\u7A7A\u884C\u6570\uFF080 = \u5220\u9664\u6240\u6709\u7A7A\u884C\uFF09"
    },
    usage: {
      title: "\u4F7F\u7528\u8BF4\u660E",
      commandPalette: "\u547D\u4EE4\u9762\u677F",
      commandPaletteDesc: "\u6309 Ctrl/Cmd+P\uFF0C\u641C\u7D22\u201C\u538B\u7F29\u7A7A\u884C\u201D\u4EE5\u6267\u884C\u547D\u4EE4\u3002",
      contextMenu: "\u53F3\u952E\u83DC\u5355",
      contextMenuDesc: "\u5728\u7F16\u8F91\u5668\u4E2D\u53F3\u952E\uFF0C\u4F1A\u6839\u636E\u662F\u5426\u6709\u9009\u4E2D\u6587\u672C\u663E\u793A\u5BF9\u5E94\u547D\u4EE4\u3002"
    }
  }
};

// src/main.ts
var BUILT_IN_LOCALES = Object.freeze({
  en: en_default,
  "zh-CN": zh_CN_default
});
var DEFAULT_SETTINGS = {
  language: "en",
  preserveIndentation: true,
  defaultFullMaxLines: 0,
  defaultSelectionMaxLines: 0
};
var DeleteEmptyLinesPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.currentLang = "en";
    this.localeData = BUILT_IN_LOCALES.en;
  }
  async onload() {
    await this.loadSettings();
    this.initI18n();
    this.updateCommands = () => {
      this.removeCommand("full-default");
      this.removeCommand("selection-default");
      this.addCommand({
        id: "full-default",
        name: this.t("commands.fullDefault.name", { count: this.settings.defaultFullMaxLines }),
        callback: () => {
          void this.processDocument(this.settings.defaultFullMaxLines);
        }
      });
      this.addCommand({
        id: "selection-default",
        name: this.t("commands.selectionDefault.name", { count: this.settings.defaultSelectionMaxLines }),
        callback: () => {
          void this.processSelection(this.settings.defaultSelectionMaxLines);
        }
      });
    };
    this.updateCommands();
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        if (editor.somethingSelected()) {
          menu.addItem((item) => {
            item.setTitle(this.t("contextMenu.selection", { count: this.settings.defaultSelectionMaxLines })).setIcon("minimize-2").onClick(() => {
              void this.processSelection(this.settings.defaultSelectionMaxLines, editor);
            });
          });
        } else {
          menu.addItem((item) => {
            item.setTitle(this.t("contextMenu.fullDocument", { count: this.settings.defaultFullMaxLines })).setIcon("minimize-2").onClick(() => {
              void this.processDocument(this.settings.defaultFullMaxLines);
            });
          });
        }
      })
    );
    this.settingTab = new DeleteEmptyLinesSettingTab(this.app, this);
    this.addSettingTab(this.settingTab);
    console.log(this.t("notices.pluginLoaded"));
  }
  normalizeLanguage(languageSetting) {
    if (languageSetting === "auto") {
      return "auto";
    }
    const normalized = String(languageSetting != null ? languageSetting : "").toLowerCase();
    if (normalized.startsWith("zh")) {
      return "zh-CN";
    }
    if (normalized.startsWith("en")) {
      return "en";
    }
    return "en";
  }
  initI18n() {
    var _a;
    const language = this.resolveLanguage(this.settings.language);
    this.currentLang = language;
    this.localeData = (_a = BUILT_IN_LOCALES[language]) != null ? _a : BUILT_IN_LOCALES.en;
  }
  resolveLanguage(languageSetting) {
    var _a, _b;
    if (languageSetting !== "auto") {
      return this.normalizeLanguage(languageSetting) === "zh-CN" ? "zh-CN" : "en";
    }
    const obsidianLang = (_b = (_a = window.localStorage.getItem("language")) != null ? _a : navigator.language) != null ? _b : "en";
    return this.normalizeLanguage(obsidianLang) === "zh-CN" ? "zh-CN" : "en";
  }
  getNestedValue(source, key) {
    return key.split(".").reduce((acc, currentKey) => {
      if (acc && typeof acc === "object") {
        const objectValue = acc;
        if (currentKey in objectValue) {
          return objectValue[currentKey];
        }
      }
      return void 0;
    }, source);
  }
  getLocaleValue(key) {
    var _a, _b;
    return (_b = (_a = this.getNestedValue(this.localeData, key)) != null ? _a : this.getNestedValue(BUILT_IN_LOCALES[this.currentLang], key)) != null ? _b : this.getNestedValue(BUILT_IN_LOCALES.en, key);
  }
  t(key, params = {}) {
    const rawValue = this.getLocaleValue(key);
    const template = typeof rawValue === "string" ? rawValue : key;
    return template.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== void 0 ? String(params[paramKey]) : match;
    });
  }
  async setLanguage(language) {
    var _a, _b;
    this.settings.language = this.normalizeLanguage(language);
    this.initI18n();
    await this.saveSettings();
    (_a = this.settingTab) == null ? void 0 : _a.display();
    const options = this.getLocaleValue("settings.language.options");
    const optionMap = options && typeof options === "object" ? options : {};
    const languageLabel = (_b = optionMap[this.settings.language]) != null ? _b : this.settings.language;
    new import_obsidian.Notice(this.t("notices.languageChanged", { language: languageLabel }));
  }
  async processDocument(maxLines) {
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
      new import_obsidian.Notice(this.t("notices.noActiveFile"));
      return;
    }
    try {
      const content = await this.app.vault.read(activeFile);
      const processedContent = this.processText(content, maxLines);
      if (content !== processedContent) {
        await this.app.vault.modify(activeFile, processedContent);
        new import_obsidian.Notice(this.t("notices.processSuccess", { count: maxLines }));
      } else {
        new import_obsidian.Notice(this.t("notices.noEmptyLines"));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian.Notice(this.t("notices.processFailed", { error: message }));
      console.error("Processing failed:", error);
    }
  }
  async processSelection(maxLines, editor) {
    let currentEditor = editor;
    if (!currentEditor) {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (!view) {
        new import_obsidian.Notice(this.t("notices.noEditor"));
        return;
      }
      currentEditor = view.editor;
    }
    if (!currentEditor.somethingSelected()) {
      new import_obsidian.Notice(this.t("notices.noSelection"));
      return;
    }
    const selection = currentEditor.getSelection();
    const processed = this.processText(selection, maxLines);
    if (selection !== processed) {
      currentEditor.replaceSelection(processed);
      new import_obsidian.Notice(this.t("notices.processSuccess", { count: maxLines }));
    } else {
      new import_obsidian.Notice(this.t("notices.noEmptyLines"));
    }
  }
  processText(text, maxEmptyLines) {
    const lines = text.split("\n");
    const processedLines = [];
    let emptyLineCount = 0;
    for (const line of lines) {
      if (this.isEmptyLine(line)) {
        emptyLineCount += 1;
        if (emptyLineCount <= maxEmptyLines) {
          processedLines.push("");
        }
      } else {
        emptyLineCount = 0;
        processedLines.push(line);
      }
    }
    let tailEmpty = 0;
    for (let i = processedLines.length - 1; i >= 0; i -= 1) {
      if (this.isEmptyLine(processedLines[i])) {
        tailEmpty += 1;
      } else {
        break;
      }
    }
    if (tailEmpty > maxEmptyLines) {
      processedLines.splice(processedLines.length - (tailEmpty - maxEmptyLines));
    }
    return processedLines.join("\n");
  }
  isEmptyLine(line) {
    if (this.settings.preserveIndentation) {
      return line.trim() === "";
    }
    return line === "";
  }
  async loadSettings() {
    const saved = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, saved != null ? saved : {});
    this.settings.language = this.normalizeLanguage(this.settings.language);
  }
  async saveSettings() {
    await this.saveData(this.settings);
    if (this.updateCommands) {
      this.updateCommands();
    }
  }
  onunload() {
    console.log(this.t("notices.pluginUnloaded"));
  }
};
var DeleteEmptyLinesSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.plugin.t("settings.title") });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settings.language.name")).setDesc(this.plugin.t("settings.language.desc")).addDropdown((dropdown) => {
      var _a, _b, _c;
      const options = this.plugin.getLocaleValue("settings.language.options");
      const optionMap = options && typeof options === "object" ? options : {};
      dropdown.addOption("auto", (_a = optionMap.auto) != null ? _a : this.plugin.t("settings.language.options.auto"));
      dropdown.addOption("zh-CN", (_b = optionMap["zh-CN"]) != null ? _b : this.plugin.t("settings.language.options.zh-CN"));
      dropdown.addOption("en", (_c = optionMap.en) != null ? _c : this.plugin.t("settings.language.options.en"));
      dropdown.setValue(this.plugin.settings.language);
      dropdown.onChange(async (value) => {
        await this.plugin.setLanguage(value);
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settings.preserveIndentation.name")).setDesc(this.plugin.t("settings.preserveIndentation.desc")).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.preserveIndentation).onChange(async (value) => {
        this.plugin.settings.preserveIndentation = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settings.defaultFullMaxLines.name")).setDesc(this.plugin.t("settings.defaultFullMaxLines.desc")).addText((text) => {
      text.setValue(String(this.plugin.settings.defaultFullMaxLines)).setPlaceholder(this.plugin.t("settings.numberInputPlaceholder")).onChange(async (value) => {
        const num = Number.parseInt(value, 10);
        if (!Number.isNaN(num) && num >= 0) {
          this.plugin.settings.defaultFullMaxLines = num;
          await this.plugin.saveSettings();
          this.display();
        } else {
          text.setValue(String(this.plugin.settings.defaultFullMaxLines));
          new import_obsidian.Notice(this.plugin.t("notices.invalidNumber"));
        }
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settings.defaultSelectionMaxLines.name")).setDesc(this.plugin.t("settings.defaultSelectionMaxLines.desc")).addText((text) => {
      text.setValue(String(this.plugin.settings.defaultSelectionMaxLines)).setPlaceholder(this.plugin.t("settings.numberInputPlaceholder")).onChange(async (value) => {
        const num = Number.parseInt(value, 10);
        if (!Number.isNaN(num) && num >= 0) {
          this.plugin.settings.defaultSelectionMaxLines = num;
          await this.plugin.saveSettings();
          this.display();
        } else {
          text.setValue(String(this.plugin.settings.defaultSelectionMaxLines));
          new import_obsidian.Notice(this.plugin.t("notices.invalidNumber"));
        }
      });
    });
    containerEl.createEl("h3", { text: this.plugin.t("settings.usage.title") });
    const usageEl = containerEl.createEl("div", { cls: "setting-item-description" });
    usageEl.innerHTML = `
            <p><strong>${this.plugin.t("settings.usage.commandPalette")}:</strong> ${this.plugin.t("settings.usage.commandPaletteDesc")}</p>
            <p><strong>${this.plugin.t("settings.usage.contextMenu")}:</strong> ${this.plugin.t("settings.usage.contextMenuDesc")}</p>
        `;
  }
};
