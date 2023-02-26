import { createSlice } from '@reduxjs/toolkit';
import { setLang } from './langSlice';
import desc from "../../json/descriptions.json";

const difficultyData = [
    {
        title: "Тяжелый",
        value: "hard",
        isChecked: false
    },
    {
        title: "Средний",
        value: "medium",
        isChecked: false
    },
    {
        title: "Легкий",
        value: "easy",
        isChecked: true
    }
]
export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState: {
    value: difficultyData
  },
  reducers: {
    setDifficulty: (state, action) => {
       state.value.map(elem=>{
            elem.value === action.payload?
                elem.isChecked = true: 
                elem.isChecked = false
        })
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(setLang, (state, action)=>{
        state.value.map(elem=>{
            elem.title = desc[action.payload].others[elem.value]
        })
    })
  }
})

export const {setDifficulty} = difficultySlice.actions;
export default difficultySlice.reducer;