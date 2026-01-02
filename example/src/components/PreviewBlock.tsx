import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { ScrollProvider } from 'scroll-dynamics-pro';

interface PreviewBlockProps {
    code: string;
    title?: string;
    children: React.ReactNode;
    sticky?: boolean;
}

export const PreviewBlock: React.FC<PreviewBlockProps> = ({ code, title, children, sticky = false }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <div style={{
            margin: '30px 0',
            border: '1px solid #30363d',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#0d1117'
        }}>
            {/* Header/Tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #30363d',
                background: '#161b22'
            }}>
                <button
                    onClick={() => setActiveTab('preview')}
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'preview' ? '#0d1117' : 'transparent',
                        color: activeTab === 'preview' ? '#58a6ff' : '#8b949e',
                        border: 'none',
                        borderRight: '1px solid #30363d',
                        borderTop: activeTab === 'preview' ? '2px solid #58a6ff' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Preview
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'code' ? '#0d1117' : 'transparent',
                        color: activeTab === 'code' ? '#58a6ff' : '#8b949e',
                        border: 'none',
                        borderRight: '1px solid #30363d',
                        borderTop: activeTab === 'code' ? '2px solid #58a6ff' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Code
                </button>
            </div>

            {/* Content Body */}
            <div>
                {activeTab === 'preview' ? (
                    <div
                        ref={containerRef}
                        style={{
                            padding: '0',
                            height: '500px',
                            overflowY: 'auto',
                            position: 'relative',
                            background: '#ffffff',
                            backgroundImage: 'radial-gradient(#e1e4e8 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    >
                        <ScrollProvider containerRef={containerRef}>
                            <div style={{ width: '100%', position: 'relative', zIndex: 1, minHeight: '200vh', paddingBottom: '50vh' }}>
                                <div style={{
                                    paddingTop: sticky ? '0' : '50px',
                                    position: sticky ? 'sticky' : 'static',
                                    top: 0,
                                    height: sticky ? '500px' : 'auto',
                                    display: sticky ? 'flex' : 'block',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    {children}
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: 0,
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#ccc',
                                    fontSize: '12px'
                                }}>
                                    Scroll to animate
                                </div>
                            </div>
                        </ScrollProvider>
                    </div>
                ) : (
                    <div style={{ margin: 0 }}>
                        {/* We reuse CodeBlock but remove its outer margin since we are inside a container */}
                        <div style={{ margin: '-20px 0' }}>
                            <CodeBlock code={code} language="tsx" title={title} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
