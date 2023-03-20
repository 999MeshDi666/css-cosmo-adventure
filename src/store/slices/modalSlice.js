import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      value: false,
    },
    reducers: {
      showModal: (state) => {
        state.value = !state.value 
      },
    },
  })
  
  export const {showModal} = modalSlice.actions;
  export default modalSlice.reducer;