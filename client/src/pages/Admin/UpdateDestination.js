import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateDestination = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [duration, setDuration] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single destination
    const getSingleDestination = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/destination/get-destination/${params.slug}`
            );
            setName(data.destination.name);
            setId(data.destination._id);
            setDescription(data.destination.description);
            setPrice(data.destination.price);
            setCategory(data.destination.category._id);
            setDuration(data.destination.duration);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleDestination();
        // eslint-disable-next-line
    }, []);

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update destination function
    const handleUpdate = async (e) => {
        e.preventDefault();

        // // Validate that none of the required fields are empty
        // if (!name || !description || !price || !duration || !photo) {
        //     toast.error("Please fill in all the required fields");
        //     return;
        // }

        // Validate photo format
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (photo && !allowedFormats.includes(photo.type)) {
            toast.error("Please upload a valid image file (PNG, JPG, JPEG)");
            return;
        }

        try {
            const destinationData = new FormData();
            destinationData.append("name", name);
            destinationData.append("description", description);
            destinationData.append("price", price);
            destinationData.append("category", category);
            destinationData.append("duration", duration);
            photo && destinationData.append("photo", photo);

            const { data } = await axios.put(
                `/api/v1/destination/update-destination/${id}`,
                destinationData
            );

            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Destination Updated Successfully");
                navigate("/dashboard/admin/destinations");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    //delete a destination
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this destination? ");
            if (!answer) return;
            await axios.delete(`/api/v1/destination/delete-destination/${id}`);
            toast.success("Destination Deleted Successfully");
            navigate("/dashboard/admin/destinations");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Update Destination"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Destination</h1>
                        <div className="m-1 w-75">
                            <h6>Category</h6>
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
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
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="destination_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`/api/v1/destination/destination-photo/${id}`}
                                            alt="destination_photo"
                                            height={"150px"}
                                            width={"150px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <h6>Name</h6>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <h6>Description</h6>
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <h6>Price</h6>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <h6>Duration</h6>
                                <input
                                    type="text"
                                    value={duration}
                                    placeholder="write a duration"
                                    className="form-control"
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE DESTINATION
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    DELETE DESTINATION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateDestination;
