import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class AddressScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Address Screen'
    }
  }
  render() {
    const {
      mainContainer
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
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

AddressScreen.navigationOptions = {
  title: 'Address Screen'
}

AddressScreen.propTypes = {
  navigation: PropTypes.object
}

export default AddressScreen