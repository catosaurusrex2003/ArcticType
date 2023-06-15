import Gen from "sentence-generator";

const gen = Gen("@utils/textData.txt");

export const GenerateText = () => {
  const a = gen.take(3);
  console.log(a);
};
