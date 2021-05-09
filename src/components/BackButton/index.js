import React from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '../../components';
import { COLORS } from '../../styles';

export const BackButton = () => {
  // Navigation
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      hitSlop={{
        right: 10,
        left: 10,
        top: 10,
        bottom: 10,
      }}
    >
      <Icon.ArrowLeft fill={COLORS.white} width={wp('8%')} height={hp('5%')} />
    </TouchableOpacity>
  )
}