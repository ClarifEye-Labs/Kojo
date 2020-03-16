import { UPDATE_INVENTORY } from '../constants_redux'

export function updateInventory( inventory ) {
    return {
        type: UPDATE_INVENTORY,
        payload: inventory
    }
}

