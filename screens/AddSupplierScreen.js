import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Back,
  SearchIcon,
  Loading,
  Card,
  Forward,
  Icon,
  DualOptionModal,
} from "../Components";
import { dimens, colors, customFonts, strings, iconNames } from "../constants";
import { commonStyling } from "../common";
import { PropTypes } from "prop-types";
import { SearchBar } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../config/firebase";
import collectionNames from "../config/collectionNames";

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

class AddSupplierScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      showSearch: false,
      supplierToAddList: [],
      addedSupplierList: [],
      searchSupplierList: [],
      loadingContent: false,
      showConfirmationModal: false,
      supplierSelectedData: null,
    };
  }

  componentDidMount = () => {
    this.getAllSuppliers();
    this.watchAddedSuppliers();
  };

  componentWillUnmount() {
    this.unsubscribeRealTimeWatch();
  }

  getAllSuppliers = async () => {
    let db = firebase.firestore();
    const supplierDataList = [];
    db.collection(collectionNames.suppliers)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          db.collection(collectionNames.users)
            .doc(doc.data().uid)
            .get()
            .then((querySnapshot) => {
              supplierDataList.push(querySnapshot.data());
              this.setState({
                supplierToAddList: supplierDataList,
              });
            });
        });
      });
  };

  watchAddedSuppliers = async () => {
    const client = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let updateAddedListState = (list) => {
      if (list) {
        this.setState({
          addedSupplierList: list,
        });
      }
    };

    this.unsubscribeRealTimeWatch = await db
      .collection(collectionNames.clients)
      .doc(client)
      .onSnapshot(function(doc) {
        let data = doc.data();
        let newAddedSupplierList = data.suppliers;
        updateAddedListState(newAddedSupplierList);
      });
  };

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle,
    } = styles;

    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>{strings.supplier} </Text>
        <Text style={subHeadingStyle}>{strings.chooseASupplierToAdd} </Text>
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

  updateSearch = (search) => {
    this.setState({ search });
    if (search == "") {
      this.setState({
        searchInventory: this.state.inventoryItems,
      });
    }
    const searchEntered = search.toUpperCase();
    const newListToShow = [];
    for (let index in this.state.inventoryItems) {
      const title = this.state.inventoryItems[index].title;
      let itemObject = this.state.inventoryItems[index];
      const itemsToShow = [];
      for (let index in itemObject.data) {
        let item = itemObject.data[index];
        if (item.name.toUpperCase().includes(searchEntered)) {
          itemsToShow.push(item);
        }
      }
      let objectToShow = {};
      objectToShow.title = title;
      objectToShow.data = itemsToShow;
      newListToShow.push(objectToShow);
    }

    this.setState({
      searchClientsList: newListToShow,
    });
  };

  showConfirmationModal = (data) => {
    this.setState({
      showConfirmationModal: true,
      supplierSelectedData: data,
    });
  };

  hideConfirmationModal = () =>
    this.setState({
      showConfirmationModal: false,
      supplierSelectedData: null,
    });

  showSearchPanel = () => this.setState({ showSearch: true });

  addSupplier = async () => {
    let searchSupplierList = this.state.searchSupplierList;
    searchSupplierList.push(this.state.supplierSelectedData);
    this.setState({
      searchSupplierList: searchSupplierList,
    });

    await this.addSupplierToFirebase().then(this.hideConfirmationModal());
  };

  addSupplierToFirebase = async () => {
    const supplierUID = this.state.supplierSelectedData.uid;
    const supplierReference = "/suppliers/" + supplierUID;
    const clientReference = "/clients/" + firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();

    //Adding supplier to client db
    await firestore
      .collection(collectionNames.clients)
      .doc(firebase.auth().currentUser.uid)
      .update({
        suppliers: firebase.firestore.FieldValue.arrayUnion(supplierReference),
      })
      .then(null)
      .catch((error) => {
        console.log("TCL: addSupplier -> error", error);
      });

    //Adding client to supplier db
    await firestore
      .collection(collectionNames.suppliers)
      .doc(supplierUID)
      .update({
        clients: firebase.firestore.FieldValue.arrayUnion(clientReference),
      })
      .then(null)
      .catch((error) => {
        console.log("TCL: addClient -> error", error);
      });
  };

  // ----------------- CONFIRMATION MODAL -------------------------

  getConfirmationModal = () => {
    if (this.state.showConfirmationModal) {
      return (
        <DualOptionModal
          firstButtonText="Confirm"
          secondButtonText="Cancel"
          firstButtonFunction={this.addSupplier}
          secondButtonFunction={this.hideConfirmationModal}
          headingText="Confirm to add this supplier?"
          hideConfirmationModal={this.hideConfirmationModal}
        />
      );
    } else {
      return <View></View>;
    }
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: "clamp",
    });
    3;
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

        <SearchIcon
          style={headerSearchStyling}
          size={34}
          onPress={this.showSearchPanel}
          color={colors.colorAccent}
        />

        {this.state.showSearch ? (
          <SearchBar
            placeholder="Search Item"
            onChangeText={this.updateSearch}
            platform={Platform.OS === "ios" ? "ios" : "android"}
            showCancel={true}
            round={true}
            contentContainerStyle={colors.colorAccent}
            value={this.state.search}
          />
        ) : null}

        <FlatList
          scrollEnabled={true}
          contentContainerStyle={{
            minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT,
          }}
          data={this.state.supplierToAddList}
          renderItem={({ item }) =>
            SectionContent(item, {
              ...this.props,
              showConfirmationModal: this.showConfirmationModal,
              addedSupplierList: this.state.addedSupplierList,
            })
          }
          keyExtractor={(item, index) => index.toString()}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY,
                },
              },
            },
          ])}
          scrollEventThrottle={16}
        />
        {this.getConfirmationModal()}
      </Animatable.View>
    );

    const componentToRender = this.state.loadingContent
      ? componentLoading
      : componentLoaded;

    return componentToRender;
  }
}

const SectionContent = (data, props) => {
  const {
    sectionContentContainerOuter,
    sectionContentContainerInner,
    sectionContentTouchableContainer,
    sectionContentText,
    cardContainerStyle,
    initials,
    forwardButton,
    initalsContentContainer,
  } = styles;

  if (!data.imageURL) {
    data.imageURL = "https://screenshotlayer.com/images/assets/placeholder.png";
  }

  const userInitialsArray = data.name
    .trim()
    .split(" ")
    .map((name) => name[0]);
  const userInitals = (
    userInitialsArray[0] + userInitialsArray[userInitialsArray.length - 1]
  ).toUpperCase();

  const sectionContentToRender = (
    <View style={sectionContentContainerOuter}>
      <View style={cardContainerStyle}>
        <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
          <View style={initalsContentContainer}>
            <Text style={initials}>{userInitals}</Text>
          </View>
        </Card>
      </View>

      <View style={sectionContentContainerInner}>
        <TouchableOpacity
          style={sectionContentTouchableContainer}
          onPress={() => {}}
        >
          <Text style={sectionContentText}>{data.name}</Text>

          {props.addedSupplierList.includes("/suppliers/" + data.uid) ? (
            <Icon
              nameAndroid={iconNames.checkAndroid}
              nameIOS={iconNames.checkIOS}
              style={forwardButton}
              color={colors.black}
            />
          ) : (
            <Icon
              nameAndroid={iconNames.addAndroid}
              nameIOS={iconNames.addIOS}
              style={forwardButton}
              color={colors.black}
              onPress={() => {
                props.showConfirmationModal(data);
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return sectionContentToRender;
};

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
    borderBottomWidth: 0.5,
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
  initalsContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.colorPrimary,
    height: "100%",
    borderRadius: 8,
  },
  initials: {
    color: colors.colorAccent,
    fontSize: 14,
    fontFamily: customFonts.medium,
  },
});

AddSupplierScreen.navigationOptions = {
  header: null,
};

AddSupplierScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AddSupplierScreen;
