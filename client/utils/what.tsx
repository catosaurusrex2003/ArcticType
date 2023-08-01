type Params = {
  punctuation: boolean;
  number: boolean;
};

export const whatMode = (timeMode: Params): "basic" | "punc" | "num" | "both" => {
  if (!timeMode.number && !timeMode.punctuation) {
    return "basic";
  } else if (timeMode.number && !timeMode.punctuation) {
    return "num";
  } else if (!timeMode.number && timeMode.punctuation) {
    return "punc";
  } else if (timeMode.number && timeMode.punctuation) {
    return "both";
  }
  return "basic";
};

export const whatLength = (timeOffset: number) => {
  if (timeOffset == 15) {
    return 10;
  } else if (timeOffset == 30) {
    return 20;
  } else if (timeOffset == 60) {
    return 30;
  } else {
    return 50;
  }
};

