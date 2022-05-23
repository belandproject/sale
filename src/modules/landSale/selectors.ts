import { RootState } from 'modules/common/types'

export const getPrice = (state: RootState) => state.landSale.data.price
