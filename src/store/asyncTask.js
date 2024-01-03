export const AsyncTaskType = {
  ASYNC_TASK_START: "ASYNC_TASK_START",
  ASYNC_TASK_STOP: "ASYNC_TASK_STOP",
  ASYNC_TASK_RESET: "ASYNC_TASK_RESET",
};

export const initialAsyncTaskState = {
  status: {},
};

// ACTION
export const asyncTaskStartAction = (key) => ({
  type: AsyncTaskType.ASYNC_TASK_START,
  payload: key,
});

export const asyncTaskStopAction = (key, error = null) => ({
  type: AsyncTaskType.ASYNC_TASK_STOP,
  payload: { key, error },
});

export const asyncTaskResetAction = (key) => ({
  type: AsyncTaskType.ASYNC_TASK_RESET,
  payload: key,
});

// SELECTOR
export const sTaskStatus = (key) => (store) =>
  store.asyncTaskReducer.status[key];

// REDUCER
export const asyncTaskReducer = (state = initialAsyncTaskState, action) => {
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
