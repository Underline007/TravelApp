import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button } from "antd";

const DestinationDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState({});
    const [relatedDestinations, setRelatedDestinations] = useState([]);

    // Initialize details
    useEffect(() => {
        if (params?.slug) getDestination();
    }, [params?.slug]);

    // Get destination details
    const getDestination = async () => {
        try {
            const { data } = await axios.get(`/api/v1/destination/get-destination/${params.slug}`);
            setDestination(data?.destination);
            getSimilarDestinations(data?.destination._id, data?.destination.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    // Get similar destinations
    const getSimilarDestinations = async (did, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/destination/related-destination/${did}/${cid}`);
            setRelatedDestinations(data?.destinations);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <Row className="container mt-2" style={{ backgroundColor: "#d6edc7", padding: "20px" }}>
                <Col span={12}>
                    <Image
                        src={`/api/v1/destination/destination-photo/${destination._id}`}
                        alt={destination.name}
                        height={350}
                        width={400}
                    />
                </Col>
                <Col span={12}>
                    <h1 className="text-center" style={{ color: "#2c3e50" }}>Destination Details</h1>
                    <h3 style={{ color: "#bb41e8" }}>Name: {destination.name}</h3>
                    <h4 style={{ color: "#34495e" }}>Description: {destination.description}</h4>

                    <h4 style={{ color: "#f50a50" }}>Price: ${destination.price}</h4>
                    <h4 style={{ color: "#1162d4" }}>Duration: {destination.duration} hours</h4>
                    <h4 style={{ color: "#34495e" }}>Category: {destination?.category?.name}</h4>
                </Col>
            </Row>
            <hr style={{ border: "1px solid #bdc3c7" }} />
            <Row className="container" style={{ marginTop: "20px" }}>
                <h5 style={{ color: "#2c3e50" }}>Similar Destinations</h5>

                {relatedDestinations.length < 1 && (
                    <p className="text-center" style={{ color: "#34495e" }}>No Similar Destinations found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedDestinations?.map((d) => (
                        <div className="card m-2" style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} key={d._id}>
                            <Image
                                src={`/api/v1/destination/destination-photo/${d?._id}`}
                                alt={d.name}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: "#2c3e50" }}>{d.name}</h5>
                                <p className="card-text" style={{ color: "#34495e" }}>$ {d.price}</p>
                                <Button type="primary" className="ms-1" onClick={() => navigate(`/destination/${d.slug}`)}>
                                    More Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Row>
        </Layout>
    );
};

export default DestinationDetail;
