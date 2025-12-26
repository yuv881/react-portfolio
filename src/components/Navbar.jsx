import { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        // Initialize theme
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        gsap.from('.navbar', {
            y: -20,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out'
        });

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar-mono ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container-mono">
                <div className="nav-logo-mono" onClick={() => scrollToSection('home')}>
                    YUVRAJ<span className="dot-mono">S.</span>
                </div>

                <ul className="nav-links-mono">
                    {['about', 'projects', 'skills', 'contact'].map(item => (
                        <li key={item}>
                            <button
                                className={`nav-item-mono ${activeSection === item ? 'active' : ''}`}
                                onClick={() => scrollToSection(item)}
                            >
                                {item}
                                <span className="nav-dot"></span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="nav-actions">
                    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        )}
                    </button>
                    <button className="btn-mono nav-hire-btn-small" onClick={() => scrollToSection('contact')}>
                        Hire Me
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
