import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const DocumentationGuide: React.FC = () => {
    return (
        <ScrollSection style={{ background: '#f5f6fa', color: '#2f3542', padding: '100px 5%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>

                {/* Sticky Side Nav */}
                <div style={{ flex: '0 0 250px', display: 'none' }}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '20px', borderBottom: '2px solid #e056fd', paddingBottom: '10px' }}>Documentation</h3>
                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2 }}>
                            <li><strong>01.</strong> Installation</li>
                            <li><strong>02.</strong> ScrollProvider</li>
                            <li><strong>03.</strong> ScrollSection</li>
                            <li><strong>04.</strong> ScrollTransform</li>
                        </ul>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: '300px' }}>

                    <ScrollTransform effect="fade">
                        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Quick Start</h2>
                    </ScrollTransform>

                    <section style={{ marginBottom: '60px' }}>
                        <h3>01. Installation</h3>
                        <pre style={{ background: '#2f3542', color: '#fff', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
                            <code>npm install scroll-dynamics-pro</code>
                        </pre>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h3>02. Setup Context</h3>
                        <p>Wrap your app in <code>ScrollProvider</code>.</p>
                        <pre style={{ background: '#2f3542', color: '#fff', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
                            {`import { ScrollProvider } from 'scroll-dynamics-pro';

function App() {
  return (
    <ScrollProvider>
       <YourContent />
    </ScrollProvider>
  );
}`}
                        </pre>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h3>03. Create Sections</h3>
                        <p>Use <code>ScrollSection</code> for layout partitions.</p>
                        <pre style={{ background: '#2f3542', color: '#fff', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
                            {`<ScrollSection direction="horizontal">
   <div>Slide 1</div>
   <div>Slide 2</div>
</ScrollSection>`}
                        </pre>
                    </section>

                    <section style={{ marginBottom: '60px' }}>
                        <h3>04. Animate</h3>
                        <p>Use <code>ScrollTransform</code> for specific effects.</p>
                        <pre style={{ background: '#2f3542', color: '#fff', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
                            {`<ScrollTransform effect="parallax" speed={0.5}>
   <img src="bg.jpg" />
</ScrollTransform>`}
                        </pre>
                    </section>

                </div>
            </div>
        </ScrollSection>
    );
};
