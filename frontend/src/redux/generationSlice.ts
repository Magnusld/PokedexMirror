import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Generation} from "../types";

export interface SelectedGenState {
  value: Generation[]
}
function initiateList() {
  const value: Generation[] = []
  const list = [1,2,3,4,5,6,7,8]
  list.map((gen, i) => {
    const generation: Generation = {
      id: i,
      selected: true,
      name: "Gen " + gen
    }
    value.push(generation)
  })
  return value
}

const initialState: SelectedGenState = {
  value: initiateList(),
}
export const selectedGenSlicer = createSlice({
  name: 'selectedGen',
  initialState,
  reducers: {
    setAllTrue: (state) => {
      state.value.forEach(gen => {
        gen.selected = true
      })
    },
    swapSelected: (state, action: PayloadAction<number>) => {
      state.value[action.payload].selected = !state.value[action.payload].selected
    },
  },
})

export const { setAllTrue, swapSelected } = selectedGenSlicer.actions

export default selectedGenSlicer.reducer