import {fireEvent, render, screen} from '@testing-library/react';
import {Filters} from 'Components/Filters/Filters';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'Store/Store';

describe('Filters component', () => {

    test('Filters renders', () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );

        expect(screen.getByText(/categories/i)).toBeInTheDocument();
        expect(screen.getByText(/sorting by/i)).toBeInTheDocument();
    })

    test('Filters selection', () => {
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );

        fireEvent.change(getByTestId('select'), { target: { value: 'art' } })
        let options = getAllByTestId('select-option') as HTMLOptionElement[]
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    })

    test('Filters snapshot', () => {
        const filters = render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );

        expect(filters).toMatchSnapshot();
    })
});