import React from 'react'
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  Picker} from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

class dropDownwithAddNewOption extends React.Component {
  constructor(props){
    super(props)
  }  

  render(){
    const{
      subTextStyle,
      inputStyle,
      inputContainerStyle
    } = styles
  
    const {
      
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
      ...textInputContainerStyle,
      ...inputContainerStyle,
      borderBottomColor: errorStatus ? colors.errorRed : colors.blackTransluscent
    }
  
    const component = 
      <View>
        <Picker>
          
        </Picker>
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
    borderBottomWidth: dimens.inputTextBorderWidth,
  },
  inputStyle: {
    flex: 1,
    fontSize: dimens.inputTextFontSize,
    fontFamily: customFonts.regular
   }
})

export default InputWithSubHeading

