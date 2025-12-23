import { useState } from 'react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend Excellence',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 18l4-4-4-4M7 6l-4 4 4 4M14 4l-4 16"></path></svg>,
            skills: ['React', 'Next.js', 'Typescript', 'Framer Motion', 'Tailwind', 'SASS']
        },
        {
            title: 'Robust Backend',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
            skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL']
        },
        {
            title: 'Cloud & DevOps',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
            skills: ['AWS', 'Docker', 'Vercel', 'Git', 'CI/CD']
        }
    ];

    return (
        <section id="skills" className="skills section">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Technical <span className="gradient-text">Expertise</span></h2>
                    <p className="section-subtitle">A comprehensive overview of my technical stack and specialized tools.</p>
                </div>

                <div className="skills-grid-v2">
                    {skillCategories.map((cat, i) => (
                        <div key={cat.title} className="skill-card-v2 fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                            <div className="skill-card-icon">
                                {cat.icon}
                            </div>
                            <h3 className="skill-card-title">{cat.title}</h3>
                            <div className="skill-list-v2">
                                {cat.skills.map((skill) => (
                                    <div key={skill} className="skill-tag-v2">
                                        <span className="skill-dot"></span>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
