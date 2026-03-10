    // ── Floating hearts background
    const hb = document.getElementById('heartsBg');
    const emojis = ['🌸','💕','✨','🌹','💖','🎀','💗','👑','🎈','🎂','🎂','🎂','🎁','🥂','👸','🫶','🎂'];
    for (let i = 0; i < 35; i++) {
      const el = document.createElement('div');
      el.className = 'heart-particle';
      const chosen = emojis[Math.floor(Math.random() * emojis.length)];
      el.textContent = chosen;
      el.style.left = Math.random() * 100 + 'vw';
      // Cake emojis get a larger size range
      const isCake = chosen === '🎂';
      el.style.fontSize = isCake
        ? (1.6 + Math.random() * 1.2) + 'rem'
        : (0.8 + Math.random() * 1.2) + 'rem';
      el.style.animationDuration = (8 + Math.random() * 10) + 's';
      el.style.animationDelay = (Math.random() * 10) + 's';
      hb.appendChild(el);
    }

    // ── Confetti burst
    function burstConfetti() {
      const colors = ['#c8536a','#f0d080','#e8899a','#f5dde3','#c9973a','#fff'];
      for (let i = 0; i < 100; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = (20 + Math.random() * 60) + 'vw';
        c.style.top = (10 + Math.random() * 40) + 'vh';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = (Math.random() * 0.8) + 's';
        c.style.animationDuration = (2 + Math.random() * 1.5) + 's';
        c.style.transform = `rotate(${Math.random()*360}deg)`;
        c.style.width = (6 + Math.random() * 10) + 'px';
        c.style.height = (6 + Math.random() * 10) + 'px';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
      }
    }

    // ── Main sequence
    let opened = false;
    function openCard() {
      if (opened) return;
      opened = true;

      const pull       = document.getElementById('pullRibbon');
      const ribbonBand = document.getElementById('ribbonBand');
      const ribbonVert = document.getElementById('ribbonVert');
      const ribbonBow  = document.getElementById('ribbonBow');
      const cover      = document.getElementById('cardCover');

      // Step 1: stop bobble, play pull-down animation
      pull.style.animation = 'none'; // stop bobble immediately
      pull.style.pointerEvents = 'none';
      void pull.offsetWidth; // force reflow
      pull.classList.add('pulling');

      // Step 2 (600ms): ribbons split open from center (after pull lands)
      setTimeout(() => {
        pull.style.opacity = '0';
        ribbonBand.classList.add('split');
        ribbonVert.classList.add('split');
        ribbonBow.classList.add('bow-fly');
      }, 600);

      // Step 3: admire card front for 2.5 seconds

      // Step 4 (3200ms): book-open the cover
      setTimeout(() => {
        cover.classList.add('book-open');
      }, 3200);

      // Step 5 (4700ms): confetti bursts as cover finishes opening
      setTimeout(() => {
        burstConfetti();
      }, 4700);

      // Step 6 (7700ms): after 3s admiring the inside message, fade to homepage
      setTimeout(() => {
        document.getElementById('card-scene').classList.add('hide');
        document.getElementById('homepage').classList.add('visible');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }, 7700);
    }

    // ── HOMEPAGE INTERVAL CONFETTI ──
    const confettiColors = ['#c8536a','#f0d080','#e8899a','#d4b8e8','#c4d8e8','#d8e8c4','#FF0000','#ffffff','#f5c842'];
    function spawnHomepageConfetti() {
      const count = 18 + Math.floor(Math.random() * 14);
      for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'hp-confetti';
        c.style.left = (Math.random() * 100) + 'vw';
        c.style.top = '-8px';
        c.style.width  = (5 + Math.random() * 7) + 'px';
        c.style.height = (5 + Math.random() * 7) + 'px';
        c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
        c.style.animationDelay = (Math.random() * 1.2) + 's';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5500);
      }
    }

    // Fire confetti bursts every 6 seconds once homepage is visible
    let confettiInterval = null;
    const homepageEl = document.getElementById('homepage');
    const observer2 = new MutationObserver(() => {
      if (homepageEl.classList.contains('visible') && !confettiInterval) {
        spawnHomepageConfetti(); // immediate first burst
        confettiInterval = setInterval(spawnHomepageConfetti, 6000);
      }
    });
    observer2.observe(homepageEl, { attributes: true, attributeFilter: ['class'] });

    // ── BENTO JOY BOXES — SWIPEABLE LIGHTBOX ──
    const overlay   = document.getElementById('lightbox');
    const lbNum     = document.getElementById('lightboxNum');
    const lbMsg     = document.getElementById('lightboxMsg');
    const lbTrack   = document.getElementById('lbTrack');
    const lbDots    = document.getElementById('lbDots');
    const lbCounter = document.getElementById('lbCounter');
    const lbPrev    = document.getElementById('lbPrev');
    const lbNext    = document.getElementById('lbNext');
    const lbClose   = document.getElementById('lightboxClose');
    let activeBox   = null;
    let slideIndex  = 0;
    let slideTotal  = 0;

    function buildSlides(box, num) {
      lbTrack.innerHTML = '';
      lbDots.innerHTML  = '';
      slideIndex = 0;

      // Collect media: data-media is a JSON array of {type:'img'|'video', src:'...'} 
      // Falls back to legacy .joy-thumb src
      let mediaItems = [];
      try {
        if (box.dataset.media) mediaItems = JSON.parse(box.dataset.media);
      } catch(e) {}

      // Legacy single image fallback
      if (!mediaItems.length) {
        const img = box.querySelector('.joy-thumb');
        if (img && img.src && !img.src.endsWith('/') && !img.src.includes('undefined')) {
          mediaItems = [{ type: 'img', src: img.src }];
        }
      }

      // If still nothing, one placeholder slide
      if (!mediaItems.length) {
        mediaItems = [{ type: 'placeholder' }];
      }

      slideTotal = mediaItems.length;

      mediaItems.forEach((item, i) => {
        const slide = document.createElement('div');
        slide.className = 'lb-slide';
        if (item.type === 'img') {
          const el = document.createElement('img');
          el.src = item.src; el.alt = `Joy ${num} — ${i+1}`;
          slide.appendChild(el);
        } else if (item.type === 'video') {
          const el = document.createElement('video');
          el.src = item.src; el.controls = true; el.playsInline = true;
          slide.appendChild(el);
        } else {
          slide.innerHTML = `<div class="lb-placeholder"><span>🌸</span><div>Add photo for Joy #${num}</div></div>`;
        }
        lbTrack.appendChild(slide);

        // Dot
        const dot = document.createElement('div');
        dot.className = 'lb-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        lbDots.appendChild(dot);
      });

      updateSliderUI();
    }

    function goToSlide(idx) {
      slideIndex = Math.max(0, Math.min(idx, slideTotal - 1));
      lbTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
      updateSliderUI();
    }

    function updateSliderUI() {
      // Dots
      lbDots.querySelectorAll('.lb-dot').forEach((d, i) => {
        d.classList.toggle('active', i === slideIndex);
      });
      // Counter
      if (slideTotal > 1) {
        lbCounter.textContent = `${slideIndex + 1} / ${slideTotal}`;
        lbCounter.classList.remove('hidden');
        lbDots.style.display = 'flex';
      } else {
        lbCounter.classList.add('hidden');
        lbDots.style.display = 'none';
      }
      // Arrows
      lbPrev.classList.toggle('hidden', slideTotal <= 1 || slideIndex === 0);
      lbNext.classList.toggle('hidden', slideTotal <= 1 || slideIndex === slideTotal - 1);
    }

    lbPrev.addEventListener('click', () => goToSlide(slideIndex - 1));
    lbNext.addEventListener('click', () => goToSlide(slideIndex + 1));

    // Touch/swipe support
    let touchStartX = 0;
    lbTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lbTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goToSlide(slideIndex + (diff > 0 ? 1 : -1));
    });

    // Keyboard arrow keys
    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'ArrowRight') goToSlide(slideIndex + 1);
      if (e.key === 'ArrowLeft')  goToSlide(slideIndex - 1);
      if (e.key === 'Escape') closeLightbox();
    });

    document.querySelectorAll('.joy-box[data-num]').forEach(box => {
      if (!box.dataset.num) return;
      box.addEventListener('click', () => {
        const num = box.dataset.num;
        lbNum.textContent = `Joy #${num}`;
        lbMsg.textContent = box.dataset.msg;
        buildSlides(box, num);
        activeBox = box;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      // Pause any videos
      lbTrack.querySelectorAll('video').forEach(v => v.pause());
      // Mark box revealed if it has real media
      if (activeBox) {
        const img = activeBox.querySelector('.joy-thumb');
        const hasMedia = activeBox.dataset.media ||
          (img && img.src && !img.src.endsWith('/') && !img.src.includes('undefined'));
        if (hasMedia) activeBox.classList.add('revealed');
        activeBox = null;
      }
    }

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
