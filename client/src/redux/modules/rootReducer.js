import { combineReducers } from "redux";
import privateBoardCreateModal from "./privateBoardCreateModal";
import privateBoardEditModal from "./privateBoardEditModal";

const rootReducer = combineReducers({
  privateBoardCreateModal,
  privateBoardEditModal,
});

export default rootReducer;
