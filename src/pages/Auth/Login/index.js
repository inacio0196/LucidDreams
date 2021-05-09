import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';

import { Wrapper, COLORS, Title, Space } from '../../../styles';
import { Banner, Input, Button } from '../../../components';

import { login } from '../../../store/Authenticate/Authenticate.actions';
import { firebase } from '../../../firebase';

export default function Login () {
	// Redux
	const dispatch = useDispatch()
	// States
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// FrontStates
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	})

	// Functions
	function authenticate () {
		firebase
			.auth()
			.signInWithEmailAndPassword('rafael.inacio0196@gmail.com', '123456')
			.then(() => {
				dispatch(login({
					name: 'Rafael Inácio',
					birthday: '16/06/1998',
				}))
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!')
				}
		
				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!')
				}
		
				console.error(error)
			})
	}
	
	return (
		<Wrapper
			p={15}
			flex={1}
			align='center'
			justify='center'
			bg={COLORS.purple}
		>
			<StatusBar
				backgroundColor={COLORS.purple}
				barStyle='light-content'
			/>
			<Title>Sonhos Lúcidos</Title>
			<Banner.Sleep width={wp('80%')} height={hp('40%')} />
			<Input
				errorMessage={errors.email}
				placeholder='Digite seu email'
				onChangeText={text => setEmail(text)}
				keyboardType='email-address'
				value={email}
				autoCapitalize='none'
				autoCompleteType='email'
			/>
			<Space height={10} />
			<Input
				errorMessage={errors.password}
				placeholder='Digite sua senha'
				onChangeText={text => setPassword(text)}
				value={password}
				keyboardType='default'
				autoCapitalize='none'
				autoCompleteType='password'
				secureTextEntry
			/>
			<Space height={20} />
			<Button
				title='Entrar'
				block
				onPress={authenticate}
			/>
		</Wrapper>
	)
}