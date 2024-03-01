import { CSSProperties } from "react";

type Props = {
  style: CSSProperties;
};

const SkeletonLoading = ({ style }: Props) => {
  return <i className={"skeleton"} style={style} />;
};

export default SkeletonLoading;
