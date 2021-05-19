import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { COLORS } from '../../styles';

export const CalendarContainer = styled.View``;

export const DayContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  ${
    ({ isToday }) => isToday
    ? `
      border-width: ${wp('0.5%')}px;
      border-color: ${COLORS.white};
      background-color: transparent;
    `
    : null
  }
  ${
    ({ isSelected }) => isSelected
    ? `
      background-color: ${COLORS.white};
    ` 
    : null
  };
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