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
        const grid = gridRef.current;
        const mm = gsap.matchMedia();

        mm.add("(max-width: 968px)", () => {
            const boxes = gsap.utils.toArray('.skill-box');

            // DYNAMIC CENTERING LOGIC - PIXEL PERFECT
            const calculateX = () => {
                const winWidth = window.innerWidth;
                const totalWidth = grid.scrollWidth;

                // We want to scroll until the right edge of the last box plus some padding is visible
                const endX = -(totalWidth - winWidth + 40); // 40px for right-side safety margin

                return { startX: 0, endX };
            };

            const { startX, endX } = calculateX();

            gsap.fromTo(grid,
                { x: 0 },
                {
                    x: endX,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${Math.abs(endX)}`, // Proportional scroll length
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    }
                }
            );

            // Staggered reveal for internal content
            boxes.forEach((box) => {
                gsap.from(box.querySelectorAll('.skill-body > *'), {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: box,
                        start: "left 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        });

        mm.add("(min-width: 969px)", () => {
            gsap.from('.skill-box', {
                y: 80,
                opacity: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 80%'
                }
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            <div className="container overflow-visible-mobile" style={{ maxWidth: '100%', padding: '0' }}>
                <div className="section-header" style={{ paddingLeft: '2rem' }}>
                    <span className="section-subtitle-top" style={{ color: 'var(--text-dim)' }}>Expertise /</span>
                    <h2 className="section-title">Technical <span className="outline-text">Expertise.</span></h2>
                </div>

                <div className="skills-grid" ref={gridRef}>
                    {expertise.map((item, i) => (
                        <div key={i} className="skill-box" data-index={`0${i + 1}`}>
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
