/* ✦ THE AGENCY — MOCKUP REPLICATION LOGIC + BOOT SCREEN ✦ */

// CINEMATIC BOOT LOGIC
window.addEventListener('load', () => {
    // Reset scroll positions
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const pre = document.getElementById('preloader');
    const progress = document.getElementById('bootProgress');
    const status = document.getElementById('bootStatus');
    const logs = document.getElementById('bootLogs');

    if (!pre) return;

    const bootSequence = [
        { progress: 10, status: "INITIALIZING_KERNEL", log: "> CORE v1.0.8 LOADED" },
        { progress: 25, status: "CALIBRATING_AESTHETICS", log: "> LENS_EFFECT: ENABLED" },
        { progress: 40, status: "SCANNING_KERN_COUNTY", log: "> NODE_BFL_045: ACTIVE" },
        { progress: 60, status: "PROTECTION_LAYER_ENGAGED", log: "> ENCRYPTION: SECURE" },
        { progress: 85, status: "SYNCHRONIZING_ABUNDANCE", log: "> ASSETS: OPTIMIZED" },
        { progress: 100, status: "READY_FOR_DEPLOYMENT", log: "> SYSTEM_STABLE: WELCOME" }
    ];

    let step = 0;
    function runNextStep() {
        if (step < bootSequence.length) {
            const current = bootSequence[step];

            // Update UI
            if (progress) progress.style.width = `${current.progress}%`;
            if (status) status.textContent = current.status;

            // Add Log
            if (logs) {
                const logItem = document.createElement('div');
                logItem.textContent = current.log;
                logs.appendChild(logItem);
                if (logs.children.length > 5) logs.removeChild(logs.firstChild);
            }

            step++;
            const delay = 400 + Math.random() * 600;
            setTimeout(runNextStep, delay);
        } else {
            setTimeout(finishPreloader, 800);
        }
    }

    function finishPreloader() {
        pre.classList.add('finish');
        setTimeout(() => pre.remove(), 1200);
    }

    // Start with a small delay for the logo reveal animation
    setTimeout(runNextStep, 500);
});

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // HORIZONTAL SCROLL LOGIC (DESKTOP ONLY — CSS handles mobile stacking)
    const horizontalSection = document.getElementById('horizontal-section');
    const horizontalTrack = document.querySelector('.horizontal-track');

    if (horizontalSection && horizontalTrack) {
        const updateHorizontal = () => {
            // Skip horizontal scroll on mobile — let CSS handle it
            if (window.innerWidth <= 768) {
                horizontalTrack.style.transform = 'none';
                return;
            }

            const rect = horizontalSection.getBoundingClientRect();
            const sectionHeight = horizontalSection.offsetHeight;
            const windowHeight = window.innerHeight;

            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                const totalProgress = Math.abs(rect.top) / (sectionHeight - windowHeight);
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
    const overlay = document.getElementById('oracleOverlay');
    const cardText = document.getElementById('cardFortuneText');
    const cardSerial = document.getElementById('cardSerial');
    const closeCard = document.getElementById('closeCard');

    if (oracleVisual && fortunesListBlock) {
        const fortuneSpans = fortunesListBlock.querySelectorAll('span');

        oracleVisual.addEventListener('click', () => {
            if (card && overlay && cardText && fortuneSpans.length > 0) {
                // Pick a random fortune
                const randomIndex = Math.floor(Math.random() * fortuneSpans.length);
                const fortune = fortuneSpans[randomIndex].getAttribute('data-fortune');

                cardText.textContent = fortune;
                cardSerial.textContent = `#${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;
                card.classList.add('active');
                overlay.classList.add('active');
            }
        });

        // Fun hover effect on the crystal ball
        oracleVisual.addEventListener('mouseenter', () => {
            oracleVisual.style.transform = 'scale(1.05) translateY(-5px)';
            oracleVisual.querySelector('img').style.filter = 'drop-shadow(0 0 80px rgba(255,200,255,1)) contrast(1.2)';
            const label = oracleVisual.querySelector('.mono-label');
            if (label) label.style.color = '#fff';
        });

        oracleVisual.addEventListener('mouseleave', () => {
            oracleVisual.style.transform = 'scale(1) translateY(0)';
            oracleVisual.querySelector('img').style.filter = 'drop-shadow(0 0 50px var(--pop-orange)) contrast(1.1)';
            const label = oracleVisual.querySelector('.mono-label');
            if (label) label.style.color = 'var(--pop-orange)';
        });

        oracleVisual.addEventListener('mousedown', () => {
            oracleVisual.style.transform = 'scale(0.95) translateY(5px)';
            oracleVisual.style.transition = 'all 0.1s ease';
        });

        oracleVisual.addEventListener('mouseup', () => {
            oracleVisual.style.transform = 'scale(1.05) translateY(-5px)';
            oracleVisual.style.transition = 'all 0.3s ease';
        });
    }

    if (closeCard) {
        closeCard.addEventListener('click', () => {
            card.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            card.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // AJAX FORM SUBMISSION (INTELLIGENT)
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    forms.forEach(f => {
        f.addEventListener('submit', (e) => {
            if (f.id === 'agencyBrief') return; // Brief has special logic
            e.preventDefault();
            const btn = f.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "SENDING_SIGNAL...";
            btn.disabled = true;

            const container = f.parentElement;
            const destructMini = container.querySelector('.destruct-mini');

            fetch(f.action, {
                method: 'POST',
                body: new FormData(f),
                headers: { 'Accept': 'application/json' }
            }).then(() => {
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
            }).catch(error => {
                console.error('Signal Failure:', error);
                btn.textContent = "SIGNAL_ERROR";
                btn.disabled = false;
            });
        });
    });

    function startMiniDestruct(el, form) {
        let count = 5;
        const timer = el.querySelector('.timer-mini');
        const btn = form.querySelector('button');
        if (timer) timer.textContent = count;
        const countdown = setInterval(() => {
            count--;
            if (timer) timer.textContent = count;
            if (count <= 0) {
                clearInterval(countdown);
                el.style.display = "none";
                form.style.display = "block";
                form.reset();
                if (btn) {
                    btn.textContent = "SIGNAL_SENT_✓";
                    btn.disabled = false;
                    setTimeout(() => {
                        btn.textContent = btn.getAttribute('data-original') || btn.textContent;
                    }, 3000);
                }
            }
        }, 1000);
    }

    // BRIEF FORM HANDLER + SELF DESTRUCT
    const briefForm = document.getElementById('agencyBrief');
    const destructMsg = document.getElementById('selfDestructMsg');
    const timerDisplay = document.getElementById('destructTimer');

    if (briefForm && destructMsg) {
        briefForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = briefForm.querySelector('button');
            btn.textContent = "DRAFING_BRIEF...";

            fetch(briefForm.action, {
                method: 'POST',
                body: new FormData(briefForm),
                headers: { 'Accept': 'application/json' }
            }).then(() => {
                briefForm.style.opacity = "0";
                setTimeout(() => {
                    briefForm.style.display = "none";
                    destructMsg.style.display = "block";
                    destructMsg.style.opacity = "1";
                    startDestructSequence();
                }, 500);
            });
        });
    }

    function startDestructSequence() {
        let count = 5;
        if (timerDisplay) timerDisplay.textContent = count;
        const countdown = setInterval(() => {
            count--;
            if (timerDisplay) timerDisplay.textContent = count;
            if (count <= 0) {
                clearInterval(countdown);
                destructMsg.style.opacity = "0";
                setTimeout(() => {
                    destructMsg.style.display = "none";
                    briefForm.style.display = "block";
                    setTimeout(() => {
                        briefForm.reset();
                        briefForm.style.opacity = "1";
                    }, 50);
                }, 500);
            }
        }, 1000);
    }
    // INTERACTIVE HOROSCOPES SELECTION
    const horoscopeCards = document.querySelectorAll('.horoscope-card');
    const readingModule = document.getElementById('readingModule');

    const horoscopeData = {
        aries: { title: "Aries", read: "PIONEER THE MARKET. YOUR BRANDING NEEDS MORE FIRE TO COMMAND ATTENTION. ABUNDANCE IS LOCKED BEHIND YOUR FEAR OF INNOVATION.", lucky: "09", animal: "DRAGON", vibe: "HIGH PRECISION" },
        taurus: { title: "Taurus", read: "STABILITY IS THE NEW ELITE. BUILD ARCHITECTURES THAT LAST A DECADE. THE UNIVERSE REWARDS THE PATIENT STRATEGIST.", lucky: "06", animal: "OX", vibe: "SYSTEM STABLE" },
        gemini: { title: "Gemini", read: "MULTIFACETED BRANDING THRIVES IN THE NOISE. ADAPT OR FADE. YOUR DUALITY IS YOUR STRONGEST ASSET THIS WEEK.", lucky: "05", animal: "MONKEY", vibe: "FLUID LOGIC" },
        cancer: { title: "Cancer", read: "DEEP EMOTIONAL CONNECTION WINS THE MARKET. TARGET THE HEART. PROTECT YOUR ENERGY WHILE YOU SCALE.", lucky: "02", animal: "PIG", vibe: "EMPATH ARCH" },
        leo: { title: "Leo", read: "LUXURY IS YOUR DESTINY. COMMAND THE ROOM WITH BOLD VISUAL ASSETS. THE SPOTLIGHT IS ALREADY WARMED UP FOR YOU.", lucky: "01", animal: "TIGER", vibe: "ALPHA FOCUS" },
        virgo: { title: "Virgo", read: "PRECISION IS POWER. YOUR SYSTEM NEEDS AN AUDIT BEFORE THE SCALE. ELITE DETAIL WILL BE YOUR DIFFERENTIATOR.", lucky: "03", animal: "RABBIT", vibe: "ELITE DETAIL" },
        libra: { title: "Libra", read: "BALANCE YOUR AESTHETIC WITH RAW CONVERSION POWER. SYMMETRY IS KEY. COLLABORATION BRINGS UNEXPECTED ABUNDANCE.", lucky: "07", animal: "HORSE", vibe: "HARMONIC ROI" },
        scorpio: { title: "Scorpio", read: "INTENSITY BREEDS LOYALTY. DIVE DEEPER INTO CONSUMER PSYCHOLOGY. YOUR SECRETS ARE YOUR STRATEGIC ADVANTAGE.", lucky: "04", animal: "SNAKE", vibe: "SHADOW WORK" },
        sagittarius: { title: "Sagittarius", read: "SCALE GLOBALLY. YOUR CURRENT DIGITAL UX IS TOO LOCAL FOR YOUR AMBITION. EXPLORE NEW FRONTIERS IN YOUR AD COPY.", lucky: "08", animal: "RAT", vibe: "GLOBAL REACH" },
        capricorn: { title: "Capricorn", read: "THE VIEW IS BEST FROM THE TOP. STRATEGIZE FOR THE LONG HORIZON. YOUR AMBITION IS THE ONLY FUEL YOU NEED.", lucky: "00", animal: "ROOSTER", vibe: "ZENITH GOALS" },
        aquarius: { title: "Aquarius", read: "THE FUTURE IS NOW. BREAK THE TRADITIONAL RULES OF YOUR INDUSTRY. RADICAL AUTHENTICITY IS YOUR CURRENT SIGNAL.", lucky: "11", animal: "DOG", vibe: "NEO VISION" },
        pisces: { title: "Pisces", read: "ABUNDANCE COINCIDES WITH CLARITY. CLEAN YOUR DIGITAL LENS. TRUST THE INTUITION OF YOUR BRAND IDENTITY.", lucky: "22", animal: "CAT", vibe: "VIVID DREAM" }
    };

    horoscopeCards.forEach(card => {
        card.addEventListener('click', () => {
            const sign = card.dataset.sign;
            const data = horoscopeData[sign];

            horoscopeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            if (readingModule && data) {
                readingModule.style.opacity = "0";
                setTimeout(() => {
                    document.getElementById('currentSignTitle').textContent = data.title + ".";
                    document.getElementById('currentReadingText').textContent = data.read;
                    document.getElementById('luckyNum').textContent = data.lucky;
                    document.getElementById('animalSign').textContent = data.animal;
                    document.getElementById('vibeCheck').textContent = data.vibe;
                    readingModule.style.opacity = "1";
                }, 300);
            }
        });
    });
    // FLOATING MOMENTS (MOUSE FOLLOW)
    const floatingMoments = document.querySelectorAll('.floating-moment');
    window.addEventListener('mousemove', (e) => {
        floatingMoments.forEach((moment, idx) => {
            const speed = (idx + 1) * 0.015;
            const x = (window.innerWidth / 2 - e.pageX) * speed;
            const y = (window.innerHeight / 2 - e.pageY) * speed;
            moment.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
        });
    });

    // SCROLL PARALLAX LOGIC
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    // Store original intrinsic rotations/transforms so the parallax doesn't overwrite them
    parallaxLayers.forEach(layer => {
        layer.dataset.origTransform = layer.style.transform || '';
    });

    const runParallaxOffsets = () => {
        const windowHeight = window.innerHeight;
        parallaxLayers.forEach(layer => {
            if (!layer.classList.contains('parallax-layer')) return;
            const speed = parseFloat(layer.getAttribute('data-speed') || 0.1);

            // Anchor to parent so the calculation remains consistent across the page
            const parent = layer.parentElement;
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            const distance = (rect.top + rect.height / 2) - (windowHeight / 2);
            const yPos = distance * -speed;

            // Re-apply original rotations perfectly synced with the dynamic scroll Y
            layer.style.transform = `${layer.dataset.origTransform} translateY(${yPos}px)`;
        });
    };

    // Initialize parallax offsets immediately so they don't 'jump' on first scroll
    runParallaxOffsets();
    window.addEventListener('scroll', runParallaxOffsets);

    // SOCIAL PROOF TOAST LOGIC
    const toast = document.getElementById('socialToast');
    const toastContent = document.getElementById('toastContent');
    const names = ['JESSICA_M.', 'DEREK_S.', 'AMANDA_R.', 'CARLOS_V.', 'KRISTEN_L.', 'TYLER_B.', 'NATALIE_A.'];
    const actions = [
        'RESERVED A CREATIVE FEATURE',
        'LAUNCHED A CURATED BRAND IDENTITY',
        'SECURED AN EDITORIAL PHOTOSHOOT',
        'SUBMITTED A STRATEGIC BRIEF',
        'JOINED THE MASTERCLASS DISPATCH',
        'CALIBRATED THEIR DIGITAL ASSETS'
    ];
    const locations = ['IN BAKERSFIELD', 'IN TEHACHAPI', 'IN KERN COUNTY', 'IN LOS ANGELES', 'IN THE CENTRAL VALLEY'];

    function showNotification() {
        if (!toast) return;
        const randName = names[Math.floor(Math.random() * names.length)];
        const randAction = actions[Math.floor(Math.random() * actions.length)];
        const randLoc = locations[Math.floor(Math.random() * locations.length)];
        toastContent.innerHTML = `<b>${randName}</b> ${randAction} ${randLoc}.`;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);
    }

    setTimeout(() => {
        setInterval(showNotification, 45000);
        showNotification();
    }, 25000);

    // DRAGGABLE AND CLOSABLE RETRO WINDOWS
    const titleBars = document.querySelectorAll('div[style*="background: darkblue;"], div[style*="background: darkgreen;"], div[style*="background: darkred;"], div[style*="background: #a00;"], div[style*="background: var(--pop-green);"]');

    titleBars.forEach(bar => {
        // Ensure it looks like a window title bar (has color white)
        if (!bar.style.color.includes('white')) return;
        const win = bar.parentElement;

        // Skip Frank's interactive pet window and the Oracle ball — those need to stay open
        if (win.closest('#frank-window') || win.id === 'frank-window' || win.id === 'oracleVisual') return;

        // Helper: fade the window out
        function closeWindow() {
            win.style.transition = 'opacity 0.25s ease';
            win.style.opacity = '0';
            setTimeout(() => win.style.display = 'none', 250);
        }

        // Find close buttons (spans with cursor: pointer or X or _ etc)
        const spans = bar.querySelectorAll('span');
        const closeBtn = spans[spans.length - 1]; // typically the last span is the controls container

        if (closeBtn) {
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeWindow();
            });
        }

        // Also make extra inner buttons close the window (like "Cancel", "IGNORE", "Accept Fate")
        const buttons = win.querySelectorAll('button');
        buttons.forEach(btn => {
            const text = btn.textContent.trim().toUpperCase();
            if (['YES', 'NO', 'CANCEL', 'IGNORE', 'ACCEPT FATE', 'OK', "I'M READY", "NOT YET", "ACCEPT OUR STRATEGY"].includes(text)) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeWindow();
                });
            }
        });

        // CLICK ANYWHERE ON THE WINDOW BODY TO DISMISS
        // Skip if clicking on something interactive (links, form fields, buttons, title bar)
        win.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') ||
                e.target.closest('select') || e.target.closest('textarea') || e.target.closest('label') ||
                e.target.closest('summary') || e.target.closest('details')) return;      // let interactive elements do their thing
            if (bar.contains(e.target)) return;             // title bar is for dragging, not closing
            if (e.target.closest('form')) return;           // don't close over form areas
            closeWindow();
        });

        // Show a pointer cursor on the window body so it's obvious it's clickable
        win.style.cursor = 'pointer';
        // But restore default cursor over interactive elements so it doesn't look wrong
        win.querySelectorAll('a, button, input, select, textarea').forEach(el => {
            el.style.cursor = '';
        });

        // DRAGGING LOGIC
        bar.style.cursor = 'grab';
        win.style.cursor = 'default'; // override pointer for the draggable bar's parent

        let isDragging = false;
        let startX, startY;
        let dragMoved = false;
        let currentLeft = parseFloat(getComputedStyle(win).left) || 0;
        let currentTop = parseFloat(getComputedStyle(win).top) || 0;

        bar.addEventListener('mousedown', (e) => {
            // Ignore if clicked on close button or other buttons
            if (e.target.closest('span:last-child') || e.target.tagName === 'BUTTON') return;

            isDragging = true;
            dragMoved = false;
            bar.style.cursor = 'grabbing';
            win.style.transition = 'none';
            // Disable parallax effect on this window so it doesn't fight our dragging
            win.classList.remove('parallax-layer');

            // Force relative or absolute so top/left works
            const compStyle = window.getComputedStyle(win);
            if (compStyle.position === 'static') {
                win.style.position = 'relative';
            }

            // Re-read current position in case window was resized
            currentLeft = parseFloat(compStyle.left) || 0;
            currentTop = parseFloat(compStyle.top) || 0;

            startX = e.clientX;
            startY = e.clientY;

            win.style.zIndex = '1000'; // Bring to front
            e.preventDefault(); // Prevents text selection
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;

            win.style.left = (currentLeft + dx) + 'px';
            win.style.top = (currentTop + dy) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                bar.style.cursor = 'grab';
            }
        });
    });
});

// MAGAZINE HEADER DATE/TIME LOGIC
const clockEl = document.getElementById('magazine-time');
if (clockEl) {
    const updateClock = () => {
        const now = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options).toUpperCase();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        clockEl.textContent = `VOL. 1 // ${dateString} // ${hours}:${minutes} ${ampm}`;
    };
    updateClock();
    setInterval(updateClock, 1000);
}

// GLOBAL CLIPPY POPUP LOGIC (MARKETING PSYCHOLOGY)
// Wait until user scrolls halfway down the page, then pop him up to drive clicks
const globalClippy = document.getElementById('clippy-global-popup');
if (globalClippy) {
    let clippyTriggered = false;
    let clippyDismissTimer = null;
    // Add transform animation transition for the bounce
    globalClippy.style.transition = 'bottom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s ease-in-out';

    function dismissClippy() {
        globalClippy.style.bottom = '-500px';
    }

    function startClippyDismissTimer() {
        clearTimeout(clippyDismissTimer);
        clippyDismissTimer = setTimeout(dismissClippy, 8000);
    }

    // Hovering resets the timer so it doesn't vanish while being read
    globalClippy.addEventListener('mouseenter', () => clearTimeout(clippyDismissTimer));
    globalClippy.addEventListener('mouseleave', () => startClippyDismissTimer());

    // Touch: reset on tap (mobile)
    globalClippy.addEventListener('touchstart', () => startClippyDismissTimer(), { passive: true });

    window.addEventListener('scroll', () => {
        if (!clippyTriggered) {
            // Trigger when scrolled past the FAQ section
            const filterDiv = document.getElementById('faq-editor');
            const triggerPoint = filterDiv ? filterDiv.offsetTop + (filterDiv.offsetHeight * 0.8) : (document.body.scrollHeight - window.innerHeight) * 0.4;

            const scrollPos = window.scrollY;
            if (scrollPos > triggerPoint) {
                clippyTriggered = true;

                // Hide the static clippy in the FAQ section
                const staticClippy = document.getElementById('static-clippy-container');
                if (staticClippy) staticClippy.style.display = 'none';

                // Pop it up gracefully like the old days
                globalClippy.style.bottom = '2rem';

                // Add a small bouncing wiggle effect using CSS transforms mimicking classic Clippy behavior
                setTimeout(() => {
                    globalClippy.style.transform = 'translateY(-15px) rotate(3deg)';
                    setTimeout(() => {
                        globalClippy.style.transform = 'translateY(5px) rotate(-2deg)';
                        setTimeout(() => {
                            globalClippy.style.transform = 'translateY(0) rotate(0deg)';
                            // Start the auto-dismiss countdown after bounce settles
                            startClippyDismissTimer();
                        }, 250);
                    }, 250);
                }, 800);
            }
        }
    });
}

