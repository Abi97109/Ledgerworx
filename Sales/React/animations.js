/**
 * React Animations & Effects
 * Smooth transitions, fade-ins, slide animations for LedgerWorx Sales Module
 */

class AnimationManager {
  /**
   * Initialize animation observer for page elements
   * Uses Intersection Observer API for performance
   */
  static initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Add fade-in animation to elements
   * @param {HTMLElement} element - Element to animate
   * @param {number} delay - Delay in milliseconds
   */
  static fadeIn(element, delay = 0) {
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.transition = 'opacity 0.3s ease-out';
      element.style.opacity = '1';
    }, delay);
  }

  /**
   * Add slide-up animation to elements
   * @param {HTMLElement} element - Element to animate
   * @param {number} delay - Delay in milliseconds
   * @param {number} distance - Slide distance in pixels
   */
  static slideUp(element, delay = 0, distance = 20) {
    element.style.opacity = '0';
    element.style.transform = `translateY(${distance}px)`;
    setTimeout(() => {
      element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  /**
   * Add slide-down animation to elements
   * @param {HTMLElement} element - Element to animate
   * @param {number} delay - Delay in milliseconds
   */
  static slideDown(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  /**
   * Add staggered animation to multiple elements
   * @param {NodeList|Array} elements - Elements to animate
   * @param {string} animationType - Type of animation (fadeIn, slideUp, slideDown)
   * @param {number} staggerDelay - Delay between each element in milliseconds
   */
  static staggerAnimation(elements, animationType = 'slideUp', staggerDelay = 100) {
    elements.forEach((el, index) => {
      const delay = index * staggerDelay;
      switch(animationType) {
        case 'fadeIn':
          this.fadeIn(el, delay);
          break;
        case 'slideUp':
          this.slideUp(el, delay);
          break;
        case 'slideDown':
          this.slideDown(el, delay);
          break;
        default:
          this.fadeIn(el, delay);
      }
    });
  }

  /**
   * Add pulse animation to element (for notifications, alerts)
   * @param {HTMLElement} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static pulse(element, duration = 2000) {
    element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
  }

  /**
   * Add bounce animation to element (for CTA buttons)
   * @param {HTMLElement} element - Element to animate
   */
  static bounce(element) {
    element.classList.add('bounce-animation');
  }

  /**
   * Add flip animation to element
   * @param {HTMLElement} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static flip(element, duration = 600) {
    element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    element.style.transform = 'rotateY(360deg)';
  }

  /**
   * Add scale animation (zoom in/out)
   * @param {HTMLElement} element - Element to animate
   * @param {number} scale - Scale factor (1 = normal, 1.1 = 10% larger)
   * @param {number} duration - Animation duration in milliseconds
   */
  static scale(element, scale = 1.1, duration = 300) {
    element.style.transition = `transform ${duration}ms ease-out`;
    element.style.transform = `scale(${scale})`;
  }

  /**
   * Reset scale animation
   * @param {HTMLElement} element - Element to reset
   */
  static resetScale(element) {
    element.style.transform = 'scale(1)';
  }

  /**
   * Add shake animation (for error states)
   * @param {HTMLElement} element - Element to animate
   */
  static shake(element) {
    element.classList.add('shake-animation');
    setTimeout(() => {
      element.classList.remove('shake-animation');
    }, 500);
  }

  /**
   * Animate counter (for statistics/metrics)
   * @param {HTMLElement} element - Element containing the number
   * @param {number} endValue - Final value to reach
   * @param {number} duration - Animation duration in milliseconds
   * @param {string} prefix - Optional prefix (e.g., "$")
   * @param {string} suffix - Optional suffix (e.g., "%")
   */
  static animateCounter(element, endValue, duration = 2000, prefix = '', suffix = '') {
    const startValue = 0;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuad);
      element.textContent = prefix + currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  /**
   * Add morph animation between shapes
   * @param {HTMLElement} element - SVG or shape element
   * @param {string} newShape - Target shape path or className
   */
  static morph(element, newShape) {
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    if (element.getAttribute('d')) {
      element.setAttribute('d', newShape);
    } else {
      element.classList.add(newShape);
    }
  }

  /**
   * Create typing animation for text
   * @param {HTMLElement} element - Element containing text
   * @param {string} text - Text to type
   * @param {number} speed - Typing speed in milliseconds per character
   */
  static typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  /**
   * Create smooth scroll animation
   * @param {HTMLElement} target - Target element to scroll to
   * @param {number} duration - Animation duration in milliseconds
   */
  static smoothScroll(target, duration = 1000) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Create parallax scroll effect
   * @param {HTMLElement} element - Element to apply parallax
   * @param {number} speed - Parallax speed factor (0.5 = slower, 1 = normal)
   */
  static parallax(element, speed = 0.5) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  }

  /**
   * Initialize button hover animations
   */
  static initButtonAnimations() {
    document.querySelectorAll('button, .lw-btn, [role="button"]').forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
      });
    });
  }

  /**
   * Initialize card hover animations
   */
  static initCardAnimations() {
    document.querySelectorAll('.lw-card, .settings-card, .profile-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  AnimationManager.initScrollAnimations();
  AnimationManager.initButtonAnimations();
  AnimationManager.initCardAnimations();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}
