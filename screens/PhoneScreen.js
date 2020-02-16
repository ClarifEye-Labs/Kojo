import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal    
} from 'react-native'
import { Back, Edit, Card, TextWithSubheading, Button, Cross } from '../Components'
import { LinearGradient } from 'expo-linear-gradient';
import { dimens, colors, customFonts, strings, screens } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'
import firebase from '../config/firebase'

class PhoneScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'Phone Screen'
    }
  }
  render() {
    const {
      mainContainer,
      itemNameStyle,
      editButton,
      imageContainer,
      imageStyling,
      gradientStyle,
      headerContainer,
      infoItemContainer,
      subHeadingStyle,
      textStyle,
      buttonContainer,
      deleteButtonStyle,
    } = styles

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
      <Back size={34} style={commonStyling.backButtonStyling} color={colors.colorAccent} onPress={() => navigation.goBack()} />
        <Text> Hello from {this.state.name} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

PhoneScreen.navigationOptions = {
  title: 'Phone Screen'
}

PhoneScreen.propTypes = {
  navigation: PropTypes.object
}

export default PhoneScreen