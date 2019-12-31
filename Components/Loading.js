import React from 'react'
import { ActivityIndicator, View, StyleSheet, Text} from 'react-native'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'

const Loading = (props) => { 
  const screenName='Loading'
  const {
    mainContainer,
    defaultTextStyle
  } = styles

  const {
    size,
    color,
    textColor,
    textStyle
  } = props

  var sizeMain = size ? size : 'large';
  var colorMain = color ? color : colors.blackTransluscent;
  var textColorMain = textColor ? textColor : colors.blackTransluscent;

  var textStyleMain = {
    ...textStyle,
    ...defaultTextStyle,
    color: textColorMain
  }

  const component = 
  <View style={mainContainer}>
    <ActivityIndicator size={sizeMain} color={colorMain}/>
    <Text style={textStyleMain}> {strings.loading}</Text>
  </View>

  return component
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  defaultTextStyle:{
    fontFamily: customFonts.regular,
    fontSize: 18,
    margin: dimens.screenVerticalMargin - 10,
    color: colors.blackTransluscent
  }
})

export default Loading

