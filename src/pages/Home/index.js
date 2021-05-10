import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Icon, DotsMenu, CheckItem, DreamCard } from '../../components';
import { Wrapper, Title, COLORS, Row, Space, Content, SimpleText } from '../../styles';

import { selectUser } from '../../store/Authenticate/Authenticate.selectors';
import { logout } from '../../store/Authenticate/Authenticate.actions';

import firestore from '@react-native-firebase/firestore';

export default function Home () {
	// Navigation
	const navigation = useNavigation()
	// Redux
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	// States
	const [realityTests, setRealityTests] = useState([])
	// Data
	const menuOptions = [
		{
			id: '1',
			name: 'Perfil',
			action: () => alert('perfil'),
			disabled: true,
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
				firebase
					.auth()
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

	const checkItems = [
		{
			id: '1',
			title: 'Draw apple for 5 minutes',
			checked: false,
		},
		{
			id: '2',
			title: 'Go out to Libros Coffee and look fot hot people improvision',
			checked: false,
		},
		{
			id: '3',
			title: 'Check out updates on email',
			checked: false,
		},
	]

	// Effects
	useEffect(() => {
		getRealityTests()
	}, [])
	
	// Functions
	async function getRealityTests () {
		const reality = await firestore().collection('reality-checks').get()
		console.log({reality})

		// console.log({data})
			// .onSnapshot(query => {
			// 	console.log({query})
			// 	const items = []
			// 	query.forEach(doc => {
			// 		console.log({doc})
			// 		items.push({
			// 			...doc.data(),
			// 			id: doc.id,
			// 		})
			// 	})
			// })
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
							3
						</Title>
					</Row>
					<Space height={10} />
					{
						checkItems.map(item => (
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