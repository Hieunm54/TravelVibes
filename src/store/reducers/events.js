import { actionTypes } from "../actions/events";

export const eventDefaultState = {
  approvedEvents: [],
  myEventList: [],
  userEventList: [],
  eventDetails: {},
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
    case actionTypes.GET_EVENT_DETAIL:
      return {
        ...state,
        eventDetails: action.payload,
      };
    default:
      return state;
  }
};

export default events;
