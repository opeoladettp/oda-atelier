(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const backToTop = document.querySelector('#backToTop');
  const year = document.querySelector('#year');
  year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
  };
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.querySelector('.material-symbols-outlined').textContent = open ? 'close' : 'menu';
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 12);
    backToTop.classList.toggle('visible', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  // Gentle scroll parallax; disabled for touch devices and reduced-motion users.
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchDevice = window.matchMedia('(hover: none)').matches;
  if (!reduceMotion && !touchDevice && parallaxItems.length) {
    let ticking = false;
    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const speed = Number(item.dataset.parallax || 0.08);
        const shift = (rect.top - vh / 2) * speed * -0.22;
        item.style.setProperty('--parallax-y', `${shift}px`);
        const image = item.querySelector('img');
        if (image) image.style.transform = `scale(1.08) translate3d(0, var(--parallax-y, 0), 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();
  }

  // Add a subtle image lift on pointer hover for desktop.
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (window.matchMedia('(hover: none)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--hover-x', `${x * 3}px`);
      card.style.setProperty('--hover-y', `${y * 3}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--hover-x', '0px');
      card.style.setProperty('--hover-y', '0px');
    });
  });

  // Founder gallery interactive portrait switcher
  const founderImg = document.querySelector('#founderActiveImg');
  const founderLabel = document.querySelector('#founderActiveLabel');
  const founderCounter = document.querySelector('#founderCounter');
  const thumbs = document.querySelectorAll('.founder-thumb');
  const stripCards = document.querySelectorAll('.founder-strip-card');
  const prevBtn = document.querySelector('#founderPrev');
  const nextBtn = document.querySelector('#founderNext');

  if (founderImg && thumbs.length) {
    let currentIndex = 0;
    const portraits = Array.from(thumbs).map(t => ({
      src: t.dataset.src,
      label: t.dataset.label,
      alt: t.querySelector('img') ? t.querySelector('img').alt : ''
    }));

    const setActivePortrait = (index) => {
      currentIndex = (index + portraits.length) % portraits.length;
      const item = portraits[currentIndex];

      founderImg.style.opacity = '0';
      setTimeout(() => {
        founderImg.src = item.src;
        founderImg.alt = item.alt;
        if (founderLabel) founderLabel.textContent = item.label;
        if (founderCounter) founderCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(portraits.length).padStart(2, '0')}`;
        founderImg.style.opacity = '1';
      }, 150);

      thumbs.forEach((t, i) => {
        const active = i === currentIndex;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });

      stripCards.forEach((c, i) => {
        c.classList.toggle('active', i === currentIndex);
      });
    };

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        const idx = Number(t.dataset.index);
        setActivePortrait(idx);
      });
    });

    stripCards.forEach(c => {
      c.addEventListener('click', () => {
        const idx = Number(c.dataset.index);
        setActivePortrait(idx);
        founderImg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => setActivePortrait(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => setActivePortrait(currentIndex + 1));
  }
})();
