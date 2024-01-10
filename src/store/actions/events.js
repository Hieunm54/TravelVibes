import { toast } from "react-toastify";
import * as EventService from "../../services/events";
import { asyncTaskStartAction, asyncTaskStopAction } from "./asyncTask";

export const actionTypes = {
  GET_ALL_MY_EVENTS: "GET_ALL_MY_EVENTS",
  GET_APPROVED_EVENTS: "GET_APPROVED_EVENTS",
  CREATE_NEW_EVENT: "CREATE_NEW_EVENT",
  GET_EVENT_DETAIL: "GET_EVENT_DETAIL",
  UPDATE_EVENT: "UPDATE_EVENT",
};

export const getApprovedEvents = (payload) => {
  return {
    type: actionTypes.GET_APPROVED_EVENTS,
    payload,
  };
};

export const getApprovedEventsAsync = () => {
  const taskID = actionTypes.GET_APPROVED_EVENTS;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskID));
      const token = getState().auth.token;
      const response = await EventService.getApprovedEvents(token);
      if (response.status === 200) {
        dispatch(getApprovedEvents(response.data));
      }
      dispatch(asyncTaskStopAction(taskID));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskID, error));
    }
  };
};

export const addToUserEventList = (payload) => {
  return {
    type: actionTypes.CREATE_NEW_EVENT,
    payload,
  };
};

export const createNewEventAsync = (formData) => {
  const taskID = actionTypes.CREATE_NEW_EVENT;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskID));
      const token = getState().auth.token;
      const response = await EventService.createNewEvent(formData, token);
      if (response.status === 201) {
        dispatch(addToUserEventList(response.data));
      }

      dispatch(asyncTaskStopAction(taskID));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskID, error));
    }
  };
};

export const getAllMyEvents = (payload) => {
  return {
    type: actionTypes.GET_ALL_MY_EVENTS,
    payload,
  };
};

export const getAllMyEventsAsync = () => {
  const taskID = actionTypes.GET_ALL_MY_EVENTS;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskID));
      const token = getState().auth.token;
      const response = await EventService.getAllMyEvents(token);
      if (response.status === 200) {
        dispatch(getAllMyEvents(response.data));
      }

      dispatch(asyncTaskStopAction(taskID));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskID, error));
    }
  };
};

export const getEventDetail = (payload) => {
  return {
    type: actionTypes.GET_EVENT_DETAIL,
    payload,
  };
};

export const getEventDetailAsync = (id) => {
  const taskID = actionTypes.GET_EVENT_DETAIL;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskID));
      const token = getState().auth.token;
      const response = await EventService.getEventDetail(id, token);
      if (response.status === 200) {
        dispatch(getEventDetail(response.data));
      }

      dispatch(asyncTaskStopAction(taskID));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskID, error));
    }
  };
};

export const updateEventAsync = (id, formData) => {
  const taskID = actionTypes.UPDATE_EVENT;
  return async (dispatch, getState) => {
    try {
      dispatch(asyncTaskStartAction(taskID));
      const token = getState().auth.token;
      const response = await EventService.updateEvent(id, formData, token);
      console.log("heiu update ", response);
      if (response.status === 200) {
        dispatch(getEventDetail(response.data));
        toast.success("Event updated");
      } else {
        toast.error("Cannot update event");
      }

      dispatch(asyncTaskStopAction(taskID));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskID, error));
    }
  };
};
