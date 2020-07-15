import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class ViewOrderItemDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: props.navigation.state.params
    }
  }

  render() {
    const {
      mainContainer
    } = styles

    console.log(this.state.item)
    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Text> Hello from Item </Text>
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

ViewOrderItemDetails.navigationOptions = {
  header: null
}

ViewOrderItemDetails.propTypes = {
  navigation: PropTypes.object
}

export default ViewOrderItemDetails