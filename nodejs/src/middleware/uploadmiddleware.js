const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./images"); // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, +Date.now() + "-" + path.extname(file.originalname));
    },
});

// Upload và lưu ảnh sản phẩm
const upload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, files, cb) => {
        const fileTypes = /jpg|png|jpeg|gif/;
        const mimeType = fileTypes.test(files.mimetype);
        const extname = fileTypes.test(path.extname(files.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Give proper file format to upload");
    },
}).array("productPhotos", 4);

const singleUpload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, files, cb) => {
        const fileTypes = /jpg|png|jpeg|gif/;
        const mimeType = fileTypes.test(files.mimetype);
        const extname = fileTypes.test(path.extname(files.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Give proper file format to upload");
    },
}).single("productPhoto");

module.exports = {
    upload,
    singleUpload,
};
