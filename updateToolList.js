/*
 * Copyright (c) 2026.  atagon GmbH.  All rights reserved.
 *
 * This file is part of the atagon codebase and may not be copied,
 *  distributed, or modified without explicit written permission from
 * atagon GmbH. https://www.atagon.com
 *
 *
 */

import {promises as fs2} from "fs";
import path from "path";
import {spawn} from "child_process";
import {CallToolRequestSchema, CallToolResultSchema, ListToolsResultSchema,} from "@modelcontextprotocol/sdk/types.js";
import {Server} from "@modelcontextprotocol/sdk/server/index.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {Client} from "@modelcontextprotocol/sdk/client/index.js";
import {StreamableHTTPClientTransport} from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {getFirstFreePort, waitForHttpServer} from "./helper.js";
import {baseDirname, preferredPort} from "./config.js";


let appProcess = null;
let mcpClient = null;

const ELECTION_APP_PORT = await getFirstFreePort(preferredPort);

const SSE_URL = `http://localhost:${ELECTION_APP_PORT}/mcp`;

function startApp() {
    console.error("[Proxy] Starting election app...");

    const child = spawn("npm", ["run", "local:dev:mcp", `--`, `--mcp`, `--mcpPort=${ELECTION_APP_PORT}`], {
        stdio: ["ignore", "ignore", "inherit"],
        shell: true,
        cwd: path.resolve(baseDirname, "../../desktop-client"),
    });

    child.on("error", (err) => {
        console.error("[Proxy] Failed to start election app:", err);
    });

    child.on("exit", () => {
        console.error("[Proxy] Election app exited.");
        appProcess = null;
    });

    return child;
}


async function ensureConnection() {
    let needsReconnection = false;

    if (!appProcess || appProcess.killed) {
        console.error("[Proxy] App is not running. Starting it now...");
        appProcess = startApp();
        await waitForHttpServer(SSE_URL);
        await new Promise((resolve) => setTimeout(resolve, 4000));

        needsReconnection = true;
    }

    if (!mcpClient || needsReconnection) {
        console.error("[Proxy] Establishing MCP connection...");
        const httpTransport = new StreamableHTTPClientTransport(new URL(SSE_URL));
        mcpClient = new Client({name: "kogiqa-webbrowser-mcp-server-client", version: "1.0.0"});
        await mcpClient.connect(httpTransport);
        await new Promise((resolve) => setTimeout(resolve, 4000));

        console.error("[Proxy] Connected to Election App HTTP endpoint.");
    }
}

async function startProxy() {

    const mcpServer = new Server(
        {name: 'kogiqa-webbrowser-mcp-server', version: "1.0.0"},
        {capabilities: {tools: {}}}
    );

    mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
        await ensureConnection();

        return mcpClient.request(request, CallToolResultSchema);
    });

    const stdioTransport = new StdioServerTransport();
    await mcpServer.connect(stdioTransport);
    console.error("[Proxy] Proxy server running on stdio.");
}


async function main() {
    try {

        process.on("exit", () => {
            if (appProcess) appProcess.kill();
        });
        process.on("SIGINT", () => process.exit());
        process.on("SIGTERM", () => process.exit());

        await startProxy();
        await ensureConnection();

        setTimeout(async () => {

            const response = await mcpClient.request(
                {method: "tools/list"},
                ListToolsResultSchema
            );

            await fs2.writeFile('./toolList.json', JSON.stringify(response, null, 2), 'utf-8');
        }, 6000)
    } catch (error) {
        console.error("[Proxy] Fatal Error:", error);
        process.exit(1);
    }
}

main();

