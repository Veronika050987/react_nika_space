import React, { useState, useEffect } from 'react';

export default function PacketRacegame()
{
    //1. Packet data
    const [incomingPackets, setIncomingPackets] = useState([
        { id: 2, code:"Aliens love pizza! ", label: "Packet #2"},
        { id: 0, code:"🚀 SPACE NEWS: ", label: "Packet #0" },
        { id: 1, code: "👽", label: "Packet #1" },
        { id: 3, code: "🍕", label: "Packet #3" }
    ]);
const [routerBuffer, setRouterBuffer] = useState([]); 

// 2. Timer State (Starts at 15 seconds) 
  const [timeLeft, setTimeLeft] = useState(30);
 
  const [gameActive, setGameActive] = useState(true);
 
 
  // 3. The Countdown Timer Logic 
  useEffect(() => { 
    
// Stop the timer if the game is over or won
 
    
if (!gameActive || timeLeft <= 0) return;
 
 
    // Tick down every 1000ms (1 second) 
    
const timerId = setInterval(() => {
 
      
setTimeLeft((prevTime) => {
 
        if (prevTime <= 1) { 
          
setGameActive(false); // End game when hittng 0
 
          return 0; 
        } 
        return prevTime - 1; 
        }); 
    }, 1000); 
 
    
// Clean up the timer when the component changes
 
return () => clearInterval(timerId);
 
  }, [timeLeft, gameActive]);
 
 
  // Check if packets are correctly sequenced (0 -> 1 -> 2) 
  const isWebpageLoaded =  
    routerBuffer.length === 4 &&  
    routerBuffer[0]?.id === 0 &&  
    routerBuffer[1]?.id === 1 &&
    routerBuffer[2]?.id === 2 && 
    routerBuffer[3]?.id === 3; 
 
  // Stop timer immediately if they win
 
  if (isWebpageLoaded && gameActive) {
 
    setGameActive(false);
  } 
 
  // Handle clicking a packet 
  const selectPacket = (packet) => { 
    
if (!gameActive || timeLeft === 0) return; // Freeze inputs if game is over
 
    setRouterBuffer([...routerBuffer, packet]); 
    setIncomingPackets(incomingPackets.filter(p => p.id !== packet.id)); 
  }; 
 
  // Reset all settngs for a new round
 
  const resetGame = () => { 
    setIncomingPackets([ 
        { id: 2, code:"⭐🌌⭐", label: "Packet #2"},
        { id: 0, code:"🚀 SPACE NEWS", label: "Packet #0" },
        { id: 1, code: "Aliens love pizza!🍕", label: "Packet #1" } 
    ]); 
    setRouterBuffer([]); 
    
setTimeLeft(15);
setGameActive(true);
 }; 
 
  return ( 
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F0FFFF', color: '#ﬀf', 
        borderRadius: '12px', maxWidth: '500px', margin: '0 auto'}}>
            <h2>🌐 Digital packet race</h2>
            <p>Hurry up! Route packets #0, #1 and #2 in order before the connection drops!!!</p>

            {/*Timer display panel*/}
            <div style={{
                padding: '10px 20px',  
                fontSize: '22px',  
                fontWeight: 'bold',  
                borderRadius: '8px',  
                textAlign: 'center', 
                marginBottom: '20px',
                backgroundColor: timeLeft <= 5 ? '#ﬀ4a4a' : '#4ecca3', // Turns red when dangerous 
                color: '#ﬀf'
            }}>
                ⏱️ Time remaining: {timeLeft}s
            </div>

            {/* Incoming packets queue */}
            <h3>📦 Server output buffer</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', minHeight: '50px' }}>
                {incomingPackets.map(packet => (
                    <button
                    key={packet.id}
                    disabled={!gameActive}
                    onClick={() => selectPacket(packet)}
                    style={{
                        padding: '15px',
                        backgroundColor: gameActive ? '#e94560' : '#8B0000',
                        color: '#ﬀf',  
                        border: 'none',  
                        borderRadius: '8px',  
                        cursor: gameActive ? 'pointer' : 'not-allowed',  
                        fontWeight: 'bold'  
                    }}
                    >
                        📬 {packet.label}
                    </button>
                ))}
            </div>

            {/* Router stream */}
            <h3>🛠️ Your router assembly line</h3>
            <div style={{display: 'ﬂex', gap: '10px', minHeight: '50px', backgroundColor: '#ADD8E6', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                { routerBuffer.map((packet, index) => (
                <div key={index} style={{ padding: '10px', backgroundColor: '#87CEEB', borderRadius: '5px', fontWeight: 'bold' }}>
                    { packet.label }
                </div>
                ))}
            </div>

            { /* Live browser window */}
            <h3>🖥️ User's web browser</h3>

            <div style={{ padding: '20px', border: '3px solid #4ecca3', borderRadius: '8px', backgroundColor: '#ﬀf', 
            color: '#333', minHeight: '80px', display: 'ﬂex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            
            { isWebpageLoaded ? (
                <div style={{ color: '#2b2b2b', fontSize: '20px', textAlign: 'center' }}>
                    🏆 Success! Webpage loaded!!! <br/>
                    <span style={{ color: '#0f3460' }}>{routerBuffer.map(p => p.code).join(" ")}</span>                    
                </div>
            ) : timeLeft === 0 ? (
                <div style={{ color: '#ﬀ4a4a', textAlign: 'center' }}>
                    🚨 CONNECTION TIMEOUT!<br />The packets took too long to arrive.
                </div>
            ) : (
                <div style={{ color: '#777', textAlign: 'center' }}>
                    ⌛ Waiting for clean data stream... (Error 404) 
                </div>
            )}
            </div>

            <button onClick={resetGame} style={{ marginTop: '25px', width: '100%', padding: '12px', 
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: '#B0E0E6', 
            color: '#1a1a2e' }}>
                🔄 Reboot router
            </button>
    </div>
  );
} 