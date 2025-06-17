// Simple and User-Friendly Library JavaScript
class SimpleLibrary {
  constructor() {
    this.init();
  }

  init() {
    this.setupLoading();
    this.setupNavigation();
    this.setupSearch();
    this.setupInteractions();
    this.setupAccessibility();
    this.setupScrollEffects();
  }

  setupLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    
    if (!loadingScreen || !progressBar) return;
    
    // Simple loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      progressBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => loadingScreen.remove(), 500);
        }, 500);
      }
    }, 200);
  }

  setupNavigation() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

    // Mobile menu toggle
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        menuButton.setAttribute('aria-expanded', isOpen);
        menuButton.textContent = isOpen ? '✕' : '☰';
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.textContent = '☰';
        }
      });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Close mobile menu if open
            if (mobileMenu) {
              mobileMenu.classList.remove('active');
              if (menuButton) {
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.textContent = '☰';
              }
            }
          }
        }
      });
    });

    // Update active nav link on scroll
    this.updateActiveNavLink();
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));
  }

  setupSearch() {
    const searchButton = document.getElementById('search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (!searchButton || !searchOverlay) return;

    // Open search overlay
    searchButton.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput?.focus(), 100);
    });

    // Close search overlay
    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }

    // Close on overlay click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
      }
    });

    // Simple search functionality
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            this.performSearch(query);
            closeSearch();
          }
        }
      });
    }
  }

  performSearch(query) {
    // Simple search implementation
    console.log('Searching for:', query);
    this.showNotification(`Söker efter: "${query}"`, 'info');
    
    // In a real application, this would redirect to search results
    // For now, we'll just show a notification
    setTimeout(() => {
      this.showNotification('Sökresultat laddade', 'success');
    }, 1000);
  }

  setupInteractions() {
    // Simple hover effects for cards
    const cards = document.querySelectorAll('.service-card, .news-card, .contact-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });

    // Timeline navigation
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    
    timelineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timelineBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Simple visual feedback
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
        }, 100);
      });
    });

    // Contact card interactions
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
      const btn = card.querySelector('.contact-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const contactType = card.dataset.contact;
          this.handleContactAction(contactType);
        });
      }
    });

    // Service card clicks
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.service-title')?.textContent;
        this.showNotification(`Utforska: ${title}`, 'info');
      });
    });
  }

  handleContactAction(type) {
    const actions = {
      chat: 'Startar livechatt...',
      phone: 'Ringer 08-123 456 78...',
      email: 'Öppnar e-postklient...',
      visit: 'Öppnar karta...'
    };

    const message = actions[type] || 'Kontaktfunktion aktiverad';
    this.showNotification(message, 'success');
  }

  setupAccessibility() {
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, .service-card, .news-card, .contact-card'
    );

    interactiveElements.forEach(element => {
      // Add keyboard support for cards
      if (element.classList.contains('service-card') || 
          element.classList.contains('news-card') || 
          element.classList.contains('contact-card')) {
        
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
          }
        });
      }

      // Focus indicators
      element.addEventListener('focus', () => {
        element.style.outline = '2px solid #3182ce';
        element.style.outlineOffset = '2px';
      });

      element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
      });
    });

    // Announce dynamic content changes
    this.setupAriaLiveRegion();
  }

  setupAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    this.liveRegion = liveRegion;
  }

  announce(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  }

  setupScrollEffects() {
    const header = document.getElementById('header');
    
    if (!header) return;

    // Simple header scroll effect
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
    };

    // Throttle scroll events for performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Simple fade-in animation for elements
    this.setupFadeInAnimations();
  }

  setupFadeInAnimations() {
    const animatedElements = document.querySelectorAll(
      '.service-card, .news-card, .contact-card, .timeline-item'
    );

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
      success: '#38a169',
      error: '#e53e3e',
      info: '#3182ce',
      warning: '#dd6b20'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
      font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
    
    // Announce to screen readers
    this.announce(message);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SimpleLibrary();
  });
} else {
  new SimpleLibrary();
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('Library error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});