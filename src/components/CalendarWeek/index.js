import React, { useState, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';

import { DayContainer } from './styles';
import { Content, SimpleText, COLORS, Row, Space, Title } from '../../styles';
import { Icon } from '../../components';

const localePtBr = require('dayjs/locale/pt-br')
dayjs.locale(localePtBr)

export const CalendarWeek = () => {
  // States
  const [month, setMonth] = useState([])
  
  // Constants
  const ITEM_WIDTH = 20
  const ACTUAL_MONTH_NICK = dayjs().format('MMM')
  const ACTUAL_DAY = dayjs().format('D')
  const ACTUAL_MONTH_NAME = dayjs().format('MMMM')

  const flatListRef = useRef(null)
  
  // Effects
  useEffect(() => {
    generateMonthDays()
  }, [])

  // Functions
  function generateMonthDays () {
    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')
    const numberDaysOfMonth = dayjs().daysInMonth()

    const isToday = require('dayjs/plugin/isToday')
    dayjs.extend(isToday)
    
    const daysOfMonth = Array
      .from({ length: numberDaysOfMonth })
      .map((_, day) => `${year}-${month}-${day + 1}`)
      .map((day, index) => ({
        key: `${index}`,
        day_nick: dayjs(day).format('ddd'),
        day_name: dayjs(day).format('dddd'),
        day_of_month: dayjs(day).format('D'),
        date: dayjs(day),
        isToday: dayjs(day).isToday(),
      }))
    
    const today = daysOfMonth.filter(day => day.isToday)
    
    flatListRef.current.scrollToItem({
      animated: true,
      viewPosition: 0,
      item: today[0]
    })

    setMonth(daysOfMonth)
  }
  
  return (
    <Content>
      <Content
        p={15}
      >
        <Row
          align='center'
          justify='space-between'
        >
          <SimpleText
            bold
            fontsize={6}
          >
            {ACTUAL_MONTH_NICK} {ACTUAL_DAY}
          </SimpleText>
          <Row
            align='center'
          >
            <SimpleText
              fontsize={4.5}
            >
              {ACTUAL_MONTH_NAME}
            </SimpleText>
            <Space width={10} />
            <Icon.CalendarWeek fill={COLORS.white} width={wp('6%')} height={hp('6%')} />
          </Row>
        </Row>
      </Content>
      <Space height={10} />
      <FlatList
        data={month}
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <DayContainer
            isToday={item.isToday}
          >
            <Title
              bold
              color={item.isToday ? COLORS.blue : 'white'}
            >
              {item.day_of_month}
            </Title>
            <SimpleText
              color={item.isToday ? COLORS.blue : 'white'}
            >
              {item.day_nick}
            </SimpleText>
          </DayContainer>
        )}
      />
    </Content>
  )
}