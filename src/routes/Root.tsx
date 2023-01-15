import { Outlet } from "react-router-dom";
import Theme from "../features/themes/Theme";

const Root = () => {
  return (
    <Theme>
      <>
        <Outlet />
      </>
    </Theme>
  );
};

export default Root;
