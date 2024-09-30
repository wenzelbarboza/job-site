import express from "express";
import { verifyUser } from "../utils/verifyUser";
import { getCompanies } from "../controllers/companies.controllers";

const companiesRouter = express.Router();
companiesRouter.post("/companie/get-companies", verifyUser, getCompanies);

export { companiesRouter };
