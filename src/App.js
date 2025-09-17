import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/HomePage.js";
import About from "./Components/About/AboutUs.js";
import Layout from "./Components/Layout/Layout.js";

// Route configuration as objects
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Shared layout (e.g., Navbar + Outlet)
    children: [
      {
        index: true, // default child route
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />)
 }

export default App;
