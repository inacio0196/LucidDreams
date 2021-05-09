import React from 'react';

import { CheckText, CheckContainer, CheckBox, CheckBoxContainer } from './styles';

export const CheckItem = ({ checked, title, onPress }) => {
  // functions
  function shortenText (text) {
    let shorten = text
    
    if (shorten.length >= 41) {
      shorten =  shorten.substr(0, 41) + '...'
    }

    return shorten
  }
  
  return (
    <CheckContainer
      onPress={onPress}
    >
      <CheckBoxContainer>
        <CheckBox checked={checked} />
      </CheckBoxContainer>
      <CheckText>{shortenText(title)}</CheckText>
    </CheckContainer>
  )
}