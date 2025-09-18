import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/HomePage.js";
import About from "./Components/About/AboutUs.js";
import Layout from "./Components/Layout/Layout.js";
import Cart from "./Components/Cart/Cart.js";
import Checkout from "./Components/Cart/Checkout.js";

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
      {
        path: "cart",
        element: <Cart />,
        
      },
       {
            path: "checkout",
            element: <Checkout />,
          },
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />)
 }

export default App;
