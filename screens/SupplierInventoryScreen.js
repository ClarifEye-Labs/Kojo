import React, { Component } from 'react';
import {
  SectionList, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Animated,
  Dimensions,
  Platform
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Loading, Card, SearchIcon, Back, Forward } from '../Components'
import { dimens, colors, customFonts, screens, strings } from '../constants'
import { commonStyling } from '../common'
import * as Animatable from 'react-native-animatable'
import firebase from '../config/firebase'
import Utils from '../utils/Utils';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import collectionNames from '../config/collectionNames';



const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen")

class SupplierInventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SupplierInventoryScreen',
      loadingContent: true,
      firestore: undefined,
      suppliersData: undefined,
      scrollY: new Animated.Value(0),
      supplierID: firebase.auth().currentUser.uid,
      search: '',
      showSearch: false,
      searchInventory: [],
      inventoryType: [],
      inventoryItems: [],
      productsOfUser: [],
    }
  }

  componentDidMount = () => {
    this.getInventory();
  }

  getInventory = async () => {
    let inventoryArray = []
    let db = firebase.firestore()
    let inventoryRefArray = []
    await db
      .collection(collectionNames.suppliers)
      .doc(this.state.supplierID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          inventoryRefArray = data.inventory
          inventoryRefArray ? this.fetchProductsForEachInventoryRef(inventoryRefArray) : console.log('No products for user')
        }
      })

    this.setState({
      inventoryItems: inventoryArray,
      loadingContent: false
    })

  }

  fetchProductsForEachInventoryRef = async (inventoryRefArray) => {
    let db = firebase.firestore()
    let products = []
    for (let index in inventoryRefArray) {
      const inventoryRef = inventoryRefArray[index]
      await db.doc(inventoryRef)
        .get()
        .then((doc) => {
          if (doc.exists) {
            products.push({ ...{id: doc.id}, ...{...doc.data()} } )
          } else {
            console.log('Werent able to fetch products')
          }
        })
    }

    this.setState({
      productsOfUser: products
    }, () => { products ? this.formulateListToShowOfProducts() : null })
  }

  formulateListToShowOfProducts() {
    const {
      productsOfUser
    } = this.state
    let inventoryDictionary = {}
    for(let index in productsOfUser) {
      const product = productsOfUser[index]
      const category = product.type
      if(Array.isArray(inventoryDictionary[category])){
        const products = inventoryDictionary[category]
        products.push(product)
        inventoryDictionary[category] = products
      }else{
        inventoryDictionary[category] = [product]
      }
    }

    const list = this.constructFlatListItems(inventoryDictionary)
    this.setState({
      inventoryItems: list,
      loadingContent: false
    })
  }

  constructFlatListItems = (dictionary) => {
    let listToReturn = []
    if(dictionary){
      for(let key in dictionary){
        listToReturn.push({title: key, data: dictionary[key]})
      }
    }
    return listToReturn
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    }); 3
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const headerTitle = 'HEADER'

    const {
      mainContainer,
      mainHeaderContainerStyle,
      headerBackStyling,
      headerSearchStyling,
      gradientStyle
    } = styles

    const {
      navigation
    } = this.props

    const componentLoading =
      <Loading />

    const componentLoaded =
      <Animatable.View animation='fadeIn' style={mainContainer}>
        <Animated.View style={[mainHeaderContainerStyle, { height: headerHeight }]}>
          <LinearGradient
            style={gradientStyle}
            colors={[colors.colorPrimary, colors.colorSecondary]}>

            <Animated.View
              style={{ flex: 1, opacity: heroTitleOpacity, zIndex: 1 }}>
              {this.getMainHeaderView()}
            </Animated.View>

            <Animated.View
              style={{ flex: 1, opacity: headerTitleOpacity, zIndex: 1 }}>
              {this.getCollapsedHeaderView()}
            </Animated.View>

          </LinearGradient>

        </Animated.View>

        <Back style={headerBackStyling} color={colors.colorAccent} size={36} onPress={() => navigation.goBack()} />

        <SearchIcon
          style={headerSearchStyling}
          size={34}
          onPress={this.showSearchPanel}
          color={colors.colorAccent} />

        {this.state.showSearch ? <SearchBar
          placeholder="Search Item"
          onChangeText={this.updateSearch}
          platform={(Platform.OS === 'ios') ? 'ios' : 'android'}
          showCancel={true}
          round={true}
          contentContainerStyle={colors.colorAccent}
          value={this.state.search}
        /> : null}

        <SectionList
          scrollEnabled={this.state.inventoryItems.length ? true : false}
          contentContainerStyle={{ minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT }}
          sections={this.state.search ? this.state.searchInventory : this.state.inventoryItems}
          renderItem={({ item }) => SectionContent(item, this.props)}
          renderSectionHeader={({ section }) => SectionHeader(section, this.props)}
          keyExtractor={(item, index) => index}
          onScroll={Animated.event(
            [{
              nativeEvent: {
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
        <Text style={headingStyle}>{strings.inventory} </Text>
        <Text style={subHeadingStyle}>{strings.viewYourItemsBelow} </Text>
      </View>
    )
  }

  getCollapsedHeaderView = () => {
    const {
      collpasedHeaderContainer,
      collpasedHeaderTitle,
    } = styles

    return (
      <View style={collpasedHeaderContainer}>
        <Text style={collpasedHeaderTitle}>Inventory</Text>
      </View>
    )
  }

  updateSearch = search => {
    this.setState({ search })
    if (search == '') {
      this.setState({
        searchInventory: this.state.inventoryItems
      })
    }
    const searchEntered = search.toUpperCase()
    const newListToShow = []
    for (let index in this.state.inventoryItems) {
      const title = this.state.inventoryItems[index].title
      let itemObject = this.state.inventoryItems[index]
      const itemsToShow = []
      for (let index in itemObject.data) {
        let item = itemObject.data[index]
        if (item.name.toUpperCase().includes(searchEntered)) {
          itemsToShow.push(item)
        }
      }
      let objectToShow = {}
      objectToShow.title = title
      objectToShow.data = itemsToShow
      newListToShow.push(objectToShow)
    }

    this.setState({
      searchInventory: newListToShow
    })
  }


  showSearchPanel = () => {
    this.setState({
      showSearch: true
    })
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
    inventoryItems: state.inventoryItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateInventory: () => dispatch({ type: 'UPDATE_INVENTORY' })
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

  const {
    navigation
  } = props

  if(!sectionContent.imageURL){
    sectionContent.imageURL = 'https://screenshotlayer.com/images/assets/placeholder.png'
  }
  
  const sectionContentToRender = <View style={sectionContentContainerOuter}>
    <View style={cardContainerStyle}>
      <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
        <ImageBackground
          style={imageStyle}
          imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
          source={ { uri: sectionContent.imageURL }} />
      </Card>
    </View>

    <View style={sectionContentContainerInner}>
      <TouchableOpacity style={sectionContentTouchableContainer} onPress={() => {
        navigation.navigate(screens.InventoryItemScreen, {
          item: sectionContent
        })
      }}>
        <Text style={sectionContentText}>{sectionContent.name}</Text>
        <Forward
          style={forwardButton}
          color={colors.black}
          onPress={() => {
            navigation.navigate(screens.InventoryItemScreen, {
              item: sectionContent
            })
          }} />
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
    backgroundColor: colors.colorSecondary,
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  },
  gradientStyle: {
    height: '100%',
    width: '100%',
    zIndex: -2
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 17,
    fontFamily: customFonts.semiBold
  },
  sectionContentContainerOuter: {
    height: 90,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  sectionContentContainerInner: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: colors.black
  },
  sectionContentTouchableContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    marginRight: dimens.screenHorizontalMargin,
    alignItems: 'center'
  },
  sectionContentText: {
    fontFamily: customFonts.regular,
    fontSize: 18,
    marginLeft: dimens.screenHorizontalMargin,
    maxWidth: 220,
    color: colors.black
  },
  forwardButton: {
    position: 'absolute',
    marginTop: 4,
    right: dimens.screenHorizontalMargin
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: dimens.defaultBorderRadius
  },
  cardContainerStyle: {
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
  expandedHeaderContainer: {
    width: '100%',
    backgroundColor: colors.colorPrimary,
    flexDirection: 'row'
  },
  headingStyle: {
    fontSize: 40,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    marginTop: dimens.screenSafeUpperNotchDistance + 60,
    width: '100%',
    textAlign: 'left',
    paddingLeft: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 19,
    fontFamily: customFonts.regular,
    marginTop: 10,
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
  },
  headerBackStyling: {
    position: 'absolute',
    left: dimens.screenHorizontalMargin,
    marginTop: dimens.screenSafeUpperNotchDistance + 18
  },
  headerSearchStyling: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
    marginTop: dimens.screenSafeUpperNotchDistance + 18
  },
  initalsContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.colorPrimary,
    height: '100%',
    borderRadius: 8
  },
  initials: {
    color: colors.colorAccent,
    fontSize: 14,
    fontFamily: customFonts.medium
  }
})


SupplierInventoryScreen.navigationOptions = {
  header: null
}

export default connect(mapStateToProps)(SupplierInventoryScreen)
