import { useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { setLevel } from "../../store/levelSlice";

import desc from "../../json/descriptions.json";
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';
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
      
  
    useEffect(() => {
        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'))
        .forEach(popoverNode => new Popover(popoverNode))
    })
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
            <p dangerouslySetInnerHTML={{__html:descs.text1}}></p>
            <ul>
                {descs.list.map((elem, index)=>
                    <li key={index}>{elem}</li>
                )}
            </ul>
            <p dangerouslySetInnerHTML={{__html:descs.text2}}></p>
        </div>
        </div>
        
    )
}
export default Description;