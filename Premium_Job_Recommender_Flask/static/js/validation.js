/**
 * Premium Form Validation & Loading States
 * Production-grade frontend enhancements for form handling
 */

class FormValidator {
  constructor() {
    this.init();
  }

  init() {
    this.setupValidationListeners();
    this.setupButtonStates();
  }

  // Setup real-time validation on inputs
  setupValidationListeners() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', () => this.validateField(input));
      
      // Clear error on input
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          this.clearError(input);
        }
      });
      
      // Validate on focus out
      input.addEventListener('focusout', () => this.validateField(input));
    });
  }

  // Validate individual field
  validateField(input) {
    const value = input.value.trim();
    const errorEl = this.getErrorElement(input);
    
    // Skip if no error element exists
    if (!errorEl) return true;

    // Get validation rules from data attributes
    const rules = {
      required: input.hasAttribute('required'),
      email: input.type === 'email',
      minLength: parseInt(input.getAttribute('data-minlength')) || null,
      pattern: input.getAttribute('pattern') || null,
      errorMsg: input.getAttribute('data-error-msg') || 'This field is invalid'
    };

    // Check required
    if (rules.required && !value) {
      this.showError(input, errorEl, 'This field is required');
      return false;
    }

    // Check email
    if (rules.email && value && !this.isValidEmail(value)) {
      this.showError(input, errorEl, 'Please enter a valid email address');
      return false;
    }

    // Check minLength
    if (rules.minLength && value && value.length < rules.minLength) {
      this.showError(input, errorEl, `Minimum ${rules.minLength} characters required`);
      return false;
    }

    // Check pattern
    if (rules.pattern && value) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(value)) {
        this.showError(input, errorEl, rules.errorMsg);
        return false;
      }
    }

    // Clear error if all validations pass
    this.clearError(input, errorEl);
    return true;
  }

  // Show error message with animation
  showError(input, errorEl, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
      
      // Trigger animation
      setTimeout(() => {
        errorEl.style.animation = 'none';
        setTimeout(() => {
          errorEl.style.animation = '';
        }, 10);
      }, 10);
    }
  }

  // Clear error message
  clearError(input, errorEl = null) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const error = errorEl || this.getErrorElement(input);
    if (error) {
      error.classList.remove('show');
    }
  }

  // Get error element associated with input
  getErrorElement(input) {
    const container = input.closest('.form-group');
    return container ? container.querySelector('.form-error') : null;
  }

  // Email validation regex
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate entire form
  validateForm(formEl = null) {
    const form = formEl || document.querySelector('form');
    if (!form) return false;

    const inputs = form.querySelectorAll('.form-input[required], .form-input[type="email"]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }
}

// Setup button loading states
class LoadingStateManager {
  constructor() {
    this.setupFormSubmission();
    this.setupButtonStates();
  }

  // Handle form submission with loading state
  setupFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        // Temporarily disable validation prevention for demo
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          this.setLoadingState(submitBtn, true);
        }
      });
    });
  }

  // Setup individual button states
  setupButtonStates() {
    const buttons = document.querySelectorAll('.glow-btn, .job-btn.apply, button.btn-primary');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Don't override form submission (let form handle it)
        if (btn.type !== 'submit') {
          // For non-form buttons, you can add click handling here
        }
      });
    });
  }

  // Set loading state on button
  setLoadingState(btn, isLoading) {
    if (isLoading) {
      btn.classList.add('btn-loading');
      btn.disabled = true;
      
      // Save original text
      if (!btn.dataset.originalText) {
        btn.dataset.originalText = btn.textContent;
      }
      
      // Update button content
      btn.textContent = '';
      const spinner = document.createElement('span');
      spinner.className = 'spinner';
      btn.prepend(spinner);
      btn.append(' Processing...');
    } else {
      btn.classList.remove('btn-loading');
      btn.disabled = false;
      btn.textContent = btn.dataset.originalText || 'Submit';
    }
  }

  // Show skeleton loader
  showSkeletonLoader(container) {
    container.innerHTML = this.getSkeletonHTML();
  }

  // Get skeleton HTML
  getSkeletonHTML() {
    return `
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton-tags">
          <div class="skeleton skeleton-tag"></div>
          <div class="skeleton skeleton-tag"></div>
          <div class="skeleton skeleton-tag"></div>
        </div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton-tags">
          <div class="skeleton skeleton-tag"></div>
          <div class="skeleton skeleton-tag"></div>
        </div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton-tags">
          <div class="skeleton skeleton-tag"></div>
          <div class="skeleton skeleton-tag"></div>
          <div class="skeleton skeleton-tag"></div>
        </div>
      </div>
    `;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize form validator
  new FormValidator();
  
  // Initialize loading state manager
  new LoadingStateManager();
});
