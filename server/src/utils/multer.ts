import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("indide uploads");
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
export const upload = multer({ storage });

// // -------------------------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Directory to save the uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
//   },
// });

// // File filter to accept only PDFs

// // Set up multer with storage, file filter, and size limit (5MB here)
// export const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
// });
