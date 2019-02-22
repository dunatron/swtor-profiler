import green from "@material-ui/core/colors/green"
import blueGrey from "@material-ui/core/colors/blueGrey"

const theme = {
  palette: {
    common: { black: "rgba(255, 255, 255, 1)", white: "#fff" },
    background: { paper: "rgba(184, 206, 213, 1)", default: "#fafafa" },
    primary: {
      light: "rgba(142, 172, 187, 1)",
      main: "rgba(96, 125, 139, 1)",
      dark: "rgba(52, 81, 94, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(255, 255, 104, 1)",
      main: "rgba(243, 211, 50, 1)",
      dark: "rgba(188, 162, 0, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
}
export default theme
