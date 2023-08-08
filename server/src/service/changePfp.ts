import { Error, MongooseError } from "mongoose"
import User from "../models/user.model"

interface changePfpPayload {
    userEmail: string,
    picUrl: string
}

const changePfp = async (payload: changePfpPayload) => {
    const updatedUser = await User.findOneAndUpdate(
        { email: payload.userEmail },
        {
            $set: {
                picUrl: payload.picUrl
            }
        },
        { new: true }
    ).exec()
    if(updatedUser) return true
    else return false

}

export default changePfp