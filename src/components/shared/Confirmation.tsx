import { useCallback, useMemo, useState } from "react";
import Modal from "../render-model/Modal";
import classes from "./toggle.module.css";
import InputText from "../HOC/InputText";
import PrimaryButton, { SecondaryButton } from "../HOC/Buttons";
import { useRecoilValue, useSetRecoilState } from "recoil";
//@ts-ignore
import { confirmationState } from "../../state/atoms/screen.js";
//@ts-ignore
import { recallProductsAPI } from "../../state/atoms/screen.js";

import useUsers from "../../hooks/Users/useUsers";
import { toast } from "react-toastify";
import useProduct from "../../hooks/Product/useProduct.js";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const Confirmation = ({
  onClose,
}: //   onSubmit,
Props) => {
  const [disable, setDisable] = useState(true);
  const confirmation: Confimation = useRecoilValue(confirmationState);
  const { deleteCurrentUserProfile } = useUsers();
  const { deleteProduct } = useProduct();
  const setRecallAPI = useSetRecoilState(recallProductsAPI);

  const onChangeHandler = useCallback(
    (id: any, value: any) => {
      if (confirmation?.conditionalString === value) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    },
    [disable, confirmation]
  );

  const submitHandler = useCallback(async (event: any) => {
    if (confirmation?.key === "delete-profile") {
      const response = await deleteCurrentUserProfile();
      if ((await response.res) === "ok") {
        localStorage.setItem("authorization", "");
        window.location.reload();
      } else {
        toast.error(response.msg);
      }
    } else if (confirmation?.key === "delete-product") {
      const response = await deleteProduct(confirmation.id);
      if ((await response.res) === "ok") {
        toast.success(response.msg);
        onClose(event);
        setRecallAPI(Math.random() * 9);
      } else {
        toast.error(response.msg);
      }
    }
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="heading">{confirmation.title}</span>
        <span className="normal-text">
          Enter{" "}
          <span style={{ textDecoration: "underline" }}>
            {confirmation.conditionalString}
          </span>{" "}
          to Delete Permanently.
        </span>
        <InputText
          id="condition"
          onChange={onChangeHandler}
          require={false}
          autoComplete="off"
        />
        <div className={classes.buttons}>
          <SecondaryButton
            name={"Cancel"}
            onClick={onClose}
            style={{ width: "100%" }}
          />
          <PrimaryButton
            isDisable={disable}
            name={"Submit"}
            onClick={submitHandler}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }, [confirmation, disable]);
  return (
    <Modal
      body={renderBody}
      closeBtn={false}
      onClose={onClose}
      modalstyle={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "var(--background)",
      }}
    />
  );
};

export default Confirmation;
