import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const menuItems = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <>
            <nav className={`nav-cinematic ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-inner">
                    <div className="nav-brand" onClick={() => scrollToSection('home')}>
                        <span className="brand-name">YUVRAJ</span>
                    </div>

                    <div className="nav-desktop-links">
                        {['about', 'projects', 'skills', 'contact'].map(item => (
                            <button
                                key={item}
                                className={`nav-link-item ${activeSection === item ? 'active' : ''}`}
                                onClick={() => scrollToSection(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <a href="/resume.pdf" download className="nav-cv-btn desktop-only">
                            CV
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        </a>
                        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'dark' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                </svg>
                            )}
                        </button>
                        <button className={`burger-lux ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            <div className="burger-lux-box">
                                <div className="burger-lux-inner"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`menu-overlay-lux ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-overlay-bg"></div>
                <div className="menu-overlay-content">
                    <div className="menu-header">
                        <div className="menu-line"></div>
                    </div>

                    <ul className="menu-nav-list">
                        {menuItems.map((item, i) => (
                            <li key={item.id} style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                                <button className="menu-nav-item" onClick={() => scrollToSection(item.id)}>
                                    <span className="item-index">0{i + 1}</span>
                                    <span className="item-label">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="menu-footer">
                        <div className="menu-footer-left">
                            <span className="footer-label">SOCIAL</span>
                            <div className="footer-links">
                                <a href="https://linkedin.com">LinkedIn</a>
                                <a href="https://github.com">Github</a>
                                <a href="https://instagram.com">Instagram</a>
                            </div>
                        </div>
                        <div className="menu-footer-right">
                            <a href="/resume.pdf" download className="menu-cv-btn">
                                Download CV
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
