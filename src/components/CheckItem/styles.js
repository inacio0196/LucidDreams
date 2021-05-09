import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const CheckContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${COLORS.secundaryDark};
  width: 100%;
  padding: ${wp('5%')}px;
  border-radius: ${wp('3%')}px;
  margin-top: ${wp('3%')}px;
`;

export const CheckText = styled.Text`
  color: ${COLORS.white};
  font-size: ${wp('4%')}px;
  margin-left: ${wp('2%')}px;
`;

export const CheckBox = styled.View`
  background-color: ${({ checked }) => checked ? COLORS.white : 'transparent'};
  height: ${wp('4.5%')}px;
  width: ${wp('4.5%')}px;
  border-radius: ${wp('1%')}px;
`;

export const CheckBoxContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-color: ${COLORS.white};
  border-width: ${wp('0.2%')}px;
  height: ${wp('6%')}px;
  width: ${wp('6%')}px;
  border-radius: ${wp('1%')}px;
`;