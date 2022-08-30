import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "../Context/RouterContext";
import useInput from "../Hooks/useInput";
import Icon from "./Icon";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-direction: ${(props) =>
    props.layout === "portrait" ? "column" : "row"};
`;

const ResultImage = styled.div`
  position: relative;
  width: ${(props) => props.size * 9}px;
  height: ${(props) => props.size * 9}px;
  overflow: hidden;
  border: 2px solid white;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: -${(props) => props.left}px;
  width: ${(props) => props.canvasSize.width}px;
  height: ${(props) => props.canvasSize.height}px;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.size * 9}px;
  height: ${(props) => props.size * 9}px;
  overflow: hidden;
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.verticalAlign};
  align-items: ${(props) => props.horizontalAlign};
  text-align: ${(props) => {
    if (props.horizontalAlign === "flex-start") {
      return "left";
    } else if (props.horizontalAlign === "flex-end") {
      return "right";
    } else {
      return "center";
    }
  }};
  padding: 16px;
  word-break: break-word;
  font-family: "Black Han Sans", sans-serif;
  letter-spacing: 2px;
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  text-shadow: ${(props) => `
      -1px -1px 0 ${props.shadow},
      1px -1px 0 ${props.shadow},
      -1px 1px 0 ${props.shadow},
      1px 1px 0 ${props.shadow} 
    `};
`;

const Controls = styled.div`
  width: ${(props) => props.size * 9}px;
  height: ${(props) => props.size * 9}px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  height: max-content;
  min-height: 40px;
  gap: 8px;
  font-size: 20px;
`;

const RowTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
`;

const RowItem = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const IconArea = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  color: black;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background-color: yellow;
    cursor: pointer;
  }
`;

const LongButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background-color: yellow;
    cursor: pointer;
  }
`;

const Upload = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(241, 242, 243, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img``;

const New = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: 40 * 16,
    height: 40 * 9,
  });
  const [resultSize, setResultSize] = useState(40);
  const [verticalAlign, setVerticalAlign] = useState("center");
  const [horizontalAlign, setHorizontalAlign] = useState("center");
  const [uploading, setUploading] = useState(false);

  const resultRef = useRef();
  const canvasRef = useRef();
  const { layout } = useRouter();

  const fontSizeInput = useInput("16");
  const canvasLeftInput = useInput(((16 - 9) * resultSize) / 2);
  const colorInput = useInput("#000000");
  const shadowInput = useInput("#ffffff");

  useEffect(() => {
    if (layout === "portrait") {
      setCanvasSize({
        width: 40 * 16,
        height: 40 * 9,
      });
      setResultSize(40);
    } else {
      setCanvasSize({
        width: 36 * 16,
        height: 36 * 9,
      });
      setResultSize(36);
    }
  }, [layout]);

  useEffect(() => {
    if (uploading) {
      setTimeout(() => {
        if (canvasRef.current && resultRef.current) {
          html2canvas(resultRef.current).then(async (c) => {
            // get url
            const response = await fetch("http://localhost:3000/s3Url");
            const { url } = await response.json();

            // 이미지 처리
            const imgData = c.toDataURL("image/png");
            const blob = atob(imgData.split(",")[1]);
            const array = [];
            for (let i = 0; i < blob.length; i++) {
              array.push(blob.charCodeAt(i));
            }
            const file = new Blob([new Uint8Array(array)], {
              type: "image/png",
            });

            // 이미지 전송
            await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "image/png",
              },
              body: file,
            });

            console.log(url.split("?")[0]);
            // const link = document.createElement("a");
            // link.href = imgData;
            // link.download = "image.png";
            // link.click();
            setUploading(false);
          });
        }
      }, 200);
      // const imgData = canvasRef.current.toDataURL("image/png");
      // const link = document.createElement("a");
      // link.href = imgData;
      // link.download = "image.png";
      // link.click();
      //   const blob = atob(imgData.split(",")[1]);
      //   const array = [];
      //   for (let i = 0; i < blob.length; i++) {
      //     array.push(blob.charCodeAt(i));
      //   }
      //   const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      //   const formdata = new FormData();
      //   formdata.append("file", file);
    }
  }, [uploading]);

  function handleAlign(direction, value) {
    if (direction === "vertical") {
      setVerticalAlign(value);
    } else {
      setHorizontalAlign(value);
    }
  }

  function handleCapture() {
    const video = document.querySelector("video");
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(video, 0, 0, canvasSize.width, canvasSize.height);
    }
  }

  function handleSave() {
    setUploading(true);
    if (canvasRef.current && resultRef.current) {
      // html2canvas(resultRef.current).then((c) => {
      //   const imgData = c.toDataURL("image/png");
      //   const link = document.createElement("a");
      //   link.href = imgData;
      //   link.download = "image.png";
      //   link.click();
      //   setUploading(false);
      // });
      // const imgData = canvasRef.current.toDataURL("image/png");
      // const link = document.createElement("a");
      // link.href = imgData;
      // link.download = "image.png";
      // link.click();
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
      <ResultImage size={resultSize} ref={resultRef}>
        <Canvas
          canvasSize={canvasSize}
          resultSize={resultSize}
          width={canvasSize.width}
          height={canvasSize.height}
          left={canvasLeftInput.value}
          ref={canvasRef}
        ></Canvas>
        <TextWrapper size={resultSize}>
          <Text
            contentEditable="true"
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            fontSize={fontSizeInput.value}
            color={colorInput.value}
            shadow={shadowInput.value}
            horizontalAlign={horizontalAlign}
            verticalAlign={verticalAlign}
          />
        </TextWrapper>
      </ResultImage>
      <Controls size={resultSize}>
        <Row>
          <RowTitle>Image</RowTitle>
        </Row>
        <Row>
          <Button onClick={handleCapture}>Screenshot</Button>
          <RowItem>
            <input
              type="range"
              min="0"
              max={resultSize * (16 - 9)}
              {...canvasLeftInput}
            ></input>
          </RowItem>
        </Row>
        <Row>
          <RowTitle>Text</RowTitle>
        </Row>
        <Row>
          <RowItem>
            <input type="number" min="16" max="32" {...fontSizeInput}></input>
            <span>px</span>
          </RowItem>
          <RowItem>
            <input type="color" {...colorInput}></input>
          </RowItem>
          <RowItem>
            <input type="color" {...shadowInput}></input>
          </RowItem>
          <RowItem>
            <IconArea
              onClick={() => {
                handleAlign("horizontal", "flex-start");
              }}
            >
              <Icon.Left />
            </IconArea>
            <IconArea
              onClick={() => {
                handleAlign("horizontal", "center");
              }}
            >
              <Icon.Center />
            </IconArea>
            <IconArea
              onClick={() => {
                handleAlign("horizontal", "flex-end");
              }}
            >
              <Icon.Right />
            </IconArea>
            <IconArea
              onClick={() => {
                handleAlign("vertical", "flex-start");
              }}
            >
              <Icon.Top />
            </IconArea>
            <IconArea
              onClick={() => {
                handleAlign("vertical", "center");
              }}
            >
              <Icon.Middle />
            </IconArea>
            <IconArea
              onClick={() => {
                handleAlign("vertical", "flex-end");
              }}
            >
              <Icon.Bottom />
            </IconArea>
          </RowItem>
        </Row>
        <Row>
          <LongButton onClick={handleSave}>Save</LongButton>
        </Row>
      </Controls>
      {uploading && (
        <Upload>
          <Loader src={chrome.runtime.getURL("/resources/loader.gif")} />
        </Upload>
      )}
    </Wrapper>
  );
};

export default New;
