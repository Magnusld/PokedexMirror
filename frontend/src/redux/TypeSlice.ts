import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SelectedType} from "../types";

export interface SelectedTypeState {
  value: SelectedType[]
}
function initiateList() {
  const value: SelectedType[] = []
  const names = ["Bug","Dark", "Dragon", "Electric", "Fairy", "Fighting",
    "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"]
  names.map((name, i) => {
    const type: SelectedType = {
      id: i, selected: true, name: name
    }
    value.push(type)
  })
  /*
  const bugType: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(bugType)
  const darkType: SelectedType = {
    id: 1, selected: true, name: "Dark"
  }
  value.push(darkType)
  const dragonType: SelectedType = {
    id: 2, selected: true, name: "Dragon"
  }
  value.push(dragonType)
  const electricType: SelectedType = {
    id: 3, selected: true, name: "Electric"
  }
  value.push(electricType)
  const fairyType: SelectedType = {
    id: 4, selected: true, name: "Fairy"
  }
  value.push(fairyType)
  const fightingType: SelectedType = {
    id: 5, selected: true, name: "Fighting"
  }
  value.push(fightingType)
  const fireType: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
  const Type: SelectedType = {
    id: 0, selected: true, name: "Bug"
  }
  value.push(Type)
   */
  return value
}

const initialState: SelectedTypeState = {
  value: initiateList(),
}
export const selectedTypeSlicer = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    setAllTypesFalse: (state) => {
      state.value.forEach(type => {
        type.selected = false
      })
    },
    swapSelectedType: (state, action: PayloadAction<number>) => {
      state.value[action.payload].selected = !state.value[action.payload].selected
    },
    setAllTypesTrue: (state) => {
      state.value.forEach(type => {
        type.selected = true
      })
    },
  },
})

export const { setAllTypesFalse, swapSelectedType, setAllTypesTrue } = selectedTypeSlicer.actions

export default selectedTypeSlicer.reducer