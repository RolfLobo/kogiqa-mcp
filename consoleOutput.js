/*
 * Copyright (c) 2026.  atagon GmbH.  All rights reserved.
 *
 * This file is part of the atagon codebase and may not be copied,
 * distributed, or modified without explicit written permission from
 * atagon GmbH. https://www.atagon.com
 */

import {detectGlobalAgents} from "add-mcp";

const standardConfig = `{
  "mcpServers": {
    "kogiqa-browser": {
      "command": "npx",
      "args": [
        "kogiqa-mcp@latest"
      ]
    }
  }
}`;

const bannerLine = "============================================================";

const usageExamples = [
    '"use the kogiqa mcp server to open github.com and take a screenshot"',
    '"use the kogiqa mcp server to navigate to wikipedia.org and get the page text"',
    '"use the kogiqa mcp server to click the login button on example.com"',
    '"use the kogiqa mcp server to fill in the search form on google.com"',
];

function printUsageBanner() {
    console.error(`\n${bannerLine}`);
    console.error("  kogiqa browser is installed and ready to use!");
    console.error(`${bannerLine}\n`);

    console.error("Open your agent and type, for example:");
    console.error('  "use the kogiqa mcp server to go to kogiqa.com"\n');

    console.error("More examples of what you can ask your agent to do:");
    for (const example of usageExamples) {
        console.error(`  - ${example}`);
    }
    console.error("");

    console.error("You can close this window.\n");
}

function printManualInstructions() {
    console.error("Add the MCP server to your coding agent. Examples:\n");

    console.error("Claude Code");
    console.error("  claude mcp add kogiqa-browser npx kogiqa-mcp@latest\n");

    console.error("VS Code");
    console.error(
        `  code --add-mcp '{"name":"kogiqa-browser","command":"npx","args":["kogiqa-mcp@latest"]}'\n`
    );

    console.error("Cursor");
    console.error(
        "  Go to Cursor Settings MCP Add new MCP Server and use command: npx kogiqa-mcp@latest\n"
    );

    console.error("Standard configuration");
    console.error(`${standardConfig}\n`);
}

async function printAfterStart() {
    const globalAgents = await detectGlobalAgents();

    if (globalAgents.length === 0) {
        printManualInstructions();
    }

    printUsageBanner();
}

export default printAfterStart;
