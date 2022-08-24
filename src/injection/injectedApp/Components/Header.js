import React from "react";
import styled from "styled-components";
import { useRouter } from "../Context/RouterContext";
import Icon from "./Icon";

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  padding: 16px;
  align-items: center;
`;

const IconArea = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const { history, back } = useRouter();
  return (
    <Wrapper>
      {history.length > 1 && (
        <IconArea
          onClick={() => {
            back();
          }}
        >
          <Icon.Back />
        </IconArea>
      )}
    </Wrapper>
  );
};

export default Header;
