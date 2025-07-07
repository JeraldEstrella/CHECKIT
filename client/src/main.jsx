import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import "./index.css";
import DashBoardLayout from "./layout/dashBoardLayout.jsx";
import Content from "./route/content/Content.jsx";
import Submit from "./route/submit/Submit.jsx";
import Signinpage from "./route/signInpage/signinpage.jsx";
import Signuppage from "./route/signUppage/signuppage.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/sign-in/*", element: <Signinpage /> },
      { path: "/sign-up/*", element: <Signuppage /> },
      {
        element: <DashBoardLayout />,
        children: [
          { path: "/", element: <Content /> },
          { path: "/submit", element: <Submit /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
