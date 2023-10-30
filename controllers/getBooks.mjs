import Joi from "joi";
import booksModel from "../model/books.mjs"
import vars from "../variables/vars.mjs";
import Error from "../utils/errorManagement.mjs";

const getBookById = async (req, res) => {
    try {
        const documentation = {
            description: "get book details by id",
            reqDataFields: ["bookId"],
            optionalPayloadFields: [],
            attributes: ["title", "author", "summary", "status"]
        };
        const schema = Joi.object({
            bookId: Joi.string().hex().length(24).required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) {
            throw Error(`Invalid payload data: ${error.message}`, vars.STATUS_CODE.BAD_REQUEST);
        }
        const { bookId, attributes = documentation.attributes } = req.params
        const book = await booksModel.findOne({ _id: bookId }).select(attributes)
        if (!book) {
            throw Error(vars.MESSAGES.BOOK_NOT_EXIST, vars.STATUS_CODE.BAD_REQUEST)
        }
        return res.status(vars.STATUS_CODE.SUCCESS).json(
            {
                status: vars.STATUS_CODE.SUCCESS,
                message: vars.MESSAGES.SUCCESS,
                data: book
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
const getBookList = async (req, res) => {
    try {
        const documentation = {
            description: "get list of books",
            reqDataFields: [],
            optionalPayloadFields: ["title", "author", "summary", "status", "limit", "page"],
            attributes: ["title", "author", "summary", "status"]
        };

        const schema = Joi.object({
            title: Joi.string().optional(),
            author: Joi.string().optional(),
            status: Joi.string().valid("active", "deleted").optional(),
            summary: Joi.string().optional(),
            limit: Joi.number().integer().options({ convert: true }).optional(),
            page: Joi.number().integer().options({ convert: true }).optional()
        })
        const { error, value } = schema.validate(req.query);
        if (error) {
            throw Error(`Invalid payload data: ${error.message}`, vars.STATUS_CODE.BAD_REQUEST);
        }
        let query = { status: "active" }
        const { title, author, summary, status, limit = 10, page = 0, attributes = documentation.attributes } = req.query
        if (status === "deleted") {
            query.status = "deleted"
        }
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (author) {
            query.author = { $regex: author, $options: 'i' };
        }
        if (summary) {
            query.summary = { $regex: summary, $options: 'i' };
        }
        const count = await booksModel.countDocuments(query) // count of documents
        const books = await booksModel.find(query) // querying the documents
            .select(attributes)
            .skip(page * limit)
            .limit(limit)
        return res.status(vars.STATUS_CODE.SUCCESS).json(
            {
                status: vars.STATUS_CODE.SUCCESS,
                message: vars.MESSAGES.SUCCESS,
                data: { count, books }
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

export { getBookById, getBookList };