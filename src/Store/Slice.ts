import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {BooksService} from 'api/BooksService';

export const loadBooksList = createAsyncThunk(
    'books/getBooksList',
    async ({inputValue, startIndex, sorting, filter}: {inputValue: string, startIndex: number, sorting: string, filter: string}, {rejectWithValue, dispatch}) => {
        const response = await BooksService.getBooksList(inputValue, startIndex, sorting, filter);

        if (!response.data.items) {
            dispatch(setIsError())
            dispatch(setIsLoading())
            return;
        }

        if (response.status !== 200) {
            return rejectWithValue('Server Error!');
        }

        return response.data;
    }
);

export const loadPaginateBooksList = createAsyncThunk(
    'books/getPaginateBooksList',
    async ({inputValue, startIndex, sorting, filter}: {inputValue: string, startIndex: number, sorting: string, filter: string}, {rejectWithValue}) => {
        const response = await BooksService.getBooksList(inputValue, startIndex, sorting, filter);

        if (response.status !== 200) {
            return rejectWithValue('Server Error!');
        }

        return response.data;
    }
);

export const loadBook = createAsyncThunk(
    'books/getBook',
    async (id: string | undefined, {rejectWithValue}) => {
        const response = await BooksService.getBook(id);

        if (response.status !== 200) {
            return rejectWithValue('Server Error!');
        }

        return response.data;
    }
);

/**
 * Интерфейс redux-ветки книг.
 * @param inputValue Значение инпута поиска.
 */
export interface IState {
    inputValue: string;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    booksList: IBook[];
    numberOfBooks: number;
    startIndex: number;
    book: Partial<IBook>;
    sorting: string;
    filter: string;
    isPaginateLoad: boolean;
}

const initialState: IState = {
    inputValue: '',
    isLoading: false,
    isError: false,
    errorMessage: '',
    booksList: [],
    numberOfBooks: 0,
    startIndex: 0,
    book: {},
    sorting: 'relevance',
    filter: 'all',
    isPaginateLoad: false,
};

/**
 * Срез книг.
 */
const BooksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setStartIndex(state, action: PayloadAction<number>) {
            state.startIndex = action.payload;
        },
        setBooksList(state) {
            state.booksList = [];
        },
        setBook(state, action) {
            state.book = action.payload;
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        setSorting(state, action: PayloadAction<string>) {
            state.sorting = action.payload;
        },
        setIsError(state) {
            state.isError = true;
            state.errorMessage = 'No matching results';
        },
        setIsLoading(state) {
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBooksList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadBooksList.rejected, (state) => {
                state.isError = true;
                state.errorMessage = 'No matching results';
                state.isLoading = false;
            })
            .addCase(loadBooksList.fulfilled, (state, action) => {
                state.booksList = action.payload.items;
                state.numberOfBooks = action.payload.totalItems;
                state.isLoading = false;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(loadPaginateBooksList.pending, (state) => {
                state.isPaginateLoad = true;
            })
            .addCase(loadPaginateBooksList.rejected, (state) => {
                state.isError = true;
                state.errorMessage = 'No matching results';
                state.isPaginateLoad = false;
            })
            .addCase(loadPaginateBooksList.fulfilled, (state, action) => {
                state.booksList.push.apply(state.booksList, action.payload.items);
                state.numberOfBooks = action.payload.totalItems;
                state.isPaginateLoad = false;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(loadBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadBook.rejected, (state) => {
                state.isError = true;
                state.errorMessage = 'No matching results';
                state.isLoading = false;
            })
            .addCase(loadBook.fulfilled, (state, action) => {
                state.book = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.errorMessage = '';
            })
    }
});

export const {
    setInputValue,
    setStartIndex,
    setBooksList,
    setBook,
    setSorting,
    setFilter,
    setIsError,
    setIsLoading,
} = BooksSlice.actions;

export default BooksSlice.reducer;
