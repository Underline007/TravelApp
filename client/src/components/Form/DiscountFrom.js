import React, { useState } from "react";
import toast from "react-hot-toast";

const DiscountForm = ({ handleSubmit, name, setName, expirationDate, setExpirationDate, value, setValue, error }) => {
    const handleChangeValue = (e) => {
        const inputValue = parseInt(e.target.value, 10);

        if (!Number.isNaN(inputValue) && inputValue >= 1 && inputValue <= 100) {
            setValue(inputValue);
        } else {
            toast.error("Value must be integer number from 1 to 100 ");
            setValue("");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter discount name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Expiration Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Value</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter discount value"
                        value={value}
                        onChange={handleChangeValue}
                    />
                    {error && <p className="text-danger">{error}</p>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default DiscountForm;
