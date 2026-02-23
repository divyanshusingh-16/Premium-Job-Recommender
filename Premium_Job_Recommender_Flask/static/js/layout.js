/**
 * Layout Management Script
 * Handles sidebar collapsing, theme toggling, and mobile menu
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== SIDEBAR TOGGLE FUNCTIONALITY =====
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarToggleBottom = document.getElementById('sidebarToggleBottom');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  // Initialize sidebar state from localStorage
  const initializeSidebar = () => {
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    if (sidebarState === 'true') {
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
    }
  };

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  };

  // Attach toggle event listeners
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }
  if (sidebarToggleBottom) {
    sidebarToggleBottom.addEventListener('click', toggleSidebar);
  }

  // ===== MOBILE MENU FUNCTIONALITY =====
  const toggleMobileMenu = () => {
    sidebar.classList.toggle('mobile-open');
    mobileOverlay.classList.toggle('visible');
  };

  const closeMobileMenu = () => {
    sidebar.classList.remove('mobile-open');
    mobileOverlay.classList.remove('visible');
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ===== THEME TOGGLE IN SIDEBAR =====
  const themeToggleNav = document.getElementById('themeToggleNav');
  const themeToggleMobile = document.getElementById('themeToggleMobile');

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (themeToggleNav) {
    themeToggleNav.addEventListener('click', toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  // ===== INITIALIZE ON PAGE LOAD =====
  initializeSidebar();

  // Close mobile menu if clicking outside (but not on overlay)
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
});
