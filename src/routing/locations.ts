import { PaginationOptions, injectPagination } from './utils'

export const locations = {
  root: (options: PaginationOptions = {}) => injectPagination('/', options),
  land: (options: PaginationOptions = {}) => injectPagination('/land', options),
  referral: (options: PaginationOptions = {}) => injectPagination('/referral', options),

}
