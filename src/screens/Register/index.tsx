import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hoks/auth'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import uuid from 'react-native-uuid';

import { Button } from '../../Components/Form/Button';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';
import { InputForm } from '../../Components/Form/InputForm';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup
  .string()
  .required('Nome é obrigatório'),
  amount: yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor deve ser positivo')
  .required('Valor é obrigatório')
});

export const Register = () => {

  const { user } = useAuth()

  const [transactionSelect, setTransactionSelect] = useState('')
  const [openModalCategory, setOpenModalCategory] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {
    control,
    handleSubmit,
    reset,
    formState:{ errors } } = useForm({
      resolver: yupResolver(schema)
    })

  const dataKey = `@_myFinances:transaction_user:${user.id}`

  const navigation = useNavigation();

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionSelect(type)
  }

  const handleCloseSelectCategoryModal = () => {
    setOpenModalCategory(false)
  }

  const handleOpenSelectCategoryModal = () => {
    setOpenModalCategory(true)
  }

  const handleRegister = async (form: FormData) => {
    if(!transactionSelect) {
      return Alert.alert('Selecione uma transação')
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione uma categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionSelect,
      category: category.key,
      date: new Date()
    }

    try {

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset();
      setTransactionSelect('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate("Listagem")

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsType>
              <TransactionTypeButton
                type='positive'
                title='Income'
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionSelect === 'positive'}
              />
              <TransactionTypeButton
                type='negative'
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionSelect === 'negative'}

              />
            </TransactionsType>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={openModalCategory}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
};