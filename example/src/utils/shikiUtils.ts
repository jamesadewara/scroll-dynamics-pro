import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import getWasm from 'shiki/wasm';
import html from 'shiki/langs/html.mjs';
import css from 'shiki/langs/css.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import json from 'shiki/langs/json.mjs';
import bash from 'shiki/langs/bash.mjs';
import darkPlus from 'shiki/themes/dark-plus.mjs';

let highlighterPromise: Promise<HighlighterCore> | null = null;

export const getHighlighter = () => {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighterCore({
            themes: [darkPlus],
            langs: [html, css, javascript, typescript, tsx, json, bash],
            engine: createOnigurumaEngine(getWasm),
        });
    }
    return highlighterPromise;
};
