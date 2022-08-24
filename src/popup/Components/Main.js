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
  font-size: 48px;
  span {
    font-size: 32px;
    text-align: center;
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <Info>try for free</Info>
    </Wrapper>
  );
};

export default Main;
