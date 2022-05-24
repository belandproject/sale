import { RootState } from 'modules/common/types'

export const getPrice = (state: RootState) => state.landSale.data.price
export const isLoading = (state: RootState) => state.landSale.loading.length > 0
