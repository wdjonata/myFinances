import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
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

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
    width: 100%;
    justify-content: space-between;
    flex-direction: row;

    margin-top: 41px;
`;

export const MonthSelectButton = styled(BorderlessButton)`

`;

export const SelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.colors.title }
`;

export const Month = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular };
    color: ${({ theme }) => theme.colors.title }
`;

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
