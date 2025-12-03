import { useState } from 'react';
import './Projects.css';

const Projects = () => {
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'web',
            description: 'A full-featured online shopping platform with cart, checkout, and payment integration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: '🛒',
            link: '#'
        },
        {
            id: 2,
            title: 'Task Management App',
            category: 'web',
            description: 'Collaborative task manager with real-time updates and team features.',
            technologies: ['React', 'Firebase', 'Material-UI'],
            image: '✅',
            link: '#'
        },
        {
            id: 3,
            title: 'Weather Dashboard',
            category: 'web',
            description: 'Beautiful weather app with forecasts, maps, and location-based data.',
            technologies: ['React', 'OpenWeather API', 'Chart.js'],
            image: '🌤️',
            link: '#'
        },
        {
            id: 4,
            title: 'Social Media App',
            category: 'mobile',
            description: 'Instagram-like social platform with posts, stories, and messaging.',
            technologies: ['React Native', 'Node.js', 'Socket.io'],
            image: '📱',
            link: '#'
        },
        {
            id: 5,
            title: 'Portfolio Website',
            category: 'design',
            description: 'Modern portfolio with animations and interactive elements.',
            technologies: ['React', 'CSS3', 'Framer Motion'],
            image: '🎨',
            link: '#'
        },
        {
            id: 6,
            title: 'AI Chatbot',
            category: 'web',
            description: 'Intelligent chatbot with natural language processing capabilities.',
            technologies: ['Python', 'TensorFlow', 'React'],
            image: '🤖',
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
                <h2 className="section-title fade-in-up">My Projects</h2>

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
                            className="project-card glass-card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="project-image">
                                <div className="project-icon">{project.image}</div>
                                <div className="project-overlay">
                                    <a href={project.link} className="project-link">
                                        View Project →
                                    </a>
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-technologies">
                                    {project.technologies.map(tech => (
                                        <span key={tech} className="tech-tag">{tech}</span>
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

export default Projects;
