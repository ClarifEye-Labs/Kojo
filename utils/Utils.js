import { NavigationActions, StackActions } from "react-navigation";
import screens from "../constants/screens";
import appConfig from "../config/appConfig";
export default class Utils {
  //Function to support async await in forEach
  static asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  static dispatchScreen(screenName, timeout, navigation) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screenName })],
    });
    setTimeout(() => navigation.dispatch(resetAction), timeout ? timeout : 100);
  }

  static screenToLoadForUser(userData) {
    const { role, phone, address } = userData;
    if (!role) {
      return screens.SupplierRestaurantScreen;
    } else if (!address) {
      return screens.AddressScreen;
    } else if (!phone) {
      return screens.PhoneScreen;
    } else {
      return role === appConfig.userRoleSupplier
        ? screens.SupplierHome
        : screens.ClientHome;
    }
  }

  static convertTimeStampToLocalDateTime(timestamp) {
    const date = timestamp.toDate();
    let newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
}
