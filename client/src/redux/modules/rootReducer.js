import { combineReducers } from "redux";
import privateBoardCreateModal from "./privateBoardCreateModal";
// import privateBoardEditModal from "./privateBoardEditModal";
import publicBoards from "./publicBoards";
import privateBoards from "./privateBoards";

const rootReducer = combineReducers({
  privateBoardCreateModal,
  // privateBoardEditModal,
  publicBoards,
  privateBoards,
});

export default rootReducer;
