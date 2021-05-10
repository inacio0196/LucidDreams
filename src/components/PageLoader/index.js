import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ActivityIndicator, StatusBar } from 'react-native';

import { COLORS, SimpleText, Space, Wrapper } from '../../styles';

export const PageLoader = ({ title }) => {
  function getRandomColor () {
    const colors = [
      COLORS.purple,
      COLORS.secundary,
      COLORS.blue,
      COLORS.green,
      COLORS.orange,
      COLORS.brown,
    ]
    const RANDOM_INDEX = Math.floor(Math.random() * colors.length)

    return colors[RANDOM_INDEX]
  }

  const loaderColor = getRandomColor()

  return (
    <Wrapper
      flex={1}
      justify='center'
      align='center'
      bg={loaderColor}
    >
      <StatusBar backgroundColor={loaderColor} />
      <ActivityIndicator
        animating={true}
        color={COLORS.white}
        size={wp('15%')}
      />
      <Space height={wp('5%')} />
      {
        title && (
          <SimpleText
            bold
            fontsize={4}
          >
            Carregando...
          </SimpleText>
        )
      }
    </Wrapper>
  )
}