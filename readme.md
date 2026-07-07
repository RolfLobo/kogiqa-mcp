## kogiQA MCP Web Browser

A Model Context Protocol (MCP) server that provides browser automation capabilities using kogiQA. This server
enables LLMs to interact with web pages through natural language, bypassing the need for screenshots
or visually-tuned models.

### kogiQA MCP vs Playwright MCP

The kogiQA MCP Server provides a browser which incorporates the capabilities of the kogiQA browser control algorithm.
This enables agents to interact with pages without a selector, saving time and tokens.

## Requirements
+ Node.js 20 or newer
+ VS Code, Cursor, Windsurf, Claude Desktop, Goose, Junie or a other MCP client

### Installation

Auto install:

```bash
npx kogiqa-mcp@latest
```

#### Claude Code

```bash
claude mcp add kogiqa-browser npx kogiqa-mcp@latest
```

#### VS Code

Click one of the buttons below to install directly in vs code:

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code" />](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22kogiqa-browser%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22kogiqa-mcp%40latest%22%5D%7D) [<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5" />](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22kogiqa-browser%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22kogiqa-mcp%40latest%22%5D%7D)

Or

install via the VS Code CLI:

```bash
code --add-mcp '{"name":"kogiqa-browser","command":"npx","args":["kogiqa-mcp@latest"]}'
```

#### Cursor

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install in Cursor" />](https://cursor.com/en/install-mcp?name=kogiqa-browser&config=eyJjb21tYW5kIjoibnB4IGtvZ2lxYS1tY3BAbGF0ZXN0In0=)

Or

go to `Cursor Settings` → `MCP` → `Add new MCP Server` and use command and type in `npx kogiqa-mcp@latest`.

#### Standard configuration

```json
{
  "mcpServers": {
    "kogiqa-browser": {
      "command": "npx",
      "args": [
        "kogiqa-mcp@latest"
      ]
    }
  }
}
