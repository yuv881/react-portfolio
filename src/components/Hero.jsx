import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const canvasRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const titles = ['Full Stack Developer', 'Software Engineer', 'Creative Tech Enthusiast'];

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Typing animation
    useEffect(() => {
        const currentTitle = titles[titleIndex];
        const typingSpeed = isDeleting ? 40 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (typedText.length < currentTitle.length) {
                    setTypedText(currentTitle.substring(0, typedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (typedText.length > 0) {
                    setTypedText(currentTitle.substring(0, typedText.length - 1));
                } else {
                    setIsDeleting(false);
                    setTitleIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, titleIndex]);

    // Particle animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 20 + 1;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
            }

            update(mouse) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    this.x -= (dx / distance) * force * this.density * 0.5;
                    this.y -= (dy / distance) * force * this.density * 0.5;
                } else {
                    if (this.x !== this.baseX) {
                        this.x += (this.baseX - this.x) * 0.05;
                    }
                    if (this.y !== this.baseY) {
                        this.y += (this.baseY - this.y) * 0.05;
                    }
                }

                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            const particleCount = Math.min(60, Math.floor(canvas.width / 20));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        createParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.update(mousePosition);
                particle.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePosition]);

    return (
        <section id="home" className="hero">
            <canvas ref={canvasRef} className="hero-canvas"></canvas>

            <div className="hero-content container">
                <div className="hero-main">
                    <div className="hero-badge fade-in-up">
                        <span className="badge-dot pulse"></span>
                        Available for new opportunities
                    </div>

                    <h1 className="hero-title fade-in-up delay-1">
                        Designing the future of <span className="gradient-text">Web Apps</span>
                    </h1>

                    <div className="hero-typing fade-in-up delay-2">
                        <span>I am a </span>
                        <span className="typed-text">{typedText}</span>
                        <span className="cursor">_</span>
                    </div>

                    <p className="hero-description fade-in-up delay-3">
                        Passionate Full Stack Developer specializing in building high-performance,
                        scalable web applications with modern technologies. Let's build something awesome together.
                    </p>

                    <div className="hero-actions fade-in-up delay-4">
                        <a href="#projects" className="btn btn-primary">
                            Explore Projects
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            Get in Touch
                        </a>
                    </div>
                </div>

                <div className="hero-stats-grid fade-in-up delay-5">
                    <div className="hero-stat-card">
                        <span className="stat-value text-gradient">2+</span>
                        <span className="stat-label">Years of Experience</span>
                    </div>
                    <div className="hero-stat-card">
                        <span className="stat-value text-gradient">50+</span>
                        <span className="stat-label">Projets Completed</span>
                    </div>
                    <div className="hero-stat-card">
                        <span className="stat-value text-gradient">30+</span>
                        <span className="stat-label">Happy Clients</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
};

export default Hero;
