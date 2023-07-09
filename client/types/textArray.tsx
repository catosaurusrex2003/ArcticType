
// to be user as an item of an array
export type letterType = {
    id:string,
    letter:string,
    state: "correct" | "wrong" | "pending",
    hidden:boolean,
    linebreak:boolean
}