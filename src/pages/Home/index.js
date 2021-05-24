import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { Icon, DotsMenu, CheckItem, DreamCard, Button } from '../../components';
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
	const [modalTitle, setModalTitle] = useState('')
	const [modalDescription, setModalDescription] = useState('')
	const [modalStatus, setModalStatus] = useState('todo')
	const [realityCheckId, setRealityCheckId] = useState('')
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
			.onSnapshot(snap => {
				if (snap.docs.length > 0) {
					const realityChecks = getItemsOnQuery(snap)

					setRealityChecks(realityChecks)
				}
			})
	}

	function getTodayDream () {
		const today = dayjs().format('YYYY-MM-DD')

		firestore()
			.collection('dreams')
			.where('dreamUserID', '==', user.userID)
			.where('createdDate', '==', today)
			.onSnapshot(snap => {
				if (snap.docs.length > 0) {
					const todayDream = getItemsOnQuery(snap)

					if (todayDream.length > 0) {
						setTodayDream(todayDream[0])
					}
				}
			})
	}

	function handleRealityCheck () {
		firestore()
			.collection('today-reality-checks')
			.doc(user.userID)
			.collection('checks')
			.doc(realityCheckId)
			.update({
				status: 'done'
			})
			.then(() => {
				setModalVisible(false)
			})
			.catch(error => console.log(error))
	}

	function handleRealityCheckClick (title, description, realityCheckID, status) {
		setModalTitle(title)
		setModalDescription(description)
		setModalStatus(status)
		setRealityCheckId(realityCheckID)
		setModalVisible(true)
	}

	function goToDreamHistory () {
		navigation.navigate('DreamHistory')
	}

	function goToDreamView () {
		navigation.navigate('DreamView', { dream: todayDream })
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
							color={COLORS.white}
						>
							{realityChecks.length - realityChecks.filter(check => check.status === 'todo').length} / {realityChecks.length}
						</Title>
					</Row>
					<Space height={10} />
					{
						realityChecks.length > 0
						? realityChecks.map(item => (
							<CheckItem
								key={item.id}
								onPress={() => handleRealityCheckClick(item.title, item.description, item.id, item.status)}
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
								onPressReadDream={goToDreamView}
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
					bg={COLORS.white}
					mt={wp('50%')}
					mb={wp('50%')}
					ml={wp('8%')}
					mr={wp('8%')}
					p={wp('5%')}
					radius={wp('8%')}
					borderColor={COLORS.secundary}
					borderWidth={wp('0.3%')}
				>
					<Row
						align='center'
						block
						justify='flex-end'
					>
						<TouchableOpacity
							color='#000'
							hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}
							onPress={() => setModalVisible(false)}
						>
							<Icon.Close fill={COLORS.secundary} width={wp('6%')} height={hp('6%')} />
						</TouchableOpacity>
					</Row>
					<Space height={10} />
					<Title
						color={COLORS.secundary}
						fontsize={6}
						textAlign='center'
					>
						{modalTitle}
					</Title>
					<Space height={20} />
					<SimpleText
						color='#000'
						fontsize={4}
					>
						{modalDescription}
					</SimpleText>
					<Space height={20} />
					<Row>
						<Button
							title={modalStatus === 'done' ? 'Concluído' : 'Feito!'}
							backgroundColor={COLORS.secundary}
							textcolor={COLORS.white}
							onPress={handleRealityCheck}
							disabled={modalStatus === 'done'}
						/>
					</Row>
				</Wrapper>
			</Modal>
			
		</Wrapper>
	)
}