import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import Search from "./pages/Search";
import AdminOrders from "./pages/Admin/AdminOrders";
import CreateDestination from "./pages/Admin/CreateDestination";
import UserList from "./pages/Admin/UserList";
import CreateUser from "./pages/Admin/CreateUser";
import DestinationPage from "./pages/Admin/Destinations";
import UpdateDestination from "./pages/Admin/UpdateDestination";
import DestinationDetail from "./pages/DestinationDetail";
import CategoryDestination from "./pages/CategoryDestination";
import ManageDiscount from "./pages/Admin/ManageDiscount";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/category/:slug" element={<CategoryDestination />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/discount" element={<ManageDiscount />} />
          <Route path="admin/create-user" element={<CreateUser />} />
          <Route path="admin/create-destination" element={<CreateDestination />} />
          <Route path="admin/destinations" element={<DestinationPage />} />
          <Route path="admin/destination/:slug" element={<UpdateDestination />} />
          <Route path="admin/users" element={<UserList />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;