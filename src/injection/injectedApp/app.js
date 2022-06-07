import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid red;
  background-color: white;
  border-radius: 50%;
  color: red;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const App = () => {
  return <Wrapper onClick={() => alert("chat")}>Chat</Wrapper>;
};

export default App;
