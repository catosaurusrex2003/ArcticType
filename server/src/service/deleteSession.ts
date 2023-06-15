import Session from "../models/session.model";

export async function deleteSession(email: string) {
  const k = await Session.findOne({ email });
  if (k) {
    return await k.deleteOne({ email });
  }
}
