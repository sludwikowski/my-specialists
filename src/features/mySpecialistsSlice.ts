import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardProps } from '@src/types'

interface MySpecialistsState {
  value: CardProps[]
}

const initialState: MySpecialistsState = {
  value: [],
}

export const mySpecialistsSlice = createSlice({
  name: 'mySpecialists',
  initialState,
  reducers: {
    addSpecialist: (state, action: PayloadAction<CardProps>) => {
      state.value.push(action.payload)
      localStorage.setItem('mySpecialists', JSON.stringify(state.value))
    },
    removeSpecialist: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(specialist => specialist.id !== action.payload)
      localStorage.setItem('mySpecialists', JSON.stringify(state.value))
    },
    setSpecialists: (state, action: PayloadAction<CardProps[]>) => {
      state.value = action.payload
    },
    loadFromLocalStorage: state => {
      const savedSpecialists = localStorage.getItem('mySpecialists')
      if (savedSpecialists) {
        state.value = JSON.parse(savedSpecialists)
      }
    },
  },
})

export const { addSpecialist, removeSpecialist, setSpecialists, loadFromLocalStorage } =
  mySpecialistsSlice.actions

export default mySpecialistsSlice.reducer
