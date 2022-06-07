import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { parseUrl } from "query-string";
import GlobalStyle from "../Styles/globalStyle";
import theme from "../Styles/theme";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
import LocationContext from "../Context/locationContext";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  padding: 16px 0;
`;

const App = () => {
  const [whereAmI, setWhereAmI] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ command: "whereIAm" }, (url) => {
      const parsedURL = parseUrl(url);
      if (parsedURL.url.split("/")[2] === "www.netflix.com") {
        if (parsedURL.url.split("/")[3] === "watch") {
          setWhereAmI("netflix-viewer");
        } else {
          setWhereAmI("netflix-list");
        }
      } else {
        setWhereAmI("none");
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LocationContext.Provider value={{ whereAmI }}>
        <Wrapper>
          <Header />
          <Main />
          <Footer />
        </Wrapper>
      </LocationContext.Provider>
    </ThemeProvider>
  );
};

export default App;
