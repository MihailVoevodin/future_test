import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import {T} from 'Common/Text';
import React, {ChangeEvent} from "react"
import styles from 'Components/Filters/Filters.module.css';
import {loadBooksList, setBooksList, setFilter, setSorting} from 'Store/Slice';

/**
 * Компонент фильтрации и сортировки.
 */
export const Filters: React.FC = () => {
    const dispatch = useAppDispatch()
    const {startIndex, inputValue, sorting, filter} = useAppSelector((state) => state.books);

    const handleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setBooksList())
        dispatch(setFilter(e.target.value))
        dispatch(loadBooksList({inputValue, startIndex, sorting, filter: e.target.value}))
    }

    const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setBooksList())
        dispatch(setSorting(e.target.value))
        dispatch(loadBooksList({inputValue, startIndex, sorting: e.target.value, filter}))
    }

    return (
        <div className={styles.filtrationWrapper}>
            <div>
                <span>Categories</span>
                <select data-testid="select" name='categories' onChange={handleChangeFilter}>
                    {T.categories.map((category: string) => <option key={category} data-testid="select-option" value={category}>{category}</option>)}
                </select>
            </div>
            <div>
                <span>Sorting by</span>
                <select name='sorting' onChange={handleChangeSorting}>
                    {T.sorting.map((sort: string) => <option key={sort} value={sort}>{sort}</option>)}
                </select>
            </div>
        </div>
    )
}
