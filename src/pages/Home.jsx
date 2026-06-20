import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';
import './Home.css';

const FRAME_COUNT = 356;

const Home = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const lastFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  const treatments = [
    "Headaches", "Constipation", "Diarrhoea", "Intestinal Parasites / Worms",
    "Irritable Bowel Syndrome", "Hemorrhoids / Piles", "Colitis", "Menstrual Problems",
    "Enlarged Prostrate", "Detoxification", "Fluid Retention", "Poor Concentration",
    "Lethargy", "Chronic Fatigue", "Hypertension / Stress", "Insomnia", "Asthma",
    "Arthritis", "Back Pain / Joint Pain", "Allergies / Skin Rashes"
  ];

  // Stable drawFrame using refs only — no state dependencies
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const imgs = imagesRef.current;

    if (!canvas || !ctx || !imgs || !imgs[index]) return;

    let drawIndex = index;
    let img = imgs[drawIndex];

    // Fallback algorithm: if requested frame isn't loaded yet, find the nearest loaded frame below it
    while (drawIndex >= 0 && (!img || !img.complete || img.naturalWidth === 0)) {
      drawIndex--;
      img = imgs[drawIndex];
    }
    
    // If no previous frame is loaded, fallback to the nearest frame above it
    if (!img || !img.complete || img.naturalWidth === 0) {
      drawIndex = index;
      while (drawIndex < FRAME_COUNT && (!img || !img.complete || img.naturalWidth === 0)) {
        drawIndex++;
        img = imgs[drawIndex];
      }
    }

    // Ensure we finally found a valid image before attempting to draw
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    // Skip if same frame — avoid redundant GPU draws
    if (lastFrameRef.current === drawIndex) return;
    lastFrameRef.current = drawIndex;
    
    let targetWidth = canvasSizeRef.current.width;
    let targetHeight = canvasSizeRef.current.height;

    if (targetWidth === 0) {
      targetWidth = img.naturalWidth;
      targetHeight = img.naturalHeight;
    }

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    
    // Object-fit: cover math
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let dw, dh, ox, oy;

    if (canvasRatio > imgRatio) {
      dw = canvas.width;
      dh = canvas.width / imgRatio;
      ox = 0;
      oy = (canvas.height - dh) / 2;
    } else {
      dh = canvas.height;
      dw = canvas.height * imgRatio;
      ox = (canvas.width - dw) / 2;
      oy = 0;
    }

    // Reset alpha just in case
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  // Preload frames via sequential concurrent loaders to avoid choking the browser queue
  useEffect(() => {
    const loadedImages = new Array(FRAME_COUNT);
    imagesRef.current = loadedImages;
    let currentIndex = 2; // Start from frame 2, frame 1 is loaded manually first

    const loadNext = () => {
      // Find next unloaded index
      let targetIndex = -1;
      while (currentIndex <= FRAME_COUNT) {
        if (!loadedImages[currentIndex - 1]) {
          targetIndex = currentIndex;
          currentIndex++;
          break;
        }
        currentIndex++;
      }

      if (targetIndex === -1 || targetIndex > FRAME_COUNT) return;

      const img = new Image();
      // Put a placeholder object so other concurrent loops don't grab the same index
      loadedImages[targetIndex - 1] = { complete: false }; 
      
      img.onload = () => {
        loadedImages[targetIndex - 1] = img;
        loadNext();
      };
      img.onerror = () => loadNext();
      img.src = `/frames/frame_${targetIndex.toString().padStart(4, '0')}.jpg`;
    };

    // Load the first frame immediately
    const firstImg = new Image();
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      setLoaded(true);
      
      // Delay the massive background loading slightly so the browser tab stops "spinning"
      // and registers the page as fully loaded immediately.
      setTimeout(() => {
        // Start 4 concurrent sequential loaders
        for (let i = 0; i < 4; i++) {
          loadNext();
        }
      }, 500);
    };
    firstImg.src = `/frames/frame_0001.jpg`;

  }, []);

  // Initialize canvas context once
  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d', { alpha: false });
    }
  }, []);

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded) {
      const rect = canvasRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
      canvasSizeRef.current = {
        width: Math.round(rect.width * dpr),
        height: Math.round(rect.height * dpr)
      };
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // Scroll + resize handler — driven by Lenis for smooth interpolation
  useEffect(() => {
    if (!loaded) return;

    const updateSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasSizeRef.current = {
          width: Math.round(rect.width * dpr),
          height: Math.round(rect.height * dpr)
        };
        lastFrameRef.current = -1; // Force redraw
      }
    };

    const getFrameFromScroll = (scrollY) => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      const fraction = Math.max(0, Math.min(1, scrollY / maxScroll));
      return Math.min(FRAME_COUNT - 1, Math.floor(fraction * FRAME_COUNT)); // Return integer frame
    };

    // Subscribe to Lenis scroll — this fires every rAF with interpolated values
    let lenisUnsubscribe = null;
    const tryConnectLenis = () => {
      if (window.__lenis) {
        lenisUnsubscribe = window.__lenis.on('scroll', (e) => {
          drawFrame(getFrameFromScroll(e.animatedScroll));
        });
        return true;
      }
      return false;
    };

    // Lenis might not be ready yet, retry a few times
    if (!tryConnectLenis()) {
      const retryInterval = setInterval(() => {
        if (tryConnectLenis()) clearInterval(retryInterval);
      }, 100);
      // Safety cleanup
      setTimeout(() => clearInterval(retryInterval), 3000);
    }

    const onResize = () => {
      updateSize();
      drawFrame(getFrameFromScroll(window.scrollY));
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (lenisUnsubscribe && window.__lenis) {
        window.__lenis.off('scroll', lenisUnsubscribe);
      }
      window.removeEventListener('resize', onResize);
    };
  }, [loaded, drawFrame]);

  return (
    <div className="home-page">
      
      {/* Fixed Canvas Background */}
      <div className="video-background-container">
        <canvas ref={canvasRef} className="scroll-video"></canvas>
        <div className="video-overlay"></div>
      </div>

      <div className="home-content-wrapper">
        
        {/* Section 1: Hero — 0–25% */}
        <section className="scroll-section">
          <RevealOnScroll className="hero-content">
            <span className="hero-eyebrow">Ancient Science · Modern Healing</span>
            <h1>We treat the root cause<span>not the symptoms</span></h1>
            <div className="hero-line"></div>
            <p className="hero-subtitle">
              Thousands of years old health science goes hi-tech at Health Shastra.
            </p>
            <Link to="/contact" className="cta-button">Begin Your Journey →</Link>
          </RevealOnScroll>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* Section 2: Philosophy — 25–50% */}
        <section className="scroll-section align-left">
          <RevealOnScroll className="hero-content">
            <span className="hero-eyebrow">Our Philosophy</span>
            <h1>Natural Healing<span>from within</span></h1>
            <div className="hero-line"></div>
            <p className="hero-subtitle">
              Experience the power of advanced holistic therapies to restore your body's natural balance and vitality.
            </p>
          </RevealOnScroll>
        </section>

        {/* Section 3: Approach — 50–75% */}
        <section className="scroll-section align-right">
          <RevealOnScroll className="hero-content">
            <span className="hero-eyebrow">Our Approach</span>
            <h1>Advanced Technology<span>meets ancient wisdom</span></h1>
            <div className="hero-line"></div>
            <p className="hero-subtitle">
              Our therapies are designed for lasting wellness, precisely tailored to your specific needs.
            </p>
          </RevealOnScroll>
        </section>

        {/* Removed Section 4 to allow video to finish smoothly without clutter */}


      </div>

      {/* ── Treatments — standalone section below video ── */}
      <section className="treatments-standalone">
        <div className="treatments-inner">
          <div className="treatments-left">
            <RevealOnScroll>
              <span className="treatments-eyebrow">What We Treat</span>
              <h2 className="treatments-heading">Effective<br />Treatment For</h2>
              <div className="treatments-accent-line"></div>
              <p className="treatments-desc">
                Health Shastra helps people overcome their health problems, without resorting 
                to any form of medication, and without causing any adverse side effects.
              </p>
              <Link to="/contact" className="treatments-cta">Book a Consultation →</Link>
            </RevealOnScroll>
          </div>
          <div className="treatments-right">
            {treatments.map((item, index) => (
              <RevealOnScroll key={index} delay={index * 30} className="treatment-row">
                <span className="treatment-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="treatment-name">{item}</span>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
