import { configureStore } from '@reduxjs/toolkit'
import levelReducer from "./slices/levelSlice";
import textReducer from "./slices/textSlice";
import styleReducer from './slices/styleSlice';
import modalReducer from './slices/modalSlice';
import langReducer from './slices/langSlice';
export default configureStore({
  reducer: {
    level: levelReducer,
    text: textReducer,
    style: styleReducer,
    modal: modalReducer,
    lang: langReducer,
  },
})