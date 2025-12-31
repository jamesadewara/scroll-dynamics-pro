import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';
import { HorizontalGallery } from '../components/HorizontalGallery';
import { ParallaxHero } from '../components/ParallaxHero';
import { AdvancedTransforms } from '../components/AdvancedTransforms';
import { ColorShiftSection } from '../components/ColorShiftSection';
import { PinnedContent } from '../components/PinnedContent';
import { FixedBackgroundStory } from '../components/FixedBackgroundStory';
import { BigTextReveal } from '../components/BigTextReveal';
import { VelocitySkewSection } from '../components/VelocitySkewSection';
import { GridShowcase } from '../components/GridShowcase';
import { ScrollytellingShowcase } from '../components/ScrollytellingShowcase';
import { CosmicJourney } from '../components/CosmicJourney';

export const LandingPage: React.FC = () => {
    return (
        <div>
            <ParallaxHero />
            <BigTextReveal />
            <ScrollytellingShowcase />
            <CosmicJourney />
            <VelocitySkewSection />
            <HorizontalGallery />
            <GridShowcase />
            <PinnedContent />
            <FixedBackgroundStory />
            <AdvancedTransforms />
            <ColorShiftSection />

            <ScrollSection style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                    <ScrollTransform effect="scale">
                        <h2 style={{ fontSize: '3rem', margin: 0 }}>Ready to ship?</h2>
                    </ScrollTransform>
                    <p style={{ color: '#666', marginTop: '20px' }}>MIT License. Built for performance.</p>
                </div>
            </ScrollSection>
        </div>
    );
};
