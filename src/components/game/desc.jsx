import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../../store/slices/levelSlice";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { replaceKeyWordToTag } from "../../utils/converters";
import desc from "../../json/descriptions.json";

const Description = ({ levelsList }) => {
  const curLvl = useSelector((state) => state.level.value);
  const lang = useSelector((state)=> state.lang.value);
  const curDifficulty = useSelector((state)=> state.difficulty.curDifficulty);
  const dispatch = useDispatch();

  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const [completedLevel, setCompletedLevels] = useState(completedLevels || ["level-1"]);
    
  const descLevels = desc[lang].levels[`level-${curLvl}`];
  const descriptions = desc[lang].descriptions;

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
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );
  });

  return (
    <div className="desc-panel panel">
      <div className="sn_btns-select">
        <div className="sn-btns">
            <a href="https://www.linkedin.com/in/madi-yegeubekov-060479248/" target="_blank" className="sn-btn panel-btn linkedIn"/>
            <a href="https://t.me/Madi0404" target="_blank" className="panel-btn  sn-btn telegram"/>
            <a href="https://github.com/999MeshDi666" target="_blank" className=" panel-btn sn-btn  git"/>
        </div>
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
      </div>
      <div className="desc-monitor monitor">
        <p
          className="text-content"
          dangerouslySetInnerHTML={{__html: curDifficulty === 'hard'? descLevels.text1: 
          replaceKeyWordToTag(descLevels.text1, descriptions)}}/>
        <ul className="text-content list-content">
          {curDifficulty === 'easy'? 
            descLevels.list.map((elem, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{__html: replaceKeyWordToTag(elem, descriptions)}}/>
          )): null}
        </ul>
        <p
          className="text-content"
          dangerouslySetInnerHTML={{__html: curDifficulty === 'hard'? descLevels.text2: 
          replaceKeyWordToTag(descLevels.text2, descriptions)}}/>
      </div>
    </div>
  );
};
export default Description;
