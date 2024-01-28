import React, {useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import {drawKeypoints, drawSkeleton} from './../utlities/utilities';


const WebcamStyled = styled(Webcam)`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9;
    width: 640px;
    height: 480px;
`;

const CanvasStyled = styled.canvas`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9;
    width: 640px;
    height: 480px;
`;

const CenteredDiv = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Model() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Load posenet
    const runPosenet = async () => {
        const net = await posenet.load({
            inputResolution: {width: 640, height: 480},
            scale: 0.5,
        });
        setInterval(() => {
            detect(net);
        }, 100);
    };

    const detect = async (net) => { 
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Make Detections
            const pose = await net.estimateSinglePose(video);
            // console.log(pose);

            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        }
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.current.getContext("2d");
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;

        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
    }

    runPosenet();
    
    return (
        <CenteredDiv>
            <WebcamStyled ref={webcamRef}/>
            <CanvasStyled ref={canvasRef}/>
        </CenteredDiv>
    );
}

export default Model;
