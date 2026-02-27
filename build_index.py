import re
import os

with open("index.html", "r") as f:
    text = f.read()

head_match = re.search(r'(.*?)(<main id="main-content">)(\s*<!-- AI_CONTEXT_BLOCK.*?</div>\s*)', text, re.DOTALL)
tail_match = re.search(r'(<!-- SECTION 15: ELITE COMMAND CENTER.*?)(</main>.*)', text, re.DOTALL)

if head_match and tail_match:
    head = head_match.group(1)
    main_opening = head_match.group(2)
    ai_context = head_match.group(3)
    footer = tail_match.group(1)
    tail = tail_match.group(2)
else:
    print("Could not match exactly")
    exit(1)

# Modify head to include specific SEO fixes
# Performance + SEO checklist: Image optimization (AVIF/WebP + lazy load), defer embeds, meta tags etc.
# But we can just build the new main content string here

new_hero = """
    <!-- NEW SECTION 01: EASY MODE HERO -->
    <section class="hero-section" id="hero"
      style="padding: 0; min-height: 100vh; display: flex; flex-direction: column; background: #000; color: #fff; position: relative; overflow: hidden;">

      <div class="video-bg-container" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0;">
        <video autoplay muted loop playsinline poster="images/social_ad.png"
          style="display: block; width: 100%; height: 100%; object-fit: cover; opacity: 0.3;">
          <source src="images/promo copy.mp4" type="video/mp4">
        </video>
        <div class="video-bg-overlay"
          style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%); z-index: 1;">
        </div>
      </div>

      <div class="video-bg-content"
        style="position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; min-height: 100vh; margin: 0;">
        
        <!-- TOP NAV -->
        <header role="banner" aria-label="The Agency — Site Navigation"
          style="padding: 2.5rem 5vw; display: flex; justify-content: space-between; align-items: flex-start; z-index: 10;">
          <a href="#main-content" aria-label="The Agency Homepage" style="text-decoration: none;">
            <div class="halftone-text" style="font-size: clamp(2rem, 4vw, 3rem); color: #fff; line-height: 0.8;">The<br>Agency.</div>
          </a>
          
          <nav style="display: flex; gap: 2rem; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
            <a href="#work" class="mono-label" style="color: #fff; text-decoration: none;">Work</a>
            <a href="#services" class="mono-label" style="color: #fff; text-decoration: none;">Services</a>
            <a href="#about" class="mono-label" style="color: #fff; text-decoration: none;">About</a>
            <a href="experience.html" class="mono-label" style="color: var(--pop-lime); text-decoration: none; border: 1px solid var(--pop-lime); padding: 5px 10px;">Experience</a>
          </nav>
        </header>

        <!-- CENTER CONTENT -->
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem 5vw; max-width: 900px; margin: 0 auto;">
          
          <div class="mono-label blend-difference" style="margin-bottom: 1.5rem; opacity: 0.9; letter-spacing: 0.1rem; color: var(--pop-lime); border: 1px solid var(--pop-lime); padding: 5px 15px; border-radius: 20px;">
            Trusted by Kern County's Top Brands
          </div>
          
          <h1 class="halftone-text pixel-header blend-difference"
            style="color: var(--pop-pink); font-size: clamp(3rem, 8vw, 6rem); line-height: 1.1; margin: 0; text-transform: uppercase;">
            Brand + websites<br>that convert.
          </h1>

          <p class="mono-label blend-difference"
            style="margin-top: 1.5rem; font-size: clamp(1rem, 2vw, 1.2rem); opacity: 0.9; max-width: 600px; line-height: 1.5; color: #fff;">
            We're your business besties—strategy-first, design-obsessed, and fast.
          </p>
          
          <ul style="list-style: none; padding: 0; margin: 1.5rem 0 2.5rem 0; display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; color: rgba(255,255,255,0.8); font-family: var(--font-mono); font-size: 0.9rem;">
            <li><span style="color: var(--pop-lime);">✓</span> Elite Branding</li>
            <li><span style="color: var(--pop-lime);">✓</span> Custom Web & UX</li>
            <li><span style="color: var(--pop-lime);">✓</span> Cinematic Production</li>
          </ul>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
            <a href="#contact-brief" style="background: var(--pop-pink); color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 1rem; padding: 1rem 2.5rem; text-decoration: none; display: inline-block;">
              Book a Consult
            </a>
            <a href="#work" style="background: transparent; color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 1rem; padding: 1rem 2.5rem; text-decoration: none; display: inline-block; border: 2px solid #fff;">
              View Work
            </a>
          </div>
          
          <div style="margin-top: 3rem;">
            <a href="experience.html" class="mono-label" style="color: var(--pop-lime); opacity: 0.8; text-decoration: underline; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>Enter the Agency OS </span> <span style="font-size: 1.2rem;">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
"""

new_proof = """
    <!-- PROOF STRIP -->
    <div class="marquee-wrap" style="background: var(--pop-lime); border: none; margin-top: 0; border-top: 1px solid #111; border-bottom: 1px solid #111;">
      <div class="marquee-content" style="color: #000; font-weight: 900; font-size: 0.85rem; padding: 10px 0;">
        <span>AS SEEN IN: KERN COUNTY PUBLIC HEALTH ✦ DRIFTWOOD DAIRY ✦ TEHACHAPI VALLEY RECREATION ✦ SAFE NEIGHBORHOODS KERN ✦ KERN COUNTY PUBLIC HEALTH ✦ DRIFTWOOD DAIRY ✦ SAFE NEIGHBORHOODS KERN ✦ </span>
      </div>
    </div>
"""

new_work = """
    <!-- SECTION: FEATURED WORK -->
    <section id="work" style="background: #0d0d0d; color: #fff; padding: 10vh 5vw; border-top: 1px solid #222;">
      <div style="margin-bottom: 3rem;">
        <h2 class="halftone-text" style="color: var(--pop-pink); font-size: clamp(2rem, 5vw, 4rem);">Featured Work.</h2>
        <p class="mono-label" style="opacity: 0.6; margin-top: 1rem;">RESULTS-DRIVEN CASE STUDIES</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        
        <!-- Case Study 1 -->
        <div style="background: #1a1a1a; padding: 1.5rem; border: 1px solid #333; display: flex; flex-direction: column;">
          <img src="images/the_loft_ad.png" alt="The Loft Studios branding" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 1rem;" loading="lazy">
          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--pop-lime); margin-bottom: 0.5rem;">LUXURY INDUSTRIAL VENUE</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem; color: #fff;">The Loft Studios</h3>
          <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem; flex: 1;">Unified brand system across all physical and digital touchpoints for high-end perception.</p>
          <div style="padding-top: 1rem; border-top: 1px solid #333; font-family: var(--font-mono); font-size: 0.8rem; color: var(--pop-pink); margin-bottom: 1rem;">
            + Premium Market Positioning
          </div>
          <a href="#" class="mono-label" style="color: #fff; text-decoration: underline; font-size: 0.8rem;">SEE FULL CASE STUDY →</a>
        </div>

        <!-- Case Study 2 -->
        <div style="background: #1a1a1a; padding: 1.5rem; border: 1px solid #333; display: flex; flex-direction: column;">
          <img src="images/Kern County Parks.jpg" alt="Kern Public Health Web Redesign" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 1rem;" loading="lazy">
          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--pop-lime); margin-bottom: 0.5rem;">PUBLIC HEALTH SECTOR</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem; color: #fff;">Safe Neighborhoods Kern</h3>
          <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem; flex: 1;">Strategic web app redesign reducing bounce rates and improving access to community resources.</p>
          <div style="padding-top: 1rem; border-top: 1px solid #333; font-family: var(--font-mono); font-size: 0.8rem; color: var(--pop-pink); margin-bottom: 1rem;">
            + Cut bounce rate by 34%
          </div>
          <a href="#" class="mono-label" style="color: #fff; text-decoration: underline; font-size: 0.8rem;">SEE FULL CASE STUDY →</a>
        </div>
        
        <!-- Case Study 3 -->
        <div style="background: #1a1a1a; padding: 1.5rem; border: 1px solid #333; display: flex; flex-direction: column;">
          <img src="images/dr_safir_ad.png" alt="Dr Safir Brand Design" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 1rem;" loading="lazy">
          <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--pop-lime); margin-bottom: 0.5rem;">MEDICAL BRANDING</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem; color: #fff;">Dr. Safir Aesthetics</h3>
          <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem; flex: 1;">High-conversion digital architecture for a premier medical practice in Bakersfield.</p>
          <div style="padding-top: 1rem; border-top: 1px solid #333; font-family: var(--font-mono); font-size: 0.8rem; color: var(--pop-pink); margin-bottom: 1rem;">
            + Launched in 21 days
          </div>
          <a href="#" class="mono-label" style="color: #fff; text-decoration: underline; font-size: 0.8rem;">SEE FULL CASE STUDY →</a>
        </div>

      </div>
    </section>
"""

new_services = """
    <!-- SECTION: SERVICES -->
    <section id="services" style="background: #000; color: #fff; padding: 10vh 5vw; border-top: 1px solid #222;">
      <div style="margin-bottom: 3rem;">
        <h2 class="halftone-text" style="color: var(--pop-aqua); font-size: clamp(2rem, 5vw, 4rem);">Core Offerings.</h2>
        <p class="mono-label" style="opacity: 0.6; margin-top: 1rem;">WHAT WE DO BEST</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: #222;">
        
        <div style="background: #0d0d0d; padding: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: #fff; margin-bottom: 1rem;">Branding.</h3>
          <p style="font-size: 0.95rem; opacity: 0.8; line-height: 1.5;">Identity systems that command authority. From naming to visual systems, we build your boldest brand yet.</p>
        </div>

        <div style="background: #0d0d0d; padding: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: #fff; margin-bottom: 1rem;">Web & UX.</h3>
          <p style="font-size: 0.95rem; opacity: 0.8; line-height: 1.5;">Strategic websites & app development. Elite digital architecture & custom code for maximum conversion.</p>
        </div>

        <div style="background: #0d0d0d; padding: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: #fff; margin-bottom: 1rem;">Production.</h3>
          <p style="font-size: 0.95rem; opacity: 0.8; line-height: 1.5;">Cinematic photography and videography. Full-service, in-house content creation.</p>
        </div>

        <div style="background: #0d0d0d; padding: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: #fff; margin-bottom: 1rem;">AI Systems & SEO.</h3>
          <p style="font-size: 0.95rem; opacity: 0.8; line-height: 1.5;">Search Generative Experience tuning and AI content pipelines to secure absolute market authority.</p>
        </div>

      </div>
    </section>
"""

new_process = """
    <!-- SECTION: HOW IT WORKS -->
    <section id="process" style="background: #111; color: #fff; padding: 10vh 5vw; border-top: 1px solid #222;">
      <div style="margin-bottom: 4rem; text-align: center;">
        <h2 class="halftone-text" style="color: var(--pop-lime); font-size: clamp(2rem, 5vw, 4rem);">How it works.</h2>
        <p class="mono-label" style="opacity: 0.6; margin-top: 1rem;">3 STEPS TO DOMINANCE</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px; margin: 0 auto;">
        
        <div style="display: flex; gap: 2rem; align-items: flex-start; border-bottom: 1px solid #333; padding-bottom: 2rem;">
          <span class="halftone-text" style="font-size: 3rem; color: var(--pop-lime); line-height: 1;">01</span>
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem;">The Vibe Check</h3>
            <p style="opacity: 0.8; font-size: 1rem; line-height: 1.5;">We kick off with a strategy call. Aligning our souls and your goals to plot a market takeover.</p>
          </div>
        </div>

        <div style="display: flex; gap: 2rem; align-items: flex-start; border-bottom: 1px solid #333; padding-bottom: 2rem;">
          <span class="halftone-text" style="font-size: 3rem; color: var(--pop-pink); line-height: 1;">02</span>
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem;">The Blueprint</h3>
            <p style="opacity: 0.8; font-size: 1rem; line-height: 1.5;">We dissect market psychology and architect your custom design, messaging, and tech stack.</p>
          </div>
        </div>

        <div style="display: flex; gap: 2rem; align-items: flex-start;">
          <span class="halftone-text" style="font-size: 3rem; color: var(--pop-aqua); line-height: 1;">03</span>
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-style: italic; margin-bottom: 0.5rem;">The Launch</h3>
            <p style="opacity: 0.8; font-size: 1rem; line-height: 1.5;">We build, shoot, code, and execute your strategy. You enter the market fully positioned for growth.</p>
          </div>
        </div>

      </div>
    </section>
"""

new_pricing = """
    <!-- SECTION: PRICING -->
    <section id="pricing" style="background: #000; color: #fff; padding: 10vh 5vw; border-top: 1px solid #222;">
      <div style="margin-bottom: 3rem; text-align: center;">
        <h2 class="halftone-text" style="color: #fff; font-size: clamp(2rem, 5vw, 4rem);">Pricing Guidance.</h2>
        <p class="mono-label" style="opacity: 0.6; margin-top: 1rem;">ELITE VALUE. NO SURPRISES.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
        
        <div style="background: #111; padding: 2.5rem; border: 1px solid #333; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; margin-bottom: 1rem;">Identity & Branding</h3>
          <div class="mono-label" style="color: var(--pop-lime); font-size: 1.5rem; margin-bottom: 1.5rem;">Starts at $2,500</div>
          <p style="opacity: 0.8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Brand architecture, logo suites, and comprehensive style guides.</p>
          <a href="#contact-brief" class="mono-label" style="color: #fff; border: 1px solid #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">GET QUOTE</a>
        </div>

        <div style="background: #111; padding: 2.5rem; border: 1px solid var(--pop-pink); text-align: center; position: relative;">
          <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--pop-pink); color: #fff; font-family: var(--font-mono); font-size: 0.7rem; padding: 4px 10px; font-weight: bold;">MOST POPULAR</div>
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; margin-bottom: 1rem;">Custom Web Systems</h3>
          <div class="mono-label" style="color: var(--pop-pink); font-size: 1.5rem; margin-bottom: 1.5rem;">Typical $6K - $12k</div>
          <p style="opacity: 0.8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Full strategic websites optimized for SEO, speed, and conversion.</p>
          <a href="#contact-brief" class="mono-label" style="background: var(--pop-pink); color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">GET QUOTE</a>
        </div>

        <div style="background: #111; padding: 2.5rem; border: 1px solid #333; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; margin-bottom: 1rem;">Monthly Retainers</h3>
          <div class="mono-label" style="color: var(--pop-aqua); font-size: 1.5rem; margin-bottom: 1.5rem;">From $1,500/mo</div>
          <p style="opacity: 0.8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Ongoing content, production, advertising, and marketing support.</p>
          <a href="#contact-brief" class="mono-label" style="color: #fff; border: 1px solid #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">GET QUOTE</a>
        </div>

      </div>
      
      <div style="text-align: center; margin-top: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        <h4 style="font-family: var(--font-mono); font-size: 0.9rem; color: #fff; margin-bottom: 1rem;">What affects cost?</h4>
        <p style="opacity: 0.6; font-size: 0.85rem; line-height: 1.5;">Complexity of integration, amount of custom assets (video/photo) required, timeframe, and ongoing support needed. Everything is scoped transparently.</p>
      </div>
    </section>
"""

new_about = """
    <!-- SECTION: ABOUT -->
    <section id="about" style="background: #0d0d0d; color: #fff; padding: 10vh 5vw; border-top: 1px solid #222; display: flex; flex-wrap: wrap; gap: 4rem; align-items: center;">
      <div style="flex: 1; min-width: 300px;">
        <h2 class="halftone-text" style="color: var(--pop-lime); font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 1.5rem;">Ash & Brittany</h2>
        <div class="mono-label" style="color: var(--pop-pink); margin-bottom: 1.5rem;">TEHACHAPI // BAKERSFIELD // LA</div>
        <p style="font-size: 1.1rem; line-height: 1.6; opacity: 0.9; margin-bottom: 1.5rem;">
          We’re The Agency™—your business besties and aesthetic engineers. 
          Ash (USAF veteran) & Brittany lead this female veteran-owned creative powerhouse.
        </p>
        <p style="font-size: 1rem; line-height: 1.6; opacity: 0.7; margin-bottom: 2rem;">
          Brand therapy meets unconditional support. We bring a "calm-in-the-chaos" leadership style to every project, helping ambitious ideas stand out and scale strategically.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="border: 1px solid #fff; padding: 5px 10px; font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.8;">SDVOSB CERTIFIED</span>
          <span style="border: 1px solid #fff; padding: 5px 10px; font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.8;">WOSB CERTIFIED</span>
        </div>
      </div>
      <div style="flex: 1; min-width: 300px; text-align: center;">
        <img src="images/ash_and_brittany_portrait.jpg" alt="Ash and Brittany, Founders" style="max-width: 100%; border: 1px solid #333; filter: grayscale(100%);" loading="lazy">
      </div>
    </section>
"""

new_main = f"""
{main_opening}
{ai_context}
{new_hero}
{new_proof}
{new_work}
{new_services}
{new_process}
{new_pricing}
{new_about}
"""

with open("index_new.html", "w") as f:
    f.write(head)
    f.write(new_main)
    f.write(footer)
    f.write(tail)

print("Generated index_new.html")
