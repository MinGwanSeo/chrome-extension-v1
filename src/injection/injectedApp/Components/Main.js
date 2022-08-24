import React from "react";
import styled from "styled-components";
import { useRouter } from "../Context/RouterContext";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) =>
    props.layout === "portrait" ? "column" : "row"};
`;

const Button = styled.div`
  background-color: white;
  color: black;
  padding: 8px 24px;
  margin: 8px;
  font-size: 24px;
  text-align: center;
  &:hover {
    background-color: yellow;
    cursor: pointer;
  }
`;

const Main = () => {
  const { layout, push } = useRouter();

  return (
    <Wrapper layout={layout}>
      <Button
        onClick={() => {
          push("/new");
        }}
      >
        New
      </Button>
    </Wrapper>
  );
};

export default Main;
