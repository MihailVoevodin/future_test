import {configureStore} from '@reduxjs/toolkit';
import BooksSlice, {IState} from 'Store/Slice'

/**
 * @param books - Ветка книг.
 */
export interface IAppState {
    books: IState;
}

export const store = configureStore<IAppState>({
    reducer: {
        books: BooksSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;