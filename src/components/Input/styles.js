import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../styles';

export const InputWrapper = styled.View``;

export const InputContainer = styled.View`
	border-width: ${wp('0.3%')}px;
	border-radius: ${wp('5%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-color: ${props => props.inputActive ? COLORS.yellow : '#FFF0'};
	background-color: ${COLORS.darkPurple};
`;

export const InputComponent = styled.TextInput.attrs({
  placeholderTextColor: 'gray',
})`
  background-color: ${COLORS.darkPurple};
	border-radius: ${wp('5%')}px;
	padding: ${wp('4%')}px;
	font-size: ${wp('4%')}px;
	${props => props.secureActive ? `width: ${wp('80%')}px` : `width: ${wp('90%')}px`};
`;

export const SecureControl = styled.TouchableOpacity`
	margin-right: ${wp('5%')}px;
`;

export const ErrorMessage = styled.Text`
	color: ${COLORS.error};
	font-weight: bold;
	margin-left: ${wp('2%')}px;
`;