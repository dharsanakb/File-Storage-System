const file = require('../Models/fileModel');
const bcrypt = require('bcryptjs');
const user = require('../Models/userModel');


module.exports = {
    // new register 
    registerForm: (req, res) => {
        res.render('register');
    },
    //new register's details entry
    register: (req, res) => {
        const { username, email, password } = req.body;
        // Hash the password before saving it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            user.createUser(username, email, hashedPassword, (err, userId) => {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }
                res.redirect('/login');
            });
        });
    },
    //login from 
    loginForm: (req, res) => {
        res.render('login');
    },
    //login a registered user
    login: (req, res) => {
        const { username, password } = req.body;
        user.getUserByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            // Check if passwords match
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }
                if (result) {
                    req.session.userId = user.userId; // Store user ID in session
                    res.redirect('/files'); // Redirect to dashboard or any other route
                } else {
                    res.status(401).send('Incorrect password');
                }
            });
        });
    },
    //logout the account
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.redirect('/');
        });
    },
}
    
