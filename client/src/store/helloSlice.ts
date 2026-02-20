import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HelloState {
  message: string
}

const initialState: HelloState = {
  message: '',
}

export const helloSlice = createSlice({
  name: 'hello',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { setMessage } = helloSlice.actions
export default helloSlice.reducer
