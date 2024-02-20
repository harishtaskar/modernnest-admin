import { useCallback, useMemo, useState } from "react";
import Modal from "../render-model/Modal";
import classes from "./toggle.module.css";
import InputText from "../HOC/InputText";
import PrimaryButton, { SecondaryButton } from "../HOC/Buttons";
import { useRecoilValue } from "recoil";
//@ts-ignore
import { confirmationState } from "../../state/atoms/screen.js";
import useUsers from "../../hooks/Users/useUsers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onChangeHandler = useCallback(
    (id: any, value: any) => {
      console.log(value);

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
    } else if (confirmation?.key === "delete-profuct") {
      console.log("else");
      // do something to delete product
    }
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="heading">{confirmation.title}</span>
        <span className="normal-text">
          Enter {confirmation.conditionalString} to Delete Permanently.
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
