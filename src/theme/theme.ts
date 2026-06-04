import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") => createTheme({
    palette: {
      mode,
      primary: {
        main: "#0f766e",
      },
      secondary: {
        main: "#0ea5e9",
      },
      background: {
        default:
          mode === "light"
            ? "#f2f7f9"
            : "#08141f",
        paper:
          mode === "light"
            ? "#ffffff"
            : "#0e1f2c",
      },
      text: {
        primary:
          mode === "light"
            ? "#12232f"
            : "#d7e7f3",
        secondary:
          mode === "light"
            ? "#4b6578"
            : "#90a8bc",
      },
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Avenir Next", "Manrope", "Segoe UI", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              mode === "light"
                ? "radial-gradient(circle at 10% 0%, #dff2ef 0%, #f2f7f9 45%, #f4f7fc 100%)"
                : "radial-gradient(circle at 15% 0%, #123649 0%, #08141f 45%, #07111a 100%)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border:
              mode === "light"
                ? "1px solid #dce8ee"
                : "1px solid #234055",
            boxShadow:
              mode === "light"
                ? "0 10px 28px rgba(16, 24, 40, 0.06)"
                : "0 12px 28px rgba(2, 8, 16, 0.45)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },
});