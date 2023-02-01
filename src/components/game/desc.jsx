import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { setLevel } from "../../store/levelSlice";

import desc from "../../json/descriptions.json";

const Description = ({levelsList}) =>{

    const curLvl = useSelector((state) => state.level.value);
    const dispatch = useDispatch();

    const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
    const [completedLevel, setCompletedLevels] = useState(
      completedLevels ? completedLevels : ["level-1"]
    );
    const descs = desc.ru[`level-${curLvl}`]

    const handleLevelOption = (e) => {
        dispatch(setLevel(Number(e.target.value)));
    }

    useEffect(() => {
        localStorage.setItem("currentLevel", curLvl);
        if (!completedLevel.includes(`level-${curLvl}`)) {
          setCompletedLevels((prevState) => [...prevState, `level-${curLvl}`]);
        }
       
    }, [curLvl]);
    
    useEffect(() => {
        localStorage.setItem("completedLevels", JSON.stringify(completedLevel));
    }, [completedLevel]);
      
  
    return(
        <div>
            <div>
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
            </div>
            <div className="desc">
            <p>{descs.text1}</p>
            <p>{descs.text2}</p>
            <ul>
                {descs.list.map((elem, index)=>
                    <li key={index}>{elem}</li>
                )}
            </ul>
        </div>
        </div>
        
    )
}
export default Description;