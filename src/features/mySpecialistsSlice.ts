import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Specialist {
  id: number
  name: string
  specialization: string
  avatar: string
}

interface MySpecialistsState {
  value: Specialist[]
}

const initialState: MySpecialistsState = {
  value: [],
}

export const mySpecialistsSlice = createSlice({
  name: 'mySpecialists',
  initialState,
  reducers: {
    addSpecialist: (state, action: PayloadAction<Specialist>) => {
      state.value.push(action.payload)
      localStorage.setItem('mySpecialists', JSON.stringify(state.value)) // Zapisz zmiany do localStorage
    },
    removeSpecialist: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(specialist => specialist.id !== action.payload)
      localStorage.setItem('mySpecialists', JSON.stringify(state.value)) // Zapisz zmiany do localStorage
    },
    setSpecialists: (state, action: PayloadAction<Specialist[]>) => {
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
