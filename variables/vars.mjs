const vars = {
    STATUS_CODE: {
        BAD_REQUEST: 400,
        SUCCESS: 200,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        NO_CONTENT: 204,
        FORBIDDEN: 403,
        METHOD_FAILURE: 420,
        INTERNAL_SERVER_ERROR: 500,
    },
    MESSAGES: {
        SUCCESS: "success",
        BOOK_INSERTED: "#FIELD# successfully inserted",
        BOOK_UPDATED: "Book updated successfully.",
        BOOK_DELETED: "Book deleted successfully.",
        ALREADY_EXIST: "already exist. Please add another book",
        BOOK_NOT_EXIST: "books do not exist. Please request with correct book.",
        ALREADY_UPDATED: "The book is already updated.",
        REQUIRED_ONE_FIELD: "Please pass at least one field to update."
    },
};

export default vars
