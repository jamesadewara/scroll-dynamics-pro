# scroll-dynamics-pro

A lightweight, production-ready React library for mixed vertical and horizontal scrolling.
Zero dependencies, 60FPS performance, and native sticky positioning.

## Features

- **Mixed Scrolling:** Seamlessly switch between vertical and horizontal scrolling sections.
- **Scroll Restore:** Maintains correct horizontal position on page reload (no jumps).
- **High Performance:** Uses `requestAnimationFrame` and direct DOM manipulation (no React state thrashing).
- **Optimization:** Uses `IntersectionObserver` to only run logic when sections are in view.
- **Lightweight:** No heavy animation libraries (GSAP/Framer Motion).

## Installation

```bash
npm install scroll-dynamics-pro
# or
yarn add scroll-dynamics-pro
```

## Usage

Wrap your application (or just the scrolling area) in `ScrollProvider`, then use `ScrollSection` to create scrollable areas.

```tsx
import React from "react";
import {
  ScrollProvider,
  ScrollSection,
  ScrollTransform,
} from "scroll-dynamics-pro";

const App = () => {
  return (
    <ScrollProvider>
      {/* Normal Vertical Content */}
      <ScrollSection direction="vertical">
        <div
          style={{ height: "100vh", background: "#f0f0f0", padding: "50px" }}
        >
          <h1>Welcome to the Scroll Experience</h1>

          <ScrollTransform effect="fade">
            <h2>I fade in as I scroll up!</h2>
          </ScrollTransform>

          <ScrollTransform effect="parallax" speed={0.5}>
            <div
              className="parallax-box"
              style={{
                background: "purple",
                padding: "20px",
                marginTop: "50px",
                color: "white",
              }}
            >
              I move slower than the scroll!
            </div>
          </ScrollTransform>
        </div>
      </ScrollSection>

      {/* Horizontal Scroll Section */}
      {/* trackLength="300vw" means the user needs to scroll 2 viewport heights 
          to move through the 3 viewports worth of content. */}
      <ScrollSection direction="horizontal" trackLength="300vw">
        <div className="card" style={{ width: "100vw", background: "red" }}>
          Slide 1
        </div>
        <div className="card" style={{ width: "100vw", background: "blue" }}>
          Slide 2
        </div>
        <div className="card" style={{ width: "100vw", background: "green" }}>
          Slide 3
        </div>
      </ScrollSection>

      {/* More Vertical Content */}
      <ScrollSection direction="vertical">
        <div style={{ height: "100vh", background: "#e0e0e0" }}>
          <h2>The End</h2>
        </div>
      </ScrollSection>
    </ScrollProvider>
  );
};

export default App;
```

## API

### `<ScrollProvider>`

Tracks global scroll position. Must wrap all `ScrollSection` components.

### `<ScrollSection>`

| Prop          | Type                         | Default      | Description                                                                                     |
| ------------- | ---------------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `direction`   | `'vertical' \| 'horizontal'` | `'vertical'` | The scroll direction.                                                                           |
| `trackLength` | `string`                     | `'300vw'`    | Total height of the scroll track (only for horizontal). Determines how long the scroll "lasts". |
| `className`   | `string`                     |              | CSS class for the section container.                                                            |
| `style`       | `object`                     |              | Inline styles for the section container.                                                        |

### `<ScrollTransform>`

Animates children based on scroll position.

| Prop        | Type                                          | Default      | Description                                                       |
| ----------- | --------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| `effect`    | `'parallax' \| 'fade' \| 'scale' \| 'custom'` | `'parallax'` | The animation effect to apply.                                    |
| `speed`     | `number`                                      | `0.2`        | (Parallax only) Speed factor relative to scroll.                  |
| `range`     | `[number, number]`                            | `[0, 1]`     | Range of viewport traversal [0=enter, 1=leave] for interpolation. |
| `transform` | `function`                                    |              | Custom transform function `(element, progress, scrollY) => void`. |

## License

MIT
