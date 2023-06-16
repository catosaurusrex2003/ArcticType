import { toast } from "react-hot-toast";

export const successToast = (text: string) => {
  toast(text, {
    duration: 4000,
    position: "top-center",

    // Styling
    style: {
      backgroundColor: "#84cc16",
      borderRadius: "30px",
      borderWidth:"5px",
      borderColor:"#3f6212",
      fontWeight:700
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
        backgroundColor: "#b91c1c",
        borderRadius: "30px",
        borderWidth:"5px",
        borderColor:"#450a0a",
        fontWeight:700
      },
      className: " ",
  
      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };
  
