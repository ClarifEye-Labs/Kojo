import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity} from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

const InputWithSubHeading = (props) => { 
  const{
    subTextStyle,
    inputStyle,
    inputContainerStyle
  } = styles

  const {
    secureTextEntry,
    placeholder,
    subHeadingTitle,
    subHeadingStyle,
    textInputStyle,
    textInputContainerStyle,
    autoCompleteType,
    autoCorrect,
    autoCapitalize
  } = props

  const subHeadingStyling = {
    ...subTextStyle,
    ...subHeadingStyle
  }

  const inputStyling = {
    ...inputStyle,
    ...textInputStyle
  }

  const inputContainerStyling = {
    ...textInputContainerStyle,
    ...inputContainerStyle
  }

  const component = 
    <View>
      <Text style={subHeadingStyling}>{subHeadingTitle}</Text>
      <View style={inputContainerStyling}>
        <TextInput 
          style={inputStyling}
          secureTextEntry = {secureTextEntry}
          autoCompleteType={autoCompleteType ? autoCompleteType: 'off'}
          autoCorrect={autoCorrect ? autoCorrect: true}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          placeholder={placeholder}/>
      </View>
    </View>

  return component
}

const styles = StyleSheet.create({
  subTextStyle: {
    fontSize:12,
    color: colors.blackTransluscent,
    fontFamily: customFonts.regular
  },
  inputContainerStyle: {
    height: dimens.textInputHeight,
    borderBottomWidth: dimens.inputTextBorderWidth,
    borderBottomColor: colors.blackTransluscent,
  },
  inputStyle: {
    flex: 1,
    fontSize: dimens.inputTextFontSize,
    fontFamily: customFonts.regular
   }
})

export default InputWithSubHeading

