#!/usr/bin/env node

/*
 * Copyright (c) 2026.  atagon GmbH.  All rights reserved.
 *
 * This file is part of the atagon codebase and may not be copied,
 *  distributed, or modified without explicit written permission from
 * atagon GmbH. https://www.atagon.com
 *
 */

import fs from "fs";
import path from "path";
import {pipeline} from "stream/promises";
import axios from "axios";
import {extractZip, getAppBinPath, getDownloadUrl} from "./helper.js";
import {baseDirname, baseURL, extractedPath, version} from "./config.js";


const zipPath = path.join(baseDirname, "kogiqa.zip");


async function downloadeBinary() {
    const appBinPath = getAppBinPath(extractedPath);
    const appDownloadURL = getDownloadUrl(baseURL, version);

    if (fs.existsSync(extractedPath)) {
        console.error("[Proxy] Existing election app found. Removing it...");

        fs.rmSync(extractedPath, {
            recursive: true,
            force: true,
        });
    }

    console.error(`[Proxy] Downloading election app from ${appDownloadURL}...`);

    const response = await axios.get(appDownloadURL, {responseType: 'stream'});
    const total = Number.parseFloat(response.headers['content-length'].toString());
    let downloaded = 0;

    response.data.on('data', (chunk) => {
        downloaded += chunk.length;
        const progress = total ? `${((downloaded / total) * 100).toFixed(1)}%` : `${(downloaded / 1e6).toFixed(2)} MB`;
        process.stdout.write(`\r[Proxy] Downloading... ${progress}`);
    });

    await pipeline(response.data, fs.createWriteStream(zipPath));
    console.log('\n[Proxy] Download complete.');

    extractZip(zipPath, extractedPath);
    fs.unlinkSync(zipPath);

    if (fs.existsSync(appBinPath)) {
        if (process.platform !== "win32") {
            fs.chmodSync(appBinPath, 0o755);
        }
        console.error("[Proxy] Download and installation complete.");
    } else {
        console.error(
            `[Proxy] Warning: Expected binary not found at ${appBinPath}. Check the zip's internal folder structure.`
        );
        process.exit(1);
    }
}

export default downloadeBinary;
