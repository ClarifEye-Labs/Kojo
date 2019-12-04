import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

const LandingContentView = (props) => {
  const { container} = styles;
  return (
    <View style={container}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0
  }
});

export default LandingContentView;