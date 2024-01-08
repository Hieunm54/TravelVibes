export const AsyncTaskType = {
  ASYNC_TASK_START: "ASYNC_TASK_START",
  ASYNC_TASK_STOP: "ASYNC_TASK_STOP",
  ASYNC_TASK_RESET: "ASYNC_TASK_RESET",
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
