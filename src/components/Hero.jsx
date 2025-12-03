import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const canvasRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const titles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];

    // Mouse tracking for interactive elements
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Typing animation effect
    useEffect(() => {
        const currentTitle = titles[titleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (typedText.length < currentTitle.length) {
                    setTypedText(currentTitle.substring(0, typedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
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
    }, [typedText, isDeleting, titleIndex, titles]);

    // Enhanced particle animation with mouse interaction
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
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 30 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }

            update(mouse) {
                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 150;
                const force = (maxDistance - distance) / maxDistance;

                if (distance < maxDistance) {
                    this.x -= forceDirectionX * force * this.density * 0.6;
                    this.y -= forceDirectionY * force * this.density * 0.6;
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

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            const particleCount = Math.min(80, Math.floor(canvas.width / 15));
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

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 1;
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
                <div className="hero-text">
                    <div className="hero-badge fade-in-up delay-1">
                        <span className="badge-dot"></span>
                        Available for work
                    </div>

                    <h1 className="hero-name fade-in-up delay-2">
                        <span className="name-first">Yuvraj</span>
                        <span className="name-last">Singh</span>
                    </h1>

                    <div className="hero-title-wrapper fade-in-up delay-3">
                        <h2 className="hero-title">
                            <span className="typed-text">{typedText}</span>
                            <span className="cursor">|</span>
                        </h2>
                    </div>

                    <p className="hero-description fade-in-up delay-4">
                        Crafting exceptional digital experiences through clean code,
                        innovative design, and user-centered thinking. Specialized in
                        building scalable web applications that make an impact.
                    </p>

                    <div className="hero-buttons fade-in-up delay-5">
                        <a href="#projects" className="btn">
                            <span>View Work</span>
                            <span className="btn-arrow">→</span>
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <span>Get In Touch</span>
                        </a>
                        <a href="/cv.pdf" download="Yuvraj_Singh_CV.pdf" className="btn btn-outline">
                            <span>Download CV</span>
                            <span className="btn-arrow">↓</span>
                        </a>
                    </div>

                    <div className="hero-stats fade-in-up delay-6">
                        <div className="stat">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Projects</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-number">3+</div>
                            <div className="stat-label">Years</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-number">30+</div>
                            <div className="stat-label">Clients</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-line"></div>
                <span>Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
