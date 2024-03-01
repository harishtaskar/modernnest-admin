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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// @ts-ignore
import { productDetailState } from "../state/index.js";
// @ts-ignore
import { recallProductsAPI } from "../../../../state/atoms/screen.js";
// @ts-ignore
import { currentUserState } from "../../../../state/atoms/screen.js";
import { toast } from "react-toastify";
import useAPI from "../../../../hooks/Other/useAPI.js";
import { PORT } from "../../../../../config.js";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
};

const AddProduct = ({ onClose }: Props) => {
  const currentUser: any = useRecoilValue(currentUserState);
  const [disable, setDisable] = useState(true);
  const [productDetails, setProductDetails] =
    useRecoilState<Product>(productDetailState);
  const setRecallAPI = useSetRecoilState(recallProductsAPI);
  const { postRequest } = useAPI();

  const isFilled = useCallback(() => {
    let filled = false;
    if (
      productDetails?.availability?.length > 0 &&
      productDetails?.brand &&
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
  }, [productDetails]);

  const closeHandler = (e: any) => {
    if (productDetails?.images?.length > 0) {
      toast.info("Clear all images");
    } else {
      onClose(e);
    }
  };

  useEffect(() => {
    if (isFilled()) {
      setDisable(false);
    }
  }, [productDetails]);

  const submitHandler = useCallback(
    async (event: any) => {
      ("Add Product To Database");
      const response = await postRequest(
        `${PORT}/product/add`,
        {
          product: productDetails,
        },
        { _id: currentUser._id }
      );
      if (response.res === "ok") {
        toast.success(response.msg);
        //@ts-ignore
        setProductDetails({});
        setRecallAPI(Math.random() * 9);
        onClose(event);
      } else {
        toast.error("fill all fields");
      }
    },
    [productDetails]
  );

  const renderBody = useMemo(() => {
    return (
      <div className={classes.body}>
        <span className="heading">New Product</span>
        <ProductDetailsForm />
        <div className={classes.buttons}>
          <SecondaryButton
            name={"Cancel"}
            onClick={closeHandler}
            style={{
              width: "fit-content",
            }}
          />
          <PrimaryButton
            isDisable={disable}
            name={"Submit"}
            onClick={submitHandler}
            style={{
              width: "fit-content",
            }}
          />
        </div>
      </div>
    );
  }, [productDetails]);
  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      closeBtn={false}
      modalstyle={{ margin: "20px" }}
    />
  );
};

export default AddProduct;
