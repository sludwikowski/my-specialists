import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface DataState {
  value: { id: number; name: string; specialization: string; avatar: string }[]
}

const initialState: DataState = {
  value: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataState['value']>) => {
      state.value = action.payload
    },
  },
})

export const { setData } = dataSlice.actions

export const selectData = (state: RootState) => state.data.value

export default dataSlice.reducer
