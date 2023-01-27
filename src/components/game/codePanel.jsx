import { useContext } from 'react';
import { HandlerContext } from './context';



const CodePanel = ({levelsList, completedLevel}) => {

    const {handleCheckStyles, handleLevelOption, handleSetText,
        curLvl, text, animation} = useContext(HandlerContext);
    return (
        <div className={`input-wrapper ${animation ? "vibration" : ""}`}>
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
        <p>current level: {curLvl}</p>
        <textarea name="text" id="text" value={text} onChange={handleSetText} />
        <button onClick={handleCheckStyles}>Check</button>
        </div>
    );
};

export default CodePanel;
