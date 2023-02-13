import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../../store/levelSlice";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";

import desc from "../../json/descriptions.json";

const Description = ({ levelsList }) => {
  const curLvl = useSelector((state) => state.level.value);
  const dispatch = useDispatch();

  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const [completedLevel, setCompletedLevels] = useState(
    completedLevels ? completedLevels : ["level-1"]
  );

  const descLevels = desc.kz.levels[`level-${curLvl}`];
  const descriptions = desc.kz.descriptions;
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

  const replaceKeyWordToTag = (text) => {
    const keyWords = Object.keys(descriptions).filter((elem) =>
      text.includes(elem)
    );

    const textList = text.split(" ");
    const toolTip = textList.map((word) => {
      const regEx = /[|.|,]/;
      const keyWord = word.replace(regEx, "");
      const tag = `<span class="key-words" data-bs-toggle="popover" data-bs-placement="top" title="${descriptions[keyWord]}"> ${keyWord}</span>`;

      const elem = keyWords.includes(keyWord)
        ? word.replace(keyWord, tag)
        : word;
      return elem;
    });
    return keyWords.length !== 0 ? toolTip.join(" ") : text;
  };

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
            __html: replaceKeyWordToTag(descLevels.text1),
          }}
        ></p>
        <ul>
          {descLevels.list.map((elem, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: replaceKeyWordToTag(elem) }}
            ></li>
          ))}
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: replaceKeyWordToTag(descLevels.text2),
          }}
        ></p>
      </div>
    </div>
  );
};
export default Description;
