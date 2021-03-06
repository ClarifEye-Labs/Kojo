import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { dimens, colors, customFonts, strings, screens } from '../constants'
import { commonStyling } from '../common'
import { Back, Edit, Card, TextWithSubheading, Button, Cross } from '../Components'
import firebase from '../config/firebase'
import collectionNames from '../config/collectionNames';
import { Utils } from '../utils';

class InventoryItemScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'InventoryItemScreen',
      deleteModalVisible: false,
      item: props.navigation.getParam('item'),
      navigation: props.navigation
    }
  }

  closeDeleteModal = () => { this.setState({ deleteModalVisible: false }) }

  showDeleteModal = () => { this.setState({ deleteModalVisible: true }) }

  deleteConfirm = async () => {
    let db = firebase.firestore()
    let itemID = this.state.item.id

    if (itemID) {
      db
      .collection(collectionNames.suppliers)
      .doc(firebase.auth().currentUser.uid)
      .update({
        inventory: firebase.firestore.FieldValue.arrayRemove('/products/' + itemID)
      }).then(() => {
        this.closeDeleteModal()
        Utils.dispatchScreen(screens.SupplierHome, undefined, this.props.navigation)
      }).catch(function (error) {
        alert("Error removing document: ", error);
      });
    }else{
      console.log('Some error in pipeline')
    }

    
  }

  render() {

    const {
      mainContainer,
      itemNameStyle,
      editButton,
      imageContainer,
      imageStyling,
      gradientStyle,
      headerContainer,
      infoItemContainer,
      subHeadingStyle,
      textStyle,
      buttonContainer,
      deleteButtonStyle,
    } = styles

    const {
      navigation,
    } = this.props

    const itemName = this.state.item.name;
    const itemPrice = this.state.item.price_per_unit;
    const itemImageURL = this.state.item.imageURL;
    const quantityAvailable = this.state.item.quantityAvailable;
    const itemCategory = this.state.item.type
    const itemUnit = this.state.item.unit
    const itemID = this.state.item.id
    return (
      <View style={mainContainer}>
        <Back size={34} style={commonStyling.backButtonStyling} color={colors.colorAccent} onPress={() => navigation.goBack()} />
        <Edit size={34} style={editButton} color={colors.colorAccent} onPress={() => navigation.navigate('EditItemScreen', {
          item: this.state.item
        })} />
        <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
          </LinearGradient>
          <View style={imageContainer}>
            <Card width={280} height={280} elevation={dimens.defaultElevation + 10} >
              <ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: itemImageURL }} />
            </Card>
            <Text style={itemNameStyle}>{itemName}</Text>
          </View>
        </View>

        <ScrollView>
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Category'
            textTitle={itemCategory} />
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Price per Unit'
            textTitle={itemPrice} />
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Unit Type'
            textTitle={itemUnit} />
          <View style={buttonContainer}>
            <Button
              title='Delete Item'
              textColor={colors.colorAccent}
              onPress={this.showDeleteModal}
              style={deleteButtonStyle} />
          </View>
        </ScrollView>
        {this.getDeleteAlert()}
      </View>
    );
  }


  getDeleteAlert = () => {
    const {
      modalContentContainerStyle,
      modalContainerStyle,
      crossStyle,
      textContainerModal,
      headingModalStyle,
      itemNameModal,
      deleteButtonModal,
      cancelButtonModal
    } = styles

    return (
      <Modal visible={this.state.deleteModalVisible} transparent={true} animationType='slide' onBackButtonPress={this.closeDeleteModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={this.closeDeleteModal}
          style={modalContainerStyle}>
          <TouchableWithoutFeedback>
            <View style={modalContentContainerStyle}>
              <Cross style={crossStyle} onPress={this.closeDeleteModal} color={colors.grayBlue} size={42} />
              <View style={textContainerModal}>
                <Text style={headingModalStyle}> Ready to delete</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={itemNameModal}>{this.state.item.name}</Text>
              </View>

              <Button
                title='Delete'
                textColor={colors.colorAccent}
                onPress={this.deleteConfirm}
                style={deleteButtonModal} />
              <Button
                title='Back'
                textColor={colors.colorAccent}
                onPress={this.closeDeleteModal}
                style={cancelButtonModal} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  headerContainerImage: {
    width: '100%',
    zIndex: -1,
    height: 290
  },
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280
  },
  headerContainer: {
    zIndex: -1
  },
  mainHeaderContainerStyle: {
    width: '100%',
  },
  editButton: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
    marginTop: 44
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 450,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    paddingTop: 70,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  itemNameStyle: {
    fontSize: 22,
    marginTop: 18,
    fontFamily: customFonts.bold,
    color: colors.grayBlue,
    textTransform: 'uppercase'
  },
  headerEditContainerStyle: {
    marginRight: dimens.screenHorizontalMargin
  },
  headerEditStyle: {
    fontSize: 16,
    color: colors.facebookBlue
  },
  infoItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1
  },
  subHeadingStyle: {
    fontSize: 18,
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue
  },
  textStyle: {
    fontFamily: customFonts.regular,
    fontSize: 16,
    marginTop: 8,
    color: colors.blackTransluscent
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  deleteButtonStyle: {
    marginLeft: 5,
    height: dimens.buttonHeight,
    width: '80%',
    backgroundColor: colors.deleteRed
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  modalContentContainerStyle: {
    width: 320,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  crossStyle: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  textContainerModal: {
    flexDirection: 'column',
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingModalStyle: {
    fontSize: 23,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue
  },
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 8
  },
  modalButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonModal: {
    width: 250,
    marginTop: 20,
    height: dimens.buttonHeight,
    backgroundColor: colors.deleteRed
  },
  cancelButtonModal: {
    width: 250,
    marginTop: 10,
    height: dimens.buttonHeight,
    backgroundColor: colors.facebookBlue
  }
})

InventoryItemScreen.navigationOptions = {
  header: null
}

export default InventoryItemScreen