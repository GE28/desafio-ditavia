import axios from 'axios';
import useSWR from 'swr';

export const API_URL = `http://localhost:${import.meta.env.SERVER_PORT}/api/smartphone`;

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const fetchMethod = (url, method) => axios({
    method,
    url
}).then((res) => res.data);

export const fetchWithBody = (url, body, method) => axios({
    method,
    url,
    data: body
}).then((res) => res.data);

export const options = { revalidateOnFocus: true };

export function useAllSmartphonesGetter() {
    const { data, error, isLoading } = useSWR(`${API_URL}`, (url) => fetcher(url), options);
    return { smartphones: data, error, isLoading };
}
