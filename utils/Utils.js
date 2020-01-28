
import { NavigationActions, StackActions } from 'react-navigation'
export default class Utils {
    //Function to support async await in forEach
    static asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    static dispatchScreen(screenName, timeout, navigation) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screenName })
            ]
        })
        setTimeout(() => navigation.dispatch(resetAction), timeout ? timeout : 100);
    }

}