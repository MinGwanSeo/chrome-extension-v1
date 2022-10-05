import React, { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 32px;
`;

const Logo = styled.div`
  color: ${(props) => props.theme.color.main};
  ${(props) => props.theme.fonts.point};
  font-size: 32px;
  text-transform: uppercase;
`;

const Header = () => {
  return (
    <Wrapper>
      <Logo>Youtube Capture</Logo>
    </Wrapper>
  );
};

export default Header;
