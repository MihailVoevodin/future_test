import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import React, {useEffect} from "react"
import styles from 'Components/BooksList/BooksList.module.css';
import bookImg from 'assets/book.png';
import {Link} from 'react-router-dom';
import { Spin } from 'antd';
import {loadBooksList, loadPaginateBooksList, setStartIndex} from 'Store/Slice';
import {Button} from 'antd';

/**
 * Компонент списка книг.
 */
export const BooksList: React.FC = () => {
    const dispatch = useAppDispatch()
    const {
        booksList,
        numberOfBooks,
        startIndex,
        inputValue,
        sorting,
        filter,
        errorMessage,
        isError,
        isLoading,
        isPaginateLoad,
    } = useAppSelector((state) => state.books);

    const handleChangeStartIndex = () => {
        dispatch(setStartIndex(startIndex + 30))
    }

    useEffect(() => {
        dispatch(loadBooksList({inputValue, startIndex, sorting, filter}))
    }, [])

    useEffect(() => {
        if (startIndex > 0) {
            dispatch(loadPaginateBooksList({inputValue, startIndex, sorting, filter}))
        }
    }, [startIndex])

    return (
        <>
            {isLoading
                ? <div style={{ paddingTop: 100 }}><Spin /></div>
                : <div className='container'>
                <div className={styles.count}>Found {numberOfBooks} results</div>
                {isError
                    ? <div>{errorMessage}</div>
                    : <ul className={styles.booksList}>
                        {booksList.length > 0 && booksList.map((book: IBook) => {
                            return (
                                <li key={book.id}>
                                    <Link to={`/book/${book.id}`}>
                                        <div className={styles.book}>
                                            <img
                                                className={styles.bookImg}
                                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : bookImg}
                                                alt={book.volumeInfo.title}
                                            />
                                            <div className={styles.bookCategory}>{book.volumeInfo.categories && book.volumeInfo.categories[0]}</div>
                                            <div className={styles.bookTitle}>{book.volumeInfo.title}</div>
                                            <div className={styles.bookAuthors}>
                                                {book.volumeInfo.authors && book.volumeInfo.authors.map((author: string, id: number) =>
                                                <span key={id}>
                                                    <span>{author}</span>
                                                    <span>{id !== book.volumeInfo.authors.length - 1 ? ', ' : ''}</span>
                                                </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                </ul>}
                {booksList.length > 0 && <Button type='default' className={styles.paginateBtn} onClick={handleChangeStartIndex} loading={isPaginateLoad}>Load more</Button>}
        </div>}
    </>
    )
}
