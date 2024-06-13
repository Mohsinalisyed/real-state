import React, { useState } from "react";
import "./style.scss";
import ReviewForm from "./ReviewForm";

import Card from "./ReviewCard";
import { Box } from "@/app/lib";
import ButtonComp from "../Button";
interface Iprops {
  productdetail?: any;
  refetch: () => void;
}

const MainReview: React.FC<Iprops> = ({ productdetail, refetch }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box className="reviewcontainer">
      <Card header="REVIEWS" productdetail={productdetail} />
      {visible && productdetail?.product?.reviews.length === 0 && (
        <ReviewForm
          setVisible={setVisible}
          productdetail={productdetail}
          refetch={refetch}
        />
      )}
      <Box>
        {!visible && productdetail?.product?.reviews.length === 0 && (
          <ButtonComp
            className={visible ? "reviewbtn" : "reviewbtn center"}
            func={() => setVisible(!visible)}
            text="Click to add Review!"
          />
        )}
      </Box>
    </Box>
  );
};

export default MainReview;
