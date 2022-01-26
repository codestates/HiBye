import { useSelector } from "react-redux";

export default function useBoardCheck(boardId) {
  const publicBoards = useSelector((state) => state.publicBoards);
  const privateBoards = useSelector((state) => state.privateBoards);
  const publicBoardsData = publicBoards.data.data || [];
  const privateBoardsData = privateBoards.data.data || [];
  const publicBoard = publicBoardsData.filter((board) => String(board.id) === boardId);
  const privateBoard = privateBoardsData.filter((board) => String(board.id) === boardId);
  const board = publicBoard.length !== 0 ? publicBoard[0] : privateBoard[0];
  const isLoading = publicBoards.loading && privateBoards.loading;

  return { board, isLoading };
}
