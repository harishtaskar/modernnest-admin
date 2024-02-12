import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "../../../render-model/Modal";
import classes from "./index.module.css";
import ProductDetailsForm from "./ProductDetailsForm";
import PrimaryButton, { SecondaryButton } from "../../../HOC/Buttons";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { productDetailState } from "../state/index.js";
import { toast } from "react-toastify";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

const AddProduct = ({ onClose }: Props) => {
  const [disable, setDisable] = useState(true);
  const productDetails: Product = useRecoilValue(productDetailState);

  const isFilled = () => {
    let filled = false;
    if (
      productDetails?.availability?.length > 0 &&
      productDetails?.brand &&
      productDetails?.category &&
      productDetails?.description &&
      productDetails?.document &&
      productDetails?.images?.length > 1 &&
      productDetails?.price &&
      productDetails?.productLinks?.length > 0 &&
      productDetails?.productTags?.length > 0 &&
      productDetails?.name &&
      productDetails?.returnpolicy &&
      productDetails?.quantity &&
      productDetails?.specification &&
      productDetails?.warrantyinfo
    ) {
      filled = true;
    }
    return filled;
  };

  const closeHandler = (e: any) => {
    if (productDetails?.images?.length > 0) {
      toast.info("Clear all images");
    } else {
      console.log("Closed");
      onClose(e);
    }
  };

  useEffect(() => {
    console.log("changes");
    if (isFilled()) {
      setDisable(false);
    }
  }, [productDetails]);

  const submitHandler = useCallback(() => {
    if (isFilled()) {
      ("Add Product To Database");
      toast.success(" 🚀 Product added successfully");
    } else {
      toast.error("Please fill all fields");
    }
  }, []);

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="heading">New Product</span>
        <ProductDetailsForm />
        <div className={classes.buttons}>
          <SecondaryButton
            name={"Cancel"}
            onClick={closeHandler}
            style={{ width: "fit-content" }}
          />
          <PrimaryButton
            isDisable={disable}
            name={"Submit"}
            onClick={submitHandler}
            style={{ width: "fit-content" }}
          />
        </div>
      </div>
    );
  }, [productDetails]);
  return <Modal body={renderBody} onClose={onClose} closeBtn={false} />;
};

export default AddProduct;
