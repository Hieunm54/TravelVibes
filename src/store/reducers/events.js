import { actionTypes } from "../actions/events";

export const eventDefaultState = {
  approvedEvents: [],
  myEventList: [],
  userEventList: [],
};

const events = (state = eventDefaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_APPROVED_EVENTS:
      return {
        ...state,
        approvedEvents: action.payload,
      };
    case actionTypes.GET_ALL_MY_EVENTS:
      return {
        ...state,
        myEventList: action.payload,
      };
    case actionTypes.CREATE_NEW_EVENT: {
      return {
        ...state,
        myEventList: [action.payload, ...state.myEventList],
      };
    }
    default:
      return state;
  }
};

export default events;
