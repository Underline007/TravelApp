import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Destinations Found"
                            : `Found ${values?.results.length} Destinations`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((d) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={d._id}>
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
                                    {/* Add to Cart button or other actions if needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
