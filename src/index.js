const express = require('express');
const bodyParser = require('body-parser');
const { register, login, authenticate } = require('./auth');
const { getBooks, getBookById, addBook, updateBook, deleteBook, searchBooks } = require('./books');
const { logRequests, handle404, handleError } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logRequests);

app.post('/register', register);
app.post('/login', login);

app.use(authenticate); // Protect all /books routes
app.get('/books', getBooks);
app.get('/books/search', searchBooks);
app.get('/books/:id', getBookById);
app.post('/books', addBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

app.use(handle404);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
