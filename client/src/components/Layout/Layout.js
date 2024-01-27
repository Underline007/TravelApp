import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />

                {children}
            </main>
            <Footer />
        </div>
    );
};



export default Layout;