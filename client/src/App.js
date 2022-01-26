import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import Error from "./pages/Error";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
// import PostBoard from "./pages/PostBoard";
// import ChatBoard from "./pages/ChatBoard";
// import TodolistBoard from "./pages/TodolistBoard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mypage" element={<MyPage />} />
        {/* <Route exact path="/post/:boardId/*" element={<PostBoard />} /> */}
        {/* <Route exact path="/chat/:boardId" element={<ChatBoard />} /> */}
        {/* <Route exact path="/todolist/:boardId" element={<TodolistBoard />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer className="absolute z-40" />
    </BrowserRouter>
  );
}

export default App;
