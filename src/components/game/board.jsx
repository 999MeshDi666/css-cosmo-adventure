import { useContext } from 'react';
import { HandlerContext } from './context';
import { Astronaut, Spaceship } from './characters';
import _ from "lodash";


const Board = ({level}) => {
    const {curLvl, styles} = useContext(HandlerContext);
    return (
        <div className="board">
            <div className="pond" 
                style={ level.parentStyles ? 
                    (_.isEmpty(styles) ? level.base : styles) : null
                }
            >
                {level.colors.map((color, index) => (
                    <div
                        className="block"
                        id={`astronaut${index}`}
                        key={index}
                        style={
                        !level.parentStyles && 
                            index === level.childIndex? 
                                (_.isEmpty(styles)? level.base : styles) 
                                : null
                        }
                    >
                        <Astronaut color={color} />
                    </div>
                ))}
            </div>
            <div className="background"
                style={level.parentStyles ? level.answer : null}
            >
                {level.colors.map((color, index) => (
                    <div
                        className="block"
                        id={`astronaut${index}`}
                        key={index}
                        style={
                        !level.parentStyles && 
                        index === level.childIndex? level.answer: null
                        }
                    >
                        <Spaceship color={color} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;