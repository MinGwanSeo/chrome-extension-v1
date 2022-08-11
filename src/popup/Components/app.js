import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../Styles/globalStyle";
import theme from "../Styles/theme";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";

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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Main />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
