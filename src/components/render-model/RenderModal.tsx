import { useCallback } from "react";
import { useRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "./../../state/atoms/screen";
import AddProduct from "../screens/products/addProduct/AddProduct";

type Props = {};

const RenderModal = (props: Props) => {
  const [activeModalState, setActiveModalState] = useRecoilState(activeModal);
  const onClose = useCallback(() => {
    console.log("something");
    setActiveModalState("");
  }, []);
  switch (activeModalState) {
    case "add-product":
      return <AddProduct onClose={onClose} />;
    default:
      return;
  }
};

export default RenderModal;
