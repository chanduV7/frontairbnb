import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utlis/api";
import { useDispatch } from "react-redux";
import { addTrip } from "../redux/slices/homePageSlice";

export default function Payment() {
  const dispatch = useDispatch();
  const fetchPayment = async () => {
    try {
      const cs_id = localStorage.getItem("cs_id");
      localStorage.removeItem("cs_id");
      const { data: sessionData } = await axios.get(
        baseUrl + "/payment/session/" + cs_id
      );
      const { data: paymentIntent } = await axios.get(
        baseUrl + "/payment/paymentIntent/" + sessionData.payment_intent
      );
      if (paymentIntent.status == "succeeded") {
        // dispatch(
        //   addTrip({
        //     userId: localStorage.getItem("userId"),
        //     courseId: sessionData.metadata.courseId,
        //     duration: sessionData.metadata.duration,
        //     paymentId: sessionData.payment_intent,
        //     startDate: new Date(),
        //   })+
        // );
      } else {
        alert("Payment status" + paymentIntent.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return <div>Payment</div>;
}
