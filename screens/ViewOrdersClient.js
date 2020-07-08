import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";
import { Back, Loading, Card } from "../Components";
import { dimens, colors, customFonts, strings } from "../constants";
import { commonStyling } from "../common";
import { PropTypes } from "prop-types";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../config/firebase";
import collectionNames from "../config/collectionNames";

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

class ViewOrdersClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      scrollY: new Animated.Value(0),
      orderList: [],
      loadingContent: false,
      orderItemToSupplierHashMap: {}
    };
  }

  componentDidMount = () => {
    this.getOrdersOfClient();
  };

  getOrdersOfClient = async () => {
    this.setState({
      loadingContent: true,
    });
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    let orderList = [];
    await db
      .collection(collectionNames.clients)
      .doc(user.uid)
      .get()
      .then(async (doc) => {
        const listOfOrderRefs = doc.data().orders;
        for (let i = 0; i < listOfOrderRefs.length; i++) {
          const orderRef = listOfOrderRefs[i];
          await db
            .doc(orderRef)
            .get()
            .then((doc) => {
              let order = doc.data()
              order.id = doc.id
              orderList.push(order);
            });
        }
      });
    //for each order fetch the supplier details 
    let orderItemToSupplierHashMap = {} 
    for(let i=0; i<orderList.length; i++) {
      const orderItem = orderList[i]
      const supplierID = orderItem.supplierID
      await db.collection(collectionNames.users)
              .doc(supplierID)
              .get()
              .then(doc => {
                orderItemToSupplierHashMap[orderItem.id] = doc.data()
              })
    }
    this.setState({
      orderList: orderList,
      orderItemToSupplierHashMap: orderItemToSupplierHashMap,
      loadingContent: false,
    });
  };

  watchOrdersOfClient = () => {};

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle,
    } = styles;

    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>{strings.orders} </Text>
        <Text style={subHeadingStyle}>{strings.viewYourOrdersBelow} </Text>
      </View>
    );
  };

  getCollapsedHeaderView = () => {
    const { collpasedHeaderContainer, collpasedHeaderTitle } = styles;

    return (
      <View style={collpasedHeaderContainer}>
        <Text style={collpasedHeaderTitle}>{strings.orders}</Text>
      </View>
    );
  };

  showSearchPanel = () => this.setState({ showSearch: true });
  
  convertTimeStampToLocalDateTime = (timestamp) => {
    const date = timestamp.toDate()
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate
  }
  OrderItem = (item, props) => {
    const {
      orderItemToSupplierHashMap
    } = this.state
    const timestamp = this.convertTimeStampToLocalDateTime(item.timestamp)
    const supplierOfOrder = orderItemToSupplierHashMap[item.id]
    const supplierName = supplierOfOrder.name
    const userInitialsArray = supplierName.split(' ').map((name) => name[0])
    const supplierNameInitials = (userInitialsArray[0] + userInitialsArray[userInitialsArray.length - 1]).toUpperCase()

    const styles = {
      sectionContentContainerOuter: {
        height: 90,
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
      },
      sectionContentContainerInner: {
        height: "100%",
        justifyContent: "center",
        marginLeft:
          dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin,
        borderBottomWidth: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomColor: colors.black,
      },
      sectionContentTouchableContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        marginRight: dimens.screenHorizontalMargin,
        alignItems: "center",
      },
      sectionContentText: {
        fontFamily: customFonts.regular,
        fontSize: 18,
        marginLeft: dimens.screenHorizontalMargin,
        maxWidth: 220,
        color: colors.black,
      },
      forwardButton: {
        position: "absolute",
        marginTop: 4,
        right: dimens.screenHorizontalMargin,
      },
      imageStyle: {
        width: "100%",
        height: "100%",
        borderRadius: dimens.defaultBorderRadius,
      },
      cardContainerStyle: {
        position: "absolute",
        left: dimens.screenHorizontalMargin,
      },
      initials: {
        color: colors.colorAccent,
        fontSize: 14,
        fontFamily: customFonts.medium,
      },
      initalsContentContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.colorPrimary,
        height: "100%",
        borderRadius: 8,
      },
    };

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
    } = styles;

    const sectionContentToRender = (
      <View style={sectionContentContainerOuter}>
        <View style={cardContainerStyle}>
        <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
          <View style={initalsContentContainer}>
            <Text style={initials}>{supplierNameInitials}</Text>
          </View>
        </Card>
        </View>
        <View style={sectionContentContainerInner}>
          <View style={sectionContentTouchableContainer}>
            <Text style={sectionContentText}>{supplierName}</Text>
          </View>
        </View>
      </View>
    );
    return sectionContentToRender;
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: "clamp",
    });
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const {
      mainContainer,
      mainHeaderContainerStyle,
      headerBackStyling,
      headerSearchStyling,
      gradientStyle,
    } = styles;

    const { navigation } = this.props;

    const componentLoading = <Loading />;

    const componentLoaded = (
      <Animatable.View animation="fadeIn" style={mainContainer}>
        <Animated.View
          style={[mainHeaderContainerStyle, { height: headerHeight }]}
        >
          <LinearGradient
            style={gradientStyle}
            colors={[colors.colorPrimary, colors.colorSecondary]}
          >
            <Animated.View
              style={{ flex: 1, opacity: heroTitleOpacity, zIndex: 1 }}
            >
              {this.getMainHeaderView()}
            </Animated.View>

            <Animated.View
              style={{ flex: 1, opacity: headerTitleOpacity, zIndex: 1 }}
            >
              {this.getCollapsedHeaderView()}
            </Animated.View>
          </LinearGradient>
        </Animated.View>

        <Back
          style={headerBackStyling}
          color={colors.colorAccent}
          size={36}
          onPress={() => navigation.goBack()}
        />

        {/* <SearchIcon
          style={headerSearchStyling}
          size={34}
          onPress={this.showSearchPanel}
          color={colors.colorAccent}
        /> */}

        {/* {this.state.showSearch ? (
          <SearchBar
            placeholder="Search Item"
            onChangeText={this.updateSearch}
            platform={Platform.OS === "ios" ? "ios" : "android"}
            showCancel={true}
            round={true}
            contentContainerStyle={colors.colorAccent}
            value={this.state.search}
          />
        ) : null} */}

        <FlatList
          data={this.state.orderList}
          renderItem={({ item }) => this.OrderItem(item, this.props)}
          keyExtractor={(item) => item.id}
        />
      </Animatable.View>
    );

    const componentToRender = this.state.loadingContent
      ? componentLoading
      : componentLoaded;

    return componentToRender;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    backgroundColor: colors.colorAccent,
  },
  sectionHeaderContainer: {
    width: "100%",
    height: 44,
    backgroundColor: colors.colorSecondary,
    justifyContent: "center",
    paddingLeft: dimens.screenHorizontalMargin,
  },
  gradientStyle: {
    height: "100%",
    width: "100%",
    zIndex: -2,
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 17,
    fontFamily: customFonts.semiBold,
  },
  sectionContentContainerOuter: {
    height: 90,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  sectionContentContainerInner: {
    height: "100%",
    justifyContent: "center",
    marginLeft:
      dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin,
    borderBottomWidth: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: colors.black,
  },
  sectionContentTouchableContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    marginRight: dimens.screenHorizontalMargin,
    alignItems: "center",
  },
  sectionContentText: {
    fontFamily: customFonts.regular,
    fontSize: 18,
    marginLeft: dimens.screenHorizontalMargin,
    maxWidth: 220,
    color: colors.black,
  },
  forwardButton: {
    position: "absolute",
    marginTop: 4,
    right: dimens.screenHorizontalMargin,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: dimens.defaultBorderRadius,
  },
  cardContainerStyle: {
    position: "absolute",
    left: dimens.screenHorizontalMargin,
  },
  mainHeaderContainerStyle: {
    width: "100%",
    backgroundColor: colors.colorPrimary,
  },
  collpasedHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  collpasedHeaderTitle: {
    fontSize: 24,
    textAlign: "center",
    color: colors.colorAccent,
    fontFamily: customFonts.semiBold,
  },
  expandedHeaderContainer: {
    width: "100%",
    backgroundColor: colors.colorPrimary,
    flexDirection: "row",
  },
  headingStyle: {
    fontSize: 40,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    marginTop: dimens.screenSafeUpperNotchDistance + 60,
    width: "100%",
    textAlign: "left",
    paddingLeft: dimens.screenHorizontalMargin,
  },
  subHeadingStyle: {
    fontSize: 19,
    fontFamily: customFonts.regular,
    marginTop: 10,
    width: "100%",
    textAlign: "left",
    color: colors.colorAccent,
    paddingLeft: dimens.screenHorizontalMargin,
  },
  expandedHeaderContainerStyle: {
    width: "100%",
    height: HEADER_EXPANDED_HEIGHT,
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
  },
  headerBackStyling: {
    position: "absolute",
    left: dimens.screenHorizontalMargin,
    marginTop: dimens.screenSafeUpperNotchDistance + 18,
  },
  headerSearchStyling: {
    position: "absolute",
    right: dimens.screenHorizontalMargin,
    marginTop: dimens.screenSafeUpperNotchDistance + 18,
  },
});

ViewOrdersClient.navigationOptions = {
  header: null,
};

ViewOrdersClient.propTypes = {
  navigation: PropTypes.object,
};

export default ViewOrdersClient;
