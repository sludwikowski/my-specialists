import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RatingState {
  totalRatings: { [key: number]: number }
  numRatings: { [key: number]: number }
}

const initialState: RatingState = {
  totalRatings: JSON.parse(localStorage.getItem('totalRatings') || '{}'),
  numRatings: JSON.parse(localStorage.getItem('numRatings') || '{}'),
}

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    addRating: (state, action: PayloadAction<{ id: number; rating: number }>) => {
      const { id, rating } = action.payload
      if (!state.totalRatings[id]) {
        state.totalRatings[id] = 0
        state.numRatings[id] = 0
      }
      state.totalRatings[id] += rating
      state.numRatings[id] += 1
      localStorage.setItem('totalRatings', JSON.stringify(state.totalRatings))
      localStorage.setItem('numRatings', JSON.stringify(state.numRatings))
    },
  },
})

export const { addRating } = ratingSlice.actions

export default ratingSlice.reducer
