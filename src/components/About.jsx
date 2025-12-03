import { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
    const [counters, setCounters] = useState({ projects: 0, years: 0, clients: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);

    const skills = [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'CSS/SCSS', level: 88 },
        { name: 'TypeScript', level: 75 },
        { name: 'MongoDB', level: 70 }
    ];

    // Animated counter effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    // Animate projects counter
                    let projectCount = 0;
                    const projectInterval = setInterval(() => {
                        projectCount += 2;
                        if (projectCount >= 50) {
                            setCounters(prev => ({ ...prev, projects: 50 }));
                            clearInterval(projectInterval);
                        } else {
                            setCounters(prev => ({ ...prev, projects: projectCount }));
                        }
                    }, 30);

                    // Animate years counter
                    let yearCount = 0;
                    const yearInterval = setInterval(() => {
                        yearCount += 1;
                        if (yearCount >= 3) {
                            setCounters(prev => ({ ...prev, years: 3 }));
                            clearInterval(yearInterval);
                        } else {
                            setCounters(prev => ({ ...prev, years: yearCount }));
                        }
                    }, 300);

                    // Animate clients counter
                    let clientCount = 0;
                    const clientInterval = setInterval(() => {
                        clientCount += 1;
                        if (clientCount >= 30) {
                            setCounters(prev => ({ ...prev, clients: 30 }));
                            clearInterval(clientInterval);
                        } else {
                            setCounters(prev => ({ ...prev, clients: clientCount }));
                        }
                    }, 50);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <section id="about" className="about section">
            <div className="container">
                <h2 className="section-title fade-in-up">About Me</h2>

                <div className="about-content">
                    <div className="about-image fade-in-left">
                        <div className="image-wrapper">
                            <div className="image-placeholder">
                                <div className="avatar-icon">👨‍💻</div>
                            </div>
                            <div className="image-decoration decoration-1"></div>
                            <div className="image-decoration decoration-2"></div>
                        </div>
                    </div>

                    <div className="about-text fade-in-right">
                        <h3 className="about-subtitle">
                            Passionate Developer & Creative Problem Solver
                        </h3>
                        <p className="about-description">
                            I'm a full-stack developer with a passion for creating beautiful,
                            functional, and user-centered digital experiences. With expertise
                            in modern web technologies, I bring ideas to life through clean
                            code and innovative solutions.
                        </p>
                        <p className="about-description">
                            When I'm not coding, you'll find me exploring new technologies,
                            contributing to open-source projects, or sharing knowledge with
                            the developer community.
                        </p>

                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="skill-item fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="skill-header">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percentage">{skill.level}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div
                                            className="skill-progress"
                                            style={{
                                                width: `${skill.level}%`,
                                                animationDelay: `${index * 0.1 + 0.5}s`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="about-stats" ref={statsRef}>
                            <div className="stat-item fade-in-up delay-1">
                                <h4 className="stat-number">{counters.projects}+</h4>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                            <div className="stat-item fade-in-up delay-2">
                                <h4 className="stat-number">{counters.years}+</h4>
                                <p className="stat-label">Years Experience</p>
                            </div>
                            <div className="stat-item fade-in-up delay-3">
                                <h4 className="stat-number">{counters.clients}+</h4>
                                <p className="stat-label">Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
