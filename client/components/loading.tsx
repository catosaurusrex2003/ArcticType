import React from "react";



function Loadinganimation() {
  return (
    <>
      <style jsx>{`
        .spinner {
          width: 4em;
          height: 4em;
          border: 0.5em solid rgba(0, 0, 0, 0.1);
          border-left-color: #7983ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="spinner"></div>
    </>
  );
}

export default Loadinganimation;
