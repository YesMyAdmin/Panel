import {client, type ResponseBody} from "./axiosGeneral";

export interface NewUserRequest {
    name: string;
    password: string;
    inviteToken: string;
    otp: {
        //otp密钥类型(totp)
        provider: string;
    };
}

export interface OtpSecretResponse {
    otp: {
        //base64格式的二维码图片
        qrcode: string;
        //otp密钥类型(totp)
        provider: string;
    }

}

/**
 * 激活用户，设置用户的密码等信息
 * @param user 用户信息
 */
export async function activateUser(user: NewUserRequest):
    Promise<ResponseBody<OtpSecretResponse>> {
    try {
        const response = await client.post<Response>("/users", user);
        return await response.data.json() as Promise<ResponseBody<OtpSecretResponse>>;
    } catch (error) {
        console.error("Request error encountered:", error);
        throw error;
    }
}
