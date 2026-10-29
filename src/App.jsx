import BookForm from './components/BookForm.jsx'
import BookList from './components/BookList.jsx'
import { useEffect, useState } from 'react'

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem('books')

      return savedBooks ? JSON.parse(savedBooks) : []
    } catch {
      return []
    }
  })
  const [editingBook, setEditingBook] = useState(null)
  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books))
    } catch {
      console.error('Kitaplar tarayıcıya kaydedilemedi.')
    }
  }, [books])
  function addBook(book) {
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
    }

    setBooks((previousBooks) => [...previousBooks, newBook])
  }
  function deleteBook(id) {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book.id !== id)
    )

    if (editingBook?.id === id) {
      setEditingBook(null)
    }
  }
  function startEditing(book) {
    setEditingBook(book)
  }
  function cancelEditing() {
    setEditingBook(null)
  }
  function updateBook(updatedBook) {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    )

    setEditingBook(null)
  }
  return (
    <main>
      <h1>Kişisel Kitap Takip Uygulaması</h1>
      <p>Kitaplarını ve okuma durumlarını takip et.</p>

      <BookForm
        key={editingBook?.id ?? 'new'}
        onAddBook={addBook}
        editingBook={editingBook}
        onUpdateBook={updateBook}
        onCancelEditing={cancelEditing}
      />
      <p>Toplam kitap: {books.length}</p>
      <BookList
        books={books}
        onDeleteBook={deleteBook}
        onEditBook={startEditing}
      />
    </main>
  )
}

export default App
