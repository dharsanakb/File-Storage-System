const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS user (userId primary key,username ,email,password)`);
//db.run('drop table user')
module.exports = {
    //to create a new user
    createUser: (username, email, password, callback) => {
        db.run('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
            [username, email, password],
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID);
            });
    },
    //to display a user using user's name
    getUserByUsername: (username, callback) => {
        db.get('SELECT userId, username, email, password FROM user WHERE username = ?', [username], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    },
    //to display a user using user's email
    getUserByEmail: (email, callback) => {
        db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    },
    //to display a user using id
    getUserById: (userId, callback) => {
        db.get('SELECT * FROM user WHERE userId = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    },
    }
    
