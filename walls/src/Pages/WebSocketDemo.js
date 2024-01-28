import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    const WS_URL = "ws://127.0.0.1:5555"
    const [message, setMessage] = useState('');
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL)
  
    // Run when the connection state (readyState) changes
    useEffect(() => {
      console.log("Connection state changed")
      if (readyState === ReadyState.OPEN) {
        console.log("WebSocket connection is open")
      }
    }, [readyState])
  
    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
      console.log(`Got a new message: ${lastJsonMessage}`)
    }, [lastJsonMessage])

    return (
        <div>
          <h1>WebSocket Component</h1>
          <p>WebSocket Status: {ReadyState[readyState]}</p>
    
          {/* Add your UI elements to display or send data */}
          <button onClick={() => sendJsonMessage({ action: 'custom_action', data: 'Custom message' })}>
            Send Message
          </button>
          <p>Last Message: {message}</p>
        </div>
      );
};