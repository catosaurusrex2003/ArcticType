import { toast } from "react-hot-toast";

export const successToast = (text: string) => {
  toast(text, {
    duration: 4000,
    position: "top-center",

    // Styling
    style: {
      backgroundColor: "#9DE770",
      borderRadius: "30px",
      borderWidth:"2px",
      borderColor:"#ffffff",
      fontWeight:600
    },
    className: " ",

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

export const errorToast = (text: string) => {
    toast(text, {
      duration: 4000,
      position: "top-center",
  
      // Styling
      style: {
        backgroundColor: "#DD5F5F",
        borderRadius: "30px",
        borderWidth:"2px",
        borderColor:"#ffffff",
        fontWeight:600,
        fontSize:"15px"
      },
      className: " ",
  
      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };
  
