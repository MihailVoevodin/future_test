import {useAppSelector} from 'Common/Hooks';
import React from "react"
import styles from 'Components/BooksList/BooksList.module.css';
import bookImg from 'assets/book.png';

/**
 * Компонент списка книг.
 */
export const BooksList = () => {
    const {booksList, numberOfBooks} = useAppSelector((state) => state.books);

    return (
        <main>
            <div className='container'>
                <div className={styles.count}>Found {numberOfBooks} results</div>
                <div className={styles.booksList}>
                    {booksList.map((book: any) => {
                        return (
                            <div className={styles.book} key={book.id}>
                                <img
                                    className={styles.bookImg}
                                    src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : bookImg}
                                    alt={book.volumeInfo.title}
                                />
                                <div className={styles.bookCategory}>{book.volumeInfo.categories && book.volumeInfo.categories[0]}</div>
                                <div className={styles.bookTitle}>{book.volumeInfo.title}</div>
                                <div className={styles.bookAuthors}>{book.volumeInfo.authors && book.volumeInfo.authors.map((author: string, id: number) =>
                                    <>
                                        <span key={id}>{author}</span>
                                        <span>{id !== book.volumeInfo.authors.length - 1 ? ', ' : ''}</span>
                                    </>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
