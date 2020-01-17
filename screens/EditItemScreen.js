import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 

class EditItemScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'Edit Item Screen'
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

EditItemScreen.navigationOptions = {
  title: 'EditItemScreen'
}

export default EditItemScreen