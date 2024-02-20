import { useCallback, useMemo } from "react";
import Card from "../../../HOC/Card";
import classes from "./index.module.css";
import DataLabels from "../../../HOC/DataLabels";
import { useSetRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "./../../../../state/atoms/screen";
//@ts-ignore
import { confirmationState } from "./../../../../state/atoms/screen";

type Props = {
  user: RegisterData;
};

const DeleteProfile = ({ user }: Props) => {
  const setActiveModal = useSetRecoilState(activeModal);
  const setConfirmation = useSetRecoilState(confirmationState);

  const deleteHandler = useCallback(() => {
    setConfirmation({
      key: "delete-profile",
      title: "Delete Profile",
      conditionalString: "delete_profile",
    });
    setActiveModal("confirmation");
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <DataLabels
          data={<span style={{ color: "red" }}>Delete Profile</span>}
          action={
            <button className="btn-3 fail" onClick={deleteHandler}>
              Delete
            </button>
          }
        />
      </div>
    );
  }, [user]);

  return (
    <Card
      body={renderBody}
      style={{
        boxShadow: "inset 0px 0px 0px 1px var(--fail-color)",
      }}
    />
  );
};

export default DeleteProfile;
