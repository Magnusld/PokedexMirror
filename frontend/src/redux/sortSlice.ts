import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortType } from "../types";

export interface Sort {
    value: SortType
}

const initialState: Sort = {
    value: {type: "pokedexNr", ordering: "asc"}
}

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        changeSortOrder: (state, action: PayloadAction<string>) => {
            state.value.ordering = action.payload
        },
        changeSortType: (state, action: PayloadAction<string>) => {
            state.value.type = action.payload
        }
    }
})

export const { changeSortOrder, changeSortType } = sortSlice.actions

export default sortSlice.reducer