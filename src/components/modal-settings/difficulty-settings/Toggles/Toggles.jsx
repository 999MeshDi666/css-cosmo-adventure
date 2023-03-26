import { useEffect } from "react";
import { useSelector } from "react-redux";
import Toggle from "./Toggle";

const Toggles = () => {

  const difficultyList = useSelector(
    (state) => state.difficulty.difficultyList
  );
  const curDifficulty = useSelector((state) => state.difficulty.curDifficulty);
  useEffect(() => {
    localStorage.setItem("difficulty", JSON.stringify(difficultyList));
    localStorage.setItem("currentDifficulty", curDifficulty);
  }, [difficultyList, curDifficulty]);
  
  return (
    <div className="difficulties">
      {difficultyList.map((elem) => (
        <Toggle key={elem.value} elem={elem}  />
      ))}
    </div>
  );
};
export default Toggles;
