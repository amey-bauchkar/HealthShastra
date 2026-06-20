import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="HealthShastra" className="logo-image" />
        </Link>

        <ul className="nav-menu">
          <li className="nav-item"><Link to="/therapy/colon" className={`nav-links ${location.pathname.includes('/colon') ? 'active' : ''}`}>Colon Hydrotherapy</Link></li>
          <li className="nav-item"><Link to="/therapy/qi" className={`nav-links ${location.pathname.includes('/qi') ? 'active' : ''}`}>Qi / IR Therapy</Link></li>
          <li className="nav-item"><Link to="/therapy/detox" className={`nav-links ${location.pathname.includes('/detox') ? 'active' : ''}`}>Detoxification</Link></li>
          <li className="nav-item"><Link to="/therapy/neuro" className={`nav-links ${location.pathname.includes('/neuro') ? 'active' : ''}`}>Neurodegenerative Diseases</Link></li>
          <li className="nav-item"><Link to="/therapy/thermal" className={`nav-links ${location.pathname.includes('/thermal') ? 'active' : ''}`}>Thermal Therapy</Link></li>
          <li className="nav-item"><Link to="/therapy/ozone" className={`nav-links ${location.pathname.includes('/ozone') ? 'active' : ''}`}>Ozone Therapy</Link></li>
        </ul>

        <div className="navbar-contact">
          <Link to="/contact" className="contact-btn">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
