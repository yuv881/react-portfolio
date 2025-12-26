import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    const expertise = [
        {
            title: 'Frontend Architecture',
            desc: 'Developing complex, responsive, and high-performance user interfaces with modern frameworks.',
            skills: ['React', 'Next.js', 'TypeScript', 'Tailwind']
        },
        {
            title: 'Backend Engineering',
            desc: 'Building scalable server-side systems and efficient database architectures.',
            skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB']
        },
        {
            title: 'System Design',
            desc: 'Architecting robust applications with a focus on maintainability and performance.',
            skills: ['Docker', 'AWS', 'Vercel', 'CI/CD']
        },
        {
            title: 'UI/UX Design',
            desc: 'Crafting minimalist and functional digital experiences with a focus on typography.',
            skills: ['Figma', 'Prototyping', 'Visual Design']
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 0px)", () => {
            // Shared header animation
            gsap.from('.section-header > *', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.section-header',
                    start: 'top 85%'
                }
            });

            const boxes = gsap.utils.toArray('.skill-box');
            boxes.forEach((box, i) => {
                // Determine if we are on mobile to skip side-slide
                const isMobile = window.innerWidth <= 768;
                const isEven = i % 2 === 0;

                gsap.fromTo(box,
                    {
                        opacity: 0,
                        y: 80,
                        x: isMobile ? 0 : (isEven ? -30 : 30)
                    },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: 1.5,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: box,
                            start: 'top 95%',
                            end: 'top 70%',
                            scrub: isMobile ? false : 1, // Keep it punchy on mobile
                            toggleActions: isMobile ? 'play none none none' : undefined
                        }
                    }
                );

                // Internal text reveal on scroll - Great "scrolling effect"
                gsap.from(box.querySelector('.skill-body'), {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle-top" style={{ color: 'var(--text-dim)' }}>Expertise /</span>
                    <h2 className="section-title">Technical <span className="outline-text">Expertise.</span></h2>
                </div>

                <div className="skills-grid" ref={gridRef}>
                    {expertise.map((item, i) => (
                        <div key={i} className="skill-box">
                            <div className="skill-top">
                                <span className="skill-number">0{i + 1}</span>
                                <div className="skill-icon-line"></div>
                            </div>
                            <div className="skill-body">
                                <h3 className="skill-title">{item.title}</h3>
                                <p className="skill-desc">{item.desc}</p>
                                <div className="skill-list">
                                    {item.skills.map(s => (
                                        <span key={s} className="skill-tag">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
