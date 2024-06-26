import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Regist from "./pages/Regist";
import ProductManage from "./Auth/ProductManage";
import CatalogManage from "./Auth/CatalogManage";
import CatalogModal from "./components/CatalogModal";
import Usermanage from "./Auth/Usermanage";
import UserModal from "./components/UserModal";
import AdminLogin from "./pages/Adminlogin";
import SalesLogin from "./pages/SalesLogin";
import { useRoutes } from "react-router-dom";
import Detail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import Maintenance from "./pages/Maintenance";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import SearchResult from "./pages/SearchResult";
import DashBoard from "./Auth/DashBoard";
import ManageOrder from "./pages/ManageOrder";
import WebsitePolicy from "./pages/WebsitePolicy";

const useRouteElement = () => {
    const routeElement = useRoutes([
        {
            path: "/",
            index: true,
            element: (
                <>
                    <Header />
                    <Main />
                    <Footer />
                </>
            ),
        },
        {
            path: "/regist",
            element: (
                <>
                    <Header />
                    <Regist />
                    <Footer />
                </>
            ),
        },
        {
            path: "/adminLogin",
            element: (
                <>
                    <AdminLogin />
                </>
            ),
        },
        {
            path: "/salesLogin",
            element: (
                <>
                    <SalesLogin />
                </>
            ),
        },
        {
            path: "/usersmanage",
            element: (
                <>
                    <Usermanage />
                </>
            ),
        },
        {
            path: "/categoriesmanage",
            element: (
                <>
                    <CatalogManage />
                </>
            ),
        },
        {
            path: "/productsmanage",
            element: (
                <>
                    <ProductManage />
                </>
            ),
        },

        {
            path: "/searchResult",
            element: (
                <>
                    <Header />
                    <SearchResult />
                    <Footer />
                </>
            ),
        },
        {
            path: "/detail/:id",
            element: (
                <>
                    <Header />
                    <Detail />
                    <Footer />
                </>
            ),
        },
        {
            path: "/cart/",
            element: (
                <>
                    <Header />
                    <CartPage />
                    <Footer />
                </>
            ),
        },
        {
            path: "/order/",
            element: (
                <>
                    <OrderPage />
                </>
            ),
        },
        {
            path: "/manageOrder/",
            element: (
                <>
                    <Header />
                    <ManageOrder />
                    <Footer />
                </>
            ),
        },
        {
            path: "/maintenance/",
            element: (
                <>
                    <Header />
                    <ManageOrder />
                    <Footer />
                </>
            ),
        },

        {
            path: "/allproducts/:id/:name",
            element: (
                <>
                    <Header />
                    <AllProducts />
                    <Footer />
                </>
            ),
        },
        {
            path: "/pages/:name",
            element: (
                <>
                    <Header />
                    <WebsitePolicy />
                    <Footer />
                </>
            ),
        },
        {
            path: "AdminPage",
            element: (
                <>
                    <DashBoard />
                </>
            ),
        },
    ]);
    return routeElement;
};

function App() {
    return <div className="App">{useRouteElement()}</div>;
}

export default App;
