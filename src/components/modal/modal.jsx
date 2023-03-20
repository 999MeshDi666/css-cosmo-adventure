import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import { setLang } from "../../store/slices/langSlice";
import { setDifficulty } from "../../store/slices/difficultySlice";
import Modal from "react-bootstrap/Modal";
import desc from "../../json/descriptions.json";
const ModalSettings = () => {

  const show = useSelector((state) => state.modal.value);
  const lang = useSelector((state)=> state.lang.value);
  const difficultyList = useSelector((state)=> state.difficulty.difficultyList);
  const curDifficulty = useSelector((state)=> state.difficulty.curDifficulty);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal());
  };

  const handleSelectLang = (e) =>{
    dispatch(setLang(e.target.value))
  }
  const handleSetDifficulty = (value) =>{
    dispatch(setDifficulty(value))
  }
  useEffect(()=>{
    localStorage.setItem("currentLang", lang);
  },[lang])
  
  useEffect(() => {
    localStorage.setItem("difficulty", JSON.stringify(difficultyList));
    localStorage.setItem("currentDifficulty", curDifficulty);
  }, [difficultyList,curDifficulty]);
  
  return (
    <>
      <Modal
        className="settings panel"
        show={show}
        onHide={handleShowModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="settings-body">
          <div className="settings-select">
            <p className="settings-subtitle">{desc[lang].others.langSettings}:</p>
            <select 
              className="lang-select select"
              onChange={handleSelectLang}
              value={lang}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="kz">Қазақша</option>
            </select>
          </div>
          <div className="settings-difficulties">
            <p className="settings-subtitle">{desc[lang].others.diffSettings}:</p>
            <div className="difficulties">
                {difficultyList.map(elem=>(
                    <div className="d-flex" key={elem.value}>
                        <div className="difficulties-toggler">
                            <label htmlFor={elem.value} 
                                className={`difficulties-label panel-btn label-${elem.value}
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
        <Modal.Footer className="settings-footer">
            <button className="panel-btn close-btn" onClick={handleShowModal}>
              {desc[lang].others.close}
            </button>
        </Modal.Footer>
       
      </Modal>
    </>
  );
};

export default ModalSettings;
