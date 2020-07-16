import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Heading, Back } from "../Components";
import { dimens, colors, strings, customFonts } from "../constants";
import { commonStyling } from "../common";
import { PropTypes } from "prop-types";
import { ScrollView } from "react-native-gesture-handler";
import Utils from "../utils/Utils";

class ViewOrderItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.state.params.orderItem,
      supplierOfOrder: props.navigation.state.params.supplierOfOrder,
    };
  }

  render() {
    const {
      mainContainer,
      headingContainerStyle,
      headingStyle,
      supplierDetailsContainer,
      supplierDetailsSubHeading,
      supplierDetailsContent,
      supplierContainer,
      orderContainer,
    } = styles;

    const { address, email, phone } = this.state.supplierOfOrder;
    const { navigation } = this.props;

    const { timestamp, items, id } = this.state.item;

    let timestampToRender = Utils.convertTimeStampToLocalDateTime(
      timestamp
    ).toString();
    return (
      <ScrollView contentContainerStyle={mainContainer}>
        <Back
          style={{ ...commonStyling.backButtonStyling }}
          onPress={() => navigation.goBack()}
        />
        <View style={supplierContainer}>
          <Heading
            title={strings.detailsOfSupplier}
            containerStyle={headingContainerStyle}
            headingStyle={headingStyle}
          />

          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>
              {strings.addressOfSupplier}
            </Text>
            <Text style={supplierDetailsContent}>{address.formattedName}</Text>
          </View>

          {/* add calling and email functionality */}
          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>
              {strings.phoneOfSupplier}
            </Text>
            <Text style={supplierDetailsContent}>{phone.number}</Text>
          </View>

          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>
              {strings.emailOfSupplier}
            </Text>
            <Text style={supplierDetailsContent}>{email}</Text>
          </View>
        </View>

        <View style={orderContainer}>
          <Heading
            title={strings.orderDetails}
            containerStyle={headingContainerStyle}
            headingStyle={headingStyle}
          />

          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>{strings.orderID}</Text>
            <Text style={supplierDetailsContent}>{id}</Text>
          </View>

          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>{strings.dateOfOrder}</Text>
            <Text style={supplierDetailsContent}>{timestampToRender}</Text>
          </View>

          <View style={supplierDetailsContainer}>
            <Text style={supplierDetailsSubHeading}>
              {strings.itemsOrdered}
            </Text>
            {/* Flatlist comes here */}
            
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingHorizontal: dimens.screenHorizontalMargin,
    paddingTop: dimens.screenSafeUpperNotchDistance,
  },
  headingContainerStyle: {
    width: "100%",
    textAlign: "left",
  },
  headingStyle: {
    fontSize: 24,
  },
  supplierContainer: {
    paddingBottom: 20,
    borderBottomColor: colors.blackTransluscent,
    borderBottomWidth: 0.5,
    marginTop: 70,
  },
  orderContainer: {
    marginTop: 20,
  },
  supplierDetailsContainer: {
    padding: 8,
  },
  supplierDetailsSubHeading: {
    fontSize: 14,
    fontFamily: customFonts.medium,
    marginVertical: 8,
  },
  supplierDetailsContent: {
    color: colors.colorPrimary,
    fontFamily: customFonts.medium,
    fontSize: 14,
  },
});

ViewOrderItemDetails.navigationOptions = {
  header: null,
};

ViewOrderItemDetails.propTypes = {
  navigation: PropTypes.object,
};

export default ViewOrderItemDetails;
