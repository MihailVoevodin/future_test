import React from 'react';
import { render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from 'Store/Store';
import App from './App';

describe('App component', () => {

    test('App renders', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText(/search for books/i)).toBeInTheDocument();
    })

    test('App snapshot', () => {
        const app = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(app).toMatchSnapshot();
    })
});
