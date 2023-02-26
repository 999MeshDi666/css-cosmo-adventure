import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      value: false,
    },
    reducers: {
      handleShow: (state) => {
        state.value = !state.value 
      },
    },
  })
  
  export const {handleShow} = modalSlice.actions;
  export default modalSlice.reducer;