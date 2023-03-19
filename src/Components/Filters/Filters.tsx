import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import React from "react"
import styles from 'Components/Filters/Filters.module.css';
import {loadBooksList, setBooksList, setFilter, setSorting} from 'Store/Slice';


export const Filters = () => {
    const dispatch = useAppDispatch()
    const {startIndex, inputValue, sorting, filter} = useAppSelector((state) => state.books);

    const handleChangeFilter = (e: any) => {
        dispatch(setBooksList())
        dispatch(setFilter(e.target.value))
        dispatch(loadBooksList({inputValue, startIndex, sorting, filter: e.target.value}))
    }

    const handleChangeSorting = (e: any) => {
        console.log(e.target.value)
        dispatch(setBooksList())
        dispatch(setSorting(e.target.value))
        dispatch(loadBooksList({inputValue, startIndex, sorting: e.target.value, filter}))
    }

    return (
        <div className={styles.filtrationWrapper}>
            <div>
                Categories
                <select onChange={handleChangeFilter}>
                    <option value="all">all</option>
                    <option value="art">art</option>
                    <option value="biography">biography</option>
                    <option value="computers">computers</option>
                    <option value="history">history</option>
                    <option value="medical">medical</option>
                    <option value="poetry">poetry</option>
                </select>
            </div>
            <div>
                Sorting by
                <select onChange={handleChangeSorting}>
                    <option value="relevance">relevance</option>
                    <option value="newest">newest</option>
                </select>
            </div>
        </div>
    )
}
