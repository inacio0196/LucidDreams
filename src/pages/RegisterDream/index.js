import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import dayjs from 'dayjs';

import { COLORS, Wrapper, Header, Title, Row, Content, SimpleText, Space } from '../../styles';
import { CustomInput } from './styles';
import { BackButton } from '../../components';

const localePtBr = require('dayjs/locale/pt-br')
dayjs.locale(localePtBr)

export default function RegisterDream () {
  // States
  const [title, setTitle] = useState('')
  
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
      </Content>
    </Wrapper>
  )
}