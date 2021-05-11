import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList, TouchableOpacity } from 'react-native';

import { Column, Content, SimpleText, COLORS } from '../../styles';
import { SelectedIndicator } from './styles';
import { Icon } from '../../components';

const ICON_WIDTH = wp('15%')
const ICON_HEIGHT = hp('8%')

export const ReactionSelect = ({ onReallySelect }) => {
  // States
  const [reactions, setReactions] = useState([
    {
      key: '01',
      name: 'Sim',
      id: true,
      icon: () => <Icon.EmojiSmiley width={ICON_WIDTH} height={ICON_HEIGHT} />,
      isSelected: false,
    },
    {
      key: '02',
      name: 'Não',
      id: false,
      icon: () => <Icon.EmojiReally fill='#000' width={ICON_WIDTH} height={ICON_HEIGHT} />,
      isSelected: false,
    },
  ])
  // FrontStates
  const [refresh, setRefresh] = useState(false)

  // Functions
  function selectReally (selectedIndex) {
    const newReactions = reactions.map((reaction, index) => {
      if (selectedIndex === index) {
        return {
          ...reaction,
          isSelected: true,
        }
      } else {
        return {
          ...reaction,
          isSelected: false,
        }
      }
    })

    setReactions(newReactions)
    onReallySelect(newReactions[selectedIndex].id)
    setRefresh(prevState => !prevState)
  }
  
  return (
    <Content>
      <FlatList
        data={reactions}
        extraData={refresh}
        horizontal
        contentContainerStyle={{ width: '100%', justifyContent: 'space-around' }}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => selectReally(index)}
          >
            <Column
              align='center'
            >
              {item.icon()}
              <SelectedIndicator
                isSelected={item.isSelected}
              >
                <SimpleText
                  bold={item.isSelected}
                  color={item.isSelected ? COLORS.green : COLORS.white}
                >
                  {item.name}
                </SimpleText>
              </SelectedIndicator>
            </Column>
          </TouchableOpacity>
        )}
      />
    </Content>
  )
}