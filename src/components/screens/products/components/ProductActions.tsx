import classes from "../index.module.css";

type Props = {
  disclosed?: boolean;
};

const ProductActions = ({ disclosed = false }: Props) => {
  return (
    <div className={classes["product-actions"]}>
      {disclosed ? (
        <i className={`${classes["product-action"]} ri-eye-line`} />
      ) : (
        <i className={`${classes["product-action"]} ri-eye-off-line`} />
      )}

      <i className={`${classes["product-action"]} ri-edit-box-line`} />
    </div>
  );
};

export default ProductActions;
