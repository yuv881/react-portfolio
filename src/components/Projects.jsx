import { useState } from 'react';
import './Projects.css';

const Projects = () => {
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: 'Nexus E-Commerce',
            category: 'web',
            description: 'A premium shopping experience with real-time inventory and seamless payments.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80',
            link: '#'
        },
        {
            id: 2,
            title: 'TaskFlow Pro',
            category: 'web',
            description: 'Enterprise-grade task management with intuitive drag-and-drop workflow.',
            technologies: ['React', 'Firebase', 'Tailwind'],
            image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&q=80',
            link: '#'
        },
        {
            id: 3,
            title: 'Aura Weather',
            category: 'web',
            description: 'Minimalist weather forecasting with hyper-local accuracy and dynamic backgrounds.',
            technologies: ['React', 'OpenWeather', 'Framer Motion'],
            image: 'https://images.unsplash.com/photo-1504608510435-932694178303?w=500&q=80',
            link: '#'
        },
        {
            id: 4,
            title: 'Cipher Social',
            category: 'mobile',
            description: 'End-to-end encrypted social networking for the privacy-conscious generation.',
            technologies: ['React Native', 'Socket.io', 'Supabase'],
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
            link: '#'
        },
        {
            id: 5,
            title: 'Zen Design System',
            category: 'design',
            description: 'A comprehensive design system for building consistent and beautiful user interfaces.',
            technologies: ['Figma', 'Storybook', 'Styled Components'],
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&q=80',
            link: '#'
        },
        {
            id: 6,
            title: 'Nova AI Chat',
            category: 'web',
            description: 'Context-aware AI assistant capable of handling complex multi-turn conversations.',
            technologies: ['Next.js', 'OpenAI', 'Vercel'],
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80',
            link: '#'
        }
    ];

    const categories = ['all', 'web', 'mobile', 'design'];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Selected <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle">A collection of my recent work across different platforms and technologies.</p>
                </div>

                <div className="project-filters fade-in-up delay-1">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="project-image-wrapper">
                                <img src={project.image} alt={project.title} className="project-image" />
                                <div className="project-overlay">
                                    <div className="project-actions">
                                        <a href={project.link} className="project-action-btn" aria-label="View Link">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        </a>
                                        <a href="#" className="project-action-btn" aria-label="View Code">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-category">{project.category}</div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-technologies">
                                    {project.technologies.slice(0, 3).map(tech => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                    {project.technologies.length > 3 && <span className="tech-tag">+{project.technologies.length - 3}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
