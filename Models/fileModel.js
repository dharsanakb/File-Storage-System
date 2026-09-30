


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// Create the table if it does not exist
// db.run('CREATE TABLE IF NOT EXISTS files (fileId INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT)');
db.run('CREATE TABLE IF NOT EXISTS files (fileId INTEGER PRIMARY KEY , filename TEXT)', (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});
var i=0;
db.run('INSERT INTO files VALUES(1,"dharsana")')
module.exports = {
  getAllFiles: (callback) => {
    const query = 'SELECT * FROM files';
    db.all(query, (err, rows) => {
      if (err) {
        return callback(err);
      }
      const files = rows.map(row => row.filename);
      callback(null, files);
    });
  },

  uploadFile: (filename, userId, callback) => {
    const query = 'INSERT INTO files (filename) VALUES (?)';
    db.run(query, [filename], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID);
    });
    
  },

  getFileById: (fileId, callback) => {
    const query = 'SELECT * FROM files WHERE fileId = ?';
    db.get(query, [fileId], (err, row) => {
      if (err) {
        return callback(err);
      }
      if (!row) {
        return callback(new Error('File not found'));
      }
      callback(null, row.filename);
    });
  },

  

  updateFile: (fileId, filename, callback) => {
    const query = 'UPDATE files SET filename = ? WHERE fileId = ?';
    db.run(query, [filename, fileId], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  },

  deleteFile: (fileId, callback) => {
    const query = 'DELETE FROM files WHERE fileId = ?';
    db.run(query, [fileId], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }
};


// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('database.sqlite');

// // Create the table if it does not exist
// db.run('CREATE TABLE IF NOT EXISTS files (fileId INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT)', (err) => {
//   if (err) {
//     console.error('Error creating table:', err);
//   }
// });

// module.exports = {
//   getAllFiles: (callback) => {
//     const query = 'SELECT * FROM files';
//     db.all(query, (err, rows) => {
//       if (err) {
//         return callback(err);
//       }
//       const files = rows.map(row => row.filename);
//       callback(null, files);
//     });
//   },

//   uploadFile: (filename, userId, callback) => {
//     const query = 'INSERT INTO files (filename) VALUES (?)';
//     db.run(query, [filename], function (err) {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, this.lastID); // Return the last inserted ID
//     });
//   },

//   getFileById: (fileId, callback) => {
//     const query = 'SELECT * FROM files WHERE fileId = ?';
//     db.get(query, [fileId], (err, row) => {
//       if (err) {
//         return callback(err);
//       }
//       if (!row) {
//         return callback(new Error('File not found'));
//       }
//       callback(null, row.filename);
//     });
//   },

//   updateFile: (fileId, filename, callback) => {
//     const query = 'UPDATE files SET filename = ? WHERE fileId = ?';
//     db.run(query, [filename, fileId], function (err) {
//       if (err) {
//         return callback(err);
//       }
//       callback(null);
//     });
//   },

//   deleteFile: (fileId, callback) => {
//     const query = 'DELETE FROM files WHERE fileId = ?';
//     db.run(query, [fileId], function (err) {
//       if (err) {
//         return callback(err);
//       }
//       callback(null);
//     });
//   }
// };

