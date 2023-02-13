import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../../store/levelSlice";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { replaceKeyWordToTag } from "../../utils/converters";
import desc from "../../json/descriptions.json";

const Description = ({ levelsList }) => {
  const curLvl = useSelector((state) => state.level.value);
  const dispatch = useDispatch();

  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const [completedLevel, setCompletedLevels] = useState(
    completedLevels ? completedLevels : ["level-1"]
  );

  const descLevels = desc.ru.levels[`level-${curLvl}`];
  const descriptions = desc.ru.descriptions;
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

  useEffect(() => {
    Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(
      (popoverNode) => new Tooltip(popoverNode)
    );
  });

 

  return (
    <div>
      <div>
        <select onChange={handleLevelOption} value={curLvl}>
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
      </div>
      <div className="desc">
        <p
          dangerouslySetInnerHTML={{
            __html: replaceKeyWordToTag(descLevels.text1, descriptions),
          }}
        ></p>
        <ul>
          {descLevels.list.map((elem, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ 
                __html: replaceKeyWordToTag(elem, descriptions) }}
            ></li>
          ))}
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: replaceKeyWordToTag(descLevels.text2, descriptions),
          }}
        ></p>
      </div>
    </div>
  );
};
export default Description;
