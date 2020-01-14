import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Animated,
  Dimensions,
  Platform} from 'react-native'
import { SearchBar } from 'react-native-elements'
import str from './content';
import { Loading, Card, SearchIcon, Back, Forward } from '../Components'
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
          {title: 'ALCOHOL', data: [
            
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdQSfIj7XNtCjG7SH0AKUvOsz6sXkP9NiLZBUF_1ujrYM3A9B3',
            quantity_available: "3 KEG"},
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTue8659sCpibiyYGEMlTCmQXXdgzrbCKgt0A8diHpbB77qctS4',
            quantity_available: "3 KEG"}] },  
          {title: 'DAIRY', data: [
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtr6av-WaBS0crmVtLMNmWrkWQrA_ljG14xC1EpUOS3K_C7OQy',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRRToZF7581M0HVd2q-YLYqYD3cfWUjGgbblN99U-LN6mpjga4',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSl2d6F2rBpBnhAE4IDloWMmYtW6FvGFWQt7T8AipSMiTEyuRKl',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwqJr1L0xSNDxNmldNOOdKdox6zWOhmz3jyyUhfIb6931uAdJC',
              quantity_available: "3 L"}]}
        ]
    }
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
    <Animatable.View animation='fadeIn' style={mainContainer}> 
      <Animated.View style={[mainHeaderContainerStyle, {height: headerHeight}]}>

        <Animated.View 
          style={{ flex: 1, opacity: heroTitleOpacity}}> 
            {this.getMainHeaderView()}
        </Animated.View>

        <Animated.View 
          style={{ flex: 1 , opacity: headerTitleOpacity }}>
            {this.getCollapsedHeaderView(navigation)}
        </Animated.View>

      </Animated.View>
      
       {this.state.showSearch ? <SearchBar
        placeholder="Search Item"
        onChangeText={this.updateSearch}
        platform={ (Platform.OS === 'ios') ? 'ios' : 'android'}
        showCancel={true}
        round={true}
        contentContainerStyle={colors.colorAccent}
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

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle
    } = styles
    
    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>Inventory </Text>
        <Text style={subHeadingStyle}>View your items below : </Text> 
      </View>
    )
  }

  getCollapsedHeaderView = (navigation) => {
    const { 
      collpasedHeaderContainer,
      collpasedHeaderTitle,
      collapsedHeaderBackButtonStyling,
      collapsedHeaderSearchButtonStyling,
    } = styles
  
    return (
      <View style={collpasedHeaderContainer}>
        <Back style={collapsedHeaderBackButtonStyling} color={colors.colorAccent}  size={34} onPress={()=> navigation.goBack()} />
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
    console.log(search)
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
    sectionContentTouchableContainer,
    sectionContentText,
    imageStyle,
    cardContainerStyle,
    thinLine,
    forwardButton
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
      <TouchableOpacity style={sectionContentTouchableContainer} onPress={()=>{navigation.navigate('InventoryItemScreen', {
        item: sectionContent
      })}}>
          <Text style={sectionContentText}>{sectionContent.name}</Text>
          <Forward style={forwardButton} color={colors.black} />
      </TouchableOpacity>
    </View>
  </View>

  return sectionContentToRender
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    backgroundColor: colors.colorAccent
  },
  sectionHeaderContainer: {
    width: '100%',
    height: 44,
    backgroundColor: colors.colorPrimary,
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 19,
    fontFamily: customFonts.semiBold
  },
  sectionContentContainerOuter: {
    height: 90,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  sectionContentContainerInner:{
    height: '100%',
    justifyContent: 'center',
    marginLeft: dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin, 
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: colors.black
  },
  sectionContentTouchableContainer:{
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    marginRight: dimens.screenHorizontalMargin,
    alignItems: 'center'
  },  
  sectionContentText:{
    fontFamily: customFonts.regular,
    fontSize: 18,
    marginLeft: dimens.screenHorizontalMargin,
    maxWidth: 220,
    color: colors.black
  },
  forwardButton:{
    position: 'absolute',
    marginTop: 4,
    right: dimens.screenHorizontalMargin
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
    marginTop: dimens.screenSafeUpperNotchDistance+10,
    width: '100%',
    textAlign: 'left',
    paddingLeft: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 20,
    fontFamily: customFonts.regular,
    marginTop: 20,
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
