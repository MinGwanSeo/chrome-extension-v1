import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as htmlToImage from "html-to-image";
import { useResult } from "../Context/ResultContext";
import { useRouter } from "../Context/RouterContext";
import useInput from "../Hooks/useInput";
import { getYoutubeVideo } from "../util";
import Icon from "./Icon";

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  min-width: 100%;
  height: max-content;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  gap: 24px;
  flex-direction: ${(props) =>
    props.layout === "portrait" ? "column" : "row"};
`;

const ResultImage = styled.div`
  position: relative;
  width: ${40 * 9}px;
  height: ${40 * 9}px;
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
  width: ${40 * 9}px;
  height: ${40 * 9}px;
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
  width: ${40 * 9}px;
  height: ${40 * 9}px;
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
  border: 1px solid #000000;
  &:hover {
    background-color: #d8d8d8;
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
  border: 1px solid #000000;
  &:hover {
    background-color: #d8d8d8;
    cursor: pointer;
  }
`;

const Upload = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img``;

const New = () => {
  const canvasSize = {
    width: 40 * 16,
    height: 40 * 9,
  };

  const [verticalAlign, setVerticalAlign] = useState("center");
  const [horizontalAlign, setHorizontalAlign] = useState("center");
  const [isCaptured, setIsCaptured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  const canvasRef = useRef();
  const textRef = useRef();
  const { layout, back, videoId } = useRouter();
  const { uploadImage } = useResult();

  const fontSizeInput = useInput("16");
  const canvasLeftInput = useInput(((16 - 9) * 40) / 2);
  const colorInput = useInput("#000000");
  const shadowInput = useInput("#ffffff");

  useEffect(() => {
    if (uploading) {
      setTimeout(() => {
        if (canvasRef.current && textRef.current) {
          htmlToImage
            .toCanvas(textRef.current, {
              backgroundColor: null,
              width: 360,
              height: 360,
            })
            .then(async (c) => {
              const resultCanvas = document.createElement("canvas");
              resultCanvas.width = 360;
              resultCanvas.height = 360;
              const resultCtx = resultCanvas.getContext("2d");
              // 스크린샷 렌더링
              resultCtx.drawImage(
                canvasRef.current,
                canvasLeftInput.value,
                0,
                360,
                360,
                0,
                0,
                360,
                360
              );
              // 텍스트 렌더링
              resultCtx.drawImage(c, 0, 0, 720, 720, 0, 0, 360, 360);

              // 이미지 처리
              const imgData = resultCanvas.toDataURL("image/png");
              const blob = atob(imgData.split(",")[1]);
              const array = [];
              for (let i = 0; i < blob.length; i++) {
                array.push(blob.charCodeAt(i));
              }
              const file = new Blob([new Uint8Array(array)], {
                type: "image/png",
              });

              // 업로드 로직
              const { result, reason } = await uploadImage({
                videoId: videoId,
                time: videoTime,
                file: file,
              });

              if (result === "success") {
                back();
              } else if (result === "fail") {
                setUploading(false);
                console.log(reason);
              }
            });
        }
      }, 200);
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
    const video = getYoutubeVideo();
    if (canvasRef.current && video) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(video, 0, 0, canvasSize.width, canvasSize.height);
      const newVideoTime = video.currentTime;
      setVideoTime(newVideoTime);
      setIsCaptured(true);
    }
  }

  function handleSave() {
    if (isCaptured) {
      setUploading(true);
    }
  }

  return (
    <Wrapper layout={layout}>
      <ResultImage>
        <Canvas
          canvasSize={canvasSize}
          width={canvasSize.width}
          height={canvasSize.height}
          left={canvasLeftInput.value}
          ref={canvasRef}
        ></Canvas>
        <TextWrapper>
          <Text
            ref={textRef}
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
      <Controls>
        <Row>
          <RowTitle>Image</RowTitle>
        </Row>
        <Row>
          <Button onClick={handleCapture}>Screenshot</Button>
          <RowItem>
            <input
              type="range"
              min="0"
              max={40 * (16 - 9)}
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
