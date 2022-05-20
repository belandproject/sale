import { PaginationOptions, injectPagination } from './utils'

export const locations = {
  root: (options: PaginationOptions = {}) => injectPagination('/', options),
}
