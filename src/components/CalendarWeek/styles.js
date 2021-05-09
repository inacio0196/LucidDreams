import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const CalendarContainer = styled.View``;

export const DayContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ isToday }) => isToday ? COLORS.white : 'transparent'};
  margin-right: ${wp('1%')}px;
  margin-left: ${wp('1%')}px;
  height: ${hp('17%')}px;
  width: ${wp('18%')}px;
  border-top-left-radius: ${wp('10%')}px;
  border-top-right-radius: ${wp('10%')}px;
  border-bottom-right-radius: ${wp('10%')}px;
  border-bottom-left-radius: ${wp('10%')}px;
  box-shadow: ${wp('20%')}px ${wp('10%')}px ${wp('10%')}px #000;
`;