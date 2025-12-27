import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
    const sectionRef = useRef(null);
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
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
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-field-mono">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="form-field-mono">
                            <label>Project Details</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                required
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-mono" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' :
                                status === 'success' ? 'Message Received' :
                                    status === 'error' ? 'Oops! Try Again' : 'Send Message'}
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
