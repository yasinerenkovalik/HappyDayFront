import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>🎉 HappyDay © {new Date().getFullYear()}</h3>
          <p>Mutlu anlarınız için en iyi organizasyon platformu.</p>
        </div>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
