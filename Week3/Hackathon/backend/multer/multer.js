import multer from "multer";

// Memory storage (images RAM me store hoti hain, Cloudinary upload ke liye)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(file.mimetype); // MIME type check
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const upload = multer({ storage, fileFilter });
