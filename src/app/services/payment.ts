// payment.js
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const payment = async ({ payload }: { payload: { total_amount: number } }) => {
  const response = await axios.post("/api/payment/checkout", payload);
  return response.data;
};

export const usePaymentMutation = () => {
  return useMutation(payment, {
    onError: (data: any) => {
      console.log(data.response.data.error, "data");
      toast.error(
        data.response.data.error || "An error occurred during payment",
      );
    },
  });
};
