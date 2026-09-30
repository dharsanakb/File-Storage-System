// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fileController = require('./Controllers/fileController');
const userController = require('./Controllers/userController');
const PORT = 8000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', userController.registerForm);
app.post('/register', userController.register);
app.get('/login', userController.loginForm);
app.post('/login', userController.login);
app.get('/logout', userController.logout);

// Routes
//app.get('/files',fileController.createFiles);
app.post('/files/add', fileController.uploadFile);
app.get('/files', fileController.getAllFiles);
app.get('/files/:id', fileController.getFileById);
app.put('/files/:id', fileController.updateFile);
app.delete('/files/:id', fileController.deleteFile);

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
