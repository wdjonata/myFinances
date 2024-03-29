import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hoks/auth'

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadingContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighlightProps {
    amount: string
    lastTransaction: string
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export const Dashboard = () => {
    const [data, setData] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
    const [isLoading, setIsLoading] = useState(true)
    
    const theme = useTheme();
    const { signOut, user } = useAuth()

    const dataKey = `@_myFinances:transaction_user:${user.id}`


    const getLastTransactionDate = (collection: DataListProps[], type: 'positive' | 'negative') => {

        const collectionFiltered = collection
        .filter(transaction => transaction.type === type)

        if(collectionFiltered.length === 0)
            return 0

        const lastTransaction = new Date(
        Math.max.apply(Math, collectionFiltered
        .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`
    }

    const loadTransaction = async () => {
        const response = await AsyncStorage.getItem(dataKey)
        
        const transactions = response ? JSON.parse(response) : [];
        
        let entriesTotal = 0;
        let expensivesTotal = 0;

        const transactionFormatted: DataListProps [] = transactions.map((item: DataListProps) => {
            
            if (item.type === 'positive') {
                entriesTotal += Number(item.amount)
            }else {
                expensivesTotal += Number(item.amount)
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return ({
                id: item.id,
                name: item.name,
                category: item.category,
                date,
                amount,
                type: item.type
            })

        })

        setData(transactionFormatted)
        
        const total = entriesTotal - expensivesTotal

        const lastTransactionEntries = getLastTransactionDate(transactions,'positive')
        const lastTransactionExpensives = getLastTransactionDate(transactions,'negative')

        const totalInterval = `01 a ${lastTransactionExpensives}`

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionEntries === 0
                ? 'Não há transações'
                : `Última entrada dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: expensivesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionExpensives === 0
                ? 'Não há transações'
                : `Última saída dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })
       
        setIsLoading(false)
    }

    useEffect(() => {  
    
        loadTransaction()
    }, [])

    useFocusEffect(useCallback(
        () => {
            loadTransaction()
        },
        [],
    ))

    return (
        <Container>
            { isLoading 
                ? 
                    <LoadingContainer>
                        <ActivityIndicator 
                            size='large'
                            color={theme.colors.primary}/>
                    </LoadingContainer> 
                : 
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{uri: user.photo}}/>
                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>
                            <LogoutButton onPress={signOut}>
                                <Icon name='power'/>
                            </LogoutButton>
                        </UserWrapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expensives.amount}
                            lastTransaction={highlightData.expensives.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction}
                        />
                    </HighlightCards>
                
                    <Transactions>
                        <Title>Listagem</Title>
                    <TransactionList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item}/>}
                    />
                        
                    </Transactions>
                </>
            }
        </Container>
    );
}