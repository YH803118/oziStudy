import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = URL.createObjectURL(e.target.files[0]);
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    setPreview(value);

    return () => {
      setPreview(initialPreview);
    };
  }, [value, initialPreview]);

  const checkPreview = () => {
    console.log(value);
  };
  return (
    <div>
      <img
        src={preview}
        alt="이미지 미리보기"
        onClick={checkPreview}
        width="150px"
        height="200px"
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
        id="fileInput"
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
