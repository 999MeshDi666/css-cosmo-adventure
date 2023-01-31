import { useSelector} from "react-redux";
import { Astronaut, Spaceship } from './characters';
import _ from "lodash";


const Board = ({level}) => {
    const style = useSelector((state) => state.style.value);
    return (
        <div className="board">
            <div className="pond" 
                style={level.parentStyles ? 
                    (_.isEmpty(style) ? level.base : style) : null
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
                                (_.isEmpty(style)? level.base : style) 
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