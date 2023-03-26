import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../../store/slices/levelSlice";

const LevelSelect = ({ levelsList, desc }) => {
    
  const curLvl = useSelector((state) => state.level.value);
  const lang = useSelector((state) => state.lang.value);

  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const [completedLevel, setCompletedLevels] = useState(
    completedLevels || ["level-1"]
  );

  const dispatch = useDispatch();
  const handleLevelOption = (e) => {
    dispatch(setLevel(Number(e.target.value)));
  };

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
    <select
      onChange={handleLevelOption}
      value={curLvl}
      className="select level-select"
    >
      {Object.keys(levelsList).map((level) => (
        <option
          value={level}
          key={level}
          disabled={!completedLevel.includes(`level-${level}`)}
        >
          {desc[lang].others.level}-{level}
        </option>
      ))}
    </select>
  );
};
export default LevelSelect;
