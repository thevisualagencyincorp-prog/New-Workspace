/* ✦ THE AGENCY — MOCKUP REPLICATION LOGIC + BOOT SCREEN ✦ */

// LIQUID MOTION ENGINE (PARALLAX + REVEAL)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add a slight delay for staggered siblings if needed
            if (entry.target.hasAttribute('data-stagger')) {
                const delay = entry.target.getAttribute('data-stagger') || 0.1;
                entry.target.style.transitionDelay = `${delay}s`;
            }
        }
    });
}, observerOptions);

// PARALLAX ENGINE
const updateParallax = () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('[data-speed]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0;
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;

        // If it's the main large header, add a slight tilt
        if (el.classList.contains('halftone-text') && Math.abs(speed) > 0.1) {
            const rot = scrollY * 0.01 * speed;
            el.style.transform += ` rotate(${rot}deg)`;
        }
    });
};

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateParallax);
});

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
    topEl.textContent = `VOL. 1 // ISSUE: 001 // BAKERSFIELD, CA // LIMITED EDITION`;
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
        let currentX = 0;
        let targetX = 0;
        const lerp = 0.08; // Smooth factor

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
                targetX = totalProgress * maxTranslate;

                // Lerp for liquid feel
                currentX += (targetX - currentX) * lerp;

                horizontalTrack.style.transform = `translate3d(-${currentX}px, 0, 0)`;

                // Update Progress Indicator
                const progressEl = document.getElementById('horizontal-progress');
                if (progressEl) {
                    progressEl.style.width = `${totalProgress * 100}%`;
                }
            }
            requestAnimationFrame(updateHorizontal);
        };
        updateHorizontal();
    }

    // INTERACTIVE ORACLE (CRYSTAL BALL)
    const oracleVisual = document.getElementById('oracleVisual');
    const fortunesListBlock = document.getElementById('fortunesList');
    const card = document.getElementById('physicalCard');
    const oracleOverlayArr = document.querySelectorAll('.oracle-overlay');
    const oracleOverlay = document.getElementById('oracleOverlay');
    const cardText = document.getElementById('cardFortuneText');
    const cardSerial = document.getElementById('cardSerial');
    const closeCard = document.getElementById('closeCard');
    const oracleStatus = document.getElementById('oracleStatusText');

    if (oracleVisual && fortunesListBlock) {
        const fortuneSpans = fortunesListBlock.querySelectorAll('span');
        oracleVisual.addEventListener('click', () => {
            // New Visual Feedback
            if (oracleStatus) oracleStatus.textContent = "[ GAZING INTO THE ORB... ]";
            oracleVisual.style.filter = "brightness(1.5) drop-shadow(0 0 50px rgba(255,100,0,0.8))";

            setTimeout(() => {
                if (card && oracleOverlay && cardText && fortuneSpans.length > 0) {
                    const randomIndex = Math.floor(Math.random() * fortuneSpans.length);
                    const fortune = fortuneSpans[randomIndex].getAttribute('data-fortune');
                    cardText.textContent = fortune;
                    cardSerial.textContent = `#${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;

                    if (oracleStatus) {
                        oracleStatus.textContent = "[ FORTUNE REVEALED ]";
                        oracleStatus.style.color = "var(--pop-lime)";
                    }

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
                    oracleVisual.style.filter = "drop-shadow(0 0 30px rgba(255,100,0,0.3))";
                }
            }, 1500);
        });
    }

    if (closeCard) {
        closeCard.addEventListener('click', () => {
            if (card) card.classList.remove('active');
            if (oracleOverlay) oracleOverlay.classList.remove('active');
            if (oracleStatus) {
                oracleStatus.textContent = "[ GAZE INTO THE ORB ]";
                oracleStatus.style.color = "";
            }
        });
    }

    if (oracleOverlay) oracleOverlay.addEventListener('click', () => {
        if (card) card.classList.remove('active');
        oracleOverlay.classList.remove('active');
        if (oracleStatus) {
            oracleStatus.textContent = "[ GAZE INTO THE ORB ]";
            oracleStatus.style.color = "";
        }
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

    // GLOBAL RETRO CLOSE HANDLER
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-retro-close')) {
            const btn = e.target.closest('.btn-retro-close');
            // Check if it's meant to close a modal/window
            const modal = btn.closest('#cv-modal, #collection-modal, #vibe-check-modal, #welcome-doc-modal, .desktop-folder-content, .oracle-card-wrap');
            if (modal) {
                if (modal.id === 'cv-modal' || modal.id === 'collection-modal') {
                    modal.style.display = 'none';
                } else {
                    modal.classList.remove('active');
                    if (modal.classList.contains('desktop-folder-content')) {
                        document.body.style.overflow = '';
                        if (caseOverlay) caseOverlay.classList.remove('active');
                    }
                }
            }
        }
    });

    // HOROSCOPE ENGINE
    const horoscopeCards = document.querySelectorAll('.horoscope-card');
    const readingTitle = document.getElementById('currentSignTitle');
    const readingText = document.getElementById('currentReadingText');
    const luckyNumEl = document.getElementById('luckyNum');

    const readings = {
        aries: "PIONEER THE MARKET. YOUR BRANDING NEEDS MORE FIRE TO COMMAND ATTENTION. ABUNDANCE IS LOCKED BEHIND YOUR FEAR OF INNOVATION.",
        taurus: "STABILITY THROUGH LUXURY. YOUR PHYSICAL ASSETS AND DIGITAL PRESENCE MUST REFLECT THE ELITE VALUE YOU PROVIDE. INVEST IN QUALITY.",
        gemini: "MULTIPLY YOUR VOICES. ONE BRAND IS NOT ENOUGH; YOU NEED A SYMPHONY. SYNC YOUR SOCIALS AND WATCH THE DOMINANCE UNFOLD.",
        cancer: "PROTECT THE VISION. YOUR INTUITION IS YOUR BEST STRATEGY. BUILD A BRAND THAT FEELS LIKE A FORTRESS FOR YOUR CLIENTS.",
        leo: "THE STAGE IS YOURS. COMMAND THE SPOTLIGHT WITH RADIANT CONTENT. SHYNESS IS FOR THOSE WHO DON'T WANT TO LEAD.",
        virgo: "PRECISION IN EVERY PIXEL. YOUR ATTENTION TO DETAIL IS YOUR COMPETITIVE EDGE. OPTIMIZE THE INFRASTRUCTURE FOR MAXIMUM SCALE.",
        libra: "BALANCE THE VIBE. HARMONY BETWEEN STRATEGY AND AESTHETICS WILL CREATE IRRESISTIBLE MAGNETISM. LEVELLING UP NOW.",
        scorpio: "INTENSE TRANSFORMATION. SHED THE OLD BRAND IDENTITY. RADIATE POWER THROUGH REBIRTH AND REFINED PSYCHOLOGY.",
        sagittarius: "EXPAND THE HORIZON. YOUR TARGET MARKET IS GLOBAL. BREAK THE GEOGRAPHIC BARRIERS WITH ELITE DIGITAL SYSTEMS.",
        capricorn: "MASTER THE PEAK. YOU ARE AT THE TOP OF THE HIERARCHY. ACT LIKE THE INDUSTRY ICON YOU ARE BECOMING.",
        aquarius: "REVOLUTIONIZE THE NORM. YOUR UNIQUE QUIRKS ARE YOUR STRONGEST BRAND ASSETS. DISRUPT THE TRADITIONAL PATHWAY.",
        pisces: "DREAM IN DIGITAL. YOUR VISION IS BEYOND THE PHYSICAL. MANIFEST YOUR BRAND GOALS THROUGH ELITE STORYTELLING."
    };

    horoscopeCards.forEach(card => {
        card.addEventListener('click', () => {
            horoscopeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const sign = card.getAttribute('data-sign');
            if (readingTitle) readingTitle.textContent = sign.charAt(0).toUpperCase() + sign.slice(1) + ".";
            if (readingText) readingText.textContent = readings[sign] || "STAY TUNED FOR YOUR ELITE TRANSFORMATION.";
            if (luckyNumEl) luckyNumEl.textContent = Math.floor(Math.random() * 99) + 1;
        });
    });

    // COLLECTION MODAL ENGINE
    const collectionTriggers = document.querySelectorAll('.collection-card-trigger');
    const collectionModal = document.getElementById('collection-modal');
    const collectionContent = document.getElementById('collection-modal-content');

    collectionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const h3 = trigger.querySelector('h3').textContent;
            const img = trigger.querySelector('img').src;
            const p = trigger.querySelector('.mono-label').innerText;

            if (collectionContent) {
                collectionContent.innerHTML = `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; align-items: start;">
                        <div>
                            <img src="${img}" style="width: 100%; border: 1px solid #333; margin-bottom: 20px;">
                            <h2 class="halftone-text" style="color: var(--pop-lime); font-size: 3rem; line-height: 1;">${h3}</h2>
                        </div>
                        <div>
                            <p class="mono-label" style="font-size: 1.1rem; line-height: 1.6; color: #ccc; text-transform:none;">${p}</p>
                            <div style="margin-top: 30px; padding: 20px; border: 1px dashed var(--pop-lime); font-family: var(--font-mono); font-size: 0.8rem;">
                                <b style="color: var(--pop-lime); text-transform:uppercase;">THE AGENCY ADVANTAGE:</b><br><br>
                                - Elite Strategy Workshop (Psychology Focus)<br>
                                - Custom Identity & Visual Architecture<br>
                                - Full Technical Deployment & QA<br>
                                - 30 Days of Strategic Support Post-Launch<br><br>
                                <a href="#contact-brief" onclick="document.getElementById('collection-modal').style.display='none';" style="display: block; width: 100%; text-align: center; background: var(--pop-lime); color: #000; padding: 15px; text-decoration: none; font-weight: bold;">SECURE YOUR POSITION &rarr;</a>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (collectionModal) collectionModal.style.display = 'flex';
        });
    });

    // FRANK (POCKET BESTIE) ENGINE
    const frankTalk = document.getElementById('icon-talk');
    const frankStats = document.getElementById('icon-stats');
    const frankPopup = document.getElementById('frank-popup');
    const frankImg = document.getElementById('frank-img');

    const frankDialogues = [
        "SYSTEM_CHECK: 100% OPTIMIZED.",
        "WOULD YOU LIKE ME TO SCAN YOUR CURRENT BRAND DNA?",
        "I HAVE CALCULATED YOUR SUCCESS PROBABILITY: INEVITABLE.",
        "ERROR: COMPETITION NOT FOUND. THEY MUST BE TOO SLOW.",
        "REMEMBER: AESTHETICS ARE THE NEW CURRENCY."
    ];

    if (frankTalk) {
        frankTalk.addEventListener('click', () => {
            if (frankPopup) {
                const diag = frankDialogues[Math.floor(Math.random() * frankDialogues.length)];
                frankPopup.textContent = diag;
                frankPopup.style.display = 'block';
                frankPopup.style.color = "var(--pop-lime)";
                if (frankImg) frankImg.style.transform = "scale(1.1) rotate(5deg)";
                setTimeout(() => {
                    if (frankImg) frankImg.style.transform = "none";
                }, 500);
            }
        });
    }

    if (frankStats) {
        frankStats.addEventListener('click', () => {
            if (frankPopup) {
                frankPopup.textContent = "SCANNING_MARKET... ROI_THRESHOLD: MAXIMUM. BRAND_AUTHORITY: ELITE.";
                frankPopup.style.display = 'block';
                frankPopup.style.color = "var(--pop-lime)";
            }
        });
    }

    window.feedFrank = function () {
        const popup = document.getElementById('frank-popup');
        const img = document.getElementById('frank-img');
        if (popup) {
            popup.textContent = "ABUNDANCE_SYNTHESIZED. [+10 HAPPINESS]";
            popup.style.display = 'block';
            popup.style.color = "var(--pop-lime)";
            if (img) img.style.transform = "scale(1.2)";
            setTimeout(() => { if (img) img.style.transform = "none"; }, 500);
        }
    };

    window.petFrank = function () {
        const popup = document.getElementById('frank-popup');
        if (popup) {
            popup.textContent = "AESTHETIC_RESONANCE_DETECTED. <3";
            popup.style.display = 'block';
            popup.style.color = "var(--pop-lime)";
        }
    };

    window.playFrank = function () {
        const popup = document.getElementById('frank-popup');
        if (popup) {
            popup.textContent = "CALCULATING_DOMINANCE... 99.9%.";
            popup.style.display = 'block';
            popup.style.color = "var(--pop-lime)";
        }
    };
    // CLIPPY CLOSE LOGIC
    const clippyClose = document.getElementById('clippy-close-btn');
    const clippyWindow = document.querySelector('.clippy-window');

    if (clippyClose && clippyWindow) {
        clippyClose.addEventListener('click', (e) => {
            e.stopPropagation();
            clippyWindow.style.display = 'none';
        });
    }

    // Handle clippy links
    const clippyLinks = clippyWindow ? clippyWindow.querySelectorAll('a') : [];
    clippyLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (clippyWindow) clippyWindow.style.display = 'none';
        });
    });

    // CV MODAL LOGIC
    const closeCV = document.getElementById('closeCV');
    const cvModal = document.getElementById('cv-modal');
    if (closeCV && cvModal) {
        closeCV.addEventListener('click', () => {
            cvModal.style.display = 'none';
        });
    }

    // BSOD GAG LOGIC
    const triggerBsod = document.getElementById('trigger-bsod');
    const bsod = document.getElementById('bsod');

    if (triggerBsod && bsod) {
        triggerBsod.addEventListener('click', (e) => {
            e.preventDefault();
            bsod.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Allow escape by click or key
            const closeBsod = () => {
                bsod.style.display = 'none';
                document.body.style.overflow = '';
                document.removeEventListener('keydown', closeBsodKey);
            };

            const closeBsodKey = (ev) => {
                closeBsod();
            };

            bsod.onclick = closeBsod;
            document.addEventListener('keydown', closeBsodKey, { once: true });
        });
    }
});
