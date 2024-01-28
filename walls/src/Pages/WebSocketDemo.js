import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    const WS_URL = "ws://127.0.0.1:5555"
    const [message, setMessage] = useState('');
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL)
    const [countdown, setCountdown] = useState(5); // Initial countdown value
    const [currentPose, setCurrentPose] = useState(''); // Current pose state
    const [poseList, setPoseList] = useState(["T Pose", "T Pose + Knee", "Flex Pose"]); // List of poses to display on the screen
    const [success, setSuccess] = useState(false); // Whether the pose was successful or not

    // Run when the connection state (readyState) changes
    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            console.log("WebSocket connection is open")
            setCurrentPose(poseList[Math.floor(Math.random() * poseList.length)]) // Set the initial pose

            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
    
            return () => {
                clearInterval(timer);
            };
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        console.log(`Got a new message: ${lastJsonMessage?.toString()}`)
        if (lastJsonMessage === currentPose) {
            // Pose matches, go to next pose
            console.log("Pose matched, go to next pose")
            // Implement logic to go to the next pose here
        }
    }, [lastJsonMessage, currentPose])

    // Run on component mount
    useEffect(() => {
       
    }, []);

    // Run when countdown reaches 0
    useEffect(() => {
        if (countdown === 0) {
            // Implement logic to display the poses on the screen
            console.log("Countdown finished, display poses on the screen")
            setCurrentPose(poseList[Math.floor(Math.random() * poseList.length)]); // Set another pose
            setSuccess(false); // Reset the success state
            setCountdown(5); // Reset the countdown
        }
    }, [countdown]);
    
  
    // Run when the connection state (readyState) changes
    useEffect(() => {
      console.log("Connection state changed")
      if (readyState === ReadyState.OPEN) {
        console.log("WebSocket connection is open")
      }
    }, [readyState])
  
    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
      console.log(`Got a new message: ${lastJsonMessage?.toString()}`)
    }, [lastJsonMessage])

    return (
        <div>
          <h1>WebSocket Component</h1>
          <p>WebSocket Status: {ReadyState[readyState]}</p>
    
          {/* Add your UI elements to display or send data */}
          <p>Countdown: {countdown}</p> {/* Display the countdown */}
            <p>Current Pose: {currentPose}</p> {/* Display the current pose */}
          <p>Last Message: {message}</p>
          <p>success status: {success}</p>
        </div>
      );
};