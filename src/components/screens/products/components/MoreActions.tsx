import { useCallback, useEffect, useRef, useState } from "react";
import classes from "../index.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "../../../../state/atoms/screen.js";
//@ts-ignore
import { confirmationState } from "../../../../state/atoms/screen.js";

type Props = {
  id: string;
};

const MoreActions = ({ id }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const divRef: any = useRef(null);
  const setActiveModal = useSetRecoilState(activeModal);
  const [confirmation, setConfirmation] =
    useRecoilState<Confimation>(confirmationState);
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

  const deleteHandler = useCallback(() => {
    setActiveModal("confirmation");
    setConfirmation({
      key: "delete-product",
      title: "Delete Product",
      conditionalString: id,
      id: id,
    });
  }, []);

  return (
    <div className={classes["more"]}>
      <div className={classes["more-actions"]} ref={divRef}>
        <i
          className={`${classes["product-action"]} ri-more-2-fill`}
          onClick={() => setActive((prev) => !prev)}
          style={active ? { backgroundColor: "var(--background)" } : {}}
        />
      </div>
      {active && (
        <div className={classes["more-actions-list"]}>
          <button className={classes["more-action"]}>Out of Stock</button>
          <button className={classes["more-action"]} onClick={deleteHandler}>
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreActions;
