import { createSlice } from '@reduxjs/toolkit'

export const styleSlice = createSlice({
  name: 'style',
  initialState: {
    value: {},
  },
  reducers: {
    setStyle: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {setStyle} = styleSlice.actions;
export default styleSlice.reducer;