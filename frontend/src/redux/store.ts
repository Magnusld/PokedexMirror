import { configureStore } from '@reduxjs/toolkit'
import selectedGenReducer from './generationSlice'
import selectedTypeReducer from './TypeSlice'
import searchReducer from './searchSlice'
import sortReducer from './sortSlice'

export const store = configureStore({
  reducer: {
    selectedGen: selectedGenReducer,
    selectedType: selectedTypeReducer,
    searchInput: searchReducer,
    sort: sortReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch