import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
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
    const nextPreview = URL.createObjectURL(value); //업로드한 파일을 url화해서
    setPreview(nextPreview); //미리보기 이미지로 설정

    return () => {
      setPreview(initialPreview);
    };
  }, [value, initialPreview]);

  return (
    <div>
      <img
        src={preview}
        alt="이미지 미리보기"
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
