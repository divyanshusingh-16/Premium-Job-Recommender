# 🎯 Frontend Overhaul - Code Reference Guide

## Quick Navigation

- [Color Scheme & Variables](#color-scheme--variables)
- [Key CSS Classes](#key-css-classes)
- [Animation Keyframes](#animation-keyframes)
- [Component Breakdown](#component-breakdown)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Theme Implementation](#theme-implementation)

---

## Color Scheme & Variables

### Dark Mode (Default)
```css
:root {
  --bg-main: #0a0e27;              /* Deep navy background */
  --nav-bg: rgba(10, 14, 39, 0.85);
  --card-bg: rgba(30, 41, 59, 0.5);
  --text-main: #f8fafc;             /* Light text */
  --text-muted: #94a3b8;            /* Muted gray */
  --border-color: rgba(255, 255, 255, 0.1);
  --primary: #3b82f6;               /* Bright blue */
  --primary-hover: #2563eb;
  --shadow-color: rgba(0, 0, 0, 0.4);
  --glow-color: rgba(59, 130, 246, 0.5);
  --input-bg: rgba(15, 23, 42, 0.7);
  --accent-purple: #a855f7;
  --accent-pink: #ec4899;
  --success: #26d07c;
  --danger: #ff4d6d;
  --radius: 20px;
}
```

### Light Mode
```css
[data-theme="light"] {
  --bg-main: #f5f7fa;
  --nav-bg: rgba(255, 255, 255, 0.92);
  --card-bg: rgba(255, 255, 255, 0.8);
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: rgba(0, 0, 0, 0.08);
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --shadow-color: rgba(0, 0, 0, 0.06);
  --glow-color: rgba(37, 99, 235, 0.25);
  --input-bg: rgba(248, 250, 252, 0.95);
}
```

---

## Key CSS Classes

### Background & Layout
- **`body`** - Aurora gradient with animated orbs
- **`.container`** - Max-width 1100px, centered content
- **`.navbar`** - Sticky header with backdrop blur

### Cards & Containers
- **`.glass-card`** - Main hero/stats cards with glassmorphism
- **`.premium-form-card`** - Dashboard form container
- **`.card`** - Generic card element
- **`.job`** - Job recommendation card with shine effect

### Typography
- **`h1`** - 3rem, bold landing page heading
- **`h2`** - 1.6rem, section headings
- **`.gradient-text`** - Animated multi-color gradient text
- **`.glow-text`** - Static purple-pink gradient

### Form Elements
- **`.form-grid`** - 2-column responsive form layout
- **`.form-group`** - Individual field wrapper
- **`.modern-label`** - Styled form label
- **`.modern-input`** - Enhanced input/textarea/select
- **`.helper-text`** - Descriptive text under inputs

### Buttons & Interactions
- **`.btn`** - Primary gradient button
- **`.btn.ghost`** - Secondary transparent button
- **`.glow-btn`** - Alias for `.btn` with glow
- **`.pill-tag`** - Rounded pill-style tags
- **`.theme-toggle`** - Dark/light mode toggle button

### Lists & Grids
- **`.grid`** - 3-column job grid (responsive)
- **`.stats-list`** - Unordered list with icons
- **`.pill-tags-container`** - Horizontal pill collection
- **`.tagrow`** - Horizontal tag row in job cards

---

## Animation Keyframes

### Background Float Animation
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

/* Applied to: body::before, body::after */
/* Duration: 20-25s */
/* Timing: ease-in-out infinite */
```

### Gradient Text Animation
```css
@keyframes gradientShift {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

/* Applied to: .gradient-text */
/* Duration: 6s */
/* Timing: ease infinite */
```

### Spinner Animation
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Applied to: .spinner */
/* Duration: 0.8s */
/* Timing: linear infinite */
```

---

## Component Breakdown

### 1. Landing Page Hero Section

**HTML Structure:**
```html
<div class="container hero-container">
  <div class="glass-card">
    <h1>Premium Job Recommendations,<br>
      <span class="gradient-text">Powered by AI Matching</span>
    </h1>
    <p class="subtitle">...</p>
    <div class="pill-tags-container">
      <span class="pill-tag">✨ TF-IDF Similarity</span>
      <!-- more pills -->
    </div>
    <div class="btn-row">
      <a class="glow-btn" href="...">Get Started</a>
      <a class="btn ghost" href="...">View Insights</a>
    </div>
  </div>
  
  <div class="glass-card">
    <h2>Quick Stats</h2>
    <ul class="stats-list">
      <li><span>⭐</span> Modern glassmorphic UI</li>
      <!-- more stats -->
    </ul>
  </div>
</div>
```

**CSS Grid Layout:**
```css
.hero-container {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 28px;
}

@media (max-width: 900px) {
  .hero-container { grid-template-columns: 1fr; }
}
```

### 2. Dashboard Form

**Form Structure:**
```html
<div class="premium-form-card">
  <div class="form-header">
    <h2>Job Recommendation Dashboard</h2>
    <p>Fill the form...</p>
  </div>
  
  <form class="form-grid">
    <!-- Skills (full-width) -->
    <div class="form-group full-width">
      <label class="modern-label">💼 Skills (Required)</label>
      <textarea class="modern-input" required></textarea>
      <div class="helper-text">💡 Use comma-separated values...</div>
    </div>
    
    <!-- Experience (1 col) -->
    <div class="form-group">
      <label class="modern-label">📅 Experience (Years)</label>
      <input type="number" class="modern-input" />
    </div>
    
    <!-- More groups... -->
    
    <!-- Action buttons (full-width) -->
    <div class="action-row">
      <button class="glow-btn">🚀 Recommend Jobs</button>
      <a class="btn ghost" href="...">← Go Back</a>
    </div>
  </form>
</div>
```

**Form Grid:**
```css
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

/* Mobile: Single column */
@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
}
```

### 3. Job Card Component

**HTML Structure:**
```html
<div class="job">
  <h3>Software Engineer</h3>
  <div class="meta">TechCorp • 5 YOE</div>
  <div class="tagrow">
    <span class="tag">Python</span>
    <span class="tag">React</span>
  </div>
  <div class="score">Match: 94%</div>
  <div class="why">Strong skill alignment</div>
  <div class="apply">
    <button>Apply</button>
  </div>
</div>
```

**Enhanced Styling:**
```css
.job {
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  position: relative;
  overflow: hidden;
}

/* Shine effect on hover */
.job::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.job:hover::before {
  left: 100%;
}

.job:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px var(--glow-color);
}
```

---

## Responsive Breakpoints

### Grid Layouts

**Job Grid:**
```css
/* Desktop (900px+) */
.grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }

/* Tablet (768px - 900px) */
@media(max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile (<768px) */
@media(max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}
```

**Form Grid:**
```css
/* Desktop (768px+) */
.form-grid { grid-template-columns: 1fr 1fr; gap: 20px; }

/* Mobile (<768px) */
@media(max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
}

/* Small Mobile (<480px) */
@media(max-width: 480px) {
  .form-grid { padding: 24px 16px; }
  .action-row { flex-direction: column; }
  .action-row .btn { width: 100%; }
}
```

### Typography Scaling

**Landing Page Title:**
```css
h1 {
  font-size: 3rem;        /* Desktop */
}

@media (max-width: 600px) {
  h1 { font-size: 2rem; } /* Mobile */
}
```

---

## Theme Implementation

### JavaScript Theme Toggle
```javascript
// Toggle button listener
toggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    htmlElement.removeAttribute('data-theme');  // Switch to dark
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');  // Switch to light
    localStorage.setItem('theme', 'light');
  }
});
```

### CSS Theme Adaptation
```css
/* Dark Mode - Default */
:root { --bg-main: #0a0e27; }

/* Light Mode - Applied when data-theme="light" */
[data-theme="light"] { --bg-main: #f5f7fa; }

/* All components automatically adapt via CSS variables */
body { background-color: var(--bg-main); }
.glass-card { background: var(--card-bg); }
.text-main { color: var(--text-main); }
```

### Element-Specific Theme Changes
```css
/* Background orbs adapt to theme */
body::before {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
}

[data-theme="light"] body::before {
  background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
}

/* Select dropdown icon changes */
select.modern-input {
  background-image: url("...dark-icon...");
}

[data-theme="light"] select.modern-input {
  background-image: url("...light-icon...");
}
```

---

## Performance Optimizations

### GPU-Accelerated Properties
```css
/* Use for smooth 60fps animations */
transform: translateY(-6px);        /* Fast */
opacity: 0;                         /* Fast */

/* Avoid for animation */
left: 100px;                        /* Slow - layout recalc */
box-shadow: ...;                    /* Slow - paint */
```

### Using will-change
```css
.job:hover {
  will-change: transform;
  transform: translateY(-6px);
}

.job:not(:hover) {
  will-change: auto;
}
```

### Backdrop Filter Performance
```css
/* Applied only where necessary */
.glass-card {
  backdrop-filter: blur(20px);
}

/* Not applied to high-frequency animation elements */
.button-text {
  /* No backdrop-filter here */
}
```

---

## Accessibility Considerations

### Semantic HTML
```html
<button class="glow-btn">Primary Action</button>
<a class="btn ghost" href="/">Secondary Link</a>
<label class="modern-label">Form Label</label>
<input class="modern-input" aria-label="Description" />
```

### Focus States
```css
.modern-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--glow-color);
}
```

### Color Contrast
- Text on dark background: #f8fafc on #0a0e27 (high contrast)
- Buttons have minimum 44px height (touch-friendly)
- Animations respect `prefers-reduced-motion` (can add)

---

## Customization Guide

### Change Primary Color
```css
:root {
  --primary: #your-color;           /* Change throughout */
  --primary-hover: #your-color-darker;
  --glow-color: rgba(your-rgb, 0.5);
}
```

### Adjust Animation Speed
```css
/* Landing page background */
body::before {
  animation: float 20s ease-in-out infinite;  /* Change 20s */
}

/* Gradient text */
.gradient-text {
  animation: gradientShift 6s ease infinite;  /* Change 6s */
}

/* Button interactions */
.btn {
  transition: all 0.3s cubic-bezier(...);     /* Change 0.3s */
}
```

### Change Border Radius
```css
:root {
  --radius: 20px;  /* Change this value */
}

/* All rounded elements update automatically */
.glass-card { border-radius: var(--radius); }
.btn { border-radius: 12px; }  /* Can override */
```

---

## Troubleshooting

### Backdrop Filter Not Working
- **Issue:** Cards don't blur properly
- **Solution:** Check browser support; add `-webkit-backdrop-filter`
- **Fallback:** Already included in code

### Gradient Text Not Showing
- **Issue:** Text appears invisible or wrong color
- **Solution:** Ensure `-webkit-background-clip: text` is set
- **Check:** Parent must have sufficient width

### Mobile Layout Issues
- **Issue:** Elements overflow on mobile
- **Solution:** Check media queries are applying
- **Debug:** Use DevTools responsive design mode

### Animation Not Smooth
- **Issue:** Jank/stuttering animations
- **Solution:** Use `transform` instead of `left`/`top`
- **Check:** GPU acceleration is enabled

---

## File Summary

| File | Changes | Impact |
|------|---------|--------|
| `static/css/style.css` | +150 lines | Complete visual overhaul |
| `templates/index.html` | ~200 lines | Landing page redesign |
| `templates/dashboard.html` | ~200 lines | Form UI modernization |
| `static/js/app.js` | No changes | Fully compatible |

---

**Last Updated:** February 15, 2026
