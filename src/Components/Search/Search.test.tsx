import React from 'react';
import { render, screen } from '@testing-library/react';
import {Search} from 'Components/Search/Search';
import {Provider} from "react-redux";
import {store} from "Store/Store";

describe('Search component', () => {

    test('Search renders', () => {
        render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Find books')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    test('Search snapshot', () => {
        const search = render(
            <Provider store={store}>
                <Search />
            </Provider>
        );

        expect(search).toMatchSnapshot();
    })
});
