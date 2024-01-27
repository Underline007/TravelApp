import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";


const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/home" className="navbar-brand">
                            Admin Travel
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0"
                            style={{ marginRight: 50 }}
                        >


                            {!auth?.user ? (
                                <>

                                </>
                            ) : (
                                <>
                                    <SearchInput />
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link ">
                                            Destination
                                        </NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to={"/categories"}
                                            data-bs-toggle="dropdown"
                                        >
                                            Categories
                                        </Link>
                                        <ul className="dropdown-menu">

                                            {categories?.map((c) => (
                                                <li>
                                                    <Link
                                                        className="dropdown-item"
                                                        to={`/category/${c.slug}`}
                                                    >
                                                        {c.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            style={{ border: "none" }}
                                        >
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user/profile"
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;