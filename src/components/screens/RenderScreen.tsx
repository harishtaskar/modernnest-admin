import Products from "./products/Products";
// @ts-ignore
import { activeScreen } from "./../../state/atoms/screen";
import { useRecoilValue } from "recoil";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";

type Props = {};

const RenderScreen = (props: Props) => {
  const activeModalState = useRecoilValue(activeScreen);
  switch (activeModalState) {
    case "dashboard":
      return <Dashboard />;
    case "products":
      return <Products />;
    case "profile":
      return <Profile />;
    default:
      return;
  }
};

export default RenderScreen;
