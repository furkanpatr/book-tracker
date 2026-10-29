import { useState } from 'react'

function BookForm({ onAddBook, editingBook, onUpdateBook, onCancelEditing }) {
    const [title, setTitle] = useState(editingBook?.title ?? '')
    const [author, setAuthor] = useState(editingBook?.author ?? '')
    const [status, setStatus] = useState(editingBook?.status ?? 'Okunacak')
    function handleSubmit(event) {
        event.preventDefault()

        if (!title.trim() || !author.trim()) {
            alert('Kitap adı ve yazar alanları yalnızca boşluk içeremez.')
            return
        }

        const book = {
            title: title.trim(),
            author: author.trim(),
            status: status,
        }

        if (editingBook) {
            onUpdateBook({
                ...book,
                id: editingBook.id,
            })
        } else {
            onAddBook(book)
        }

        setTitle('')
        setAuthor('')
        setStatus('Okunacak')
    }
    return (
        <section>
            <h2>{editingBook ? 'Kitabı Düzenle' : 'Kitap Ekle'}</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Kitap adı</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Örneğin: Küçük Prens"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
                <label htmlFor="author">Yazar</label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Örneğin: Antoine de Saint-Exupéry"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    required
                />
                <label htmlFor="status">Okuma durumu</label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="Okunacak">Okunacak</option>
                    <option value="Okunuyor">Okunuyor</option>
                    <option value="Okundu">Okundu</option>
                </select>
                <button type="submit">
                    {editingBook ? 'Güncelle' : 'Kaydet'}
                </button>
                {editingBook && (
                    <button type="button" onClick={onCancelEditing}>
                        Vazgeç
                    </button>
                )}
            </form>
        </section>
    )
}


export default BookForm
