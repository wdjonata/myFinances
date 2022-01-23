import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    
    background-color: ${({ theme }) => theme.colors.shape};

    border-radius: 5px;
    border-left-width: 4px;
    border-left-color: ${({ color }) => color};

    padding: 12px 24px;

    margin-bottom: 8px;

    flex-direction: row;
    justify-content: space-between;

`;

export const Category = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title};
`;