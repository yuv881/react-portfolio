import { useState } from 'react';
import './Skills.css';

const Skills = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const skillCategories = [
        {
            title: 'Frontend',
            icon: '⚡',
            skills: ['React', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'SASS']
        },
        {
            title: 'Backend',
            icon: '⚙️',
            skills: ['Node.js', 'Express', 'Python', 'GraphQL',  'MongoDB']
        },
        {
            title: 'Tools & Others',
            icon: '🛠️',
            skills: ['Git', 'VS Code']
        }
    ];

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <h2 className="section-title fade-in-up">Skills & Expertise</h2>

                <div className="skills-container">
                    {skillCategories.map((category, index) => (
                        <div
                            key={category.title}
                            className="skill-category glass-card fade-in-up"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="category-header">
                                <span className="category-icon">{category.icon}</span>
                                <h3 className="category-title">{category.title}</h3>
                                <div className="category-count">{category.skills.length}</div>
                            </div>

                            <div className="category-skills">
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skill}
                                        className={`skill-badge ${hoveredSkill === skill ? 'hovered' : ''}`}
                                        style={{ animationDelay: `${index * 0.15 + skillIndex * 0.05}s` }}
                                        onMouseEnter={() => setHoveredSkill(skill)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <span className="skill-text">{skill}</span>
                                        <span className="skill-index">{String(skillIndex + 1).padStart(2, '0')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skills-footer fade-in-up delay-4">
                    <div className="footer-line"></div>
                    <p className="footer-text">
                        Continuously learning and exploring new technologies to stay at the forefront of web development
                    </p>
                    <div className="footer-line"></div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
