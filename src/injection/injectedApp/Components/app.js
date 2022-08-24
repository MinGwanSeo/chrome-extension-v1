import React from "react";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "../Context/RouterContext";
import theme from "../Styles/theme";
import Routes from "./Routes";
import "../Styles/fonts.css";

const App = () => {
  return (
    <RouterProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </RouterProvider>
  );
};

export default App;
