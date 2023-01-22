import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Astronaut, Spaceship } from './characters';
import css2obj from './css2obj';
import levels from './jsons/levels.json';
import _ from "lodash";


const GamePage = () =>{
    
  const completedLevels = JSON.parse(localStorage.getItem("completedLevels"));
  const currentLevel = localStorage.getItem("currentLevel");
  const [curLvl, setCurLvl] = useState(currentLevel? _.toNumber(currentLevel) : 1);
  const [completedLevel, setCompletedLevels] = useState(completedLevels? completedLevels : ["level-1"]);

  const [text, setText] = useState("");
  const [styles, setStyles] = useState({});

  const [animation, setAnimation] = useState(false);
  const level = levels['levels'][`level-${curLvl}`];

  
  const handleSetText = (e) =>{
    setText(e.target.value)
  }
  const handleLevelOption = (e) =>{

    setCurLvl(_.toNumber(e.target.value))
  }
  useEffect(() =>{
    const reactInlineCSS = css2obj`${text}`;
    setStyles(reactInlineCSS)
    
  },[text])
  
  const handleCheckStyles = () =>{
    let maxLvl = Object.keys(levels['levels']).length;

    if(_.isEqual(styles, level.answer)){
      if(curLvl === maxLvl){
        console.log(curLvl)
      }
      else{
        setCurLvl(prevLvl => prevLvl + 1)
      }  
      console.log("Правильно")
    
    }
    else{
      setAnimation(prevState => !prevState);
      setTimeout(()=> 
        setAnimation(prevState => !prevState)
      ,1000)
      console.log("Ты параша")
    }  
    
    setStyles({})
    setText("")
    
  }
  useEffect(()=>{
    localStorage.setItem("currentLevel", curLvl);

    if(!completedLevel.includes(`level-${curLvl}`)){
      setCompletedLevels(prevState => [...prevState, `level-${curLvl}`])
    }
  
 },[curLvl])

 useEffect(()=>{
  
  localStorage.setItem("completedLevels", JSON.stringify(completedLevel));

 },[completedLevel])
    return(
        <Container>
            <Row>
                <Col xs={12} lg={6}>
                    <div className={`input-wrapper ${animation? 'vibration': ""}`}>
                        <select onChange={handleLevelOption} value={curLvl}>
                            {Object.keys(levels['levels']).map((level)=>
                            <option 
                                value={level.substring(6)} 
                                key={level}
                                disabled={completedLevel.includes(level)? false : true}
                                >{level}
                            </option>
                            )}
                        </select>
                        <p>current level: {curLvl}</p>
                        <textarea 
                            name="text" 
                            id="text"
                            value = {text}
                            onChange={handleSetText}
                        />
                        <button onClick={handleCheckStyles}>Check</button>
                    </div>
                </Col>
                <Col xs={12} lg={6}>
                    <div className='board'>
                    <div className='pond' 
                            style={level.parentStyles ? 
                                    _.isEmpty(styles) ? level.base : styles 
                                : null}>
                        {level.colors.map((color, index)=>
                        <div 
                            className='block'
                            id={`astronaut${index}`} 
                            key={index} 
                            style={!level.parentStyles && 
                                    index === level.childIndex? 
                                        _.isEmpty(styles) ? level.base : styles 
                                    : null }
                        > 
                            <Astronaut color={color}/>
                        </div> 
                        )} 
                    </div>
                    <div className='background' 
                        style={level.parentStyles ? level.answer : null}>
                        {level.colors.map((color, index)=>
                        <div 
                            className='block'
                            id={`astronaut${index}`} 
                            key={index}
                            style={!level.parentStyles && 
                                    index === level.childIndex? level.answer : null
                                }
                        > 
                            <Spaceship color={color}/>
                        </div>
                        )}  
                    </div>
                    </div>
                </Col>
            </Row>
        </Container>


    )
}
export default GamePage;