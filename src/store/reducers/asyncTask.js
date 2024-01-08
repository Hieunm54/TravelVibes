import { AsyncTaskType } from "../actions/asyncTask";

export const initialAsyncTaskState = {
  status: {},
};

const asyncTaskReducer = (state = initialAsyncTaskState, action) => {
  switch (action.type) {
    case AsyncTaskType.ASYNC_TASK_START: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: true,
          },
        },
      };
    }
    case AsyncTaskType.ASYNC_TASK_STOP: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.key]: {
            processing: false,
            error: action.payload.error,
          },
        },
      };
    }
    case AsyncTaskType.ASYNC_TASK_RESET: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: {
            processing: false,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default asyncTaskReducer;
