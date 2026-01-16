import { useState } from "react";
import "./App.css";

function App() {
  const [hideContent, setHideContent] = useState(false);
  const [highlightReviews, setHighlightReviews] = useState(false);

  const timeSlots = [
    { slot: "1", time: "6:00 - 6:55" },
    { slot: "2", time: "7:00 - 7:55" },
    { slot: "3", time: "8:00 - 8:55" },
    { slot: "4", time: "9:00 - 9:55" },
    { slot: "5", time: "10:00 - 11:25" },
    { slot: "6", time: "11:30 - 12:25" },
    { slot: "7", time: "1:00 - 1:55" },
    { slot: "8", time: "2:00 - 2:55" },
    { slot: "9", time: "3:00 - 3:55" },
    { slot: "10", time: "4:00 - 4:55" },
    { slot: "11", time: "5:00 - 5:55" },
    { slot: "12", time: "6:00 - 6:55" },
    { slot: "13", time: "7:00 - 7:55" },
    { slot: "14", time: "8:00 - 8:55" },
    { slot: "15", time: "9:00 - 9:55" },
  ];

  const timetableData = {
    Mo: [
      { course: "CSM 399 Review" },
      { colspan: 2, course: "CSM 387 Review" },
      { empty: 1 },
      {
        colspan: 2,
        course: "CSM 399",
        room: "Casely Hayford Room 202 ",
        instructor: "L.A. BANNING",
      },
      { empty: 2 },
      {
        colspan: 2,
        course: "CSM 387",
        room: "Casely Hayford Room 202 ",
        instructor: "K. Owusu-Agyemang",
      },
      { empty: 2 },
      { course: "CSM 387 Review" },
      { colspan: 2, course: "Personal Project" },
    ],
    Tu: [
      { colspan: 2, course: "CSM 357 Review" },
      { course: "CSM 353 Review" },
      { empty: 1 },
      {
        colspan: 2,
        course: "CSM 357",
        room: "SCB-SF19",
        instructor: "R. O. M. Gyening",
      },
      { empty: 2 },
      { course: "CSM 387", room: "BB-BLT", instructor: "D. ASAMOAH" },
      { course: "CSM 353", instructor: "B.T. Partey" },
      { empty: 2 },
      { course: "CSM 353 Review" },
      { course: "CSM 387 Review" },
      { course: "CSM 357 Review" },
    ],
    We: [
      { colspan: 3, course: "Personal Project" },
      { empty: 1 },
      { colspan: 2, course: "CSM 399 Review" },
      { empty: 1 },
      { colspan: 2, course: "CSM 393 Review" },
      { empty: 1 },
      {
        colspan: 2,
        course: "CSM 393",
        room: "SCB-SF19",
        instructor: "B.E. Owusu",
      },
      { empty: 2 },
      { course: "CSM 393 Review" },
    ],
    Th: [
      { colspan: 2, course: "ACF 255 Review" },
      { colspan: 2, course: "CSM 395 Review" },
      { course: "CSM 353 Review" },
      { empty: 1 },
      { colspan: 2, course: "ACF 255", room: "SCB-SF8", instructor: "B. OSEI" },
      {
        colspan: 2,
        course: "CSM 395",
        room: "Casely Hayford Room 202",
        instructor: "O. Kornyő",
      },
      {
        colspan: 2,
        course: "CSM 353",
        room: "SCB-SF7",
        instructor: "B.T. Partey",
      },
      { empty: 1 },
      { course: "CSM 395 Review" },
      { course: "ACF 255 Review" },
    ],
    Fr: [
      { colspan: 3, course: "Personal Project" },
      { empty: 1 },
      { colspan: 2, course: "CSM 387 Review" },
      { empty: 2 },
      { colspan: 2, course: "ACF 255 Review" },
      { colspan: 2, course: "CSM 393 Review" },
      { empty: 3 },
    ],
    Sa: [
      { empty: 4 },
      { colspan: 2, course: "Personal Project" },
      { empty: 2 },
      { colspan: 2, course: "CSM 387 Review" },
      { colspan: 2, course: "ACF 255 Review" },
      { empty: 1 },
      { colspan: 2, course: "CSM 393 Review" },
    ],
    Su: [
      { empty: 12 },
      { course: "CSM 387 Review" },
      { colspan: 2, course: "CSM 399 Review" },
    ],
  };

  const renderCell = (cells) => {
    const result = [];
    let currentSlot = 0;

    cells.forEach((cell, index) => {
      if (cell.empty) {
        for (let i = 0; i < cell.empty; i++) {
          result.push(
            <td
              key={`${currentSlot}-${i}`}
              className={
                hideContent ? "empty-cell highlight-free" : "empty-cell"
              }
            ></td>
          );
          currentSlot++;
        }
      } else if (cell.colspan) {
        const isReviewOrPersonal =
          cell.course &&
          (cell.course.includes("Review") ||
            cell.course.includes("Personal Project"));
        const shouldHide =
          (highlightReviews && !isReviewOrPersonal) || hideContent;
        const className =
          highlightReviews && isReviewOrPersonal
            ? "course-cell highlight-review"
            : "course-cell";
        result.push(
          <td key={currentSlot} colSpan={cell.colspan} className={className}>
            {!shouldHide && (
              <>
                {cell.room && <div className="room-info">{cell.room}</div>}
                {cell.group && <div className="group-info">{cell.group}</div>}
                <div className="course-code">{cell.course}</div>
                <div className="instructor">{cell.instructor}</div>
              </>
            )}
          </td>
        );
        currentSlot += cell.colspan;
      } else {
        const isReviewOrPersonal =
          cell.course &&
          (cell.course.includes("Review") ||
            cell.course.includes("Personal Project"));
        const shouldHide =
          (highlightReviews && !isReviewOrPersonal) || hideContent;
        const className =
          highlightReviews && isReviewOrPersonal
            ? "course-cell highlight-review"
            : "course-cell";
        result.push(
          <td key={currentSlot} className={className}>
            {!shouldHide && (
              <>
                {cell.room && <div className="room-info">{cell.room}</div>}
                <div className="course-code">{cell.course}</div>
                <div className="instructor">{cell.instructor}</div>
              </>
            )}
          </td>
        );
        currentSlot++;
      }
    });

    return result;
  };

  return (
    <div className="timetable-container">
      <div className="header">
        <h1>B.Sc. Computer Science-3</h1>
        <span className="header-subtitle">HC B.Sc. CompSci-3</span>
      </div>

      <table className="timetable">
        <thead>
          <tr>
            <th className="day-header"></th>
            {timeSlots.map((slot) => (
              <th key={slot.slot} className="time-header">
                <div className="slot-number">{slot.slot}</div>
                <div className="slot-time">{slot.time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetableData).map(([day, cells]) => (
            <tr key={day}>
              <td className="day-cell">{day}</td>
              {renderCell(cells)}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="toggle-container">
        <button
          onClick={() => setHideContent(!hideContent)}
          className="toggle-button"
        >
          {hideContent ? "Show All" : "Show Free Periods"}
        </button>
        <button
          onClick={() => setHighlightReviews(!highlightReviews)}
          className="toggle-button"
        >
          {highlightReviews ? "Remove Highlight" : "Highlight Reviews"}
        </button>
      </div>
    </div>
  );
}

export default App;
