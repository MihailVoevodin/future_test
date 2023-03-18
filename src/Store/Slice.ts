import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {BooksService} from 'api/BooksService';

export const loadBooksList = createAsyncThunk(
    'books/getBooksList',
    async ({inputValue, startIndex}: {inputValue: string, startIndex: number}, {rejectWithValue}) => {
        const response = await BooksService.getBooksList(inputValue, startIndex);
        console.log(response.data)
        if (response.status !== 200) {
            return rejectWithValue('Server Error!');
        }

        return response.data;
    }
);

/**
 * Интерфейс redux-ветки текущей погоды.
 * @param inputValue Значение инпута поиска.
 */
export interface IState {
    inputValue: string;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    booksList: any;
    numberOfBooks: number;
    startIndex: number;
}

const initialState: IState = {
    inputValue: '',
    isLoading: false,
    isError: false,
    errorMessage: '',
    booksList: [],
    numberOfBooks: 0,
    startIndex: 0,
};

/**
 * Срез текущей погоды.
 */
const BooksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
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
            })
    }
});

export const {setInputValue} = BooksSlice.actions;

export default BooksSlice.reducer;
