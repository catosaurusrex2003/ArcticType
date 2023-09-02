import { useMutation } from "@tanstack/react-query";
import { getRoomUsersArray } from "./getRoomUsers";
import supabaseClient from "@/services/supabaseClient";

export const removeUserDbMutation = async ({
  usernameToRemove,
  roomId,
}: {
  usernameToRemove: string;
  roomId: string;
}) => {
  const usersArray = await getRoomUsersArray(roomId);
  if (usersArray) {
    const filteredUsersArray = usersArray.filter(
      (username) => username != usernameToRemove
    );
    const { error } = await supabaseClient
      .from("channels")
      .update({
        usersInRoom: filteredUsersArray,
        last_modified: new Date().toISOString(),
      })
      .eq("roomId", roomId);

    if (error) {
      console.log(error);
      throw new Error("something went wrong");
    }
  }
};

export const testRunningDBUpdate = async ({
  testState,
  roomId,
}: {
  testState: boolean;
  roomId: string;
}) => {
  const { error } = await supabaseClient
    .from("channels")
    .update({
      testRunning: testState,
    })
    .eq("roomId", roomId);

  if (error) {
    console.log(error);
    throw new Error("something went wrong while setting test");
  } else {
    console.log("tes running set to true");
  }
};


