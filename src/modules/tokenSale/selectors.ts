import { RootState } from 'modules/common/types'

export const getData = (state: RootState) => state.tokenSale.data
export const isLoading = (state: RootState) => state.tokenSale.loading.length > 0
