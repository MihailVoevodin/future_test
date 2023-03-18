import {configureStore} from '@reduxjs/toolkit';
import BooksSlice from 'Store/Slice'

/**
 * @param current - Ветка текущей погоды.
 * @param forecast - Ветка прогноза погоды.
 */
export interface IAppState {
    books: any;
}

export const store = configureStore<IAppState>({
    reducer: {
        books: BooksSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;