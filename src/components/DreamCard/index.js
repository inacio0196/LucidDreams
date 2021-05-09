import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CardContainer, CardDate, CardTitle, CardButtonText, ReadButton } from './styles';
import { Column, Row, Space } from '../../styles';
import { Icon } from '../../components';

export const DreamCard = ({ onPressReadDream }) => {
  return (
    <CardContainer>
      <Row
        align='center'
        justify='space-between'
      >
        <Column>
          <CardDate
            isRecent={true}
          >
            2 years and 13 days
          </CardDate>
          <CardTitle>Becoming an Artist</CardTitle>
        </Column>
        <Icon.SunRain width={wp('15%')} height={hp('10%')} />
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
          <CardButtonText>Ler relato do sonho</CardButtonText>
          <Space width={10} />
          <Icon.ArrowRight fill='#000' width={wp('6%')} height={hp('3%')} />
        </ReadButton>
      </Row>
    </CardContainer>
  )
}