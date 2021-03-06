import { RootState } from 'modules/common/types'

export const getData = (state: RootState) => state.referral.data
export const isLoading = (state: RootState) => state.referral.loading.length > 0
export const getReferUser = (state: RootState) => state.referral.data.referUser