import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserReviews } from "../services/users";
import { useSelector } from "react-redux";
import Review from "../components/Review";
import { CONST } from "../constaints";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const auth = useSelector((state) => state.auth);

  const getUserReviewList = async () => {
    try {
      const response = await getUserReviews(auth.token);
      setReviews(response.data);
    } catch (e) {
      toast.error("Unable to retrieve posts.");
    }
  };

  useEffect(() => {
    getUserReviewList();
  }, []);

  return (
    <div className="w-full">
      {reviews.map((review) => (
        <Review
          key={review._id}
          avatar={`${CONST.IMAGE_URL}/${review.user.avatar}`}
          authorName={`${review.user.firstName} ${review.user.lastName}`}
          rating={review.rating}
          content={review.content}
          images={review.images}
          attraction={review.attraction}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
};

export default UserReviews;
