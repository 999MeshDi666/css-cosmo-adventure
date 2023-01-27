import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { HandlerContext } from "./context";
import { css2obj } from "./css2obj";
import levels from "./jsons/levels.json";
import CodePanel from "./codePanel";
import Board from "./board";
import Description from "./desc";
import _ from "lodash";

const GamePage = () => {
  
  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const currentLevel = Number(localStorage.getItem("currentLevel"));
  const [curLvl, setCurLvl] = useState(currentLevel ? currentLevel : 1);


  const [text, setText] = useState("");
  const [styles, setStyles] = useState({});
  const [completedLevel, setCompletedLevels] = useState(
    completedLevels ? completedLevels : ["level-1"]
  );

  const [animation, setAnimation] = useState(false);
  const levelsList = levels["levels"];
  const level = levelsList[`level-${curLvl}`];

  const handleSetText = (e) => {
    setText(e.target.value);
  };
  const handleLevelOption = (e) => {
    setCurLvl(Number(e.target.value));
  };

  const handleCheckStyles = () => {
    let maxLvl = Object.keys(levelsList).length;

    if (_.isEqual(styles, level.answer)) {
      if (curLvl === maxLvl) {
        console.log(curLvl);
      } else {
        setCurLvl((prevLvl) => prevLvl + 1);
      }
      console.log("Правильно");
    } else {
      setAnimation((prevState) => !prevState);
      setTimeout(() => setAnimation((prevState) => !prevState), 1000);
      console.log("Ты параша");
    }

    setStyles({});
    setText("");
  };

  useEffect(() => {
    const reactInlineCSS = css2obj`${text}`;
    setStyles(reactInlineCSS);
  }, [text]);

  useEffect(() => {
    localStorage.setItem("currentLevel", curLvl);
    if (!completedLevel.includes(`level-${curLvl}`)) {
      setCompletedLevels((prevState) => [...prevState, `level-${curLvl}`]);
    }
  }, [curLvl]);

  useEffect(() => {
    localStorage.setItem("completedLevels", JSON.stringify(completedLevel));
  }, [completedLevel]);

  return (
    <HandlerContext.Provider 
      value={{handleCheckStyles,handleLevelOption,handleSetText,
              curLvl,text,styles,animation}}>
      <Container>
        <Row>
          <Col xs={12} lg={6} className="mt-5">
            <Description/>
            <CodePanel 
              levelsList={levelsList} 
              completedLevel = {completedLevel}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Board level={level}/>
          </Col>
        </Row>
      </Container>
    </HandlerContext.Provider>
  );
};
export default GamePage;
