import { Book } from "../models/book.model.js"

const createBook = async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        )
        {
            return response.status(400).send({message: "Send all required fields: title, author, publishYear"})
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)

        return response.status(200).json(book)
        
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({message: error.message})
    }
}

const getBooks = async (request, response) => {
    try {
        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({message: error.message})
    }
}

const getBook = async (request, response) => {
    try {   
        const { id } = request.params

        const book = await Book.findById(id)

        if(!book) {
            return response.status(404).json({message: "Book Not Found!"})
        }

        return response.status(200).json(book)

    } catch (error) {
        console.log(error.message)
        return response.status(500).json({message: error.message})
    }
}

const updateBook = async (request, response) => {
    try {
        
        if (
           !request.body.title || 
           !request.body.author || 
           !request.body.publishYear  
        )

        {
            return response.status(400).send({message: "Send all required fields: title, author, publishYear"})
        }

        const { id } = request.params

        const result = await Book.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({message: "Book Not Found!"})
        }

        return response.status(200).json({message: "Book Updated Successfully!"})
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({message: error.message})
    }
}

const deleteBook = async (request, response) => {
    try {
        const { id } = request.params
        
        const book = await Book.findByIdAndDelete(id)

        if(!book) {
            return response.status(404).json({message: "Book Not Found!"})
        }

        return response.status(200).json({message: "Book Deleted Successfully!"})
    } catch (error) {
        console.log(error.message)
        return response.status(500).json({message: error.message})
    }
}

export {createBook, getBooks, getBook, updateBook, deleteBook}