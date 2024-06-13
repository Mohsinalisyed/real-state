import React, { memo } from "react";
import StarRatings from "react-star-ratings";

interface StarRatingProps {
  value: number;
  size?: number;
  color?: string;
  onChange?: (rating: number) => void; // Add onChange prop to the interface
}

const StarRating: React.FC<StarRatingProps> = memo(
  ({ value, size, color, onChange, ...rest }) => {
    // Ensure value is a number before using it
    const currentRating = typeof value === "number" ? value : 0;

    // Debugging: Log the value of currentRating
    console.log("Current rating:", currentRating);

    // Render the star ratings
    return (
      <StarRatings
        rating={currentRating}
        starDimension={`${size}px`}
        starRatedColor={color || "gold"}
        starEmptyColor="lightgray"
        numberOfStars={5}
        changeRating={onChange}
        {...rest}
      />
    );
  },
);

StarRating.displayName = "StarRating";

export default StarRating;
