import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class ViewSupplierScreen extends Component {
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
        <Text> Hello from screen </Text>
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

ViewSupplierScreen.navigationOptions = {
  title: 'ViewSupplierScreen'
}

ViewSupplierScreen.propTypes = {
  navigation: PropTypes.object
}

export default ViewSupplierScreen