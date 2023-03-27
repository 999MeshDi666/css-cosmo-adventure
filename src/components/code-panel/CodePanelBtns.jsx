import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/levelSlice";
import { setStyle, setText } from "../../store/slices/styleSlice";
import { showModal } from "../../store/slices/modalSlice";
import { obj2css } from "../../utils/converters";
import _ from "lodash";

const CodePanelBtns = ({ levelsList, level, description, success, error }) => {
  
  const curLvl = useSelector((state) => state.level.value);
  const style = useSelector((state) => state.styles.style);
  const curDifficulty = useSelector((state) => state.difficulty.curDifficulty);
  const dispatch = useDispatch();
  const handleShowModal = () => {
    dispatch(showModal());
  };
  const handleShowAnswer = () => {
    dispatch(setText(obj2css(level.answer)));
  };

  const checkAnswer = () =>{
    let maxLvl = Object.keys(levelsList).length;
    if (_.isEqual(style, level.answer)) {
      if (curLvl === maxLvl) {
        success("Поздравляем ты все прошел!");
      } 
      else {
        dispatch(increment());
        success("🚀Продолжай в том же духе!");
      }
    } else {
      error();
    }

  }
  const handleCheckStyles = () => {
    checkAnswer()
    dispatch(setStyle({}));
    dispatch(setText(""));
  };

  return (
    <div className="panel-btns">
      <button
        className="panel-btn answer-btn"
        disabled={curDifficulty === "easy" ? false : true}
        onClick={handleShowAnswer}
      ></button>
      <button
        className="panel-btn settings-btn"
        onClick={handleShowModal}
      ></button>
      <button className="panel-btn check-btn" onClick={handleCheckStyles}>
        {description.others.check}
      </button>
    </div>
  );
};
export default CodePanelBtns;
