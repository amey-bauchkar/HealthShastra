// src/components/TherapyDetail.jsx
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { therapyContent } from '../data/therapyContent';
import ColonDiagram from './ColonDiagram';
import './TherapyDetail.css';

const TherapyDetail = () => {
    const { id } = useParams();
    const content = therapyContent[id];
    const revealRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [id]);

    const addRevealRef = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    if (!content) {
        return (
            <div style={{ padding: '10rem 6vw', textAlign: 'center' }}>
                <h1>Coming Soon</h1>
            </div>
        );
    }

    return (
        <div className="therapy-page">
            {/* HERO */}
            <section className="td-hero">
                <div>
                    <span className="td-eyebrow">Healthshastra Therapies</span>
                    <h1 className="td-hero-title">{content.title}</h1>
                    <p className="td-hero-subtitle">{content.subtitle}</p>
                    <a href={`#${content.faq.href.replace('#', '')}`} className="td-hero-cta">
                        Read the FAQs
                    </a>
                </div>
                <div className="td-hero-visual">
                    <ColonDiagram />
                </div>
            </section>
            {/* CONTENT + COLON IMAGE */}
            <section className="td-content-wrap td-reveal" ref={addRevealRef}>
                <div className="td-colon-image-col">
                    <div className="td-colon-image-card">
                        <svg viewBox="0 0 340 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', background: '#f7f5f0', display: 'block', padding: '1.5rem' }}>
                            {/* Colon outline */}
                            <path d="M80,310 L80,100 Q80,60 120,60 L220,60 Q260,60 260,100 L260,240 Q260,280 220,290 L150,295 Q120,298 110,320 L105,340" fill="none" stroke="#c8834a" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                            <path d="M80,310 L80,100 Q80,60 120,60 L220,60 Q260,60 260,100 L260,240 Q260,280 220,290 L150,295 Q120,298 110,320 L105,340" fill="none" stroke="#c8834a" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />

                            {/* Region labels */}
                            {/* Ascending */}
                            <circle cx="80" cy="200" r="5" fill="#1e3a34" />
                            <line x1="80" y1="200" x2="30" y2="200" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="26" y="196" fontSize="10" fill="#1e3a34" textAnchor="end" fontFamily="Georgia, serif">Ascending</text>
                            <text x="26" y="208" fontSize="10" fill="#1e3a34" textAnchor="end" fontFamily="Georgia, serif">Colon</text>

                            {/* Transverse */}
                            <circle cx="170" cy="60" r="5" fill="#1e3a34" />
                            <line x1="170" y1="60" x2="170" y2="30" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="170" y="24" fontSize="10" fill="#1e3a34" textAnchor="middle" fontFamily="Georgia, serif">Transverse Colon</text>

                            {/* Descending */}
                            <circle cx="260" cy="170" r="5" fill="#1e3a34" />
                            <line x1="260" y1="170" x2="310" y2="170" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="314" y="167" fontSize="10" fill="#1e3a34" textAnchor="start" fontFamily="Georgia, serif">Descending</text>
                            <text x="314" y="179" fontSize="10" fill="#1e3a34" textAnchor="start" fontFamily="Georgia, serif">Colon</text>

                            {/* Sigmoid */}
                            <circle cx="185" cy="291" r="5" fill="#1e3a34" />
                            <line x1="185" y1="291" x2="220" y2="318" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="224" y="322" fontSize="10" fill="#1e3a34" textAnchor="start" fontFamily="Georgia, serif">Sigmoid Colon</text>

                            {/* Rectum */}
                            <circle cx="105" cy="335" r="5" fill="#1e3a34" />
                            <line x1="105" y1="335" x2="60" y2="350" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="56" y="354" fontSize="10" fill="#1e3a34" textAnchor="end" fontFamily="Georgia, serif">Rectum</text>

                            {/* Cecum */}
                            <circle cx="80" cy="310" r="5" fill="#1e3a34" />
                            <line x1="80" y1="310" x2="30" y2="330" stroke="#1e3a34" strokeWidth="1" opacity="0.4" />
                            <text x="26" y="334" fontSize="10" fill="#1e3a34" textAnchor="end" fontFamily="Georgia, serif">Cecum</text>
                        </svg>
                        <p className="td-colon-image-caption">Anatomy of the large intestine — key regions labelled</p>
                    </div>
                </div>
                <div className="td-text-col">
                    <span className="td-inline-tag">About the Colon</span>
                    {content.intro.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </section>

            {/* HIGHLIGHT QUOTE */}
            <section className="td-highlight td-reveal" ref={addRevealRef}>
                <span className="td-highlight-mark">&ldquo;</span>
                <blockquote>{content.highlightQuote}</blockquote>
            </section>

            {/* TESTIMONIAL */}
            <section className="td-testimonial-wrap td-reveal" ref={addRevealRef}>
                <div className="td-testimonial">
                    <span className="td-testimonial-icon">&ldquo;</span>
                    <h3>{content.testimonial.heading}</h3>
                    <p>{content.testimonial.body}</p>
                </div>
            </section>

            {/* FAQ CTA */}
            <section id="faq" className="td-faq-cta td-reveal" ref={addRevealRef}>
                <p>Have questions about the process?</p>
                <a href={content.faq.href} className="td-faq-button">
                    {content.faq.label}
                </a>
            </section>
        </div>
    );
};

export default TherapyDetail;