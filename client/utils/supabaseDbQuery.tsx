import supabaseClient from "@/services/supabaseClient";

export const getRoomInfoDbUpdate = async (roomId: string) => {
  const { data, error } = await supabaseClient
    .from("channels")
    .select()
    .eq("roomId", roomId);

  if (error) {
    console.log(error);
    throw new Error("something went wrong while setting test");
  }
  //
  else if (data[0]) {
    return {
      punctuation: data[0].punctuations,
      number: data[0].numbers,
    };
  }
};

export const getRoomStatus = async (roomId: string) => {
  const { data, error } = await supabaseClient
    .from("channels")
    .select()
    .eq("roomId", roomId);

  if (error) {
    console.log(error);
    throw new Error("something went wrong while setting test");
  }
  //
  else if (data[0]) {
    return {
      punctuation: data[0].punctuations,
      number: data[0].numbers,
    };
  }
};
