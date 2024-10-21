import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import MyProfile from "../pages/MyProfile";
import CreateBlog from "../pages/CreateBlog";
import AdminProfile from "../pages/AdminProfile";
import BlogDetails from "../pages/BlogDetails";
import Cetegory from "../pages/Cetegory";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "category/:category",
        element: <Cetegory />,
      },
      {
        path: "search", // Catch-all route for unmatched paths
        element: <Search />, // Render NotFound component
      },{
        path: "*", // Catch-all route for unmatched paths
        element: <NotFound />, // Render NotFound component
      },
    ],
  },
]);

export default router;
