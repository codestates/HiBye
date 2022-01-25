import { combineReducers } from "redux";
import privateBoardCreateModal from "./privateBoardCreateModal";
// import privateBoardEditModal from "./privateBoardEditModal";
import publicBoards from "./publicBoards";
import privateBoards from "./privateBoards";
import user from "./user";

const rootReducer = combineReducers({
  privateBoardCreateModal,
  // privateBoardEditModal,
  publicBoards,
  privateBoards,
  user,
});

export default rootReducer;
