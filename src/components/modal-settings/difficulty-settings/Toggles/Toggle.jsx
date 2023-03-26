import { useDispatch } from "react-redux";
import { setDifficulty } from "../../../../store/slices/difficultySlice";

const DifficultiesToggle = ({ elem }) => {
  return (
    <div className="difficulties-toggle">
      <label
        htmlFor={elem.value}
        className={`difficulties-label 
              panel-btn label-${elem.value}
              ${elem.isChecked ? "label-toggle-in" : "label-toggle-out"}`}
      >
        {elem.title}
      </label>
      <span className="label-line"></span>
    </div>
  );
};

const Toggle = ({ elem }) => {
  const dispatch = useDispatch();
  const handleSetDifficulty = (value) => {
    dispatch(setDifficulty(value));
  };
  return (
    <div className="d-flex">
      <DifficultiesToggle elem={elem} />
      <input
        type="radio"
        name="difficulties"
        id={elem.value}
        checked={elem.isChecked}
        onChange={() => handleSetDifficulty(elem.value)}
        className="difficulties-radio"
      />
    </div>
  );
};

export default Toggle;
