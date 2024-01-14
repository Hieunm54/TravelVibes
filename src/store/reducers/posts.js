import { CONST } from "../../constaints";
import { actionTypes } from "../actions/posts";

export const postsDefaultState = {
  postList: [],
  post: {
    author: {
      avatar: CONST.DEFAULT_AVATAR,
    },
    attractions: [],
    comments: [],
    upvote: [],
    countComments: 0,
  },
};

const posts = (state = postsDefaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_LIST:
      return {
        ...state,
        postList: action.payload,
      };
    case actionTypes.GET_POST_DETAILS:
      return {
        ...state,
        post: { ...action.payload, comments: state.post.comments },
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
        post: { ...data, comments: state.post.comments },
      };
    }
    case actionTypes.GET_COMMENT_LIST: {
      // eslint-disable-next-line no-unused-vars
      const { data, postId } = action.payload;
      return {
        ...state,
        post: { ...state.post, comments: data },
      };
    }
    case actionTypes.DELETE_POST: {
      const newPostList = state.postList.filter(
        (post) => post._id !== action.payload
      );
      return {
        ...state,
        postList: newPostList,
      };
    }
    case actionTypes.SEND_COMMENT: {
      const { postId, data } = action.payload;
      const clonePostList = [...state.postList];
      const index = clonePostList.findIndex((p) => p._id === postId);
      clonePostList[index].countComments =
        state.postList[index].countComments + 1;
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, data],
          countComments: state.post.countComments + 1,
        },
        postList: clonePostList,
      };
    }
    case actionTypes.UPDATE_COMMENT: {
      const { commentId, data } = action.payload;
      const cloneComments = [...state.post.comments];
      const commentIndex = cloneComments.findIndex((c) => c._id === commentId);
      cloneComments[commentIndex] = data;
      return {
        ...state,
        post: { ...state.post, comments: cloneComments },
      };
    }
    case actionTypes.DELETE_COMMENT: {
      const { postId, commentId } = action.payload;

      const cloneComments = [...state.post.comments];
      const deletedCommentIndex = cloneComments.findIndex(
        (c) => c._id === commentId
      );
      cloneComments.splice(deletedCommentIndex, 1);
      // update post list comment number
      const clonePostList = [...state.postList];
      const index = clonePostList.findIndex((p) => p._id === postId);
      clonePostList[index].countComments =
        state.postList[index].countComments - 1;

      return {
        ...state,
        post: {
          ...state.post,
          comments: cloneComments,
          countComments: state.post.countComments - 1,
        },
        postList: clonePostList,
      };
    }
    case actionTypes.TOGGLE_UPVOTE: {
      const { postId, data } = action.payload;
      // update postList
      const clonePostList = [...state.postList];
      const index = clonePostList.findIndex((p) => p._id === postId);
      clonePostList[index] = data.post;

      //update current post if post id is match
      const clonePost = { ...state.post };
      if (clonePost._id === postId) {
        clonePost.upvote = data.upvote;
      }
      return {
        ...state,
        postList: clonePostList,
        post: clonePost,
      };
    }
    default:
      return state;
  }
};

export default posts;
