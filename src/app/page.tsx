'use client';
 
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = ({children}:any) => {
  return <div style={{height:"100%"}}>
    {children}
    <video src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr" autoPlay playsInline="" crossorigin="anonymous" style={{width: "100%", height:"100%", objectFit: "cover"}}/>
  </div>
}

export default App;