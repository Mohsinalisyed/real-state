import React from "react";
import StarRating from "./StarRating";
import { Box, MainHeading } from "@/app/lib";
import { formatDate } from "@/app/utils/functions";

const Reviews: React.FC<{ productdetail: any }> = ({ productdetail }) => {
  return (
    <>
      {productdetail?.product?.reviews?.length > 0 && (
        <Box>
          <MainHeading title="FEEDBACKS" />
          {productdetail?.product?.reviews?.map((item: any, index: number) => (
            <Box key={index} className="review fd pt-2">
              <Box className="review__author" style={{ color: "blue" }}>
                {item?.username}
              </Box>
              <p className="review__date" style={{ color: "green" }}>
                {formatDate(item?.reviewDate)}
              </p>
              <StarRating value={item?.rating} size={15} />
              <p className="review__text pb-2" style={{ color: "black" }}>
                {item?.review}
              </p>
              <hr style={{ width: "100%" }} />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default Reviews;
