import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native';

import { COLORS, Column, Content, Row, SimpleText, Space } from '../../styles';
import { SelectedIndicator } from './styles';
import { Icon } from '../../components';

const ICON_WIDTH = '15%'
const ICON_HEIGHT = '8%'

export const ClimateOptions = ({ onSelectClimate }) => {
  // States
  const [climates, setClimates] = useState([
    {
      key: '02',
      name: 'Dia',
      id: 'day',
      icon: () => <Icon.Sun width={wp(ICON_WIDTH)} height={hp(ICON_HEIGHT)} />,
      isSelected: true,
    },
    {
      key: '03',
      name: 'Noite',
      id: 'night',
      icon: () => <Icon.Sky width={wp(ICON_WIDTH)} height={hp(ICON_HEIGHT)} />,
      isSelected: false,
    },
    {
      key: '04',
      name: 'Dia/Chuva',
      id: 'day/rain',
      icon: () => <Icon.SunRain width={wp(ICON_WIDTH)} height={hp(ICON_HEIGHT)} />,
      isSelected: false,
    },
    {
      key: '05',
      name: 'Noite/Chuva',
      id: 'night/rain',
      icon: () => <Icon.NightRain width={wp(ICON_WIDTH)} height={hp(ICON_HEIGHT)} />,
      isSelected: false,
    },
  ])
  // FrontStates
  const [refresh, setRefresh] = useState(false)

  // Functions
  function selectClimate (selectedIndex) {
    const newClimates = climates.map((climate, index) => {
      if (selectedIndex === index) {
        return {
          ...climate,
          isSelected: true,
        }
      } else {
        return {
          ...climate,
          isSelected: false,
        }
      }
    })

    setClimates(newClimates)
    onSelectClimate(newClimates[selectedIndex].id)
    setRefresh(prevState => !prevState)
  }
  
  return (
    <Content>
      <Row
        align='center'
        justify='space-between'
        block
      >
        <FlatList
          data={climates}
          extraData={refresh}
          horizontal
          contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => selectClimate(index)}
            >
              <Column
                align='center'
              >
                {item.icon()}
                <SelectedIndicator
                  isSelected={item.isSelected}
                >
                  <SimpleText
                    bold={item.isSelected}
                    color={item.isSelected ? COLORS.green : COLORS.white}
                  >
                    {item.name}
                  </SimpleText>
                </SelectedIndicator>
              </Column>
            </TouchableOpacity>
          )}
        />
      </Row>
    </Content>
  )
}