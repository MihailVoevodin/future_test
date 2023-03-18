import axios, {AxiosResponse} from 'axios';

/** Ключ к API. */
const API_KEY = 'AIzaSyA_gxei09YeV-FhvDnfIoKnbP8-a2sAQb0'

export const BooksService = {
    /** Получение списка книг. */
    getBooksList(value: string, startIndex: number): Promise<AxiosResponse> {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${API_KEY}&maxResults=30&startIndex=${startIndex}`);
    },
};