import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Table, Image, Space, Button, Popconfirm } from "antd";

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);

    // Get all destinations
    const getAllDestinations = async () => {
        try {
            const { data } = await axios.get("/api/v1/destination/get-destination");
            setDestinations(data.destinations);
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong");
        }
    };

    // Delete destination
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/destination/delete-destination/${id}`);
            toast.success("Destination deleted successfully");
            getAllDestinations();
        } catch (error) {
            console.error(error);
            toast.error("Error deleting destination");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllDestinations();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Photo",
            dataIndex: "_id",
            key: "_id",
            render: (_id) => <Image src={`/api/v1/destination/destination-photo/${_id}`} width={50} />,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <span>$ {price}</span>
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: (duration) => <span>{duration} hours</span>
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Link to={`/dashboard/admin/destination/${record.slug}`}>
                        <Button type="primary" style={{ backgroundColor: "#FFD700", borderColor: "#FFD700" }}>
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this destination?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger" style={{ backgroundColor: "#FF6347", borderColor: "#FF6347" }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Destinations List</h1>
                        <Table dataSource={destinations} columns={columns} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Destinations;
