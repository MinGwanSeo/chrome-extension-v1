import React from "react";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "../Context/RouterContext";
import { ResultProvider } from "../Context/ResultContext";
import theme from "../Styles/theme";
import Routes from "./Routes";
import "../Styles/fonts.css";

const App = () => {
  return (
    <ResultProvider>
      <RouterProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </RouterProvider>
    </ResultProvider>
  );
};

export default App;
