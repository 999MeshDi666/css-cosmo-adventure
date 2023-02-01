import { configureStore } from '@reduxjs/toolkit'
import levelReducer from "./levelSlice";
import textReducer from "./textSlice";
import styleReducer from './styleSlice';

export default configureStore({
  reducer: {
    level: levelReducer,
    text: textReducer,
    style: styleReducer,
  },
})