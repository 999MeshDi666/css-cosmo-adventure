import Toggles from "./toggles/Toggles";
const DifficultySetting = ({description}) => {
  
  return (
    <div className="settings-difficulties">
      <p className="settings-subtitle">{description.text.diffSettings}:</p>
      <Toggles/>
    </div>
  );
};

export default DifficultySetting;
