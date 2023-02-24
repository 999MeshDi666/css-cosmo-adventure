import { Container, Row, Col } from "react-bootstrap";
import { useSelector} from "react-redux";
import ModalSettings from "./modal";
import levels from "../../json/levels.json";
import CodePanel from "./codePanel";
import Board from "./board";
import Description from "./desc";
import "./styles/game.css";


const GamePage = () => {
  
  const curLvl = useSelector((state)=> state.level.value);
  const levelsList = levels["levels"];
  const level = levelsList[curLvl];
  
  return (
      <Container fluid className="game-container">
        <Row>
          <Col xs={12} lg={6} className="">
            <Description levelsList={levelsList} />
            <CodePanel 
              levelsList={levelsList} 
              level = {level}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Board level={level}/>
          </Col>
        </Row>
        <ModalSettings/>
      </Container>
  );
};
export default GamePage;
