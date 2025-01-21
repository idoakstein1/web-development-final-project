import axios from 'axios';
import { ApiError } from '../errors/ApiError';

const OMDB_API_KEY = '1142a592';
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

let axiosInstance: Axios.AxiosInstance;

const getImdbApi = () => {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: OMDB_BASE_URL,
            params: {
                apikey: OMDB_API_KEY,
            },
        });
    }
    return axiosInstance;
};

export const searchItems = async ({ title, type, year }: { title: string; type?: string; year?: string }) => {
    const { data } = await getImdbApi().get<{
        Response: string;
        Search?: {
            Title: string;
            Year: string;
            imdbID: string;
            Type: string;
            Poster: string;
        }[];
    }>('', {
        params: {
            s: title,
            type: type,
            y: year,
        },
    });

    if (data.Response === 'False') {
        throw new ApiError({
            status: 404,
            message: 'No results found',
        });
    } else {
        const items = data.Search?.flatMap((item) => {
            if (item.Type === 'episode') {
                return [];
            }

            return {
                id: item.imdbID,
                name: item.Title,
                year: item.Year,
                type: item.Type,
                poster: item.Poster,
            };
        });

        return {
            items,
        };
    }
};

export const getItemById = async (id: string) => {
    const { data } = await getImdbApi().get<{
        Response: string;
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }>('', {
        params: {
            i: id,
        },
    });

    if (data.Response === 'False') {
        throw new ApiError({
            status: 404,
            message: 'No results found',
        });
    } else {
        return {
            id: data.imdbID,
            name: data.Title,
            year: data.Year,
            type: data.Type,
            poster: data.Poster,
        };
    }
};
