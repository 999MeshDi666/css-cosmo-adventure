import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import LangSettings from "./LangSettings";
import DifficultySetting from "./difficulty-settings/DifficultySetting";
import Modal from "react-bootstrap/Modal";
import desc from "../../json/descriptions.json";

const ModalSettings = () => {
  const show = useSelector((state) => state.modal.value);
  const lang = useSelector((state) => state.lang.value);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal());
  };
  useEffect(() => {
    localStorage.setItem("currentLang", lang);
  }, [lang]);

  return (
    <Modal
      className="settings panel"
      show={show}
      onHide={handleShowModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body className="settings-body">
        <LangSettings desc={desc} lang={lang} />
        <DifficultySetting desc={desc} lang={lang} />
      </Modal.Body>
      <Modal.Footer className="settings-footer">
        <button className="panel-btn close-btn" onClick={handleShowModal}>
          {desc[lang].others.close}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSettings;
