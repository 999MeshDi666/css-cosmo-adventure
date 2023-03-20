import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStyle, setText } from "../../../store/slices/styleSlice";
import toStyle from "css-to-style";



const TextArea = ({ desc }) => {
  const lang = useSelector((state) => state.lang.value);
  const text = useSelector((state) => state.styles.text);

  const dispatch = useDispatch();
  const handleSetText = (e) => {
    dispatch(setText(e.target.value));
  };
  useEffect(() => {
    const txt2css = text.toLowerCase();
    const reactInlineCSS = toStyle(txt2css);
    dispatch(setStyle(reactInlineCSS));
  }, [text]);
  return (
    <textarea
      className="textarea-answer"
      name="text"
      id="text"
      value={text}
      placeholder={desc[lang].others.placeholder}
      onChange={handleSetText}
    />
  );
};

export default TextArea;
