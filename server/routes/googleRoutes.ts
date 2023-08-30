import { Router } from "express";
import passport from "passport";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import "../auth/google";
import cors from "cors";
import User from "../schemas/userSchema";

const googleRoutes = Router();

export default googleRoutes;
