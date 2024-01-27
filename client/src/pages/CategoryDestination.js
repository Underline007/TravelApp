import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryDestination = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([]);
    const [category, setCategory] = useState({});

    useEffect(() => {
        if (params?.slug) getDestinationsByCat();
    }, [params?.slug]);

    const getDestinationsByCat = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/destination/destination-category/${params.slug}`
            );
            setDestinations(data?.destinations);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{destinations?.length} result found </h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {destinations?.map((d) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={d._id}
                                >
                                    <img
                                        src={`/api/v1/destination/destination-photo/${d._id}`}
                                        className="card-img-top"
                                        alt={d.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{d.name}</h5>
                                        <p className="card-text">
                                            {d.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {d.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/destination/${d.slug}`)}
                                        >
                                            More Details
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryDestination;
