export const EXAMPLES = {
    // --- ScrollProvider Examples ---
    scrollProviderHelper: `// App.tsx
import { ScrollProvider } from 'scroll-dynamics-pro';
import { Hero } from './Hero';
import { Features } from './Features';

export default function App() {
  return (
    // Wrap your entire application or the scrollable area
    <ScrollProvider>
      <main>
        <Hero />
        <Features />
      </main>
    </ScrollProvider>
  );
}`,

    scrollProviderContext: `// context-usage.tsx
// The provider handles the global scroll listener automatically.
// No extra configuration is needed for nested components.

<ScrollProvider>
    <Header />
    <MainContent />
    <Footer />
</ScrollProvider>`,

    // --- ScrollSection Examples ---
    sectionBasic: `import { ScrollSection } from 'scroll-dynamics-pro';

<ScrollSection>
  <h2>About Us</h2>
  <p>This content is semantically separated.</p>
</ScrollSection>`,

    sectionHorizontal: `// Horizontal Scrolling Section
<ScrollSection direction="horizontal">
  <div style={{ display: 'flex', width: '300vw' }}>
    <div className="card">Card 1</div>
    <div className="card">Card 2</div>
    <div className="card">Card 3</div>
  </div>
</ScrollSection>`,

    sectionStyled: `<ScrollSection 
  className="hero-section" 
  style={{ height: '100vh', background: '#000' }}
>
  <h1>Full Screen Section</h1>
</ScrollSection>`,

    sectionNested: `<ScrollSection style={{ padding: 40 }}>
  <h2>Outer Section</h2>
  <ScrollSection direction="horizontal" style={{ height: 200, overflow: 'hidden' }}>
     <div style={{ width: '200%' }}>Inner Horizontal Track</div>
  </ScrollSection>
</ScrollSection>`,

    sectionGrid: `<ScrollSection>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
    <div className="item">Grid Item 1</div>
    <div className="item">Grid Item 2</div>
  </div>
</ScrollSection>`,

    sectionSticky: `<ScrollSection style={{ height: '200vh' }}>
  <div style={{ position: 'sticky', top: 20 }}>I stick while you scroll this section!</div>
</ScrollSection>`,

    // --- ScrollTransform Examples ---
    transformParallax: `<ScrollTransform effect="parallax" speed={0.2}>
  <img src="/bg.jpg" alt="Background" />
</ScrollTransform>`,

    transformRotate: `<ScrollTransform effect="rotate" intensity={1}>
  <div className="box">Rotating Box</div>
</ScrollTransform>`,

    transformFade: `<ScrollTransform effect="fade" intensity={1}>
  <h1>I Fade In!</h1>
</ScrollTransform>`,

    transformSlide: `<ScrollTransform effect="slide-in" direction="left" intensity={100}>
  <div className="slider">Sliding from Left</div>
</ScrollTransform>`,

    transformScale: `<ScrollTransform effect="scale" intensity={0.5}>
  <h2>Zoom In on Scroll</h2>
</ScrollTransform>`,

    transformSkew: `<ScrollTransform effect="skew-velocity" intensity={2}>
  <div className="fast-element">Whoosh!</div>
</ScrollTransform>`,

    transformFlip: `<ScrollTransform effect="rotate-x" intensity={180}>
  <div className="card">Flip Me</div>
</ScrollTransform>`,

    transform3D: `<ScrollTransform effect="rotate-y" intensity={360}>
  <div className="cube">3D Spin</div>
</ScrollTransform>`,

    transformCustom: `// Custom transform function for advanced control
<ScrollTransform 
  effect="custom" 
  transform={(el, progress, scrollY) => {
    // move in a sine wave
    const x = Math.sin(scrollY * 0.01) * 100;
    el.style.transform = \`translateX(\${x}px)\`;
  }}
>
  <div className="wave">~~~~</div>
</ScrollTransform>`,

    // --- useScroll Hook Examples ---
    hookBasic: `import { useScroll } from 'scroll-dynamics-pro';

const Scrolltracker = () => {
    const { getScrollY } = useScroll();
    return <div>Position: {getScrollY()}</div>;
};`,

    hookSubscribe: `import { useScroll } from 'scroll-dynamics-pro';
import { useEffect } from 'react';

const Logger = () => {
  const { subscribe } = useScroll();

  useEffect(() => {
    // Subscribe to scroll updates (runs on every frame)
    return subscribe((y, velocity) => {
      console.log(\`Scrolled to \${y} at \${velocity}px/frame\`);
    });
  }, [subscribe]);

  return null;
};`
};
