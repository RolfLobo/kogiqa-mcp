## kogiQA MCP Web Browser

A Model Context Protocol (MCP) server that provides browser automation capabilities using kogiQA. This server
enables LLMs to interact with web pages through natural language, bypassing the need for screenshots
or visually-tuned models.

### kogiQA MCP vs Playwright MCP

The kogiQA MCP Server provides a browser which incorporates the capabilities of the kogiQA browser control algorithm.
This enables agents to interact with pages without a selector, saving time and tokens.

### For what to use:
+ Debug style issues on your page
+ Automatically fix console errors.
+ Map and document the functionality of your web app
+ Automatically write end-to-end tests
+ Automate exploratory testing of your application

See example prompts [Usage Examples](#usage-examples)

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

Alternatively, install via the VS Code CLI:

```bash
code --add-mcp '{"name":"kogiqa-browser","command":"npx","args":["kogiqa-mcp@latest"]}'
```

#### Cursor

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install in Cursor" />](https://cursor.com/en/install-mcp?name=kogiqa-browser&config=eyJjb21tYW5kIjoibnB4IGtvZ2lxYS1tY3BAbGF0ZXN0In0=)

Alternatively, go to `Cursor Settings` → `MCP` → `Add new MCP Server` and enter the command
`npx kogiqa-mcp@latest`.

### Standard configuration

For any other MCP client, add the following to your MCP configuration:

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
```
### Usage Examples
Once the server is configured, simply talk to your agent in natural language. Because kogiQA is selector-free, you describe what you want done — not how to find the elements.

#### Smoke-test a user flow
```text
Open http://localhost:3000, log in with the demo credentials, add the first product to the cart, and verify that the cart badge shows "1".
```
#### Debug a style issue
```text
Go to https://myapp.example.com/pricing and check why the "Pro" plan card overflows its container on a 1280px-wide viewport. Suggest a CSS fix.
```
#### Fix console errors
```text
Navigate to http://localhost:5173, open every page linked from the main menu, collect all console errors, and fix them in the source code.
```
#### Map and document your app
```text
Explore https://staging.example.com, follow all internal links up to two levels deep, and produce a Markdown document describing each page and its main features.
```
#### Generate end-to-end tests
```text
Walk through the sign-up flow at http://localhost:3000/signup and write Cypress end-to-end tests covering the happy path and validation errors.
```
#### Exploratory testing
```text
Do 10 minutes of exploratory testing on http://localhost:8080: try edge-case inputs in every form you find and report anything that looks broken or inconsistent.
```

### Requirements
+ Node.js 20 or newer
+ VS Code, Cursor, Windsurf, Claude Desktop, Goose, Junie or a other MCP client

[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/atagon-gmbh-kogiqa-mcp-badge.png)](https://mseep.ai/app/atagon-gmbh-kogiqa-mcp)
