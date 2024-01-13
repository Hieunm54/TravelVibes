import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Review from "../components/Review";
import { CONST } from "../constaints";
import CommonModal from "../components/Modal";
import Attraction from "../pages/Attraction";
import { sGetUserReviewList } from "../store/selectors";
import { getUserReviewListAsync } from "../store/actions/reviews";

const UserReviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(0);

  const reviews = useSelector(sGetUserReviewList);

  const dispatch = useDispatch();

  const handleChooseReview = (id) => {
    setSelectedReviewId(id);
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(getUserReviewListAsync());
  }, []);

  return (
    <>
      {_.isEmpty(reviews) ? (
        <div className="text-center">No reviews yet</div>
      ) : (
        <div className="w-full">
          <CommonModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            className="p-5 h-[90%] w-[90%] overflow-auto z-50"
          >
            <Attraction
              id={selectedReviewId}
              onClose={() => setOpenModal(false)}
            />
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
      )}
    </>
  );
};

export default UserReviews;
