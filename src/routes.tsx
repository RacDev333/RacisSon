import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'products', element: <Products /> },
            { path: 'contact', element: <Contact /> },
            { path: 'terms', element: <Terms /> },
            { path: 'cart', element: <Cart /> },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);