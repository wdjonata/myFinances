import React from 'react'
import { FlatList } from "react-native";
import { Button } from '../../Components/Form/Button';

import { categories } from '../../Utils/categories'

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category
    setCategory: ( category: Category) => void;
    closeSelectCategory: () => void;
}

export const CategorySelect = ({category, setCategory, closeSelectCategory}: Props) => {

    const handleCategorySelect = (category: Category) => {
        setCategory(category)
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                keyExtractor={item => item.key}
                renderItem={({ item }) => 
                    
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={item.key === category.key}
                    >
                        <Icon name={item.icon}/>
                        <Name>{ item.name }</Name>
                    </Category>

                }

                ItemSeparatorComponent={ () => <Separator/>}
            />

            <Footer>
                <Button
                    title='Seleionar'
                    onPress={closeSelectCategory}
                ></Button>
            </Footer>
        </Container>
    )
}
