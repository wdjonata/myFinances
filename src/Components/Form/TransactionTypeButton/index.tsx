import React from 'react';
import { RectButtonProps } from "react-native-gesture-handler";

import {
    Container,
    Icon,
    Title,
    Button
} from './styles';

interface Props extends RectButtonProps {
    type: 'positive' | 'negative';
    title: string;
    isActive: boolean;
}

export const TransactionTypeButton = ({type, title, isActive, ...rest}: Props) => {

    const icon = {
        positive: 'arrow-up-circle',
        negative: 'arrow-down-circle',
    }

  return (
    <Container
        type={type}
        isActive={isActive}
    >
        <Button {...rest}>

            <Icon name={icon[type]} type={type}/>
            <Title>{ title }</Title>
        </Button>
    </Container>
  );
};