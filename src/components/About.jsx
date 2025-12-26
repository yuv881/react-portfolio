import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './About.css';
import profileImg from '../assets/profile.jpeg';

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-text-content > *', {
                opacity: 0,
                x: 30,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-minimal section" ref={sectionRef}>
            <div className="container">
                <div className="about-grid-mono">
                    <div className="about-img-mono">
                        <img src={profileImg} alt="Profile" />
                    </div>

                    <div className="about-text-content">
                        <span className="section-subtitle-top" style={{ color: 'var(--text-dim)' }}>Who I am /</span>
                        <h2>A developer driven by <span className="outline-text">Architecture</span> and Clarity.</h2>

                        <p className="about-para-mono">
                            I specialize in building robust digital products. My philosophy is rooted in
                            intentionality—every line of code and every design choice should serve a purpose.
                        </p>

                        <div className="about-stats-grid">
                            <div className="stat-item-mono">
                                <span className="stat-val-mono">01+</span>
                                <span className="stat-label-mono">Years Exp.</span>
                            </div>
                            <div className="stat-item-mono">
                                <span className="stat-val-mono">20+</span>
                                <span className="stat-label-mono">Cases Done</span>
                            </div>
                            <div className="stat-item-mono">
                                <span className="stat-val-mono">30+</span>
                                <span className="stat-label-mono">Solutions</span>
                            </div>
                            <div className="stat-item-mono">
                                <span className="stat-val-mono">100%</span>
                                <span className="stat-label-mono">Digital Focus</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
