document.addEventListener("DOMContentLoaded", () => {
  // --- Toast Notification Logic ---
  const toast = document.querySelector(".toast");
  if (toast) {
    setTimeout(() => toast.classList.add("hide"), 4000);
  }

  // --- Theme Toggle Logic ---
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // 1. Check local storage for saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
  }

  // 2. Listen for clicks on the toggle button
  if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
          const currentTheme = htmlElement.getAttribute('data-theme');
          
          if (currentTheme === 'light') {
              // Switch to Dark
              htmlElement.removeAttribute('data-theme');
              localStorage.setItem('theme', 'dark');
          } else {
              // Switch to Light
              htmlElement.setAttribute('data-theme', 'light');
              localStorage.setItem('theme', 'light');
          }
          
          // Dispatch theme change event for charts to reinitialize
          window.dispatchEvent(new CustomEvent('themeChanged'));
      });
  }

      // --- Resume Upload Handler (if dashboard present) ---
      const uploadBtn = document.getElementById('uploadResumeBtn');
      const fileInput = document.getElementById('resumeUpload');
      const resumeStatus = document.getElementById('resumeStatus');
      const skillsInput = document.getElementById('skillsInput');

      if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          // UI: loading state
          const origText = uploadBtn.innerHTML;
          uploadBtn.classList.add('btn-loading');
          uploadBtn.innerHTML = '<div class="spinner"></div> Scanning AI...';
          if (resumeStatus) resumeStatus.textContent = 'Scanning resume...';

          try {
            const form = new FormData();
            form.append('file', file);

            const resp = await fetch('/parse_resume', { method: 'POST', body: form });
            if (!resp.ok) {
              const err = await resp.json().catch(()=>({error:'Unknown'}));
              console.log('Resume parse error', err);
              if (resumeStatus) resumeStatus.textContent = 'Failed to parse resume';
            } else {
              const data = await resp.json();
              if (data.skills) {
                if (skillsInput) {
                  skillsInput.value = data.skills;
                }
                if (resumeStatus) resumeStatus.textContent = 'Skills auto-filled';
              } else {
                if (resumeStatus) resumeStatus.textContent = 'No skills detected';
              }
            }
          } catch (err) {
            console.log('Upload error', err);
            if (resumeStatus) resumeStatus.textContent = 'Upload failed';
          } finally {
            uploadBtn.classList.remove('btn-loading');
            uploadBtn.innerHTML = origText;
            // reset file input so same file can be re-selected if needed
            fileInput.value = '';
          }
        });
      }
});

/* =========== PREMIUM SKELETON LOADER =========== */
const SkeletonLoader = {
  /**
   * Generate skeleton card HTML
   */
  createSkeletonCard: function() {
    return `
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
    `;
  },

  /**
   * Show skeleton loaders in a container
   * @param {string} containerId - ID of the container element
   * @param {number} count - Number of skeleton cards to show (default: 6)
   */
  show: function(containerId, count = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div class="skeleton-loader-container">';
    for (let i = 0; i < count; i++) {
      html += this.createSkeletonCard();
    }
    html += '</div>';

    container.innerHTML = html;
  },

  /**
   * Hide skeleton loaders
   * @param {string} containerId - ID of the container element
   */
  hide: function(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      const loaders = container.querySelector('.skeleton-loader-container');
      if (loaders) {
        loaders.style.opacity = '0';
        loaders.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          loaders.remove();
        }, 300);
      }
    }
  },

  /**
   * Replace skeleton loaders with actual content
   * @param {string} containerId - ID of the container element
   * @param {string} content - HTML content to insert
   */
  replace: function(containerId, content) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const loaders = container.querySelector('.skeleton-loader-container');
    if (loaders) {
      loaders.style.opacity = '0';
      loaders.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        container.innerHTML = content;
        // Trigger animation
        setTimeout(() => {
          container.style.opacity = '1';
        }, 10);
      }, 300);
    } else {
      container.innerHTML = content;
    }
  }
};

/* =========== FLOATING LABEL AUTO-INIT =========== */
document.addEventListener('DOMContentLoaded', function() {
  // Auto-initialize floating labels for any input that has content
  const floatingInputs = document.querySelectorAll('.floating-input');
  floatingInputs.forEach(input => {
    // Check if input has value from autofill or page load
    if (input.value) {
      // Trigger the :not(:placeholder-shown) pseudo-class effect
      input.style.borderColor = 'var(--border-color)';
    }
  });

  // Handle floating label on input event
  floatingInputs.forEach(input => {
    input.addEventListener('input', function() {
      // The CSS will handle the label positioning via :not(:placeholder-shown)
    });
  });
});

// Export for use in other scripts
window.SkeletonLoader = SkeletonLoader;