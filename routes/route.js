import express from "express";
import bookController from "../controllers/bookControllers.js";
import userController from "../controllers/userControllers.js";
import middlewareAuth from "../middleware/auth.js";

const router = express.Router();

//User routes:

router.post("/signup", userController.postSignup); //to post a new user
router.get("/signup", userController.getSignup); //to get the signup page

router.get("/login", userController.getLogin); //to get the login page
router.post("/login", userController.postLogin); //to login the user


//Book routes:
router.get("/read", bookController.getBook); //home page

router.get("/posts/:single", middlewareAuth, bookController.getSingleBook); //get a single book with full details

router.get("/uploads", bookController.getUploadBook); //get the page where we can upload our book
router.post("/uploads", bookController.postUploadBook); //upload our book

router.get("/about", bookController.getAbout); //to get the about page

router.post("/delete/:bookTitle", bookController.deleteBook); //to delete a single book using book title

router.post("/update/:bookTitle", bookController.updateBook); //to update a single book using book title
router.get("/update/:bookTitle", bookController.getUpdateBook); //to get the update page where we can update the book
router.get("/update/getBook/read", bookController.getUpdatedBookRead); //to get the home page after updating the single book

export default router;

