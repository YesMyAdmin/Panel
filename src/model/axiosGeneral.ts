import axios, { AxiosError } from 'axios';

export const client = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * 通用的返回体
 */
export interface ResponseBody<T> {
    // http状态码
    code: number;
    // 后端返回的消息
    msg: string;
    // 数据
    data?: T;
    // 错误码(如果发生错误的话)
    error?: string;
}