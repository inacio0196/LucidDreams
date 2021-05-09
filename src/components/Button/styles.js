import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const TouchableButton = styled.TouchableOpacity`
	background-color: ${COLORS.white};
	padding: ${wp('3%')}px;
	${({ block }) => block ? 'width: 100%' : null};
	align-items: center;
	justify-content: center;
	border-radius: ${wp('1%')}px;
`;

export const ButtonTitle = styled.Text`
	font-size: ${wp('5%')}px;
	font-weight: bold;
	color: ${COLORS.purple}
`;