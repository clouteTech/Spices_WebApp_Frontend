import instance from "./adminApi";

export const postUserLogin = async (data) => {
  try {
    const res = await instance.post("auth/root-users/login", data);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err.res);
  }
};
