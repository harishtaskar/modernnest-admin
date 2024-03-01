import { useCallback, useEffect, useRef, useState } from "react";
import classes from "../index.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "../../../../state/atoms/screen.js";
//@ts-ignore
import { confirmationState } from "../../../../state/atoms/screen.js";
//@ts-ignore
import { recallProductsAPI } from "../../../../state/atoms/screen.js";
import useAPI from "../../../../hooks/Other/useAPI.js";
import { PORT } from "../../../../../config.js";
import { toast } from "react-toastify";

type Props = {
  id: string;
};

const MoreActions = ({ id }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const divRef: any = useRef(null);
  const setActiveModal = useSetRecoilState(activeModal);
  const [confirmation, setConfirmation] =
    useRecoilState<Confimation>(confirmationState);

  const { patchRequest } = useAPI();
  const setRecallProductAPI = useSetRecoilState(recallProductsAPI);

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!divRef.current?.contains(event.target)) {
        // change starts here
        setActive(false);
        // change starts here
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const deleteHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setActiveModal("confirmation");
      // setting values in the confirmation modal to delete product
      setConfirmation({
        key: "delete-product",
        title: "Delete Product",
        conditionalString: id,
        id: id,
      });
    },
    []
  );

  const outOfStockHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const response = await patchRequest(
        `${PORT}/product/update`,
        {
          update: { quantity: 0 },
        },
        {
          prod_id: id,
        }
      );
      if ((await response.res) === "ok") {
        // toast.success("Stock Updated Successfully");
        setRecallProductAPI(Math.random() * 900);
      } else {
        toast.error(response.msg);
      }
    },
    []
  );

  return (
    <div className={classes["more"]}>
      <div className={`${classes["more-actions"]}`} ref={divRef}>
        <i
          className={`${classes["product-action"]} ri-more-2-fill`}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.stopPropagation();
            setActive((prev) => !prev);
          }}
          style={active ? { backgroundColor: "var(--background)" } : {}}
        />
      </div>
      {active && (
        <div className={`${classes["more-actions-list"]}`}>
          <button
            className={classes["more-action"]}
            onClick={outOfStockHandler}
          >
            Out of Stock
          </button>
          <button className={classes["more-action"]} onClick={deleteHandler}>
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreActions;
