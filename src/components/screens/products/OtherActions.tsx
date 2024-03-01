import { useCallback, useMemo } from "react";
import PrimaryButton from "../../HOC/Buttons";
import classes from "./index.module.css";
import { useSetRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "../../../state/atoms/screen.js";
//@ts-ignore
import { recallProductsAPI } from "../../../state/atoms/screen.js";

const actionButtonStyle = {
  minHeight: "48px",
  fontWeight: 500,
  borderRadius: "10px",
  gap: "4px",
  padding: "0px 14px",
};

const OtherActions = () => {
  const setRecallProductAPI = useSetRecoilState(recallProductsAPI);

  const refreshTableHandler = useCallback(() => {
    setRecallProductAPI(Math.random() * 900);
  }, []);

  const setActiveModal = useSetRecoilState(activeModal);
  const renderIcon = useMemo(() => {
    return (
      <>
        {/* <i className="ri-add-line ri-xl" /> */}
        Add Product
      </>
    );
  }, []);
  return (
    <div className={classes.actions}>
      <button className={classes["refresh-btn"]} onClick={refreshTableHandler}>
        <i className={`${classes["refresh-icon"]} ri-refresh-line ri-xl`} />
      </button>
      <PrimaryButton
        onClick={() => setActiveModal("add-product")}
        name={renderIcon}
        style={actionButtonStyle}
      />
    </div>
  );
};

export default OtherActions;
