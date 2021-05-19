import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Icon } from '../../components';

export const GetLucidIcon = ({ isLucid }) => {
  // CONSTANTS
  const ICON_WIDTH = wp('20%')
  const ICON_HEIGHT = wp('18%')
  
  // Functions
  function getLucidIcon () {
    if (isLucid) {
      return <Icon.EmojiSmiley fill={'#000'} width={ICON_WIDTH} height={ICON_HEIGHT} />
    } else {
      return <Icon.EmojiReally fill={'#000'} width={ICON_WIDTH} height={ICON_HEIGHT} />
    }
  }

  return getLucidIcon()
}