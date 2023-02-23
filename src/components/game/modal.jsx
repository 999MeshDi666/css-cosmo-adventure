import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { handleShow } from "../../store/modalSlice";

const ModalOptions = () => {

  const difficulties =[
    {
        title: "Тяжелый",
        class: "label-hard",
        value: "hard"
    },
    {
        title: "Средний",
        class: "label-medium",
        value: "medium"
    },
    {
        title: "Легкий",
        class: "label-easy",
        value: "easy"
    }
  ]
  const show = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(handleShow());
  };
  return (
    <>
      <Modal
        className="option panel"
        show={show}
        onHide={handleShowModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="option-body">
          <div className="option-selector">
            <p className="option-subtitle">Настройка языка</p>
            <select className="lang-selector selector">
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="kz">Қазақша</option>
            </select>
          </div>
          <div className="option-difficulties">
            <p className="option-subtitle">Настройка сложности</p>
            <div className="difficulties">
                {difficulties.map(elem=>(
                    <div className="d-flex" key={elem.value}>
                        <div className="difficulties-toggler">
                            <label htmlFor={elem.value} 
                                className={`difficulties-label panel-btn label-toggle-in ${elem.class}`}>
                                {elem.title}
                            </label>
                            <span className="label-line"></span>
                        </div>
                        <input type="radio" name="difficulties" id={elem.value} className="difficulties-radio"/>
                    </div>
                ))}
               
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="option-footer">
            <button className="panel-btn close-btn" onClick={handleShowModal}>
                Закрыть
            </button>
        </Modal.Footer>
       
      </Modal>
    </>
  );
};

export default ModalOptions;
