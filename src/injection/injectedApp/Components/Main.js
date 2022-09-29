import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useResult } from "../Context/ResultContext";
import { useRouter } from "../Context/RouterContext";
import { getQuery, getYoutubeVideo } from "../util";

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
  background-color: white;
  color: black;
  padding: 8px 24px;
  margin: 8px;
  font-size: 24px;
  text-align: center;
  &:hover {
    background-color: yellow;
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
  const { layout, push } = useRouter();
  const { getImages } = useResult();

  useEffect(() => {
    (async function () {
      const videoId = getQuery().v;
      const newImages = await getImages(videoId);
      newImages.sort((a, b) => a.vTime - b.vTime);
      setImages(newImages);
    })();
  }, []);

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
