import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.secondary};

    border-radius: 5px;

    width: 100%;
    height: ${RFValue(56)}px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.shape};
`;