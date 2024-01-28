import styled from 'styled-components';

  const Container = styled.div`
    padding: 20px;
  `;

  const Title = styled.h2`
    font-size: 24px;
    color: #333;
  `;

  const Paragraph = styled.p`
    font-size: 16px;
    color: #666;
  `;

  function Home() {
    return (
      <Container>
        <Title>Home View</Title>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adip.</Paragraph>
      </Container>
    );
  }

  export default Home;
