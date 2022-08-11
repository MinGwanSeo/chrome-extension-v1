import React from "react";
import { ThemeProvider } from "styled-components";
import { LayoutProvider } from "../Context/LayoutContext";
import theme from "../Styles/theme";
import Main from "./main";

const App = () => {
  return (
    <LayoutProvider>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </LayoutProvider>
  );
};

export default App;
