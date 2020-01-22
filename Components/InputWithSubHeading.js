import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

class InputWithSubHeading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      subTextStyle,
      inputStyle,
      inputContainerStyle,
      subHeadingContainerStyle,
      errorStyle
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
      autoCapitalize,
      errorStatus,
      onChangeText,
      keyboardType,
      containerStyle,
      inputValue,
      errorTitle
    } = this.props

    const subHeadingStyling = {
      ...subTextStyle,
      ...subHeadingStyle
    }

    const subHeadingErrorStyling = {
      ...subTextStyle,
      ...errorStyle,
      color: colors.errorRed
    }

    const inputStyling = {
      ...inputStyle,
      ...textInputStyle
    }

    const inputContainerStyling = {
      ...textInputContainerStyle,
      ...inputContainerStyle,
      borderBottomColor: errorStatus ? colors.errorRed : colors.blackTransluscent
    }


    const component =
      <View style={containerStyle}>
        <View style={subHeadingContainerStyle}>
          <Text style={subHeadingStyling}>{subHeadingTitle}</Text>
          {errorTitle
          ? <Text style={subHeadingErrorStyling}>{errorTitle}</Text>
          : null }
        </View>
        <View style={inputContainerStyling}>
          <TextInput
            style={inputStyling}
            secureTextEntry={secureTextEntry}
            autoCompleteType={autoCompleteType ? autoCompleteType : 'off'}
            autoCorrect={autoCorrect ? autoCorrect : true}
            onChangeText={onChangeText}
            value={inputValue}
            keyboardType={keyboardType ? keyboardType : 'default'}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
            placeholder={placeholder} />
        </View>
      </View>

    return component
  }
}

const styles = StyleSheet.create({
  subTextStyle: {
    fontSize: 13,
    fontFamily: customFonts.regular
  },
  inputContainerStyle: {
    height: dimens.textInputHeight,
    borderBottomWidth: dimens.inputTextBorderWidth,
  },
  inputStyle: {
    flex: 1,
    fontSize: dimens.inputTextFontSize,
    fontFamily: customFonts.regular
  },
  subHeadingContainerStyle: {
    width: '100%',
    flexDirection: 'column'
  },
  errorStyle: {
    marginTop: 8
  }
})

export default InputWithSubHeading

