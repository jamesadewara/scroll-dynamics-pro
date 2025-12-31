import React from 'react';
import { ScrollSection, ScrollTransform } from 'scroll-dynamics-pro';

export const TailwindShowcase: React.FC = () => {
    return (
        <ScrollSection className="py-20 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <ScrollTransform effect="fade">
                    <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Tailwind Compatible
                    </h2>
                    <p className="text-slate-400 text-xl mb-12">
                        Just pass your utility classes to <code>className</code>. It works seamlessly.
                    </p>
                </ScrollTransform>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ScrollTransform effect="skew-velocity" intensity={2}>
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-cyan-500 transition-colors">
                            <div className="h-12 w-12 bg-cyan-500 rounded-lg mb-4 flex items-center justify-center text-2xl">
                                🚀
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Velocity Cards</h3>
                            <p className="text-slate-400">
                                This card skews based on scroll speed. Styled entirely with Tailwind utilities.
                            </p>
                        </div>
                    </ScrollTransform>

                    <ScrollTransform effect="rotate-x" intensity={0.5}>
                        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                            <div className="h-12 w-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center text-2xl">
                                💎
                            </div>
                            <h3 className="text-2xl font-bold mb-2">3D Flips</h3>
                            <p className="text-slate-400">
                                Rotates in 3D space as you scroll. No custom CSS needed.
                            </p>
                        </div>
                    </ScrollTransform>
                </div>
            </div>
        </ScrollSection>
    );
};
