import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import Markdown from 'react-native-simple-markdown'
import dayjs from 'dayjs'

import { Wrapper, COLORS, Header, Title, Space, Row, SimpleText, Column } from '../../styles';
import { BackButton, GetClimateIcon, GetLucidIcon } from '../../components';

export default function DreamView () {
  // Navigation
  const { params: { dream } } = useRoute()

  // Data
  const SONHO = 'Primeiro estava em uma fila para comprar alguma coisa mas parece que entrei dentro de algum **filme** ou história o que parecia era que estava dentro de algum tipo de lógica onde algum tipo de monstro me perseguia, no final descobri que eles estavam em busca da minha alma, de longe avisarem um ser colossal e eu sabia que eles também estavam atrás dele então fui até ele, em paralelo tinha um grupo me procurando e os mesmo no explicavam por que conseguiriam me encontrar pois já tinham lutado contra alienígenas eles estavam andando em família a noite e então foram surpreendidos por eles, abaixaram suas cabeças e demonstraram sinal de rendição, mas o chefe queria um de seus filhos bebês então o pai atacou um dos seus alienígenas uma espécie de comandante arrancou a cabeça e foi correndo até o chefe'
  const LUCID = false

  return (
    <Wrapper
      bg={COLORS.purple}
      flex={1}
      p={15}
    >
      <StatusBar backgroundColor={COLORS.purple} barStyle='light-content'  />
      <Header>
        <BackButton />
        <Title>{dream.title}</Title>
      </Header>
      <Row>
        <SimpleText>Registrado em: {dayjs(dream.createdAt).format('DD [de] MMMM YYYY')}</SimpleText>
      </Row>
      <Space height={20} />
      <ScrollView>
      <Row
        align='flex-start'
        justify='space-around'
      >
        <Column
          align='center'
        >
          <SimpleText bold>{LUCID ? 'Lúcido' : 'Não lúcido'}</SimpleText>
          <Space height={10} />
          <GetLucidIcon isLucid={LUCID} />
        </Column>
        <Column
          align='center'
        >
          <SimpleText bold>Clima dentro do Sonho</SimpleText>
          <Space height={10} />
          <GetClimateIcon climate={dream.dreamClimate} />
        </Column>
      </Row>
      <Space height={20} />
        <Markdown styles={markdownStyles}>
          {dream.description}
        </Markdown>
      </ScrollView>
    </Wrapper>
  )
}

const markdownStyles = {
  heading1: {
    fontSize: wp('6%'),
    color: COLORS.white,
  },
  link: {
    color: COLORS.orange,
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: COLORS.white,
    fontSize: wp('5%')
  },
}