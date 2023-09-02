import supabaseClient from "@/services/supabaseClient";

// get users array from the database
export const getRoomUsersArray = async (
  roomId: string
): Promise<string[] | false> => {
  const { data, error } = await supabaseClient
    .from("channels")
    .select()
    .eq("roomId", roomId);
  if (error) {
    console.log(error);
    return false;
  } else if (data.length > 0) {
    return data[0].usersInRoom;
  } else {
    return false;
  }
};
