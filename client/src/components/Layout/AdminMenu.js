// AdminMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaWpforms, FaPlus, FaUser, FaShoppingBag, FaMoneyBillAlt, FaPlaceOfWorship } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

const AdminMenu = () => {
    const menuStyle = {
        backgroundColor: "#282c34",
        color: "white",
        padding: "20px",
        width: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const headerStyle = {
        fontSize: "20px",
        marginBottom: "10px",
    };

    const menuItemStyle = {
        display: "flex",
        alignItems: "center",
        color: "white",
        textDecoration: "none",
        padding: "8px",
        marginBottom: "5px",
        transition: "background-color 0.3s",
    };

    const hoverStyle = {
        backgroundColor: "#4d4d4d",
    };

    const iconStyle = {
        marginRight: "10px",
    };

    return (
        <div style={menuStyle}>
            <div style={headerStyle}>Admin Panel</div>
            <NavLink to="/dashboard/admin/create-category" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaWpforms style={iconStyle} />
                Create Category
            </NavLink>
            <NavLink to="/dashboard/admin/create-user" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaUserPlus style={iconStyle} />
                Create New User
            </NavLink>
            <NavLink to="/dashboard/admin/discount" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaMoneyBillAlt style={iconStyle} />
                ManageDiscount
            </NavLink>
            <NavLink to="/dashboard/admin/create-destination" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaPlus style={iconStyle} />
                Create Destination
            </NavLink>
            <NavLink to="/dashboard/admin/destinations" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaPlaceOfWorship style={iconStyle} />
                All Destination
            </NavLink>

            <NavLink to="/dashboard/admin/users" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaUser style={iconStyle} />
                All Users
            </NavLink>
            <NavLink to="/dashboard/admin/orders" style={{ ...menuItemStyle, ...hoverStyle }}>
                <FaShoppingBag style={iconStyle} />
                Orders
            </NavLink>

        </div>
    );
};

export default AdminMenu;
