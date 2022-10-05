import React, { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  span {
    font-size: 32px;
    text-align: center;
  }
`;

const HowToUseImg = styled.img`
  width: 80%;
`;

const Main = () => {
  return (
    <Wrapper>
      <Info>Click this icon to start app</Info>
      <HowToUseImg src={chrome.runtime.getURL("/resources/howtouse1.png")} />
    </Wrapper>
  );
};

export default Main;
