import { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = async (e) => {
    const nextValue = e.target.files[0];

    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(nextValue, options);
      onChange(name, compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  useEffect(() => {
    if (value !== null) {
      console.log(value);
      const nextPreview = URL.createObjectURL(value); //업로드한 파일을 url화해서
      setPreview(nextPreview); //미리보기 이미지로 설정
    }
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
