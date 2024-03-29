import InputText from "../InputText";
import classes from "../index.module.css";

type Props = {
  onChange: Function;
};

const SearchInput = ({ onChange }: Props) => {
  return (
    <div className={classes["search-input"]}>
      <InputText
        onChange={onChange}
        inputType="text"
        placeHolder="Search"
        id="search"
        require={false}
        style={{
          border: "1px solid var(--muted-border)",
          backgroundColor: "var(--white)",
        }}
      />
    </div>
  );
};

export default SearchInput;
