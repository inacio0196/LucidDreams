import React from 'react';

import { TouchableButton, ButtonTitle } from './styles';

export const Button = ({ title, block, onPress, textcolor }) => {
	return (
		<TouchableButton
			block
			onPress={onPress}
		>
			<ButtonTitle
				textcolor={textcolor}
			>
				{title}
			</ButtonTitle>
		</TouchableButton>
	)
}