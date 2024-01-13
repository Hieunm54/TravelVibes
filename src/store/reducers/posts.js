import { actionTypes } from "../actions/posts";

export const postsDefaultState = {
  postList: [],
  post: {},
};

const posts = (state = postsDefaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_LIST:
      return {
        ...state,
        postList: action.payload,
      };
    case actionTypes.GET_USER_POST_LIST:
      return {
        ...state,
        userPostList: action.payload,
      };
    case actionTypes.GET_POST_DETAILS:
      return {
        ...state,
        post: action.payload,
      };
    case actionTypes.UPDATE_POST: {
      const { data, id } = action.payload;

      const clonePostList = [...state.postList];
      const needUpdatedPostIndex = clonePostList.findIndex(
        (post) => post._id === id
      );
      clonePostList.splice(needUpdatedPostIndex, 1, data);
      return {
        ...state,
        postList: clonePostList,
      };
    }
    default:
      return state;
  }
};

export default posts;
