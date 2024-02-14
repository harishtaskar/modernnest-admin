import classes from "./index.module.css";
import style from "../HOC/index.module.css";
import InputText from "../HOC/InputText";
import useUsers from "../../hooks/Users/useUsers";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
// @ts-ignore
import { registrationDataState } from "./state/index.js";
// @ts-ignore
import { storage } from "./../../firebase";
// @ts-ignore
import { v4 } from "uuid";

import useImages from "../../hooks/Other/useImages.js";

type Props = {
  title?: string;
};

const ShippingMethods = ["By Road", "By Train", "By Air", "By Ships"];

const StoreDetails = ({ title }: Props) => {
  const [regState, setRegState] = useRecoilState<RegisterData>(
    registrationDataState
  );
  const { uploadImageFirebase } = useUsers();
  const [logoName, setLogoName] = useState("");
  const [loading, setLoading] = useState(false);

  const { toBase64 } = useImages();

  const renderShippingMethods = useMemo(() => {
    return ShippingMethods.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  }, []);

  const inputChangeHandler = useCallback((key: string, value: any) => {
    setRegState((prev: RegisterData) => {
      return { ...prev, store: { ...prev.store, [key]: value } };
    });
  }, []);

  const onShipingSelected: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegState((prev: any) => {
        return { ...prev, store: { ...prev.store, shiping: e.target.value } };
      });
    },
    []
  );

  const onImageUpload = useCallback(
    async (id: string, event: any) => {
      setLoading(true);
      const image = event.target.files[0];
      const imageBase64 = await toBase64(image);
      const imageUrl = await uploadImageFirebase(
        image,
        imageBase64,
        "admin-docs",
        1024000
      );
      if (imageUrl !== ("" || undefined)) {
        setLogoName(image.name.substring(0, 18));
        setRegState((prev: any) => {
          return {
            ...prev,
            store: {
              ...prev.store,
              logo: { name: image.name, type: image.type, path: imageUrl },
            },
          };
        });
        setLoading(false);
      }
      setLoading(false);
    },
    [logoName]
  );

  return (
    <form method="post" action="submit" className={classes.innerForm}>
      <span className={classes.subheading}>{title}</span>
      <InputText
        id="name"
        inputType="text"
        label="Store Name"
        placeHolder=""
        warning="store name is required"
        onChange={inputChangeHandler}
        value={regState?.store?.name}
      />
      <InputText
        id="description"
        inputType="text"
        label="Description"
        placeHolder=""
        warning="Description is Required"
        onChange={inputChangeHandler}
        value={regState?.store?.description}
      />
      <div className={classes.horizontaldiv}>
        <InputText
          id="logo"
          inputType="file"
          label="Store Logo"
          fileloading={loading}
          filename={
            logoName || loading ? (
              <i className={`${"ri-check-double-line"} ${classes.checked}`}>
                {logoName}
              </i>
            ) : (
              regState?.store?.logo?.name.substring(0, 18) || "Choose file"
            )
          }
          placeHolder=""
          require={false}
          onChange={onImageUpload}
        />
        <div className={style.select}>
          <label htmlFor="country" className={style.inputLabel}>
            Shipping Methods
          </label>
          <select
            id="shiping"
            className={`${style.dropdown} ${style.input}`}
            onChange={onShipingSelected}
            style={{ width: "100%" }}
          >
            {renderShippingMethods}
          </select>
        </div>
      </div>
      <div className={classes.horizontaldiv}>
        <InputText
          id="estimatedeliverytime"
          inputType="number"
          label="Estimate Delivery time"
          placeHolder="IN DAYS"
          warning="This feild is require"
          onChange={inputChangeHandler}
          value={regState?.store?.estimatedeliverytime}
        />
        <InputText
          id="shipingrates"
          inputType="number"
          label="Shiping rates"
          placeHolder="IN RUPEES (OPTIONAL)"
          require={false}
          onChange={inputChangeHandler}
          value={regState?.store?.shipingrates}
        />
      </div>
    </form>
  );
};

export default StoreDetails;
