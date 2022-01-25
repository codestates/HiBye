import "../index.css";
import "./MyPageMatched.css";

function MyPageMatched() {
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
          <p className="loverusername">Cranberry Black Tea</p>
          <p className="wesaidhi">We said Hi on</p>
          <input className="choosedate" id="demo-range-2" type="date" max="2030-01-01" min="1930-01-01" />
          {/* choosedate 부분 */}
          <p className="wesaidbye">We said Bye on</p>
          <button className="byebtn" value="byebtnmsg">
            {" "}
            {/* 버튼 안에 텍스트 css 바꾸기 어캄? */}
            Bye to your memories
          </button>
          {/* button에 onClick */}
        </div>

        <div>
          <p className="changepw">Change password</p> {/* onClick에 ChangePasswordModal */}
          <p className="deleteacc">Delete account</p> {/* onClick에 ConfirmModal*/}
        </div>
      </div>
    </div>
  );
}

export default MyPageMatched;
