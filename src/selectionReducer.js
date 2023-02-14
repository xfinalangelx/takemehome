const initialState = {
  selectionHistory: [],
};

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SELECTION":
      return {
        ...state,
        selectionHistory: [...state.selectionHistory, action.payload],
      };
    case "LOAD_SELECTIONS":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default selectionReducer;
