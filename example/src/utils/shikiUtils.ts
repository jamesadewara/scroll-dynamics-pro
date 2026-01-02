import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export const getHighlighter = () => {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['dark-plus'],
            langs: ['tsx', 'typescript', 'bash', 'javascript', 'html', 'css', 'json'],
        });
    }
    return highlighterPromise;
};
