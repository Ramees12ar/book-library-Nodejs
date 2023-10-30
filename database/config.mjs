import dotenv from "dotenv"
dotenv.config()

const config = {
    database: process.env.DB_URL,
    test_database: process.env.TEST_DB_URL,
};

export default config;
