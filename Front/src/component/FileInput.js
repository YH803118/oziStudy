import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();
  console.log(initialPreview);
  console.log(preview);
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
    if (!value) {
      setPreview(initialPreview);
      return;
    }
    setPreview(value);

    return () => {
      setPreview(initialPreview);
    };
  }, [value, initialPreview]);

  const checkPreview = (e) => {
    console.log(e.target.src);
  };
  return (
    <div>
      <img
        src={preview}
        alt="이미지 미리보기"
        onClick={checkPreview}
        width="200px"
        height="200px"
        id="previewImage"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        id="fileInput"
        name="imageUrl"
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
