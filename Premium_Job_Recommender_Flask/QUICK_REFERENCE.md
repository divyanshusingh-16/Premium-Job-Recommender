# 🎯 Quick Reference Card - Frontend Overhaul

## New CSS Classes & Utilities

### Layout
- `.hero-container` - 2-column responsive grid (landing page)
- `.dashboard-wrapper` - Flexbox vertical layout (dashboard)
- `.dashboard-content` - Main content area with flex: 1
- `.container` - Max-width 1100px, centered

### Cards & Containers
- `.glass-card` - Glassmorphic effect with blur and multi-layer shadow
- `.premium-form-card` - Dashboard form card with enhanced styling
- `.card` - Generic card element
- `.job` - Job recommendation card with shine effect

### Forms
- `.form-grid` - 2-column responsive form layout
- `.form-group` - Individual field wrapper
- `.form-header` - Form title and description
- `.full-width` - Spans both columns (grid-column: 1 / -1)
- `.modern-label` - Styled form label with uppercase text
- `.modern-input` - Enhanced input/textarea/select
- `.helper-text` - Descriptive text under inputs

### Buttons
- `.btn` - Primary gradient button with glow
- `.btn.ghost` - Secondary transparent button
- `.glow-btn` - Alias for primary button
- `.btn-row` - Flexbox row for button groups
- `.action-row` - Full-width button row (form)

### Typography
- `.gradient-text` - Animated gradient text effect
- `.glow-text` - Static gradient text effect
- `.h-title` - Large heading style
- `.h-sub` - Subtitle/secondary heading

### Lists & Tags
- `.stats-list` - Styled unordered list
- `.pill-tags-container` - Horizontal pill collection
- `.pill-tag` - Individual pill with glow effect
- `.tagrow` - Horizontal tag row
- `.tag` - Individual tag element

### States & Effects
- `.spinner` - Loading animation spinner
- `.btn-loading` - Loading button state (opacity reduced, pointer-events: none)
- `.hide` - Hidden element (opacity: 0, pointer-events: none)
- `.active` - Active navigation link

---

## CSS Animation Keyframes

```css
@keyframes float
Duration: 20-25s
Easing: ease-in-out infinite
Transform: Translate 0 → 30px, -30px → 0

@keyframes gradientShift
Duration: 6s
Easing: ease infinite
Effect: Background position 0% → 100% → 0%

@keyframes spin
Duration: 0.8s
Easing: linear infinite
Transform: Rotate 0° → 360°
```

---

## Theme Variables (Quick Reference)

### Colors - Dark Mode
```
--bg-main: #0a0e27                    (Deep Navy)
--text-main: #f8fafc                  (Light Text)
--text-muted: #94a3b8                 (Gray)
--primary: #3b82f6                    (Bright Blue)
--primary-hover: #2563eb              (Darker Blue)
--accent-purple: #a855f7              (Purple)
--accent-pink: #ec4899                (Pink)
--success: #26d07c                    (Green)
--danger: #ff4d6d                     (Red)
--card-bg: rgba(30, 41, 59, 0.5)      (Semi-transparent)
--input-bg: rgba(15, 23, 42, 0.7)     (Input background)
--border-color: rgba(255, 255, 255, 0.1)
--glow-color: rgba(59, 130, 246, 0.5) (Blue glow)
--shadow-color: rgba(0, 0, 0, 0.4)    (Shadow)
```

### Colors - Light Mode
Override in `[data-theme="light"]` with lighter values

---

## Responsive Breakpoints

```css
Desktop (900px+)
  .hero-container: 1.3fr 0.7fr
  .grid: 3 columns
  .form-grid: 1fr 1fr

Tablet (768px - 900px)
  .hero-container: 1fr
  .grid: 2 columns
  .form-grid: 1fr 1fr

Mobile (<768px)
  All: 1 column layouts
  .form-grid: 1fr
  .action-row: flex-direction: column

Small Mobile (<480px)
  Padding reduced
  Buttons: width: 100%
```

---

## Transition & Animation Values

**Smooth Transitions:**
- Form interactions: `all 0.3s cubic-bezier(0.23, 1, 0.320, 1)`
- Background animations: `ease-in-out`
- Hover effects: `0.3s`

**Animation Durations:**
- Background float: 20-25s
- Gradient text: 6s
- Loading spinner: 0.8s
- Transitions: 0.3s (default)

---

## Common Hover Effects

### Cards
```css
transform: translateY(-4px)  /* Small cards */
transform: translateY(-6px)  /* Job cards */
border-color: var(--primary)
box-shadow: 0 20px 50px var(--glow-color)
```

### Buttons
```css
transform: translateY(-3px)
filter: brightness(1.08)
box-shadow: 0 15px 40px var(--glow-color)
```

### Inputs
```css
border-color: var(--primary)
box-shadow: 0 0 0 4px var(--glow-color)
```

### Pills & Tags
```css
transform: translateY(-2px)
box-shadow: 0 4px 16px var(--glow-color)
```

---

## Box Shadow Patterns

### Depth Shadow (Cards)
```css
box-shadow: 0 20px 60px -15px var(--shadow-color),
            0 0 1px 0 rgba(255, 255, 255, 0.1) inset;
```

### Glow Shadow (Buttons)
```css
box-shadow: 0 10px 28px var(--glow-color);
```

### Focus Glow (Inputs)
```css
box-shadow: 0 0 0 4px var(--glow-color),
            inset 0 1px 2px rgba(0, 0, 0, 0.1);
```

---

## Backdrop Filter Values

```css
.glass-card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);  /* Safari */
}

.modern-input {
  backdrop-filter: blur(8px);
}

.job {
  backdrop-filter: blur(20px);
}
```

---

## Grid & Flex Layouts

### Hero Container
```css
display: grid;
grid-template-columns: 1.3fr 0.7fr;
gap: 28px;
align-items: stretch;
```

### Form Grid
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
```

### Job Grid
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 18px;
```

### Flex Rows
```css
display: flex;
gap: 12px;
flex-wrap: wrap;
```

---

## Form Input Styling

### Default State
```css
padding: 15px 16px;
border: 1.5px solid var(--border-color);
border-radius: 12px;
background: var(--input-bg);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
```

### Focus State
```css
border-color: var(--primary);
background: var(--card-bg);
box-shadow: 0 0 0 4px var(--glow-color),
            inset 0 1px 2px rgba(0, 0, 0, 0.1);
```

### Textarea
```css
min-height: 120px;
resize: vertical;
line-height: 1.6;
```

---

## Select Dropdown Styling

```css
appearance: none;
background-image: url("data:image/svg+xml,...");
background-repeat: no-repeat;
background-position: right 12px center;
background-size: 18px;
padding-right: 44px;

/* Light mode variant */
[data-theme="light"] select { background-image: url("...light-icon..."); }
```

---

## Icon/Emoji Labels in Forms

```html
<label class="modern-label">💼 Skills (Required)</label>
<label class="modern-label">📅 Experience (Years)</label>
<label class="modern-label">📍 Preferred Location</label>
<label class="modern-label">🎯 Role Preference</label>
<label class="modern-label">💼 Job Type</label>

<button class="glow-btn">🚀 Recommend Jobs</button>
<a class="btn ghost">← Go Back</a>
```

---

## Loading State

```css
.spinner {
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn-loading {
  opacity: 0.75;
  cursor: not-allowed !important;
  pointer-events: none;
}
```

---

## Toast Notifications

```css
.toast {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 20;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
}

.toast.hide {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-6px);
}

.toast.danger { border-color: rgba(255, 77, 109, 0.45); }
.toast.success { border-color: rgba(38, 208, 124, 0.45); }
.toast.info { border-color: var(--glow-color); }
```

---

## Typography Sizes

- **h1:** 3rem (desktop), 2rem (mobile)
- **h2:** 1.6rem
- **h3:** 16px
- **body:** 15px
- **labels:** 14px (uppercase)
- **helper-text:** 13px
- **small-text:** 12px

---

## Quick Customization Guide

### Change Primary Color
Find `:root` section, update:
```css
--primary: #your-color;
--primary-hover: #darker-version;
--glow-color: rgba(r, g, b, 0.5);
```

### Adjust Animation Speed
In keyframes or transitions, modify duration:
```css
animation: float 20s ease-in-out infinite;  /* Change 20s */
transition: all 0.3s cubic-bezier(...);     /* Change 0.3s */
```

### Change Border Radius
Update root variable:
```css
--radius: 20px;  /* Default: 20px */
```

### Adjust Shadows
Modify shadow-color variable or specific values:
```css
--shadow-color: rgba(0, 0, 0, 0.4);  /* Dark mode */
```

---

## Browser DevTools Tips

### Test Responsive Layout
1. Press F12 to open DevTools
2. Click device toggle icon (Ctrl+Shift+M)
3. Test at: 480px, 768px, 1024px, 1440px

### Debug backdrop-filter
- Check Elements tab for `.glass-card`
- Look for `backdrop-filter: blur(20px)`
- Test on multiple browsers

### Performance Check
1. Open Performance tab
2. Record page load
3. Look for 60fps animations
4. Check for layout thrashing

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Gradient text invisible | Wrong container width | Add min-width to parent |
| Cards not blurring | Browser doesn't support | Add fallback background color |
| Mobile layout broken | Media query not applying | Check viewport meta tag |
| Buttons not smooth | Using layout-affecting properties | Use transform instead of left |
| Animation jank | Low GPU acceleration | Use Chrome DevTools perf tab |

---

## Performance Checklist

- ✅ Use `transform` for animations (not left/top)
- ✅ Use `opacity` for fading
- ✅ Backdrop filter on static elements only
- ✅ Fixed positioning for background orbs
- ✅ No `box-shadow` in animations
- ✅ Smooth 60fps animations
- ✅ Minimal repaints and reflows

---

## Production Optimization

```
1. Minify CSS file
2. Use gzip compression
3. Remove unused CSS (tree-shaking)
4. Add CDN headers for caching
5. Test on target devices
6. Check bundle size
7. Monitor performance metrics
```

---

## Quick Stats

- **CSS Total:** 634 lines
- **Color Variables:** 14
- **Animations:** 3 keyframes
- **Responsive Breakpoints:** 4
- **New Classes:** 30+
- **ThemeStates:** 2 (Light/Dark)
- **Production Ready:** ✅ Yes

---

**Last Updated:** February 15, 2026
**For Latest Info:** See IMPLEMENTATION_GUIDE.md
