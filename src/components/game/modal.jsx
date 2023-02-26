import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleShow } from "../../store/slices/modalSlice";
import { setLang } from "../../store/slices/langSlice";
import { setDifficulty } from "../../store/slices/difficultySlice";
import Modal from "react-bootstrap/Modal";
import desc from "../../json/descriptions.json";
const ModalSettings = () => {

  const show = useSelector((state) => state.modal.value);
  const lang = useSelector((state)=> state.lang.value);
  const difficulty = useSelector((state)=> state.difficulty.value)
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(handleShow());
  };

  const handleSelectLang = (e) =>{
    dispatch(setLang(e.target.value))
  }
  useEffect(()=>{
    localStorage.setItem("currentLang", lang);
  },[lang])
  
  const handleSetDifficulty = (val) =>{
    dispatch(setDifficulty(val))
  }
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
            <p className="option-subtitle">{desc[lang].others.langSettings}:</p>
            <select 
              className="lang-selector selector"
              onChange={handleSelectLang}
              value={lang}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="kz">Қазақша</option>
            </select>
          </div>
          <div className="option-difficulties">
            <p className="option-subtitle">{desc[lang].others.diffSettings}:</p>
            <div className="difficulties">
                {difficulty.map(elem=>(
                    <div className="d-flex" key={elem.value}>
                        <div className="difficulties-toggler">
                            <label htmlFor={elem.value} 
                                className={`difficulties-label label-${elem.value} panel-btn 
                                          ${elem.isChecked ? 'label-toggle-in':'label-toggle-out' }`}>
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
                          className="difficulties-radio"/>
                    </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="option-footer">
            <button className="panel-btn close-btn" onClick={handleShowModal}>
              {desc[lang].others.close}
            </button>
        </Modal.Footer>
       
      </Modal>
    </>
  );
};

export default ModalSettings;
