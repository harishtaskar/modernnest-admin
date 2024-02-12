import classes from "./index.module.css";
import InputText from "../HOC/InputText";
import useUsers from "../../hooks/Users/useUsers";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
// @ts-ignore
import { storage } from "./../../firebase";
// @ts-ignore
import { registrationDataState } from "./state/index.js";
// @ts-ignore
import { v4 } from "uuid";
import useImages from "../../hooks/Other/useImages.js";

type Props = {};

const UserDetailsForm = (props: Props) => {
  const setRegState = useSetRecoilState(registrationDataState);
  const { onSetRegisterState, uploadImageFirebase } = useUsers();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [idname, setIdname] = useState("");
  const [docname, setDocname] = useState("");

  const { toBase64 } = useImages();

  const onIdSelected = useCallback(
    async (id: string, event: any) => {
      setLoading1(true);
      const image = event.target.files[0];
      const imageBase64 = await toBase64(image);
      const imageUrl = await uploadImageFirebase(
        image,
        imageBase64,
        "admin-docs",
        256000
      );
      if (imageUrl !== ("" || undefined)) {
        setIdname(image.name.substring(0, 18));
        setRegState((prev: RegisterData) => {
          return {
            ...prev,
            idverification: {
              path: imageUrl,
              name: image.name,
              type: image.type,
            },
          };
        });
        setLoading1(false);
      }
      setLoading1(false);
    },
    [idname]
  );

  const onDocSelected = useCallback(
    async (id: string, event: any) => {
      setLoading2(true);
      const image = await event.target.files[0];
      const imageBase64 = await toBase64(image);
      const imageUrl = await uploadImageFirebase(
        image,
        imageBase64,
        "admin-docs",
        256000
      );
      if (imageUrl !== ("" || undefined)) {
        setDocname(image.name.substring(0, 18));
        setRegState((prev: RegisterData) => {
          return {
            ...prev,
            business: {
              ...prev.business,
              document: { path: imageUrl, name: image.name, type: image.type },
            },
          };
        });
        setLoading2(false);
      }
      setLoading2(false);
    },
    [docname]
  );

  return (
    <form action="post" className={classes.form}>
      <span className={classes.subheading}>User Details</span>
      <div className={classes.horizontaldiv}>
        <InputText
          id="idverification"
          inputType="file"
          label={"Aadhar/PA"}
          fileloading={loading1}
          filename={
            idname ? (
              <i className={`${"ri-check-double-line"} ${classes.checked}`}>
                {idname}
              </i>
            ) : (
              "Choose file"
            )
          }
          placeHolder=""
          warning="Image is require"
          onChange={onIdSelected}
        />
        <InputText
          id="document"
          inputType="file"
          label={"Business Document"}
          fileloading={loading2}
          filename={
            docname ? (
              <i className={`${"ri-check-double-line"} ${classes.checked}`}>
                {docname}
              </i>
            ) : (
              "Choose file"
            )
          }
          placeHolder=""
          warning="Image is require"
          onChange={onDocSelected}
        />
      </div>
      <InputText
        id="password"
        inputType="password"
        label="Password"
        placeHolder=""
        warning="Password is too short"
        password={true}
        minLength={8}
        onChange={onSetRegisterState}
      />
      <InputText
        id="confirmpassword"
        inputType="password"
        label="Confirm Password"
        placeHolder=""
        warning="Password not matched"
        password={true}
        onChange={onSetRegisterState}
      />
    </form>
  );
};

export default UserDetailsForm;
