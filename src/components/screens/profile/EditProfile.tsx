import { useCallback, useMemo, useState } from "react";
import Modal from "../../render-model/Modal";
import classes from "./index.module.css";
import { useRecoilState } from "recoil";
//@ts-ignore
import { currentUserState } from "../../../state/atoms/screen.js";
import InputText from "../../HOC/InputText.js";
import TextArea from "../../HOC/TextArea.js";
import PrimaryButton, { SecondaryButton } from "../../HOC/Buttons.js";
import useAPI from "../../../hooks/Other/useAPI.js";
import { PORT } from "../../../../config.js";
import { toast } from "react-toastify";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const EditProfile = ({ onClose }: Props) => {
  const [currentUser, setCurrentUser] =
    useRecoilState<RegisterData>(currentUserState);
  const [user, setUser] = useState<RegisterData>(currentUser);
  const [update, setUpdate] = useState({});
  const [disable, setDisable] = useState<boolean>(false);

  const { patchRequest } = useAPI();

  const updateHandler = useCallback(
    async (event: any) => {
      const response = await patchRequest(`${PORT}/seller/update`, {
        update: update,
      });
      if (response.res === "ok") {
        setCurrentUser(response.update);
        toast.success(" 🔥 Profile Updated Successfully");
        onClose(event);
      } else {
        toast.success(response.msg);
      }
    },
    [update, currentUser]
  );

  const inputChangeHandler = useCallback(
    (id: string, value: string) => {
      if (value === null) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      switch (id) {
        case "firstname":
        case "lastname":
        case "email":
        case "mobile":
          setUpdate((prev) => {
            return { ...prev, [`personal.${id}`]: value };
          });
          setUser((prev) => {
            return { ...prev, personal: { ...prev.personal, [id]: value } };
          });
          break;
        case "personaladdress":
        case "state":
        case "streetaddress":
        case "pin":
        case "city":
        case "country":
          setUpdate((prev) => {
            return { ...prev, [`address.${id}`]: value };
          });
          setUser((prev) => {
            return { ...prev, address: { ...prev.address, [id]: value } };
          });
          break;
        case "contact":
          setUpdate((prev) => {
            return { ...prev, [`business.${id}`]: value };
          });
          setUser((prev) => {
            return { ...prev, business: { ...prev.business, [id]: value } };
          });
          break;
        case "description":
          setUpdate((prev) => {
            return { ...prev, [`store.${id}`]: value };
          });
          setUser((prev) => {
            return { ...prev, store: { ...prev.store, [id]: value } };
          });
          break;
      }
    },
    [update, currentUser]
  );


  const renderProfileFields = useMemo(() => {
    if (user) {
      return (
        <div className={classes.fields}>
          {Object.entries(user)?.map((item) =>
            Object.entries(item[1])?.map((item: any) => {
              switch (item[0]) {
                case "description":
                  return (
                    <TextArea
                      id={item[0]}
                      value={item[1]}
                      onChange={(event) =>
                        inputChangeHandler(event.target.id, event.target.value)
                      }
                      label={item[0]}
                      rows={4}
                      style={{ width: "100%" }}
                      require={false}
                      name={item[0]}
                    />
                  );
                case "firstname":
                case "lastname":
                case "city":
                case "state":
                case "personaladdress":
                case "streetaddress":
                case "country":
                  return (
                    <InputText
                      id={item[0]}
                      onChange={inputChangeHandler}
                      label={item[0]}
                      value={item[1]}
                      inputTextStyle={{ width: "100%" }}
                      require={false}
                      minLength={1}
                      warning={`${item[0]} Can't be Empty`}
                    />
                  );
                case "pin":
                  return (
                    <InputText
                      id={item[0]}
                      onChange={inputChangeHandler}
                      label={item[0]}
                      value={item[1]}
                      maxLength={6}
                      minLength={6}
                      warning="Pin Should be 6 Digits Long."
                      inputTextStyle={{ width: "100%" }}
                      require={false}
                    />
                  );
                case "contact":
                case "mobile":
                  return (
                    <InputText
                      id={item[0]}
                      onChange={inputChangeHandler}
                      label={item[0]}
                      value={item[1]}
                      inputTextStyle={{ width: "100%" }}
                      require={false}
                      maxLength={10}
                      minLength={10}
                      warning={`${item[0]} Should be 10 Digits`}
                    />
                  );

                default:
                  return;
              }
            })
          )}
        </div>
      );
    }
  }, [user, update, currentUser]);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.cardBody}>
        <span className="heading">Edit Profile</span>
        {renderProfileFields}
        <div className={classes.buttons}>
          <SecondaryButton
            name={"Cancel"}
            onClick={onClose}
            style={{ width: "fit-content" }}
          />
          <PrimaryButton
            isDisable={disable}
            name={"Submit"}
            onClick={updateHandler}
            style={{ width: "fit-content" }}
          />
        </div>
      </div>
    );
  }, [user, update, currentUser]);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      closeBtn={false}
      modalstyle={{
        borderRadius: "4px",
        backgroundColor: "var(--background)",
        margin: "20px",
      }}
    />
  );
};

export default EditProfile;
