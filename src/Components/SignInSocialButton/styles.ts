import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
    width: 100%;
    height: 56px;

    border-radius: 5px;

    flex-direction: row;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.shape };

    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    padding: 16px;

    border-color: ${({ theme }) => theme.colors.background };
    border-right-width: 1px;
`;

export const Text = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.medium };

    color: ${({ theme }) => theme.colors.title };

    flex: 1;
    text-align: center;
`;
