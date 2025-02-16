const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        cb(null, path.join(__dirname, '../../public')); // Save in public folder
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({ storage: storage, lmits: { fileSize: 10 * 1024 * 1024 } });

module.exports = upload;