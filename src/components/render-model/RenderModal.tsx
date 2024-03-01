import { useCallback } from "react";
import { useRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "./../../state/atoms/screen";
import AddProduct from "../screens/products/addProduct/AddProduct";
import EditProfile from "../screens/profile/EditProfile";
import Confirmation from "../shared/Confirmation";
import ProductImages from "../screens/products/components/ProductImages";

type Props = {};

const RenderModal = ({}: Props) => {
  const [activeModalState, setActiveModalState] = useRecoilState(activeModal);
  const onClose = useCallback(() => {
    setActiveModalState("");
  }, []);
  switch (activeModalState) {
    case "add-product":
      return <AddProduct onClose={onClose} />;
    case "edit-profile":
      return <EditProfile onClose={onClose} />;
    case "confirmation":
      return <Confirmation onClose={onClose} />;
    case "product-images":
      return <ProductImages onClose={onClose} />;
    default:
      return;
  }
};

export default RenderModal;
