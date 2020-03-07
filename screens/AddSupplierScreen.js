import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class AddSupplierScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation
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
        <Text> Hello from AddSupplierScreen </Text>
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

AddSupplierScreen.navigationOptions = {
  title: 'AddSupplierScreen'
}

AddSupplierScreen.propTypes = {
  navigation: PropTypes.object
}

export default AddSupplierScreen