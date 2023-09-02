import axios from "axios";

const getText = async (payload: {
    cat: "english" | "webdev";
    type: "basic" | "punc" | "num" | "both";
    length: Number;
  }) => {
    try {
      const result = await axios.post(`/api/getText`, payload);
      if (result.status == 200) {
        return result.data.text
      }
    } catch (err) {
      console.log(err);
      return ""
    }
  };

export default getText