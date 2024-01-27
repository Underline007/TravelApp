import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { Card, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const HomePage = () => {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllDestinations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/destination/get-destination`);
            setLoading(false);
            setDestinations(data.destinations);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDestinations();
    }, []);

    return (
        <Layout title={"All Destinations"}>
            <div className="container-fluid row mt-3 home-page">
                <h1 className="text-center">All Destinations</h1>
                <div className="d-flex flex-wrap" style={{ justifyContent: "center", alignItems: "center", }} >
                    {destinations?.map((d) => (
                        <Card
                            key={d._id}
                            className="m-2"
                            style={{
                                width: "18rem",
                                margin: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s",
                            }}
                            cover={
                                <img
                                    alt={d.name}
                                    src={`/api/v1/destination/destination-photo/${d._id}`}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            }
                            onClick={() => navigate(`/destination/${d.slug}`)}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <h5 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{d.name}</h5>
                                <h5 style={{ color: "#27ae60" }}>
                                    {d.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </h5>
                            </div>
                            <p style={{ color: "#666", marginBottom: "10px" }}>{d.description.substring(0, 30)}...</p>
                            <Button
                                type="primary"
                                className="ms-1"
                                icon={<EyeOutlined />}
                                style={{
                                    backgroundColor: "#3498db",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onClick={() => navigate(`/destination/${d.slug}`)}
                            >
                                More Details
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
