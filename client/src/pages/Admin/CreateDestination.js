import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateDestination = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [duration, setDuration] = useState("");
    const [photo, setPhoto] = useState("");

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !category || !duration || !photo) {
            toast.error("Please fill in all the required fields");
            return;
        }

        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedFormats.includes(photo.type)) {
            toast.error("Invalid image format. Please upload a PNG, JPG, or JPEG file.");
            return;
        }

        try {
            const destinationData = new FormData();
            destinationData.append("name", name);
            destinationData.append("description", description);
            destinationData.append("price", price);
            destinationData.append("duration", duration);
            destinationData.append("photo", photo);
            destinationData.append("category", category);

            const { data } = await axios.post(
                "/api/v1/destination/create-destination",
                destinationData
            );

            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Destination Created Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Destination"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Destination</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="destination_photo"
                                            height={"250px"}
                                            width={"250px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={duration}
                                    placeholder="Write a duration"
                                    className="form-control"
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE DESTINATION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateDestination;
