import React from 'react';
import { View,  StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors'
import dimens from '../constants/dimens'

const OutlineButton = (props) => {

  const { buttonContainer } = styles;
  const { style } = props;
 
  return (
    <View style={{...style, ...buttonContainer}}>
      <Button onPress={props.onPress} title="Click me"/>
    </View>
  )
};



const styles = StyleSheet.create({
  buttonContainer: {
    height: dimens.buttonHeight,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 20,
    borderWidth: dimens.buttonBorderWidth,
    borderColor: colors.colorAccent,
    backgroundColor: colors.transparent
  }
});

export default OutlineButton;