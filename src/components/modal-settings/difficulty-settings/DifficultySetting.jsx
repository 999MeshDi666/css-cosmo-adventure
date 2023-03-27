import Toggles from "./toggles/Toggles";
const DifficultySetting = ({description}) => {
  
  return (
    <div className="settings-difficulties">
      <p className="settings-subtitle">{description.others.diffSettings}:</p>
      <Toggles/>
    </div>
  );
};

export default DifficultySetting;
