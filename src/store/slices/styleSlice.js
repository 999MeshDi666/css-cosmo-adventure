import { createSlice } from '@reduxjs/toolkit'

export const styleSlice = createSlice({
  name: 'styles',
  initialState: {
    style: {},
    text: ""
  },
  reducers: {
    setStyle: (state, action) => {
      state.style = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
  },
})

export const {setStyle, setText} = styleSlice.actions;
export default styleSlice.reducer;