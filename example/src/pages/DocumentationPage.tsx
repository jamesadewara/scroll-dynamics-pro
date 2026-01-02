import React, { useState, useEffect } from 'react';
import './DocumentationPage.css';
import { CodeBlock } from '../components/CodeBlock';
import { PreviewBlock } from '../components/PreviewBlock';
import { EXAMPLES } from '../components/DocExamples';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';
import { ParallaxHero } from '../components/ParallaxHero';
import { VelocitySkewSection } from '../components/VelocitySkewSection';
import { HorizontalGallery } from '../components/HorizontalGallery';
import { FixedBackgroundStory } from '../components/FixedBackgroundStory';
import { AdvancedTransforms } from '../components/AdvancedTransforms';
import { BigTextReveal } from '../components/BigTextReveal';
import { ColorShiftSection } from '../components/ColorShiftSection';
import { CosmicJourney } from '../components/CosmicJourney';
import { GridShowcase } from '../components/GridShowcase';
import { PinnedContent } from '../components/PinnedContent';
import { ScrollytellingShowcase } from '../components/ScrollytellingShowcase';


const SECTIONS = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'installation', label: 'Installation' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'scroll-provider', label: 'ScrollProvider' },
    { id: 'scroll-section', label: 'ScrollSection' },
    { id: 'scroll-transform', label: 'ScrollTransform' },
    { id: 'math-effects', label: 'Math Effects' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'use-scroll', label: 'useScroll Hook' },
    { id: 'performance', label: 'Performance Tips' },
];

export const DocumentationPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = SECTIONS.map(s => document.getElementById(s.id));
            const scrollPos = window.scrollY + 120;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="docs-container">
            {/* Sidebar Navigation */}
            <aside className="docs-sidebar">
                <div style={{ marginBottom: '2rem', marginTop: '4rem' }}>
                    <h3 style={{ margin: 0, color: '#fff' }}>Scroll Dynamics</h3>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>v1.0.0</div>
                </div>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">Getting Started</div>
                    {SECTIONS.slice(0, 3).map(item => (
                        <a key={item.id} href={`#${item.id}`} className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">Core Components</div>
                    {SECTIONS.slice(3, 6).map(item => (
                        <a key={item.id} href={`#${item.id}`} className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">Hooks & Advanced</div>
                    {SECTIONS.slice(6).map(item => (
                        <a key={item.id} href={`#${item.id}`} className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                            {item.label}
                        </a>
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="docs-content">

                {/* Introduction */}
                <section id="introduction" className="docs-section">
                    <h1 className="docs-title">Documentation</h1>
                    <p className="docs-lead">
                        Build high-performance scroll interactions in React. Lightweight, dependency-free, and buttery smooth.
                    </p>
                    <div className="doc-badges" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <span style={{ background: '#2dba4e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>v1.0.0</span>
                        <span style={{ background: '#333', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>TypeScript</span>
                        <span style={{ background: '#333', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>MIT</span>
                    </div>
                </section>

                <hr className="docs-divider" />

                {/* Installation */}
                <section id="installation" className="docs-section">
                    <h2>Installation</h2>
                    <p>Install the package using your preferred package manager.</p>
                    <CodeBlock code="npm install scroll-dynamics-pro" language="bash" title="Terminal" />
                    <CodeBlock code="yarn add scroll-dynamics-pro" language="bash" title="Terminal" />
                </section>

                <hr className="docs-divider" />

                {/* Quick Start */}
                <section id="quick-start" className="docs-section">
                    <h2>Quick Start</h2>
                    <p>Wrap your application with the <code>ScrollProvider</code> and start animating.</p>
                    <CodeBlock code={EXAMPLES.scrollProviderHelper} language="tsx" title="App.tsx" />
                </section>

                <hr className="docs-divider" />

                {/* ScrollProvider */}
                <section id="scroll-provider" className="docs-section">
                    <h2>ScrollProvider</h2>
                    <p>The context provider that manages the single scroll event listener.</p>

                    <h3>Usage</h3>
                    <CodeBlock code={EXAMPLES.scrollProviderContext} language="tsx" title="Context Usage" />
                </section>

                <hr className="docs-divider" />

                {/* ScrollSection */}
                <section id="scroll-section" className="docs-section">
                    <h2>ScrollSection</h2>
                    <p>Defines logical sections of your page. Supports both vertical and horizontal layouts.</p>

                    <h3>Basic Usage</h3>
                    <CodeBlock code={EXAMPLES.sectionBasic} language="tsx" title="Section" />

                    <h3>Horizontal Scrolling</h3>
                    <PreviewBlock code={EXAMPLES.sectionHorizontal} title="Horizontal Layout">
                        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                            <HorizontalGallery />
                        </div>
                    </PreviewBlock>

                    <h3>Sticky Content</h3>
                    <PreviewBlock code={EXAMPLES.sectionSticky} title="Sticky Positioning">
                        <FixedBackgroundStory />
                    </PreviewBlock>

                    <h3>Grid Layout</h3>
                    <PreviewBlock code={EXAMPLES.sectionGrid} title="Grid Layout">
                        <ScrollSection>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                <div style={{ background: '#2d3436', padding: 20, borderRadius: 8 }}>Grid Item 1</div>
                                <div style={{ background: '#2d3436', padding: 20, borderRadius: 8 }}>Grid Item 2</div>
                            </div>
                        </ScrollSection>
                    </PreviewBlock>

                    <h3>Nested Section</h3>
                    <CodeBlock code={EXAMPLES.sectionNested} language="tsx" title="Nested Sections" />
                </section>

                <hr className="docs-divider" />

                {/* ScrollTransform */}
                <section id="scroll-transform" className="docs-section">
                    <h2>ScrollTransform</h2>
                    <p>The core component for animations. Use presets or fully custom logic.</p>

                    <div className="example-grid">
                        <div>
                            <h3>Parallax</h3>
                            <PreviewBlock code={EXAMPLES.transformParallax} title="Parallax Effect" sticky>
                                <ScrollTransform effect="parallax" speed={0.2}>
                                    <div style={{ width: 150, height: 150, background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', borderRadius: 20, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}></div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                        <div>
                            <h3>Rotate</h3>
                            <PreviewBlock code={EXAMPLES.transformRotate} title="Rotation Effect" sticky>
                                <ScrollTransform effect="rotate" intensity={1}>
                                    <div style={{ width: 150, height: 150, background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                                        🔄
                                    </div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                    </div>

                    <div className="example-grid">
                        <div>
                            <h3>Skew</h3>
                            <PreviewBlock code={EXAMPLES.transformSkew} title="Skew Velocity">
                                <VelocitySkewSection />
                            </PreviewBlock>
                        </div>
                        <div>
                            <h3>Scale</h3>
                            <PreviewBlock code={EXAMPLES.transformScale} title="Scale Effect" sticky>
                                <ScrollTransform effect="scale" intensity={0.5}>
                                    <div style={{ width: 150, height: 150, background: '#e17055', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                                        ZOOM
                                    </div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                    </div>

                    <div className="example-grid">
                        <div>
                            <h3>Fade In</h3>
                            <PreviewBlock code={EXAMPLES.transformFade} title="Fade Effect" sticky>
                                <ScrollTransform effect="fade" intensity={1}>
                                    <div style={{ padding: 20, background: '#00b894', borderRadius: 8, color: 'white', fontWeight: 'bold' }}>I FADE IN</div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                        <div>
                            <h3>Slide In</h3>
                            <PreviewBlock code={EXAMPLES.transformSlide} title="Slide Effect" sticky>
                                <ScrollTransform effect="slide-in" direction="left" intensity={50}>
                                    <div style={{ padding: 20, background: '#e84393', borderRadius: 8, color: 'white', fontWeight: 'bold' }}>SLIDE IN</div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                    </div>

                    <div className="example-grid">
                        <div>
                            <h3>Flip (Rotate X)</h3>
                            <PreviewBlock code={EXAMPLES.transformFlip} title="Flip Effect" sticky>
                                <ScrollTransform effect="rotate-x" intensity={180}>
                                    <div style={{ width: 150, height: 100, background: '#fdcb6e', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                                        💳
                                    </div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                        <div>
                            <h3>3D Spin (Rotate Y)</h3>
                            <PreviewBlock code={EXAMPLES.transform3D} title="3D Effect" sticky>
                                <ScrollTransform effect="rotate-y" intensity={360}>
                                    <div style={{ width: 100, height: 100, background: '#636e72', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>
                                        🧊
                                    </div>
                                </ScrollTransform>
                            </PreviewBlock>
                        </div>
                    </div>

                    <h3>Advanced: Custom Transforms</h3>
                    <p>For complete control, access the raw DOM element and scroll velocity.</p>
                    <PreviewBlock code={EXAMPLES.transformCustom} title="Custom Math Animation" sticky>
                        <ScrollTransform
                            effect="custom"
                            transform={(el, scrollY) => {
                                const x = Math.sin(scrollY * 0.05) * 50;
                                el.style.transform = `translateX(${x}px)`;
                            }}
                        >
                            <div style={{ fontSize: '3rem' }}>🌊 🌊 🌊</div>
                        </ScrollTransform>
                    </PreviewBlock>

                </section>

                <hr className="docs-divider" />

                {/* Component Showcase */}
                <section id="showcase" className="docs-section">
                    <h2>Component Showcase</h2>
                    <p>Real-world examples of what you can build.</p>

                    <h3>Parallax Hero</h3>
                    <PreviewBlock code={EXAMPLES.transformParallax} title="Parallax Hero">
                        <div style={{ height: '500px', overflow: 'hidden' }}>
                            <ParallaxHero />
                        </div>
                    </PreviewBlock>

                </section>

                <hr className="docs-divider" />

                <section id="math-effects" className="docs-section">
                    <h2>Math Effects</h2>
                    <p>Use custom logic for advanced animations.</p>
                    <PreviewBlock code={EXAMPLES.transformCustom} title="Custom Math Animation" sticky>
                        <ScrollTransform
                            effect="custom"
                            transform={(el, scrollY) => {
                                const x = Math.sin(scrollY * 0.05) * 50;
                                el.style.transform = `translateX(${x}px)`;
                            }}
                        >
                            <div style={{ fontSize: '3rem' }}>🌊 🌊 🌊</div>
                        </ScrollTransform>
                    </PreviewBlock>
                </section>

                <hr className="docs-divider" />

                {/* Component Showcase */}
                <section id="showcase" className="docs-section">
                    <h2>Component Showcase</h2>
                    <p>Real-world examples of what you can build.</p>

                    <h3>Parallax Hero</h3>
                    <PreviewBlock code="<ParallaxHero />" title="Parallax Hero">
                        <div style={{ height: '500px', overflow: 'hidden' }}>
                            <ParallaxHero />
                        </div>
                    </PreviewBlock>

                    <h3>Scrollytelling</h3>
                    <PreviewBlock code="<ScrollytellingShowcase />" title="Scrollytelling">
                        <ScrollytellingShowcase />
                    </PreviewBlock>

                    <h3>Cosmic Journey</h3>
                    <PreviewBlock code="<CosmicJourney />" title="Cosmic Journey">
                        <CosmicJourney />
                    </PreviewBlock>

                    <h3>Big Text Reveal</h3>
                    <PreviewBlock code="<BigTextReveal />" title="Big Text Reveal">
                        <BigTextReveal />
                    </PreviewBlock>

                    <h3>Velocity Skew</h3>
                    <PreviewBlock code="<VelocitySkewSection />" title="Velocity Skew">
                        <VelocitySkewSection />
                    </PreviewBlock>

                    <h3>Horizontal Gallery</h3>
                    <PreviewBlock code="<HorizontalGallery />" title="Horizontal Gallery">
                        <div style={{ height: '400px' }}>
                            <HorizontalGallery />
                        </div>
                    </PreviewBlock>

                    <h3>Grid Showcase</h3>
                    <PreviewBlock code="<GridShowcase />" title="Grid Showcase">
                        <GridShowcase />
                    </PreviewBlock>

                    <h3>Pinned Content</h3>
                    <PreviewBlock code="<PinnedContent />" title="Pinned Content">
                        <PinnedContent />
                    </PreviewBlock>

                    <h3>Fixed Background</h3>
                    <PreviewBlock code="<FixedBackgroundStory />" title="Fixed Background">
                        <FixedBackgroundStory />
                    </PreviewBlock>

                    <h3>Advanced 3D Transforms</h3>
                    <PreviewBlock code="<AdvancedTransforms />" title="3D Cards">
                        <AdvancedTransforms />
                    </PreviewBlock>

                    <h3>Color Shift</h3>
                    <PreviewBlock code="<ColorShiftSection />" title="Color Shift">
                        <ColorShiftSection />
                    </PreviewBlock>
                </section>

                <hr className="docs-divider" />

                {/* useScroll Hook */}
                <section id="use-scroll" className="docs-section">
                    <h2>useScroll Hook</h2>
                    <p>Directly access scroll state in any component.</p>
                    <CodeBlock code={EXAMPLES.hookSubscribe} language="tsx" title="Subscription Pattern" />
                </section>

                <section id="performance" className="docs-section">
                    <h2>Performance</h2>
                    <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
                        <li><strong>Single Listener:</strong> We only attach one scroll listener to the window.</li>
                        <li><strong>rAF Loop:</strong> Updates are synced with the browser paint cycle.</li>
                        <li><strong>CSS Transforms:</strong> All animations utilize hardware-accelerated CSS properties.</li>
                    </ul>
                </section>

            </main >
        </div >
    );
};
