import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './MainLayout.css';

const MainLayout: React.FC = () => {
    return (
        <div className="main-layout">
            <Header />

            <main className="main-layout__content">
                <div className="main-layout__container">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
