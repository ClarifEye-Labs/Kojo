export default class Utils{
    //Function to support async await in forEach
    static asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }   

}