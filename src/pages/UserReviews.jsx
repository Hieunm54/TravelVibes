import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserReviews } from "../services/users";
import { useSelector } from "react-redux";
import Review from "../components/Review";
import { CONST } from "../constaints";
import CommonModal from "../components/Modal";
import Attraction from "../pages/Attraction";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(0);
  const auth = useSelector((state) => state.auth);

  const handleChooseReview = (id) => {
    setSelectedReviewId(id);
    setOpenModal(true);
  };

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
      <CommonModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="p-5 h-[90%] w-[90%] overflow-auto z-50"
      >
        <Attraction id={selectedReviewId} onClose={() => setOpenModal(false)} />
      </CommonModal>
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
          onClick={() => handleChooseReview(review.attraction._id)}
        />
      ))}
    </div>
  );
};

export default UserReviews;
