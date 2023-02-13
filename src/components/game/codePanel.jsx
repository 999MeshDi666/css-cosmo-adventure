import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/levelSlice";
import { setText } from "../../store/textSlice";
import { setStyle } from "../../store/styleSlice";
import { css2obj } from "../../utils/converters";
import _ from "lodash";

const CodePanel = ({ levelsList, level }) => {

  const curLvl = useSelector((state) => state.level.value);
  const text = useSelector((state) => state.text.value);
  const style = useSelector((state) => state.style.value);
  const dispatch = useDispatch();

  const [animation, setAnimation] = useState(false);

  const handleSetText = (e) => {
    dispatch(setText(e.target.value));
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
      console.log("Неправильно");
    }

    dispatch(setStyle({}));
    dispatch(setText(""));
  };

  useEffect(() => {
    const reactInlineCSS = css2obj`${text}`;
    dispatch(setStyle(reactInlineCSS));
  }, [text]);

  return (
    <div className={`input-wrapper ${animation ? "vibration" : ""}`}>
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
