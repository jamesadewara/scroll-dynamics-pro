import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollProvider } from 'scroll-dynamics-pro';
import { LandingPage } from './pages/LandingPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { Nav } from './components/Nav';
import { ProgressBar } from './components/ProgressBar';
import './index.css';

// Using HashRouter for easy static deployment compatibility (e.g. GitHub Pages)
// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <ScrollProvider>
            <Router>
                <ScrollToTop />
                <ProgressBar />
                <Nav />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/docs" element={<DocumentationPage />} />
                </Routes>
            </Router>
        </ScrollProvider>
    );
}

export default App;
