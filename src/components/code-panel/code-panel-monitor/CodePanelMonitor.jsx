import TextArea from "./TextArea";

const CodePanelMonitor = ({ level, description }) => {
  const parent = level.parentStyles ? "" : ".board {\n  display: flex; \n}";
  const child = level.parentStyles
    ? ".board {\n display: flex;"
    : `.${level.childName} {`;
  return (
    <div className="monitor code-panel-monitor">
      <p className="line-numbers"> 1 2 3 4 5 6 7 8 9 10 11 12</p>
      <div className="css-content">
        <p className="css-code text-content">{parent}</p>
        <p className="css-code text-content">{child}</p>
        <TextArea description={description} />
        <p className="text-content">{"}"}</p>
      </div>
    </div>
  );
};
export default CodePanelMonitor;
