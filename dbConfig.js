require ("dotenv").config();

const {Pool} = require ('pg')
const isProduction = process.env.NODE_ENV === 'production';

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectionString = `mongodb+srv://root:admin@cluster0.ymsscdb.mongodb.net/?retryWrites=true&w=majority`;


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        require: true, 
        rejectUnauthorized: false 
      }

});

 module.exports = {pool};