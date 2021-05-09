import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Row } from '../../styles';
import {
	InputWrapper,
	ErrorMessage,
	InputContainer,
	InputComponent,
	SecureControl
} from './styles';
import { Icon } from '../../components';
import { COLORS } from '../../styles';

export const Input = ({
	placeholder,
	errorMessage,
	onChangeText,
	keyboardType,
	autoCapitalize,
	autoCompleteType,
	secureTextEntry,
	value,
}) => {
	// States
	const [isFocused, setIsFocused] = useState(false)
	const [showSecure, setShowSecure] = useState(true)

	// Function
	function handleSecureText () {
		return setShowSecure(prevState => !prevState)
	}
	
  return (
		<InputWrapper>
			<InputContainer
				inputActive={isFocused}
			>
				<InputComponent
					placeholder={placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChangeText={text => onChangeText(text)}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					autoCompleteType={autoCompleteType}
					secureActive={secureTextEntry}
					secureTextEntry={secureTextEntry ? showSecure : false}
					value={value}
				/>
				{ secureTextEntry && (
					<SecureControl
						onPress={handleSecureText}
					>
						{
							showSecure
							? (
								<Icon.EyeFill
									fill={isFocused ? COLORS.yellow : COLORS.gray}
									width={wp('7%')}
									height={hp('7%')}
								/>
							)
							: (
								<Icon.EyeSlashFill
									fill={isFocused ? COLORS.yellow : COLORS.gray}
									width={wp('7%')}
									height={hp('7%')}
								/>
							)
						}
					</SecureControl>
				)}
			</InputContainer>
			{
				errorMessage !== '' && (
					<Row block justify='flex-start'>
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					</Row>
				)
			}
		</InputWrapper>
	)
}