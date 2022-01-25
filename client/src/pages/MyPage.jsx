import "../index.css";
import "./MyPage.css";

function MyPage() {
  return (
    <div className="mypageContainer">
      <div className="userinfoContainer">
        <div>
          <h2 className="username">Username</h2> {/* 해당 유저의 username 표시 */}
          <button className="editbtn">edit</button>
        </div>

        <div>
          <p className="email">Email address</p>
          <span className="emailinfo">strawberrycream@kakao.com</span> {/* 해당 유저의 email 표시 */}
          <p className="lover">Lover</p>
          <input className="loverinput" placeholder="Select your lover"></input>
          <button className="arrowbtn">arrow</button>
          <p className="invalid">Invalid username</p> {/* input내용이 db에 존재하지 않는 username일 경우 표시 */}
        </div>

        <div>
          <p className="changepw">Change password</p> {/* onClick에 ChangePasswordModal */}
          <p className="deleteacc">Delete account</p> {/* onClick에 ConfirmModal*/}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
