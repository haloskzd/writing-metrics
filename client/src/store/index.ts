import { configureStore } from '@reduxjs/toolkit'
import helloReducer from './helloSlice'
import editorReducer from './editorSlice'

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    editor: editorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
