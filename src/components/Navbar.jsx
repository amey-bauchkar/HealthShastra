import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { to: '/therapy/colon', label: 'Colon Hydrotherapy', match: '/colon' },
    { to: '/therapy/qi', label: 'Qi / IR Therapy', match: '/qi' },
    { to: '/therapy/detox', label: 'Detoxification', match: '/detox' },
    { to: '/therapy/neuro', label: 'Neurodegenerative Diseases', match: '/neuro' },
    { to: '/therapy/thermal', label: 'Thermal Therapy', match: '/thermal' },
    { to: '/therapy/ozone', label: 'Ozone Therapy', match: '/ozone' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="HealthShastra" className="logo-image" />
          </Link>

          {/* Desktop nav */}
          <ul className="nav-menu">
            {navLinks.map(({ to, label, match }) => (
              <li key={to} className="nav-item">
                <Link to={to} className={`nav-links ${location.pathname.includes(match) ? 'active' : ''}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-contact">
            <Link to="/contact" className="contact-btn">Contact Us</Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label, match }) => (
          <Link
            key={to}
            to={to}
            className={`nav-links ${location.pathname.includes(match) ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/contact" className="contact-btn">Contact Us</Link>
      </div>
    </>
  );
};

export default Navbar;