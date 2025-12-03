import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate form submission
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus('');
            }, 3000);
        }, 1500);
    };

    const socialLinks = [
        { name: 'GitHub', icon: '💻', url: '#' },
        { name: 'LinkedIn', icon: '💼', url: '#' },
        { name: 'Twitter', icon: '🐦', url: '#' },
        { name: 'Email', icon: '📧', url: 'mailto:your@email.com' }
    ];

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <h2 className="section-title fade-in-up">Get In Touch</h2>

                <div className="contact-content">
                    <div className="contact-info fade-in-left">
                        <h3 className="contact-subtitle">Let's Work Together</h3>
                        <p className="contact-description">
                            I'm always interested in hearing about new projects and opportunities.
                            Whether you have a question or just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <div className="detail-icon">📍</div>
                                <div className="detail-text">
                                    <h4>Location</h4>
                                    <p>Your City, Country</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">📧</div>
                                <div className="detail-text">
                                    <h4>Email</h4>
                                    <p>your@email.com</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">📱</div>
                                <div className="detail-text">
                                    <h4>Phone</h4>
                                    <p>+1 234 567 8900</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="social-link fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="social-icon">{social.icon}</span>
                                    <span className="social-name">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form glass-card fade-in-right" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Yuvraj singh"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn submit-btn"
                            disabled={status === 'sending'}
                        >
                            <span className="btn-text">
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Send Message'}
                            </span>
                            {status !== 'sending' && status !== 'success' && (
                                <span className="btn-icon">→</span>
                            )}
                            {status === 'success' && (
                                <span className="btn-icon">✓</span>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="success-message">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        © 2024 Yuvraj singh. Built with ❤️ using React
                    </p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
