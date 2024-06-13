import React from "react";
import StarRating from "./StarRating";
import { Box } from "@/app/lib";

interface Iprops {
  header: string;
  productdetail: any;
}

const Card: React.FC<Iprops> = ({ header, productdetail }) => {
  const Rating = productdetail.product.reviews.reduce(
    (acc: any, { rating }: any) => acc + rating,
    0,
  );
  const StarString = (
    Rating / productdetail?.product?.reviews?.length || 0
  ).toFixed(1);
  const Star = parseFloat(StarString);
  console.log(productdetail?.product?.reviews?.length);
  return (
    <Box className="reviewcard">
      <Box className="card__content">
        <h2 className="card__header" style={{ color: "black" }}>
          {header}
        </h2>
        <Box className="card__review">
          <StarRating value={Star} size={20} />
          <Box data-testid="rating" className="card__label">
            {`${Star} | ${productdetail?.product?.reviews?.length || 0} users rated this!`}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
