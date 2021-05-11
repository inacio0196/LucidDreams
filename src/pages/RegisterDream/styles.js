import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const Container = styled.View``;

export const CustomInput = styled.TextInput.attrs({
  placeholderTextColor: 'gray',
})`
  background-color: ${COLORS.white};
	border-radius: ${wp('4%')}px;
	padding: ${wp('4%')}px;
	font-size: ${wp('5%')}px;
  color: black;
  width: 100%;
`;