import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const COLORS = {
	yellow: '#FCE762',
	white: '#FFFDED',
	macaroni: '#FFB17A',
	green: '#01977C',
	orange: '#FA6E33',
	purple: '#7F2CFF',
	brown: '#87624D',
	darkPurple: '#201335',
	gray: '#ABB8C3',
	error: '#f44336',
	secundary: '#FF3C52',
	secundaryDark: '#E82B41',
	blue: '#2073DD',
}

export const GlobalProps = styled.View`
	/* Padding */
	${({ p }) => p ? `padding: ${p}px;` : null}
	${({ pt }) => pt ? `padding-top: ${pt}px;` : null}
	${({ pr }) => pr ? `padding-right: ${pr}px;` : null}
	${({ pb }) => pb ? `padding-bottom: ${pb}px;` : null}
	${({ pl }) => pl ? `padding-left: ${pl}px;` : null}
	/* Margin */
	${({ m }) => m ? `margin: ${m}px;` : null}
	${({ mt }) => mt ? `margin-top: ${mt}px;` : null}
	${({ mr }) => mr ? `margin-right: ${mr}px;` : null}
	${({ mb }) => mb ? `margin-bottom: ${mb}px;` : null}
	${({ ml }) => ml ? `margin-left: ${ml}px;` : null}
	/* Radius */
	${({ radius }) => radius ? `border-radius:${radius}px;` : null}
	${({ rtl }) => rtl ? `border-top-left-radius: ${rtl}px;` : null}
	${({ rtr }) => rtr ? `border-top-right-radius: ${rtr}px;` : null}
	${({ rbl }) => rbl ? `border-bottom-left-radius: ${rbl}px;` : null}
	${({ rbr }) => rbr ? `border-bottom-right-radius: ${rbr}px;` : null}
	/* Border */
	${({ borderColor }) => borderColor ? `border-color: ${borderColor};` : null}
	${({ borderWidth }) => borderWidth ? `border-width: ${wp(`${borderWidth}%`)}px;` : null}
`;

export const Title = styled.Text`
	color: ${({ color }) => color ? color : COLORS.white};
	font-size: ${({ fontsize }) => fontsize ? wp(`${fontsize}%`) :  wp('8%')}px;
	${({ bold }) => bold ? 'font-weight: bold' : null};
	${({ textAlign }) => textAlign ? `text-align: ${textAlign}` : null}
`;

export const SimpleText = styled.Text`
	color: ${({ color }) => color ? color : COLORS.white};
	${({ fontsize }) => fontsize ? `font-size: ${wp(`${fontsize}%`)}px;` : null}
	${({ bold }) => bold ? 'font-weight: bold' : null};
`;

export const Wrapper = styled(GlobalProps)`
	/* Flex */
	${({ flex }) => flex ? `flex: ${flex};` : null}
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
	${({ position }) => position ? `position: ${position};` : null}
	/* ${({ borderColor }) => borderColor ? `border-color: ${borderColor};` : null} */
`;

export const Content = styled(GlobalProps)`
	/* Flex */
	${({ flex }) => flex ? `flex: ${flex};` : null}
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;

export const Header = styled(GlobalProps)`
	/* Flex */
	${({ flex }) => flex ? `flex: ${flex};` : null}
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;

export const Box = styled(GlobalProps)`
	${({ direction }) => direction ? `flex-direction: ${direction};` : null}
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ flex }) => flex ? `flex: ${flex};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;

export const Column = styled(GlobalProps)`
	flex-direction: column;
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;

export const Row = styled(GlobalProps)`
	flex-direction: row;
	${({ block }) => block ? 'width: 100%;' : null}
	${({ align }) => align ? `align-items: ${align};` : null}
	${({ justify }) => justify ? `justify-content: ${justify};` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;

export const Space = styled.View`
	${({ horizontal }) => horizontal ? `width: ${wp(`${horizontal}%`)}px;` : null}
	${({ vertical }) => vertical ? `height: ${hp(`${vertical}%`)}px;` : null}
	${({ bg }) => bg ? `background-color: ${bg};` : null}
`;