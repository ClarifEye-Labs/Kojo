import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const BackgroundImage = (props) => {

  const { container } = styles; 
  const { source } = props; 

  return (
    <View style={container}>
      <Image source={source} />
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
  }
});

BackgroundImage.propTypes = {
  source: PropTypes.number
}

export default BackgroundImage;