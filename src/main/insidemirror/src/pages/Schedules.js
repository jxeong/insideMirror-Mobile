import React, { useEffect, useState } from "react";

function Schedules({ userName }) {
    const [todayStr, setTodayStr] = useState("");
    const [todaySchedules, setTodaySchedules] = useState([]);
    const [tomorrowSchedules, setTomorrowSchedules] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDate, setNewDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

    const formatKoreanDate = (date) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" };
        return date.toLocaleDateString("ko-KR", options).replace(/\./g, " ");
    };

    const fetchSchedules = async (targetDate, setFn) => {
        const dateStr = targetDate.toISOString().split("T")[0];
        const encodedName = encodeURIComponent(userName);

        console.log("📅 서버로 요청 중:", {
            name: userName,
            date: dateStr,
        });

        try {
            const res = await fetch(`${API_BASE}/api/user/schedules?name=${encodedName}&date=${dateStr}`);
            if (!res.ok) throw new Error(`조회 실패 (${res.status})`);
            const data = await res.json();
            console.log("✅ 서버 응답:", data);
            setFn(data);
        } catch (err) {
            console.error("❌ 일정 불러오기 실패:", err);
            setFn([]);
        }
    };

    const refreshSchedules = () => {
        const todayDate = new Date();
        const tomorrowDate = new Date();
        tomorrowDate.setDate(todayDate.getDate() + 1);

        setTodayStr(formatKoreanDate(todayDate));
        fetchSchedules(todayDate, setTodaySchedules);
        fetchSchedules(tomorrowDate, setTomorrowSchedules);
    };

    // 오늘/내일 일정 최초 로딩 + 이름 변경 시 다시 조회
    useEffect(() => {
        if (!userName || userName === "게스트" || userName === "Unknown") {
            setTodayStr("");
            setTodaySchedules([]);
            setTomorrowSchedules([]);
            return;
        }

        refreshSchedules();
    }, [userName]);

    // 일정 자동 새로고침 (1분마다)
    useEffect(() => {
        const interval = setInterval(() => {
            refreshSchedules();
        }, 60000); // 1분

        return () => clearInterval(interval);
    }, []);

    const handleAddSchedule = async () => {
        if (!newTitle.trim()) return;

        const schedule = {
            userId: 1, // TODO: 실제 로그인 유저 ID로 대체
            title: newTitle,
            date: newDate,
        };

        try {
            const res = await fetch(`${API_BASE}/api/schedules`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(schedule),
            });

            if (!res.ok) throw new Error("추가 실패");
            await res.json();
            refreshSchedules();
            setNewTitle("");
        } catch (err) {
            console.error("일정 추가 실패:", err);
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            const res = await fetch(`${API_BASE}/api/schedules/${scheduleId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("삭제 실패");
            refreshSchedules();
        } catch (err) {
            console.error("일정 삭제 실패:", err);
        }
    };

    return (
        <div className="schedule-container">
            <h1>{userName}님의 일정</h1>
            <div className="schedule-header">{todayStr}</div>

            <div className="schedule-add">
                <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="일정 제목 입력"
                />
                <button onClick={handleAddSchedule}>추가</button>
            </div>

            <div className="schedule-list-row">
                <div className="schedule-column">
                    <div className="schedule-section-header">!!오늘 일정!!</div>
                    {todaySchedules.length > 0 ? (
                        todaySchedules.map((item) => (
                            <div className="schedule-item" key={item.scheduleId}>
                                {item.title}
                                <button onClick={() => handleDeleteSchedule(item.scheduleId)}>삭제</button>
                            </div>
                        ))
                    ) : (
                        <div className="schedule-item">오늘 일정이 없습니다.</div>
                    )}
                </div>

                <div className="schedule-column preview-column">
                    <div className="schedule-section-header">!!내일 일정!!</div>
                    {tomorrowSchedules.length > 0 ? (
                        tomorrowSchedules.map((item) => (
                            <div className="schedule-item preview" key={item.scheduleId}>
                                {item.title}
                            </div>
                        ))
                    ) : (
                        <div className="schedule-item preview">내일 일정이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Schedules;
