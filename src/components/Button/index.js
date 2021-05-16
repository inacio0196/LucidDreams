import React from 'react';

import { TouchableButton, ButtonTitle } from './styles';

export const Button = ({ title, backgroundColor, disabled, block, onPress, textcolor }) => {
	return (
		<TouchableButton
			block
			onPress={onPress}
			backgroundColor={backgroundColor}
			disabled={disabled}
		>
			<ButtonTitle
				textcolor={textcolor}
			>
				{title}
			</ButtonTitle>
		</TouchableButton>
	)
}