



const File = require('../Models/fileModel');

exports.getAllFiles = (req, res) => {
  File.getAllFiles((err, files) => {
    if (err) {
      console.error('Error fetching files:', err);
      return res.status(500).json({ error: err.message });
    }
    res.render('dashBoard', { files });
  });
};

exports.uploadFile = (req, res) => {
  const { filename } = req.body;
  const userId = req.session.userId;

  // if (!filename) {
  //   console.error('Filename is missing');
  //   return res.status(400).send('Filename is required');
  // }

  console.log('Uploading file:', filename);
  File.uploadFile(filename, userId, (err, fileId) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send({ error: err.message });
    }
    console.log('File uploaded successfully with ID:', fileId);
    res.redirect('files/add', { fileId });
  });
};

exports.getFileById = (req, res) => {
  const { id } = req.params;
  File.getFileById(id, (err, file) => {
    if (err) {
      console.error('Error fetching file by ID:', err);
      return res.status(500).send({ error: err.message });
    }
    if (!file) {
      console.error('File not found with ID:', id);
      return res.status(404).send('File is not found');
    }
    res.render('fileDetail', { file });
  });
};

exports.updateFile = (req, res) => {
  const { id } = req.params;
  const { filename } = req.body;

  if (!filename) {
    console.error('Filename is missing for update');
    return res.status(400).send('Filename is required');
  }

  console.log('Updating file ID:', id, 'with new filename:', filename);
  File.updateFile(id, filename, err => {
    if (err) {
      console.error('Error updating file:', err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ message: 'File updated successfully' });
  });
};

exports.deleteFile = (req, res) => {
  const { id } = req.params;
  console.log('Deleting file ID:', id);
  File.deleteFile(id, err => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ message: 'File deleted successfully' });
  });
};





// const express = require('express');
// const formidable = require('formidable');
// const path = require('path');
// const fs = require('fs');
// const fileModel = require('./Models/fileModel'); // Adjust the path as needed
// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, 'public')));

// // Middleware to ensure user is authenticated (simplified example)
// app.use((req, res, next) => {
//   req.session = { userId: 1 }; // Dummy session userId for example purposes
//   next();
// });

// app.post('/upload', (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(__dirname, 'uploads'); // Ensure this directory exists
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form data:', err);
//       return res.status(500).send({ error: 'Error parsing form data' });
//     }

//     const file = files.file;
//     if (!file) {
//       console.error('No file uploaded');
//       return res.status(400).send('No file uploaded');
//     }

//     const filename = file.name;
//     const userId = req.session.userId; // Assuming session middleware is used

//     const oldPath = file.path;
//     const newPath = path.join(form.uploadDir, filename);

//     fs.rename(oldPath, newPath, (err) => {
//       if (err) {
//         console.error('Error moving file:', err);
//         return res.status(500).send({ error: 'Error saving file' });
//       }

//       fileModel.uploadFile(filename, userId, (err, fileId) => {
//         if (err) {
//           console.error('Error uploading file:', err);
//           return res.status(500).send({ error: err.message });
//         }
//         console.log('File uploaded successfully with ID:', fileId);
//         res.redirect('/files'); // Redirect to the list of all files after upload
//       });
//     });
//   });
// });

// app.get('/files', (req, res) => {
//   fileModel.getAllFiles((err, files) => {
//     if (err) {
//       console.error('Error fetching files:', err);
//       return res.status(500).send({ error: 'Error fetching files' });
//     }
//     res.render('files', { files }); // Adjust to your actual view rendering method
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
