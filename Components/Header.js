import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import Back from './Back';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    const {
      mainContainer,
      backButtonStyle
    } = styles

    const {
      headerTitle,
      titleStyle,
      backButtonColor,
      headerNull
    } = this.props
    return (
      <View style={mainContainer}>
        <Back style={backButtonStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 80,
    width: '100%',
    backgroundColor: colors.colorAccent
  },
  backButtonStyle: {
    ...commonStyling.backButtonStyling
  }
})

export default Header