const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const booksFile = 'books.json';

async function getBooks(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = books.slice(startIndex, endIndex);
    
    res.json(paginatedBooks);
}

async function getBookById(req, res) {
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.sendStatus(404);
    res.json(book);
}

async function addBook(req, res) {
    const { title, author, genre, publishedYear } = req.body;
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    const newBook = { id: uuidv4(), title, author, genre, publishedYear, userId: req.user.id };
    books.push(newBook);
    await fs.writeFile(booksFile, JSON.stringify(books, null, 2));
    res.status(201).json(newBook);
}

async function updateBook(req, res) {
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    
    if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
        return res.sendStatus(403);
    }
    
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    await fs.writeFile(booksFile, JSON.stringify(books, null, 2));
    res.json(updatedBook);
}

async function deleteBook(req, res) {
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    
    if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
        return res.sendStatus(403);
    }
    
    books.splice(bookIndex, 1);
    await fs.writeFile(booksFile, JSON.stringify(books, null, 2));
    res.sendStatus(204);
}

async function searchBooks(req, res) {
    const { genre } = req.query;
    const books = JSON.parse(await fs.readFile(booksFile, 'utf-8')) || [];
    const filteredBooks = genre ? books.filter(b => b.genre === genre) : books;
    res.json(filteredBooks);
}

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, searchBooks };
