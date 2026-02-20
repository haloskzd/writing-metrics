import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { HELLO_QUERY } from './graphql/queries'
import { setMessage } from './store/helloSlice'
import type { RootState } from './store/index'

function App() {
  const dispatch = useDispatch()
  const reduxMessage = useSelector((state: RootState) => state.hello.message)
  const { data, loading, error } = useQuery<{ hello: string }>(HELLO_QUERY)

  useEffect(() => {
    if (data?.hello) {
      dispatch(setMessage(data.hello))
    }
  }, [data, dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Writing Metrics</h1>
      <p>GraphQL response: {data?.hello}</p>
      <p>Redux store message: {reduxMessage}</p>
    </div>
  )
}

export default App
