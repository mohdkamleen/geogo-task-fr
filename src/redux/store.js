import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slice/movie'
const store = configureStore({
  reducer : {
    movie: movieReducer
  }
})

export default store