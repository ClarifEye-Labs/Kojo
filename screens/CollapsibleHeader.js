import React, { Component } from 'react';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import str from './content';
import { dimens, colors } from '../constants';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 100;

const { width: SCREEN_WIDTH } = Dimensions.get("screen")

class CollapsibleHeader extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const headerTitle = 'HEADER'

    return (
      <CollapsibleHeaderScrollView
    CollapsibleHeaderComponent={<View style={{  width: '100%',
    backgroundColor: colors.colorPrimary, height: headerHeight}} />}
    headerHeight={300}
    statusBarHeight={100}
    >
    <View style={{ height: 2000, backgroundColor: 'wheat' }} />
  </CollapsibleHeaderScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: HEADER_EXPANDED_HEIGHT
  },
  header: {
    backgroundColor: colors.colorPrimary,
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 2
  },
  title: {
    marginVertical: 16,
    color: "black",
    fontWeight: "bold",
    fontSize: 24
  }
});


CollapsibleHeader.navigationOptions = {
  header:null
}

export default CollapsibleHeader
