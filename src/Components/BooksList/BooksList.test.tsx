import {render, screen} from '@testing-library/react';
import {BooksList} from 'Components/BooksList/BooksList';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'Store/Store';

describe('BooksList component', () => {

    test('BooksList renders', () => {
        render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        expect(screen.queryByRole('list')).toBeNull();
    })

    test('BooksList snapshot', () => {
        const booksList = render(
            <Provider store={store}>
                <BooksList />
            </Provider>
        );

        expect(booksList).toMatchSnapshot();
    })
});
