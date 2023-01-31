import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, setLevel } from "../../store/levelSlice";
import { setText } from "../../store/textSlice";
import { setStyle } from "../../store/styleSlice";
import { css2obj } from "./css2obj";
import _ from "lodash";

const CodePanel = ({ levelsList, level }) => {


  const curLvl = useSelector((state) => state.level.value);
  const text = useSelector((state) => state.text.value);
  const style = useSelector((state) => state.style.value);
  const dispatch = useDispatch();

  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const [completedLevel, setCompletedLevels] = useState(
    completedLevels ? completedLevels : ["level-1"]
  );
  const [animation, setAnimation] = useState(false);

  const handleSetText = (e) => {
    dispatch(setText(e.target.value));
  };

  const handleLevelOption = (e) => {
    dispatch(setLevel(Number(e.target.value)));
  };

  const handleCheckStyles = () => {
    let maxLvl = Object.keys(levelsList).length;

    if (_.isEqual(style, level.answer)) {
      if (curLvl === maxLvl) {
        console.log(curLvl);
      } else {
        dispatch(increment());
      }
      console.log("Правильно");
    } else {
      setAnimation((prevState) => !prevState);
      setTimeout(() => setAnimation((prevState) => !prevState), 1000);
      console.log("Ты параша");
    }

    dispatch(setStyle({}));
    dispatch(setText(""));
  };

  useEffect(() => {
    const reactInlineCSS = css2obj`${text}`;
    dispatch(setStyle(reactInlineCSS));
  }, [text]);

  useEffect(() => {
    localStorage.setItem("currentLevel", curLvl);
    if (!completedLevel.includes(`level-${curLvl}`)) {
      setCompletedLevels((prevState) => [...prevState, `level-${curLvl}`]);
    }
  }, [curLvl]);

  useEffect(() => {
    localStorage.setItem("completedLevels", JSON.stringify(completedLevel));
  }, [completedLevel]);
  
  
  return (
    <div className={`input-wrapper ${animation ? "vibration" : ""}`}>
      <select 
        onChange={handleLevelOption} 
        value={curLvl}
        >
        {Object.keys(levelsList).map((level) => (
          <option
            value={level.substring(6)}
            key={level}
            disabled={completedLevel.includes(level) ? false : true}
          >
            {level}
          </option>
        ))}
      </select>
      <p>current level: {curLvl}</p>
      <textarea 
        name="text" 
        id="text" 
        value={text} 
        onChange={handleSetText} />
      <button onClick={handleCheckStyles}>Check</button>
    </div>
  );
};

export default CodePanel;
