import Book from "../models/book.js";
import asyncMiddleware from "../middleware/async.js";


const getBook = asyncMiddleware(async(req, res, next)=>{

    const book = await Book.find();

    res.render("home",{
        books : book
    });
});

const postUploadBook = asyncMiddleware(async(req, res)=>{

    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        bulletPoint: req.body.bulletPoint,
        mainTheme: req.body.mainTheme
    });

    await book.save(); 
    res.redirect("/v1/api/books/read");    
});

const getUploadBook = asyncMiddleware(async(req, res)=>{
    res.render("upload");
});

const getSingleBook = asyncMiddleware(async(req, res)=>{

    const requestedTitle = req.params.single;

    const book = await Book.findOne({title: requestedTitle});

    res.render("singleBook",{
        books : book
    });
});

const getAbout = asyncMiddleware(async(req, res)=>{
    res.render("about");
});

const deleteBook = asyncMiddleware(async(req, res)=>{
    const requestedBook = req.params.bookTitle;

    const book = await Book.findOneAndRemove({title: requestedBook});
    if (!book) return res.status(400).render("invalid");

    res.render("success");
});

const updateBook = asyncMiddleware(async(req, res)=>{
    const requestedBook = req.params.bookTitle;

    const book = await Book.findOneAndUpdate({title: requestedBook}, {
        $set : {
            title: req.body.title,
            description: req.body.description,
            bulletPoint: req.body.bulletPoint,
            mainTheme: req.body.mainTheme
        }
    });
    if (!book) return res.status(400).render("invalid");

    res.redirect("getBook/read");

});

const getUpdatedBookRead = asyncMiddleware(async(req, res)=>{
    res.redirect("/v1/api/books/read");
});

const getUpdateBook = asyncMiddleware(async(req, res)=>{
    const requestedBook = req.params.bookTitle;

    const book = await Book.findOne({title : requestedBook});

    res.render("getUpdateBook",{
        books: book
    });
});

export default {
    getBook,
    postUploadBook,
    getUploadBook,
    getSingleBook,
    getAbout,
    deleteBook,
    updateBook,
    getUpdateBook,
    getUpdatedBookRead
}