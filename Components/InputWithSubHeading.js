import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import {PropTypes} from 'prop-types'

const InputWithSubHeading = (props) => {
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
    errorTitle,
    editable
  } = props

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
          : null}
      </View>
      <View style={inputContainerStyling}>
        <TextInput
          editable={editable}
          style={inputStyling}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          autoCompleteType={autoCompleteType ? autoCompleteType : 'off'}
          autoCorrect={autoCorrect ? autoCorrect : true}
          onChangeText={onChangeText}
          value={inputValue}
          keyboardType={keyboardType ? keyboardType : 'default'}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          placeholderTextColor={colors.grayTransluscent}
          placeholder={placeholder} />
      </View>
    </View>

  return component
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

InputWithSubHeading.propTypes = {
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  subHeadingTitle: PropTypes.string,
  subHeadingStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  textInputContainerStyle: PropTypes.object,
  autoCompleteType: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  errorStatus: PropTypes.bool,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  containerStyle: PropTypes.object,
  inputValue: PropTypes.string,
  errorTitle: PropTypes.string,
  editable: PropTypes.bool
}

export default InputWithSubHeading

