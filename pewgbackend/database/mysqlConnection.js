const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

const MysqlConnection = () => {
  conn.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to MySQL!');

    // Create database 'pewg' if it doesn't exist
    conn.query('CREATE DATABASE IF NOT EXISTS pewg', (err, result) => {
      if (err) {
        console.error('Error creating database:', err);
        return;
      }
      console.log('Database created or already exists: pewg');

      // Select the 'pewg' database to use for the next queries
      conn.query('USE pewg', (err) => {
        if (err) {
          console.error('Error selecting database:', err);
          return;
        }

        const createPewgMembersTable = `
          CREATE TABLE IF NOT EXISTS users1 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            firstname VARCHAR(255),
            lastname VARCHAR(255),
            gender VARCHAR(10),
            mobilephonenumber VARCHAR(15),
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            verifiedcode VARCHAR(50),
            userlog TEXT,
            validatecode VARCHAR(50),
            last_login DATETIME,
            failedAttempts INT DEFAULT 0,
            lastFailedAttempt DATETIME,
            login_failed_attempts INT DEFAULT 0,
            lockedaccount BOOLEAN DEFAULT FALSE,
            secret VARCHAR(255),
            reg_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
            isVerified BOOLEAN DEFAULT FALSE,
            verificationToken VARCHAR(255),
            status VARCHAR(50),
            business_name VARCHAR(255),
            business_shortname VARCHAR(100),
            country VARCHAR(100),
            address TEXT,
            business_profile TEXT,
            business_location VARCHAR(255),
            uchangepwd BOOLEAN DEFAULT FALSE
          )
        `;
        conn.query(createPewgMembersTable, (err, result) => {
          if (err) {
            console.error('Error creating pewgmembers table:', err);
            return;
          }
          console.log('pewgmembers table created or already exists');
        });

        const createUserRecordsTable = `
          CREATE TABLE IF NOT EXISTS user_records1 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userid varchar(50),
            memberstatus VARCHAR(255),
            email VARCHAR(255),
            image VARCHAR(255),
            secret VARCHAR(255),
            status VARCHAR(50),
            studentschool VARCHAR(255),
            studentcourse VARCHAR(255),
            studentlevel VARCHAR(50),
            pensa varchar(50),
            profession VARCHAR(255)
          )
        `;
        conn.query(createUserRecordsTable, (err, result) => {
          if (err) {
            console.error('Error creating user_records1 table:', err);
            return;
          }
          console.log('user_records1 table created or already exists');
        });

        const churcharea1 = `
          CREATE TABLE IF NOT EXISTS churcharea (
            churchArea varchar(50),
            district varchar(50),
            local varchar(50),
            course varchar(50),
            imageUrl varchar(255),
            guild varchar(50),
            userid varchar(50),
            memberstatus varchar(50)         
          )
        `;
        conn.query(churcharea1, (err, result) => {
          if (err) {
            console.log('Error creating churcharea table:', err);
            return;
          }
          console.log('churcharea table created or already exists');
        });

      });
    });
  });
};

module.exports = { conn, MysqlConnection };
