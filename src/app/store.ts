import { configureStore } from '@reduxjs/toolkit'

import searchReducer from '../features/searchSlice'
import dataReducer from '../features/dataSlice'
import mySpecialistsReducer from '../features/mySpecialistsSlice'
import ratingReducer from '../features/ratingSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    data: dataReducer,
    mySpecialists: mySpecialistsReducer,
    rating: ratingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
