import mongoose from "mongoose";
// import Joi from "joi";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
    },
    bulletPoint:{
        type: String
    },
    mainTheme:{
        type: String
    }
});

const Book = mongoose.model("Book", bookSchema);

// function validateBook(book){
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         bulletPoint: Joi.string().required(),
//         mainTheme: Joi.required()
//     });
//     return validation = schema.validate(book);
// }

export default Book;
