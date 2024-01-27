import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const DestinationContext = createContext();

const DestinationProvider = ({ children }) => {
    // State cho destination
    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);


    const getAllDestinations = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/v1/destination/get-destination");
            setLoading(false);
            setDestinations(data?.destinations);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDestinations();
    }, []);

    return (
        <DestinationContext.Provider value={[destinations, setDestinations, getAllDestinations]}>
            {children}
        </DestinationContext.Provider>
    );
};

export { DestinationContext, DestinationProvider };
