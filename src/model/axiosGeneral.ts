import axios, { AxiosError } from 'axios';

export const client = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * 通用的返回体
 */
export interface Response<T> {
    code: number;
    msg: string;
    data?: T;
    error?: string;
}