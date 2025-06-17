// Revolutionary Library UX JavaScript - Debugged Version
class RevolutionaryLibrary {
  constructor() {
    this.isLoaded = false;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.lenis = null;
    this.init();
  }

  async init() {
    try {
      await this.waitForDOMReady();
      await this.loadDependencies();
      this.setupLoadingScreen();
      this.setupCustomCursor();
      this.setupScrollEffects();
      this.setupParticles();
      this.setup3DEffects();
      this.setupMicroInteractions();
      this.setupSearchOverlay();
      this.setupCarousels();
      this.setupTimeline();
      this.setupContactCards();
      this.setupFloatingNav();
      this.setupPerformanceOptimizations();
      this.setupAccessibility();
      this.finishLoading();
    } catch (error) {
      console.error('Initialization error:', error);
      this.fallbackInit();
    }
  }

  waitForDOMReady() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  async loadDependencies() {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 50;
      
      const checkDependencies = () => {
        attempts++;
        if (typeof gsap !== 'undefined') {
          // Register ScrollTrigger if available
          if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
          }
          resolve();
        } else if (attempts < maxAttempts) {
          setTimeout(checkDependencies, 100);
        } else {
          console.warn('GSAP not loaded, using fallback animations');
          resolve();
        }
      };
      
      checkDependencies();
    });
  }

  fallbackInit() {
    // Fallback initialization without advanced animations
    console.log('Running fallback initialization');
    this.setupBasicInteractions();
    this.finishLoading();
  }

  setupBasicInteractions() {
    // Basic interactions without GSAP
    const cards = document.querySelectorAll('.service-card, .contact-card, .news-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!loadingScreen || !progressBar) {
      console.warn('Loading screen elements not found');
      return;
    }
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      progressBar.style.width = `${progress}%`;
    }, 200);
  }

  finishLoading() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.remove();
          this.isLoaded = true;
          this.startAnimations();
        }, 600);
      } else {
        this.isLoaded = true;
        this.startAnimations();
      }
    }, 2000); // Reduced loading time for debugging
  }

  startAnimations() {
    if (typeof gsap === 'undefined') {
      console.log('GSAP not available, using CSS animations');
      this.startCSSAnimations();
      return;
    }

    try {
      // Trigger entrance animations
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        gsap.from(heroContent, {
          duration: 1.5,
          y: 100,
          opacity: 0,
          ease: 'power3.out',
          delay: 0.5
        });
      }

      const floatingNav = document.querySelector('.floating-nav');
      if (floatingNav) {
        gsap.from(floatingNav, {
          duration: 1,
          x: 100,
          opacity: 0,
          ease: 'back.out(1.7)',
          delay: 1
        });
      }

      // Setup scroll-triggered animations
      this.setupScrollTriggers();
    } catch (error) {
      console.error('Animation error:', error);
      this.startCSSAnimations();
    }
  }

  startCSSAnimations() {
    // Fallback CSS animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.animation = 'fadeInUp 1.5s ease-out forwards';
    }

    const floatingNav = document.querySelector('.floating-nav');
    if (floatingNav) {
      floatingNav.style.animation = 'slideInRight 1s ease-out 1s forwards';
    }
  }

  setupCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursor || !cursorDot || !cursorRing) {
      console.warn('Custom cursor elements not found');
      return;
    }

    // Check if device supports hover (not touch device)
    if (!window.matchMedia('(hover: hover)').matches) {
      cursor.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Smooth cursor animation
    const animateCursor = () => {
      try {
        if (typeof gsap !== 'undefined') {
          // Dot follows mouse immediately
          gsap.set(cursorDot, {
            x: mouseX,
            y: mouseY
          });

          // Ring follows with delay
          ringX += (mouseX - ringX) * 0.1;
          ringY += (mouseY - ringY) * 0.1;
          
          gsap.set(cursorRing, {
            x: ringX,
            y: ringY
          });
        } else {
          // Fallback without GSAP
          cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
          ringX += (mouseX - ringX) * 0.1;
          ringY += (mouseY - ringY) * 0.1;
          cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        }

        requestAnimationFrame(animateCursor);
      } catch (error) {
        console.error('Cursor animation error:', error);
      }
    };
    
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .contact-card, .news-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(cursorRing, {
            duration: 0.3,
            scale: 2,
            borderColor: '#e94560'
          });
        } else {
          cursorRing.style.transform += ' scale(2)';
          cursorRing.style.borderColor = '#e94560';
        }
      });

      el.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(cursorRing, {
            duration: 0.3,
            scale: 1,
            borderColor: '#00d4ff'
          });
        } else {
          cursorRing.style.transform = cursorRing.style.transform.replace(' scale(2)', '');
          cursorRing.style.borderColor = '#00d4ff';
        }
      });
    });
  }

  setupScrollEffects() {
    try {
      // Smooth scrolling with Lenis if available
      if (typeof Lenis !== 'undefined') {
        this.lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    } catch (error) {
      console.error('Lenis scroll error:', error);
    }

    // Header scroll effect
    const header = document.querySelector('.revolutionary-header');
    if (!header) {
      console.warn('Header not found');
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      try {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Parallax effect for hero
        const hero = document.querySelector('.hero-section');
        if (hero) {
          const scrolled = scrollY * 0.5;
          hero.style.transform = `translateY(${scrolled}px)`;
        }

        lastScrollY = scrollY;
      } catch (error) {
        console.error('Scroll handler error:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  setupParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
      console.warn('Particles container not found');
      return;
    }

    try {
      // Create floating particles
      for (let i = 0; i < 30; i++) { // Reduced number for performance
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 1}px;
          height: ${Math.random() * 4 + 1}px;
          background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
          border-radius: 50%;
          pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Animate particles
        if (typeof gsap !== 'undefined') {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });

          gsap.to(particle, {
            duration: Math.random() * 20 + 10,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
          });
        } else {
          // CSS animation fallback
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = Math.random() * window.innerHeight + 'px';
          particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
        }
      }
    } catch (error) {
      console.error('Particles setup error:', error);
    }
  }

  setup3DEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        try {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              duration: 0.3,
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 1000,
              ease: 'power2.out'
            });
          } else {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }
        } catch (error) {
          console.error('3D effect error:', error);
        }
      });

      card.addEventListener('mouseleave', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              duration: 0.5,
              rotationX: 0,
              rotationY: 0,
              ease: 'power2.out'
            });
          } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          }
        } catch (error) {
          console.error('3D reset error:', error);
        }
      });
    });

    // 3D book animation
    const floatingBook = document.getElementById('floating-book');
    if (floatingBook && typeof gsap !== 'undefined') {
      try {
        gsap.to(floatingBook, {
          duration: 4,
          rotationY: 360,
          repeat: -1,
          ease: 'none'
        });

        gsap.to(floatingBook, {
          duration: 6,
          y: -20,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      } catch (error) {
        console.error('Book animation error:', error);
      }
    }
  }

  setupMicroInteractions() {
    // Button ripple effects
    const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        try {
          this.createRipple(e, button);
        } catch (error) {
          console.error('Ripple effect error:', error);
        }
      });
    });

    // Card hover animations
    const cards = document.querySelectorAll('.service-card, .contact-card, .news-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              duration: 0.3,
              y: -10,
              scale: 1.02,
              ease: 'power2.out'
            });
          } else {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
          }
        } catch (error) {
          console.error('Card hover error:', error);
        }
      });

      card.addEventListener('mouseleave', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              duration: 0.3,
              y: 0,
              scale: 1,
              ease: 'power2.out'
            });
          } else {
            card.style.transform = 'translateY(0) scale(1)';
          }
        } catch (error) {
          console.error('Card leave error:', error);
        }
      });
    });

    // Icon animations
    const icons = document.querySelectorAll('.card-icon, .contact-icon');
    
    icons.forEach(icon => {
      const parent = icon.parentElement;
      if (!parent) return;

      parent.addEventListener('mouseenter', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(icon, {
              duration: 0.5,
              rotation: 360,
              scale: 1.2,
              ease: 'back.out(1.7)'
            });
          } else {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
          }
        } catch (error) {
          console.error('Icon animation error:', error);
        }
      });

      parent.addEventListener('mouseleave', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(icon, {
              duration: 0.5,
              rotation: 0,
              scale: 1,
              ease: 'power2.out'
            });
          } else {
            icon.style.transform = 'rotate(0deg) scale(1)';
          }
        } catch (error) {
          console.error('Icon reset error:', error);
        }
      });
    });
  }

  createRipple(event, element) {
    try {
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
        pointer-events: none;
        z-index: 1;
      `;
      
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);
      
      if (typeof gsap !== 'undefined') {
        gsap.to(ripple, {
          duration: 0.6,
          scale: 2,
          opacity: 0,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        });
      } else {
        ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
        setTimeout(() => ripple.remove(), 600);
      }
    } catch (error) {
      console.error('Ripple creation error:', error);
    }
  }

  setupSearchOverlay() {
    const searchTrigger = document.getElementById('search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');
    const searchTabs = document.querySelectorAll('.search-tab');

    if (!searchTrigger || !searchOverlay) {
      console.warn('Search overlay elements not found');
      return;
    }

    searchTrigger.addEventListener('click', () => {
      try {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(searchOverlay, 
            { opacity: 0 },
            { duration: 0.5, opacity: 1 }
          );
          
          gsap.fromTo('.search-container',
            { scale: 0.8, y: 50 },
            { duration: 0.5, scale: 1, y: 0, ease: 'back.out(1.7)', delay: 0.2 }
          );
        }
        
        setTimeout(() => searchInput?.focus(), 600);
      } catch (error) {
        console.error('Search overlay open error:', error);
      }
    });

    if (searchClose) {
      searchClose.addEventListener('click', () => {
        this.closeSearchOverlay();
      });
    }

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        this.closeSearchOverlay();
      }
    });

    // Search tabs
    searchTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        try {
          searchTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          if (typeof gsap !== 'undefined') {
            gsap.to(tab, {
              duration: 0.3,
              scale: 1.05,
              ease: 'back.out(1.7)'
            });
            
            setTimeout(() => {
              gsap.to(tab, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
              });
            }, 200);
          }
        } catch (error) {
          console.error('Search tab error:', error);
        }
      });
    });

    // Search suggestions
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        try {
          this.handleSearchSuggestions(e.target.value);
        } catch (error) {
          console.error('Search suggestions error:', error);
        }
      });
    }
  }

  closeSearchOverlay() {
    try {
      const searchOverlay = document.getElementById('search-overlay');
      
      if (typeof gsap !== 'undefined') {
        gsap.to('.search-container', {
          duration: 0.3,
          scale: 0.8,
          y: 50,
          ease: 'power2.in'
        });
        
        gsap.to(searchOverlay, {
          duration: 0.3,
          opacity: 0,
          delay: 0.1,
          onComplete: () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      } else {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    } catch (error) {
      console.error('Search overlay close error:', error);
    }
  }

  handleSearchSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions || query.length < 2) {
      if (suggestions) suggestions.classList.remove('active');
      return;
    }

    try {
      // Mock suggestions
      const mockSuggestions = [
        'Artificiell intelligens',
        'Kvantfysik',
        'Molekylärbiologi',
        'Datastrukturer',
        'Filosofi'
      ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

      if (mockSuggestions.length > 0) {
        suggestions.innerHTML = mockSuggestions
          .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
          .join('');
        
        suggestions.classList.add('active');
        
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(suggestions,
            { opacity: 0, y: -10 },
            { duration: 0.3, opacity: 1, y: 0 }
          );
        }
      }
    } catch (error) {
      console.error('Search suggestions error:', error);
    }
  }

  setupCarousels() {
    const newsTrack = document.getElementById('news-track');
    const prevBtn = document.getElementById('news-prev');
    const nextBtn = document.getElementById('news-next');
    const indicators = document.querySelectorAll('.indicator');

    if (!newsTrack) {
      console.warn('News track not found');
      return;
    }

    let currentIndex = 0;
    const cardWidth = 420; // Card width + gap

    const updateCarousel = () => {
      try {
        if (typeof gsap !== 'undefined') {
          gsap.to(newsTrack, {
            duration: 0.5,
            x: -currentIndex * cardWidth,
            ease: 'power2.out'
          });
        } else {
          newsTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
          newsTrack.style.transition = 'transform 0.5s ease';
        }

        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
        });
      } catch (error) {
        console.error('Carousel update error:', error);
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, newsTrack.children.length - 2);
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Auto-play with error handling
    try {
      setInterval(() => {
        const maxIndex = Math.max(0, newsTrack.children.length - 2);
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
      }, 5000);
    } catch (error) {
      console.error('Carousel auto-play error:', error);
    }
  }

  setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineBtns = document.querySelectorAll('.timeline-btn');

    // Animate timeline items on scroll
    timelineItems.forEach((item, index) => {
      try {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.set(item, { opacity: 0, y: 50 });
          
          ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(item, {
                duration: 0.6,
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                delay: index * 0.1
              });
              item.classList.add('visible');
            }
          });
        } else {
          // Fallback intersection observer
          this.observeElement(item, () => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('visible');
          });
        }
      } catch (error) {
        console.error('Timeline item setup error:', error);
      }
    });

    // Timeline navigation
    timelineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        try {
          timelineBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Animate button
          if (typeof gsap !== 'undefined') {
            gsap.to(btn, {
              duration: 0.3,
              scale: 1.05,
              ease: 'back.out(1.7)'
            });
            
            setTimeout(() => {
              gsap.to(btn, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
              });
            }, 200);
          }
        } catch (error) {
          console.error('Timeline button error:', error);
        }
      });
    });
  }

  observeElement(element, callback) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(element);
    } else {
      // Fallback for older browsers
      callback();
    }
  }

  setupContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
      card.addEventListener('click', () => {
        try {
          const contactType = card.dataset.contact;
          this.handleContactAction(contactType);
          
          // Visual feedback
          if (typeof gsap !== 'undefined') {
            gsap.to(card, {
              duration: 0.1,
              scale: 0.95,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1
            });
          } else {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.transform = 'scale(1)';
            }, 100);
          }
        } catch (error) {
          console.error('Contact card error:', error);
        }
      });
    });
  }

  handleContactAction(type) {
    try {
      switch (type) {
        case 'chat':
          this.showNotification('Startar livechatt...', 'success');
          break;
        case 'phone':
          this.showNotification('Ringer 08-123 456 78...', 'info');
          break;
        case 'email':
          this.showNotification('Öppnar e-postklient...', 'info');
          break;
        case 'visit':
          this.showNotification('Öppnar karta...', 'info');
          break;
        default:
          this.showNotification('Kontaktfunktion aktiverad', 'info');
      }
    } catch (error) {
      console.error('Contact action error:', error);
    }
  }

  setupFloatingNav() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          
          // Remove active class from all items
          navItems.forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
          
          // Smooth scroll to section
          const href = item.getAttribute('href');
          if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          } else if (href) {
            window.location.href = href;
          }
          
          // Visual feedback
          if (typeof gsap !== 'undefined') {
            gsap.to(item, {
              duration: 0.3,
              scale: 1.2,
              ease: 'back.out(1.7)'
            });
            
            setTimeout(() => {
              gsap.to(item, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
              });
            }, 200);
          }
        } catch (error) {
          console.error('Floating nav error:', error);
        }
      });
    });

    // Update active nav item on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNav = () => {
      try {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navItems.forEach(item => {
              item.classList.remove('active');
              if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
              }
            });
          }
        });
      } catch (error) {
        console.error('Nav update error:', error);
      }
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  setupScrollTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.log('ScrollTrigger not available, using intersection observer');
      this.setupIntersectionObserver();
      return;
    }

    try {
      // Animate sections on scroll
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const elements = section.querySelectorAll('.section-title, .section-subtitle, .service-card, .contact-card, .news-card');
        
        elements.forEach((element, index) => {
          gsap.set(element, { opacity: 0, y: 50 });
          
          ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(element, {
                duration: 0.6,
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                delay: index * 0.1
              });
            }
          });
        });
      });

      // Parallax effects
      const parallaxElements = document.querySelectorAll('.hero-background, .footer-background');
      
      parallaxElements.forEach(element => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    } catch (error) {
      console.error('ScrollTrigger setup error:', error);
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .contact-card, .news-card');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && images.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    }, { passive: true });
  }

  handleResize() {
    try {
      // Update particle positions
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        if (typeof gsap !== 'undefined') {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          });
        } else {
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = Math.random() * window.innerHeight + 'px';
        }
      });

      // Refresh ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    } catch (error) {
      console.error('Resize handler error:', error);
    }
  }

  setupAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSearchOverlay();
      }
    });

    // Focus management
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(element, {
              duration: 0.2,
              scale: 1.05,
              ease: 'power2.out'
            });
          }
        } catch (error) {
          console.error('Focus animation error:', error);
        }
      });

      element.addEventListener('blur', () => {
        try {
          if (typeof gsap !== 'undefined') {
            gsap.to(element, {
              duration: 0.2,
              scale: 1,
              ease: 'power2.out'
            });
          }
        } catch (error) {
          console.error('Blur animation error:', error);
        }
      });
    });

    // Setup aria live region
    this.setupAriaLiveRegion();
  }

  setupAriaLiveRegion() {
    try {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(liveRegion);
      
      this.liveRegion = liveRegion;
    } catch (error) {
      console.error('Aria live region setup error:', error);
    }
  }

  announce(message) {
    try {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
        setTimeout(() => {
          this.liveRegion.textContent = '';
        }, 1000);
      }
    } catch (error) {
      console.error('Announce error:', error);
    }
  }

  showNotification(message, type = 'info') {
    try {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
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
      
      this.announce(message);
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      new RevolutionaryLibrary();
    } catch (error) {
      console.error('Revolutionary Library initialization error:', error);
    }
  });
} else {
  try {
    new RevolutionaryLibrary();
  } catch (error) {
    console.error('Revolutionary Library initialization error:', error);
  }
}

// Handle errors gracefully
window.addEventListener('error', (e) => {
  console.error('Revolutionary Library Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  e.preventDefault(); // Prevent the default browser behavior
});