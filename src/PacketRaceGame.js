import React, { useState, useEffect } from 'react';
import monster from './img/monster.png';
import monster2 from './img/monster2.png';
import ship from './img/ship.png';
import shevron from './img/shevron.png';
import box from './img/box.png';
import envelope from './img/envelope.png';
import alarm from './img/alarm.png';
import sand from './img/sand.png';
import arrow2 from './img/arrow2.png';
import './PacketRaceGame.css';

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

  const [browserMessage, setBrowserMessage] = useState("");

  // Stop timer immediately if they win
 
  if (isWebpageLoaded && gameActive) {
 
    setGameActive(false);
  } 
 
  // Handle clicking a packet 
  const selectPacket = (packet) => { 
    
if (!gameActive || timeLeft === 0) return; // Freeze inputs if game is over
 
    const expectedId = routerBuffer.length; 

    if (packet.id !== expectedId) {
        setBrowserMessage("Error 400: Bad Request (Invalid packet order)");
        return; // Прерываем выполнение, пакет не добавляется
    }

    setBrowserMessage("");
    setRouterBuffer([...routerBuffer, packet]); 
    setIncomingPackets(incomingPackets.filter(p => p.id !== packet.id)); 
  }; 
 
  // Reset all settngs for a new round
 
  const resetGame = () => { 
    setIncomingPackets([ 
        { id: 2, code:"Aliens love pizza! ", label: "Packet #2"},
        { id: 0, code:"🚀 SPACE NEWS: ", label: "Packet #0" },
        { id: 1, code: "👽", label: "Packet #1" },
        { id: 3, code: "🍕", label: "Packet #3" } 
    ]); 
    setRouterBuffer([]); 

    setBrowserMessage(""); 
    
    setTimeLeft(30);
    setGameActive(true);
 }; 
 
  return ( 
    <div className='form'>
            <h2 className='aliens'>
                <img src={monster} width={56} height={78} alt="Alien"/> 
                Digital packet race
                <img src={monster2} width={66} height={66} alt="Alien2"/> 
            </h2>
            <p className='hurry'>
                Hurry up! Route packets in order before the connection drops!
            </p>

            {/*Timer display panel*/}
            <div style={{
                padding: '10px 20px',  
                fontSize: '22px',  
                fontWeight: 'bold',  
                borderRadius: '8px',  
                textAlign: 'center', 
                marginBottom: '20px',
                backgroundColor: timeLeft <= 5 ? '#DC143C' : '#4ecca3', // Turns red when dangerous 
                color: timeLeft <= 5 ? '#F0F8FF' : '#191970'
            }}>
                <img src={alarm} width={21} height={29} alt="Alarm"/> 
                Time remaining: {timeLeft}s
            </div>

            {/* Incoming packets queue */}
            <h3 className='server'>
                <img src={box} width={45} height={45} alt="Box"/>
                Server output buffer
            </h3>
            <div className='packets'>
                {incomingPackets.map(packet => (
                    <button
                    key={packet.id}
                    disabled={!gameActive}
                    onClick={() => selectPacket(packet)}
                    className='packets-key'
                    style={{
                        padding: '15px',
                        backgroundColor: gameActive ? '#FFD700' : '#8B0000',
                        color: gameActive ? '#191970' : '#F0F8FF',  
                        border: 'none',  
                        borderRadius: '8px',  
                        cursor: gameActive ? 'pointer' : 'not-allowed',  
                    }}
                    >
                        <img src={envelope} width={28} height={18} alt="Box"/> {packet.label}
                    </button>
                ))}
            </div>

            {/* Router stream */}
            <h3 className='router'>
                <img src={shevron} width={32} height={32} alt="Shevron"/> 
                Your router assembly line
            </h3>
            <div className='router-buffer'>
                { routerBuffer.map((packet, index) => (
                <div key={index} className='buffer'>
                    { packet.label }
                </div>
                ))}
            </div>

            { /* Live browser window */}
            <h3 className='browser'>
                🖥️ User's web browser
            </h3>

            <div className='browser-buffer'>
            
            { isWebpageLoaded ? (
                <div className='success'>
                    🏆 SUCCESS! Webpage loaded!!! <br/>
                    <span style={{ color: '#228B22' }}>{routerBuffer.map(p => p.code).join(" ")}</span>                    
                </div>
            ) : timeLeft === 0 ? (
                <div className='no-time'>
                    <img src={ship} width={31} height={42} alt="Ship"/>
                    408 Request Time-out. The packets took too long to arrive.
                    <img src={ship} width={31} height={42} alt="Ship"/>
                </div>
            ) : (
                <div className='load'>
                    <img src={sand} width={30} height={34} alt="Sand"/> 
                    { browserMessage ? (
                    <span style={{ color: '#FF4500', fontWeight: 'bold' }}>{browserMessage}</span>
                ) : (
                    "(Error 404) The page doesn't exist or not found..."
                )}
                </div>
            )}
            </div>

            <button onClick={resetGame} className='reset'>
                <img src={arrow2} width={23} height={25} alt="Arrow2"/>
                Reboot router
            </button>
    </div>
  );
} 