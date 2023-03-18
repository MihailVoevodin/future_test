import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import React, {FormEvent, useState} from "react"
import {loadBooksList} from 'Store/Slice';

export const Search = () => {
    const dispatch = useAppDispatch()
    const {startIndex} = useAppSelector((state) => state.books);
    const [inputValue, setInputValue] = useState<string>('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loadBooksList({inputValue, startIndex}))
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(event) => setInputValue(event.target.value)} type='text' placeholder='Искать книгу'/>
            <button type='submit'></button>
        </form>
    )
}
