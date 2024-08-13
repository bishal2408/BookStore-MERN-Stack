import express from "express"

import { 
    createBook, getBooks, getBook, updateBook, deleteBook
} from '../controllers/books.controller.js'

const router = express.Router()

// Route for saving a new book
router.post('/', createBook)

// route to get all the books
router.get('/', getBooks)

// routes to find a book by id
router.get('/:id', getBook)


// route to update a book
router.put('/:id', updateBook)

// route to delete a book
router.delete('/:id', deleteBook)

export default router