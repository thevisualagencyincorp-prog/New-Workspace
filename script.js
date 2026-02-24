document.addEventListener('DOMContentLoaded', () => {
    // 1. UPDATE MAGAZINE TIME
    const timeDisplay = document.getElementById('magazine-time');
    function updateMagazineTime() {
        if (!timeDisplay) return;
        const now = new Date();
        const options = {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const timeStr = now.toLocaleString('en-US', options).toUpperCase();
        timeDisplay.innerText = `VOL. 1 // ${timeStr}`;
    }
    updateMagazineTime();
    setInterval(updateMagazineTime, 1000);

    // 2. SMOOTH PARALLAX SYSTEM (RAF)
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const videoBgs = document.querySelectorAll('.video-bg-container');
    let lastScrollY = window.scrollY;

    function applyParallax() {
        const scrolled = window.scrollY;
        if (scrolled !== lastScrollY) {
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
                const yPos = -(scrolled * speed);
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });

            // Subtle Video Parallax
            videoBgs.forEach(bg => {
                const speed = 0.15;
                bg.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            });
            lastScrollY = scrolled;
        }
        requestAnimationFrame(applyParallax);
    }
    requestAnimationFrame(applyParallax);

    // 3. HORIZONTAL SCROLL LOGIC (CORE SYSTEMS)
    const horizontalSection = document.getElementById('horizontal-section');
    const horizontalTrack = document.querySelector('.horizontal-track');
    if (horizontalSection && horizontalTrack) {
        window.addEventListener('scroll', () => {
            const sectionOffset = horizontalSection.offsetTop;
            const sectionHeight = horizontalSection.offsetHeight;
            const scrolledCurr = window.scrollY;

            if (scrolledCurr >= sectionOffset && scrolledCurr <= (sectionOffset + sectionHeight)) {
                const percentage = (scrolledCurr - sectionOffset) / (sectionHeight - window.innerHeight);
                const scrollWidth = horizontalTrack.scrollWidth - window.innerWidth;
                horizontalTrack.style.transform = `translate3d(-${percentage * scrollWidth}px, 0, 0)`;
            }
        });
    }

    // 4. REVEAL ON SCROLL
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(r => revealObserver.observe(r));
});
