import React, { useState } from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

// --- Mock Components for Previews (Simulating library usage) ---
// In a real scenario, these would be the actual imports. 
// For this guide, we inline simple versions or use the actual library to demonstrate.

// --- Syntax Highlighting Logic (Custom & Lightweight) ---
const highlightCode = (code: string) => {
    // Escape HTML to prevent injection (basic)
    const safe = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Tokenizers
    const keywords = /\b(import|from|const|let|var|return|function|export|default|if|else|switch|case|break|interface|type)\b/g;
    const hooks = /\b(use[A-Z][a-zA-Z0-9]*)\b/g;
    const components = /\b([A-Z][a-zA-Z0-9]*)\b/g;
    const strings = /(['"`])(.*?)\1/g; // Simplified string matching
    const numbers = /\b\d+\b/g;
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
    const functions = /\b([a-z][a-zA-Z0-9]*)(?=\()/g;
    const brackets = /([{}()[\]])/g;

    // We need a way to not doublereplace. A simple approach is split/join or using a sophisticated parser.
    // Given the constraints, we'll try a sequential replace with unique placeholders or just use spans carefully.
    // NOTE: Detailed syntax highlighting via regex is fragile. 
    // We will use a simplified approach: Split by tokens and colorize.

    // Better Approach for basic React/TSX:
    return safe
        .replace(comments, '<span style="color: #6a9955;">$&</span>') // Comments (Greenish Grey)
        .replace(strings, '<span style="color: #ce9178;">$&</span>')  // Strings (Orange/Brown)
        .replace(keywords, '<span style="color: #569cd6; font-weight: bold;">$&</span>') // Keywords (Blue)
        .replace(components, '<span style="color: #4ec9b0;">$&</span>') // Types/Components (Teal)
        .replace(hooks, '<span style="color: #dcdcaa;">$&</span>')     // Hooks (Yellow)
        .replace(functions, '<span style="color: #dcdcaa;">$&</span>') // Functions (Yellow)
        .replace(brackets, '<span style="color: #ffd700;">$&</span>') // Brackets (Gold)
        .replace(numbers, '<span style="color: #b5cea8;">$&</span>');  // Numbers (Light Green)
};

const CodeBlock: React.FC<{ code: string; title?: string }> = ({ code, title }) => {
    const highlightedDetails = React.useMemo(() => highlightCode(code), [code]);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            background: '#1e1e1e', // VS Code Dark
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            border: '1px solid #333',
            margin: '20px 0',
            maxWidth: '100%',
        }}>
            {/* Header / Tab Bar */}
            <div style={{
                background: '#252526',
                padding: '8px 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #1e1e1e'
            }}>
                <span style={{
                    color: '#9cdcfe', // VS Code Blue
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{ fontSize: '14px' }}>TSX</span> {title || 'Example.tsx'}
                </span>
                <button
                    onClick={handleCopy}
                    style={{
                        background: 'transparent',
                        border: '1px solid #444',
                        color: copied ? '#4cd964' : '#ccc',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginLeft: '10px'
                    }}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>

            {/* Code Area */}
            <div style={{ padding: '15px', overflowX: 'auto', position: 'relative' }}>
                <pre style={{ margin: 0, color: '#d4d4d4' }}>
                    <code dangerouslySetInnerHTML={{ __html: highlightedDetails }} />
                </pre>
            </div>
        </div>
    );
};

// --- Live Preview Wrapper ---
const ExamplePreview: React.FC<{ code: string; title: string; children: React.ReactNode }> = ({ code, title, children }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    return (
        <div style={{ margin: '40px 0', border: '1px solid #e1e4e8', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f5f6fa', borderBottom: '1px solid #ddd', padding: '10px 20px', display: 'flex', gap: '20px' }}>
                <button
                    onClick={() => setActiveTab('preview')}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: 600, color: activeTab === 'preview' ? '#686de0' : '#7f8c8d',
                        borderBottom: activeTab === 'preview' ? '2px solid #686de0' : '2px solid transparent'
                    }}
                >
                    Preview
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: 600, color: activeTab === 'code' ? '#686de0' : '#7f8c8d',
                        borderBottom: activeTab === 'code' ? '2px solid #686de0' : '2px solid transparent'
                    }}
                >
                    Code
                </button>
            </div>

            {activeTab === 'preview' ? (
                <div style={{ padding: '40px', background: '#fff', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                    {/* Sandboxed container for scroll effects? No, we need window scroll usually, but for demo we might fake it or allow it. 
                        Since the library listens to window scroll, we will let it work naturally. */}
                    <div style={{ width: '100%', position: 'relative' }}>
                        {children}
                    </div>
                </div>
            ) : (
                <CodeBlock code={code} title={title} />
            )}
        </div>
    );
};

// --- Documentation Data & Styles ---
const SECTIONS = [
    { id: 'install', label: '01. Installation' },
    { id: 'start', label: '02. Quick Start' },
    { id: 'sections', label: '03. Sections & Layout' },
    { id: 'transforms', label: '04. Transforms' },
    { id: 'custom', label: '05. Custom & Math' },
];

export const DocumentationGuide: React.FC = () => {
    // Scroll To Helper
    const scrollToId = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <ScrollSection style={{ background: '#f5f6fa', color: '#2f3542', minHeight: '100vh', padding: '0 20px' }}>
            <style>{`
                .doc-layout { display: flex; gap: 40px; max-width: 1400px; margin: 0 auto; padding-top: 80px; }
                .doc-sidebar { flex: 0 0 250px; }
                .doc-content { flex: 1; min-width: 0; }
                
                @media (max-width: 900px) {
                    .doc-sidebar { display: none; }
                    .doc-layout { padding-top: 40px; }
                }

                h2 { font-size: 2rem; margin-bottom: 1rem; color: #2d3436; font-weight: 700; }
                h3 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.5rem; color: #636e72; font-weight: 600; }
                p { line-height: 1.7; color: #636e72; margin-bottom: 1rem; }
                code.inline { background: #dfe6e9; padding: 2px 6px; borderRadius: 4px; font-family: monospace; color: #d63031; }

                @media (max-width: 600px) {
                    .doc-layout { padding-top: 20px; gap: 20px; }
                    .doc-content { width: 100%; }
                    h1 { font-size: 2rem !important; }
                    h2 { font-size: 1.5rem !important; }
                    .doc-sidebar { display: none; }
                }
            `}</style>

            <div className="doc-layout">
                {/* --- Sidebar --- */}
                <div className="doc-sidebar">
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', color: '#6c5ce7' }}>DOCS</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {SECTIONS.map(s => (
                                <li key={s.id} style={{ marginBottom: '10px' }}>
                                    <button
                                        onClick={() => scrollToId(s.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#636e72', fontWeight: 500, fontSize: '1rem', textAlign: 'left', width: '100%' }}
                                    >
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Content --- */}
                <div className="doc-content">
                    <ScrollTransform effect="fade" direction="up">
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>Documentation</h1>
                        <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
                            Master the art of scrollytelling. A complete guide to <strong>scroll-dynamics-pro</strong>.
                        </p>
                    </ScrollTransform>

                    <hr style={{ margin: '50px 0', border: 'none', borderTop: '1px solid #dfe6e9' }} />

                    {/* 01. Installation */}
                    <div id="install">
                        <h2>01. Installation</h2>
                        <CodeBlock code="npm install scroll-dynamics-pro" title="Terminal" />
                    </div>

                    {/* 02. Quick Start */}
                    <div id="start" style={{ marginTop: '80px' }}>
                        <h2>02. Quick Start</h2>
                        <p>Wrap your app with <code className="inline">ScrollProvider</code> to enable the velocity engine.</p>

                        <CodeBlock
                            title="App.tsx"
                            code={`import { ScrollProvider } from 'scroll-dynamics-pro';
import { Hero } from './Hero';

export default function App() {
  return (
    <ScrollProvider>
      <Hero />
      {/* Your other components */}
    </ScrollProvider>
  );
}`}
                        />
                    </div>

                    {/* 03. Sections */}
                    <div id="sections" style={{ marginTop: '80px' }}>
                        <h2>03. Sections</h2>
                        <p>Use <code className="inline">ScrollSection</code> to delimit content areas.</p>

                        <h3>Horizontal Scrolling</h3>
                        <ExamplePreview
                            title="HorizontalSection.tsx"
                            code={`import { ScrollSection } from 'scroll-dynamics-pro';

export const HorizontalDemo = () => (
  <ScrollSection direction="horizontal" trackLength="200vw">
    <div style={{ display: 'flex', height: '100%', width: '200vw' }}>
      <div style={{ flex: 1, background: '#a29bfe', padding: 20 }}>Slide 1</div>
      <div style={{ flex: 1, background: '#74b9ff', padding: 20 }}>Slide 2</div>
    </div>
  </ScrollSection>
);`}
                        >
                            <div style={{ height: '300px', border: '2px dashed #ccc', overflow: 'hidden', position: 'relative' }}>
                                {/* Simulated view for documentation only - in real app use full page */}
                                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                                    (Preview requires full page scroll context. Imagine content moving left as you scroll down.)
                                </div>
                            </div>
                        </ExamplePreview>
                    </div>

                    {/* 04. Transforms */}
                    <div id="transforms" style={{ marginTop: '80px' }}>
                        <h2>04. Transforms</h2>
                        <p>The <code className="inline">ScrollTransform</code> component is your swiss-army knife for animations.</p>

                        <h3>Parallax</h3>
                        <ExamplePreview
                            title="ParallaxExample.tsx"
                            code={`<ScrollTransform effect="parallax" speed={0.2}>
  <div style={{ 
    width: 100, height: 100, 
    background: '#ff7675', 
    borderRadius: '12px' 
  }} />
</ScrollTransform>`}
                        >
                            <ScrollTransform effect="parallax" speed={0.2}>
                                <div style={{ width: 100, height: 100, background: '#ff7675', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} />
                            </ScrollTransform>
                        </ExamplePreview>

                        <h3>Rotate & Skew</h3>
                        <ExamplePreview
                            title="RotateSkew.tsx"
                            code={`<ScrollTransform effect="rotate" intensity={2}>
  <div style={{ 
    width: 100, height: 100, 
    background: '#55efc4', 
    borderRadius: '12px'
  }} />
</ScrollTransform>

<ScrollTransform effect="skew-velocity" intensity={1}>
    <h2>I Skew on Scroll!</h2>
</ScrollTransform>`}
                        >
                            <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
                                <ScrollTransform effect="rotate" intensity={2}>
                                    <div style={{ width: 100, height: 100, background: '#55efc4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        🤖
                                    </div>
                                </ScrollTransform>
                                <ScrollTransform effect="skew-velocity" intensity={1}>
                                    <h2 style={{ margin: 0, color: '#00b894' }}>Warp Speed!</h2>
                                </ScrollTransform>
                            </div>
                        </ExamplePreview>
                    </div>

                    {/* 05. Custom */}
                    <div id="custom" style={{ marginTop: '80px', paddingBottom: '200px' }}>
                        <h2>05. Custom Transforms (Math)</h2>
                        <p>
                            For ultimate control, use <code className="inline">effect="custom"</code> and provide a
                            <code className="inline">transform</code> function. This function receives the DOM element,
                            progress (0-1), current scrollY, and velocity.
                        </p>

                        <h3>The "Wobble" Effect</h3>
                        <p>Uses <code className="inline">Math.sin</code> to create a wave motion based on scroll position.</p>

                        <ExamplePreview
                            title="WobbleEffect.tsx"
                            code={`<ScrollTransform 
  effect="custom"
  transform={(el, progress, scrollY) => {
    // Oscillate horizontally 50px using Sine wave
    const x = Math.sin(scrollY * 0.02) * 50;
    el.style.transform = \`translateX(\${x}px)\`;
  }}
>
  <div className="circle">🌊</div>
</ScrollTransform>`}
                        >
                            <div style={{ padding: '0 50px' }}>
                                <ScrollTransform
                                    effect="custom"
                                    transform={(el, scrollY) => {
                                        const x = Math.sin(scrollY * 0.02) * 50;
                                        el.style.transform = `translateX(${x}px)`;
                                    }}
                                >
                                    <div style={{
                                        width: 60, height: 60,
                                        background: '#0984e3',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px',
                                        color: 'white'
                                    }}>
                                        🌊
                                    </div>
                                </ScrollTransform>
                            </div>
                        </ExamplePreview>

                        <h3>Circular Motion</h3>
                        <p>Move an element in a circle as you scroll.</p>
                        <ExamplePreview
                            title="CircularMotion.tsx"
                            code={`<ScrollTransform 
  effect="custom"
  transform={(el, progress) => {
    // progress is 0..1 as it moves through viewport
    const angle = progress * Math.PI * 2; // Full circle
    const radius = 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    el.style.transform = \`translate(\${x}px, \${y}px)\`;
  }}
>
  <div className="planet">🪐</div>
</ScrollTransform>`}
                        >
                            <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
                                <ScrollTransform
                                    effect="custom"
                                    transform={(el, progress) => {
                                        const angle = progress * Math.PI * 2;
                                        const radius = 50;
                                        const x = Math.cos(angle) * radius;
                                        const y = Math.sin(angle) * radius;
                                        el.style.transform = `translate(${x}px, ${y}px)`;
                                    }}
                                >
                                    <div style={{ fontSize: '40px' }}>🪐</div>
                                </ScrollTransform>
                            </div>
                        </ExamplePreview>

                    </div>


                </div>
            </div>
        </ScrollSection>
    );
};
