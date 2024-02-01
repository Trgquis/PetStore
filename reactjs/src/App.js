import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Regist from "./pages/Regist";
import ProductManage from "./Auth/ProductManage";
import ProductModal from "./components/ProductModal";
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
            path: "/manage",
            element: (
                <>
                    <UserModal />
                    <Usermanage />
                </>
            ),
        },
        {
            path: "/catalogsmanage",
            element: (
                <>
                    <CatalogModal />
                    <CatalogManage />
                </>
            ),
        },
        {
            path: "/productsmanage",
            element: (
                <>
                    <ProductModal />
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
            path: "/order/:id/:isCart",
            element: (
                <>
                    <OrderPage />
                </>
            ),
        },
        {
            path: "/maintenance/",
            element: (
                <>
                    <Header />
                    <Maintenance />
                    <Footer />
                </>
            ),
        },
        {
            path: "/allproducts/:id",
            element: (
                <>
                    <Header />
                    <AllProducts />
                    <Footer />
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
