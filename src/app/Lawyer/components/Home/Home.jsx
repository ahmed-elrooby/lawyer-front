import React from "react";
import Cards from "../utils/Home/Cards";
import Calender from "../utils/Home/Calender";
import ComingSeesion from "../utils/Home/ComingSeesionChart";
import Cases from "../utils/Home/Cases";
import Notification from "../utils/Home/Notification.jsx";
import TimeLine from "../utils/Home/TimeLine.jsx";
import Notes from "../utils/Home/Notes.jsx";

const Home = () => {
  return (
    <>
      <Cards />
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        <ComingSeesion />
        <Cases />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        <Notification />
        <TimeLine />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        <Calender />
        <Notes />
      </div>
    </>
  );
};

export default Home;
