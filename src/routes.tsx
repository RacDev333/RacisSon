import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
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
                        { path: 'privacy', element: <Privacy /> },
            { path: 'cart', element: <Cart /> },
            { path: 'order', element: <Order /> },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);