import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import LocationContext from "../Context/locationContext";

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

const Image = styled.img`
  width: 130px;
  height: 100%;
`;

const Main = () => {
  const { whereAmI } = useContext(LocationContext);

  function sendMessage(command) {
    chrome.runtime.sendMessage({ command });
  }

  return (
    <Wrapper>
      <Info>
        {whereAmI === "netflix-list" && <div>Listview</div>}
        {whereAmI === "netflix-viewer" && (
          <>
            <Image src={chrome.runtime.getURL("/resources/tree.jpeg")} />
            <span>Viewer</span>
          </>
        )}
        {whereAmI === "none" && <span>Only works on Netflix</span>}
      </Info>
    </Wrapper>
  );
};

export default Main;
