import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header, Pokemon, ErrorPage } from "./modules";
import Series from "./modules/Series/Series";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "series",
        element: (
            <>
                <Header />
                <Series />,
            </>
        ),
    },
    {
        path: "pokemons/:pokemonid",
        element: (
            <>
                <Header />
                <Pokemon />
            </>
        ),
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>
);
