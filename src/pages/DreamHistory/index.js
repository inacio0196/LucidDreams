import React from 'react';
import { StatusBar } from 'react-native';

import { Wrapper, Title, COLORS, Row, Space, Content, SimpleText } from '../../styles';
import { BackButton, CalendarWeek, DreamCard, DotsMenu } from '../../components';

export default function DreamHistory () {
  // Data
  const menuOptions = [
    {
      id: '01',
      name: 'Registrar sonho',
      action: () => {},
    },
  ]

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
        <Row
          justify='space-between'
        >
          <Title>Histórico de Sonhos</Title>
          <DotsMenu
            options={menuOptions}
          />
        </Row>
        <Space height={10} />
      </Content>
      <CalendarWeek />
      <Content
        p={15}
      >
        <SimpleText
          bold
          fontsize={5}
        >
          Relatos do dia
        </SimpleText>
        <DreamCard
          isRecent={false}
        />
      </Content>
    </Wrapper>
  )
}