import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">

            <div className="footer-top">

                {/* ── Brand ── */}
                <div className="footer-brand">
                    <img src="/logo.png" alt="Health Shastra" className="footer-logo" />
                    <p className="footer-tagline">
                        Reviving the ancient wisdom of Ayurveda — healing the root cause,
                        restoring lasting vitality.
                    </p>
                    <div className="footer-contact-list">
                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">✦</span>
                            <span>022 – 2436 1775 &nbsp;·&nbsp; +91 98202 26731</span>
                        </div>
                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">✦</span>
                            <span>info@healthshastra.com</span>
                        </div>
                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">✦</span>
                            <span>Prabhadevi, Mumbai — 400 028</span>
                        </div>
                    </div>
                </div>

                {/* ── Therapies ── */}
                <div className="footer-nav">
                    <p className="footer-nav-heading">Therapies</p>
                    <ul className="footer-nav-list">
                        <li><Link to="/therapy/colon">Colon Hydrotherapy</Link></li>
                        <li><Link to="/therapy/qi">QI / IR Therapy</Link></li>
                        <li><Link to="/therapy/detox">Detoxification</Link></li>
                        <li><Link to="/therapy/neuro">Neurodegenerative Diseases</Link></li>
                        <li><Link to="/therapy/thermal">Thermal Therapy</Link></li>
                        <li><Link to="/therapy/ozone">Ozone Therapy</Link></li>
                    </ul>
                </div>

                {/* ── Visit ── */}
                <div className="footer-nav">
                    <p className="footer-nav-heading">Visit Us</p>
                    <ul className="footer-nav-list">
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><a href="mailto:info@healthshastra.com">Send an Enquiry</a></li>
                        <li><a href="tel:+919820226731">Book by Phone</a></li>
                    </ul>
                </div>

            </div>

            {/* ── Divider ── */}
            <div className="footer-divider" />

            {/* ── Bottom ── */}
            <div className="footer-bottom">
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Health Shastra. All rights reserved.
                </p>
                <div className="footer-social">
                    <a href="#" className="footer-social-link" aria-label="Instagram">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                    <a href="#" className="footer-social-link" aria-label="Facebook">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;