import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

const BackgroundImage = (props) => {

  const { container, image } = styles;


  return (
    <View style={container}>
      <Image source={props.source} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,   
    width: '100%',
    height: '100%'
  },
  image: {  
    resizeMode: 'cover',
    flex: 1
  }
});

export default BackgroundImage;