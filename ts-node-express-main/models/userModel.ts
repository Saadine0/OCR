

import { sql, poolPromise } from "../config/db";



async function getUsers(): Promise<User[]> {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function addUser(user: User): Promise<User> {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    const query = `
      INSERT INTO Users (Username, Lastname, Email)
      VALUES (@Username, @Lastname, @Email)
    `;

    request.input("Username", sql.NVarChar, user.Username);
    request.input("Lastname", sql.NVarChar, user.Lastname);
    request.input("Email", sql.NVarChar, user.Email);

    await request.query(query);

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}



export { getUsers, addUser};

export interface User {
  Username: string;
  Lastname: string;
  Email: string;
}
