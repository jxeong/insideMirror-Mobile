import React from "react";
import "./MainScreen.css";
import { useNavigate } from "react-router-dom"; // 추가
import calendarIcon from "../assets/calendar.png";
import personIcon from "../assets/person.png";
import logoutIcon from "../assets/logout.png";
import folderIcon from "../assets/folder.png";

function MainScreen({ userName, onLogout, onGoToSchedules }) {
  const navigate = useNavigate(); // 라우터 훅

  const handleOpenSettings = () => {
    navigate("/settings"); // Settings 페이지로 이동
  };

  const handleOpenSchedules = () => {
      navigate("/schedules", {
        state: { userName: userName }, // state로 전달
      });

    };

  return (
    <div className="main-screen">
      <h1 className="greeting">안녕하세요, {userName}님!</h1>

      <div className="button-group">
        <div className="circle-button" onClick={handleOpenSchedules}>
          <img src={calendarIcon} alt="일정 관리" />
          <p>일정 관리</p>
        </div>
        <div className="circle-button" onClick={handleOpenSettings}>
          <img src={personIcon} alt="메뉴 변경" />
          <p>메뉴 변경</p>
        </div>
        <div className="circle-button" onClick={handleOpenSettings}>
           <img src={folderIcon} alt="아카이빙 관리" />
           <p>아카이빙 관리</p>
        </div>
      </div>

      <button className="logout-button" onClick={onLogout}>
        <img src={logoutIcon} alt="로그아웃" />
      </button>
    </div>
  );
}

export default MainScreen;
