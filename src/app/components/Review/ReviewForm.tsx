import React, { useState, useEffect, ChangeEvent } from "react";
import StarRating from "./StarRating";
import { Box } from "@/app/lib";
import { useMutation } from "react-query";
import { addreview } from "@/app/services/product";
import ButtonComp from "../Button";

const initialFormState = { name: "", review: "", rating: 0 };

interface Iprops {
  setVisible: (value: React.SetStateAction<boolean>) => void;
  productdetail: any;
  refetch: () => void;
}

const ReviewForm: React.FC<Iprops> = ({
  setVisible,
  productdetail,
  refetch,
}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [disabled, setDisabled] = useState(true);
  const { mutate: addReview, isLoading: updateLoading } = useMutation<
    any,
    Error,
    any
  >(({ productId, review }) => addreview(productId, review), {
    onSuccess: () => {
      refetch();
    },
  });
  const { name, review, rating } = formState;

  function handleSubmit(e: any) {
    e.preventDefault();
    const productId = `${productdetail?.product?._id}`;
    addReview({
      productId: productId,
      review: {
        username: name,
        review: review,
        rating: rating,
      },
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (review.length > 3 && rating > 0 && name !== "") setDisabled(false);
    else setDisabled(true);
  }, [name, rating, review]);

  return (
    <Box className="reviw-formcontainer">
      <Box className="content-center">
        <StarRating
          onChange={(rating: number) => setFormState({ ...formState, rating })}
          value={formState.rating}
          size={30}
        />
      </Box>
      <form className="reviewform" onSubmit={handleSubmit}>
        <Box className="content-center pt-4" style={{ gap: "10px" }}>
          <input
            placeholder="Name"
            name="name"
            onChange={handleChange}
            style={{ margin: "0" }}
          />
          <input
            placeholder="Write your review here"
            name="review"
            onChange={handleChange}
            style={{ margin: "0" }}
          />
        </Box>
        <Box className="content-center mt-4" style={{ gap: "10px" }}>
          <ButtonComp
            text="Send"
            primary
            type="submit"
            disabled={disabled}
            className="mr-0"
          />
          <ButtonComp
            func={() => setVisible(false)}
            text="Cancel"
            className="mr-0"
          />
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
