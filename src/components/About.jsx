import { useState, useEffect, useRef } from 'react';
import './About.css';
import profileImg from '../assets/profile.jpeg';

const About = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [counters, setCounters] = useState({ projects: 0, experience: 0, solutions: 0 });
    const statsRef = useRef(null);

    const skills = [
        { name: 'Core Architecture', level: 95 },
        { name: 'Frontend Excellence', level: 90 },
        { name: 'Backend Scalability', level: 85 },
        { name: 'UI/UX Design', level: 80 }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounters = () => {
        const duration = 2000;
        const frames = 60;
        const interval = duration / frames;

        let frame = 0;
        const timer = setInterval(() => {
            frame++;
            const progress = frame / frames;

            setCounters({
                projects: Math.floor(progress * 50),
                experience: Math.floor(progress * 2),
                solutions: Math.floor(progress * 30)
            });

            if (frame === frames) clearInterval(timer);
        }, interval);
    };

    return (
        <section id="about" className="about section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-visual fade-in-left">
                        <div className="profile-card">
                            <img src={profileImg} alt="Profile" className="profile-img" />
                            <div className="experience-badge">
                                <span className="years">2+</span>
                                <span className="text">Years of<br />Experience</span>
                            </div>
                        </div>
                        <div className="visual-decoration"></div>
                    </div>

                    <div className="about-content fade-in-right">
                        <div className="section-header-left">
                            <span className="section-subtitle-top">My Story</span>
                            <h2 className="section-title-left">Driven by <span className="gradient-text">Innovation</span></h2>
                        </div>

                        <p className="about-para">
                            I am a dedicated Full Stack Developer with a passion for building
                            seamless digital experiences. My approach combines technical
                            rigor with creative thinking, ensuring every project is both
                            scalable and user-friendly.
                        </p>

                        <div className="skills-mini-grid">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="skill-item-v2">
                                    <div className="skill-info">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percentage">{skill.level}%</span>
                                    </div>
                                    <div className="skill-bar-v2">
                                        <div
                                            className={`skill-progress-v2 ${hasAnimated ? 'animated' : ''}`}
                                            style={{ '--target-width': `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="about-stats-v2" ref={statsRef}>
                            <div className="stat-box">
                                <span className="stat-num">{counters.projects}+</span>
                                <span className="stat-desc">Projects Done</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-num">{counters.solutions}+</span>
                                <span className="stat-desc">Solutions Built</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
