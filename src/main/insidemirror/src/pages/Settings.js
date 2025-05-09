import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speakingEnabled, setSpeakingEnabled] = useState(true);
  const [listeningEnabled, setListeningEnabled] = useState(true);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>사용자 지정 메뉴</h2>
        <button className="close-button" onClick={() => navigate(-1)}>Close</button>
      </div>
      <hr></hr>

      <div className="setting-item">
        <span>날씨 정보</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>교통 정보</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={speakingEnabled}
            onChange={() => setSpeakingEnabled(!speakingEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>음악 플레이리스트</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={listeningEnabled}
            onChange={() => setListeningEnabled(!listeningEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>뉴스 헤더</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={listeningEnabled}
            onChange={() => setListeningEnabled(!listeningEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>

  );
}

export default Settings;
