import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Button, Animated,
  Dimensions,
  Platform,
  ScrollView} from 'react-native'
import { SearchBar } from 'react-native-elements'
import str from './content';
import { Loading, Card, SearchIcon, Heading, Back } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common' 
import * as Animatable from 'react-native-animatable'
import firebase from '../config/firebase'
import Utils from '../utils/Utils';
import {connect} from 'react-redux';


const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 100;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen")

class SupplierInventoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: 'SupplierInventoryScreen',
        loadingContent: false,
        firestore: undefined,
        suppliersData: undefined,
        scrollY: new Animated.Value(0),
        supplierID: 'carlsberg',
        inventory: undefined,
        search: '',
        showSearch: false,
        dummyInventory: [
          {title: 'Alcohol', data: [
            
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"},
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"}] },  
          {title: 'Dairy', data: [
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"}]}
        ]
    }
  }

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle
    } = styles
    
    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>Inventory </Text>
        <Text style={subHeadingStyle}>View your items below: </Text> 
      </View>
    )
  }

  getCollapsedHeaderView = () => {
    const { 
      collpasedHeaderContainer,
      collpasedHeaderTitle,
      collapsedHeaderBackButtonStyling,
      collapsedHeaderSearchButtonStyling,
    } = styles

    return (
      <View style={collpasedHeaderContainer}>
        <Back style={collapsedHeaderBackButtonStyling} color={colors.colorAccent} />
        <Text style={collpasedHeaderTitle}>Inventory</Text>
        <SearchIcon 
          style={collapsedHeaderSearchButtonStyling} 
          size={32}
          onPress={this.showSearchPanel}
          color={colors.colorAccent}/>
      </View>
    )
  }

  updateSearch = search => {
    this.setState({search})
  }

  showSearchPanel = () => {
    this.setState({
      showSearch: true
    })
  }

  componentDidMount = () => {
    var firestore = firebase.firestore()
    var suppliersData = firestore.collection('suppliers')

    this.props.navigation.setParams({ showSearchPanel: this.showSearchPanel }); 
    this.setState({
      firestore: firestore,
      suppliersData: suppliersData
    }, () => this.getDataFromDatabase(this.state.suppliersData,this.state.supplierID))

  }

 

  getDataFromDatabase = async (suppliersData, supplierID) => {
    let supplierInventoryReference
    let supplierInventoryData = []

    await suppliersData.doc(supplierID).get().then((docRef) => {
        supplierInventoryReference = docRef.data().inventory
    }).catch((err) => {
        console.log('Error getting documents', err);
    })

    //ready to proceed to get data 
    await Utils.asyncForEach(supplierInventoryReference, async (inventory) => {
      await inventory.get().then(async (inventoryData) => {
          await supplierInventoryData.push(inventoryData.data())
      }).catch((err) => {
          console.log('Error getting documents', err);
      })
    })

    this.setState({
      inventory: supplierInventoryData,
      loadingContent: false
    })
  }

  
  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });3
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

    const {
      mainContainer,
      mainHeaderContainerStyle
    } = styles

    const {
      navigation
    } = this.props

    const componentLoading = 
      <Loading />

    const componentLoaded = 
    <Animatable.View animation='fadeInUpBig' style={mainContainer}> 
      <Animated.View style={[mainHeaderContainerStyle, {height: headerHeight}]}>

        <Animated.View 
          style={{ flex: 1, opacity: heroTitleOpacity}}> 
            {this.getMainHeaderView()}
        </Animated.View>

        <Animated.View 
          style={{ flex: 1 , opacity: headerTitleOpacity }}>
            {this.getCollapsedHeaderView()}
        </Animated.View>

      </Animated.View>
      
       {this.state.showSearch ? <SearchBar
        placeholder="Type Here..."
        lightTheme = {true}
        onChangeText={this.updateSearch}
        value={this.state.search}
      /> : null }
      <SectionList   
        contentContainerStyle = {{minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT}}
        sections={this.state.dummyInventory}
        renderItem={({item}) => SectionContent(item, this.props)}  
        renderSectionHeader={({section}) => SectionHeader(section, this.props) }  
        keyExtractor={(item, index) => index}  
        onScroll={Animated.event(
          [{ nativeEvent: {
              contentOffset: {
                y: this.state.scrollY
              }
            }
          }])
        }
        scrollEventThrottle={16}
      />  
    </Animatable.View>

    const componentToRender = this.state.loadingContent ? componentLoading : componentLoaded
    

    return componentToRender
  }
}

function mapStateToProps(state) {
  return {
    dummyInventory: state.dummyInventory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateInventory : () => dispatch({type:'UPDATE_INVENTORY'})
  }
}

const SectionHeader = (section) => {

  const { 
    sectionHeaderContainer,
    sectionHeaderTitle
  } = styles
  const sectionHeader = <View style={sectionHeaderContainer}>
    <Text style={sectionHeaderTitle}>{section.title}</Text>
  </View>

  return sectionHeader

}

const SectionContent = (sectionContent, props) => {
  const {
    sectionContentContainerOuter,
    sectionContentContainerInner,
    sectionContentText,
    imageStyle,
    cardContainerStyle,
    thinLine
  } = styles

  const{
    navigation
  } = props


  const sectionContentToRender = <View style={sectionContentContainerOuter}>
    <View style={cardContainerStyle}>
      <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
        <ImageBackground 
          style={imageStyle} 
          imageStyle={{borderRadius: dimens.defaultBorderRadius}} 
          source={{ uri: sectionContent.imageURL }} />
      </Card>
    </View>
   
    <View style={sectionContentContainerInner}>
      <TouchableOpacity onPress={()=>{navigation.navigate('InventoryItemScreen', {
        item: sectionContent
      })}}>
        <Text style={sectionContentText}>{sectionContent.name}</Text>
      </TouchableOpacity>
    </View>
  </View>

  return sectionContentToRender
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  sectionHeaderContainer: {
    width: '100%',
    height: 40,
    backgroundColor: colors.colorPrimary,
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 20,
    fontFamily: customFonts.bold
  },
  sectionContentContainerOuter: {
    height: 90,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  sectionContentContainerInner:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.blackTransluscent
  },
  sectionContentText:{
    fontFamily: customFonts.regular,
    fontSize: 17,
    color: colors.blackTransluscent
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    borderRadius: dimens.defaultBorderRadius
  },
  cardContainerStyle:{
    position: 'absolute',
    left: dimens.screenHorizontalMargin
  },
  mainHeaderContainerStyle: {
    width: '100%',
    backgroundColor: colors.colorPrimary
  },
  collpasedHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  collpasedHeaderTitle: {
    fontSize: 24,
    textAlign: "center",
    color: colors.colorAccent,
    fontFamily: customFonts.semiBold
  },
  collapsedHeaderBackButtonStyling: {
    position: 'absolute',
    left: dimens.screenHorizontalMargin
  },
  collapsedHeaderSearchButtonStyling: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin
  },
  expandedHeaderContainer: {
    width: '100%',
    backgroundColor: colors.colorPrimary,
    flexDirection: 'row'
  },
  headingStyle: {
    fontSize: 40,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    width: '100%',
    textAlign: 'left',
    paddingLeft: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 18,
    fontFamily: customFonts.regular,
    marginTop: 8,
    width: '100%',
    textAlign: 'left',
    color: colors.colorAccent,
    paddingLeft: dimens.screenHorizontalMargin
  },
  expandedHeaderContainerStyle: {
    width: '100%', 
    height: HEADER_EXPANDED_HEIGHT, 
    justifyContent: 'center', 
    flexDirection: 'column', 
    position: 'absolute'
  }

})


SupplierInventoryScreen.navigationOptions = {
  header: null
}

export default connect(mapStateToProps)(SupplierInventoryScreen)
