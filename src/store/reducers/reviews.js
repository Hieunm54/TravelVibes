import { actionTypes } from "../actions/reviews";

export const reviewsDefaultState = {
  userReviewList: [],
};

const reviews = (state = reviewsDefaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REVIEW_LIST:
      return {
        ...state,
        userReviewList: action.payload,
      };
    default:
      return state;
  }
};

export default reviews;
