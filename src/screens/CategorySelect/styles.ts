import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from '@expo/vector-icons'

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

interface CategoryProps {
    isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: flex-end;
    align-items: center;

    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    color: ${({ theme }) => theme.colors.shape};

`;

export const Category = styled(TouchableOpacity)<CategoryProps>`
    width: 100%;

    flex-direction: row;
    align-items: center;

    padding: ${RFValue(15)}px;

    ${( { isActive } ) => isActive && css`
        background-color: ${({ theme }) => theme.colors.secondary_light};
    `}
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;

`;

export const Name = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;

    background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;

    justify-content: flex-end;
`;