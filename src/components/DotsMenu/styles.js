import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const MenuOptionText = styled.Text`
	font-size: ${wp('5%')}px;
	${({ disabled }) => disabled ? `color: ${COLORS.gray}` : null}
`;