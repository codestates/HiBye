import { combineReducers } from "redux";
import privateBoardCreateModal from "./privateBoardCreateModal";
import privateBoardEditModal from "./privateBoardEditModal";
import publicBoards from "./publicBoards";
import privateBoards from "./privateBoards";
import user from "./user";
// import posts from "./posts";

const rootReducer = combineReducers({
  privateBoardCreateModal,
  privateBoardEditModal,
  publicBoards,
  privateBoards,
  user,
  // posts,
});

export default rootReducer;
