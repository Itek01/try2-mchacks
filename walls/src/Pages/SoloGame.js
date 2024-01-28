import React, { useState, useEffect, useRef } from 'react';
import './Styling/SoloGame.css';
import { useParams, useNavigate} from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styled from 'styled-components';
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import Model from './Model';

const Pose = styled.div`
    font-size: 3rem;
    color: ${props => props.success ? 'green' : 'red'};
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
`;

const SoloGame = () => {
    const [walls, setWalls] = useState([{ id: 1, size: 10 }]);
    const [isGrowing, setIsGrowing] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const WS_URL = "ws://127.0.0.1:5555";
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);
    const [currentPose, setCurrentPose] = useState('');
    const [poseList, setPoseList] = useState(["T Pose", "T Pose + Knee", "Flex Pose"]);
    const [success, setSuccess] = useState(false);
    const { trackId } = useParams();
    const wallSpeed = 12;
    const audioRef = useRef();
    const [initialWallCreated, setInitialWallCreated] = useState(false);
    const numImage = 2;
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const toggleMusic = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const getRandomImagePath = () => {
        const randomId = Math.floor(Math.random() * numImage) + 1;
        return require(`./Images/pose${randomId}.jpg`);
    };

    const handleBackToMenu = () => {
        // Navigate back to the menu page when the button is clicked
        navigate('/choosetrack'); // Replace '/menu' with the actual URL of your menu page
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((e) => {
                console.error("Playback failed:", e);
            });
        }
        // const countdownInterval = setInterval(() => {
        //     setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : 0);
        // }, 1000);
        // return () => clearInterval(countdownInterval);
    }, []);


    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            setCurrentPose(poseList[Math.floor(Math.random() * poseList.length)]);
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [readyState]);

    useEffect(() => {
        if (lastJsonMessage?.label === currentPose) {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    }, [lastJsonMessage, currentPose]);

    useEffect(() => {
        if (!initialWallCreated) {
            setWalls([{ id: 1, size: 10, imageId: getRandomImagePath() }]);
            setInitialWallCreated(true);
        }
    }, [initialWallCreated]);

    useEffect(() => {
        if (isGrowing) {
            const interval = setInterval(() => {
                setWalls((currentWalls) => {
                    return currentWalls.map(wall => {
                        return wall.size < 1000
                            ? { ...wall, size: wall.size + wallSpeed }
                            : wall;
                    });
                });
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isGrowing]);

    useEffect(() => {
        const lastWall = walls[walls.length - 1];
        if (lastWall.size >= 1000) {
            setIsGrowing(false);
            setTimeout(() => {
                setWalls((currentWalls) => {
                    const newWalls = currentWalls.slice(1);
                    const newImageId = getRandomImagePath();
                    newWalls.push({ id: lastWall.id + 1, size: 10, imageId: newImageId });
                    return newWalls;
                });
                setCountdown(10);
                setIsGrowing(true);
                setSuccess(false);
            }, 3000);
        }
    }, [walls]);

    return (
        <div className="sologame">
            <button className="back-to-menu-button" onClick={handleBackToMenu}>
                Back to Menu
            </button>
            {
                // readyState === ReadyState.OPEN
                true
                    ? 
                    <>
                    <div className="countdown">{countdown}</div>
                        <Pose success={success}>{currentPose}</Pose>
                        <div className="walls-container">
                            {walls.map((wall, index) => (
                                <div
                                    key={wall.id}
                                    className="wall"
                                    style={{
                                        zIndex:2,
                                        width: wall.size,
                                        height: wall.size / 1.5,
                                        backgroundImage: `url(${wall.imageId})`
                                    }}
                                >
                                </div>
                            ))}
                            
                        </div>
                        <Webcam
                            style={{
                                position: 'absolute',
                                zIndex: '-1',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                        <div className="controls">
                            <audio ref={audioRef} src={require(`./Sounds/Track${trackId}.mp3`)} preload="auto" loop onError={(e) => console.log('Error loading audio:', e)} />
                            <button onClick={toggleMusic} className='togglemusic'> Pause/Play</button>
                        </div>
                    </>
                    : 
                    <Rings
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
            }
        </div>
    );
};

export default SoloGame;
