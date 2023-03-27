import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Settings from "./settings/Settings";
import CodePanel from "./code-panel/CodePanel";
import PanelBoard from "./board/PanelBoard";
import Description from "./description/Description";
import levels from "../assets/json/levels.json";
import descriptions from "../assets/json/descriptions.json";

const GamePage = () => {
  const curLvl = useSelector((state) => state.level.value);
  const lang = useSelector((state) => state.lang.value);
  const levelsList = levels["levels"];
  const level = levelsList[curLvl];
  const description = descriptions[lang];  

  return (
    <Container fluid className="game-container">
      <Row>
        <Col xs={12} lg={6}>
          <Description levelsList={levelsList} description={description}/>
          <CodePanel levelsList={levelsList} level={level} description={description} />
        </Col>
        <Col xs={12} lg={6}>
          <PanelBoard level={level} />
        </Col>
      </Row>
      <Settings description={description}/>
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
