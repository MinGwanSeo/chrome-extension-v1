import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { close } from "../../appController";
import { useLayout } from "../Context/LayoutContext";
import Icon from "./Icon";

const portraitCSS = css`
  width: 100%;
  height: 720px;
  flex-direction: column;
`;

const landscapeCSS = css`
  width: 100%;
  height: 400px;
  flex-direction: row;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c2c7c7;
  opacity: ${(props) => (props.layout ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  ${(props) => (props.layout === "portrait" ? portraitCSS : landscapeCSS)};
`;

const Canvas = styled.canvas`
  border: white 2px solid;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.div`
  background-color: white;
  color: black;
  padding: 8px 24px;
  margin: 8px;
  font-size: 24px;
  &:hover {
    background-color: yellow;
    cursor: pointer;
  }
`;

const CloseArea = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const Main = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: 384,
    height: 216,
  });
  const canvasRef = useRef();
  const { layout } = useLayout();

  useEffect(() => {
    if (layout === "portrait") {
      setCanvasSize({
        width: 384,
        height: 216,
      });
    } else {
      setCanvasSize({
        width: 640,
        height: 360,
      });
    }
  }, [layout]);

  function handleCapture() {
    const video = document.querySelector("video");
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(video, 0, 0, canvasSize.width, canvasSize.height);
    }
  }

  function handleSave() {
    if (canvasRef.current) {
      const imgData = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "image.png";
      link.click();
      //   const blob = atob(imgData.split(",")[1]);
      //   const array = [];
      //   for (let i = 0; i < blob.length; i++) {
      //     array.push(blob.charCodeAt(i));
      //   }
      //   const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      //   const formdata = new FormData();
      //   formdata.append("file", file);
    }
  }

  return (
    <Wrapper layout={layout}>
      <CloseArea
        onClick={() => {
          close();
        }}
      >
        <Icon.Close />
      </CloseArea>
      <Canvas
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
      ></Canvas>
      <Buttons>
        <Button onClick={handleCapture}>Capture</Button>
        <Button onClick={handleSave}>Save</Button>
      </Buttons>
    </Wrapper>
  );
};

export default Main;
