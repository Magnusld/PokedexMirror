import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchInput {
    value: string
}

const initialState: SearchInput = {
    value: ""
}

export const searchSlice = createSlice({
    name: "searchInput",
    initialState,
    reducers: {
        addInput: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { addInput } = searchSlice.actions

export default searchSlice.reducer