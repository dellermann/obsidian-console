/*
 * Copyright (c) Daniel Ellermann
 */

import { Plugin } from "obsidian";

export default class CodePlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("console", (source, el, ctx) => {
      const lines = source.split("\n");

      const pre = el.createEl("pre", { cls: "language-console" });
      for (const line of lines) {
        const m = line.match(/^\s*([>#%\$])\s*(.+)$/);
        if (m != null) {
          const div = pre.createEl("div");
          div.createEl(
            "span",
            {
              text: m[1],
              cls: "console-prompt" +
                (m[1] === "#" ? " console-prompt-root" : "")
            }
          );
          div.createEl("span", { text: m[2], cls: "console-command" });
        } else {
          pre.createEl("div", { text: line, cls: "console-output" });
        }
      }
    });
  }
}
