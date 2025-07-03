# Bookstore API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bookstore-api


  2.Install dependencies:
  npm install

  3.Start the server:
  node src/index.js

  4.You can test the API using Postman or curl.
   Register a User:
  curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}'

  Login:
  curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}'

  Get All Books:
  curl -X GET http://localhost:3000/books -H "Authorization: Bearer <token>"

 Add a Book:
 curl -X POST http://localhost:3000/books -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title": "Book Title", "author": "Author Name", "genre": "Genre", "publishedYear": 2023}'
 
  

  