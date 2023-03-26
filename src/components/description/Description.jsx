import desc from "../../json/descriptions.json";
import LevelSelect from "./LevelSelect";
import DescriptionMonitor from "./DescriptionMonitor";
const Description = ({ levelsList }) => {

  const links = [
    {
      value: "linkedIn",
      href: "https://www.linkedin.com/in/madi-yegeubekov-060479248/",
    },
    {
      value: "telegram",
      href: "https://t.me/Madi0404",
    },
    {
      value: "git",
      href: "https://github.com/999MeshDi666",
    },
  ]
  return (
    <div className="desc-panel panel">
      <div className="sn_btns-select">
        <div className="sn-btns">
          {links.map((elem)=>(
            <a
              key={elem.value}
              href={elem.href}
              rel="noreferrer" 
              target="_blank"
              className={`sn-btn panel-btn ${elem.value}`}
            />
          ))}
        </div>
        <LevelSelect desc={desc} levelsList={levelsList}/>
      </div>
      <DescriptionMonitor desc={desc}/>
    </div>
  );
};
export default Description;
