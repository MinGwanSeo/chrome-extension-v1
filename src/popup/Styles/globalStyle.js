import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body{
        width: 375px;
        height: 600px;
        overflow: scroll;
        font-size: 16px;
        overscroll-behavior: none;
        color: ${(props) => props.theme.color.default};
        ${(props) => props.theme.fonts.default}
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input, button{
        &:focus, &:active{
            outline:none
        }
    }
`;

export default GlobalStyle;
