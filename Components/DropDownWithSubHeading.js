import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput} from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'
import ModalDropdown from 'react-native-modal-dropdown';

class DropDownWithSubHeading extends React.Component {
  constructor(props){
    super(props)
  }  

  render(){
    const{
      subTextStyle,
      inputStyle,
      inputContainerStyle,
      stylingForButton,
      dropDownTextStyle

    } = styles
  
    const {
      subHeadingTitle,
      subHeadingStyle,
      errorStatus,
      disabled,
      options,
      style,
      dropDownStyle,
      onSelect,
      textInputStyle,
      textInputContainerStyle,
      containerStyle
    } = this.props
  
    const subHeadingStyling = {
      ...subTextStyle,
      ...subHeadingStyle,
      color: errorStatus? colors.errorRed : colors.blackTransluscent
    }
  
    const inputStyling = {
      ...inputStyle,
      ...textInputStyle
    }
  
    const inputContainerStyling = {
      ...inputContainerStyle,

    }
  
    const component = 
      <View style={containerStyle}>
        <Text style={subHeadingStyling}>{subHeadingTitle}</Text>
        <View style={inputContainerStyling}>
          <ModalDropdown 
          options = {options} 
          onSelect ={onSelect}
          disabled = {disabled}
          style = {stylingForButton}
          textStyle = {dropDownTextStyle}
          dropDownTextStyle = {dropDownTextStyle}
          /> 

        </View>
      </View>
  
    return component
  }
}

const styles = StyleSheet.create({
  subTextStyle: {
    fontSize:13,
    fontFamily: customFonts.regular
  },
  inputContainerStyle: {
    height: dimens.textInputHeight,
  },
  inputStyle: {
    flex: 1,
    fontSize: dimens.inputTextFontSize,
    fontFamily: customFonts.regular
   },
   stylingForButton : {
    width: dimens.defaultButtonWidth,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimens.textInputHeight,
    borderBottomWidth: dimens.inputTextBorderWidth
  },
  dropDownTextStyle:{
    flex: 1,
    fontSize: dimens.inputTextFontSize,
    fontFamily: customFonts.regular
  }
})

export default DropDownWithSubHeading

