import axios, {AxiosResponse} from 'axios';

/** Ключ к API. */
const API_KEY = 'AIzaSyA_gxei09YeV-FhvDnfIoKnbP8-a2sAQb0'

export const BooksService = {
    /** Получение списка книг. */
    getBooksList(value: string, startIndex: number, sorting: string, filter: string): Promise<AxiosResponse> {
        if (filter === 'all') {
            return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${API_KEY}&orderBy=${sorting}&maxResults=30&startIndex=${startIndex}`);
        }
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}+subject:${filter}&key=${API_KEY}&orderBy=${sorting}&maxResults=30&startIndex=${startIndex}`);
    },
    /** Получение информации об одной книге. */
    getBook(id: string | undefined): Promise<AxiosResponse> {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`);
    },
};