import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { Wrapper, Title, COLORS, Row, Space, Content, SimpleText } from '../../styles';
import { BackButton, CalendarWeek, DreamCard, DotsMenu } from '../../components';
import { getItemsOnQuery } from '../../utils/firestore';

import firestore from '@react-native-firebase/firestore';

export default function DreamHistory () {
  // Navigation
  const navigation = useNavigation()
  
  // States
  const [dreamOfDate, setDreamOfDate] = useState(null)
  
  // Data
  const menuOptions = [
    {
      id: '01',
      name: 'Registrar sonho',
      action: () => {},
    },
  ]

  // Effects
  useEffect(() => {
    getTodayDream()
  }, [])

  // Functions
  function getTodayDream () {
    const today = dayjs().format('YYYY-MM-DD')

    firestore()
      .collection('dreams')
      .where('createdDate', '==', today)
      .onSnapshot(snap => {
        if (snap.docs.length > 0) {
					const todayDream = getItemsOnQuery(snap)

					if (todayDream.length > 0) {
						setDreamOfDate(todayDream[0])
					}
				} else {
					setDreamOfDate(null)
        }
      })
  }
  
  function getDreamOfDate (date) {
    const dateQuery = dayjs(date).format('YYYY-MM-DD')
    
    firestore()
      .collection('dreams')
      .where('createdDate', '==', dateQuery)
      .onSnapshot(snap => {
        if (snap.docs.length > 0) {
					const dream = getItemsOnQuery(snap)

					if (dream.length > 0) {
						setDreamOfDate(dream[0])
					}
				} else {
					setDreamOfDate(null)
        }
      })
  }

  function goToDreamView () {
    navigation.navigate('DreamView', { dream: dreamOfDate })
  }

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
      <CalendarWeek
        onClickDate={date => getDreamOfDate(date)}
      />
      <Content
        p={15}
      >
        <SimpleText
          bold
          fontsize={5}
        >
          Relatos do dia
        </SimpleText>
        {
          dreamOfDate
          ? (
            <DreamCard
              isRecent={false}
              title={dreamOfDate.title}
              createdAt={dreamOfDate.createdAt}
              climate={dreamOfDate.dreamClimate}
              onPressReadDream={goToDreamView}
            />
          )
          : (
            <Row
              align='center'
              justify='center'
              mt={20}
            >
              <SimpleText
                color='#FFF9'
                fontsize={4}
              >
                Você não possuí nenhum sonho cadastrado hoje
              </SimpleText>
            </Row>
          )
        }
      </Content>
    </Wrapper>
  )
}