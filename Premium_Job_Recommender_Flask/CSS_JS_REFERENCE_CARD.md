# Premium UI Upgrades CSS & JS Reference Card

## 🎨 CSS Classes Reference

### Floating Label Inputs
| Class | Purpose | Usage |
|-------|---------|-------|
| `.floating-label-group` | Container | Wraps input + label + underline |
| `.floating-input` | Input field | Text/email/password input |
| `.floating-label` | Label | Floats on focus/input |
| `.input-underline` | Underline | Animates on focus |

**HTML Example:**
```html
<div class="floating-label-group">
  <input type="email" class="floating-input" placeholder=" " />
  <label class="floating-label">Email</label>
  <div class="input-underline"></div>
</div>
```

---

### Chart Containers
| Class | Purpose | Notes |
|-------|---------|-------|
| `.charts-container` | Grid wrapper | 2-col desktop, 1-col mobile |
| `.chart-wrapper` | Individual chart | Glassmorphism styling |
| `.chart-header` | Chart title | Bold, uppercase |
| `.doughnut-container` | Doughnut wrapper | Flex centered |
| `.charts-legend` | Legend area | Below chart |
| `.legend-item` | Legend entry | Dot + text |
| `.legend-dot` | Color dot | Circular badge |

**HTML Example:**
```html
<div class="charts-container">
  <div class="chart-wrapper">
    <div class="chart-header"><h3>Title</h3></div>
    <canvas id="chart1"></canvas>
  </div>
</div>
```

---

### Skeleton Loaders
| Class | Purpose | Notes |
|-------|---------|-------|
| `.skeleton-loader-container` | Grid wrapper | Auto-fill responsive |
| `.skeleton-card` | Card frame | Border + padding |
| `.skeleton-title` | Title placeholder | 20px height, 80% width |
| `.skeleton-subtitle` | Subtitle placeholder | 14px height, 60% width |
| `.skeleton-pills` | Tech stack area | Flex row |
| `.skeleton-pill` | Individual pill | 28px height |
| `.skeleton-button` | Button placeholder | 40px height, 100% width |

**Animation:** `@keyframes skeletonShimmer` (2s infinite)

---

### Navigation Links
| Class | Purpose | Notes |
|-------|---------|-------|
| `.nav-link` | Base link style | Flex, centered |
| `.nav-link:hover` | Hover state | Slide right +4px |
| `.nav-link.active` | **ENHANCED** | Gradient + glow |
| `[data-theme="dark"] .nav-link.active` | Dark mode | Inset glow |

**Active State Features:**
```css
.nav-link.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  color: var(--primary);
  font-weight: 600;
  border-left: 3px solid var(--primary);
  padding-left: 9px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

/* Dark mode glow */
[data-theme="dark"] .nav-link.active {
  box-shadow: 
    inset 0 0 20px rgba(59, 130, 246, 0.1),
    0 0 20px rgba(59, 130, 246, 0.15);
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

/* Gradient decoration */
.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), transparent);
}
```

---

## 🔧 JavaScript Reference

### SkeletonLoader API

**Method 1: Show Skeletons**
```javascript
SkeletonLoader.show(containerId, count);

// Examples
SkeletonLoader.show('results', 6);          // 6 cards
SkeletonLoader.show('container', 3);        // 3 cards
```

**Method 2: Replace Content**
```javascript
SkeletonLoader.replace(containerId, htmlContent);

// Example
const html = '<div class="job-card">...</div>';
SkeletonLoader.replace('results', html);
```

**Method 3: Hide Skeletons**
```javascript
SkeletonLoader.hide(containerId);

// Example
SkeletonLoader.hide('results');
```

### Skeleton Card HTML
```html
<div class="skeleton-card">
  <div class="skeleton-title"></div>
  <div class="skeleton-subtitle" style="width: 75%;"></div>
  <div class="skeleton-pills">
    <div class="skeleton-pill"></div>
    <div class="skeleton-pill" style="width: 50px;"></div>
  </div>
  <div style="height: 60px; margin-bottom: 12px; background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%); background-size: 200% 100%; animation: skeletonShimmer 2s infinite; border-radius: 8px;"></div>
  <div class="skeleton-button"></div>
</div>
```

---

## 📊 Chart.js Integration

### Bar Chart - Skills
```javascript
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Python', 'React', 'SQL', 'AWS', 'Java'],
    datasets: [{
      label: 'Job Postings',
      data: [85, 70, 65, 50, 40],
      backgroundColor: ['#3b82f6', '#a855f7', '#ec4899', '#f97316', '#14b8a6'],
      borderRadius: 8,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } }
  }
});
```

### Doughnut Chart - Job Types
```javascript
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Full-Time', 'Contract', 'Internship'],
    datasets: [{
      data: [60, 20, 20],
      backgroundColor: ['#3b82f6', '#a855f7', '#14b8a6'],
      borderWidth: 2,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16 }
      }
    }
  }
});
```

### Theme-Aware Colors
```javascript
const isDarkMode = !document.documentElement.getAttribute('data-theme');
const primaryColor = isDarkMode ? '#3b82f6' : '#2563eb';
const textColor = isDarkMode ? '#94a3b8' : '#64748b';
const gridColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
```

---

## ⏵️ CSS Animations

### Floating Label Animation
```css
/* Timing */
transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

/* Label movement */
position: absolute;
left: 16px; → left: 14px;
top: 16px; → top: -8px;

/* Font change */
font-size: 15px; → font-size: 12px;
color: muted → color: primary;

/* Background shift */
background: transparent; → background: var(--bg-main);
```

### Skeleton Shimmer Animation
```css
@keyframes skeletonShimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Applied to */
animation: skeletonShimmer 2s infinite linear;
background: linear-gradient(90deg,
  rgba(255,255,255,0.05) 0%,
  rgba(255,255,255,0.1) 50%,
  rgba(255,255,255,0.05) 100%);
background-size: 200% 100%;
```

### Active State Transition
```css
/* All properties animated */
transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

/* Transforms */
background-color: gradient
border-color: → var(--primary)
color: → var(--primary)
font-weight: → 600
padding-left: 12px; → 9px;
box-shadow: → glow
text-shadow: → glow (dark mode)
```

---

## 🎯 Quick Usage Examples

### Example 1: Implement Skeleton Loading
```html
<!-- Container -->
<div id="job-results"></div>

<!-- JavaScript -->
<script>
// Show skeletons while loading
SkeletonLoader.show('job-results', 6);

// Simulate API call
fetch('/api/jobs')
  .then(res => res.json())
  .then(data => {
    // Render jobs and replace skeletons
    const html = renderJobs(data);
    SkeletonLoader.replace('job-results', html);
  })
  .catch(err => {
    SkeletonLoader.replace('job-results', 
      '<p>Error loading jobs. Please try again.</p>');
  });
</script>
```

### Example 2: Add Floating Label Form
```html
<!-- Form group -->
<div class="floating-label-group">
  <input type="text" 
         id="username" 
         class="floating-input" 
         placeholder=" " 
         name="username" 
         required />
  <label for="username" class="floating-label">Username</label>
  <div class="input-underline"></div>
</div>

<!-- Already initialized in app.js, just works! -->
```

### Example 3: Update Chart with Real Data
```javascript
// In templates/index.html, inside Chart.js initialization
const skillsCtx = document.getElementById('skillsChart')?.getContext('2d');
if (skillsCtx) {
  new Chart(skillsCtx, {
    // ... config ...
    data: {
      labels: ['Python', 'React', 'SQL', 'AWS', 'Java'],
      datasets: [{
        label: 'Job Postings',
        // Replace with API call
        data: await fetch('/api/skills-demand').then(r => r.json()),
      }]
    }
  });
}
```

---

## 🎨 CSS Variables Used

| Variable | Dark Mode | Light Mode | Usage |
|----------|-----------|-----------|-------|
| `--primary` | #3b82f6 | #2563eb | Buttons, links, highlights |
| `--primary-hover` | #2563eb | #1d4ed8 | Hover states |
| `--text-main` | #f8fafc | #0f172a | Main text |
| `--text-muted` | #94a3b8 | #64748b | Secondary text |
| `--bg-main` | #0a0e27 | #f5f7fa | Background |
| `--card-bg` | rgba(30,41,59,0.5) | rgba(255,255,255,0.8) | Card background |
| `--border-color` | rgba(255,255,255,0.1) | rgba(0,0,0,0.08) | Borders |
| `--glow-color` | rgba(59,130,246,0.5) | rgba(37,99,235,0.25) | Shadow/glow |
| `--input-bg` | rgba(15,23,42,0.7) | rgba(248,250,252,0.95) | Input background |

---

## 🔍 Debugging Tips

### Charts not rendering?
```javascript
// Check in DevTools Console
console.log(Chart);  // Should not be undefined
console.log(document.getElementById('skillsChart'));  // Should exist
```

### Floating label stuck?
```javascript
// Check if placeholder is set
const input = document.querySelector('.floating-input');
console.log(input.placeholder);  // Should be " " (space)
```

### Skeleton animation choppy?
```css
/* Try adding will-change */
.skeleton-item {
  will-change: background-position;
  animation: skeletonShimmer 2s linear infinite;
}
```

### Active state not showing?
```javascript
// Check if active class is present
console.log(document.querySelector('.nav-link.active'));
// Check if CSS variables are loaded
console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary'));
```

---

## ✅ Validation Checklist

Before deploying, verify:
- [ ] Chart.js loads from CDN (no 404)
- [ ] Charts render without JS errors
- [ ] Skeleton animation is smooth (60 FPS)
- [ ] Floating labels animate properly
- [ ] Active state shows on correct pages
- [ ] Light/dark mode toggle works
- [ ] Mobile responsive layouts work
- [ ] All transitions are 0.3s or 2s
- [ ] No console warnings/errors
- [ ] Form submission still works

---

## 📚 File Locations

| Asset | File | Lines |
|-------|------|-------|
| Floating label CSS | `style.css` | 1710-1777 |
| Chart CSS | `style.css` | 1780-1850 |
| Skeleton CSS | `style.css` | 1853-1952 |
| Active state CSS | `style.css` | 1685-1707 |
| SkeletonLoader JS | `app.js` | 38-142 |
| Chart init JS | `index.html` | 260-360 |
| Floating inputs HTML | `login.html` | 108-121 |
| Chart containers HTML | `index.html` | 233-258 |

---

**Last Updated:** Feb 15, 2026
**Status:** Production Ready ✅
