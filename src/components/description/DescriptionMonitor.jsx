import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { replaceKeyWordToTag } from "../../utils/converters";

const DescriptionMonitor = ({ description  }) => {

  const curLvl = useSelector((state) => state.level.value);
  const curDifficulty = useSelector((state) => state.difficulty.curDifficulty);

  const descLevels = description.levels[`level-${curLvl}`];
  const descriptions = description.descriptions;

  useEffect(() => {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );
  });

  const setInnerHtml = (text) =>{
    const htmlText = curDifficulty !== "easy" ? text : replaceKeyWordToTag(text, descriptions);
    return htmlText;
  }
  return (
    <div className="desc-monitor monitor">
      <p
        className="text-content"
        dangerouslySetInnerHTML={{
          __html: setInnerHtml(descLevels.text1)}}
      />
      <p
        className="text-content"
        dangerouslySetInnerHTML={{
          __html: setInnerHtml(descLevels.text2)}}
      />
      <ul className="text-content list-content">
        {curDifficulty !== "hard"
          ? descLevels.list.map((elem) => (
              <li
                key={elem}
                dangerouslySetInnerHTML={{
                  __html: setInnerHtml(elem)}}
              />
            ))
          : null}
      </ul>
    </div>
  );
};
export default DescriptionMonitor;
