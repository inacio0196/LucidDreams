import React, { useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { COLORS, Wrapper, Header, Title, Row, Content, SimpleText, Space } from '../../styles';
import { CustomInput } from './styles';
import { BackButton, Button, ClimateOptions, ReactionSelect } from '../../components';

import { selectUser } from '../../store/Authenticate/Authenticate.selectors';
import firestore from '@react-native-firebase/firestore';

const localePtBr = require('dayjs/locale/pt-br')
dayjs.locale(localePtBr)

export default function RegisterDream () {
  // Redux
  const user = useSelector(selectUser)

  // States
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dreamClimate, setDreamClimate] = useState('day')
  const [isLucid, setIsLucid] = useState(false)
  
  // Functions
  function registerDream () {
    firestore()
      .collection('dreams')
      .add({
        title,
        description,
        isLucid,
        dreamClimate,
        createdDate: dayjs().format('YYYY-MM-DD'),
        dreamUserID: user.userID,
        createdAt: dayjs().format(),
        updatedAt: dayjs().format(),
      })
      .then(() => {
        alert('sonho registrado com sucesso!')
      })
      .catch(error => console.log(error))
  }

  return (
    <Wrapper
      p={15}
      flex={1}
      bg={COLORS.green}
    >
      <StatusBar backgroundColor={COLORS.green} barStyle='light-content' />
      <Header>
        <BackButton />
        <Title>Registrar Sonho</Title>
      </Header>
      <Space height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Content>
          <CustomInput
            placeholder='Título'
            value={title}
            onChangeText={setTitle}
          />
          <Space height={20} />
          <Row
            justify='flex-start'
          >
            <SimpleText fontsize={4}>{dayjs().format('MMM D[,] YYYY')}</SimpleText>
          </Row>
          <Space height={20} />
          <CustomInput
            placeholder='Descrição do sonho'
            value={description}
            onChangeText={setDescription}
            returnKeyType='none'
            multiline={true}
          />
          <Space height={20} />
          <SimpleText
            fontsize={5}
          >
            Como estava o clima dentro do seu sonho?
          </SimpleText>
          <Space height={20} />
          <ClimateOptions
            onSelectClimate={setDreamClimate}
          />
          <Space height={20} />
          <SimpleText
            fontsize={5}
          >
            Conseguiu ter controle do sonho mesmo que por um breve momento?
          </SimpleText>
          <Space height={20} />
          <ReactionSelect
            onReallySelect={setIsLucid}
          />
          <Space height={20} />
          <Button
            textcolor={COLORS.green}
            title='Registrar'
            onPress={registerDream}
          />
        </Content>
      </ScrollView>
    </Wrapper>
  )
}