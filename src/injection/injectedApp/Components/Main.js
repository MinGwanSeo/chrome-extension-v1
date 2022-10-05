import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useResult } from "../Context/ResultContext";
import { useRouter } from "../Context/RouterContext";
import { getYoutubeVideo } from "../util";

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) =>
    props.layout === "portrait" ? "column" : "row"};
`;

const Button = styled.div`
  width: 96px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #000000;
  color: black;
  padding: 8px 24px;
  margin: 8px;
  font-size: 24px;
  text-align: center;
  &:hover {
    background-color: #d8d8d8;
    cursor: pointer;
  }
`;

const Images = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.layout === "portrait" ? "column" : "row"};
  align-items: center;
  gap: 8px;
  overflow: scroll;
`;

const Image = styled.img`
  width: ${40 * 9}px;
  height: ${40 * 9}px;
  &:hover {
    cursor: pointer;
  }
`;

const Main = () => {
  const [images, setImages] = useState([]);
  const { layout, push, videoId } = useRouter();
  const { getImages } = useResult();

  useEffect(() => {
    if (videoId) {
      (async function (videoId) {
        const newImages = await getImages(videoId);
        newImages.sort((a, b) => a.vTime - b.vTime);
        setImages(newImages);
      })(videoId);
    }
  }, [videoId]);

  return (
    <Wrapper layout={layout}>
      <Button
        onClick={() => {
          push("/new");
        }}
      >
        New
      </Button>
      <Images layout={layout}>
        {images.map((image) => (
          <Image
            src={image.image}
            onClick={() => {
              const video = getYoutubeVideo();
              if (video) {
                video.currentTime = image.vTime;
              }
            }}
          />
        ))}
      </Images>
    </Wrapper>
  );
};

export default Main;
