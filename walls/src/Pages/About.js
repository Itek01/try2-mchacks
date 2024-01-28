import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #666;
`;

const About = () => {
    return (
        <Container>
            <Title>About Page</Title>
            <Description>This is a test About page.</Description>
        </Container>
    );
};

export default About;
