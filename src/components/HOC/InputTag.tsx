import { CSSProperties, useCallback, useEffect, useState } from "react";
import classes from "./index.module.css";

type Props = {
  label?: string;
  id: string;
  type?: string;
  require?: boolean;
  warning: string;
  smallLabel?: string;
  tagList: Function;
  prefix?: any;
  style?: CSSProperties;
  randomColor?: Boolean;
};
const linkColor: string[] = [
  "#FFD300",
  "#DE38C8",
  "#652EC7",
  "#33135C",
  "#FF9472",
  "#35212A",
  "#00207A",
  "#037A90",
  "#28CF75",
];

const InputTag = ({
  label,
  id,
  type,
  require = true,
  warning,
  randomColor,
  prefix = "",
  smallLabel,
  tagList,
  style,
}: Props) => {
  const [warningState, setWarningState] = useState<string>("");
  const [tags, setTags] = useState<any>([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    tagList(tags);
  }, [tags]);

  const handlerEnter = useCallback(() => {
    setTags((prev: any) => {
      if (tag?.length > 0) {
        return [...prev, `${prefix}${tag}`];
      } else {
        return [...prev];
      }
    });
    setTag("");
  }, [tag, tags]);

  const onDeleteTag = useCallback(
    (index: number) => {
      setTags(() => {
        return tags.filter((item: string, i: number) => {
          return i !== index;
        });
      });
    },
    [tags]
  );

  return (
    <div className={classes.inputText}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label} {require && <i style={{ color: "red" }}>*</i>} (Enter to Add)
      </label>
      <div className={classes.inputForTag} style={{ padding: "0px" }}>
        {tags?.map((tag: string, index: number) => {
          return (
            <span
              key={index}
              className={classes.tag}
              style={
                randomColor
                  ? { color: linkColor[Math.ceil(Math.random() * 10)] }
                  : {}
              }
            >
              {tag}
              <i
                className="ri-close-line"
                onClick={() => onDeleteTag(index)}
                style={{ cursor: "pointer" }}
              />
            </span>
          );
        })}
        <input
          type={type}
          className={classes.inputTag}
          onChange={(e: any) => {
            setTag(e.target.value);
            setWarningState("");
          }}
          placeholder={smallLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlerEnter();
          }}
          value={tag}
        />
      </div>
      <span className={classes.warning}>{warningState}</span>
    </div>
  );
};

export default InputTag;
