import React, { useState } from "react";
const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (star) => {
        setHoverRating(star);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (star) => {
        console.log(star);
        onRatingChange(star);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        className="star"
                        style={{
                            fontSize: "24px",
                            fontWeight: "500",
                            cursor: "pointer",
                            color: "#FFC94A",
                            transition: "color 0.2s",
                            marginRight: "5px",
                        }}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starValue)}
                    >
                        {starValue <= (hoverRating || rating) ? "★" : "☆"}
                    </span>
                );
            })}
        </div>
    );
};
export default StarRating;
