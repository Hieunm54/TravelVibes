const actionTypes = {
  addAttraction: "ADD_ATTRACTION",
  removeAttraction: "REMOVE_ATTRACTION",
  moveDownAttraction: "MOVE_DOWN_ATTRACTION",
  moveUpAttraction: "MOVE_UP_ATTRACTION",
  cleanUpAttractions: "CLEAN_UP_ATTRACTION",
};

const attractions = (state = [], action) => {
  switch (action.type) {
    case actionTypes.addAttraction: {
      return state.findIndex((attraction) => attraction._id === action._id) ===
        -1
        ? [
            ...state,
            {
              _id: action._id,
              name: action.name,
              address: action.address,
              coordinates: action.coordinates,
            },
          ]
        : state;
    }
    case actionTypes.moveDownAttraction:
      return [
        ...state.slice(0, action.index), // 1, 2, 3, 4
        state[action.index + 1],
        state[action.index],
        ...state.slice(action.index + 2),
      ];
    case actionTypes.moveUpAttraction: {
      return [
        ...state.slice(0, action.index - 1), // 1, 2, 3, 4
        state[action.index],
        state[action.index - 1],
        ...state.slice(action.index + 2),
      ];
    }
    case actionTypes.removeAttraction:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case actionTypes.cleanUpAttractions:
      return [];
    default:
      return state;
  }
};

export const addAttraction = (details) => ({
  type: actionTypes.addAttraction,
  _id: details._id,
  name: details.name,
  address: details.address,
  coordinates: details.coordinates,
});

export const moveDownAttraction = (index) => ({
  type: actionTypes.moveDownAttraction,
  index,
});

export const moveUpAttraction = (index) => ({
  type: actionTypes.moveUpAttraction,
  index,
});

export const removeAttraction = (index) => ({
  type: actionTypes.removeAttraction,
  index,
});

export const cleanUpAttractions = (index) => ({
  type: actionTypes.cleanUpAttractions,
});

export default attractions;
