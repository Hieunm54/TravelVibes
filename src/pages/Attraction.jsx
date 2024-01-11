import { useEffect, useState, useRef } from "react";
import StarRatings from "react-star-ratings";
import AttractionInfo from "../components/AttractionInfo";
import Review from "../components/Review";
import FormInput from "../components/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CONST } from "../constaints";
import { toast } from "react-toastify";
import { createReview, getReviews } from "../services/reviews";
import { getAttraction } from "../services/attractions";
import AttractionReview from "../components/AttractionReview";
import PostMap from "../components/PostMap";

const Attraction = ({ id, onClose }) => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const reviewPhotoInputRef = useRef();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleRating = (rate) => setReviewRating(rate);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", reviewInput);
    formData.append("rating", reviewRating);
    if (reviewPhotos.length > 0) {
      for (let i = 0; i < reviewPhotos.length; i++) {
        formData.append("images", reviewPhotos[i]);
      }
    }

    try {
      await createReview(auth.token, id, formData);
      getReviewList();
      setReviewInput("");
      setReviewRating(0);
      setReviewPhotos([]);
      setIsWritingReview(false);
    } catch (e) {
      toast.error("Unable to create review");
    }
  };

  const handlePhotosSelected = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      setReviewPhotos(Array.from(evt.target.files));
    }
  };

  const handleChangeReviewPhotos = () => reviewPhotoInputRef.current.click();

  const getAttractionDetails = async () => {
    try {
      const response = await getAttraction(auth.token, id);
      setDetails(response.data);
    } catch (e) {
      toast.error("Unable to retrieve attraction!");
    }
  };

  const getReviewList = async () => {
    try {
      const response = await getReviews(auth.token, id);
      setReviews(response.data);
    } catch (e) {
      toast.error("Unable to retrieve reviews!");
    }
  };

  const handleCancelReview = () => setIsWritingReview(false);
  const handleWriteReview = () => setIsWritingReview(true);

  const handleDeleteReviewPhoto = (index) => {
    setReviewPhotos([
      ...reviewPhotos.slice(0, index),
      ...reviewPhotos.slice(index + 1),
    ]);
  };

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    getAttractionDetails();
    getReviewList();
  }, []);

  return (
    <>
      {details && (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <section className="col-span-6 h-screen flex flex-col">
            <div className="py-3 border-b border-gray-200 px-5">
              <button onClick={onClose}>
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-xmark"
                  className="text-2xl"
                />
              </button>
            </div>
            <div className="overflow-y-scroll">
              {details && (
                <AttractionInfo
                  name={details.name}
                  images={details.images}
                  description={details.description}
                  address={details.address}
                />
              )}
              <div className="px-5 mt-14">
                <h3 className="font-bold text-3xl">Reviews</h3>
                {details && (
                  <p className="flex items-center space-x-2 mt-2">
                    <FontAwesomeIcon
                      icon="fa-solid fa-star"
                      className="text-yellow-400"
                    />
                    <span>
                      {details.rating
                        ? parseFloat(details.rating).toFixed(1)
                        : 0}{" "}
                      of 5
                    </span>
                  </p>
                )}
                {!isWritingReview ? (
                  <div className="mt-2 mb-7">
                    <button
                      className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-md p-2"
                      onClick={handleWriteReview}
                    >
                      Write a Review
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-3 mb-5 border-y border-gray-200 mt-5 py-3"
                    encType="multipart/form-data"
                  >
                    <h4 className="font-bold text-base">Write a review</h4>
                    <div className="h-1/2">
                      <StarRatings
                        rating={reviewRating}
                        starRatedColor="#facc15"
                        starHoverColor="#eab308"
                        changeRating={handleRating}
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <FormInput
                      multiline={true}
                      name="Description"
                      placeholder="Write your thoughts"
                      value={reviewInput}
                      onChange={(event) => setReviewInput(event.target.value)}
                    />
                    <div>
                      <label>Photos</label>
                      <div className="flex items-center flex-wrap">
                        {reviewPhotos.map((photo, index) => (
                          <div className="w-1/3 relative">
                            <span className="absolute top-0 right-1">
                              <FontAwesomeIcon
                                icon="fa-solid fa-circle-xmark"
                                className="text-white hover:text-gray-400 hover:cursor-pointer"
                                onClick={() => handleDeleteReviewPhoto(index)}
                              />
                            </span>
                            <img src={URL.createObjectURL(photo)} />
                          </div>
                        ))}
                        <input
                          ref={reviewPhotoInputRef}
                          type="file"
                          name="Photos"
                          multiple
                          accept=".png, .jpg, .jpeg"
                          className="hidden"
                          onChange={handlePhotosSelected}
                        />
                        <button
                          onClick={handleChangeReviewPhotos}
                          className="block hover:text-blue-500"
                          type="button"
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-square-plus"
                            className="w-14 h-14"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-grow space-x-1">
                      <button className="grow rounded-md bg-blue-500 hover:bg-blue-700 p-2 text-white">
                        Submit
                      </button>
                      <button
                        className="grow rounded-md bg-gray-200 hover:bg-gray-300 p-2"
                        onClick={handleCancelReview}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                <div className="mt-2">
                  {reviews.reverse().map((review) => (
                    <AttractionReview
                      key={review._id}
                      avatar={`${CONST.IMAGE_URL}/${review.user.avatar}`}
                      authorName={`${review.user.firstName} ${review.user.lastName}`}
                      rating={review.rating}
                      content={review.content}
                      images={review.images}
                      createdAt={review.createdAt}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="col-span-6 h-screen">
            <PostMap attractions={[details]} />
          </section>
        </div>
      )}
    </>
  );
};

export default Attraction;
