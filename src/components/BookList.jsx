import BookCard from './BookCard.jsx'

function BookList({ books, onDeleteBook, onEditBook }) {
    return (
        <section>
            <h2>Kitaplarım</h2>

            {books.length === 0 && <p>Henüz kitap eklenmedi.</p>}

            <ul>
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDeleteBook={onDeleteBook}
                        onEditBook={onEditBook}
                    />
                ))}
            </ul>
        </section>
    )
}

export default BookList
