import React from "react";

const DisplayStar = ({ rating }) => {
    const stars = [];
    // Loop to create each star
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // If current star index is less than rating, render a filled star
            stars.push(<span key={i}>&#9733;</span>);
        } else {
            // Otherwise, render an empty star
            stars.push(<span key={i}>&#9734;</span>);
        }
    }
    return <div className="star-rating">{stars}</div>;
};

export default DisplayStar;
