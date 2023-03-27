import { createSlice } from "@reduxjs/toolkit";
import { setLang } from "./langSlice";
import description from "../../assets/json/descriptions.json";

const storedDifficulty = JSON.parse(localStorage.getItem("difficulty"));
const currentDifficulty = localStorage.getItem("currentDifficulty");
const difficulty = [
  {
    title: "Тяжелый",
    value: "hard",
    isChecked: false,
  },
  {
    title: "Средний",
    value: "medium",
    isChecked: false,
  },
  {
    title: "Легкий",
    value: "easy",
    isChecked: true,
  },
];
export const difficultySlice = createSlice({
  name: "difficulty",
  initialState: {
    difficultyList: storedDifficulty || difficulty,
    curDifficulty: currentDifficulty || "easy",
  },
  reducers: {
    setDifficulty: (state, action) => {
      state.difficultyList.map((elem) => {
        elem.value === action.payload
          ? (elem.isChecked = true)
          : (elem.isChecked = false);
      });
      state.curDifficulty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLang, (state, action) => {
      state.difficultyList.map((elem) => {
        elem.title = description[action.payload].others[elem.value];
      });
    });
  },
});

export const { setDifficulty } = difficultySlice.actions;
export default difficultySlice.reducer;
