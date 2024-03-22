import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const client = new Client({
  connectionString: process.env.POSTGRES_URI
})

async function createUserTable() {
  await client.connect();
  const result = await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `)
  console.log(result);
}

// async function insertData
async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect();
    // const insertQuery = `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`;
    const values = [username, email, password]
    const result = await client.query(insertQuery)
    console.log(`Data inserted Succesfully: ${result}`)
  }
  catch(err) {
    console.log(`Error in inserting data: ${err}`)
  }
  finally {
    await client.end();
  }
}

async function getUser(email: string) {
  try {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1'
    const values = [email];
    const result = await client.query(query, values);
    console.log(result.rows);
  }
  catch(err) {
    console.log(`Error in getting data: ${err}`)
  }
  finally {
    await client.end();
  }

}

// createUserTable();
// insertData("username3", "user3@gmail.com", "password3");
// getUser("user3@gmail.com");