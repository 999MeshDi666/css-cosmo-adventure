import desc from "../../json/descriptions.json";
import CodePanelMonitor from "./code-panel-monitor/CodePanelMonitor";
import CodePanelBtns from "./CodePanelBtns";
import { toast } from "react-toastify";


const CodePanel = ({ levelsList, level }) => {
  const success = (text) =>
    toast(`🚀 ${text}`, {
      theme: "light",
    });

  const error = () =>
    toast.error("Please try again", {
      theme: "colored",
    });
  return (
    <div className="code-panel panel">
      <CodePanelMonitor level={level} desc={desc} />
      <CodePanelBtns
        levelsList={levelsList}
        level={level}
        desc={desc}
        success={success}
        error={error}
      />
      
    </div>
  );
};

export default CodePanel;
