/*
 * Copyright (c) 2026.  atagon GmbH.  All rights reserved.
 *
 * This file is part of the atagon codebase and may not be copied,
 *  distributed, or modified without explicit written permission from
 * atagon GmbH. https://www.atagon.com
 *
 *
 */

import path from "path";
import {fileURLToPath} from "url";

export const version = "0.5.1097";
export const baseURL = "https://updater.kogiqa.com/release";
export const preferredPort = 4239;


export const baseDirname = path.dirname(fileURLToPath(import.meta.url));
export const extractedPath = path.join(baseDirname, "kogiqa-extracted");
