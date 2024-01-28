import React, { useState, useEffect, useRef } from 'react';
import './Styling/SoloGame.css';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styled from 'styled-components';
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import Model from './Model';

const Pose = styled.div`
    font-size: 3rem;
    color: ${props => props.success ? 'green' : 'red'};
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
`;

const Points = styled.div`
    font-size: 5rem;
    color: #ffff;
    position: absolute;
    top: 5%;
    right: 5%;
`;

const SoloGame = () => {
    const [walls, setWalls] = useState([{ id: 1, size: 10 }]);
    const [isGrowing, setIsGrowing] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const [wallSpeed, setSpeed] = useState(12)
    const WS_URL = "ws://127.0.0.1:5555";
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);
    const [currentPose, setCurrentPose] = useState('');
    const [poseList, setPoseList] = useState(["T Pose", "T + Knee Pose", "Flex Pose"]);
    const [success, setSuccess] = useState(false);
    const { trackId } = useParams();
    //onst wallSpeed = 12;
    const audioRef = useRef();
    const [initialWallCreated, setInitialWallCreated] = useState(false);
    const numImage = 2;
    const webcamRef = useRef(null);
    const [points, setPoints] = useState(0);

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
                setSpeed((prevSpeed) => prevSpeed + 2);
                setCountdown(10);
                setIsGrowing(true);
                setSuccess(false);
                if (lastJsonMessage?.label === currentPose) {
                    setPoints((prevPoints) => prevPoints + 1);
                }
            }, 3000);
        }
    }, [walls, setSpeed]);

    return (
        <div className="sologame">
            {
                // readyState === ReadyState.OPEN
                true
                    ? 
                    <>
                    
                    <Points>{points} pts</Points>
                    {!isGrowing && (
                        <Pose success={success}>{success ? (
                            <>
                                <p>{["Good Job", "You Did It", "New High Score?"][Math.floor(Math.random() * 3)]}</p>
                            </>
                        ) : (
                            <>
                                <p>Good Try</p>
                            </>
                        )}</Pose>
                    )}
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
                            <button onClick={toggleMusic}>Toggle Music</button>
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
