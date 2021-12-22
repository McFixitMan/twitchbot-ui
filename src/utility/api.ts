import axios, { AxiosResponse } from 'axios';

import { HttpMethod } from '../types/httpMethod';

export type ApiError = {
    message: string;
}

export function callApi<T>(path: string, method?: HttpMethod, body?: unknown): Promise<AxiosResponse<T>> {
    // eslint-disable-next-line
    let headers: any = {
        'Content-Type': 'application/json',
    };  

    const cleanPath = path.startsWith('/') ? path.substring(1) : `${path}`;

    return axios.request<T, AxiosResponse<T, ApiError>>({
        data: body,
        headers: headers,
        method: method || HttpMethod.GET,
        url: `http://localhost:1337/api/${cleanPath}`,
    });
}