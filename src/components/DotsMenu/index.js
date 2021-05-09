import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Icon } from '../../components';
import { COLORS } from '../../styles';
import { MenuOptionText } from './styles';

export const DotsMenu = ({ options }) => {
	return (
		<TouchableOpacity>
			<Menu>
				<MenuTrigger>
					<Icon.ThreeDots fill={COLORS.white} width={wp('9%')} height={hp('5%')} />
				</MenuTrigger>
				<MenuOptions
					optionsContainerStyle={styles.optionsContainer}
				>
					<FlatList
						data={options}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<MenuOption
								key={item.id}
								onSelect={item.action}
								disabled={item.disabled}
							>
								<MenuOptionText
									disabled={item.disabled}
								>
									{item.name}
								</MenuOptionText>
							</MenuOption>
						)}
					/>
				</MenuOptions>
			</Menu>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	optionsContainer: {
		padding: wp('2%'),
		borderRadius: wp('2%'),
	}
})