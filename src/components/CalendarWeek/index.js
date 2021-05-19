import React, { useState, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, Dimensions, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

import { DayContainer } from './styles';
import { Content, SimpleText, COLORS, Row, Space, Title } from '../../styles';
import { Icon } from '../../components';

const localePtBr = require('dayjs/locale/pt-br')
dayjs.locale(localePtBr)

export const CalendarWeek = ({ onClickDate }) => {
  // States
  const [month, setMonth] = useState([])
  // FrontStates
  const [showDays, setShowDays] = useState(false)
  const [refresh, setRefresh] = useState(false)
  
  // Constants
  const SCREEN_WIDTH = Dimensions.get('window').width
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
        key: index,
        day_nick: dayjs(day).format('ddd'),
        day_name: dayjs(day).format('dddd'),
        day_of_month: dayjs(day).format('D'),
        date: dayjs(day),
        isToday: dayjs(day).isToday(),
        isSelected: false,
      }))

    setMonth(daysOfMonth)
  }

  function handleClickDate (date) {
    const daysOfMonth = month.map((day, index) => {
      if (date.key === day.key) {
        return {
          ...day,
          isSelected: true
        }
      } else {
        return {
          ...day,
          isSelected: false
        } 
      }
    })

    setMonth(daysOfMonth)
    setRefresh(prevState => !prevState)

    goToSelectedDate(date)
    onClickDate(date.date)
  }

  function goToSelectedDate (date) {
    flatListRef.current.scrollToItem({
      animated: true,
      viewPosition: 0,
      item: month[date.key - 2]
    })
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
      {
        month.length > 0
        ? (
          <FlatList
            data={month}
            extraData={refresh}
            horizontal
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            snapToAlignment='center'
            initialScrollIndex={parseInt(ACTUAL_DAY) - 3}
            getItemLayout={(data, index) => ({
              // Max 5 items visibles at once
              length: SCREEN_WIDTH / 5,
              offset: SCREEN_WIDTH / 5 * index,
              index
            })}
            snapToInterval={SCREEN_WIDTH / 5}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <DayContainer
                isToday={item.isToday}
                isSelected={item.isSelected}
                onPress={() => handleClickDate(item)}
              >
                <Title
                  bold
                  color={
                    item.isSelected
                      ? COLORS.blue
                      : item.isSelected ? COLORS.blue
                      : item.isToday ? COLORS.white : ''
                  }
                >
                  {item.day_of_month}
                </Title>
                <SimpleText
                  bold
                  color={
                    item.isSelected
                      ? COLORS.blue
                      : item.isSelected ? COLORS.blue
                      : item.isToday ? COLORS.white : ''
                  }
                >
                  {item.day_nick}
                </SimpleText>
              </DayContainer>
            )}
          />
        )
        : <ActivityIndicator animating={true} color={COLORS.white} />
      }
    </Content>
  )
}