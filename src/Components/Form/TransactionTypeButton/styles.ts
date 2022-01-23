import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'positive' | 'negative'
}

interface ContainerProps {
    type: 'positive' | 'negative';
    isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
    border-color: ${({ theme }) => theme.colors.text};
    border-style: solid;
    border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
    border-radius: 5px;

    width: 48%;
    height: ${RFValue(56)}px;

    ${({ type, isActive }) => isActive && type === 'positive' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}

    ${({ type, isActive }) => isActive && type === 'negative' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Button =  styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;
`;

export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(24)}px;

    color: ${({ theme, type}) => 
    type === 'positive' ? theme.colors.success : theme.colors.attention};

`;

export const Title = styled.Text`
    margin-left: 14px;

    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.title}
`;