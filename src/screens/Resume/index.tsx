import React, { useState, useCallback } from 'react'
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useAuth } from '../../hoks/auth'
import { useFocusEffect } from '@react-navigation/native';

import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '../../Components/HistoryCard'

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    SelectIcon,
    Month,
    LoadingContainer
} from './styles'

import { categories } from '../../Utils/categories';
import theme from '../../global/styles/theme';

interface TransactionCard {
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string
    
}

interface CategoryData {
    id: string;
    name: string;
    color: string;
    total: number;
    totalFormatted: string;
    percent: string;
}

export const Resume = () => {

    const { user } = useAuth()

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleDateChange = (action: 'next' | 'prev') => {
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1))
        }else{
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    const loadData = async() => {

        setIsLoading(true)

        const dataKey = `@_myFinances:transaction_user:${user.id}`
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted.filter((expensive: TransactionCard) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        const expensivesTotal = expensives
        .reduce((acumulator: number, expensive: TransactionCard) => {
            return acumulator + Number(expensive.amount)
        },0)

        const totalByCategory: CategoryData[] = [];

        categories.forEach( category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionCard) => {
                
                if( expensive.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            });

            if(categorySum>0){

                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRl'
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    id: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                })
            }
        })

        setTotalByCategory(totalByCategory);

        setIsLoading(false)
    }

    useFocusEffect(useCallback(
        () => {
            loadData()
        },
        [selectedDate],
    ))

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            { isLoading 
                ? 
                <LoadingContainer>
                    <ActivityIndicator 
                        size='large'
                        color={theme.colors.primary}/>
                </LoadingContainer> 
                : 
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('prev')}>
                            <SelectIcon name="chevron-left"/>
                        </MonthSelectButton>
                        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
                        <MonthSelectButton onPress={() => handleDateChange('next')}>
                            <SelectIcon name="chevron-right"/>
                        </MonthSelectButton>
                    </MonthSelect>
                    
                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategory}
                            colorScale={totalByCategory.map( category => category.color )}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: "bold",
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>
                    {
                        totalByCategory.map( item => (
                            <HistoryCard
                                key={item.id}
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                        ))
                    }
                </Content>
            }

            
        </Container>
    )
}
