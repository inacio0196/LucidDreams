import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Icon } from '../../components';

export const GetClimateIcon = ({ climate }) => {
  // CONSTANTS
  const ICON_WIDTH = wp('20%')
  const ICON_HEIGHT = wp('18%')

  // Functions
  function getClimateIcon (climate) {
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

  // JSX
  return (
    <>
      {getClimateIcon(climate)}
    </>
  )
}