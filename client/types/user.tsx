export type userType = {
  username: string;
  email: string;
  picUrl:string,
  joiningDate: Date;
  numberOfTests: number;
  totalTime: number;
  records: {
    "15": {
      wpm: number;
      acc: number;
    };
    "30": {
      wpm: number;
      acc: number;
    };
    "60": {
      wpm: number;
      acc: number;
    };
    "120": {
      wpm: number;
      acc: number;
    };
  };
  avg_wpm: number[];
};
