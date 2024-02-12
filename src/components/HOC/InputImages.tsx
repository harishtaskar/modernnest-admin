import { DragEventHandler, useCallback, useState } from "react";
import styles from "./index.module.css";

type Props = {
  label?: string;
  id: string;
  name: string;
  images: Function;
  require?: boolean;
};

const InputImages = ({ label, id, name, images, require = true }: Props) => {
  const [dragStyle, setDragStyle] = useState({});
  const onImageDrop = useCallback((e: any) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    images(droppedFiles);
  }, []);

  const onImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      images(e.target.files);
    },
    []
  );

  const dragOverHandler = useCallback(
    (e: any) => {
      e.preventDefault();
    },
    [dragStyle]
  );

  const dragEnterHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      setDragStyle({
        border: "2px dashed grey",
        backgroundColor: "rgb(229, 234, 255, 0.6)",
        fontSize: "16px",
      });
    },
    [dragStyle]
  );

  const dragLeaveHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      setDragStyle({});
    },
    [dragStyle]
  );

  return (
    <div className={styles.select}>
      <label htmlFor="category" className={styles.inputLabel}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <label
        className={`${styles.inputImages} ${styles.inputLabel}`}
        htmlFor={id}
        onDrop={onImageDrop}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        style={dragStyle}
      >
        <i className="ri-image-2-fill ri-xl" style={{ opacity: "0.8" }} />
        Drop your images Here or{" "}
        <span
          style={{ color: "var(--primary-color)", textTransform: "lowercase" }}
        >
          browse
        </span>
      </label>
      <input
        type="file"
        multiple
        name={name}
        id={id}
        style={{ display: "none" }}
        onChange={onImageSelect}
      />
    </div>
  );
};

export default InputImages;
