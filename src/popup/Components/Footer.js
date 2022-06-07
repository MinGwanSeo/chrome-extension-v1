import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Author = styled.div`
  color: ${(props) => props.theme.color.main};
  ${(props) => props.theme.fonts.point};
  font-size: 24px;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Author>MGS</Author>
    </Wrapper>
  );
};

export default Footer;
