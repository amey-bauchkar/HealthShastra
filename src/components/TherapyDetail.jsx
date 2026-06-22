import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { therapyContent } from '../data/therapyContent';
import './TherapyDetail.css';

const TherapyDetail = () => {
    const { id } = useParams();
    const therapyId = id || 'colon'; // Corrected default to 'colon' to match data
    const content = therapyContent[therapyId];

    // Images generated specifically for each section of Colon Hydrotherapy
    const sectionImages = [
        "/purification_philosophy_1782133711661.png",
        "/accumulation_release_1782133728736.png",
        "/hydrotherapy_process_1782133741608.png"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);

        // Simple scroll reveal animation for the new blocks
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

        const elements = document.querySelectorAll('.block-reveal');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, [therapyId]);

    if (!content) return <div>Therapy not found</div>;

    return (
        <div className="editorial-page terra-theme">
            
            {/* HERO SECTION */}
            <section className="editorial-hero">
                <div className="hero-text-layer">
                    <span className="eyebrow">Health Shastra Therapies</span>
                    <h1 className="title">
                        {content.title.split(' | ').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}<br/>
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="subtitle">{content.subtitle}</p>
                </div>
                
                <div className="hero-image-layer">
                    {content.heroImage && (
                        <img 
                            src={content.heroImage} 
                            alt={content.title} 
                            className="organic-hero-img" 
                        />
                    )}
                </div>
            </section>

            {/* ALTERNATING EDITORIAL BLOCKS */}
            {content.structuredSections && (
                <section className="editorial-blocks-container">
                    <div className="massive-watermark">S U D D H I</div>
                    
                    {content.structuredSections.map((section, index) => {
                        const isEven = index % 2 !== 0; // 0, 2 are odd visually, 1 is even

                        return (
                            <div key={index} className={`editorial-block block-reveal ${isEven ? 'reverse' : ''}`}>
                                
                                <div className="block-visual">
                                    {section.imageSrc && (
                                        <div className="framed-image-container">
                                            <img src={section.imageSrc} alt={section.title} className="framed-img" />
                                        </div>
                                    )}
                                </div>

                                <div className="block-content">
                                    <span className="block-number">0{index + 1}</span>
                                    <h2 className="block-title">{section.title}</h2>
                                    <div className="block-text">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                        );
                    })}
                </section>
            )}

            {/* TESTIMONIAL & QUOTE */}
            {content.testimonial && (
                <section className="editorial-blocks-container" style={{paddingTop: 0}}>
                    <div className={`editorial-block block-reveal ${content.testimonial.imageSrc ? 'reverse' : ''}`}>
                        
                        {content.testimonial.imageSrc && (
                            <div className="block-visual">
                                <div className="framed-image-container">
                                    <img src={content.testimonial.imageSrc} alt="Testimonial Imagery" className="framed-img" />
                                </div>
                            </div>
                        )}

                        <div className="block-content" style={!content.testimonial.imageSrc ? {maxWidth: '800px', margin: '0 auto', textAlign: 'center'} : {}}>
                            <span style={{fontSize: '5rem', color: '#c96b42', fontFamily: 'var(--font-display)', lineHeight: 0}}>&#8220;</span>
                            <h3 className="block-title" style={{fontSize: '2.5rem', marginTop: '1rem'}}>{content.testimonial.heading}</h3>
                            <p style={{fontSize: '1.25rem', lineHeight: '1.9', color: 'rgba(232, 220, 202, 0.85)'}}>
                                {content.testimonial.body}
                            </p>
                        </div>

                    </div>
                </section>
            )}

            {/* BOTTOM NAV */}
            <section className="editorial-footer">
                <Link to="/" className="terra-btn">
                    <span className="btn-text">Return to Sanctuary</span>
                    <div className="btn-bg"></div>
                </Link>
            </section>
        </div>
    );
};

export default TherapyDetail;