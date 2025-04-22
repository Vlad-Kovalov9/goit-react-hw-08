import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy } from "react";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));
import { Layout } from "../components/Layout/Layout";
import { RestrictedRoute } from "../components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div className="app_loader">
      <b>Refreshing user...</b>
      <ClipLoader
        color="#36d7b7"
        loading={true}
        size={80}
        aria-label="loading-spinner"
      />
    </div>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
