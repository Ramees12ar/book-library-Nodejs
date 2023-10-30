import Joi from "joi";
import booksModel from "../model/books.mjs"
import vars from "../variables/vars.mjs";
import Error from "../utils/errorManagement.mjs";
import nameFormatter from "../utils/helpers.mjs";

const insertBook = async (req, res) => {
    try {
        const documentation = {
            description: "insert book",
            reqDataFields: ["title", "author", "summary"],
            optionalPayloadFields: [],
            attributes: []
        };
        const schema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            summary: Joi.string().required()
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw Error(`Invalid payload data: ${error.message}`, vars.STATUS_CODE.BAD_REQUEST);
        }
        const title = await nameFormatter(req.body.title.replace(/\s+/g, " ").trim())
        const author = await nameFormatter(req.body.author.replace(/\s+/g, " ").trim())
        const summary = req.body.summary.replace(/\s+/g, " ").trim()
        const isExist = await booksModel.findOne({ title, author, summary, status: "active" }).select("_id")
        if (isExist) {
            throw Error(vars.MESSAGES.ALREADY_EXIST, vars.STATUS_CODE.BAD_REQUEST)
        }
        const insertBook = await booksModel({ title, author, summary }).save()
        return res.status(vars.STATUS_CODE.SUCCESS).json(
            {
                status: vars.STATUS_CODE.SUCCESS,
                message: vars.MESSAGES.BOOK_INSERTED.replace("#FIELD#", insertBook.title),
                data: insertBook
            }
        )
    } catch (err) {
        return res.status(err.code || vars.STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            {
                status: err.code || vars.STATUS_CODE.INTERNAL_SERVER_ERROR,
                message: err.message,
                error: err.error
            }
        )
    }
}

export default insertBook;