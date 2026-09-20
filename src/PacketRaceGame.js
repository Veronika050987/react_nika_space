import React, { useState, useEffect } from 'react';
import monster from './img/monster.png';
import monster2 from './img/monster2.png';
import shevron from './img/shevron.png';
import box from './img/box.png';
import envelope from './img/envelope.png';
import alarm from './img/alarm.png';
import str from './img/str.png';
import ship from './img/ship.png';
import marsik from './img/marsik.png';
import pizza from './img/pizza.png';
import './PacketRaceGame.css';


const translations = {
     "Aliens love pizza! ": {
        "ru" : "Инопланетяне любят пиццу! ",
        "fr" : "Les extraterrestres adorent la pizza ! "
    },
    "Space news:": {
        "ru" : "Космические новости: ",
        "fr" : "Les nouvelles de l'espace"
    },
    "Packet #2": {
        "ru" : "Пакет #2",
        "fr" : "Paquet #2"
    },
    "Packet #0": {
        "ru" : "Пакет #0",
        "fr" : "Paquet #0"
    },
    "Packet #1": {
        "ru" : "Пакет #1",
        "fr" : "Paquet #1"
    },
    "Packet #3": {
        "ru" : "Пакет #3",
        "fr" : "Paquet #3"
    },
    "Digital packet race": {
        "ru" : "Гонка цифровых пакетов",
        "fr" : "Course des paquets numériques"
    },
    "Hurry up! Route packets in order before the connection drops!": {
        "ru" : "Поспеши! Расставь пакеты по порядку до прерывания соединения!",
        "fr" : "Dépêche-toi, mets en ordre les paquets avant la déconnection!"
    },
    "Time remaining": {
        "ru" : "Осталось времени",
        "fr" : "Temp restant"
    },
    "s": {
        "ru" : "с",
        "fr" : "sec"
    
    },
    "Server output buffer": {
        "ru" : "Выходной буфер сервера",
        "fr" : "Buffer de sortie du serveur"
    },
    "Your router assembly line": {
        "ru" : "Сборочная линия роутера",
        "fr" : "Ligne de montage du serveur"
    },
    "User's web browser": {
        "ru" : "Веб браузер пользователя",
        "fr" : "Web navigateur du l'utilisateur"
    },
    "408 Request Time-out. The packets took too long to arrive.": {
        "ru" : "408 Истекло время ожидания запроса пакетов",
        "fr" : "408 Request Time-out. Les paquets ont pris trop de temps à arriver."
    },
    "Error 400: Bad Request (Invalid packet order)": {
        "ru" : "Ошибка 400: неверный запрос (Нарушен порядок пакетов)",
        "fr" : "Erreur 400: Bad Request (Ordre des paquets invalide)"
    },
    "(Error 404) The page doesn't exist or not found...": {
        "ru" : "(Ошибка 404) Страница не существует или не найдена...",
        "fr" : "(Error 404) La page n'existe pas ou n'est pas trouvée..."
    },
    "Reboot router": {
        "ru" : "Перезагрузить роутер",
        "fr" : "Redémarrer le routeur"
    },
    "SUCCESS! Webpage loaded!": {
        "ru" : "УСПЕХ! Веб страница загружена!",
        "fr" : "SUCCÈS ! Page web chargée !"
    } 
};

export default function PacketRaceGame()
{
    const [language, setLanguage] = useState('ru');

    //1. Packet data
    const [incomingPackets, setIncomingPackets] = useState([
        { id: 2, code:"Aliens love pizza! ", label: "Packet #2"},
        { id: 0, code:"Space news:", src: ship, label: "Packet #0" },
        { id: 1, code: "", src: marsik, label: "Packet #1" },
        { id: 3, code: "", src: pizza, label: "Packet #3" }
    ]);

    const t = (text) => {
        if (language === 'en') return text; // Для английского возвращаем сам ключ
        return translations[text]?.[language] || text; // Для остальных берем значение из словаря
    };

    const [routerBuffer, setRouterBuffer] = useState([]); 

// 2. Timer State (Starts at 30 seconds) 
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
        { id: 0, code:"Space news:", src: ship, label: "Packet #0" },
        { id: 1, code: "", src: marsik, label: "Packet #1" },
        { id: 3, code: "", src: pizza, label: "Packet #3" }
    ]); 
    setRouterBuffer([]); 
    setBrowserMessage(""); 
    setTimeLeft(30);
    setGameActive(true);
 }; 

 // Функция для циклического переключения языков ru -> en -> fr -> ru
    const toggleLanguage = () => {
        if (language === 'ru') setLanguage('en');
        else if (language === 'en') setLanguage('fr');
        else setLanguage('ru');
    };
 
    // Текст для отображения текущего выбранного языка на кнопке
    const getLanguageButtonLabel = () => {
        if (language === 'ru') return "Русский";
        if (language === 'en') return "English";
        return "Français";
    };
 
  return ( 
    <div className='form'>
            <button className='language' onClick={toggleLanguage}>
                {getLanguageButtonLabel()}
            </button>
      
            <h2 className='aliens'>
                <img src={monster} width={56} height={78} alt="Alien"/> 
                {t("Digital packet race")}
                <img src={monster2} width={66} height={66} alt="Alien2"/> 
            </h2>
            <p className='hurry'>
                {t("Hurry up! Route packets in order before the connection drops!")}
            </p>

            {/*Timer display panel*/}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                {t("Time remaining")}: {timeLeft}{t("s")}
            </div>

            {/* Incoming packets queue */}
            <h3 className='server'>
                <img src={box} width={45} height={45} alt="Box"/>
                {t("Server output buffer")}
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
                        <img src={envelope} width={25} height={15} alt="Box"/> {t(packet.label)}
                    </button>
                ))}
            </div>

            {/* Router stream */}
            <h3 className='router'>
                <img src={shevron} width={30} height={30} alt="Shevron"/> 
                {t("Your router assembly line")}
            </h3>
            <div className='router-buffer'>
                { routerBuffer.map((packet, index) => (
                <div key={index} className='buffer'>
                    { t(packet.label) }
                </div>
                ))}
            </div>

            { /* Live browser window */}
            <h3 className='browser'>
                🖥️ {t("User's web browser")}
            </h3>

            <div className='browser-buffer'>
            
            { isWebpageLoaded ? (
                <div className='success'>
                    🏆 {t("SUCCESS! Webpage loaded!")} <br/>
                    <span style={{ 
                        color: '#228B22', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px', 
                        flexWrap: 'wrap',
                        justifyContent: 'center' 
                        }}>
                        {routerBuffer.map((p, idx) => (
                    <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {p.src && (
                        <img 
                            src={p.src} 
                            alt="Space News Icon" 
                            style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle' }} 
                        />
                    )}
                    {t(p.code)}
                    </span>
                ))}
                </span>                   
                </div>
            ) : timeLeft === 0 ? (
                <div className='no-time'>
                    {t("408 Request Time-out. The packets took long to arrive.")}
                </div>
            ) : (
                <div className='load'>
                    { browserMessage ? (
                    <span style={{ color: '#FF4500', fontWeight: 'bold' }}>{t(browserMessage)}</span>
                ) : (
                    t("(Error 404) The page doesn't exist or not found...")
                )}
                </div>
            )}
            </div>

            <button onClick={resetGame} className='reset'>
                <img src={str} width={30} height={40} alt="str"/>
                {t("Reboot router")}
            </button>
    </div>
  );
} 