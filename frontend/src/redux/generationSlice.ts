import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {SelectedGeneration} from "../types";

export interface SelectedGenState {
  value: SelectedGeneration[]
}
function initiateList() {
  const value: SelectedGeneration[] = []
  const list = [1,2,3,4,5,6,7,8]
  list.map((gen, i) => {
    const generation: SelectedGeneration = {
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
    setAllGensTrue: (state) => {
      state.value.forEach(gen => {
        gen.selected = true
      })
    },
    swapSelectedGen: (state, action: PayloadAction<number>) => {
      state.value[action.payload].selected = !state.value[action.payload].selected
    },
  },
})

export const { setAllGensTrue, swapSelectedGen } = selectedGenSlicer.actions

export default selectedGenSlicer.reducer