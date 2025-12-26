import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
    const sectionRef = useRef(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-left > *', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            gsap.from('.contact-form-mono > *', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.contact-form-mono',
                    start: 'top 85%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="contact-minimal section" ref={sectionRef}>
            <div className="container">
                <div className="contact-layout">
                    <div className="contact-left">
                        <h2>Start A <br /><span className="outline-text">Conversation</span></h2>
                        <a href="mailto:yuvrajsinghshaktawat28@gmail.com" className="contact-email-large">yuvrajsinghshaktawat28@gmail.com</a>

                        <div className="socials-minimal">
                            <a href="https://github.com/yuv881" className="social-min-link">Github</a>
                            <a href="https://www.linkedin.com/in/yuv881/" className="social-min-link">LinkedIn</a>
                            <a href="https://www.instagram.com/_yuvi_109" className="social-min-link">Instagram</a>
                        </div>
                    </div>

                    <form className="contact-form-mono" onSubmit={handleSubmit}>
                        <div className="form-field-mono">
                            <label>Full Name</label>
                            <input type="text" required placeholder="John Doe" />
                        </div>
                        <div className="form-field-mono">
                            <label>Email Address</label>
                            <input type="email" required placeholder="john@example.com" />
                        </div>
                        <div className="form-field-mono">
                            <label>Project Details</label>
                            <textarea rows="4" required placeholder="Tell me about your project..."></textarea>
                        </div>

                        <button type="submit" className="btn-mono" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Received' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <footer className="footer-minimal">
                    <span>© 2025 Yuvraj Singh</span>
                    <span>Crafted In Monochrome</span>
                    <span>Back to Top ↑</span>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
