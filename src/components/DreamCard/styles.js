import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const CardContainer = styled.View`
  background-color: ${COLORS.white};
  padding: ${wp('5%')}px;
  border-radius: ${wp('3%')}px;
  margin-top: ${wp('2%')}px;
`;

export const ReadButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CardDate = styled.Text`
  ${({ isRecent }) => isRecent ? `color: ${COLORS.secundary}` : `${COLORS.blue}`}
`;

export const CardButtonText = styled.Text`
  font-size: ${wp('4%')}px;
  font-weight: bold;
`;

export const CardTitle = styled.Text`
  font-size: ${wp('5%')}px;
  font-weight: bold;
`;