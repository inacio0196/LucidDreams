import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const SelectedIndicator = styled.View`
  background-color: ${({ isSelected }) => isSelected ? COLORS.white : 'transparent'};
  padding: ${wp('2%')}px;
  border-radius: ${wp('10%')}px;
`;