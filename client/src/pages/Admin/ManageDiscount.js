import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import DiscountForm from "../../components/Form/DiscountFrom";
import { Modal } from "antd";

const ManageDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [name, setName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedExpirationDate, setUpdatedExpirationDate] = useState("");
    const [updatedValue, setUpdatedValue] = useState("");

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/discount/discounts", {
                name,
                expirationDate,
                value,
            });
            if (data?.success) {
                toast.success(`${name} discount is created`);
                getAllDiscounts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    };

    // Get all discounts
    const getAllDiscounts = async () => {
        try {
            const { data } = await axios.get("/api/v1/discount/discounts");
            if (data.success) {
                setDiscounts(data.discounts);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting discounts");
        }
    };

    useEffect(() => {
        getAllDiscounts();
    }, []);

    // Update discount
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/discount/discounts/${selected._id}`,
                {
                    name: updatedName,
                    expirationDate: updatedExpirationDate,
                    value: updatedValue,
                }
            );
            if (data.success) {
                toast.success(`${updatedName} discount is updated`);
                setSelected(null);
                setUpdatedName("");
                setUpdatedExpirationDate("");
                setUpdatedValue("");
                setVisible(false);
                getAllDiscounts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Delete discount
    const handleDelete = async (discountId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/discount/discounts/${discountId}`
            );
            if (data.success) {
                toast.success(`Discount is deleted`);
                getAllDiscounts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Manage Discounts"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Discounts</h1>
                        <div className="p-3 w-50">
                            <DiscountForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                expirationDate={expirationDate}
                                setExpirationDate={setExpirationDate}
                                value={value}
                                setValue={setValue}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Expiration Date</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discounts?.map((d) => (
                                        <tr key={d._id}>
                                            <td>{d.name}</td>
                                            <td>{d.expirationDate}</td>
                                            <td>{d.value}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(d.name);
                                                        setUpdatedExpirationDate(
                                                            d.expirationDate
                                                        );
                                                        setUpdatedValue(d.value);
                                                        setSelected(d);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        handleDelete(d._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <DiscountForm
                                name={updatedName}
                                setName={setUpdatedName}
                                expirationDate={updatedExpirationDate}
                                setExpirationDate={setUpdatedExpirationDate}
                                value={updatedValue}
                                setValue={setUpdatedValue}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageDiscount;
