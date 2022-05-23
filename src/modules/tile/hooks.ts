import { useDispatch } from 'react-redux'
import useSWRImmutable from 'swr/immutable'
import { fetchTilesRequest } from './actions'

export const useFetchTitle = () => {
  const dispatch = useDispatch()
  useSWRImmutable(
    'title',
    () => {
      dispatch(fetchTilesRequest())
    },
    {
      refreshInterval: 5000
    }
  )
}
