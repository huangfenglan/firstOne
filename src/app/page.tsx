'use client';

import React from 'react';

const App: React.FC = ({ children }: any) => {
    return (
        <div style={{ height: '100%' }}>
            {children}
            <video
                src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                autoPlay
                playsInline
                crossOrigin="anonymous"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
};

export default App;
