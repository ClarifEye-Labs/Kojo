import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, SectionList, ImageBackground, Dimensions, TouchableOpacity, FlatList, Modal } from 'react-native'
import { Back, SearchIcon, Loading, Card, Icon, Button } from '../Components'
import { dimens, colors, customFonts, strings, iconNames } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import { SearchBar } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../config/firebase'
import collectionNames from '../config/collectionNames';

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

class ViewSupplierItemScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      scrollY: new Animated.Value(0),
      supplierID: props.navigation.state.params.supplierID,
      showSearch: false,
      itemsList: [],
      itemsSearchList: [],
      productsOfSupplier: [],
      loadingContent: false,
      showOrderModal: false,
      cartList: []
    }
  }

  componentDidMount = () => {
    this.getInventory()
  }

  getInventory = async () => {
    let db = firebase.firestore()
    let inventoryRefArray = []
    await db
      .collection(collectionNames.suppliers)
      // .doc(this.state.supplierID)
      .doc(this.state.supplierID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          inventoryRefArray = data.inventory
          inventoryRefArray ? this.fetchProductsForEachInventoryRef(inventoryRefArray) : console.log('No products for user')
        }
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
            products.push({ ...{ id: doc.id }, ...{ ...doc.data() } })
          } else {
            console.log('Werent able to fetch products')
          }
        })
    }
    products ? this.formulateListToShowOfProducts(products) : null
  }

  formulateListToShowOfProducts(productsOfUser) {
    let inventoryDictionary = {}
    for (let index in productsOfUser) {
      const product = productsOfUser[index]
      const category = product.type
      if (Array.isArray(inventoryDictionary[category])) {
        const products = inventoryDictionary[category]
        products.push(product)
        inventoryDictionary[category] = products
      } else {
        inventoryDictionary[category] = [product]
      }
    }

    const list = this.constructFlatListItems(inventoryDictionary)
    this.setState({
      itemsList: list,
      loadingContent: false
    })
  }

  constructFlatListItems = (dictionary) => {
    let listToReturn = []
    if (dictionary) {
      for (let key in dictionary) {
        listToReturn.push({ title: key, data: dictionary[key] })
      }
    }
    return listToReturn
  }


  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle
    } = styles

    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>{strings.orders} </Text>
        <Text style={subHeadingStyle}>{strings.findTheItemsToOrderBelow} </Text>
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
        <Text style={collpasedHeaderTitle}>{strings.orders}</Text>
      </View>
    )
  }

  updateSearch = search => {
    this.setState({ search })
    if (search == '') {
      this.setState({
        searchInventory: this.state.itemsList
      })
    }
    const searchEntered = search.toUpperCase()
    const newListToShow = []
    for (let index in this.state.itemsList) {
      const title = this.state.itemsList[index].title
      let itemObject = this.state.itemsList[index]
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
      itemsSearchList: newListToShow
    })
  }

  showSearchPanel = () => this.setState({ showSearch: true })

  closeOrderModal = () => this.setState({ showOrderModal: false })

  showOrderModal = () => this.setState({ showOrderModal: true })

  getOrderModal = () => {
    const styles = {
      modalContainerStyle: {
        flex: 1,
        backgroundColor: colors.blackTransluscent,
      },
      mainContainer: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        borderRadius: dimens.defaultBorderRadius,
      },
      headingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        borderTopLeftRadius: dimens.defaultBorderRadius,
        borderTopRightRadius: dimens.defaultBorderRadius,
        zIndex: -1,
        paddingBottom: 20,
        backgroundColor: colors.whiteTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
      },
      subHeadingButtons: {
        color: colors.colorPrimary,
        fontSize: 16,
        fontFamily: customFonts.semiBold,
      },
      headingStyle: {
        fontSize: 20,
        color: colors.black,
        fontFamily: customFonts.bold
      },
      cancelButton: {
        position: 'absolute',
        top: 22,
        left: 20
      },
      setButton: {
        position: 'absolute',
        top: 22,
        right: 20
      },
      addCategoryContainer: {
        width: '100%',
        marginTop: 35,
        height: 120,
      },
      pickCategoryContainer: {
        flex: 1,
        overflow: 'hidden',
        marginTop: 35,
        marginBottom: 35
      },
      sectionHeading: {
        color: colors.colorPrimary,
        fontFamily: customFonts.semiBold,
        fontSize: 18,
        marginLeft: dimens.screenHorizontalMargin
      },
      inputContainerStyle: {
        paddingHorizontal: dimens.screenHorizontalMargin,
        paddingVertical: 18,
        marginTop: 8,
        backgroundColor: colors.whiteTransluscent,
        borderTopWidth: dimens.inputTextBorderWidth,
        borderTopColor: colors.grayTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
      },
      categoryListContainer: {
        marginTop: 8,
        paddingVertical: 8,
        backgroundColor: colors.whiteTransluscent
      },
      flatListStyle: {
        width: '100%',
        paddingBottom: 20,
      },
      categoryError: {
        marginTop: 8,
        width: '100%',
        fontSize: 17,
        fontFamily: customFonts.regular,
        color: colors.errorRed,
        textAlign: 'center'
      },
      errorStyle: {
        marginTop: 8
      },
      subTextStyle: {
        fontSize: 13,
        fontFamily: customFonts.regular
      },
      subHeadingErrorStyling: {
        marginTop: 8,
        width: '100%',
        fontSize: 17,
        fontFamily: customFonts.regular,
        color: colors.errorRed,
        textAlign: 'center'
      },
      subHeadingTextStyle: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        marginTop: 16,
        marginBottom: 16,
        marginLeft: dimens.screenDefaultMargin,
        color: colors.colorPrimary
      },
      buttonStyle: {
        width: '90%',
        backgroundColor: colors.colorPrimary
      },
      buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
      }
    }

    const confirmOrder = () => {
      alert('Order Placed!')
    }

    return (
      <Modal
        visible={this.state.showOrderModal}
        transparent={true}
        animationType='slide'
        onBackButtonPress={this.closeDeleteModal}>
        <View style={styles.modalContainerStyle}>

          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={this.closeOrderModal}>
              <Text style={styles.subHeadingButtons}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.setButton} onPress={confirmOrder}>
              <Text style={styles.subHeadingButtons}>Confirm</Text>
            </TouchableOpacity>
            {/* HEADING  */}
            <View style={styles.headingContainer}>
              <Text style={styles.headingStyle}>{strings.yourOrder}</Text>
            </View>

            <View>
              <Text style={styles.subHeadingTextStyle}>{strings.findYourOrderBelow}</Text>
              <FlatList
                data={this.state.cartList}
                renderItem={({ item }) => this.CartItem(item)}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button textColor={colors.colorAccent} title='Confirm' style={styles.buttonStyle} onPress={confirmOrder}/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  CartItem(data) {
    const styles = {
      itemContainer: {
        borderBottomWidth: 1,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: dimens.screenDefaultMargin,
        marginRight: dimens.screenDefaultMargin,
        borderBottomColor: colors.grayTransluscent
      },
      numberContainer: {
        borderWidth: 1,
        borderRadius: 4,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 'auto',
        paddingTop: 4,
        paddingBottom: 4,
        borderColor: colors.colorPrimaryTransluscent
      },
      itemName: {
        fontSize: 18,
        color: colors.colorPrimary,
        fontFamily: customFonts.medium
      },
      qty: {
        color: colors.colorPrimary,
        fontSize: 14,
        marginRight: 4
      },
      unit: {
        color: colors.colorPrimary,
        fontSize: 14,
        width: 40
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
    }

    const reduceQty = () => {
      const { cartList } = this.state
      for (let index in cartList) {
        const cartItem = cartList[index]
        if (cartItem.id === data.id) {
          data.qty = data.qty - 1
          if (data.qty <= 0) {
            cartList.splice(index, 1)
            this.setState({
              cartList: cartList
            })
            break
          }
          cartList[index] = data
          this.setState({
            cartList: cartList
          })
          break
        }
      }
    }

    const addQty = () => {
      const { cartList } = this.state
      for (let index in cartList) {
        const cartItem = cartList[index]
        if (cartItem.id === data.id) {
          data.qty = data.qty + 1
          cartList[index] = data
          this.setState({
            cartList: cartList
          })
          break
        }
      }
    }

    const componentToRender =
      <View style={styles.itemContainer}>
        <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
          <ImageBackground
            style={styles.imageStyle}
            imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
            source={{ uri: data.imageURL }} />
        </Card>
        <Text style={styles.itemName}>{data.name}</Text>
        <View style={styles.numberContainer}>
          <Icon nameAndroid={iconNames.removeAndroid} nameIOS={iconNames.removeIOS} onPress={reduceQty} size={15} />
          <Text style={styles.qty}>{data.qty}</Text>
          <Text style={styles.unit} numberOfLines={1} ellipsizeMode='tail'>{data.unit}</Text>
          <Icon nameAndroid={iconNames.addAndroid} nameIOS={iconNames.addIOS} size={15} onPress={addQty} />
        </View>
      </View>
    return componentToRender
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

    const {
      mainContainer,
      mainHeaderContainerStyle,
      headerBackStyling,
      headerSearchStyling,
      gradientStyle,
      showCartButton,
      buttonContainer
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
          scrollEnabled={this.state.itemsList.length ? true : false}
          contentContainerStyle={{ minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT }}
          sections={this.state.search ? this.state.itemsSearchList : this.state.itemsList}
          renderItem={({ item }) => this.SectionContent(item, this.props)}
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
        {this.getOrderModal()}
        {this.state.cartList.length
          ? <View style={buttonContainer}>
            <Button style={showCartButton} textColor={colors.colorAccent} onPress={this.showOrderModal} title='Show Cart' />
          </View>
          : null }
      </Animatable.View>

    const componentToRender = this.state.loadingContent ? componentLoading : componentLoaded


    return componentToRender
  }

  SectionContent = (data, props) => {
    const {
      sectionContentContainerOuter,
      sectionContentContainerInner,
      sectionContentTouchableContainer,
      sectionContentText,
      imageStyle,
      cardContainerStyle,
      initials,
      forwardButton,
      initalsContentContainer,
    } = styles

    const {
      navigation
    } = props

    if (!data.imageURL) {
      data.imageURL = 'https://screenshotlayer.com/images/assets/placeholder.png'
    }

    const userInitialsArray = data.name.trim().split(' ').map((name) => name[0])
    const userInitals = (userInitialsArray[0] + userInitialsArray[userInitialsArray.length - 1]).toUpperCase()

    const {
      cartList,
      itemsList
    } = this.state

    let itemHasBeenAddedByUser = false

    for (let index in cartList) {
      if (cartList[index].id === data.id) {
        itemHasBeenAddedByUser = true
        break
      }
    }


    const sectionContentToRender = <View style={sectionContentContainerOuter}>
      <View style={cardContainerStyle}>
        <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
          <ImageBackground
            style={imageStyle}
            imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
            source={{ uri: data.imageURL }} />
        </Card>
      </View>
      <View style={sectionContentContainerInner}>
        <View style={sectionContentTouchableContainer}>
          <Text style={sectionContentText}>{data.name}</Text>
          {itemHasBeenAddedByUser
            ? <Icon
              nameAndroid={iconNames.checkAndroid}
              nameIOS={iconNames.checkIOS}
              style={forwardButton}
              color={colors.black} />
            : <Icon
              nameAndroid={iconNames.addAndroid}
              nameIOS={iconNames.addIOS}
              style={forwardButton}
              color={colors.black}
              onPress={() => {
                data.qty = 1
                cartList.push(data)
                this.setState({
                  cartList: cartList
                })
              }} />}

        </View>
      </View>
    </View>

    return sectionContentToRender
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
    borderBottomWidth: 0.2,
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
  },
  showCartButton: {
    width: '90%',
    backgroundColor: colors.colorSecondary
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    marginBottom: 20
  }
})


ViewSupplierItemScreen.navigationOptions = {
  header: null
}

ViewSupplierItemScreen.propTypes = {
  navigation: PropTypes.object
}

export default ViewSupplierItemScreen