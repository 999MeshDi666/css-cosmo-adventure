import { setDifficulty } from "../../../store/slices/difficultySlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Toggles = () => {
  const dispatch = useDispatch();
  const difficultyList = useSelector(
    (state) => state.difficulty.difficultyList
  );
  const curDifficulty = useSelector((state) => state.difficulty.curDifficulty);
  const handleSetDifficulty = (value) => {
    dispatch(setDifficulty(value));
  };

  useEffect(() => {
    localStorage.setItem("difficulty", JSON.stringify(difficultyList));
    localStorage.setItem("currentDifficulty", curDifficulty);
  }, [difficultyList, curDifficulty]);
  return (
    <div className="difficulties">
      {difficultyList.map((elem) => (
        <div className="d-flex" key={elem.value}>
          <div className="difficulties-toggle">
            <label
              htmlFor={elem.value}
              className={`difficulties-label panel-btn label-${elem.value}
                                      ${
                                        elem.isChecked
                                          ? "label-toggle-in"
                                          : "label-toggle-out"
                                      }`}
            >
              {elem.title}
            </label>
            <span className="label-line"></span>
          </div>
          <input
            type="radio"
            name="difficulties"
            id={elem.value}
            checked={elem.isChecked}
            onChange={() => handleSetDifficulty(elem.value)}
            className="difficulties-radio"
          />
        </div>
      ))}
    </div>
  );
};
export default Toggles;
