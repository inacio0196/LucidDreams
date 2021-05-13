import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dayjs from 'dayjs';

import { CardContainer, CardDate, CardTitle, CardButtonText, ReadButton } from './styles';
import { Column, Row, Space } from '../../styles';
import { Icon } from '../../components';

const localePtBr = require('dayjs/locale/pt-br')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale(localePtBr)

export const DreamCard = ({ onPressReadDream, isRecent, title, climate, description, createdAt }) => {
  // CONSTANTS
  const ICON_WIDTH = wp('20%')
  const ICON_HEIGHT = wp('18%')
  
  // Functions
  function getDreamClimate (climate) {
    let climateKey = climate

    if (/\//g.test(climateKey)) {
      climateKey = climateKey.replace('/', '_')
    }

    const climates = {
      day: <Icon.Sun width={ICON_WIDTH} height={ICON_HEIGHT} />,
      day_rain: <Icon.SunRain width={ICON_WIDTH} height={ICON_HEIGHT} />,
      night: <Icon.Sky width={ICON_WIDTH} height={ICON_HEIGHT} />,
      night_rain: <Icon.NightRain width={ICON_WIDTH} height={ICON_HEIGHT} />,
    }
    
    return climates[climateKey]
  }
  
  return (
    <CardContainer>
      <Row
        align='center'
        justify='space-between'
      >
        <Column>
          <CardDate
            isRecent={isRecent}
          >
            {dayjs(createdAt).fromNow()}
          </CardDate>
          <CardTitle>{title}</CardTitle>
        </Column>
        {getDreamClimate(climate)}
      </Row>
      <Space height={10} />
      <Row
        align='center'
        justify='flex-end'
      >
        <ReadButton
          hitSlop={{ right: 10, left: 10, top: 10, bottom: 10 }}
          onPress={onPressReadDream}
        >
          <CardButtonText>Ler anotação do sonho</CardButtonText>
          <Space width={10} />
          <Icon.ArrowRight fill='#000' width={wp('6%')} height={hp('3%')} />
        </ReadButton>
      </Row>
    </CardContainer>
  )
}