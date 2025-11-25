import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="app-footer__inner">
                <span className="app-footer__text">
                    © {year} KHGC System. All rights reserved.
                </span>
                <span className="app-footer__text app-footer__text--muted">
                    Built with React + Vite.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
