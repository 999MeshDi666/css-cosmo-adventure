import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalSettings from "./modal";
import levels from "../../json/levels.json";
import CodePanel from "../code-panel/CodePanel";
import Board from "./board";
import Description from "./desc";
import "./styles/game.css";
import { ToastContainer } from "react-toastify";

const GamePage = () => {
  const curLvl = useSelector((state) => state.level.value);
  const levelsList = levels["levels"];
  const level = levelsList[curLvl];

  return (
    <Container fluid className="game-container">
      <Row>
        <Col xs={12} lg={6} className="">
          <Description levelsList={levelsList} />
          <CodePanel levelsList={levelsList} level={level} />
        </Col>
        <Col xs={12} lg={6}>
          <Board level={level} />
        </Col>
      </Row>
      <ModalSettings />
      <ToastContainer
        role="alert"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </Container>
  );
};
export default GamePage;
