/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import * as express from 'express';
import { ServeStaticOptions } from 'serve-static';
import { interpolate } from '../../../mol-util/string';
import { Handler } from 'express-serve-static-core';
import { indexTemplate } from './indexTemplate';
import { resolve } from 'path';

export function swaggerUiAssetsHandler(options?: ServeStaticOptions): Handler {
    const opts = options || {};
    opts.index = false;
    const path = resolve(__dirname);
    return express.static(path, opts);
}

export interface SwaggerUIOptions {
    openapiJsonUrl: string
    apiPrefix: string
    title: string
    shortcutIconLink: string
}

function createHTML(options: SwaggerUIOptions) {
    return interpolate(indexTemplate, options);
}

export function swaggerUiIndexHandler(options: SwaggerUIOptions): express.Handler {
    const html = createHTML(options);
    return (req: express.Request, res: express.Response) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    };
}