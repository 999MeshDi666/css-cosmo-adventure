import { createSlice } from '@reduxjs/toolkit'


const currentLevel = Number(localStorage.getItem("currentLevel"));
export const levelSlice = createSlice({
  name: 'level',
  initialState: {
    value: currentLevel ? currentLevel : 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    setLevel: (state, action) =>{
        state.value = action.payload;
    }
  },
})

export const {increment, setLevel} = levelSlice.actions;
export default levelSlice.reducer;