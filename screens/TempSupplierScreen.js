import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import {Button} from '../Components'
import firebase from '../config/firebase'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 

class SupplierScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
        name : '',
        inventory : '',
        clients : ''
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

Name.navigationOptions = {
  title: 'Title'
}

export default Name