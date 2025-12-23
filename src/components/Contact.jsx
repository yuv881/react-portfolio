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

        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus('');
            }, 3000);
        }, 1500);
    };

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
            url: '#'
        },
        {
            name: 'LinkedIn',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
            url: '#'
        },
        {
            name: 'Twitter',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
            url: '#'
        },
        {
            name: 'Email',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
            url: 'mailto:your@email.com'
        }
    ];

    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-subtitle">Let's discuss your next project or just say hello.</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info fade-in-left">
                        <h3 className="contact-subtitle">Collaborate with me</h3>
                        <p className="contact-description">
                            I'm available for freelance projects and full-time opportunities.
                            If you have a project that needs a creative touch, I'd love to help.
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div className="detail-text">
                                    <h4>Location</h4>
                                    <p>Your City, Country</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div className="detail-text">
                                    <h4>Email</h4>
                                    <p>your@email.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links-v2">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="social-btn-v2 fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                >
                                    <span className="social-icon-v2">{social.icon}</span>
                                    <span className="social-tooltip">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form-v2 fade-in-right" onSubmit={handleSubmit}>
                        <div className="form-group-v2">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="form-group-v2">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email"
                            />
                        </div>

                        <div className="form-group-v2">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Your Message"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn submit-btn-v2"
                            disabled={status === 'sending'}
                        >
                            <span className="btn-text">
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            <footer className="footer-v2">
                <div className="container">
                    <p>© 2024 Yuvraj Singh. All Rights Reserved.</p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
