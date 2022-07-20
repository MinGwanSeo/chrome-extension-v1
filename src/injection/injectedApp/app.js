import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  border: white 2px solid;
`;

const Button = styled.div`
  border: 4px solid red;
  background-color: white;
  color: red;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const App = () => {
  const canvasRef = useRef();
  return (
    <Wrapper>
      <Canvas width="300" height="200" ref={canvasRef}></Canvas>
      <Button
        onClick={() => {
          const video = document.querySelector("video");
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.drawImage(video, 0, 0, 300, 200);
          }
          console.log(video);
        }}
      >
        capture
      </Button>
    </Wrapper>
  );
};

export default App;
