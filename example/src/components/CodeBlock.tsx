import React, { useEffect, useState } from 'react';
import { getHighlighter } from '../utils/shikiUtils';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx', title }) => {
    const [html, setHtml] = useState<string>('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function highlight() {
            try {
                // Determine language alias for Shiki
                let lang = language.toLowerCase();
                if (lang === 'bash' || lang === 'sh') lang = 'bash';
                else if (lang === 'ts' || lang === 'tsx') lang = 'tsx';
                else if (lang === 'js' || lang === 'jsx') lang = 'javascript';

                const highlighter = await getHighlighter();

                // Shiki might throw if lang is not loaded, but our utils loads common ones.
                // Fallback to text if needed or just try.
                const highlightedCode = highlighter.codeToHtml(code, {
                    lang,
                    theme: 'dark-plus'
                });

                if (mounted) {
                    setHtml(highlightedCode);
                }
            } catch (error) {
                console.warn('Shiki highlighting failed, falling back to plain text:', error);
                if (mounted) {
                    setHtml(`<pre style="color:#d4d4d4"><code>${code}</code></pre>`);
                }
            }
        }

        highlight();

        return () => {
            mounted = false;
        };
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            margin: '20px 0',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            background: '#1e1e1e',
            border: '1px solid #2b2b2b',
        }}>
            {/* Title Bar */}
            <div style={{
                backgroundColor: '#252526',
                padding: '8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #2b2b2b',
                fontSize: '13px',
                fontFamily: "'Segoe UI', sans-serif"
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* VS Code Icons circles (fake) */}
                    <div style={{ display: 'flex', gap: '6px', opacity: 0.6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    <span style={{ marginLeft: 10, color: '#cccccc' }}>{title || 'Example'}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        color: '#58a6ff',
                        fontFamily: 'monospace',
                        opacity: 0.8
                    }}>
                        {language.toUpperCase()}
                    </span>
                    <button
                        onClick={handleCopy}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: copied ? '#4cd964' : '#858585',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'color 0.2s',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3c3c3c'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {copied ? (
                            <>
                                <span>✓</span> Copied
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Content */}
            <div style={{ position: 'relative', backgroundColor: '#1e1e1e' }}>
                {html ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: html }}
                        style={{
                            margin: 0,
                            padding: '16px',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            fontFamily: "'Fira Code', 'Consolas', monospace",
                            overflowX: 'auto'
                        }}
                    />
                ) : (
                    <pre style={{
                        margin: 0,
                        padding: '16px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        fontFamily: "'Fira Code', 'Consolas', monospace",
                        color: '#d4d4d4',
                        background: 'transparent',
                        overflowX: 'auto'
                    }}>
                        <code>{code}</code>
                    </pre>
                )}
            </div>
        </div>
    );
};
