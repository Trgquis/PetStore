const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");

// Cấu hình lưu trữ trên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images", // Tên thư mục trên Cloudinary để lưu trữ ảnh (tuỳ chọn)
        allowedFormats: ["jpg", "png"],
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Middleware upload ảnh
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Giới hạn kích thước file (1MB)
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|png|jpeg|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        // const public_id = file.path.split("images/")[1].split(".")[0];
        if (mimeType && extname) {
            cb(null, true); // Trả về null nếu tệp tin hợp lệ
        } else {
            cb(
                new Error(
                    "Invalid file format. Only jpg, png, jpeg, or gif files are allowed."
                )
            ); // Trả về lỗi nếu tệp tin không hợp lệ
        }
    },
}).array("productPhotos", 4); // Tên field trong form lưu trữ ảnh (có thể điều chỉnh)

// Middleware upload đơn ảnh
const singleUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 }, // Giới hạn kích thước file (1MB)
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|png|jpeg|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimeType && extname) {
            cb(null, true);
        } else {
            cb(
                "Invalid file format. Only jpg, png, jpeg, or gif files are allowed."
            );
        }
    },
}).single("productPhoto"); // Tên field trong form lưu trữ ảnh đơn (có thể điều chỉnh)

module.exports = {
    upload,
    singleUpload,
};
