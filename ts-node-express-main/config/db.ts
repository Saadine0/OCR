import * as sql from 'mssql';

const sqlConfig: sql.config = {
    user: "sa",
    password: "1234",
    database: "user",
    server: 'DESKTOP-C6MPES6\\SQLEXPRESS',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool as sql.ConnectionPool; // Explicitly cast to ConnectionPool
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
        throw err; // Re-throw the error to maintain Promise type
    });
    
export {
    sql,
    poolPromise
};

