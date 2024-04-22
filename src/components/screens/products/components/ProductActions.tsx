import { useCallback } from "react";
import classes from "../index.module.css";

type Props = {
  disclosed?: boolean;
};

const ProductActions = ({ disclosed = false }: Props) => {
  const onEditHandler = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div className={classes["product-actions"]}>
      {disclosed ? (
        <i className={`${classes["product-action"]} ri-eye-line`} />
      ) : (
        <i className={`${classes["product-action"]} ri-eye-off-line`} />
      )}

      <i
        className={`${classes["product-action"]} ri-edit-box-line`}
        onClick={onEditHandler}
      />
    </div>
  );
};

export default ProductActions;
