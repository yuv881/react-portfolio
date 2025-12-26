import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const bgTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

            tl.from('.hero-top-line', {
                x: -30,
                opacity: 0,
                duration: 1
            })
                .from('.hero-title span', {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.1
                }, '-=0.5')
                .from('.hero-description', {
                    y: 20,
                    opacity: 0,
                    duration: 1
                }, '-=1')
                .from('.hero-actions', {
                    y: 20,
                    opacity: 0,
                    duration: 1
                }, '-=0.8');

            // Parallax Scroll for Background Text on ALL devices
            gsap.to(bgTextRef.current, {
                x: -200,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                }
            });

            // Subtle parallax for title on scroll
            gsap.to(titleRef.current, {
                y: -50,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-bg-text" ref={bgTextRef}>DEVELOPER</div>

            <div className="container hero-content">
                <div className="hero-main">
                    <h1 className="hero-title" ref={titleRef}>
                        <span style={{ display: 'block' }}>Building</span>
                        <span style={{ display: 'block' }} className="outline-text">Digital</span>
                        <span style={{ display: 'block' }}>Solutions</span>
                    </h1>

                    <p className="hero-description">
                        Focused on creating clean, efficient, and scalable web experiences.
                        Minimalist design, maximum impact.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn-mono">View Work</a>
                        <a href="#contact" className="btn-outline-mono">Get in Touch</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
