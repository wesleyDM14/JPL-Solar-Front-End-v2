import styled from "styled-components";

import { colors } from "../cores";

export const Container = styled.footer`
    margin-top: auto;
    background: ${colors.dark3};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const CopyrightText = styled.p`
    font-size: 12px;
    color: ${colors.primary};
`;