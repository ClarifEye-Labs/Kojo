import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity} from 'react-native'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import { Ionicons } from '@expo/vector-icons';

class SearchIcon extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  render() {
 
    const{
      size,
      color,
      style,
      onPress
    } = this.props

    const nameOfIcon =  (Platform.OS === 'ios') ? 'ios-search' : 'md-search' 
    const sizeOfIcon = (typeof size !== 'undefined' ) ? size : 32
    const colorOfIcon = (typeof color !== 'undefined' ) ? color : colors.black

    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Ionicons  name={nameOfIcon} size={sizeOfIcon} color={colorOfIcon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
})

export default SearchIcon