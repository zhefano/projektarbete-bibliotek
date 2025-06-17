// Main JavaScript file for enhanced UX and performance
class LibraryApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupLazyLoading();
    this.setupSearchFunctionality();
    this.setupFormValidation();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    this.setupAnimations();
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe elements with animation classes
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
      });
    }
  }

  // Lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Enhanced search functionality
  setupSearchFunctionality() {
    const searchForm = document.getElementById('searchForm');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    if (searchForm && btn1 && btn2) {
      // Search type toggle
      [btn1, btn2].forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Update active state
          [btn1, btn2].forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          
          // Update placeholder text
          const isBooks = btn === btn1;
          searchForm.placeholder = isBooks 
            ? 'Sök efter titel, ISBN, författare eller kategori'
            : 'Sök efter artiklar, författare eller ämne';
        });
      });

      // Search suggestions (mock implementation)
      let searchTimeout;
      searchForm.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.handleSearchSuggestions(e.target.value);
        }, 300);
      });

      // Search form submission
      searchForm.closest('form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSearch(searchForm.value);
      });
    }
  }

  handleSearchSuggestions(query) {
    if (query.length < 2) return;
    
    // Mock search suggestions - in real app, this would call an API
    console.log('Searching for:', query);
    
    // You could implement a dropdown with suggestions here
  }

  handleSearch(query) {
    if (!query.trim()) return;
    
    // Mock search - in real app, this would redirect or show results
    console.log('Performing search for:', query);
    
    // Show loading state
    const searchForm = document.getElementById('searchForm');
    const originalPlaceholder = searchForm.placeholder;
    searchForm.placeholder = 'Söker...';
    searchForm.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
      searchForm.placeholder = originalPlaceholder;
      searchForm.disabled = false;
      searchForm.value = '';
      
      // In a real app, you'd show results or redirect
      alert(`Sökning genomförd för: "${query}"`);
    }, 1000);
  }

  // Form validation
  setupFormValidation() {
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateLoginForm(loginForm);
      });
    }

    // Real-time validation
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateLoginForm(form) {
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    let isValid = true;

    // Validate email
    if (!this.validateField(email)) isValid = false;
    
    // Validate password
    if (!this.validateField(password)) isValid = false;

    if (isValid) {
      this.handleLogin(email.value, password.value);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'Detta fält är obligatoriskt';
      isValid = false;
    }
    
    // Email validation
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Ange en giltig e-postadress';
        isValid = false;
      }
    }
    
    // Password validation
    else if (field.type === 'password' && value && value.length < 6) {
      errorMessage = 'Lösenordet måste vara minst 6 tecken';
      isValid = false;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-describedby', errorElement.id || 'error-' + Date.now());
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  handleLogin(email, password) {
    // Mock login - in real app, this would call an API
    console.log('Login attempt:', { email, password: '***' });
    
    // Show loading state
    const loginButton = document.getElementById('loginButton');
    const originalText = loginButton.textContent;
    loginButton.textContent = 'Loggar in...';
    loginButton.disabled = true;
    
    // Simulate login delay
    setTimeout(() => {
      loginButton.textContent = originalText;
      loginButton.disabled = false;
      
      // Mock successful login
      alert('Inloggning lyckades!');
    }, 1500);
  }

  // Accessibility enhancements
  setupAccessibility() {
    // Keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.shortcutCard, .contactCard, .newsCard, .calendarEvent');
    
    interactiveCards.forEach(card => {
      // Make cards focusable if they don't have links
      if (!card.querySelector('a') && !card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
      }
      
      // Add keyboard event listeners
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    // Focus management for modals/overlays
    this.setupFocusManagement();
    
    // Announce dynamic content changes
    this.setupAriaLiveRegions();
  }

  setupFocusManagement() {
    // Store the last focused element before opening modals
    let lastFocusedElement = null;
    
    document.addEventListener('focusin', (e) => {
      if (!e.target.closest('.modal, .overlay')) {
        lastFocusedElement = e.target;
      }
    });
    
    // Return focus when modals close
    document.addEventListener('modal-close', () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    });
  }

  setupAriaLiveRegions() {
    // Create a live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announce(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // Performance optimizations
  setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = requestAnimationFrame(() => {
        this.handleScroll();
      });
    });

    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup service worker for caching (if supported)
    this.setupServiceWorker();
  }

  handleScroll() {
    // Add scroll-based effects here
    const header = document.querySelector('header');
    if (header) {
      const scrolled = window.scrollY > 100;
      header.style.backdropFilter = scrolled ? 'blur(10px)' : 'none';
      header.style.backgroundColor = scrolled 
        ? 'rgba(93, 17, 17, 0.95)' 
        : 'var(--color-primary)';
    }
  }

  preloadCriticalResources() {
    // Preload important images
    const criticalImages = [
      './images/heroBW.jpg',
      './images/telephone.jpg',
      './images/grupprum.png',
      './images/lecture.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Animation enhancements
  setupAnimations() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
      return;
    }

    // Add staggered animations for card grids
    this.setupStaggeredAnimations();
    
    // Add hover effects for better feedback
    this.setupHoverEffects();
  }

  setupStaggeredAnimations() {
    const cardGroups = [
      document.querySelectorAll('.shortcuts .shortcutCard'),
      document.querySelectorAll('.news .newsCard'),
      document.querySelectorAll('.calendarEvents .calendarEvent')
    ];

    cardGroups.forEach(cards => {
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
      });
    });
  }

  setupHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .btn, .shortcutCard, .contactCard');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 600ms ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    // Add ripple styles if not already present
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        .ripple-container {
          position: relative;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    }
    
    element.classList.add('ripple-container');
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  
  // In production, you might want to send errors to a logging service
  // logError(e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  
  // In production, you might want to send errors to a logging service
  // logError(e.reason);
});

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LibraryApp();
  });
} else {
  new LibraryApp();
}

// Export for potential use in other scripts
window.LibraryApp = LibraryApp;