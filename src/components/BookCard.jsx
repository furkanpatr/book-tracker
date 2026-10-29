function BookCard({ book, onDeleteBook, onEditBook }) {
    return (
        <li>
            <strong>{book.title}</strong> — {book.author} ({book.status})
            <button type="button" onClick={() => onEditBook(book)}>
                Düzenle
            </button>
            <button
                type="button"
                className="delete-button"
                onClick={() => onDeleteBook(book.id)}
            >
                Sil
            </button>
        </li>
    )
}

export default BookCard
