import React from 'react'

import {
    Container,
    Category,
    Amount
} from './styles'

interface Props {
    title: string;
    amount: string;
    color: string;
}

export const HistoryCard = ({ title, amount, color}: Props) => {
    return (
        <Container color={color}>
            <Category>{title}</Category>
            <Amount>{amount}</Amount>
        </Container>
    )
}
