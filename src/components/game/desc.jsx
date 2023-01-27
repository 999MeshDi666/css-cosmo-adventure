
import desc from "./jsons/descriptions.json";

const Description = () =>{
    const descs = desc.ru["level-5"]
    return(
        <div className="desc">
            <p>{descs.text1}</p>
            <p>{descs.text2}</p>
            <ul>
                {descs.list.map((elem, index)=>
                    <li key={index}>{elem}</li>
                )}
            </ul>
        </div>
    )
}
export default Description;