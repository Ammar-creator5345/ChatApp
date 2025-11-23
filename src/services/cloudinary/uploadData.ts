import axios from "axios";

export const uploadFile = async (data: FormData) => {
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dpdyvksvp/auto/upload`,
      data
    );
    return res;
  } catch (err) {
    throw err;
  }
};
