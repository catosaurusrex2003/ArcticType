import React from "react";

function Progressbar() {

  const progressData = {
    level:33,
    completed:323,
    total:500
  };

  const styles = {};
  return (
    <div className="flex justify-center w-full  text-xs md:text-sm">
      <div className=" w-5/6 md:w-2/3 flex items-center">
        <span className="me-2">{progressData.level}</span>
        <div className="bg-donkey-zaffre  w-full flex rounded-xl">
          <div
            className="bg-donkey-rose rounded-xl text-center flex justify-center items-center text-black text-xs font-semibold"
            style={{ width: `${progressData.completed/progressData.total*100}%` }}
          >
            {Math.round((progressData.completed/progressData.total)*100)}%
          </div>
        </div>
        <span className="ms-2">{progressData.completed}/{progressData.total}</span>
      </div>
    </div>
  );
}

export default Progressbar;
