import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '', contactNo: '', email: '', subject: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="contact-page">

            {/* ── HERO + CARDS ────────────────────────────────── */}
            <section className="contact-hero">
                <div className="hero-left">
                    <h1 className="contact-title">
                        Begin Your<br />
                        <em>Healing Journey</em>
                    </h1>
                    <p className="contact-subtitle">
                        Every path to wellness begins with a single, considered step.
                        Our consultants are here to listen, understand, and guide you
                        toward the care your body and mind deserve.
                    </p>
                </div>

                <div className="hero-right">
                    <div className="contact-card">
                        <span className="card-icon">✦</span>
                        <h3 className="card-label">Call Us</h3>
                        <p className="card-value">022 – 2436 1775</p>
                        <p className="card-value">+91 98202 26731</p>
                    </div>

                    <div className="contact-card contact-card--featured">
                        <span className="card-icon">✦</span>
                        <h3 className="card-label">Write To Us</h3>
                        <p className="card-value">info@healthshastra.com</p>
                        <a href="mailto:info@healthshastra.com" className="card-cta">Send Email</a>
                    </div>

                    <div className="contact-card">
                        <span className="card-icon">✦</span>
                        <h3 className="card-label">Our Centres</h3>
                        <p className="card-value">Mumbai · Vadodara</p>
                        <p className="card-value">Kodaikanal</p>
                    </div>
                </div>
            </section>

            {/* ── CENTRES + MAP ───────────────────────────────── */}
            <section className="centres-section">
                <div className="centres-inner">
                    <div className="centres-info">
                        <span className="section-eyebrow">Our Locations</span>
                        <h2 className="section-title">Find Us</h2>

                        <div className="centre-item">
                            <h4 className="centre-city">Mumbai</h4>
                            <p>Ahamad Mansion, Kashinath Dhuru Marg,<br />
                                Chandrakant Dhuru Wadi, Prabhadevi<br />
                                Mumbai — 400 028</p>
                            <p className="centre-note">Also at: Opera House</p>
                        </div>

                        <div className="centre-item">
                            <h4 className="centre-city">Vadodara</h4>
                            <p>Contact us for address details.</p>
                        </div>

                        <div className="centre-item">
                            <h4 className="centre-city">Kodaikanal</h4>
                            <p>A health resort with complete<br />Health Shastra treatments.</p>
                        </div>

                        <div className="appointment-notice">
                            <span className="appointment-notice-text">
                                Consultations &amp; Treatment by Prior Appointment Only
                            </span>
                        </div>
                    </div>

                    <div className="centres-map">
                        <div className="map-frame">
                            <iframe
                                title="Health Shastra Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.2!2d72.8345!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced3e4b1f28b%3A0x1!2sHealth+Shastra%2C+Prabhadevi%2C+Mumbai!5e0!3m2!1sen!2sin!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ENQUIRY FORM ────────────────────────────────── */}
            <section className="enquiry-section">
                <div className="enquiry-inner">

                    {/* LEFT COLUMN */}
                    <div className="enquiry-left">
                        <span className="section-eyebrow">Enquire Now</span>
                        <h2 className="enquiry-title">
                            Begin Your<br />
                            <em>Wellness Journey</em>
                        </h2>
                        <p className="enquiry-desc">
                            Fill in your details and one of our wellness consultants
                            will be in touch within 24 hours.
                        </p>

                        <div className="enquiry-testimonials">
                            <div className="enquiry-testimonial">
                                <span className="quote-icon">&ldquo;</span>
                                <p className="testimonial-text">
                                    The care and attention I received completely transformed my approach to wellness. A true sanctuary for body and soul.
                                </p>
                                <p className="testimonial-author">— A Grateful Guest</p>
                            </div>
                            <div className="enquiry-testimonial">
                                <span className="quote-icon">&ldquo;</span>
                                <p className="testimonial-text">
                                    Health Shastra's holistic treatments provided healing I couldn't find anywhere else. The environment is incredibly serene.
                                </p>
                                <p className="testimonial-author">— Wellness Seeker</p>
                            </div>
                        </div>

                    </div>

                    {/* GOLD DIVIDER */}
                    <div className="enquiry-divider" />

                    {/* RIGHT COLUMN — GLASSMORPHIC FORM CARD */}
                    <div className="enquiry-card">
                        {submitted ? (
                            <div className="form-success">
                                <span className="success-icon">✦</span>
                                <h3>Thank you for reaching out.</h3>
                                <p>We will contact you within 24 hours to schedule your consultation.</p>
                                <button className="form-btn" onClick={() => setSubmitted(false)}>
                                    <span>Send Another</span>
                                    <div className="btn-shine" />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row-2col">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="fullName" value={formData.fullName}
                                            onChange={handleChange} placeholder="Your full name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact No.</label>
                                        <input type="tel" name="contactNo" value={formData.contactNo}
                                            onChange={handleChange} placeholder="+91 00000 00000" />
                                    </div>
                                </div>
                                <div className="form-row-2col">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email}
                                            onChange={handleChange} placeholder="you@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input type="text" name="subject" value={formData.subject}
                                            onChange={handleChange} placeholder="e.g. Colon Hydrotherapy" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name="message" rows="5" value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your health goals or questions..." />
                                </div>
                                <div className="form-footer">
                                    <button type="submit" className="form-btn">
                                        <span>Send Enquiry</span>
                                        <div className="btn-shine" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </section>

            {/* ── FOOTER ──────────────────────────────────────── */}
            <section className="contact-page-footer">
                <Link to="/" className="back-btn">
                    <span>Return to Sanctuary</span>
                    <div className="back-btn-bg" />
                </Link>
            </section>

        </div>
    );
};

export default Contact;
