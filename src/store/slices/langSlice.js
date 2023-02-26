import { createSlice } from '@reduxjs/toolkit'


const currentLang = localStorage.getItem("currentLang");
export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    value: currentLang  ? currentLang  : 'ru',
  },
  reducers: {
    setLang: (state, action) =>{
        state.value = action.payload;
    }
  },
})
export const {setLang} = langSlice.actions;
export default langSlice.reducer;