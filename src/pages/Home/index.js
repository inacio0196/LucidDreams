import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Icon, DotsMenu, CheckItem, DreamCard } from '../../components';
import { Wrapper, Title, COLORS, Row, Space, Content, SimpleText } from '../../styles';

import { selectUser } from '../../store/Authenticate/Authenticate.selectors';
import { logout } from '../../store/Authenticate/Authenticate.actions';
import { getItemsOnQuery } from '../../utils/firestore';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home () {
	// Navigation
	const navigation = useNavigation()
	// Redux
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	// States
	const [realityChecks, setRealityChecks] = useState([])
	// Data
	const menuOptions = [
		{
			id: '1',
			name: 'Registrar sonho',
			action: () => navigation.navigate('RegisterDream'),
			disabled: false,
		},
		{
			id: '2',
			name: 'Configurações',
			action: () => alert('Configs'),
			disabled: false,
		},
		{
			id: '3',
			name: 'Sair',
			action: () => {				
					auth()
					.signOut()
					.then(() => {
						dispatch(logout())
					})
					.catch(error => {
						console.log(error)
					})
			},
			disabled: false,
		},
	]

	// Effects
	useEffect(() => {
		getRealityTests()
	}, [])
	
	// Functions
	async function getRealityTests () {
		firestore()
			.collection('reality-checks')
			.get()
			.then(snapshot => {
				const realityChecks = getItemsOnQuery(snapshot)

				setRealityChecks(realityChecks)
			})
	}

	function goToDreamHistory () {
		navigation.navigate('DreamHistory')
	}
	
	return (
		<Wrapper
			pt={15}
			pl={15}
			pr={15}
			pb={2}
			flex={1}
			bg={COLORS.secundary}
		>
			<StatusBar backgroundColor={COLORS.secundary} />
			<Row
				align='center'
				justify='space-between'
			>
				<Row
					align='center'
					justify='flex-start'
				>
					<Icon.User width={wp('13%')} height={hp('6%')} />
					<Space width={10} />
					<Title>{user.name}</Title>
				</Row>
				<DotsMenu
					options={menuOptions}
				/>
			</Row>
			<Space height={20} />
			<ScrollView
				horizontal={false}
				showsVerticalScrollIndicator={false}
			>
				<Content>
					<Row
						align='center'
						justify='space-between'
					>
						<Title>Lembretes</Title>
						<Title
							bold
							color={COLORS.secundaryDark}
						>
							{realityChecks.length}
						</Title>
					</Row>
					<Space height={10} />
					{
						realityChecks.map(item => (
							<CheckItem
								key={item.id}
								title={item.title}
								checked={item.checked}
							/>
						))
					}
					<Space height={20} />
					<Row
						align='center'
						justify='space-between'
					>
						<Title>Sonhos Recentes</Title>
						<Title
							bold
							color={COLORS.secundaryDark}
						>
							5
						</Title>
					</Row>
					<Space height={20} />
					<DreamCard
						isRecent={true}
						onPressReadDream={goToDreamHistory}
					/>
					<Space height={20} />
					<Row
						align='center'
						justify='flex-end'
					>
						<TouchableOpacity
							onPress={goToDreamHistory}
						>
							<SimpleText
								bold
								fontsize={4}
							>
								Ver Histórico
							</SimpleText>
						</TouchableOpacity>
					</Row>
				</Content>
			</ScrollView>
		</Wrapper>
	)
}