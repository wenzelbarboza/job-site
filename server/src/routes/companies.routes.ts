import express from "express";
import { verifyUser } from "../utils/verifyUser";
import {
  createCompany,
  getCompanies,
} from "../controllers/companies.controllers";
import { upload } from "../utils/multer";

// change companie to company
const companiesRouter = express.Router();
companiesRouter.post("/company/get-company", verifyUser, getCompanies);

companiesRouter.post(
  "/company/create-company",
  upload.single("pdfFile"),
  createCompany
);

export { companiesRouter };
