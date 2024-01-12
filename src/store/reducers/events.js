import { actionTypes } from "../actions/events";

export const eventDefaultState = {
  approvedEvents: [],
  myEventList: [],
  eventDetails: {},
  allEvents: [],
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
    case actionTypes.GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      };
    case actionTypes.UPDATE_EVENT_STATUS: {
      const { id, data } = action.payload;

      // update all events
      const cloneAllEvents = [...state.allEvents];
      const eventIndex = cloneAllEvents.findIndex((event) => event._id === id);
      cloneAllEvents[eventIndex] = data;

      // update my event list
      const cloneMyEventList = [...state.myEventList];
      const eIndex = cloneMyEventList.findIndex((event) => event._id === id);
      cloneMyEventList[eIndex] = data;

      return {
        ...state,
        allEvents: cloneAllEvents,
        myEventList: cloneMyEventList,
      };
    }
    default:
      return state;
  }
};

export default events;
