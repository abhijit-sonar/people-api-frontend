import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Container,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const theme: MantineThemeOverride = {
  fontFamily: "Open Sans, sans serif",
  colorScheme: "dark",
};

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
