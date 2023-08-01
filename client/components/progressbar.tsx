import React from "react";

function Progressbar({ score }: { score: number }) {
  

  const calculateCurrentLevel = (score: number) => {
    // the levels will be 0 50 100 200 400 800 1600 score each
    //                    1  2   3   4   5   6    7
    // this is a geometric progression
    var level = 0;
    var levelUpperThreshold = 50;
    var levelLowerThreshold = 0;

    // gp parameters
    const firstTerm = 50;
    const commonRatio = 2;

    while (levelUpperThreshold <= score) {
      level++;

      levelUpperThreshold = firstTerm * Math.pow(commonRatio, level - 1);
      if (level > 1) {
        // level can never be 0
        levelLowerThreshold = firstTerm * Math.pow(commonRatio, level - 2);
      }
      // if (score == levelUpperThreshold) {
      //   console.log("here")
      //   level++;
      //   levelUpperThreshold = firstTerm * Math.pow(commonRatio, level - 1);
      //   levelLowerThreshold = firstTerm * Math.pow(commonRatio, level - 2);
      // }
    }

    const percentageCompleted = Math.round(
      ((score - levelLowerThreshold) /
        (levelUpperThreshold - levelLowerThreshold)) *
        100
    );
    return {
      level,
      levelLowerThreshold,
      levelUpperThreshold,
      percentageCompleted:percentageCompleted || 0,
    };
  };

  const {
    level,
    levelLowerThreshold,
    levelUpperThreshold,
    percentageCompleted,
  } = calculateCurrentLevel(score);
  return (
    <div className="flex justify-center w-full  text-xs md:text-sm">
      <div className=" w-5/6 md:w-2/3 flex items-center">
        <span className="me-2">lvl:{level}</span>
        <div className="bg-donkey-zaffre  w-full flex rounded-xl relative">
          <div
            className="bg-donkey-rose rounded-xl text-center flex justify-center items-center text-black text-xs font-semibold"
            style={{
              width: `${percentageCompleted}%`,
              height: "16px",
            }}
          ></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {`${percentageCompleted}%`}
          </span>
        </div>
        <span className="ms-2">
          {score - levelLowerThreshold}/
          {levelUpperThreshold - levelLowerThreshold}
        </span>
      </div>
    </div>
  );
}

export default Progressbar;
