import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpMethod } from '../types/httpMethod';

export type ApiError = {
    message: string;
}

axios.interceptors.response.use((originalResponse) => {
    // Interceptor to parse dates back into date objects
    handleDates(originalResponse.data);
    return originalResponse;
});

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

// https://stackoverflow.com/a/66238542
const isoDateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

function isIsoDateString(value: string): boolean {
    return isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: Record<any, any>): unknown {
    if (body === null || body === undefined || typeof body !== 'object') {
        return body;
    }
        
    for (const key of Object.keys(body)) {
        const value = body[key];

        if (!!value && typeof value === 'string') {
            if (isIsoDateString(value)) {
                body[key] = new Date(value);
            }
            
        }

        else if (typeof value === 'object' && value !== null) {
            // Recurse to handle other nested objects with dates
            handleDates(value);
        }
    }
}

export const getApiErrorMessage = (error: AxiosError<ApiError, unknown> | undefined): string => {
    if (!error) {
        return 'An unknown error occurred';
    }

    return error.response?.data.message ?? error.message;
};