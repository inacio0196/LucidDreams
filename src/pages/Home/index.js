import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

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
	const [todayDream, setTodayDream] = useState(null)
	// FrontStates
	const [modalVisible, setModalVisible] = useState(false)
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
		getTodayDream()
	}, [])

	// Functions
	function getRealityTests () {
		firestore()
			.collection('today-reality-checks')
			.doc(user.userID)
			.collection('checks')
			.get()
			.then(snapshot => {
				const realityChecks = getItemsOnQuery(snapshot)

				setRealityChecks(realityChecks)
			})
	}

	function getTodayDream () {
		const today = dayjs().format('YYYY-MM-DD')

		firestore()
			.collection('dreams')
			.where('dreamUserID', '==', user.userID)
			.where('createdDate', '==', today)
			.get()
			.then(snapshot => {
				const todayDream = getItemsOnQuery(snapshot)

				if (todayDream.length > 0) {
					setTodayDream(todayDream[0])
				}
			})
	}

	function handleRealityCheckClick () {
		setModalVisible(true)
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
						realityChecks.length > 0
						? realityChecks.map(item => (
							<CheckItem
								key={item.id}
								onPress={() => handleRealityCheckClick()}
								title={item.title}
								description={item.description}
								status={item.status}
							/>
						))
						: (
							<>
								<Space height={20} />
								<Row
									justify='center'
								>
									<ActivityIndicator
										animating={true}
										color={COLORS.white}
										size={wp('15%')}
									/>
								</Row>
								<Space height={20} />
							</>
						)
					}
					<Space height={20} />
					<Row
						align='center'
						justify='space-between'
					>
						<Title>Hoje</Title>
						<Title
							bold
						>
							{dayjs().format('dddd D')}
						</Title>
					</Row>
					<Space height={20} />
					{
						todayDream
						? (
							<DreamCard
								isRecent={true}
								title={todayDream.title}
								createdAt={todayDream.createdAt}
								climate={todayDream.dreamClimate}
								onPressReadDream={goToDreamHistory}
							/>
						)
						: (
							<Row
								align='center'
								justify='center'
								mt={20}
							>
								<SimpleText
									color='#FFF9'
									fontsize={4}
								>
									Você não possuí nenhum sonho cadastrado hoje
								</SimpleText>
							</Row>
						)
					}
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
								fontsize={5}
							>
								Ver Histórico
							</SimpleText>
						</TouchableOpacity>
					</Row>
				</Content>
				<Space height={30} />
			</ScrollView>

			
				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<Wrapper
						align='center'
						flex={1}
						justify='center'
						bg={COLORS.white}
						mt={200}
						mb={200}
						ml={30}
						mr={30}
						radius={20}
					>
						<SimpleText color='#000'>Modalllll ai ai</SimpleText>
					</Wrapper>
				</Modal>
			
		</Wrapper>
	)
}