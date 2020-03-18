import React from 'react'
import { TouchableOpacity, Modal, View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native'
import Cross  from './Cross'
import Button from './Button'
import { dimens, colors, strings, customFonts } from '../constants'


class DualOptionModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      modalContentContainerStyle,
      modalContainerStyle,
      crossStyle,
      textContainerModal,
      headingModalStyle,
      uploadButtonModal: deleteButtonModal,
      clickButtonModal: cancelButtonModal,
      modalButtonContainer
    } = styles

    const {
      firstButtonText,
      secondButtonText,
      firstButtonFunction,
      secondButtonFunction,
      headingText,
      showConfirmationModal,
      hideConfirmationModal
    } = this.props

    const component =
      <Modal transparent={true} animationType='slide' onBackButtonPress={hideConfirmationModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={hideConfirmationModal}
          style={modalContainerStyle}>
          <TouchableWithoutFeedback>
            <View style={modalContentContainerStyle}>
              <Cross style={crossStyle} onPress={hideConfirmationModal} color={colors.grayBlue} size={38} />
              <View style={textContainerModal}>
                <Text style={headingModalStyle}>{headingText}</Text>
              </View>
              <View style={modalButtonContainer}>
                <Button
                  title= {firstButtonText}
                  textColor={colors.colorAccent}
                  onPress={firstButtonFunction}
                  style={deleteButtonModal} />
                <Button
                  title= {secondButtonText}
                  textColor={colors.colorAccent}
                  onPress={secondButtonFunction}
                  style={cancelButtonModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

    return component
  }
}

const styles = StyleSheet.create({

  modalContentContainerStyle: {
    width: 320,
    height: 260,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  crossStyle: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  textContainerModal: {
    marginTop: 45,
    width: '100%'
  },
  headingModalStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: customFonts.regular,
    color: colors.grayBlue
  },
  uploadButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.submitGreen
  },
  clickButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.darkBlue
  },
  modalButtonContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  }

})

export default DualOptionModal
