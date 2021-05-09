import React from 'react';
import { StatusBar } from 'react-native';

import { Wrapper, Title, COLORS, Row, Space, Content, SimpleText } from '../../styles';
import { BackButton, CalendarWeek } from '../../components';
 
export default function DreamHistory () {
  return (
    <Wrapper
      flex={1}
      bg={COLORS.blue}
    >
      <StatusBar backgroundColor={COLORS.blue} />
      <Content
        p={15}
      >
        <BackButton />
        <Title>Histórico de Sonhos</Title>
        <Space height={20} />
      </Content>
      <CalendarWeek />
      <Content
        p={15}
      >
        <Title>Resto do app</Title>
      </Content>
    </Wrapper>
  )
}