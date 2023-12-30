import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserReviews } from "../services/users";
import { useSelector } from "react-redux";
import Review from "../components/Review";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getUserReviewList = async () => {
    try {
      const response = await getUserReviews(auth.token);
      console.log(response);
      setReviews(response.data);
    } catch (e) {
      toast.error("Unable to retrieve posts.");
    }
  };

  useEffect(() => {
    getUserReviewList();
  }, []);

  return (
    <div className="w-full py-5">
      {reviews.map((review) => (
        <Review
          key={review._id}
          authorName={`${review.user.firstName} ${review.user.lastName}`}
          rating={review.rating}
          content={review.content}
          images={review.images}
          className="w-1/2 mx-auto"
        />
      ))}
    </div>
  );
};

export default UserReviews;
