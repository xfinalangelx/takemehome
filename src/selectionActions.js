export const ADD_SELECTION = "ADD_SELECTION";
export const LOAD_SELECTIONS = "LOAD_SELECTIONS";

export function addSelection(selection) {
  return {
    type: "ADD_SELECTION",
    payload: selection,
  };
}

export const loadSelections = (selections) => ({
  type: "LOAD_SELECTIONS",
});
