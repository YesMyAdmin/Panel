import { client } from "./axiosGeneral";

export interface NewUser {
  name: string;
  password: string;
  inviteToken: string;
  otp: {
    provider: string;
  };
}

/**
 * 激活用户，设置用户的密码等信息
 * @param user 用户信息
 */
export async function activateUser(user: NewUser) {
  try {
    const response = await client.post<Response>("/users", user);
    return response.data;
  } catch (error) {
    console.error("Request error encountered:", error);
    throw error;
  }
}
