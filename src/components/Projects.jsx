import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);

    const projects = [
        {
            id: '01',
            title: 'Nexus E-Commerce',
            category: 'web',
            description: 'A performance-driven shopping platform with minimalist aesthetic and core focus on user experience.',
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
        },
        {
            id: '02',
            title: 'TaskFlow Pro',
            category: 'web',
            description: 'Enterprise task management system designed for clarity and architectural robustness.',
            technologies: ['React', 'Firebase', 'Tailwind'],
            image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=1200&q=80',
        },
        {
            id: '03',
            title: 'Aura Weather',
            category: 'web',
            description: 'Visual weather forecasting app focusing on typography and data visualization.',
            technologies: ['React', 'D3.js', 'WeatherAPI'],
            image: 'https://images.unsplash.com/photo-1504608510435-932694178303?w=1200&q=80',
        },
        {
            id: '04',
            title: 'Cyber Security',
            category: 'security',
            description: 'Advanced monitoring and threat detection dashboard with real-time visualization.',
            technologies: ['Python', 'React', 'ElasticSearch'],
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
        }
    ];

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const section = sectionRef.current;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 0px)", () => {
            // Universal Horizontal Scroll Calculation
            const calculateX = () => {
                const winWidth = window.innerWidth;
                const slides = gsap.utils.toArray('.project-item-horizontal');
                const firstSlide = slides[0];
                const lastSlide = slides[slides.length - 1];

                if (!firstSlide || !lastSlide) return { startX: 0, endX: 0 };

                // For centering on ALL devices
                const startX = (winWidth / 2) - (firstSlide.offsetLeft + firstSlide.offsetWidth / 2);
                const endX = (winWidth / 2) - (lastSlide.offsetLeft + lastSlide.offsetWidth / 2);
                return { startX, endX };
            };

            const { startX, endX } = calculateX();

            const horizontalTween = gsap.fromTo(wrapper,
                { x: startX },
                {
                    x: endX,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${Math.abs(endX - startX) * 1.5}`, // Scaled for mobile feel
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    }
                }
            );

            // Project Image Parallax & Revealing
            gsap.utils.toArray('.project-item-horizontal').forEach((item) => {
                const img = item.querySelector('.p-img-h');

                // Entry animation
                gsap.from(item, {
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: horizontalTween,
                        start: "left 90%",
                    }
                });

                // Internal Image Scale Parallax
                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.2 },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: item,
                                containerAnimation: horizontalTween,
                                start: "left 100%",
                                end: "right 0%",
                                scrub: true
                            }
                        }
                    );
                }
            });

            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="projects" className="projects-section" ref={sectionRef}>
            <div className="projects-wrapper" ref={wrapperRef}>
                {/* Intro Slide */}
                <div className="project-item-horizontal slide-intro">
                    <div className="p-info-h">
                        <span className="section-subtitle-top" style={{ color: 'var(--text-dim)' }}>Work /</span>
                        <h2 className="p-title-h">
                            Selected <br />
                            <span className="outline-text">Cases.</span>
                        </h2>
                        <p className="p-desc-h">High-performance digital systems and architectural solutions.</p>
                    </div>
                </div>

                {/* Project Slides */}
                {projects.map((project) => (
                    <div key={project.id} className="project-item-horizontal">
                        <div className="p-img-box-h">
                            <img src={project.image} alt={project.title} className="p-img-h" />
                        </div>

                        <div className="p-info-h">
                            <span className="p-num-h">{project.id}</span>
                            <h3 className="p-title-h">{project.title}</h3>
                            <p className="p-desc-h">{project.description}</p>
                            <div className="p-tags-h">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="p-tag-h">{tech}</span>
                                ))}
                            </div>
                            <a href="#" className="p-link-h">
                                Explore Case
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </a>
                        </div>
                    </div>
                ))}

                {/* Closing Slide */}
                <div className="project-item-horizontal slide-outro">
                    <div className="p-info-h">
                        <h2 className="p-title-h">
                            Have an <br />
                            <span className="outline-text">Idea?</span>
                        </h2>
                        <p className="p-desc-h">Let's build something extraordinary together.</p>
                        <a href="#contact" className="btn-mono">Start Project</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
