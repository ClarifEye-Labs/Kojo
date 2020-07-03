import { inventoryData } from '../../../constants'
const setInventoryData = (data) => {
    return {
        type: 'inventoryData',
        value: data
    }
}
export { setInventoryData }