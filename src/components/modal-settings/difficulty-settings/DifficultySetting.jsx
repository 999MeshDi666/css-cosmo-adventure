import Toggles from "./Toggles/Toggles";
const DifficultySetting = ({desc, lang}) => {
  
  return (
    <div className="settings-difficulties">
      <p className="settings-subtitle">{desc[lang].others.diffSettings}:</p>
      <Toggles/>
    </div>
  );
};

export default DifficultySetting;
