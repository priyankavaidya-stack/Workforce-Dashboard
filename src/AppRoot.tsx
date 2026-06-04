import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAtomValue } from "jotai";
import App from "./App";
import { getTheme } from "./theme/theme";
import { themeAtom } from "./atoms/themeAtom";

const AppRoot = () => {
  const mode = useAtomValue(themeAtom);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default AppRoot;
