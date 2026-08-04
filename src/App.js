import logo from './logo.svg';
import './App.css';
import React from 'react';
import PacketRaceGame from './PacketRaceGame';

function App() {
  return (
    <div style={{ 
      boxSizing: 'border-box',
        backgroundColor: '#0f0f1a', 
        minHeight: '100vh', 
        maxWidth: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px',
        overflow: 'hidden' 
 }}> 
    <PacketRaceGame /> 
    </div> 
 ); 
}

export default App;
