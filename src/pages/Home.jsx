import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';
import './Home.css';

const Home = () => {
  const treatments = [
    "Headaches", "Constipation", "Diarrhoea", "Intestinal Parasites / Worms",
    "Irritable Bowel Syndrome", "Hemorrhoids / Piles", "Colitis", "Menstrual Problems",
    "Enlarged Prostrate", "Detoxification", "Fluid Retention", "Poor Concentration",
    "Lethargy", "Chronic Fatigue", "Hypertension / Stress", "Insomnia", "Asthma",
    "Arthritis", "Back Pain / Joint Pain", "Allergies / Skin Rashes"
  ];

  return (
    <div className="home-page ayurveda-theme">

      {/* ── Ayurvedic Hero Section ── */}
      <section className="ayurveda-hero">

        {/* Prana (Life Force) Mandala Background */}
        <div className="prana-mandala"></div>
        <div className="ayurveda-noise"></div>

        <div className="ayurveda-hero-content">

          <RevealOnScroll className="jharokha-arch">
            <img src="/ayurvedic_wellness_center.png" alt="Ayurvedic Botanical Healing" className="arch-image" />
          </RevealOnScroll>

          <div className="ayurveda-text-content">
            <RevealOnScroll>
              <div className="sanskrit-accent">आयुर्वेद</div>
              <h1 className="ayurveda-title">
                The Science<br />
                <em>of Life</em>
              </h1>

              <div className="ayurveda-divider"></div>

              <p className="ayurveda-subtitle">
                Health Shastra revives the ancient wisdom of Ayurveda, bringing 5,000 years of holistic healing into the modern age. We treat the root cause, balancing your Doshas to restore pure, lasting vitality.
              </p>

              <div className="ayurveda-actions">
                <Link to="/contact" className="ayurveda-btn primary">Begin Healing</Link>

              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* ── Treatments ── */}
      <section className="treatments-standalone">
        <div className="treatments-inner">
          <div className="treatments-left">
            <RevealOnScroll>
              <span className="treatments-eyebrow">The Doshas We Balance</span>
              <h2 className="treatments-heading">Effective<br />Healing For</h2>
              <div className="treatments-accent-line"></div>
              <p className="treatments-desc">
                Health Shastra helps people overcome their health problems, without resorting
                to any form of harsh medication, and without causing any adverse side effects.
                Pure, natural, and profound.
              </p>
              <Link to="/contact" className="treatments-cta">Consult a Vaidya →</Link>
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
