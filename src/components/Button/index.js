import React from 'react';

import { TouchableButton, ButtonTitle } from './styles';

export const Button = ({ title, block, onPress }) => {
	return (
		<TouchableButton
			block
			onPress={onPress}
		>
			<ButtonTitle>{title}</ButtonTitle>
		</TouchableButton>
	)
}