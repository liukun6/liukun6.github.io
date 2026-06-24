# Design Specification: Light-Mode Glassmorphism Portfolio Redesign

This document specifies the updated plan to align the personal portfolio homepage (`index.html`) with the premium **Light-Mode Glassmorphism** design mockup (`kun_liu_light_glass_portfolio_1782232596389.png`).

---

## 1. Navbar & Header Layout

### Mockup Alignment
*   **Site Title/Branding**: A bold, dark title `"Kun Liu's Blog"` aligned to the left of the navbar container.
*   **Navigation Menu**: Centered/right-aligned text links.
*   **Active Indicator**: A glass-morphic rounded pill button background (`rgba(255, 255, 255, 0.7)`) with a subtle shadow and dark text, replacing the current bottom border line.
*   **Structure**:
    ```html
    <header>
      <nav class="glass-nav">
        <div class="nav-brand">Kun Liu's Blog</div>
        <ul id="nav-menu">
          <li id="cg-example">Computational Geometry</li>
          <li id="webgl-example">WebGL</li>
          <li id="dggs-example">DGGS</li>
          <li id="about">About</li>
        </ul>
      </nav>
    </header>
    ```

---

## 2. Card Grid Layout & Interactivity

### CSS Grid Alignment
*   **Grid Bug Fix**: Remove `containerEle.style.display = 'block'` from the JavaScript file, replacing it with `containerEle.style.display = 'grid'` (or class-based hidden toggling) to prevent breaking the grid layout.
*   **Interactive Cards**: Make the entire card interactive (`cursor: pointer`, wraps/fires navigation `onclick`), with premium lift animations (`transform: translateY(-6px)`) and soft box-shadow expansion.

### Card Elements Structure
```html
<div class="item" onclick="location.href='#{url}'">
  <div class="img-container">
    <img src="#{src}" loading="lazy" onload="this.classList.add('loaded')" alt="">
    <div class="tech-badge">#{badge}</div>
  </div>
  <div class="content">
    <h3 class="card-title">#{title}</h3>
    <p class="card-desc">#{desc}</p>
    <span class="card-link">#{linkText}</span>
  </div>
</div>
```

*   **Image Container**: A clean, rounded white container (`background: #ffffff; padding: 6px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.8)`) housing the image.
*   **Tech Badge Overlay**: An absolute-positioned badge in the bottom-right corner of the image area containing a code symbol (e.g. `</>` or `<//>`).
*   **Card Typography**:
    *   **Title**: Bold primary dark gray text (`#2d3135`), size `1.15rem`.
    *   **Description**: 2-3 lines of secondary slate gray text (`#5a6065`), line-height `1.5`, size `0.9rem`.
    *   **Footer Link**: Underlined text link with slate-blue hover transitions.

---

## 3. Data Integration & Enrichment

To render full details, the current JSON data inside `index.html` will be enhanced to contain short descriptions and specific badge symbols for each item:

*   **Computational Geometry**: Badge `</>`, short descriptions detailing the specific algorithm (e.g., *"Graham's scan algorithm to construct 2D convex hulls"*).
*   **WebGL**: Badge `<//>`, short descriptions detailing shader/lighting models (e.g., *"Interactive WebGL model with Blinn-Phong shading and normal maps"*).
*   **DGGS**: Badge `</>`, description detailing discrete global grids.

---

## 4. Verification Plan

*   **Visual Layout Check**: Verify navbar has branding logo on left and pill active background.
*   **Grid Alignment**: Confirm 3 columns of cards on desktop layouts (no 1-column stretch).
*   **Card Interactivity**: Check hover transitions and ensure clicking the entire card navigates to the example.
*   **Aesthetics**: Ensure glassmorphism properties (blur, borders, shadows, background glows) match the mockup's premium quality.
