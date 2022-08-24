import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "../Context/RouterContext";
import Header from "./Header";
import Main from "./main";
import New from "./New";

const portraitCSS = css`
  width: 100%;
  height: 720px;
`;

const landscapeCSS = css`
  width: 100%;
  height: 400px;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #c2c7c7;
  padding: 48px 12px 12px 12px;
  overflow-y: scroll;
  box-sizing: border-box;
  opacity: ${(props) => (props.layout ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  ${(props) => (props.layout === "portrait" ? portraitCSS : landscapeCSS)};
  & * {
    box-sizing: border-box;
  }
`;

const Routes = () => {
  const { pathname, layout } = useRouter();

  return (
    <Wrapper layout={layout}>
      <Header />
      {pathname === "/" && <Main />}
      {pathname === "/new" && <New />}
    </Wrapper>
  );
};

export default Routes;
