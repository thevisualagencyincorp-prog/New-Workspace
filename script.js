/* ✦ THE AGENCY — MOCKUP REPLICATION LOGIC + BOOT SCREEN ✦ */

// SCROLL ENGINES (HORIZONTAL + REVEAL)
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

function updateMagazineTime() {
    const topEl = document.getElementById('magazine-editorial-top');
    const clockEl = document.getElementById('magazine-clock-line');
    if (!topEl || !clockEl) {
        console.warn("✦ THE AGENCY: Magazine clock elements not found.");
        return;
    }

    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).toUpperCase();

    // Premium editorial line formatting
    topEl.textContent = `VOL. 1 // ISSUE: 001 // BAKERSFIELD, CA // PRICE: $0.00`;
    clockEl.textContent = `${dateStr} // ${timeStr} // SIGNAL: STABLE`;
}

const init = () => {
    console.log("✦ THE AGENCY: Tactical Initialization...");
    updateMagazineTime();
    setInterval(updateMagazineTime, 1000); // Update every second for the clock style
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Start logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// CONSOLIDATED DOM ENGINE
document.addEventListener('DOMContentLoaded', () => {
    // HORIZONTAL SCROLL LOGIC
    const horizontalSection = document.getElementById('horizontal-section');
    const horizontalTrack = document.querySelector('.horizontal-track');

    if (horizontalSection && horizontalTrack) {
        const updateHorizontal = () => {
            if (window.innerWidth <= 768) {
                horizontalTrack.style.transform = 'none';
            } else {
                const rect = horizontalSection.getBoundingClientRect();
                const sectionHeight = horizontalSection.offsetHeight;
                const windowHeight = window.innerHeight;

                let totalProgress = 0;
                if (rect.top > 0) {
                    totalProgress = 0;
                } else if (rect.bottom < windowHeight) {
                    totalProgress = 1;
                } else {
                    totalProgress = Math.abs(rect.top) / (sectionHeight - windowHeight);
                }

                const trackWidth = horizontalTrack.scrollWidth;
                const windowWidth = window.innerWidth;
                const maxTranslate = trackWidth - windowWidth + (windowWidth * 0.1);
                const translateX = totalProgress * maxTranslate;

                horizontalTrack.style.transform = `translateX(-${translateX}px)`;
            }
            requestAnimationFrame(updateHorizontal);
        };
        updateHorizontal();
    }

    // INTERACTIVE ORACLE (CRYSTAL BALL)
    const oracleVisual = document.getElementById('oracleVisual');
    const fortunesListBlock = document.getElementById('fortunesList');
    const card = document.getElementById('physicalCard');
    const oracleOverlay = document.getElementById('oracleOverlay');
    const cardText = document.getElementById('cardFortuneText');
    const cardSerial = document.getElementById('cardSerial');
    const closeCard = document.getElementById('closeCard');

    if (oracleVisual && fortunesListBlock) {
        const fortuneSpans = fortunesListBlock.querySelectorAll('span');
        oracleVisual.addEventListener('click', () => {
            if (card && oracleOverlay && cardText && fortuneSpans.length > 0) {
                const randomIndex = Math.floor(Math.random() * fortuneSpans.length);
                const fortune = fortuneSpans[randomIndex].getAttribute('data-fortune');
                cardText.textContent = fortune;
                cardSerial.textContent = `#${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;

                const luckies = [];
                while (luckies.length < 5) {
                    const n = Math.floor(Math.random() * 99) + 1;
                    if (!luckies.includes(n)) luckies.push(n);
                }
                const numEl = document.getElementById('cardLuckyNums');
                if (numEl) numEl.textContent = luckies.sort((a, b) => a - b).join(', ');

                const colorEl = document.getElementById('cardLuckyColor');
                if (colorEl) {
                    const colors = ['NEON PINK', 'CYBER TEAL', 'COBALT BLUE', 'ELECTRIC LIME', 'VINTAGE GOLD', 'CRIMSON RED', 'ULTRA VIOLET'];
                    colorEl.textContent = colors[Math.floor(Math.random() * colors.length)];
                }

                card.classList.add('active');
                oracleOverlay.classList.add('active');
            }
        });
    }

    if (closeCard) closeCard.addEventListener('click', () => {
        if (card) card.classList.remove('active');
        if (oracleOverlay) oracleOverlay.classList.remove('active');
    });

    if (oracleOverlay) oracleOverlay.addEventListener('click', () => {
        if (card) card.classList.remove('active');
        oracleOverlay.classList.remove('active');
    });

    // AJAX FORMS
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    forms.forEach(f => {
        f.addEventListener('submit', (e) => {
            if (f.id === 'agencyBrief') return;
            e.preventDefault();
            const btn = f.querySelector('button[type="submit"]') || f.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "SENDING_SIGNAL...";
            btn.disabled = true;

            fetch(f.action, {
                method: 'POST',
                body: new FormData(f),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    const destructMini = f.parentElement.querySelector('.destruct-mini');
                    if (destructMini) {
                        f.style.display = "none";
                        destructMini.style.display = "block";
                        startMiniDestruct(destructMini, f);
                    } else {
                        btn.textContent = "SIGNAL_SENT_✓";
                        f.reset();
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.disabled = false;
                        }, 3000);
                    }
                } else {
                    btn.textContent = "SIGNAL_ERROR";
                    btn.disabled = false;
                }
            }).catch(() => {
                btn.textContent = "SIGNAL_ERROR";
                btn.disabled = false;
            });
        });
    });

    function startMiniDestruct(el, form) {
        let count = 5;
        const timer = el.querySelector('.timer-mini');
        if (timer) timer.textContent = count;
        const countdown = setInterval(() => {
            count--;
            if (timer) timer.textContent = count;
            if (count <= 0) {
                clearInterval(countdown);
                el.style.display = "none";
                form.style.display = "block";
                form.reset();
                const btn = form.querySelector('button');
                if (btn) {
                    btn.textContent = "SIGNAL_SENT_✓";
                    btn.disabled = false;
                }
            }
        }, 1000);
    }

    // CASE STUDY ENGINE
    const folders = document.querySelectorAll('.desktop-folder-icon');
    const caseOverlay = document.getElementById('oracleOverlay');

    const closeAllModals = () => {
        document.querySelectorAll('.desktop-folder-content.active').forEach(modal => {
            modal.classList.remove('active');
        });
        if (caseOverlay) caseOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    folders.forEach(folder => {
        folder.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            const group = folder.closest('.desktop-folder-group');
            const content = group ? group.querySelector('.desktop-folder-content') : null;
            if (content) {
                if (caseOverlay) caseOverlay.classList.add('active');
                content.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.case-card-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllModals();
        });
    });

    // DRAGGABLE WINDOWS
    const titleBars = document.querySelectorAll('div[style*="background: darkblue;"], div[style*="background: darkgreen;"], div[style*="background: darkred;"]');
    titleBars.forEach(bar => {
        const win = bar.parentElement;
        if (!win || win.id === 'frank-window') return;

        bar.style.cursor = 'grab';
        let isDragging = false;
        let startX, startY, currentLeft, currentTop;

        bar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.btn-retro-close')) return;
            isDragging = true;
            bar.style.cursor = 'grabbing';
            const comp = window.getComputedStyle(win);
            currentLeft = parseFloat(comp.left) || 0;
            currentTop = parseFloat(comp.top) || 0;
            startX = e.clientX;
            startY = e.clientY;
            win.style.zIndex = '1000';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            win.style.left = (currentLeft + (e.clientX - startX)) + 'px';
            win.style.top = (currentTop + (e.clientY - startY)) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            bar.style.cursor = 'grab';
        });
    });

    // BACK TO TOP
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) btt.classList.add('visible');
            else btt.classList.remove('visible');
        });
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // SPECIAL BUTTONS
    const cvBtn = document.getElementById('btn-view-cv');
    if (cvBtn) cvBtn.addEventListener('click', () => {
        const m = document.getElementById('cv-modal');
        if (m) m.style.display = 'flex';
    });

    const enterBtn = document.getElementById('btn-enter-exp');
    if (enterBtn) enterBtn.addEventListener('click', () => {
        const arc = document.getElementById('archive');
        if (arc) arc.scrollIntoView({ behavior: 'smooth' });
    });
});
