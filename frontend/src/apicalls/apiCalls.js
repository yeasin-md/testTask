import { publicRequest } from "../requestCalls";

export const getSectors = async (res) => {
  try {
    const res = publicRequest.get("/get-sectors");
  } catch (error) {
    console.log(error);
  }
};
