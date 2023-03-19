import React, {FormEvent} from "react"
import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import {loadBooksList, setBooksList, setInputValue} from 'Store/Slice';
import {SearchOutlined} from '@ant-design/icons';
import styles from 'Components/Search/Search.module.css';

export const Search = () => {
    const dispatch = useAppDispatch()
    const {startIndex, inputValue, sorting, filter} = useAppSelector((state) => state.books);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setBooksList())
        dispatch(loadBooksList({inputValue, startIndex, sorting, filter}))
    }

    return (
        <form onSubmit={onSubmit}>
                <input className={styles.input} onChange={(event) => dispatch(setInputValue((event.target.value)))} type='text' placeholder='Find books'/>
                <button className={styles.button} type='submit'><SearchOutlined /></button>
        </form>
    )
}
