import CodePanelMonitor from "./code-panel-monitor/CodePanelMonitor";
import CodePanelBtns from "./CodePanelBtns";
import { toast } from "react-toastify";


const CodePanel = ({ levelsList, level, description }) => {
  const success = (text) =>
    toast.success(`🚀 ${text}`, {
      theme: "colored",
    });

  const error = () =>
    toast.error("Please try again", {
      theme: "colored",
    });
  return (
    <div className="code-panel panel">
      <CodePanelMonitor level={level} description={description} />
      <CodePanelBtns
        levelsList={levelsList}
        level={level}
        description={description}
        success={success}
        error={error}
      />
      
    </div>
  );
};

export default CodePanel;
