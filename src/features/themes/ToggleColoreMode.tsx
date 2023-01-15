import { Button } from "@mui/material";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { toggleColorMode } from "./themeSlice";

const ToggleColorMode = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(toggleColorMode())}>
        Toggle color mode
      </Button>
    </div>
  );
};

export default ToggleColorMode;
