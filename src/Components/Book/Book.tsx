import {useAppDispatch, useAppSelector} from 'Common/Hooks';
import styles from 'Components/Book/Book.module.css';
import React, {useEffect} from "react"
import {useParams} from 'react-router-dom';
import bookImg from 'assets/book.png';
import {loadBook, setBook, setBooksList, setStartIndex} from 'Store/Slice';

export const Book = () => {
    const dispatch = useAppDispatch()
    const {book} = useAppSelector((state) => state.books);
    const {id} = useParams()

    useEffect(() => {
        dispatch(loadBook(id))

        return (() => {
            dispatch(setBook({}))
            dispatch(setBooksList())
            dispatch(setStartIndex(0))
        })
    }, [dispatch])

    return (
        <>
            {book.volumeInfo && <div className='container'>
                <div className={styles.bookWrapper}>
                    <img
                        className={styles.bookImg}
                        src={book.volumeInfo.imageLinks.small ? book.volumeInfo.imageLinks.small : bookImg}
                        alt={book.volumeInfo.title} />
                    <div className={styles.bookContent}>
                        {book.volumeInfo.categories && <div className={styles.bookCategory}>{book.volumeInfo.categories[0]}</div>}
                        <div className={styles.bookTitle}>{book.volumeInfo.title}</div>
                        {book.volumeInfo.authors && <div className={styles.bookAuthors}>
                            {book.volumeInfo.authors.map((author: string, id: number) =>
                                <span key={id}>
                                    <span>{author}</span>
                                    <span>{id !== book.volumeInfo.authors.length - 1 ? ', ' : ''}</span>
                                </span>
                            )}
                        </div>}
                        <div className={styles.bookDescription}>{book.volumeInfo.description}</div>
                    </div>
                </div>
            </div>}
        </>
    )
}