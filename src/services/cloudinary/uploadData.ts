import axios from "axios";

export const uploadFile = async (data: FormData, fileType: string) => {
  try {
    let resourseType = "auto";
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dpdyvksvp/${resourseType}/upload`,
      data
    );
    return res;
  } catch (err) {
    throw err;
  }
};
