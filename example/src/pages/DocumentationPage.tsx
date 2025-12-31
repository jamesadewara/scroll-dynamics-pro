import React, { useState, useEffect } from 'react';
import './DocumentationPage.css';

const SECTIONS = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'installation', label: 'Installation' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'scroll-provider', label: 'ScrollProvider' },
    { id: 'scroll-section', label: 'ScrollSection' },
    { id: 'scroll-transform', label: 'ScrollTransform' },
    { id: 'use-scroll', label: 'useScroll Hook' },
    { id: 'performance', label: 'Performance Tips' },
];

export const DocumentationPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    // Simple scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = SECTIONS.map(s => document.getElementById(s.id));
            const scrollPos = window.scrollY + 100; // Offset

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
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="docs-container">
            {/* Sidebar */}
            <aside className="docs-sidebar">
                <a href="#/" className="docs-brand">Scroll Dynamics Pro</a>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">Getting Started</div>
                    {SECTIONS.slice(0, 3).map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">API Reference</div>
                    {SECTIONS.slice(3, 7).map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="docs-nav-group">
                    <div className="docs-nav-label">Advanced</div>
                    {SECTIONS.slice(7).map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`docs-nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </aside>

            {/* Content */}
            <main className="docs-content">

                <section id="introduction" className="docs-section">
                    <h1 className="docs-title">Documentation</h1>
                    <p className="docs-description">
                        Scroll Dynamics Pro is a lightweight, zero-dependency React library for creating high-performance scroll interactions.
                        It uses a centralized scroll loop to minimize layout thrashing and maximize frame rates.
                    </p>
                    <div className="docs-alert docs-alert-info">
                        <strong>Note:</strong> This library is optimized for modern browsers and uses <code>requestAnimationFrame</code> for updates.
                    </div>
                </section>

                <section id="installation" className="docs-section">
                    <h2 className="docs-h2">Installation</h2>
                    <p className="docs-p">Install the package via npm or yarn:</p>
                    <div className="docs-pre">
                        <code className="docs-code">npm install scroll-dynamics-pro</code>
                    </div>
                    <p className="docs-p">Or using yarn:</p>
                    <div className="docs-pre">
                        <code className="docs-code">yarn add scroll-dynamics-pro</code>
                    </div>
                </section>

                <section id="quick-start" className="docs-section">
                    <h2 className="docs-h2">Quick Start</h2>
                    <p className="docs-p">
                        To get started, wrap your application (or the scrolling container) with the <code className="docs-code-inline">ScrollProvider</code>.
                        This context manages the single scroll event listener for your entire app.
                    </p>
                    <div className="docs-pre">
                        <code className="docs-code">
                            {`import React from 'react';
import { ScrollProvider, ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

function App() {
  return (
    <ScrollProvider>
      <ScrollSection>
        <h1>Welcome to Scroll Dynamics</h1>
      </ScrollSection>
      
      <ScrollTransform effect="parallax" speed={0.2}>
        <img src="hero.jpg" alt="Hero" />
      </ScrollTransform>
    </ScrollProvider>
  );
}`}
                        </code>
                    </div>
                </section>

                <hr style={{ borderColor: '#30363d', opacity: 0.5, margin: '4rem 0' }} />

                <section id="scroll-provider" className="docs-section">
                    <h2 className="docs-h2">ScrollProvider</h2>
                    <p className="docs-p">
                        The root component that establishes the scroll context. It attaches the global scroll listener and broadcasts updates to all subscribers efficiently.
                    </p>

                    <h3 className="docs-h3">Props</h3>
                    <div className="docs-table-wrapper">
                        <table className="docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="prop-name">children</td>
                                    <td className="prop-type">React.ReactNode</td>
                                    <td className="prop-default">-</td>
                                    <td>The content of your application.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="scroll-section" className="docs-section">
                    <h2 className="docs-h2">ScrollSection</h2>
                    <p className="docs-p">
                        A semantic container for dividing your page content. It can handle horizontal scrolling areas as well.
                    </p>

                    <h3 className="docs-h3">Props</h3>
                    <div className="docs-table-wrapper">
                        <table className="docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="prop-name">direction</td>
                                    <td className="prop-type">'vertical' | 'horizontal'</td>
                                    <td className="prop-default">'vertical'</td>
                                    <td>Defines the flow of content within the section.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">className</td>
                                    <td className="prop-type">string</td>
                                    <td className="prop-default">-</td>
                                    <td>Additional CSS classes.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">style</td>
                                    <td className="prop-type">React.CSSProperties</td>
                                    <td className="prop-default">-</td>
                                    <td>Inline styles.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="scroll-transform" className="docs-section">
                    <h2 className="docs-h2">ScrollTransform</h2>
                    <p className="docs-p">
                        The powerhouse component for creating scroll-triggered animations. It supports built-in presets (parallax, fade, scale) and a fully custom render prop.
                    </p>

                    <h3 className="docs-h3">Props</h3>
                    <div className="docs-table-wrapper">
                        <table className="docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="prop-name">effect</td>
                                    <td className="prop-type">'parallax' | 'fade' | 'scale' | 'skew-velocity' | 'rotate' | 'rotate-x' | 'rotate-y' | 'slide-in' | 'custom'</td>
                                    <td className="prop-default">'parallax'</td>
                                    <td>The type of animation to apply.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">speed</td>
                                    <td className="prop-type">number</td>
                                    <td className="prop-default">0.2</td>
                                    <td>Speed factor for parallax effects. Negative values reverse direction.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">intensity</td>
                                    <td className="prop-type">number</td>
                                    <td className="prop-default">1</td>
                                    <td>Multiplier for effect strength (e.g. max skew angle, rotation degrees, slide distance).</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">direction</td>
                                    <td className="prop-type">'up' | 'down' | 'left' | 'right'</td>
                                    <td className="prop-default">'up'</td>
                                    <td>Direction for 'slide-in' effect.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">transform</td>
                                    <td className="prop-type">Function</td>
                                    <td className="prop-default">-</td>
                                    <td>
                                        Callback for 'custom' effect.<br />
                                        <code className="docs-code-inline">(el, progress, scrollY, velocity) ={'>'} void</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="prop-name">onEnter</td>
                                    <td className="prop-type">Function</td>
                                    <td className="prop-default">-</td>
                                    <td>Callback fired when element enters viewport.</td>
                                </tr>
                                <tr>
                                    <td className="prop-name">onLeave</td>
                                    <td className="prop-type">Function</td>
                                    <td className="prop-default">-</td>
                                    <td>Callback fired when element leaves viewport.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="docs-h3">Example: Custom Velocity Skew</h3>
                    <div className="docs-pre">
                        <code className="docs-code">
                            {`<ScrollTransform 
  effect="custom" 
  transform={(el, p, scrollY, velocity) => {
    // Skew based on scroll velocity (pixels/frame)
    el.style.transform = \`skewY(\${velocity * 0.1}deg)\`;
  }}
>
  <div className="card">Velocity Card</div>
</ScrollTransform>`}
                        </code>
                    </div>
                </section>

                <section id="use-scroll" className="docs-section">
                    <h2 className="docs-h2">useScroll Hook</h2>
                    <p className="docs-p">
                        A low-level hook for subscribing to scroll updates anywhere in your component tree.
                    </p>

                    <div className="docs-pre">
                        <code className="docs-code">
                            {`import { useScroll } from 'scroll-dynamics-pro';

const MyComponent = () => {
  const { subscribe, getScrollY } = useScroll();

  useEffect(() => {
    return subscribe((scrollY, velocity) => {
      console.log('Current scroll:', scrollY);
      console.log('Current velocity:', velocity);
    });
  }, [subscribe]);

  return <div>Check console</div>;
};`}
                        </code>
                    </div>

                    <div className="docs-alert docs-alert-warning">
                        <strong>Performance Warning:</strong> Avoid updating React state heavily inside the subscribe callback.
                        Prefer direct DOM manipulation (refs) for 60fps animations.
                    </div>
                </section>

                <section id="performance" className="docs-section">
                    <h2 className="docs-h2">Performance Tips</h2>
                    <p className="docs-p">
                        1. <strong>Direct DOM Updates:</strong> The `custom` transform callback gives you the raw DOM element. Use this to set `style.transform` directly instead of triggering React re-renders.
                        <br />
                        2. <strong>will-change:</strong> For complex animations, add `will-change: transform` to your CSS to hint the browser compositor.
                        <br />
                        3. <strong>Image Optimization:</strong> Heavy images can cause jank. Ensure images are properly sized and optimized.
                    </p>
                </section>

            </main>
        </div>
    );
};
