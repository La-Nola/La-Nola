import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import Header from "./components/homePage/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Stories from "./components/homePage/Stories";
import AboutMe from "./components/homePage/AboutMe";
import Team from "./components/Team";
import ProductList from "./components/products/ProductsList";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile";
import MyInformation from "./components/MyInformation";
import Logout from "./components/Logout";
import SignUp from "./components/SignUp";
import ViewProduct from "./components/products/ViewProduct";
import ShoppingCart from "./components/ShoppingCart";
import { DataContext } from "./store/context";
import MyOrders from "./components/MyOrders";
import SearchProductList from "./components/products/SearchProductList";
import ResetPassword from "./components/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { usersState } = useContext(DataContext);
  return (
    <div className="App flex flex-col min-h-screen">
      <Router>
        <ScrollToTop>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchProductList />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />}></Route>

            <Route
              path="/kidsclothes"
              element={<ProductList category="kidsClothes" />}
            >
              <Route
                path="/kidsclothes/:subcategory"
                element={<ProductList category="kidsClothes" />}
              />
            </Route>

            <Route path="/candles" element={<ProductList category="candles" />}>
              <Route
                path="/candles/:subcategory"
                element={<ProductList category="candles" />}
              />
            </Route>

            <Route
              path="/postcards"
              element={<ProductList category="postcards" />}
            >
              <Route
                path="/postcards/:subcategory"
                element={<ProductList category="postcards" />}
              />
            </Route>

            <Route path="/viewproduct/:productId" element={<ViewProduct />} />

            <Route path="/login" element={<Login />} />
            <Route path="/login/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/resetPassword/:token/:id"
              element={<ResetPassword />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/team" element={<Team />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/:category/:subcategory" element={<ProductList />} />
            <Route
              path={"/userprofile"}
              element={usersState.isLoggedIn ? <UserProfile /> : <Login />}
            >
              <Route index element={<MyInformation />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
