const { Client,Pool } = require('pg')

// {
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     database : process.env.PGDATABASE,
//     port : process.env.PGPORT
// }
const devConfig=`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
const prodConfig = process.env.DATABASE_URL
const pool = new Pool({
    connectionString : process.env.NODE_ENV === "production" ? prodConfig : devConfig
});

module.exports= pool;